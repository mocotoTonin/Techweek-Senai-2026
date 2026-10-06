import { createFileRoute } from "@tanstack/react-router";

import {
  ArrowDown,
  ArrowUpRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Instagram,
  Mail,
  MapPin,
  Network,
  Users,
  Wrench,
  Lightbulb,
  Plus,
  Minus,
  Menu,
  X,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import eventLab from "@/assets/sesi-event-lab.jpg";
import eventTalk from "@/assets/sesi-event-talk.jpg";
import eventWorkshop from "@/assets/sesi-event-workshop.jpg";
import antonyPhoto from "@/assets/antony.jpeg";
import jonathanPhoto from "@/assets/JonathanOliveiraBergamo - Jonathan Bergamo.png";
import michelePhoto from "@/assets/michele.jpeg";
import ericPhoto from "@/assets/eric.jpg";
import leticiaPhoto from "@/assets/leticia.jpeg";
import humbertoPhoto from "@/assets/humberto.jpeg";
import facultyPhoto from "@/assets/senai.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Semana de Tecnologia 2026 | SENAI Sorocaba" },
      {
        name: "description",
        content:
          "De 14 a 16 de outubro: três dias de palestras, minicursos e conexões na Semana de Tecnologia SENAI Sorocaba.",
      },
      { property: "og:title", content: "Semana de Tecnologia 2026 | SENAI Sorocaba" },
      {
        property: "og:description",
        content: "Tecnologia, inovação e oportunidades para construir o futuro.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const highlights = [
  {
    icon: Lightbulb,
    number: "01",
    title: "Inovação",
    text: "Descubra tecnologias de ponta e tendências emergentes em software e mecatrônica.",
  },
  {
    icon: Wrench,
    number: "02",
    title: "Oficinas",
    text: "Experiências práticas com especialistas, conectando ideias, habilidades e novas ferramentas.",
  },
  {
    icon: Network,
    number: "03",
    title: "Conexões",
    text: "Encontre profissionais, estudantes e empresas que estão transformando o futuro da tecnologia.",
  },
];

