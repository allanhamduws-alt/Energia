import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

// POST new deal inquiry
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: dealId } = await params
    const body = await request.json()

    // Check if deal exists
    const deal = await prisma.deal.findUnique({
      where: { id: dealId },
    })

    if (!deal) {
      return NextResponse.json(
        { error: 'Deal nicht gefunden' },
        { status: 404 }
      )
    }

    const inquiry = await prisma.dealInquiry.create({
      data: {
        dealId,
        firstName: body.firstName,
        lastName: body.lastName,
        company: body.company,
        email: body.email,
        phone: body.phone,
        message: body.message || null,
        quantity: body.quantity || null,
        status: 'new',
      },
    })

    // TODO: Send notification email to admin

    return NextResponse.json(inquiry, { status: 201 })
  } catch (error) {
    console.error('Error creating deal inquiry:', error)
    return NextResponse.json(
      { error: 'Fehler beim Senden der Anfrage' },
      { status: 500 }
    )
  }
}

