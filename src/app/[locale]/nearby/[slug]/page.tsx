import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NearbyCards } from '@/components/NearbyPlaces';
import editorial from '@/data/nearby-editorial.json';
import { nearbyRatings, ratingsAccessedOn } from '@/data/nearby-ratings';
import { copy, guideLocale, guideMetadata, mapUrl, nearbyPath, nearbyPlaces } from '@/data/nearby';

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
  return nearbyPlaces.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props) {
  const { locale: requested, slug } = await params;
  const locale = guideLocale(requested);
  const place = nearbyPlaces.find((entry) => entry.slug === slug);
  if (!place) notFound();
  return guideMetadata(locale, place[locale].name, place[locale].description, slug);
}

export default async function NearbyDetail({ params }: Props) {
  const { locale: requested, slug } = await params;
  setRequestLocale(requested);
  const locale = guideLocale(requested);
  const place = nearbyPlaces.find((entry) => entry.slug === slug);
  if (!place) notFound();
  const t = copy[locale];
  const info = place[locale];
  const expanded = editorial[place.slug as keyof typeof editorial];
  const details = expanded[locale];
  const map = mapUrl(place);
  const accessQuery = encodeURIComponent(expanded.accessQuery);
  const arrival = place.slug === 'flatey'
    ? `https://www.google.com/maps/search/?api=1&query=${accessQuery}`
    : `https://www.google.com/maps/dir/?api=1&destination=${accessQuery}&travelmode=driving`;
  const arrivalLabel = place.slug === 'flatey' ? t.arrival : t.directions;
  const rating = nearbyRatings[slug];
  const count = rating?.count.toLocaleString(locale === 'zh' ? 'zh-CN' : 'en');
  const ratingLabel = rating && (locale === 'zh'
    ? `${rating.score}/5（${count} 条 Google 评价）`
    : `${rating.score}/5 (${count} Google reviews)`);
  const related = nearbyPlaces.filter((entry) => entry.slug !== slug && (
    entry.region === place.region || [entry.region, place.region].every((region) => region === 'park' || region === 'cave')
  ));
  const facts = [[t.name, place.localName], [t.type, info.type], [t.area, info.area], [t.access, info.access]];

  return (
    <>
      <Header kirkjufellsfoss guideSlug={slug} />
      <main>
        <section className="relative isolate min-h-[28rem] flex items-end text-white bg-nature-900">
          <img src={place.photo.path} alt={info.name} fetchPriority="high" className="absolute inset-0 -z-20 w-full h-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-black/85 via-black/55 to-black/35" />
          <div className="w-full max-w-6xl mx-auto px-5 pt-28 pb-10">
            <Link href={nearbyPath()} className="underline">{t.nearby}</Link>
            <h1 className="mt-3 text-4xl sm:text-6xl font-semibold">{info.name}</h1>
            <p className="mt-4 max-w-2xl text-lg">{info.description}</p>
            {ratingLabel && <p className="mt-3 font-semibold">{ratingLabel}</p>}
            <p className="mt-3 max-w-2xl text-sm">{info.access}</p>
            <a href={map} className="inline-block mt-5 px-4 py-2 rounded-md bg-white text-nature-900 font-semibold">{t.map}</a>
          </div>
        </section>
        <div className="section-padding">
          <div className="max-w-4xl mx-auto space-y-9">
            <section className="rounded-xl bg-[var(--bg-tertiary)] p-5 sm:p-7">
              <h2 className="text-2xl font-semibold">{locale === 'zh' ? `关于${info.name}` : `About ${info.name}`}</h2>
              <p className="mt-3">{info.management}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                <a href={place.source} className="text-[var(--accent)] underline">{t.sources}</a>
                {place.managementSource && (
                  <a href={place.managementSource} className="text-[var(--accent)] underline">
                    {locale === 'zh' ? '管理与通行资料' : 'Management and access information'}
                  </a>
                )}
              </div>
            </section>
            <section>
              <h2 className="text-3xl font-semibold mb-5">{t.facts}</h2>
              <dl className="divide-y divide-[var(--border-color)] rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
                {facts.map(([label, value]) => (
                  <div key={label} className="grid sm:grid-cols-[9rem_1fr] gap-1 p-4">
                    <dt className="font-semibold">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
              </dl>
            </section>
            <section>
              <h2 className="text-3xl font-semibold">{t.transport}</h2>
              <p className="mt-3">{info.transport}</p>
              <a href={arrival} className="inline-block mt-3 text-[var(--accent)] underline">{arrivalLabel}</a>
            </section>
            <section>
              <h2 className="text-3xl font-semibold">{t.visit}</h2>
              <p className="mt-3">{info.visit}</p>
            </section>
            <section>
              <h2 className="text-3xl font-semibold">{t.highlights}</h2>
              <p className="mt-3">{details.background}</p>
              {['park', 'cave'].includes(place.region) && (
                <a href="https://snaefellsjokull.is/en/hiking-trails-destinations/hiking-trails" className="mt-3 inline-block text-[var(--accent)] underline">
                  {locale === 'zh' ? '国家公园步道资料' : 'National park trail information'}
                </a>
              )}
            </section>
            <section className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 sm:p-7">
              <h2 className="text-2xl font-semibold">{t.walk}</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-[var(--accent)]">
                <li>{locale === 'zh' ? '到访起点' : 'Start at'} · {info.area}</li>
                <li>{details.walk}</li>
              </ol>
            </section>
            <section>
              <h2 className="text-3xl font-semibold">{t.photo}</h2>
              <p className="mt-3">{info.photo}</p>
              <p className="mt-3 text-sm text-[var(--text-secondary)]">
                <a href={place.photo.source} className="underline">{t.photoCredit} · {place.photo.author}</a>
                {' · '}<a href={place.photo.licenseUrl} className="underline">{place.photo.license}</a>
              </p>
            </section>
            <section>
              <h2 className="text-3xl font-semibold">{t.faq}</h2>
              <details className="mt-4 rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5">
                <summary className="cursor-pointer font-semibold">{details.question}</summary>
                <p className="mt-3">{details.answer}</p>
              </details>
            </section>
            <section className="rounded-xl bg-[var(--bg-tertiary)] p-5 sm:p-7">
              <h2 className="text-2xl font-semibold">{t.reviews}</h2>
              {rating && (
                <p className="mt-3">
                  <strong>{ratingLabel}</strong>
                  {' · '}
                  <a href={rating.source} className="text-[var(--accent)] underline">
                    {locale === 'zh' ? 'Google Travel 快照，查阅于' : 'Google Travel snapshot accessed'} {ratingsAccessedOn}
                  </a>
                </p>
              )}
              <p className="mt-3">{t.reviewText}</p>
              <a href={map} className="mt-3 inline-block text-[var(--accent)] underline">{t.map}</a>
            </section>
            <section>
              <h2 className="text-3xl font-semibold">{t.location}</h2>
              <p className="mt-3">{info.area}</p>
              <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2">
                <a href={map} className="text-[var(--accent)] underline">{t.map}</a>
                <a href={arrival} className="text-[var(--accent)] underline">{arrivalLabel}</a>
              </div>
            </section>
          </div>
        </div>
        <section className="section-padding bg-[var(--bg-tertiary)]">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6">{t.related}</h2>
            <NearbyCards places={related.slice(0, 3)} locale={locale} />
            <Link href={nearbyPath()} className="mt-6 inline-block text-[var(--accent)] underline">{t.all}</Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
