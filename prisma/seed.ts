import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const hashedPassword = await bcrypt.hash('admin123', 12)
  
  const admin = await prisma.admin.upsert({
    where: { email: 'admin@energia-b2b.de' },
    update: {},
    create: {
      email: 'admin@energia-b2b.de',
      password: hashedPassword,
      name: 'Ouissam Benabbou',
    },
  })
  console.log('✅ Admin user created:', admin.email)

  // Create sample brands
  const brands = [
    { name: 'SMA', sortOrder: 1 },
    { name: 'Sungrow', sortOrder: 2 },
    { name: 'Huawei', sortOrder: 3 },
    { name: 'Aiko', sortOrder: 4 },
    { name: 'BYD', sortOrder: 5 },
    { name: 'Kostal', sortOrder: 6 },
  ]

  for (const brand of brands) {
    await prisma.brand.upsert({
      where: { name: brand.name },
      update: {},
      create: brand,
    })
  }
  console.log('✅ Brands created')

  // Create sample deal
  const deal = await prisma.deal.upsert({
    where: { slug: 'pv-module-sonderaktion' },
    update: {},
    create: {
      title: 'PV-Module Sonderaktion',
      description: 'Hochwertige monokristalline PV-Module von führenden Herstellern zu attraktiven B2B-Konditionen. Begrenzte Stückzahl verfügbar.',
      price: 'Preis auf Anfrage',
      unit: 'B2B-Konditionen',
      category: 'module',
      isActive: true,
      slug: 'pv-module-sonderaktion',
    },
  })
  console.log('✅ Sample deal created:', deal.title)

  // Create sample references
  const references = [
    {
      title: 'Großhandelsbelieferung Deutschland',
      description: 'Regelmäßige Belieferung eines etablierten PV-Großhändlers mit Modulen und Wechselrichtern verschiedener Hersteller.',
      iconName: 'building',
      sortOrder: 1,
    },
    {
      title: 'Installationsbetrieb Versorgung',
      description: 'Kontinuierliche Versorgung eines Installationsbetriebs mit Wechselrichtern und Speichersystemen.',
      iconName: 'users',
      sortOrder: 2,
    },
    {
      title: 'Projektbeschaffung Europa',
      description: 'Beschaffung von Modulen und Komponenten für Großprojekte im europäischen Ausland.',
      iconName: 'truck',
      sortOrder: 3,
    },
  ]

  for (const ref of references) {
    await prisma.reference.create({
      data: ref,
    })
  }
  console.log('✅ References created')

  console.log('🎉 Seeding complete!')
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

