import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// Energia Chatbot - Conversational B2B Sales Assistant  
const ENERGIA_SYSTEM_PROMPT = `Du bist der Chat-Assistent von Energia Supply Solution, B2B-Großhändler für PV-Komponenten.

REGEL #1: KURZ ANTWORTEN
- Max 1-2 Sätze pro Antwort
- Eine Frage oder ein Fakt, nie beides
- Kein "Um Ihnen...", "Ich empfehle...", "Sagen Sie mir bitte..."

REGEL #2: DIALOG FÜHREN
- Stell EINE gezielte Rückfrage
- Qualifiziere den Lead Schritt für Schritt
- Erst am Ende (wenn alles klar): Ouissam erwähnen

REGEL #3: KONTEXT NUTZEN
- Merk dir was schon gesagt wurde
- Wiederhole keine Infos
- Kontaktdaten NUR wenn gefragt oder Gespräch endet

PRODUKTWISSEN:
Module: Aiko (N-Type bis 23.6%), JA Solar, Trina, Canadian, Longi
Wechselrichter: SMA, Sungrow, Huawei, Kostal
Speicher: BYD, Sungrow, Huawei LUNA

KONTAKT (sparsam): Ouissam, 0163 73 73 663

BEISPIELE:
"Ich brauche Module" → "Welcher Hersteller schwebt dir vor?"
"Aiko" → "Gute Wahl! Welches Modell - Standard oder Premium?"
"5 Paletten" → "Wann brauchst du die?"
"Diese Woche" → "Tight! Ich check kurz die Verfügbarkeit - wohin soll's gehen?"
"Wer ist zuständig?" → "Ouissam, 0163 73 73 663"

Deutsch, locker, professionell. Du bist ein Kollege, kein Bot.`

// GET all chat conversations (admin)
export async function GET() {
  try {
    const conversations = await prisma.chatConversation.findMany({
      orderBy: { updatedAt: 'desc' },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
          take: 50,
        },
      },
    })
    return NextResponse.json(conversations)
  } catch (error) {
    console.error('Error fetching conversations:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Gespräche' },
      { status: 500 }
    )
  }
}

// POST new chat message
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { visitorId, message, email, name } = body

    // Find or create conversation
    let conversation = await prisma.chatConversation.findFirst({
      where: { visitorId, isActive: true },
    })

    if (!conversation) {
      conversation = await prisma.chatConversation.create({
        data: {
          visitorId,
          email: email || null,
          name: name || null,
        },
      })
    } else if (email || name) {
      // Update conversation with user info if provided
      conversation = await prisma.chatConversation.update({
        where: { id: conversation.id },
        data: {
          email: email || conversation.email,
          name: name || conversation.name,
        },
      })
    }

    // Save user message
    await prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'user',
        content: message,
      },
    })

    // Generate AI response using Z.AI GLM-4.7
    let aiResponse = ''
    
    // Fetch conversation history for context
    const conversationHistory = await prisma.chatMessage.findMany({
      where: { conversationId: conversation.id },
      orderBy: { createdAt: 'asc' },
      take: 10, // Last 10 messages for context
    })
    
    try {
      // Groq API with Llama 3.3 70B - Energia Chatbot
      const apiKey = process.env.GROQ_API_KEY
      
      if (!apiKey) {
        throw new Error('GROQ_API_KEY not configured')
      }
      
      console.log('=== Groq Llama 3.3 Request ===')
      
      // Build messages array with conversation history
      const messagesForAI: Array<{ role: string; content: string }> = [
        { role: 'system', content: ENERGIA_SYSTEM_PROMPT },
      ]
      
      // Add conversation history (skip last message as we add it separately)
      for (const msg of conversationHistory.slice(0, -1)) {
        messagesForAI.push({
          role: msg.role,
          content: msg.content,
        })
      }
      
      // Add current user message
      messagesForAI.push({
        role: 'user',
        content: message,
      })

      console.log('Messages count:', messagesForAI.length)
      console.log('User message:', message)

      // Call Groq API (OpenAI-compatible)
      const groqResponse = await fetch('https://api.groq.com/openai/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
          model: 'llama-3.3-70b-versatile',
          messages: messagesForAI,
          max_tokens: 1024,
          temperature: 0.7,
        }),
      })

      console.log('Groq Response Status:', groqResponse.status)
      
      const responseText = await groqResponse.text()
      console.log('Groq Raw Response:', responseText.substring(0, 300))

      if (!groqResponse.ok) {
        console.error('Groq API Error:', responseText)
        throw new Error(`Groq API error: ${groqResponse.status}`)
      }

      const data = JSON.parse(responseText)
      aiResponse = data.choices?.[0]?.message?.content || ''
      
      if (aiResponse) {
        console.log('✓ Groq Response:', aiResponse.substring(0, 150) + '...')
      } else {
        console.error('Groq returned empty content')
        throw new Error('Empty response from Groq')
      }
    } catch (error) {
      console.error('=== Groq Error ===', error)
      // Kein Fallback - nur Fehlermeldung
      aiResponse = 'Entschuldigung, der KI-Assistent ist momentan nicht erreichbar. Bitte kontaktieren Sie uns direkt unter connect@energia-b2b.de oder rufen Sie an: 0163 73 73 663.'
    }

    // Fallback response if no AI response
    if (!aiResponse) {
      aiResponse = getDefaultResponse(message)
    }

    // Save AI response
    await prisma.chatMessage.create({
      data: {
        conversationId: conversation.id,
        role: 'assistant',
        content: aiResponse,
      },
    })

    // Update conversation timestamp
    await prisma.chatConversation.update({
      where: { id: conversation.id },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json({
      conversationId: conversation.id,
      response: aiResponse,
    })
  } catch (error) {
    console.error('Error in chat:', error)
    return NextResponse.json(
      { error: 'Fehler beim Verarbeiten der Nachricht' },
      { status: 500 }
    )
  }
}

