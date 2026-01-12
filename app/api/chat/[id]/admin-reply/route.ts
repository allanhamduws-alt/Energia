import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST - Send admin reply to conversation
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { message } = body

    if (!message || typeof message !== 'string' || !message.trim()) {
      return NextResponse.json(
        { error: 'Nachricht darf nicht leer sein' },
        { status: 400 }
      )
    }

    // Check if conversation exists
    const conversation = await prisma.chatConversation.findUnique({
      where: { id },
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'Konversation nicht gefunden' },
        { status: 404 }
      )
    }

    // Create admin message with role 'assistant' but content prefix for identification
    // We use 'assistant' role since it's displayed in the chat widget
    // The admin message will appear as a regular assistant message to the user
    const adminMessage = await prisma.chatMessage.create({
      data: {
        conversationId: id,
        role: 'assistant', // Use assistant role so it shows in the chat widget
        content: message.trim(),
      },
    })

    // Update conversation timestamp
    await prisma.chatConversation.update({
      where: { id },
      data: { updatedAt: new Date() },
    })

    return NextResponse.json({
      id: adminMessage.id,
      role: 'admin', // Return as 'admin' for the admin panel display
      content: adminMessage.content,
      createdAt: adminMessage.createdAt.toISOString(),
    })
  } catch (error) {
    console.error('Error sending admin reply:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden der Admin-Nachricht' },
      { status: 500 }
    )
  }
}

