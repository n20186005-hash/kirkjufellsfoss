'use client';

import { useLocale } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

const labels = { zh: '中文', en: 'English' } as const;

export default function LanguageToggle({ guideSlug }: { guideSlug?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const href = pathname === '/nearby/[slug]'
    ? { pathname, params: { slug: guideSlug ?? '' } }
    : pathname;

  return (
    <details className="relative">
      <summary
        className="flex cursor-pointer list-none items-center gap-1.5 rounded-md bg-[var(--tag-bg)] px-3 py-1.5 text-sm font-medium text-[var(--tag-text)]"
        aria-label={locale === 'zh' ? '切换语言' : 'Switch language'}
      >
        <svg aria-hidden="true" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <path d="M2 12h20M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20z" />
        </svg>
        {labels[locale as keyof typeof labels]}
      </summary>
      <div className="absolute right-0 z-50 mt-2 w-36 overflow-hidden rounded-lg border border-[var(--border-color)] bg-[var(--card-bg)] shadow-lg">
        {routing.locales.map((language) => (
          <Link
            key={language}
            href={href}
            locale={language}
            hrefLang={language}
            lang={language}
            aria-current={language === locale ? 'true' : undefined}
            className="block px-4 py-2.5 text-sm hover:bg-[var(--bg-tertiary)] aria-[current=true]:font-semibold aria-[current=true]:text-[var(--accent)]"
            onClick={(event) => event.currentTarget.closest('details')?.removeAttribute('open')}
          >
            {labels[language]}
          </Link>
        ))}
      </div>
    </details>
  );
}
