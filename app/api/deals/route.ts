import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'

// GET all deals (or active deals only)
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const activeOnly = searchParams.get('active') === 'true'

    const deals = await prisma.deal.findMany({
      where: activeOnly ? { isActive: true } : undefined,
      orderBy: { createdAt: 'desc' },
      include: {
        _count: {
          select: { inquiries: true },
        },
      },
    })
    return NextResponse.json(deals)
  } catch (error) {
    console.error('Error fetching deals:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Deals' },
      { status: 500 }
    )
  }
}

// POST new deal
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const deal = await prisma.deal.create({
      data: {
        title: body.title,
        description: body.description,
        price: body.price || null,
        unit: body.unit || null,
        imageUrl: body.imageUrl || null,
        category: body.category,
        isActive: body.isActive ?? true,
        validUntil: body.validUntil ? new Date(body.validUntil) : null,
        slug: slugify(body.title),
      },
    })

    return NextResponse.json(deal, { status: 201 })
  } catch (error) {
    console.error('Error creating deal:', error)
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Deals' },
      { status: 500 }
    )
  }
}

