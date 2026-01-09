import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

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

    // Generate AI response
    let aiResponse = ''
    
    try {
      // Try to use OpenAI if API key is available
      if (process.env.OPENAI_API_KEY) {
        const openaiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: 'gpt-3.5-turbo',
            messages: [
              {
                role: 'system',
                content: `Du bist der freundliche Chat-Assistent von Energia Supply Solution, einem B2B-Solarhandelsunternehmen.

Informationen über Energia:
- Wir sind ein B2B-Großhändler für Photovoltaik-Produkte
- Wir verkaufen Module, Wechselrichter und Batteriespeicher
- Unsere Marken: SMA, Sungrow, Huawei, Aiko, BYD, Kostal
- Wir liefern europaweit
- Kontakt: connect@energia-b2b.de, Tel: 0163 73 73 663
- Adresse: Schäferweg 6, 30952 Hannover
- Ansprechpartner: Ouissam Benabbou (Leitung B2B)

Verhalte dich professionell aber freundlich. Beantworte Fragen zu unseren Produkten und Services. Bei konkreten Preisanfragen oder komplexen Projektanfragen empfehle einen Telefontermin über unsere Website (/termin).

Antworte auf Deutsch und halte deine Antworten kurz und präzise.`
              },
              {
                role: 'user',
                content: message,
              },
            ],
            max_tokens: 300,
            temperature: 0.7,
          }),
        })

        const data = await openaiResponse.json()
        aiResponse = data.choices?.[0]?.message?.content || ''
      }
    } catch (error) {
      console.error('OpenAI API error:', error)
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

