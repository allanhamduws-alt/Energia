import { NextRequest, NextResponse } from 'next/server'
import prisma from '@/lib/prisma'
import { startOfWeek, endOfWeek } from 'date-fns'

export async function GET() {
  try {
    const now = new Date()
    const weekStart = startOfWeek(now, { weekStartsOn: 1 })
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 })

    // Terminanfragen
    const appointmentsCount = await prisma.appointment.count()
    const appointmentsNew = await prisma.appointment.count({
      where: {
        createdAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    })

    // Kontaktanfragen
    const contactsCount = await prisma.contactInquiry.count()
    const contactsNew = await prisma.contactInquiry.count({
      where: {
        createdAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    })

    // Deal-Anfragen
    const dealInquiriesCount = await prisma.dealInquiry.count()
    const dealInquiriesNew = await prisma.dealInquiry.count({
      where: {
        createdAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    })

    // Chat-Gespräche
    const chatsCount = await prisma.chatConversation.count()
    const chatsNew = await prisma.chatConversation.count({
      where: {
        createdAt: {
          gte: weekStart,
          lte: weekEnd,
        },
      },
    })

    // Letzte Aktivitäten (kombiniert)
    const recentAppointments = await prisma.appointment.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, firstName: true, lastName: true, company: true, status: true, createdAt: true }
    })

    const recentContacts = await prisma.contactInquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, firstName: true, lastName: true, company: true, status: true, createdAt: true, subject: true }
    })

    const recentDealInquiries = await prisma.dealInquiry.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      include: { deal: { select: { title: true } } }
    })

    return NextResponse.json({
      stats: {
        appointments: { value: appointmentsCount, change: appointmentsNew },
        contacts: { value: contactsCount, change: contactsNew },
        dealInquiries: { value: dealInquiriesCount, change: dealInquiriesNew },
        chats: { value: chatsCount, change: chatsNew },
      },
      activities: [
        ...recentAppointments.map(a => ({
          type: 'termin',
          title: `Termin: ${a.firstName} ${a.lastName} (${a.company})`,
          time: a.createdAt,
          status: a.status
        })),
        ...recentContacts.map(c => ({
          type: 'kontakt',
          title: `Kontakt: ${c.subject} (${c.firstName} ${c.lastName})`,
          time: c.createdAt,
          status: c.status
        })),
        ...recentDealInquiries.map(d => ({
          type: 'deal',
          title: `Deal-Anfrage: ${d.deal.title} (${d.firstName} ${d.lastName})`,
          time: d.createdAt,
          status: d.status
        })),
      ].sort((a, b) => new Date(b.time).getTime() - new Date(a.time).getTime()).slice(0, 10)
    })
  } catch (error) {
    console.error('Error fetching dashboard stats:', error)
    return NextResponse.json(
      { error: 'Fehler beim Laden der Statistiken' },
      { status: 500 }
    )
  }
}

