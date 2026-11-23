import { setRequestLocale } from 'next-intl/server';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NearbyCards } from '@/components/NearbyPlaces';
import { copy, guideLocale, guideMetadata, nearbyPlaces } from '@/data/nearby';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const locale = guideLocale((await params).locale);
  return guideMetadata(locale, copy[locale].nearby, copy[locale].intro);
}

export default async function NearbyIndex({ params }: Props) {
  const { locale: requested } = await params;
  setRequestLocale(requested);
  const locale = guideLocale(requested);
  const t = copy[locale];
  const groups = ['north', 'west', 'park', 'south'] as const;
  return (
    <>
      <Header solid kirkjufellsfoss />
      <main className="pt-16">
        <div className="section-padding bg-[var(--bg-tertiary)]">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-semibold">{t.nearby}</h1>
            <p className="mt-4 max-w-2xl text-[var(--text-secondary)]">{t.intro}</p>
          </div>
        </div>
        {groups.map((group) => (
          <section key={group} className="section-padding">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-semibold mb-6">{t[group]}</h2>
              <NearbyCards places={nearbyPlaces.filter((place) => place.region === group || (group === 'park' && place.region === 'cave'))} locale={locale} />
            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}
