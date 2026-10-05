import AcademiaS12LandingPage from "./landing-page";
import { HUB_URL, SITE_DESCRIPTION, SITE_TITLE, SITE_URL, SOCIAL_PROFILES } from "./site-config";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "EducationalOrganization",
      "@id": `${SITE_URL}/#organization`,
      name: "Academia S12",
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      logo: `${SITE_URL}/logo-horizontal.jpeg`,
      sameAs: SOCIAL_PROFILES.map((profile) => profile.url),
    },
    {
      "@type": "Person",
      "@id": `${HUB_URL}/#sidao`,
      name: "Sidão",
      url: HUB_URL,
      image: `${SITE_URL}/sidao-goleiro.png`,
      description: "Goleiro e responsável pela metodologia de treinamento da Academia S12.",
      sameAs: ["https://pt.wikipedia.org/wiki/Sid%C3%A3o_(futebolista)"],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Academia S12",
      url: SITE_URL,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
      isPartOf: { "@id": `${HUB_URL}/#website` },
      about: [{ "@id": `${HUB_URL}/#sidao` }, { "@id": `${SITE_URL}/#organization` }],
    },
    {
      "@type": "WebSite",
      "@id": `${HUB_URL}/#website`,
      name: "Sidão 12",
      url: HUB_URL,
      inLanguage: "pt-BR",
      about: { "@id": `${HUB_URL}/#sidao` },
      hasPart: { "@id": `${SITE_URL}/#website` },
    },
    {
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      name: SITE_TITLE,
      description: SITE_DESCRIPTION,
      url: SITE_URL,
      inLanguage: "pt-BR",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      about: { "@id": `${SITE_URL}/#organization` },
      mainEntity: { "@id": `${SITE_URL}/#organization` },
      mentions: { "@id": `${HUB_URL}/#sidao` },
    },
    {
      "@type": "Course",
      "@id": `${SITE_URL}/#jornada-s12`,
      name: "Jornada S12 — 12 Semanas para Evoluir no Gol",
      description: "Jornada de 12 semanas com fundamentos, jogo com os pés, leitura, tomada de decisão e Blindagem Mental S12 para goleiros amadores e atletas de base.",
      provider: { "@id": `${SITE_URL}/#organization` },
      author: { "@id": `${HUB_URL}/#sidao` },
      inLanguage: "pt-BR",
      url: `${SITE_URL}/#cursos`,
      educationalLevel: "Formação esportiva",
      audience: [
        { "@type": "Audience", audienceType: "Goleiros amadores" },
        { "@type": "Audience", audienceType: "Atletas de base e seus responsáveis" },
      ],
    },
  ],
};

export default function Page() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <AcademiaS12LandingPage />
    </>
  );
}
