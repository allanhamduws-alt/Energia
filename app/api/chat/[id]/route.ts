import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET single conversation with messages
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const conversation = await prisma.chatConversation.findUnique({
      where: { id },
      include: {
        messages: {
          orderBy: { createdAt: 'asc' },
        },
      },
    })

    if (!conversation) {
      return NextResponse.json(
        { error: 'Konversation nicht gefunden' },
        { status: 404 }
      )
    }

    return NextResponse.json(conversation)
  } catch (error) {
    console.error('Error fetching conversation:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Konversation' },
      { status: 500 }
    )
  }
}

// PATCH - Update conversation (status, email, name)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const { isActive, email, name } = body

    const updateData: Record<string, unknown> = {}
    
    if (typeof isActive === 'boolean') {
      updateData.isActive = isActive
    }
    if (email !== undefined) {
      updateData.email = email
    }
    if (name !== undefined) {
      updateData.name = name
    }

    const conversation = await prisma.chatConversation.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(conversation)
  } catch (error) {
    console.error('Error updating conversation:', error)
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren der Konversation' },
      { status: 500 }
    )
  }
}

// DELETE - Remove conversation and all messages
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Messages will be deleted automatically due to cascade
    await prisma.chatConversation.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting conversation:', error)
    return NextResponse.json(
      { error: 'Fehler beim Löschen der Konversation' },
      { status: 500 }
    )
  }
}

