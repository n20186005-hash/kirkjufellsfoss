import visitorDetails from './nearby-visitor.json';
import type { GuideLocale } from './nearby';

type Bilingual = Record<GuideLocale, string>;
type Fee = Bilingual & { source?: string };

const fees = {
  kirk: {
    zh: '瀑布旁私人停车区按车辆类别收费。Sannir 公示小型车 1,400 ISK、中型车 1,800 ISK、大型车 6,400 ISK。山地向导如需预约，费用另计。',
    en: 'The private waterfall car park charges by vehicle class. Sannir lists ISK 1,400 for small, ISK 1,800 for medium and ISK 6,400 for large vehicles. Mountain guiding is separate.',
    source: 'https://www.sannir.is/kf',
  },
  park: {
    zh: '国家公园在停车时收取服务费，最多 5 名乘客的小客车为 1,100 ISK。按园方公布的车辆类别和缴费方式办理。',
    en: 'The park collects a service fee through parking. A passenger car with up to five passengers costs ISK 1,100. Check the park’s vehicle classes and payment instructions.',
    source: 'https://snaefellsjokull.is/en/frett/Service-fee-in-Snaefellsjokull-National-Park',
  },
  cave: {
    zh: '入洞须购买导览票；成人、儿童及其他票种按运营方预约页计价。国家公园停车服务费另按现场规定办理。',
    en: 'A guided-tour ticket is required. Check the operator’s booking page for adult, child and concession prices. Follow the park’s posted parking payment instructions separately.',
    source: 'https://www.summitguides.is/vatnshellir-cave-tour',
  },
  museum: {
    zh: '馆内展览的当季票价请向馆方核对。西冰岛旅游局的场馆资料提供联络方式。',
    en: 'Contact the museum for current exhibition admission. The Visit West Iceland listing provides museum contact information.',
    source: 'https://www.west.is/en/service/the-maritime-museum-in-the-fishermens-park',
  },
  ferry: {
    zh: '上岛需购买船票，按乘客类别和所订航段计价。先在运营方价目和班次页核对往返安排。',
    en: 'Buy a ferry ticket to reach the island. Fares depend on passenger category and the booked leg. Check both crossings with the operator.',
    source: 'https://www.ferja.is/en/our-ferries/baldur/price-list',
  },
  glacier: {
    zh: '公路远眺无需购买冰川活动票。若在园内停车，按园方公告缴费；冰川导览由运营方单独计价。',
    en: 'Roadside viewing does not require a glacier-tour ticket. Follow the park’s fee rules at park car parks. Guided glacier activities are priced by their operators.',
    source: 'https://snaefellsjokull.is/en/frett/Service-fee-in-Snaefellsjokull-National-Park',
  },
  church: {
    zh: '可从公共区域欣赏教堂外观；内部参观条件及可能的费用以教会告示为准。',
    en: 'View the exterior from public areas. Check church notices for indoor admission and any charges.',
  },
  public: {
    zh: '按公共通道游览。渡轮、导览和停车如有收费，分别查看运营方或现场告示。',
    en: 'Use public access routes. Check operator or on-site notices for any boat, tour or parking charges.',
  },
  posted: {
    zh: '步行入口与停车收费以现场标示为准。',
    en: 'Check posted instructions for any trail access or parking charges.',
  },
  private: {
    zh: '属于农地访客入口，收费和缴费方式以地主告示为准。',
    en: 'Access crosses farmland. Check the landowner’s posted charges and payment instructions.',
  },
  outdoor: {
    zh: '按道路和停车点的规定通行；若参加导览，费用由运营方另行公布。',
    en: 'Follow the local road and parking rules. Optional guides set their own prices.',
  },
  parking: {
    zh: '停车费以入口公示为准；观察海豹请使用划定游览区域。',
    en: 'Check posted car park charges and use the designated seal-viewing area.',
  },
} satisfies Record<string, Fee>;

const bases = {
  grund: {
    zh: '格伦达菲厄泽适合安排教会山与镇东瀑布，方便在同一天按光线挑选停留时间。',
    en: 'Base yourself in Grundarfjörður for Kirkjufell and the waterfall east of town. This keeps both within easy reach as the light changes.',
  },
  stykk: {
    zh: '可住斯蒂基斯霍尔米港区，在同一段行程步行看老街、码头和灯塔，搭船也方便。',
    en: 'Stay near Stykkishólmur harbour for the old streets, quays and lighthouse on foot, and easy access to boat departures.',
  },
  island: {
    zh: '赶早班船可住斯蒂基斯霍尔米。若打算在弗拉泰岛过夜，先订妥岛上住宿和回程船位。',
    en: 'Stay in Stykkishólmur for an early ferry. For a night on Flatey, confirm both island accommodation and your return sailing first.',
  },
  west: {
    zh: '海利桑德或欧拉夫斯维克适合作为半岛西端据点，可以分开安排北岸渔村和国家公园外海岸。',
    en: 'Hellissandur or Ólafsvík make practical western bases for splitting the northern fishing villages and the park’s outer coast across separate outings.',
  },
  south: {
    zh: '阿尔纳斯塔皮或海德纳尔适合先走南岸步道，再择天气好的时段前往国家公园西端。',
    en: 'Stay around Arnarstapi or Hellnar for the south-coast walk, then pick a clear weather window for the western end of the park.',
  },
  east: {
    zh: '从雷克雅未克方向进出可考虑博尔加内斯，安排南岸短停。若隔天继续西端环线，可住半岛南岸。',
    en: 'Consider Borgarnes for south-coast stops on the drive from Reykjavík, or a south-coast stay if you are continuing around the peninsula the next day.',
  },
} satisfies Record<string, Bilingual>;

const visitorCopy = {
  zh: {
    discover: '初到景点', features: '景区特色', charm: '发现魅力', hours: '开放时间', fees: '门票价格与费用',
    notices: '游览须知', lodging: '住宿建议', country: '国家与地区', region: '冰岛 · 西部 · 斯奈山半岛及附近岛屿',
    rating: 'Google 评分', feeSource: '查看票价与收费来源', operator: '查看开放与班次资料',
  },
  en: {
    discover: 'Discover the area', features: 'What makes it distinctive', charm: 'History, culture and landscape', hours: 'Opening hours', fees: 'Tickets and fees',
    notices: 'Before you go', lodging: 'Where to stay', country: 'Country and region', region: 'Iceland · West Iceland · Snæfellsnes and nearby islands',
    rating: 'Google rating', feeSource: 'Check ticket and fee information', operator: 'Check opening and schedule information',
  },
} as const;

const operatingSources: Partial<Record<keyof typeof visitorDetails, string>> = {
  flatey: 'https://www.ferja.is/en/our-ferries/baldur/sailing-schedule',
  vatnshellir: 'https://www.summitguides.is/vatnshellir-cave-tour',
  malarrif: 'https://snaefellsjokull.is/en/visitor-centers/',
  hellissandur: 'https://www.west.is/en/service/the-maritime-museum-in-the-fishermens-park',
};

export function nearbyVisitor(slug: keyof typeof visitorDetails, locale: GuideLocale) {
  const entry = visitorDetails[slug];
  const fee: Fee = fees[entry.fee as keyof typeof fees];
  return {
    ...entry[locale],
    labels: visitorCopy[locale],
    fee: fee[locale],
    feeSource: fee.source,
    hoursSource: operatingSources[slug],
    lodging: bases[entry.base as keyof typeof bases][locale],
  };
}
