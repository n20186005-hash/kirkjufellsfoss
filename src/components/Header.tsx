'use client';

import { useLocale, useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { copy, guideLocale, nearbyPath } from '@/data/nearby';
import LanguageToggle from './LanguageToggle';
import ThemeToggle from './ThemeToggle';
import { useState, useEffect } from 'react';

export default function Header({ solid = false, kirkjufellsfoss = false, guideSlug }: { locale?: string; solid?: boolean; kirkjufellsfoss?: boolean; guideSlug?: string }) {
  const t = useTranslations('header');
  const tPetro = useTranslations('hero');
  const [scrolled, setScrolled] = useState(false);

  const locale = guideLocale(useLocale());
  const opaque = solid || scrolled;

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background: opaque ? 'var(--bg-secondary)' : 'transparent',
        borderBottom: opaque ? '1px solid var(--border-color)' : 'none',
        backdropFilter: opaque ? 'blur(12px)' : 'none',
      }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        <Link href={kirkjufellsfoss ? '/' : '/petrovaradin-fortress-clock'} className="font-display text-lg font-semibold tracking-tight" style={{ color: opaque ? 'var(--text-primary)' : '#fff' }}>
          {tPetro('title')}
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          {(['gallery', 'reviews', 'map'] as const).map((section) => (
            <a
              key={section}
              href={`${kirkjufellsfoss && locale === "en" ? "/en" : "/"}#${section}`}
              className="text-sm font-medium transition-colors"
              style={{ color: opaque ? 'var(--text-secondary)' : 'rgba(255,255,255,0.85)' }}
            >
              {t(section)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {kirkjufellsfoss && (
            <Link href={nearbyPath()} className="text-sm font-semibold whitespace-nowrap" style={{ color: opaque ? 'var(--accent)' : '#fff' }}>
              {copy[locale].nearby}
            </Link>
          )}
          <ThemeToggle />
          <LanguageToggle guideSlug={guideSlug} />
        </div>
      </div>
    </header>
  );
}
