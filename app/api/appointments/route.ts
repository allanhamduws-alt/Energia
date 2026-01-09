import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET all appointments
export async function GET() {
  try {
    const appointments = await prisma.appointment.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(appointments)
  } catch (error) {
    console.error('Error fetching appointments:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Termine' },
      { status: 500 }
    )
  }
}

// POST new appointment
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const appointment = await prisma.appointment.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        company: body.company,
        email: body.email,
        phone: body.phone,
        preferredDate: new Date(body.preferredDate),
        preferredTime: body.preferredTime,
        message: body.message || null,
        status: 'pending',
      },
    })

    // TODO: Send notification email to admin

    return NextResponse.json(appointment, { status: 201 })
  } catch (error) {
    console.error('Error creating appointment:', error)
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Termins' },
      { status: 500 }
    )
  }
}

