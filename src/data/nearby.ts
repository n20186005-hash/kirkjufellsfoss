import entries from './nearby-places.json';

export const nearbyPlaces = entries;
export type NearbyPlace = (typeof nearbyPlaces)[number];
export type GuideLocale = 'zh' | 'en';

export function guideLocale(locale: string): GuideLocale {
  return locale === 'en' ? 'en' : 'zh';
}

export function nearbyPath(slug?: string) {
  return slug ? { pathname: '/nearby/[slug]' as const, params: { slug } } : '/nearby' as const;
}

export function mapUrl(place: NearbyPlace) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(place.mapQuery)}`;
}

export const copy = {
  zh: {
    nearby: '周边景点', all: '查看全部景点', home: '教会山瀑布', intro: '从教会山瀑布出发，沿斯奈山半岛北岸、西端与南岸探索渔港、火山地貌和海边步道。',
    about: '关于景点与管理', facts: '基础信息', name: '当地名称', type: '景点类型', area: '所在地及入口', access: '开放与门票', transport: '交通方式', visit: '游览建议', photo: '拍照机位', reviews: '游客评价', map: '在 Google Maps 查看',
    reviewText: '可在该景点的 Google Maps 地点页查看评分、近期评价与访客照片。', sources: '景点资料', photoCredit: '摄影', related: '附近地点', directions: '驾车路线',
    overview: '周边游览', highlights: '历史、建筑与观察重点', walk: '步行与游览路线', faq: '常见问答', location: '地址与地图', arrival: '抵达渡轮码头',
    north: '半岛北岸与布雷扎湾', west: '半岛西端城镇', park: '斯奈菲尔冰川国家公园', cave: '斯奈菲尔冰川国家公园', south: '半岛南岸',
  },
  en: {
    nearby: 'Nearby attractions', all: 'Explore all attractions', home: 'Kirkjufellsfoss', intro: 'Start at Kirkjufellsfoss and explore fishing harbours, volcanic landscapes and coastal paths along the north, west and south of Snæfellsnes.',
    about: 'About and site management', facts: 'Visitor information', name: 'Local name', type: 'Attraction type', area: 'Area and approach', access: 'Opening and admission', transport: 'Getting there', visit: 'Planning your visit', photo: 'Photo spot', reviews: 'Visitor reviews', map: 'View on Google Maps',
    reviewText: 'See ratings, recent reviews and visitor photos on the Google Maps listing for this attraction.', sources: 'Attraction information', photoCredit: 'Photo', related: 'Nearby places', directions: 'Driving directions',
    overview: 'Explore nearby', highlights: 'History, features and what to look for', walk: 'Walking and sightseeing route', faq: 'Frequently asked questions', location: 'Address and map', arrival: 'Find the ferry landing',
    north: 'North coast and Breiðafjörður', west: 'Western peninsula towns', park: 'Snæfellsjökull National Park', cave: 'Snæfellsjökull National Park', south: 'South coast',
  },
} as const;

export function guideMetadata(locale: GuideLocale, title: string, description: string, slug?: string) {
  const base = 'https://www.kirkjufellsfoss.com';
  const path = slug ? `/nearby/${slug}` : '/nearby';
  const zh = base + path;
  const en = base + '/en' + path;
  const canonical = locale === 'en' ? en : zh;
  return {
    title,
    description,
    alternates: { canonical, languages: { zh, en, 'x-default': zh } },
    openGraph: { title, description, url: canonical, locale: locale === 'en' ? 'en_US' : 'zh_CN' },
  };
}
