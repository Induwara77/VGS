import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy | Vendora Global Solutions",
  description:
    "Learn how Vendora Global Solutions collects, uses, and protects your personal information when you visit our website or submit a project inquiry.",
  alternates: {
    canonical: "https://www.vendoraglobalsolutions.com/privacy",
  },
};

const LAST_UPDATED = "October 1, 2026";
const COMPANY = "Vendora Global Solutions";
const WEBSITE = "www.vendoraglobalsolutions.com";
const EMAIL = "vendoraglobalsolutions@gmail.com";

const sections = [
  {
    id: "information-we-collect",
    title: "1. Information We Collect",
    content: [
      {
        subtitle: "a) Contact Form & Project Inquiry Data",
        text: `When you fill out our contact or project inquiry form, we collect the personal information you voluntarily provide, which may include your full name, email address, phone number, company name, and details about your project requirements. This information is collected solely to evaluate your inquiry and respond to you.`,
      },
      {
        subtitle: "b) Newsletter Subscriptions",
        text: `If you subscribe to our newsletter, we collect your email address to send you updates about our engineering blog posts, technology guides, and company news.`,
      },
      {
        subtitle: "c) Usage & Analytics Data",
        text: `We may automatically collect certain technical information when you visit our website, including your IP address, browser type and version, operating system, referring URLs, pages visited, and time spent on pages. This data is collected in aggregate, anonymised form and is used to improve the functionality and performance of our website.`,
      },
      {
        subtitle: "d) Cookie Data",
        text: `Our website uses cookies and similar tracking technologies. Please refer to Section 5 (Cookie Policy) for full details.`,
      },
    ],
  },
  {
    id: "how-we-use-your-information",
    title: "2. How We Use Your Information",
    bullets: [
      "To respond to your project inquiries and evaluate potential collaborations.",
      "To send you newsletters and technical updates you have opted in to receive.",
      "To improve, personalise, and optimise our website experience.",
      "To ensure the security and integrity of our platform.",
      "To comply with applicable legal obligations.",
      "To communicate important service updates or changes to this Privacy Policy.",
    ],
  },
  {
    id: "data-storage-and-security",
    title: "3. Data Storage & Security",
    content: [
      {
        subtitle: "a) Database Storage — MongoDB Atlas",
        text: `All personal data you submit through our website (including contact form submissions and newsletter subscriptions) is securely stored in MongoDB Atlas, a cloud-hosted, enterprise-grade database service. MongoDB Atlas employs end-to-end encryption at rest and in transit using TLS/SSL protocols, access controls, and regular security audits. Data is stored in isolated, access-restricted clusters in compliance with modern cloud security standards.`,
      },
      {
        subtitle: "b) Website Hosting — Vercel",
        text: `Our website is hosted on Vercel, a secure and globally distributed cloud platform. Vercel enforces HTTPS on all connections, provides DDoS protection, and maintains SOC 2 Type II compliance. No raw personal data is stored on Vercel's infrastructure beyond the scope of server-side rendering.`,
      },
      {
        subtitle: "c) Data Retention",
        text: `We retain your personal information only for as long as is necessary to fulfil the purposes for which it was collected, or as required by law. Contact form data is retained for a period of up to 24 months. Newsletter subscriber data is retained until you unsubscribe.`,
      },
      {
        subtitle: "d) Security Measures",
        text: `We implement appropriate administrative, technical, and physical security safeguards to protect your personal information against unauthorised access, disclosure, alteration, or destruction. Despite these measures, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`,
      },
    ],
  },
  {
    id: "sharing-your-information",
    title: "4. Sharing Your Information",
    text: `We do not sell, rent, trade, or otherwise transfer your personal information to third parties without your consent, except in the following limited circumstances:`,
    bullets: [
      "Service Providers: Trusted third-party vendors (e.g., MongoDB Atlas, Vercel, email delivery services) who assist us in operating our website and delivering services, subject to strict confidentiality agreements.",
      "Legal Compliance: When required by law, court order, or governmental authority.",
      "Business Transfers: In the event of a merger, acquisition, or sale of all or a portion of our assets, your data may be transferred as part of that transaction.",
      "Protection of Rights: To protect the rights, property, or safety of Vendora Global Solutions, our clients, or the public.",
    ],
  },
  {
    id: "cookie-policy",
    title: "5. Cookie Policy",
    content: [
      {
        subtitle: "What Are Cookies?",
        text: `Cookies are small text files placed on your device by websites you visit. They are widely used to make websites work more efficiently and to provide information to website owners.`,
      },
      {
        subtitle: "Types of Cookies We Use",
        text: null,
      },
    ],
    cookieTable: [
      {
        type: "Essential Cookies",
        purpose: "Required for the website to function. Cannot be disabled.",
        duration: "Session",
      },
      {
        type: "Analytics Cookies",
        purpose:
          "Help us understand how visitors interact with our site (e.g., pages visited, time on site). Data is aggregated and anonymised.",
        duration: "Up to 2 years",
      },
      {
        type: "Preference Cookies",
        purpose:
          "Remember your settings and preferences to enhance your experience on return visits.",
        duration: "Up to 1 year",
      },
    ],
    cookieFooter: `You can control and/or delete cookies through your browser settings. Disabling certain cookies may affect the functionality of our website. For more information on managing cookies, visit www.allaboutcookies.org.`,
  },
  {
    id: "your-rights",
    title: "6. Your Rights",
    text: `Depending on your jurisdiction, you may have the following rights regarding your personal data:`,
    bullets: [
      "Right of Access: Request a copy of the personal information we hold about you.",
      "Right to Rectification: Request correction of inaccurate or incomplete data.",
      "Right to Erasure ('Right to be Forgotten'): Request deletion of your personal data. We will action this request within 30 days, subject to legal retention obligations.",
      "Right to Restriction: Request that we restrict the processing of your data under certain circumstances.",
      "Right to Data Portability: Request that we provide your data in a structured, machine-readable format.",
      "Right to Object: Object to our processing of your personal data for direct marketing purposes.",
      "Right to Withdraw Consent: Where processing is based on your consent, you may withdraw it at any time without affecting the lawfulness of prior processing.",
    ],
    footer: `To exercise any of these rights, please contact us at ${EMAIL}. We may need to verify your identity before actioning your request.`,
  },
  {
    id: "third-party-links",
    title: "7. Third-Party Links",
    text: `Our website may contain links to external websites operated by third parties. This Privacy Policy does not apply to those websites. We encourage you to review the privacy policies of any third-party sites you visit. ${COMPANY} is not responsible for the content or privacy practices of external sites.`,
  },
  {
    id: "childrens-privacy",
    title: "8. Children's Privacy",
    text: `Our website and services are not directed at individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately at ${EMAIL} and we will take steps to delete that information.`,
  },
  {
    id: "changes-to-policy",
    title: "9. Changes to This Privacy Policy",
    text: `We reserve the right to update this Privacy Policy at any time to reflect changes in our practices, legal requirements, or operational needs. The updated version will be posted on this page with a revised "Last Updated" date. We encourage you to review this policy periodically. Your continued use of our website following any changes constitutes acceptance of the updated policy.`,
  },
  {
    id: "contact-us",
    title: "10. Contact Us",
    text: `If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please contact us:`,
    contactBlock: {
      company: COMPANY,
      website: WEBSITE,
      email: EMAIL,
    },
  },
];

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-[var(--vgs-canvas)]">
      {/* Hero Banner */}
      <div className="bg-[var(--vgs-blue)] text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60 mb-4">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Privacy Policy
          </h1>
          <p className="mt-4 text-white/70 text-base sm:text-lg max-w-2xl">
            Your privacy matters to us. This policy explains how{" "}
            <span className="text-white font-semibold">{COMPANY}</span> collects,
            uses, and protects your personal data.
          </p>
          <p className="mt-6 text-xs text-white/50 font-mono">
            Last Updated: {LAST_UPDATED}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-16 sm:py-20">
        {/* Table of Contents */}
        <div className="bg-white border border-black/8 rounded-2xl p-6 sm:p-8 mb-12 shadow-sm">
          <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--vgs-cloud)] mb-5">
            Table of Contents
          </h2>
          <ol className="space-y-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-[var(--vgs-blue)] text-sm font-medium hover:underline underline-offset-4 transition-colors"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </div>

        {/* Intro */}
        <p className="text-[var(--vgs-ink)]/80 leading-relaxed mb-12 text-base">
          This Privacy Policy (&quot;Policy&quot;) governs the collection, use, and
          disclosure of personal information by{" "}
          <strong className="text-[var(--vgs-ink)]">{COMPANY}</strong> (&quot;we&quot;,
          &quot;us&quot;, or &quot;our&quot;) when you visit our website at{" "}
          <a
            href={`https://${WEBSITE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--vgs-blue)] hover:underline"
          >
            {WEBSITE}
          </a>{" "}
          (&quot;Site&quot;) or interact with our services. By using our Site, you
          agree to the terms of this Policy.
        </p>

        {/* Sections */}
        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--vgs-ink)] mb-5 pb-3 border-b border-black/8">
                {section.title}
              </h2>

              {/* Sub-content blocks */}
              {"content" in section && section.content && (
                <div className="space-y-6">
                  {section.content.map((item, i) => (
                    <div key={i}>
                      {item.subtitle && (
                        <h3 className="text-base font-semibold text-[var(--vgs-ink)] mb-2">
                          {item.subtitle}
                        </h3>
                      )}
                      {item.text && (
                        <p className="text-[var(--vgs-ink)]/80 leading-relaxed text-base">
                          {item.text}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* Cookie Table */}
              {"cookieTable" in section && section.cookieTable && (
                <div className="space-y-6">
                  <div className="overflow-x-auto rounded-xl border border-black/8">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-[var(--vgs-blue)] text-white">
                          <th className="text-left px-5 py-3.5 font-semibold rounded-tl-xl">
                            Cookie Type
                          </th>
                          <th className="text-left px-5 py-3.5 font-semibold">
                            Purpose
                          </th>
                          <th className="text-left px-5 py-3.5 font-semibold rounded-tr-xl">
                            Duration
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {section.cookieTable.map((row, i) => (
                          <tr
                            key={i}
                            className={
                              i % 2 === 0 ? "bg-white" : "bg-[var(--vgs-canvas)]"
                            }
                          >
                            <td className="px-5 py-3.5 font-medium text-[var(--vgs-ink)]">
                              {row.type}
                            </td>
                            <td className="px-5 py-3.5 text-[var(--vgs-ink)]/80">
                              {row.purpose}
                            </td>
                            <td className="px-5 py-3.5 text-[var(--vgs-ink)]/80">
                              {row.duration}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {section.cookieFooter && (
                    <p className="text-[var(--vgs-ink)]/80 leading-relaxed text-base">
                      {section.cookieFooter}
                    </p>
                  )}
                </div>
              )}

              {/* Plain text */}
              {"text" in section && section.text && !("content" in section) && (
                <p className="text-[var(--vgs-ink)]/80 leading-relaxed text-base mb-5">
                  {section.text}
                </p>
              )}

              {/* Bullets with leading text */}
              {"text" in section && section.text && "bullets" in section && section.bullets && (
                <>
                  <p className="text-[var(--vgs-ink)]/80 leading-relaxed text-base mb-5">
                    {section.text}
                  </p>
                  <ul className="space-y-3">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--vgs-blue)] flex-shrink-0" />
                        <span className="text-[var(--vgs-ink)]/80 text-base leading-relaxed">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                  {"footer" in section && section.footer && (
                    <p className="mt-5 text-[var(--vgs-ink)]/80 leading-relaxed text-base">
                      {section.footer}
                    </p>
                  )}
                </>
              )}

              {/* Bullets only (no leading text) */}
              {!("text" in section) && "bullets" in section && section.bullets && (
                <ul className="space-y-3">
                  {section.bullets.map((b, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-[var(--vgs-blue)] flex-shrink-0" />
                      <span className="text-[var(--vgs-ink)]/80 text-base leading-relaxed">
                        {b}
                      </span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Contact Block */}
              {"contactBlock" in section && section.contactBlock && (
                <div className="mt-4 bg-white border border-black/8 rounded-2xl p-6 space-y-2 text-base">
                  <p className="font-semibold text-[var(--vgs-ink)]">
                    {section.contactBlock.company}
                  </p>
                  <p className="text-[var(--vgs-ink)]/70">
                    Website:{" "}
                    <a
                      href={`https://${section.contactBlock.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[var(--vgs-blue)] hover:underline"
                    >
                      {section.contactBlock.website}
                    </a>
                  </p>
                  <p className="text-[var(--vgs-ink)]/70">
                    Email:{" "}
                    <a
                      href={`mailto:${section.contactBlock.email}`}
                      className="text-[var(--vgs-blue)] hover:underline"
                    >
                      {section.contactBlock.email}
                    </a>
                  </p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Back to Home */}
        <div className="mt-20 pt-10 border-t border-black/8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-[var(--vgs-blue)] font-semibold text-sm hover:gap-3 transition-all group"
          >
            <svg
              className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-0.5"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.5}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
            Back to Home
          </Link>
          <p className="text-xs text-[var(--vgs-cloud)]">
            © {new Date().getFullYear()} {COMPANY}. All rights reserved.
          </p>
        </div>
      </div>
    </main>
  );
}
