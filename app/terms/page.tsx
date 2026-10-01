import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Use | Vendora Global Solutions",
  description:
    "Read the Terms of Use governing your access to and use of the Vendora Global Solutions website and services.",
  alternates: {
    canonical: "https://www.vendoraglobalsolutions.com/terms",
  },
};

const LAST_UPDATED = "October 1, 2026";
const COMPANY = "Vendora Global Solutions";
const WEBSITE = "www.vendoraglobalsolutions.com";
const EMAIL = "vendoraglobalsolutions@gmail.com";

const sections = [
  {
    id: "acceptance-of-terms",
    title: "1. Acceptance of Terms",
    text: `By accessing and using the website located at ${WEBSITE} (the "Site") or any services offered by ${COMPANY} ("we", "us", or "our"), you confirm that you are at least 18 years of age, have read and understood these Terms of Use ("Terms"), and agree to be bound by them. If you do not agree to these Terms, you must immediately discontinue use of the Site. These Terms constitute a legally binding agreement between you and ${COMPANY}.`,
  },
  {
    id: "services-overview",
    title: "2. Services Overview",
    text: `${COMPANY} is a software development and digital solutions agency. Our Site serves as an informational and marketing platform through which prospective clients can learn about our services, read our engineering blog, evaluate our portfolio, and submit project inquiries. We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.`,
  },
  {
    id: "intellectual-property",
    title: "3. Intellectual Property",
    content: [
      {
        subtitle: "a) Ownership",
        text: `All content published on this Site — including but not limited to written copy, marketing text, service descriptions, blog articles, engineering guides, design layouts, user interface elements, custom graphics, illustrations, the Vendora Global Solutions logo and all associated brand marks, and any underlying code architecture — is the exclusive intellectual property of ${COMPANY} and is protected by applicable copyright, trademark, and intellectual property laws.`,
      },
      {
        subtitle: "b) Logo & Brand Assets",
        text: `The Vendora Global Solutions name, logo, wordmark, and all associated brand assets are proprietary trademarks of ${COMPANY}. You may not reproduce, modify, distribute, display, or use our logo or brand assets in any manner without our explicit prior written consent. Unauthorised use of our brand assets may constitute trademark infringement and will be pursued to the fullest extent of the law.`,
      },
      {
        subtitle: "c) Code Architecture",
        text: `The structure, organisation, algorithms, logic, and code architecture of this Site and any software, tools, or products developed by ${COMPANY} — whether or not published — constitute proprietary trade secrets and intellectual property of ${COMPANY}. You may not reverse-engineer, decompile, disassemble, copy, or attempt to derive the source code of any software or system developed by ${COMPANY} without explicit written authorisation.`,
      },
      {
        subtitle: "d) Limited Licence for Personal Use",
        text: `We grant you a limited, non-exclusive, non-transferable, revocable licence to access and view the content on this Site for your personal, informational, and non-commercial purposes only. This licence does not include the right to download, copy, reproduce, redistribute, scrape, or commercialise any content from the Site.`,
      },
      {
        subtitle: "e) Client Deliverables",
        text: `Intellectual property rights in custom software, applications, designs, or other deliverables created exclusively for a client under a signed service agreement are governed by the terms of that specific agreement. Absent a written assignment clause, ${COMPANY} retains all rights to general methodologies, tools, frameworks, and know-how developed in the course of providing services.`,
      },
    ],
  },
  {
    id: "acceptable-use",
    title: "4. Acceptable Use of Our Site",
    text: `By using our Site, you agree to abide by the following acceptable use standards. You must not:`,
    bullets: [
      "Use the Site for any unlawful purpose or in violation of any applicable local, national, or international law.",
      "Attempt to gain unauthorised access to any portion of the Site, our servers, our admin dashboard, or any connected systems or networks.",
      "Use automated tools (bots, scrapers, crawlers) to extract, copy, or redistribute content from the Site without our written consent.",
      "Transmit any malware, viruses, trojans, ransomware, or other malicious code through the Site.",
      "Harass, abuse, defame, or impersonate any person or entity, or misrepresent your affiliation with any person or entity.",
      "Post or submit false, misleading, fraudulent, or deceptive information through our contact or inquiry forms.",
      "Engage in any activity that places an unreasonable or disproportionately large load on our infrastructure or disrupts the normal operation of the Site.",
      "Use the Site to collect, harvest, or compile personal information about other users without their consent.",
      "Frame or mirror any portion of the Site without our prior written consent.",
    ],
  },
  {
    id: "admin-dashboard",
    title: "5. Admin Dashboard & Restricted Areas",
    text: `Certain areas of our website, including the administrative dashboard, are restricted and accessible only to authorised personnel of ${COMPANY}. Unauthorised attempts to access these restricted areas — including but not limited to brute-force attacks, credential stuffing, session hijacking, or exploitation of vulnerabilities — are strictly prohibited and may constitute a criminal offence under applicable cybercrime and computer fraud laws. ${COMPANY} actively monitors access to restricted areas and will report any suspected intrusion attempts to the appropriate authorities.`,
  },
  {
    id: "user-submissions",
    title: "6. User Submissions",
    text: `When you submit a project inquiry, contact form message, or any other communication through our Site, you grant ${COMPANY} the right to use that information to respond to your inquiry, evaluate a potential engagement, and contact you via the provided channels. You represent and warrant that any information you submit is accurate, truthful, and does not infringe any third-party rights. ${COMPANY} does not claim ownership of content you submit, but we reserve the right to decline, remove, or disregard any submission that violates these Terms or is otherwise deemed inappropriate.`,
  },
  {
    id: "third-party-links",
    title: "7. Third-Party Links & Content",
    text: `Our Site may contain links to third-party websites, resources, or services. These links are provided for your convenience only. ${COMPANY} does not endorse, control, or assume responsibility for the content, privacy practices, or accuracy of any third-party website. Accessing third-party links is done entirely at your own risk. We encourage you to review the terms and privacy policies of any third-party sites you visit.`,
  },
  {
    id: "disclaimer-of-warranties",
    title: "8. Disclaimer of Warranties",
    text: `THE SITE AND ALL CONTENT, SERVICES, AND MATERIALS ARE PROVIDED ON AN "AS IS" AND "AS AVAILABLE" BASIS WITHOUT ANY WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED. TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, ${COMPANY.toUpperCase()} EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, NON-INFRINGEMENT, AND ANY WARRANTIES ARISING FROM COURSE OF DEALING OR USAGE OF TRADE. WE DO NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.`,
  },
  {
    id: "limitation-of-liability",
    title: "9. Limitation of Liability",
    text: `TO THE MAXIMUM EXTENT PERMITTED BY LAW, ${COMPANY.toUpperCase()} AND ITS DIRECTORS, OFFICERS, EMPLOYEES, CONTRACTORS, AGENTS, AFFILIATES, SUCCESSORS, AND ASSIGNS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, GOODWILL, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR IN CONNECTION WITH YOUR ACCESS TO OR USE OF (OR INABILITY TO USE) THE SITE OR OUR SERVICES, EVEN IF ${COMPANY.toUpperCase()} HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES. IN NO EVENT SHALL OUR TOTAL LIABILITY TO YOU EXCEED THE GREATER OF (A) THE AMOUNT YOU PAID TO US IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO LIABILITY, OR (B) ONE HUNDRED AUSTRALIAN DOLLARS (AUD $100). SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF CERTAIN WARRANTIES OR LIABILITY, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.`,
  },
  {
    id: "indemnification",
    title: "10. Indemnification",
    text: `You agree to indemnify, defend, and hold harmless ${COMPANY} and its directors, officers, employees, contractors, and agents from and against any and all claims, liabilities, damages, losses, costs, and expenses (including reasonable legal fees) arising from or relating to: (a) your use of the Site or any services; (b) your violation of these Terms; (c) your violation of any applicable law or regulation; or (d) your infringement of any third-party rights.`,
  },
  {
    id: "governing-law",
    title: "11. Governing Law & Dispute Resolution",
    text: `These Terms shall be governed by and construed in accordance with the laws of Australia, without regard to its conflict of law principles. Any dispute arising from these Terms or your use of the Site shall first be subject to good-faith negotiation between the parties. If the dispute cannot be resolved informally within 30 days, it shall be submitted to the exclusive jurisdiction of the courts located in Australia. You irrevocably consent to the personal jurisdiction of such courts.`,
  },
  {
    id: "changes-to-terms",
    title: "12. Changes to These Terms",
    text: `${COMPANY} reserves the right to revise and update these Terms at any time at our sole discretion. All changes are effective immediately upon posting to this page, with the "Last Updated" date revised accordingly. Your continued use of the Site following the posting of revised Terms constitutes your acceptance of such changes. We recommend that you review this page periodically to stay informed of any updates.`,
  },
  {
    id: "contact",
    title: "13. Contact Information",
    text: `If you have any questions, concerns, or legal notices regarding these Terms of Use, please contact us:`,
    contactBlock: {
      company: COMPANY,
      website: WEBSITE,
      email: EMAIL,
    },
  },
];

