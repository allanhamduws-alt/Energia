import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/brands - Liste aller Marken
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const isActive = searchParams.get('active')
    const withProducts = searchParams.get('withProducts')

    // Filter aufbauen
    const where: {
      isActive?: boolean
      categories?: { contains: string }
    } = {}

    if (isActive !== 'all') {
      where.isActive = true
    }

    // Filter nach Kategorie (prüft ob Kategorie im JSON-Array enthalten ist)
    if (category) {
      where.categories = { contains: `"${category}"` }
    }

    const brands = await prisma.brand.findMany({
      where,
      include: {
        _count: {
          select: { products: true }
        },
        ...(withProducts === 'true' ? {
          products: {
            where: { isActive: true },
            select: {
              id: true,
              name: true,
              category: true,
            },
            orderBy: { sortOrder: 'asc' },
          },
        } : {}),
      },
      orderBy: { sortOrder: 'asc' },
    })

    // JSON-Felder parsen
    const parsedBrands = brands.map((brand) => ({
      ...brand,
      categories: JSON.parse(brand.categories || '[]'),
      highlights: brand.highlights ? JSON.parse(brand.highlights) : [],
    }))

    return NextResponse.json(parsedBrands)
  } catch (error) {
    console.error('Error fetching brands:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Marken' },
      { status: 500 }
    )
  }
}

// POST /api/brands - Neue Marke erstellen
export async function POST(request: NextRequest) {
  try {
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

    // Validierung
    if (!name || !slug) {
      return NextResponse.json(
        { error: 'Name und Slug sind erforderlich' },
        { status: 400 }
      )
    }

    // Prüfen ob Slug bereits existiert
    const existingBrand = await prisma.brand.findUnique({
      where: { slug },
    })

    if (existingBrand) {
      return NextResponse.json(
        { error: 'Eine Marke mit diesem Slug existiert bereits' },
        { status: 409 }
      )
    }

    const brand = await prisma.brand.create({
      data: {
        name,
        slug,
        logoUrl: logoUrl || null,
        description: description || null,
        website: website || null,
        categories: JSON.stringify(categories || []),
        highlights: highlights ? JSON.stringify(highlights) : null,
        sortOrder: sortOrder || 0,
        isActive: isActive !== false,
      },
    })

    return NextResponse.json({
      ...brand,
      categories: JSON.parse(brand.categories),
      highlights: brand.highlights ? JSON.parse(brand.highlights) : [],
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating brand:', error)
    return NextResponse.json(
      { error: 'Fehler beim Erstellen der Marke' },
      { status: 500 }
    )
  }
}

