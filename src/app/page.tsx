import {
  AboutUs,
  Hero,
  Ministerios,
} from '@/components';

const churchSchema = {
  '@context': 'https://schema.org',
  '@type': 'Church',
  name: 'Bioiglesia',
  image: 'https://bioiglesia.com/og-image.jpg',
  '@id': 'https://bioiglesia.com',
  url: 'https://bioiglesia.com',
  telephone: '+5491160399928', // (Opcional, complétalo si tienen)
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Honduras 2004',
    addressLocality: 'Libertad, Merlo',
    addressRegion: 'Buenos Aires',
    addressCountry: 'AR',
  },
  openingHoursSpecification: {
    '@type': 'OpeningHoursSpecification',
    dayOfWeek: 'Sunday',
    opens: '19:00',
    closes: '22:00',
  },
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(churchSchema),
        }}
      />
      <Hero />
      <Ministerios />
      <AboutUs />
    </>
  );
}
