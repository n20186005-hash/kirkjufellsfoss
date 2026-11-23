import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Link } from '@/i18n/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { NearbyCards } from '@/components/NearbyPlaces';
import { nearbyVisitor } from '@/data/nearby-visitor';
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
  const visitor = nearbyVisitor(place.slug as keyof typeof editorial, locale);
  const labels = visitor.labels;
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
  const facts = [
    [t.name, place.localName],
    [t.type, info.type],
    [labels.country, labels.region],
    [t.area, info.area],
    [t.access, info.access],
  ];

  return (
    <>
      <Header kirkjufellsfoss guideSlug={slug} />
      <main className="nearby-guide">
        <section className="relative isolate flex min-h-[min(42rem,82svh)] items-end overflow-hidden bg-nature-900 text-white">
          <img src={place.photo.path} alt={info.name} fetchPriority="high" className="absolute inset-0 -z-20 w-full h-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-gradient-to-t from-nature-900 via-nature-900/65 to-nature-900/30" />
          <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 pt-28 pb-12 sm:pb-16">
            <Link href={nearbyPath()} className="underline">{t.nearby}</Link>
            <h1 className="mt-3 font-display text-4xl sm:text-5xl lg:text-7xl leading-tight font-bold">{info.name}</h1>
            <p className="mt-4 max-w-2xl text-lg sm:text-xl text-white/85">{visitor.tagline}</p>
            <div className="mt-6 flex max-w-3xl flex-wrap items-start gap-3">
              <a href="#visitor-reviews" className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white/25">
                {ratingLabel && <span aria-hidden="true" className="mr-1.5 star-filled">★</span>}
                {ratingLabel ?? t.reviews}
              </a>
              <a href="#guide-hours" className="rounded-2xl bg-white/15 px-4 py-2 text-sm backdrop-blur-sm hover:bg-white/25">{visitor.hours}</a>
              <a href={map} className="rounded-full bg-white/15 px-4 py-2 text-sm font-medium backdrop-blur-sm hover:bg-white/25">{t.map}</a>
            </div>
          </div>
        </section>
        <nav aria-label={t.visit} className="border-b border-[var(--border-color)] bg-[var(--bg-tertiary)]">
          <div className="mx-auto flex max-w-6xl flex-wrap gap-x-5 gap-y-2 px-4 py-4 text-sm font-medium text-[var(--accent)] sm:px-6">
            <a href="#guide-facts" className="hover:underline">{t.facts}</a>
            <a href="#guide-hours" className="hover:underline">{labels.hours}</a>
            <a href="#guide-route" className="hover:underline">{t.walk}</a>
            <a href="#guide-location" className="hover:underline">{t.location}</a>
          </div>
        </nav>
        <div className="section-padding">
          <div className="nearby-guide-content max-w-5xl mx-auto space-y-8 sm:space-y-12">
            <section>
              <h2 className="text-3xl font-semibold">{labels.discover}</h2>
              <p className="mt-3">{info.description}</p>
            </section>
            <section>
              <h2 className="text-3xl font-semibold">{t.visit}</h2>
              <p className="mt-3">{info.visit}</p>
            </section>
            <section>
              <h2 className="text-3xl font-semibold">{labels.features}</h2>
              <p className="mt-3">{visitor.feature}</p>
            </section>
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
            <section id="guide-facts">
              <h2 className="text-3xl font-semibold mb-5">{t.facts}</h2>
              <dl className="divide-y divide-[var(--border-color)] rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)]">
                {facts.map(([label, value]) => (
                  <div key={label} className="grid sm:grid-cols-[9rem_1fr] gap-1 p-4">
                    <dt className="font-semibold">{label}</dt>
                    <dd>{value}</dd>
                  </div>
                ))}
                <div className="grid sm:grid-cols-[9rem_1fr] gap-1 p-4">
                  <dt className="font-semibold">{labels.rating}</dt>
                  <dd>{ratingLabel ?? <a href="#visitor-reviews" className="text-[var(--accent)] underline">{t.reviews}</a>}</dd>
                </div>
              </dl>
            </section>
            <div className="grid gap-4 sm:grid-cols-2">
              <section id="guide-hours" className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5">
                <h2 className="text-2xl font-semibold">{labels.hours}</h2>
                <p className="mt-3">{visitor.hours}</p>
                {visitor.hoursSource && <a href={visitor.hoursSource} className="mt-3 inline-block text-[var(--accent)] underline">{labels.operator}</a>}
              </section>
              <section className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5">
                <h2 className="text-2xl font-semibold">{labels.fees}</h2>
                <p className="mt-3">{visitor.fee}</p>
                {visitor.feeSource && <a href={visitor.feeSource} className="mt-3 inline-block text-[var(--accent)] underline">{labels.feeSource}</a>}
              </section>
            </div>
            <section>
              <h2 className="text-3xl font-semibold">{t.transport}</h2>
              <p className="mt-3">{info.transport}</p>
              <a href={arrival} className="inline-block mt-3 text-[var(--accent)] underline">{arrivalLabel}</a>
            </section>
            <section>
              <h2 className="text-3xl font-semibold">{labels.charm}</h2>
              <p className="mt-3">{details.background}</p>
              {['park', 'cave'].includes(place.region) && (
                <a href="https://snaefellsjokull.is/en/hiking-trails-destinations/hiking-trails" className="mt-3 inline-block text-[var(--accent)] underline">
                  {locale === 'zh' ? '国家公园步道资料' : 'National park trail information'}
                </a>
              )}
            </section>
            <section id="guide-route" className="rounded-xl border border-[var(--border-color)] bg-[var(--card-bg)] p-5 sm:p-7">
              <h2 className="text-2xl font-semibold">{t.walk}</h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 marker:font-semibold marker:text-[var(--accent)]">
                <li>{locale === 'zh' ? '到访起点' : 'Start at'} · {info.area}</li>
                <li>{details.walk}</li>
              </ol>
            </section>
            <section>
              <h2 className="text-3xl font-semibold">{labels.notices}</h2>
              <p className="mt-3">{visitor.notice}</p>
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
            <section>
              <h2 className="text-3xl font-semibold">{labels.lodging}</h2>
              <p className="mt-3">{visitor.lodging}</p>
            </section>
            <section id="visitor-reviews" className="scroll-mt-24 rounded-xl bg-[var(--bg-tertiary)] p-5 sm:p-7">
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
            <section id="guide-location">
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
