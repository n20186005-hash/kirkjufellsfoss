import Header from '@/components/Header';
import { guideLocale } from '@/data/nearby';
import { Link } from '@/i18n/navigation';
import { localizedAlternates } from '@/i18n/site-metadata';
import { setRequestLocale } from 'next-intl/server';

const copy = {
  "zh": {
    "title": "服务条款",
    "sections": [
      [
        "接受条款",
        "通过访问和使用本网站，您同意受这些服务条款的约束。如果您不同意条款的任何部分，则不得访问该服务。"
      ],
      [
        "服务使用",
        "本网站是一个独立的第三方旅游资讯项目。提供的信息仅供一般参考。您同意负责任且合法地使用本网站。"
      ],
      [
        "知识产权",
        "本网站上的所有内容（包括文本、图像和徽标）均为网站所有者的财产（另有说明的除外）。严禁未经授权的使用、复制或分发。"
      ],
      [
        "责任限制",
        "对于因使用或无法使用本网站或其中包含的信息而导致的任何直接、间接、附带或后果性损害，我们概不负责。"
      ]
    ]
  },
  "en": {
    "title": "Terms of Service",
    "sections": [
      [
        "Accepting these terms",
        "By accessing and using this site, you agree to these terms. If you disagree with any part, you may not access the service."
      ],
      [
        "Using the service",
        "This site is an independent third-party travel information project. The information is for general reference. You agree to use the site responsibly and lawfully."
      ],
      [
        "Intellectual property",
        "Unless otherwise indicated, the site owner owns the content, including text, imagery and logos. Unauthorized use, copying or distribution is prohibited."
      ],
      [
        "Limitation of liability",
        "We are not liable for direct, indirect, incidental or consequential damage arising from use of, or inability to use, this site or the information it contains."
      ]
    ]
  }
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return { title: copy[guideLocale(locale)].title, alternates: localizedAlternates(locale, '/petrovaradin-fortress-clock/terms-of-service') };
}

export default async function Page({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  const language = guideLocale(locale);
  const content = copy[language];
  return (
    <>
      <Header solid kirkjufellsfoss />
      <main className="section-padding">
        <article className="max-w-3xl mx-auto mt-10 space-y-8">
          <h1 className="font-display text-4xl font-bold">{content.title}</h1>
          <p className="text-[var(--text-muted)]">{language === 'zh' ? '最后更新：2026年5月' : 'Last updated May 2026'}</p>
          {content.sections.map(([heading, text], index) => (
            <section key={heading}>
              <h2 className="text-xl font-semibold">{index + 1}. {heading}</h2>
              <p className="mt-2 text-[var(--text-secondary)]">{text}</p>
            </section>
          ))}
          <Link href="/petrovaradin-fortress-clock" className="text-[var(--accent)] underline">
            {language === 'zh' ? '返回堡垒钟塔' : 'Back to the clock tower'}
          </Link>
        </article>
      </main>
    </>
  );
}
