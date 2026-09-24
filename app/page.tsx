import AcademiaS12LandingPage from "./landing-page";
import { SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "./site-config";

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
    },
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#sidao`,
      name: "Sidão",
      url: `${SITE_URL}/#historia`,
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
      about: [{ "@id": `${SITE_URL}/#sidao` }, { "@id": `${SITE_URL}/#organization` }],
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
      mentions: { "@id": `${SITE_URL}/#sidao` },
    },
    {
      "@type": "ItemList",
      "@id": `${SITE_URL}/#cursos`,
      name: "Cursos da Academia S12",
      numberOfItems: 3,
      itemListElement: ["curso-amadores", "curso-base", "curso-preparadores"].map((id, index) => ({
        "@type": "ListItem",
        position: index + 1,
        item: { "@id": `${SITE_URL}/#${id}` },
      })),
    },
    ...[
      {
        id: "curso-amadores",
        name: "Goleiros Amadores",
        description: "Fundamentos de posicionamento, pegada, segurança e preparação mental para goleiros amadores.",
      },
      {
        id: "curso-base",
        name: "Atletas de Base",
        description: "Jogo com os pés, leitura tática, explosão e preparação mental para atletas de base.",
      },
      {
        id: "curso-preparadores",
        name: "Preparador de Goleiros",
        description: "Periodização de treinos, técnica, tomada de decisão e liderança para preparadores de goleiros.",
      },
    ].map((course) => ({
      "@type": "Course",
      "@id": `${SITE_URL}/#${course.id}`,
      name: course.name,
      description: course.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      author: { "@id": `${SITE_URL}/#sidao` },
      inLanguage: "pt-BR",
      url: `${SITE_URL}/#${course.id}`,
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