const schedule = [
  {
    weekday: "QUARTA-FEIRA",
    date: "14 OUT",
    tracks: [
      {
        category: "ANÁLISE E DESENVOLVIMENTO DE SISTEMAS",
        activities: [
          {
            time: "19:30 — 20:30",
            type: "A DEFINIR",
            title: "A DEFINIR",
            speaker: "A DEFINIR",
            place: "A DEFINIR",
            text: "Palestrante e informações sobre a atividade serão divulgados em breve.",
          },
          {
            time: "21:00 — 22:00",
            type: "PALESTRA",
            title: "A Evolução da Função do Desenvolvedor na Era da IA",
            speaker: "Humberto Cornia · Sr. Delivery Consultant",
            place: "A DEFINIR",
            text: "Uma reflexão sobre como a inteligência artificial está transformando o papel do desenvolvedor, tornando o julgamento técnico, a resolução de problemas e a capacidade de avaliar soluções geradas por IA habilidades cada vez mais importantes.",
          },
        ],
      },

      {
        category: "MECATRÔNICA",
        activities: [
          {
            time: "19:30 — 20:30",
            type: "MINICURSO",
            title: "Manufatura Aditiva: Desmistificando a Impressão 3D em Resina",
            speaker: "Antoni Dalmatti Alves Lima Frigério · Faber",
            place: "A DEFINIR",
            text: "Uma introdução prática aos fundamentos da impressão 3D em resina, abordando funcionamento, preparação dos modelos, impressão, pós-processamento, aplicações e possibilidades dentro da manufatura aditiva.",
          },
          {
            time: "19:30 — 20:30",
            type: "PALESTRA",
            title: "A DEFINIR",
            speaker: "A DEFINIR",
            place: "A DEFINIR",
            text: "Palestrante e informações sobre a atividade serão divulgados em breve.",
          },
          {
            time: "21:00 — 22:00",
            type: "A DEFINIR",
            title: "A DEFINIR",
            speaker: "A DEFINIR",
            place: "A DEFINIR",
            text: "Palestrante e informações sobre a atividade serão divulgados em breve.",
          },
        ],
      },
    ],
  },

  {
    weekday: "QUINTA-FEIRA",
    date: "15 OUT",
    tracks: [
      {
        category: "ANÁLISE E DESENVOLVIMENTO DE SISTEMAS",
        activities: [
          {
            time: "19:30 — 20:30",
            type: "PALESTRA",
            title: "Internacionalização em TI",
            speaker: "Jonathan Oliveira Bergamo · Engenheiro de Software",
            place: "A DEFINIR",
            text: "Guia prático para profissionais brasileiros ingressarem no mercado global de tecnologia, explorando preparação técnica, inglês, contratação remota e trabalho internacional.",
          },
          {
            time: "21:00 — 22:00",
            type: "A DEFINIR",
            title: "A DEFINIR",
            speaker: "A DEFINIR",
            place: "A DEFINIR",
            text: "Palestrante e informações sobre a atividade serão divulgados em breve.",
          },
        ],
      },

      {
        category: "MECATRÔNICA",
        activities: [
          {
            time: "19:30 — 20:30",
            type: "PALESTRA",
            title: "E quando não tem manual?",
            speaker: "Michele da Rocha Moreira · Psicanalista",
            place: "A DEFINIR",
            text: "Uma reflexão sobre resiliência e inteligência emocional diante de situações com informações insuficientes, variáveis fora do nosso controle e respostas que ainda não existem.",
          },
          {
            time: "21:00 — 22:00",
            type: "A DEFINIR",
            title: "A DEFINIR",
            speaker: "A DEFINIR",
            place: "A DEFINIR",
            text: "Palestrante e informações sobre a atividade serão divulgados em breve.",
          },
        ],
      },
    ],
  },

  {
    weekday: "SEXTA-FEIRA",
    date: "16 OUT",
    tracks: [
      {
        category: "ANÁLISE E DESENVOLVIMENTO DE SISTEMAS",
        activities: [
          {
            time: "19:30 — 20:30",
            type: "PALESTRA",
            title: "Navegando pela Tecnologia: Liderando Projetos, Pessoas e Desafios",
            speaker: "Letícia Fernanda Anhaia Perosa · Analista de Projetos",
            place: "A DEFINIR",
            text: "Uma jornada pelos bastidores da carreira em tecnologia, abordando os desafios da transição da área técnica para a liderança e as principais lições aprendidas na gestão de projetos e equipes.",
          },
          {
            time: "21:00 — 22:00",
            type: "PALESTRA",
            title: "Seu comportamento fala antes de você",
            speaker: "Eric Garcia · Treinador Comportamental",
            place: "A DEFINIR",
            text: "Uma reflexão sobre comportamento e autoconhecimento, incentivando cada aluno a analisar como suas atitudes são percebidas pelas pessoas ao seu redor e como elas se refletem na vida real.",
          },
        ],
      },

      {
        category: "MECATRÔNICA",
        activities: [
          {
            time: "19:30 — 20:30",
            type: "PALESTRA",
            title: "Seu comportamento fala antes de você",
            speaker: "Eric Garcia · Treinador Comportamental",
            place: "A DEFINIR",
            text: "Uma reflexão sobre comportamento e autoconhecimento, incentivando cada aluno a analisar como suas atitudes são percebidas pelas pessoas ao seu redor e como elas se refletem na vida real.",
          },
          {
            time: "21:00 — 22:00",
            type: "A DEFINIR",
            title: "A DEFINIR",
            speaker: "A DEFINIR",
            place: "A DEFINIR",
            text: "Palestrante e informações sobre a atividade serão divulgados em breve.",
          },
        ],
      },
    ],
  },
];

const trackFilters = [
  { id: "", label: "Todas as categorias" },
  { id: "ANÁLISE E DESENVOLVIMENTO DE SISTEMAS", label: "Análise e Desenvolvimento de Sistemas" },
  { id: "MECATRÔNICA", label: "Mecatrônica" },
];

function activitiesIn(filter: string) {
  return schedule.reduce(
    (total, day) =>
      total +
      day.tracks
        .filter((track) => !filter || track.category === filter)
        .reduce((count, track) => count + track.activities.length, 0),
    0,
  );
}

