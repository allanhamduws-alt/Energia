import {
  HeroSection,
  BrandsSection,
  ProductsOverview,
  TrustSection,
  DealTeaser,
  TestimonialSection,
  AppointmentSection,
} from '@/components/home'

export default function HomePage() {
  return (
    <main>
      {/* 1. Hero mit Info-Leiste */}
      <HeroSection />
      
      {/* 2. Marken-Läufer */}
      <BrandsSection />
      
      {/* 3. Produkte - 3 Kategorien */}
      <ProductsOverview />
      
      {/* 4. Warum Energia? - Blaue Sektion */}
      <TrustSection />
      
      {/* 5. Deal der Woche */}
      <DealTeaser />
      
      {/* 6. Kundenreferenzen */}
      <TestimonialSection />
      
      {/* 7. Kontaktbereich */}
      <AppointmentSection />
    </main>
  )
}
