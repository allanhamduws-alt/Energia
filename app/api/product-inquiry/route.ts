import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, company, email, phone, message, products } = body

    // Validation
    if (!firstName || !lastName || !company || !email || !phone) {
      return NextResponse.json(
        { error: 'Bitte füllen Sie alle Pflichtfelder aus' },
        { status: 400 }
      )
    }

    if (!products || products.length === 0) {
      return NextResponse.json(
        { error: 'Bitte wählen Sie mindestens ein Produkt aus' },
        { status: 400 }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Bitte geben Sie eine gültige E-Mail-Adresse ein' },
        { status: 400 }
      )
    }

    // Create inquiry
    const inquiry = await prisma.productInquiry.create({
      data: {
        firstName,
        lastName,
        company,
        email,
        phone,
        message: message || null,
        products: JSON.stringify(products),
        status: 'new',
      },
    })

    // TODO: Send notification email to admin
    // TODO: Send confirmation email to customer

    return NextResponse.json({
      success: true,
      id: inquiry.id,
      message: 'Anfrage erfolgreich gesendet',
    })
  } catch (error) {
    console.error('Error creating product inquiry:', error)
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    // Check for admin authentication here if needed
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')

    const inquiries = await prisma.productInquiry.findMany({
      where: status ? { status } : undefined,
      orderBy: { createdAt: 'desc' },
    })

    // Parse products JSON for each inquiry
    const parsedInquiries = inquiries.map(inquiry => ({
      ...inquiry,
      products: JSON.parse(inquiry.products),
    }))

    return NextResponse.json(parsedInquiries)
  } catch (error) {
    console.error('Error fetching product inquiries:', error)
    return NextResponse.json(
      { error: 'Ein Fehler ist aufgetreten' },
      { status: 500 }
    )
  }
}

