import AcademiaS12LandingPage from "./landing-page";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./site-config";

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#organization`,
      name: "Academia S12",
      url: SITE_URL,
      logo: `${SITE_URL}/logo-horizontal.jpeg`,
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      name: "Academia S12",
      url: SITE_URL,
      inLanguage: "pt-BR",
      publisher: { "@id": `${SITE_URL}/#organization` },
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
    },
    ...[
      {
        name: "Goleiros Amadores",
        description: "Fundamentos de posicionamento, pegada, segurança e preparação mental para goleiros amadores.",
      },
      {
        name: "Atletas de Base",
        description: "Jogo com os pés, leitura tática, explosão e preparação mental para atletas de base.",
      },
      {
        name: "Preparador de Goleiros",
        description: "Periodização de treinos, técnica, tomada de decisão e liderança para preparadores de goleiros.",
      },
    ].map((course) => ({
      "@type": "Course",
      name: course.name,
      description: course.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      inLanguage: "pt-BR",
      url: `${SITE_URL}/#cursos`,
    })),
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
      <AcademiaS12LandingPage unlocked />
    </>
  );
}
