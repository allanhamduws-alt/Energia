import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions, hashPassword, verifyPassword } from '@/lib/auth'
import prisma from '@/lib/prisma'

// GET - Einstellungen abrufen
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }

    // Settings abrufen oder erstellen wenn nicht vorhanden
    let settings = await prisma.settings.findUnique({
      where: { id: 'default' },
    })

    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: 'default' },
      })
    }

    // Notifications als JSON parsen
    const response = {
      ...settings,
      notifications: JSON.parse(settings.notifications),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error fetching settings:', error)
    return NextResponse.json({ error: 'Fehler beim Laden der Einstellungen' }, { status: 500 })
  }
}

// PATCH - Einstellungen aktualisieren
export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 401 })
    }

    const body = await request.json()
    
    // Wenn Passwort-Änderung
    if (body.changePassword) {
      const { currentPassword, newPassword } = body.changePassword
      
      // Admin-Benutzer finden
      const admin = await prisma.admin.findUnique({
        where: { email: session.user?.email || '' },
      })

      if (!admin) {
        return NextResponse.json({ error: 'Admin nicht gefunden' }, { status: 404 })
      }

      // Aktuelles Passwort prüfen
      const isValid = await verifyPassword(currentPassword, admin.password)
      if (!isValid) {
        return NextResponse.json({ error: 'Aktuelles Passwort ist falsch' }, { status: 400 })
      }

      // Neues Passwort hashen und speichern
      const hashedPassword = await hashPassword(newPassword)
      await prisma.admin.update({
        where: { id: admin.id },
        data: { password: hashedPassword },
      })

      return NextResponse.json({ message: 'Passwort erfolgreich geändert' })
    }

    // Notifications zu JSON-String konvertieren wenn vorhanden
    const updateData = { ...body }
    if (body.notifications) {
      updateData.notifications = JSON.stringify(body.notifications)
    }

    // Einstellungen aktualisieren
    const settings = await prisma.settings.upsert({
      where: { id: 'default' },
      update: updateData,
      create: {
        id: 'default',
        ...updateData,
      },
    })

    // Notifications als JSON parsen für Response
    const response = {
      ...settings,
      notifications: JSON.parse(settings.notifications),
    }

    return NextResponse.json(response)
  } catch (error) {
    console.error('Error updating settings:', error)
    return NextResponse.json({ error: 'Fehler beim Speichern der Einstellungen' }, { status: 500 })
  }
}

