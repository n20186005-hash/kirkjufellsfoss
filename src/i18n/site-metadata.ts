export function localizedAlternates(locale: string, path = '') {
  const domain = 'https://www.kirkjufellsfoss.com';
  const zh = domain + (path || '/');
  const en = domain + '/en' + path;
  return { canonical: locale === 'en' ? en : zh, languages: { zh, en, 'x-default': zh } };
}
