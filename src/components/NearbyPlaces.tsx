import { Link } from '@/i18n/navigation';
import { copy, nearbyPath, nearbyPlaces, type GuideLocale, type NearbyPlace } from '@/data/nearby';

export function NearbyCards({ places, locale }: { places: NearbyPlace[]; locale: GuideLocale }) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {places.map((place) => (
        <li key={place.slug} className="rounded-xl overflow-hidden border border-[var(--border-color)] bg-[var(--card-bg)]">
          <Link href={nearbyPath(place.slug)} className="block h-full group">
            <img src={place.photo.path} alt={place[locale].name} width={640} height={400}
              loading="lazy" className="w-full aspect-[8/5] object-cover" />
            <div className="p-5">
              <p className="text-sm text-[var(--accent)]">{place[locale].type}</p>
              <h3 className="mt-1 text-xl font-semibold group-hover:underline">{place[locale].name}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{place[locale].description}</p>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default function NearbyPlaces({ locale }: { locale: GuideLocale }) {
  const t = copy[locale];
  return (
    <section id="nearby" className="section-padding bg-[var(--bg-tertiary)]">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-semibold">{t.nearby}</h2>
        <p className="mt-3 mb-7 text-[var(--text-secondary)]">{t.intro}</p>
        <NearbyCards places={nearbyPlaces.slice(0, 3)} locale={locale} />
        <Link href={nearbyPath()} className="inline-block mt-6 font-semibold text-[var(--accent)] underline">{t.all}</Link>
      </div>
    </section>
  );
}
