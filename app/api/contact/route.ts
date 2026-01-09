import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// GET all contact inquiries
export async function GET() {
  try {
    const inquiries = await prisma.contactInquiry.findMany({
      orderBy: { createdAt: 'desc' },
    })
    return NextResponse.json(inquiries)
  } catch (error) {
    console.error('Error fetching contact inquiries:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Anfragen' },
      { status: 500 }
    )
  }
}

// POST new contact inquiry
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const inquiry = await prisma.contactInquiry.create({
      data: {
        firstName: body.firstName,
        lastName: body.lastName,
        company: body.company,
        email: body.email,
        phone: body.phone || null,
        subject: body.subject,
        message: body.message,
        status: 'new',
      },
    })

    // TODO: Send notification email to admin

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error('Error creating contact inquiry:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden der Anfrage' },
      { status: 500 }
    )
  }
}

