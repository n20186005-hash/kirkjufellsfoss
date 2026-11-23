import Header from '@/components/Header';
import { guideLocale } from '@/data/nearby';
import { Link } from '@/i18n/navigation';
import { localizedAlternates } from '@/i18n/site-metadata';
import { setRequestLocale } from 'next-intl/server';

const copy = {
  "zh": {
    "title": "隐私政策",
    "sections": [
      [
        "信息收集",
        "我们通常不会主动收集用户的个人可识别信息。您透过联系表单或电子邮件提供的任何信息将被严格保密。"
      ],
      [
        "信息使用",
        "我们收集的信息仅用于提供、维护和改进我们的服务，以及与您沟通。我们不会将您的个人信息出售或分享给第三方用于营销目的。"
      ],
      [
        "Cookie 与追踪技术",
        "我们使用 Cookie 和类似的追踪技术来追踪我们网站上的活动并保存某些信息。您可以指示您的浏览器拒绝所有 Cookie 或在发送 Cookie 时进行提示。"
      ],
      [
        "数据安全",
        "您数据的安全性对我们很重要。我们努力使用商业上可接受的方式来保护您的个人数据，但任何互联网传输方法都无法保证100%安全。"
      ]
    ]
  },
  "en": {
    "title": "Privacy Policy",
    "sections": [
      [
        "Information we collect",
        "We generally do not actively collect personally identifiable information. Information you share through a contact form or email is kept confidential."
      ],
      [
        "How we use information",
        "We use collected information to provide, maintain and improve our services and to communicate with you. We do not sell or share personal information with third parties for marketing."
      ],
      [
        "Cookies and tracking",
        "We use cookies and similar technologies to measure activity on this site and retain certain information. You can configure your browser to reject cookies or alert you when a cookie is sent."
      ],
      [
        "Data security",
        "We use commercially reasonable measures to protect personal data. No method of transmission over the internet can guarantee complete security."
      ]
    ]
  }
};

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return { title: copy[guideLocale(locale)].title, alternates: localizedAlternates(locale, '/petrovaradin-fortress-clock/privacy-policy') };
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
