import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET single appointment
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const appointment = await prisma.appointment.findUnique({
      where: { id },
    })

    if (!appointment) {
      return NextResponse.json(
        { error: 'Termin nicht gefunden' },
        { status: 404 }
      )
    }

    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Error fetching appointment:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden des Termins' },
      { status: 500 }
    )
  }
}

// PATCH update appointment status
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const appointment = await prisma.appointment.update({
      where: { id },
      data: {
        status: body.status,
        adminNotes: body.adminNotes,
      },
    })

    // TODO: Send confirmation email if status changed to 'confirmed'

    return NextResponse.json(appointment)
  } catch (error) {
    console.error('Error updating appointment:', error)
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren des Termins' },
      { status: 500 }
    )
  }
}

// DELETE appointment
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.appointment.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting appointment:', error)
    return NextResponse.json(
      { error: 'Fehler beim Löschen des Termins' },
      { status: 500 }
    )
  }
}

