import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET single contact inquiry
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const inquiry = await prisma.contactInquiry.findUnique({
      where: { id },
    })

    if (!inquiry) {
      return NextResponse.json(
        { error: 'Anfrage nicht gefunden' },
        { status: 404 }
      )
    }

    return NextResponse.json(inquiry)
  } catch (error) {
    console.error('Error fetching contact inquiry:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Anfrage' },
      { status: 500 }
    )
  }
}

// PATCH update contact inquiry status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const inquiry = await prisma.contactInquiry.update({
      where: { id },
      data: {
        status: body.status,
      },
    })

    return NextResponse.json(inquiry)
  } catch (error) {
    console.error('Error updating contact inquiry:', error)
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren der Anfrage' },
      { status: 500 }
    )
  }
}

// DELETE contact inquiry
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.contactInquiry.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting contact inquiry:', error)
    return NextResponse.json(
      { error: 'Fehler beim Löschen der Anfrage' },
      { status: 500 }
    )
  }
}

