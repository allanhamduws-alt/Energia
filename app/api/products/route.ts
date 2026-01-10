import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products - Liste aller Produkte
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const category = searchParams.get('category')
    const brandSlug = searchParams.get('brand')
    const featured = searchParams.get('featured')
    const isActive = searchParams.get('active')

    // Filter aufbauen
    const where: {
      category?: string
      brand?: { slug: string }
      featured?: boolean
      isActive?: boolean
    } = {}

    if (category) {
      where.category = category
    }
    if (brandSlug) {
      where.brand = { slug: brandSlug }
    }
    if (featured === 'true') {
      where.featured = true
    }
    if (isActive !== 'all') {
      where.isActive = true
    }

    const products = await prisma.product.findMany({
      where,
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
          },
        },
      },
      orderBy: [
        { category: 'asc' },
        { sortOrder: 'asc' },
        { name: 'asc' },
      ],
    })

    // JSON-Felder parsen
    const parsedProducts = products.map((product) => ({
      ...product,
      specs: JSON.parse(product.specs || '[]'),
      detailedSpecs: JSON.parse(product.detailedSpecs || '{}'),
    }))

    return NextResponse.json(parsedProducts)
  } catch (error) {
    console.error('Error fetching products:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Produkte' },
      { status: 500 }
    )
  }
}

// POST /api/products - Neues Produkt erstellen
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const {
      name,
      subtitle,
      category,
      brandId,
      imageUrl,
      specs,
      detailedSpecs,
      unit,
      featured,
      sortOrder,
      isActive,
    } = body

    // Validierung
    if (!name || !subtitle || !category || !brandId) {
      return NextResponse.json(
        { error: 'Name, Subtitle, Kategorie und Marke sind erforderlich' },
        { status: 400 }
      )
    }

    // Prüfen ob Brand existiert
    const brand = await prisma.brand.findUnique({
      where: { id: brandId },
    })

    if (!brand) {
      return NextResponse.json(
        { error: 'Marke nicht gefunden' },
        { status: 404 }
      )
    }

    const product = await prisma.product.create({
      data: {
        name,
        subtitle,
        category,
        brandId,
        imageUrl: imageUrl || null,
        specs: JSON.stringify(specs || []),
        detailedSpecs: JSON.stringify(detailedSpecs || {}),
        unit: unit || 'Stück',
        featured: featured || false,
        sortOrder: sortOrder || 0,
        isActive: isActive !== false,
      },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
          },
        },
      },
    })

    return NextResponse.json({
      ...product,
      specs: JSON.parse(product.specs),
      detailedSpecs: JSON.parse(product.detailedSpecs),
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating product:', error)
    return NextResponse.json(
      { error: 'Fehler beim Erstellen des Produkts' },
      { status: 500 }
    )
  }
}