export default function TermsOfUsePage() {
  return (
    <main className="min-h-screen bg-[var(--vgs-canvas)]">
      {/* Hero Banner */}
      <div className="bg-[var(--vgs-ink)] text-white">
        <div className="max-w-4xl mx-auto px-6 py-20 sm:py-28">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/50 mb-4">
            Legal
          </p>
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            Terms of Use
          </h1>
          <p className="mt-4 text-white/70 text-base sm:text-lg max-w-2xl">
            Please read these terms carefully before using the{" "}
            <span className="text-white font-semibold">{COMPANY}</span> website
            or any of our services.
          </p>
          <p className="mt-6 text-xs text-white/40 font-mono">
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

        {/* Intro banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-12 flex gap-4 items-start">
          <span className="text-2xl mt-0.5">⚖️</span>
          <div>
            <p className="font-semibold text-amber-900 text-sm">
              Important Legal Agreement
            </p>
            <p className="text-amber-800 text-sm mt-1 leading-relaxed">
              These Terms of Use form a legally binding agreement. By using our
              Site you acknowledge you have read, understood, and agree to be
              bound by all provisions set forth herein.
            </p>
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-14">
          {sections.map((section) => (
            <section key={section.id} id={section.id} className="scroll-mt-28">
              <h2 className="text-xl sm:text-2xl font-bold text-[var(--vgs-ink)] mb-5 pb-3 border-b border-black/8">
                {section.title}
              </h2>

              {/* Sub-content */}
              {"content" in section && section.content && (
                <div className="space-y-6">
                  {section.content.map((item, i) => (
                    <div key={i}>
                      <h3 className="text-base font-semibold text-[var(--vgs-ink)] mb-2">
                        {item.subtitle}
                      </h3>
                      <p className="text-[var(--vgs-ink)]/80 leading-relaxed text-base">
                        {item.text}
                      </p>
                    </div>
                  ))}
                </div>
              )}

              {/* Plain text */}
              {"text" in section && section.text && !("bullets" in section) && !("content" in section) && !("contactBlock" in section) && (
                <p className="text-[var(--vgs-ink)]/80 leading-relaxed text-base">
                  {section.text}
                </p>
              )}

              {/* Text + bullets */}
              {"text" in section && section.text && "bullets" in section && section.bullets && (
                <>
                  <p className="text-[var(--vgs-ink)]/80 leading-relaxed text-base mb-5">
                    {section.text}
                  </p>
                  <ul className="space-y-3">
                    {section.bullets.map((b, i) => (
                      <li key={i} className="flex gap-3 items-start">
                        <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[var(--vgs-blue)] flex-shrink-0" />
                        <span className="text-[var(--vgs-ink)]/80 text-base leading-relaxed">
                          {b}
                        </span>
                      </li>
                    ))}
                  </ul>
                </>
              )}

              {/* Contact with text */}
              {"contactBlock" in section && section.contactBlock && (
                <>
                  {"text" in section && section.text && (
                    <p className="text-[var(--vgs-ink)]/80 leading-relaxed text-base mb-5">
                      {section.text}
                    </p>
                  )}
                  <div className="bg-white border border-black/8 rounded-2xl p-6 space-y-2 text-base">
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
                </>
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
          <div className="flex gap-4 text-xs text-[var(--vgs-cloud)]">
            <Link href="/privacy" className="hover:text-[var(--vgs-blue)] transition-colors">
              Privacy Policy
            </Link>
            <span>·</span>
            <p>© {new Date().getFullYear()} {COMPANY}. All rights reserved.</p>
          </div>
        </div>
      </div>
    </main>
  );
}
