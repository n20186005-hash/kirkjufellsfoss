import { Link } from '@/i18n/navigation';
import { localizedAlternates } from '@/i18n/site-metadata';
import { guideLocale } from '@/data/nearby';
import Footer from './Footer';
import Header from './Header';

const places = {
  'petrovaradin-fortress-clock': {
    zh: { title: '彼得罗瓦拉丁堡垒钟塔', text: '钟塔位于塞尔维亚诺维萨德的彼得罗瓦拉丁堡垒上城。钟面长针指小时，短针指分钟。上城平台可眺望多瑙河。' },
    en: { title: 'Petrovaradin Fortress Clock Tower', text: 'The clock tower stands in the upper town of Petrovaradin Fortress in Novi Sad, Serbia. Its long hand shows hours and its short hand shows minutes. The upper terrace looks out over the Danube.' },
    source: 'https://novisad.travel/en/architecture/toranj-sa-satom/',
    map: 'Petrovaradin Fortress Clock Tower, Novi Sad, Serbia',
  },
  'st-naum-monastery-ohrid': {
    zh: { title: '奥赫里德圣瑙姆修道院', text: '圣瑙姆修道院位于北马其顿奥赫里德湖畔。可把修道院建筑与湖岸风光安排在同一趟游览中。' },
    en: { title: 'Saint Naum Monastery, Ohrid', text: 'Saint Naum Monastery stands on the shore of Lake Ohrid in North Macedonia. A visit can combine the monastery buildings with a look at the lakeshore.' },
    source: 'https://whc.unesco.org/en/list/99/',
    map: 'Saint Naum Monastery, Ohrid, North Macedonia',
  },
};

type Place = keyof typeof places;

export function legacyMetadata(place: Place, locale: string) {
  const info = places[place][guideLocale(locale)];
  return { title: info.title, description: info.text, alternates: localizedAlternates(locale, '/' + place) };
}

export default function LegacyAttraction({ place, locale }: { place: Place; locale: string }) {
  const data = places[place];
  const info = data[guideLocale(locale)];
  const zh = locale === 'zh';
  return (
    <>
      <Header solid kirkjufellsfoss />
      <main className="section-padding">
        <article className="max-w-4xl mx-auto mt-12 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)] p-6 sm:p-10">
          <h1 className="text-4xl font-display font-bold">{info.title}</h1>
          <p className="mt-5 text-lg leading-relaxed text-[var(--text-secondary)]">{info.text}</p>
          <div className="mt-6 flex flex-wrap gap-5 text-[var(--accent)] underline">
            <a href={data.source}>{zh ? '旅游资料' : 'Visitor information'}</a>
            <a href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(data.map)}`}>{zh ? '在 Google Maps 查看' : 'View on Google Maps'}</a>
            <Link href="/">{zh ? '返回教会山瀑布' : 'Return to Kirkjufellsfoss'}</Link>
          </div>
        </article>
      </main>
      <Footer />
    </>
  );
}
