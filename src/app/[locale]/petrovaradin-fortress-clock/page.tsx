import { setRequestLocale } from 'next-intl/server';
import LegacyAttraction, { legacyMetadata } from '@/components/LegacyAttraction';

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  return legacyMetadata('petrovaradin-fortress-clock', (await params).locale);
}

export default async function AttractionPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <LegacyAttraction place="petrovaradin-fortress-clock" locale={locale} />;
}