const speakers = [
  {
    image: jonathanPhoto,
    name: "Jonathan Oliveira Bergamo",
    role: "Engenheiro de Software",
    company: "Natoora",
    bio: "Engenheiro de Software Full-Stack com experiência internacional, especializado no desenvolvimento de soluções web e mobile para o mercado global de tecnologia.",
  },
  {
    image: antonyPhoto,
    name: "Antoni Dalmatti Alves Lima Frigério",
    role: "Faber — Técnico de Laboratório",
    company: "SESI Sorocaba",
    bio: "Profissional de fabricação digital, robótica educacional e cultura maker, com experiência em impressão 3D, prototipagem, eletrônica, programação e automação aplicadas ao desenvolvimento de projetos.",
  },
  {
    image: michelePhoto,
    name: "Michele da Rocha Moreira",
    role: "Psicanalista e Assessora Especial I",
    company: "Centro Paula Souza",
    bio: "Psicanalista clínica, palestrante de inteligência emocional e coordenadora do Programa SER CPS, com atuação em escuta, acolhimento e desenvolvimento da inteligência emocional dos estudantes.",
  },
  {
    image: ericPhoto,
    name: "Eric Garcia",
    role: "Treinador Comportamental e Personal Trainer",
    company: "Profissional Autônomo",
    bio: "Profissional com quase 10 anos de experiência em comportamento humano, atuando com palestras, treinamentos e atendimentos individuais voltados ao desenvolvimento pessoal, autoconsciência e mudança de comportamento.",
  },
  {
    image: leticiaPhoto,
    name: "Letícia Fernanda Anhaia Perosa",
    role: "Analista de Projetos",
    company: "T4E GROUP",
    bio: "Profissional de tecnologia com formação em desenvolvimento de software e atuação na gestão de projetos, fazendo a interface entre demandas de clientes e equipes de desenvolvimento. Iniciou sua transição de carreira pelo SENAI e hoje é responsável pela carteira de soluções tecnológicas da empresa.",
  },
  {
    image: humbertoPhoto,
    name: "Humberto Cornia",
    role: "Sr. Delivery Consultant",
    company: "AWS",
    bio: "Especialista em arquitetura em nuvem e transformação tecnológica, com quase 7 anos de atuação na AWS. Possui experiência como Tech Lead, 7 certificações AWS e atuação com ferramentas de desenvolvimento assistido por inteligência artificial.",
  },
];

const gallery = [eventLab, eventTalk, eventWorkshop];
const nav = [
  ["Sobre", "sobre"],
  ["Agenda", "agenda"],
  ["Palestrantes", "palestrantes"],
  ["Galeria", "galeria"],
];

function SectionHeading({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="section-heading">
      <span>{index}</span>
      <h2>{children}</h2>
    </div>
  );
}

