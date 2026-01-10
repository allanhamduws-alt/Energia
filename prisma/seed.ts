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

  // ========================================
  // MARKEN mit echten Daten
  // ========================================
  const brandsData = [
    {
      name: 'AIKO',
      slug: 'aiko',
      logoUrl: '/images/brands/Aiko.png',
      description: 'AIKO ist ein führender Hersteller von hocheffizienten N-Type Solarmodulen mit ABC-Technologie (All Back Contact).',
      website: 'https://www.aikosolar.com',
      categories: JSON.stringify(['module']),
      highlights: JSON.stringify(['N-Type ABC', 'Höchste Effizienz', 'Premium Qualität']),
      sortOrder: 1,
    },
    {
      name: 'JA Solar',
      slug: 'ja-solar',
      logoUrl: '/images/brands/JA_Solar.png',
      description: 'JA Solar ist einer der weltweit größten Hersteller von Hochleistungs-Photovoltaikprodukten.',
      website: 'https://www.jasolar.com',
      categories: JSON.stringify(['module']),
      highlights: JSON.stringify(['Tier 1', 'Bifazial', 'Weltweit führend']),
      sortOrder: 2,
    },
    {
      name: 'Trina Solar',
      slug: 'trina-solar',
      logoUrl: '/images/brands/Trina_Solar.png',
      description: 'Trina Solar ist ein globaler Marktführer für intelligente Solarenergielösungen.',
      website: 'https://www.trinasolar.com',
      categories: JSON.stringify(['module']),
      highlights: JSON.stringify(['Vertex Technology', 'TOPCon', 'Innovation Leader']),
      sortOrder: 3,
    },
    {
      name: 'LONGi',
      slug: 'longi',
      logoUrl: '/images/brands/longi-solar.png',
      description: 'LONGi ist der weltweit größte Hersteller von monokristallinen Siliziumwafern und Modulen.',
      website: 'https://www.longi.com',
      categories: JSON.stringify(['module']),
      highlights: JSON.stringify(['Weltmarktführer', 'Hi-MO Technologie', 'PERC']),
      sortOrder: 4,
    },
    {
      name: 'Canadian Solar',
      slug: 'canadian-solar',
      logoUrl: '/images/brands/Canadian_Solar.svg',
      description: 'Canadian Solar ist ein führendes Unternehmen für Solarenergielösungen mit über 20 Jahren Erfahrung.',
      website: 'https://www.canadiansolar.com',
      categories: JSON.stringify(['module']),
      highlights: JSON.stringify(['20+ Jahre Erfahrung', 'HiKu Serie', 'Global Player']),
      sortOrder: 5,
    },
    {
      name: 'Sungrow',
      slug: 'sungrow',
      logoUrl: '/images/brands/sungrow.svg',
      description: 'Sungrow ist der weltweit führende Hersteller von Wechselrichtern mit über 515 GW installierter Leistung.',
      website: 'https://www.sungrowpower.com',
      categories: JSON.stringify(['wechselrichter', 'speicher']),
      highlights: JSON.stringify(['Weltmarktführer', 'Hybrid-Systeme', '515+ GW installiert']),
      sortOrder: 6,
    },
    {
      name: 'SMA',
      slug: 'sma',
      logoUrl: '/images/brands/Logo_SMA..png',
      description: 'SMA Solar Technology AG ist ein deutscher Hersteller von Wechselrichtern für Photovoltaikanlagen.',
      website: 'https://www.sma.de',
      categories: JSON.stringify(['wechselrichter']),
      highlights: JSON.stringify(['Made in Germany', 'Premium Qualität', '40+ Jahre Erfahrung']),
      sortOrder: 7,
    },
    {
      name: 'Huawei',
      slug: 'huawei',
      logoUrl: '/images/brands/huawei-logo.svg',
      description: 'Huawei FusionSolar bietet intelligente PV-Lösungen mit AI-optimierten Wechselrichtern.',
      website: 'https://solar.huawei.com',
      categories: JSON.stringify(['wechselrichter', 'speicher']),
      highlights: JSON.stringify(['AI-Optimierung', 'Smart String', 'LUNA Speicher']),
      sortOrder: 8,
    },
    {
      name: 'KOSTAL',
      slug: 'kostal',
      logoUrl: '/images/brands/kostal.png',
      description: 'KOSTAL Solar Electric ist ein deutscher Hersteller von intelligenten Wechselrichtern.',
      website: 'https://www.kostal-solar-electric.com',
      categories: JSON.stringify(['wechselrichter']),
      highlights: JSON.stringify(['Made in Germany', 'Plenticore', 'Smart Energy']),
      sortOrder: 9,
    },
    {
      name: 'BYD',
      slug: 'byd',
      logoUrl: '/images/brands/BYD.svg',
      description: 'BYD ist weltweit führend in der Batterietechnologie mit der beliebten Battery-Box Serie.',
      website: 'https://www.bydbatterybox.com',
      categories: JSON.stringify(['speicher']),
      highlights: JSON.stringify(['LFP Technologie', 'Battery-Box', 'Modulares System']),
      sortOrder: 10,
    },
  ]

  // Erstelle/Aktualisiere Marken
  const brands: Record<string, { id: string }> = {}
  for (const brandData of brandsData) {
    const brand = await prisma.brand.upsert({
      where: { slug: brandData.slug },
      update: brandData,
      create: brandData,
    })
    brands[brandData.slug] = { id: brand.id }
  }
  console.log('✅ Brands created:', Object.keys(brands).length)

  // ========================================
  // PRODUKTE mit echten Daten aus Datenblättern
  // ========================================
  const productsData = [
    // ---- SOLARMODULE ----
    {
      name: 'AIKO Neostar 2S',
      subtitle: 'N-Type ABC 475W Fullblack',
      category: 'module',
      brandSlug: 'aiko',
      imageUrl: '/images/products/solar-module-transparent.png',
      specs: JSON.stringify(['475 Wp', 'Fullblack', 'N-Type ABC', '22.3% Effizienz']),
      detailedSpecs: JSON.stringify({
        'Nennleistung': '475 Wp',
        'Moduleffizienz': '22.3%',
        'Zelltechnologie': 'N-Type ABC (All Back Contact)',
        'Abmessungen': '1722 × 1134 × 30 mm',
        'Gewicht': '21.5 kg',
        'Rahmen': 'Schwarz eloxiert',
        'Garantie': '25 Jahre Produkt, 30 Jahre Leistung',
        'Temperaturkoeffizient': '-0.29%/°C',
      }),
      unit: 'Stück',
      featured: true,
      sortOrder: 1,
    },
    {
      name: 'JA Solar DeepBlue 4.0 Pro',
      subtitle: 'Bifazial 550W n-Type',
      category: 'module',
      brandSlug: 'ja-solar',
      imageUrl: '/images/products/solar-module-transparent.png',
      specs: JSON.stringify(['550 Wp', 'Bifazial', 'n-Type', '22.4% Effizienz']),
      detailedSpecs: JSON.stringify({
        'Nennleistung': '550 Wp',
        'Moduleffizienz': '22.4%',
        'Zelltechnologie': 'n-Type Mono PERC',
        'Bifazialität': 'Bis zu 30% Mehrertrag',
        'Abmessungen': '2278 × 1134 × 30 mm',
        'Gewicht': '28.6 kg',
        'Garantie': '25 Jahre Produkt, 25 Jahre Leistung',
        'Temperaturkoeffizient': '-0.30%/°C',
      }),
      unit: 'Stück',
      featured: true,
      sortOrder: 2,
    },
    {
      name: 'Trina Solar Vertex S+',
      subtitle: 'TOPCon 445W',
      category: 'module',
      brandSlug: 'trina-solar',
      imageUrl: '/images/products/solar-module-transparent.png',
      specs: JSON.stringify(['445 Wp', 'TOPCon', 'n-Type', '22.5% Effizienz']),
      detailedSpecs: JSON.stringify({
        'Nennleistung': '445 Wp',
        'Moduleffizienz': '22.5%',
        'Zelltechnologie': 'TOPCon n-Type',
        'Abmessungen': '1762 × 1134 × 30 mm',
        'Gewicht': '22 kg',
        'Rahmen': 'Silber oder Schwarz',
        'Garantie': '25 Jahre Produkt, 25 Jahre Leistung',
        'Temperaturkoeffizient': '-0.29%/°C',
      }),
      unit: 'Stück',
      featured: false,
      sortOrder: 3,
    },
    {
      name: 'LONGi Hi-MO 6',
      subtitle: 'HPDC 450W Scientist',
      category: 'module',
      brandSlug: 'longi',
      imageUrl: '/images/products/solar-module-transparent.png',
      specs: JSON.stringify(['450 Wp', 'HPDC', 'n-Type', '22.8% Effizienz']),
      detailedSpecs: JSON.stringify({
        'Nennleistung': '450 Wp',
        'Moduleffizienz': '22.8%',
        'Zelltechnologie': 'HPDC (High Performance Double Cell)',
        'Abmessungen': '1722 × 1134 × 30 mm',
        'Gewicht': '21 kg',
        'Garantie': '25 Jahre Produkt, 25 Jahre Leistung',
        'Temperaturkoeffizient': '-0.28%/°C',
      }),
      unit: 'Stück',
      featured: false,
      sortOrder: 4,
    },
    {
      name: 'Canadian Solar HiKu7',
      subtitle: 'Mono PERC 665W',
      category: 'module',
      brandSlug: 'canadian-solar',
      imageUrl: '/images/products/solar-module-transparent.png',
      specs: JSON.stringify(['665 Wp', 'Mono PERC', 'Bifazial', '21.8% Effizienz']),
      detailedSpecs: JSON.stringify({
        'Nennleistung': '665 Wp',
        'Moduleffizienz': '21.8%',
        'Zelltechnologie': 'Mono PERC',
        'Bifazialität': 'Bis zu 25% Mehrertrag',
        'Abmessungen': '2384 × 1303 × 35 mm',
        'Gewicht': '37.5 kg',
        'Garantie': '25 Jahre Produkt, 25 Jahre Leistung',
        'Temperaturkoeffizient': '-0.34%/°C',
      }),
      unit: 'Stück',
      featured: false,
      sortOrder: 5,
    },

    // ---- WECHSELRICHTER ----
    {
      name: 'Sungrow SH5.0RS',
      subtitle: 'Hybrid Wechselrichter 5kW',
      category: 'wechselrichter',
      brandSlug: 'sungrow',
      imageUrl: '/images/products/inverter.png',
      specs: JSON.stringify(['5 kW', 'Hybrid', '1-phasig', '97.8% Effizienz']),
      detailedSpecs: JSON.stringify({
        'AC-Nennleistung': '5 kW',
        'Max. DC-Leistung': '7.5 kW',
        'Max. Effizienz': '97.8%',
        'Phasen': '1-phasig',
        'Batterieanschluss': 'Integriert',
        'Backup-Funktion': 'Ja (Optional)',
        'Abmessungen': '400 × 380 × 170 mm',
        'Gewicht': '17 kg',
        'Garantie': '10 Jahre (erweiterbar)',
      }),
      unit: 'Stück',
      featured: true,
      sortOrder: 1,
    },
    {
      name: 'Sungrow SH10RS',
      subtitle: 'Hybrid Wechselrichter 10kW',
      category: 'wechselrichter',
      brandSlug: 'sungrow',
      imageUrl: '/images/products/inverter.png',
      specs: JSON.stringify(['10 kW', 'Hybrid', '3-phasig', '97.9% Effizienz']),
      detailedSpecs: JSON.stringify({
        'AC-Nennleistung': '10 kW',
        'Max. DC-Leistung': '15 kW',
        'Max. Effizienz': '97.9%',
        'Phasen': '3-phasig',
        'Batterieanschluss': 'Integriert',
        'Backup-Funktion': 'Ja (Optional)',
        'Abmessungen': '480 × 415 × 175 mm',
        'Gewicht': '23 kg',
        'Garantie': '10 Jahre (erweiterbar)',
      }),
      unit: 'Stück',
      featured: false,
      sortOrder: 2,
    },
    {
      name: 'SMA Sunny Tripower X 12',
      subtitle: '3-Phasen Wechselrichter 12kW',
      category: 'wechselrichter',
      brandSlug: 'sma',
      imageUrl: '/images/products/inverter.png',
      specs: JSON.stringify(['12 kW', '3-phasig', 'Made in Germany', '98.2% Effizienz']),
      detailedSpecs: JSON.stringify({
        'AC-Nennleistung': '12 kW',
        'Max. DC-Leistung': '18 kW',
        'Max. Effizienz': '98.2%',
        'Phasen': '3-phasig',
        'MPP-Tracker': '3',
        'Integrierter DC-Schalter': 'Ja',
        'Abmessungen': '595 × 505 × 215 mm',
        'Gewicht': '28 kg',
        'Garantie': '5 Jahre (erweiterbar auf 20 Jahre)',
        'Herstellung': 'Made in Germany',
      }),
      unit: 'Stück',
      featured: true,
      sortOrder: 3,
    },
    {
      name: 'Huawei SUN2000-10KTL-M1',
      subtitle: 'Smart String Wechselrichter 10kW',
      category: 'wechselrichter',
      brandSlug: 'huawei',
      imageUrl: '/images/products/inverter.png',
      specs: JSON.stringify(['10 kW', '3-phasig', 'AI-Optimiert', '98.6% Effizienz']),
      detailedSpecs: JSON.stringify({
        'AC-Nennleistung': '10 kW',
        'Max. DC-Leistung': '15 kW',
        'Max. Effizienz': '98.6%',
        'Phasen': '3-phasig',
        'MPP-Tracker': '2 (AI-Optimiert)',
        'Smart I-V Kurvendiagnose': 'Ja',
        'Abmessungen': '525 × 470 × 160 mm',
        'Gewicht': '17.5 kg',
        'Garantie': '10 Jahre',
        'Besonderheit': 'FusionSolar App',
      }),
      unit: 'Stück',
      featured: false,
      sortOrder: 4,
    },
    {
      name: 'KOSTAL Plenticore plus 10',
      subtitle: 'Hybrid Wechselrichter 10kW',
      category: 'wechselrichter',
      brandSlug: 'kostal',
      imageUrl: '/images/products/inverter.png',
      specs: JSON.stringify(['10 kW', 'Hybrid', '3-phasig', '98.2% Effizienz']),
      detailedSpecs: JSON.stringify({
        'AC-Nennleistung': '10 kW',
        'Max. DC-Leistung': '15 kW',
        'Max. Effizienz': '98.2%',
        'Phasen': '3-phasig',
        'MPP-Tracker': '3',
        'Batterieanschluss': 'Optional (DC-seitig)',
        'Abmessungen': '513 × 394 × 177 mm',
        'Gewicht': '21 kg',
        'Garantie': '10 Jahre',
        'Herstellung': 'Made in Germany',
      }),
      unit: 'Stück',
      featured: false,
      sortOrder: 5,
    },

    // ---- SPEICHER ----
    {
      name: 'BYD Battery-Box Premium HVS 10.2',
      subtitle: 'Hochvolt-Speicher 10.2 kWh',
      category: 'speicher',
      brandSlug: 'byd',
      imageUrl: '/images/products/battery.png',
      specs: JSON.stringify(['10.2 kWh', 'LFP', 'Hochvolt', 'Modular']),
      detailedSpecs: JSON.stringify({
        'Nutzbare Kapazität': '10.2 kWh',
        'Batteriechemie': 'LFP (Lithium-Eisenphosphat)',
        'Systemspannung': '204-512V',
        'Entladeleistung': 'Bis 10.2 kW',
        'Module': '4 × 2.56 kWh',
        'Erweiterbar': 'Ja (2.56 kWh Module)',
        'Abmessungen': '585 × 690 × 298 mm',
        'Gewicht': '124 kg',
        'Garantie': '10 Jahre',
        'Zyklen': '>6000',
      }),
      unit: 'System',
      featured: true,
      sortOrder: 1,
    },
    {
      name: 'BYD Battery-Box Premium HVS 12.8',
      subtitle: 'Hochvolt-Speicher 12.8 kWh',
      category: 'speicher',
      brandSlug: 'byd',
      imageUrl: '/images/products/battery.png',
      specs: JSON.stringify(['12.8 kWh', 'LFP', 'Hochvolt', 'Modular']),
      detailedSpecs: JSON.stringify({
        'Nutzbare Kapazität': '12.8 kWh',
        'Batteriechemie': 'LFP (Lithium-Eisenphosphat)',
        'Systemspannung': '256-512V',
        'Entladeleistung': 'Bis 12.8 kW',
        'Module': '5 × 2.56 kWh',
        'Erweiterbar': 'Ja (2.56 kWh Module)',
        'Abmessungen': '585 × 835 × 298 mm',
        'Gewicht': '152 kg',
        'Garantie': '10 Jahre',
        'Zyklen': '>6000',
      }),
      unit: 'System',
      featured: false,
      sortOrder: 2,
    },
    {
      name: 'Huawei LUNA2000-10-S0',
      subtitle: 'Smart String Speicher 10 kWh',
      category: 'speicher',
      brandSlug: 'huawei',
      imageUrl: '/images/products/battery.png',
      specs: JSON.stringify(['10 kWh', 'LFP', 'Modular', 'AI-Management']),
      detailedSpecs: JSON.stringify({
        'Nutzbare Kapazität': '10 kWh',
        'Batteriechemie': 'LFP (Lithium-Eisenphosphat)',
        'Systemspannung': ''
        + '350-560V',
        'Entladeleistung': 'Bis 5 kW',
        'Module': '2 × 5 kWh',
        'Erweiterbar': 'Bis 30 kWh',
        'Abmessungen': '670 × 670 × 150 mm (je Modul)',
        'Gewicht': '63.8 kg (je Modul)',
        'Garantie': '10 Jahre',
        'Besonderheit': 'FusionSolar AI-Optimierung',
      }),
      unit: 'System',
      featured: true,
      sortOrder: 3,
    },
    {
      name: 'Sungrow SBR128',
      subtitle: 'Hochvolt-Speicher 12.8 kWh',
      category: 'speicher',
      brandSlug: 'sungrow',
      imageUrl: '/images/products/battery.png',
      specs: JSON.stringify(['12.8 kWh', 'LFP', 'Hochvolt', 'Modular']),
      detailedSpecs: JSON.stringify({
        'Nutzbare Kapazität': '12.8 kWh',
        'Batteriechemie': 'LFP (Lithium-Eisenphosphat)',
        'Systemspannung': '320-512V',
        'Entladeleistung': 'Bis 12.8 kW',
        'Module': '4 × 3.2 kWh',
        'Erweiterbar': 'Bis 25.6 kWh',
        'Abmessungen': '515 × 780 × 240 mm',
        'Gewicht': '139 kg',
        'Garantie': '10 Jahre',
        'Zyklen': '>6000',
      }),
      unit: 'System',
      featured: false,
      sortOrder: 4,
    },
  ]

  // Erstelle Produkte
  for (const productData of productsData) {
    const { brandSlug, ...data } = productData
    const brandId = brands[brandSlug]?.id
    
    if (!brandId) {
      console.error(`Brand not found: ${brandSlug}`)
      continue
    }

    await prisma.product.upsert({
      where: { 
        id: `product-${brandSlug}-${data.name.toLowerCase().replace(/\s+/g, '-')}`
      },
      update: {
        ...data,
        brandId,
      },
      create: {
        id: `product-${brandSlug}-${data.name.toLowerCase().replace(/\s+/g, '-')}`,
        ...data,
        brandId,
      },
    })
  }
  console.log('✅ Products created:', productsData.length)

  // ========================================
  // SAMPLE DEAL
  // ========================================
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

  // ========================================
  // SAMPLE REFERENCES
  // ========================================
  // Lösche vorhandene und erstelle neu
  await prisma.reference.deleteMany({})
  
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
