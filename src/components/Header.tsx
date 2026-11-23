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
  const navLinkClass = 'inline-flex min-h-9 items-center justify-center rounded-md px-1 text-center text-xs font-medium sm:text-sm md:whitespace-nowrap transition-colors hover:underline underline-offset-4 sm:px-2';
  const navColor = opaque ? 'var(--text-secondary)' : 'rgba(255,255,255,0.92)';

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: opaque ? 'var(--bg-secondary)' : 'transparent',
          borderBottom: opaque ? '1px solid var(--border-color)' : 'none',
          backdropFilter: opaque ? 'blur(12px)' : 'none',
        }}
      >
        <div className="mx-auto grid max-w-6xl grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 px-3 sm:px-6 md:h-16 md:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
          <Link href={kirkjufellsfoss ? '/' : '/petrovaradin-fortress-clock'} className="col-start-1 row-start-1 flex h-14 items-center font-display text-base font-semibold tracking-tight sm:text-lg md:h-16" style={{ color: opaque ? 'var(--text-primary)' : '#fff' }}>
            {tPetro('title')}
          </Link>

          <nav aria-label={locale === 'zh' ? '主导航' : 'Main navigation'} className="col-span-2 row-start-2 grid grid-cols-4 items-center justify-items-center gap-x-1 pb-1 md:col-span-1 md:col-start-2 md:row-start-1 md:flex md:gap-x-3 md:pb-0 lg:gap-x-6" style={{ color: navColor }}>
            {(['gallery', 'reviews', 'map'] as const).map((section) => (
              <a
                key={section}
                href={`${kirkjufellsfoss && locale === "en" ? "/en" : "/"}#${section}`}
                className={navLinkClass}
              >
                {t(section)}
              </a>
            ))}
            {kirkjufellsfoss && (
              <Link href={nearbyPath()} className={navLinkClass}>
                {copy[locale].nearby}
              </Link>
            )}
          </nav>

          <div className="col-start-2 row-start-1 flex items-center justify-self-end gap-2 md:col-start-3">
            <ThemeToggle />
            <LanguageToggle guideSlug={guideSlug} />
          </div>
        </div>
      </header>
      {solid && <div aria-hidden="true" className="h-9 md:hidden" />}
    </>
  );
}