function Index() {
  const [slide, setSlide] = useState(0);
  const [showFullSchedule, setShowFullSchedule] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [trackFilter, setTrackFilter] = useState("");

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.colorScheme = "dark";
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSlide((current) => (current + 1) % gallery.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <main className="bg-background text-foreground">
      <div
        className="intro-shell"
        style={{ "--hero-image": `url(${facultyPhoto})` } as React.CSSProperties}
      >
        <header className="site-header">
          <a href="#inicio" className="brand" aria-label="SENAI Sorocaba — início">
            <span>SENAI</span>
            <small>SOROCABA</small>
          </a>
          <nav className={menuOpen ? "nav-open" : ""} aria-label="Navegação principal">
            {nav.map(([label, id]) => (
              <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <Button
            variant="ghost"
            size="icon"
            className="menu-toggle"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X /> : <Menu />}
          </Button>
        </header>

        <section id="inicio" className="hero-section">
          <div className="hero-copy">
            <p className="hero-kicker">SENAI SOROCABA APRESENTA</p>
            <h1>
              SEMANA DE
              <br />
              <strong>TECNOLOGIA</strong>
              <br />
              <span>2026</span>
            </h1>
            <p className="hero-description">
              Educação que transforma. Tecnologia que conecta. Três dias para experimentar o futuro
              em movimento.
            </p>
            <div className="hero-actions">
              <Button variant="event" size="event" asChild>
                <a href="#agenda">
                  VER PROGRAMAÇÃO <ArrowDown />
                </a>
              </Button>
              <span>
                <CalendarDays /> 14 A 16 OUT 2026
              </span>
            </div>
          </div>
        </section>
      </div>

      <section id="sobre" className="page-section">
        <div className="section-shell">
          <SectionHeading index="01">
            POR QUE VIVER A<br />
            <em>SEMANA DE TECNOLOGIA?</em>
          </SectionHeading>
          <div className="feature-list">
            {highlights.map(({ icon: Icon, number, title, text }) => (
              <article key={title}>
                <span className="feature-number">{number}</span>
                <Icon />
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="agenda" className="page-section">
        <div className="section-shell">
          <SectionHeading index="02">
            AGENDA DO <em>EVENTO</em>
          </SectionHeading>
          <div className="track-filter" role="group" aria-label="Filtrar agenda por categoria">
            {trackFilters.map((filter) => {
              const active = trackFilter === filter.id;
              return (
                <button
                  key={filter.id || "todas"}
                  type="button"
                  className={active ? "is-active" : ""}
                  aria-pressed={active}
                  onClick={() => setTrackFilter(filter.id)}
                >
                  <span>{filter.label}</span>
                  <small>{activitiesIn(filter.id)}</small>
                </button>
              );
            })}
          </div>
          <p className="track-filter-note" aria-live="polite">
            {trackFilter
              ? `Mostrando ${trackFilters.find((filter) => filter.id === trackFilter)?.label ?? trackFilter} · ${activitiesIn(trackFilter)} atividades nos três dias`
              : `Mostrando todas as categorias · ${activitiesIn("")} atividades nos três dias`}
          </p>
          {schedule.map((day, dayIndex) => {
            const tracks = trackFilter
              ? day.tracks.filter((track) => track.category === trackFilter)
              : day.tracks;
            if (!tracks.length) return null;
            return (
              <div
                key={day.date}
                className={
                  dayIndex > 0 && !showFullSchedule
                    ? "schedule-day schedule-day-hidden"
                    : "schedule-day"
                }
              >
                <div className="agenda-date">
                  <CalendarDays />
                  <span>{day.weekday}</span>
                  <strong>{day.date}</strong>
                </div>
                {tracks.map((track) => (
                  <div key={track.category} className="schedule-track">
                    <b className="track-label">{track.category}</b>
                    <div className="schedule-list">
                      {track.activities.map((item) => (
                        <article key={item.title}>
                          <time>{item.time}</time>
                          <div>
                            <b className="activity-type">{item.type}</b>
                            <h3>{item.title}</h3>
                            <p>{item.text}</p>
                            <span>
                              <Users /> {item.speaker}
                            </span>
                            <span>
                              <MapPin /> {item.place}
                            </span>
                          </div>
                          <Button
                            variant="outline"
                            className="signup-button"
                            asChild
                            aria-label={`Inscreva-se em ${item.title}`}
                          >
                            <a
                              href="https://www.even3.com.br/semana-de-tecnologia-faculdade-senai-sorocaba-789762/"
                              target="_blank"
                              rel="noreferrer"
                            >
                              <span>INSCREVA-SE</span>
                              <ArrowUpRight />
                            </a>
                          </Button>
                        </article>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            );
          })}
          <Button
            variant="event"
            size="event"
            className="schedule-toggle"
            onClick={() => setShowFullSchedule((current) => !current)}
            aria-expanded={showFullSchedule}
          >
            {showFullSchedule ? <Minus /> : <Plus />}{" "}
            {showFullSchedule ? "VER MENOS" : "VER A AGENDA COMPLETA"}
          </Button>
        </div>
      </section>

      <section id="palestrantes" className="page-section">
        <div className="section-shell">
          <SectionHeading index="03">
            CONHEÇA OS <em>PALESTRANTES</em>
          </SectionHeading>
          <div className="speaker-grid">
            {speakers.map((speaker) => (
              <article key={speaker.name}>
                <div className="speaker-photo">
                  <img
                    src={speaker.image}
                    alt={`Retrato de ${speaker.name}`}
                    loading="lazy"
                    width={768}
                    height={960}
                  />
                </div>
                <h3>{speaker.name}</h3>
                <strong>{speaker.role}</strong>
                <small>{speaker.company}</small>
                <p>{speaker.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="galeria" className="page-section">
        <div className="section-shell">
          <SectionHeading index="04">
            GALERIA DO <em>EVENTO</em>
          </SectionHeading>
          <div className="gallery-stage">
            <img
              key={slide}
              className="gallery-image"
              src={gallery[slide]}
              alt={`Momento da Semana de Tecnologia ${slide + 1}`}
              width={1200}
              height={800}
            />
            <span className="gallery-count">0{slide + 1} / 03</span>
            <div className="gallery-controls">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setSlide((slide + 2) % 3)}
                aria-label="Foto anterior"
              >
                <ChevronLeft />
              </Button>
              <Button
                variant="event"
                size="icon"
                onClick={() => setSlide((slide + 1) % 3)}
                aria-label="Próxima foto"
              >
                <ChevronRight />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div>
          <strong>SENAI</strong>
          <span>SEMANA DE TECNOLOGIA 2026</span>
        </div>
        <p>EDUCAÇÃO QUE PREPARA PESSOAS PARA TRANSFORMAR O MUNDO.</p>
        <div className="footer-links">
          <Button variant="outline" size="icon" asChild>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <Instagram />
            </a>
          </Button>
          <Button variant="outline" size="icon" asChild>
            <a href="mailto:eventos@senaisorocaba.org.br" aria-label="E-mail">
              <Mail />
            </a>
          </Button>
        </div>
        <a
          className="past-site"
          href="https://techweek-senai-sorocaba.vercel.app/"
          target="_blank"
          rel="noreferrer"
        >
          SITE DA EDIÇÃO ANTERIOR · 2025 <ArrowUpRight />
        </a>
      </footer>
    </main>
  );
}
