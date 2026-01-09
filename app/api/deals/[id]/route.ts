import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { slugify } from '@/lib/utils'

// GET single deal
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const deal = await prisma.deal.findUnique({
      where: { id },
      include: {
        inquiries: {
          orderBy: { createdAt: 'desc' },
        },
      },
    })

    if (!deal) {
      return NextResponse.json(
        { error: 'Deal nicht gefunden' },
        { status: 404 }
      )
    }

    return NextResponse.json(deal)
  } catch (error) {
    console.error('Error fetching deal:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden des Deals' },
      { status: 500 }
    )
  }
}

// PATCH update deal
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const updateData: Record<string, unknown> = {}
    
    if (body.title !== undefined) {
      updateData.title = body.title
      updateData.slug = slugify(body.title)
    }
    if (body.description !== undefined) updateData.description = body.description
    if (body.price !== undefined) updateData.price = body.price
    if (body.unit !== undefined) updateData.unit = body.unit
    if (body.imageUrl !== undefined) updateData.imageUrl = body.imageUrl
    if (body.category !== undefined) updateData.category = body.category
    if (body.isActive !== undefined) updateData.isActive = body.isActive
    if (body.validUntil !== undefined) updateData.validUntil = body.validUntil ? new Date(body.validUntil) : null

    const deal = await prisma.deal.update({
      where: { id },
      data: updateData,
    })

    return NextResponse.json(deal)
  } catch (error) {
    console.error('Error updating deal:', error)
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren des Deals' },
      { status: 500 }
    )
  }
}

// DELETE deal
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    await prisma.deal.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting deal:', error)
    return NextResponse.json(
      { error: 'Fehler beim Löschen des Deals' },
      { status: 500 }
    )
  }
}

