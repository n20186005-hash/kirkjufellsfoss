import { getTranslations } from 'next-intl/server';
import { localizedAlternates } from '@/i18n/site-metadata';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const text = await getTranslations({ locale, namespace: 'meta' });
  return {
    title: text('title'),
    description: text('description'),
    alternates: localizedAlternates(locale, '/kirkjufellsfoss'),
  };
}

export default function AttractionLayout({ children }: { children: React.ReactNode }) {
  return children;
}
