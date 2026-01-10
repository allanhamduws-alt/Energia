import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/brands/[id] - Einzelne Marke
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const brand = await prisma.brand.findUnique({
      where: { id },
      include: {
        products: {
          where: { isActive: true },
          orderBy: [
            { category: 'asc' },
            { sortOrder: 'asc' },
          ],
        },
      },
    })

    if (!brand) {
      return NextResponse.json(
        { error: 'Marke nicht gefunden' },
        { status: 404 }
      )
    }

    // JSON-Felder parsen
    const parsedBrand = {
      ...brand,
      categories: JSON.parse(brand.categories || '[]'),
      highlights: brand.highlights ? JSON.parse(brand.highlights) : [],
      products: brand.products.map((product) => ({
        ...product,
        specs: JSON.parse(product.specs || '[]'),
        detailedSpecs: JSON.parse(product.detailedSpecs || '{}'),
      })),
    }

    return NextResponse.json(parsedBrand)
  } catch (error) {
    console.error('Error fetching brand:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Marke' },
      { status: 500 }
    )
  }
}

// PUT /api/brands/[id] - Marke aktualisieren
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()

    const {
      name,
      slug,
      logoUrl,
      description,
      website,
      categories,
      highlights,
      sortOrder,
      isActive,
    } = body

    // Prüfen ob Marke existiert
    const existingBrand = await prisma.brand.findUnique({
      where: { id },
    })

    if (!existingBrand) {
      return NextResponse.json(
        { error: 'Marke nicht gefunden' },
        { status: 404 }
      )
    }

    // Wenn slug geändert wird, prüfen ob neuer Slug bereits existiert
    if (slug && slug !== existingBrand.slug) {
      const slugExists = await prisma.brand.findUnique({
        where: { slug },
      })

      if (slugExists) {
        return NextResponse.json(
          { error: 'Eine Marke mit diesem Slug existiert bereits' },
          { status: 409 }
        )
      }
    }

    const brand = await prisma.brand.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(slug !== undefined && { slug }),
        ...(logoUrl !== undefined && { logoUrl }),
        ...(description !== undefined && { description }),
        ...(website !== undefined && { website }),
        ...(categories !== undefined && { categories: JSON.stringify(categories) }),
        ...(highlights !== undefined && { highlights: JSON.stringify(highlights) }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(isActive !== undefined && { isActive }),
      },
    })

    return NextResponse.json({
      ...brand,
      categories: JSON.parse(brand.categories),
      highlights: brand.highlights ? JSON.parse(brand.highlights) : [],
    })
  } catch (error) {
    console.error('Error updating brand:', error)
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren der Marke' },
      { status: 500 }
    )
  }
}

// DELETE /api/brands/[id] - Marke löschen
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Prüfen ob Marke existiert
    const existingBrand = await prisma.brand.findUnique({
      where: { id },
      include: {
        products: {
          select: { id: true },
          take: 1,
        },
      },
    })

    if (!existingBrand) {
      return NextResponse.json(
        { error: 'Marke nicht gefunden' },
        { status: 404 }
      )
    }

    // Warnung wenn Produkte existieren
    if (existingBrand.products.length > 0) {
      return NextResponse.json(
        { error: 'Marke kann nicht gelöscht werden, da noch Produkte zugeordnet sind' },
        { status: 400 }
      )
    }

    await prisma.brand.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting brand:', error)
    return NextResponse.json(
      { error: 'Fehler beim Löschen der Marke' },
      { status: 500 }
    )
  }
}