// Default responses when AI is not available
function getDefaultResponse(message: string): string {
  const lowerMessage = message.toLowerCase()

  if (lowerMessage.includes('preis') || lowerMessage.includes('kosten')) {
    return 'Für konkrete Preisanfragen empfehle ich Ihnen, einen unverbindlichen Telefontermin zu vereinbaren. So können wir Ihren Bedarf genau besprechen. Sie finden die Terminbuchung unter "Telefontermin" in unserem Menü.'
  }

  if (lowerMessage.includes('modul') || lowerMessage.includes('panel')) {
    return 'Wir führen hochwertige PV-Module von Herstellern wie Aiko und Huawei. Für detaillierte Informationen zu verfügbaren Modellen und Konditionen kontaktieren Sie uns gerne direkt oder buchen Sie einen Telefontermin.'
  }

  if (lowerMessage.includes('wechselrichter') || lowerMessage.includes('inverter')) {
    return 'Wir bieten Wechselrichter von SMA, Sungrow, Huawei und Kostal an. Ob String- oder Hybridwechselrichter - wir haben die passende Lösung. Für ein individuelles Angebot vereinbaren Sie gerne einen Telefontermin.'
  }

  if (lowerMessage.includes('speicher') || lowerMessage.includes('batterie') || lowerMessage.includes('byd')) {
    return 'Batteriespeicher von BYD gehören zu unserem Sortiment. Die LiFePO4-Systeme sind modular skalierbar. Für Verfügbarkeiten und Preise kontaktieren Sie uns am besten direkt.'
  }

  if (lowerMessage.includes('kontakt') || lowerMessage.includes('erreichen')) {
    return 'Sie erreichen uns per E-Mail unter connect@energia-b2b.de oder telefonisch unter 0163 73 73 663. Alternativ können Sie auch einen Telefontermin über unsere Website buchen.'
  }

  if (lowerMessage.includes('termin') || lowerMessage.includes('gespräch')) {
    return 'Sie können ganz einfach einen Telefontermin über unsere Website vereinbaren. Gehen Sie dazu auf "Telefontermin" im Menü und wählen Sie Ihren Wunschtermin.'
  }

  return 'Vielen Dank für Ihre Nachricht! Für eine detaillierte Beratung empfehle ich Ihnen, einen Telefontermin zu vereinbaren oder uns direkt unter connect@energia-b2b.de zu kontaktieren. Wie kann ich Ihnen sonst noch helfen?'
}

