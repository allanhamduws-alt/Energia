import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// GET /api/products/[id] - Einzelnes Produkt
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        brand: {
          select: {
            id: true,
            name: true,
            slug: true,
            logoUrl: true,
            description: true,
            website: true,
          },
        },
      },
    })

    if (!product) {
      return NextResponse.json(
        { error: 'Produkt nicht gefunden' },
        { status: 404 }
      )
    }

    return NextResponse.json({
      ...product,
      specs: JSON.parse(product.specs || '[]'),
      detailedSpecs: JSON.parse(product.detailedSpecs || '{}'),
    })
  } catch (error) {
    console.error('Error fetching product:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden des Produkts' },
      { status: 500 }
    )
  }
}

// PUT /api/products/[id] - Produkt aktualisieren
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
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

    // Prüfen ob Produkt existiert
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produkt nicht gefunden' },
        { status: 404 }
      )
    }

    // Wenn brandId geändert wird, prüfen ob neue Brand existiert
    if (brandId && brandId !== existingProduct.brandId) {
      const brand = await prisma.brand.findUnique({
        where: { id: brandId },
      })

      if (!brand) {
        return NextResponse.json(
          { error: 'Marke nicht gefunden' },
          { status: 404 }
        )
      }
    }

    const product = await prisma.product.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(subtitle !== undefined && { subtitle }),
        ...(category !== undefined && { category }),
        ...(brandId !== undefined && { brandId }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(specs !== undefined && { specs: JSON.stringify(specs) }),
        ...(detailedSpecs !== undefined && { detailedSpecs: JSON.stringify(detailedSpecs) }),
        ...(unit !== undefined && { unit }),
        ...(featured !== undefined && { featured }),
        ...(sortOrder !== undefined && { sortOrder }),
        ...(isActive !== undefined && { isActive }),
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
    })
  } catch (error) {
    console.error('Error updating product:', error)
    return NextResponse.json(
      { error: 'Fehler beim Aktualisieren des Produkts' },
      { status: 500 }
    )
  }
}

// DELETE /api/products/[id] - Produkt löschen
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params

    // Prüfen ob Produkt existiert
    const existingProduct = await prisma.product.findUnique({
      where: { id },
    })

    if (!existingProduct) {
      return NextResponse.json(
        { error: 'Produkt nicht gefunden' },
        { status: 404 }
      )
    }

    await prisma.product.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting product:', error)
    return NextResponse.json(
      { error: 'Fehler beim Löschen des Produkts' },
      { status: 500 }
    )
  }
}

