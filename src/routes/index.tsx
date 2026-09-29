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
  Moon,
  Network,
  Sun,
  Users,
  Wrench,
  Lightbulb,
  Plus,
  Minus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import eventLab from "@/assets/sesi-event-lab.jpg";
import eventTalk from "@/assets/sesi-event-talk.jpg";
import eventWorkshop from "@/assets/sesi-event-workshop.jpg";
import gabriel from "@/assets/speaker-gabriel.jpg";
import bruno from "@/assets/speaker-bruno.jpg";
import eric from "@/assets/speaker-eric.jpg";
import facultyPhoto from "@/assets/faculdade-sorocaba.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Semana de Tecnologia 2026 | SENAI Sorocaba" },
      { name: "description", content: "De 14 a 16 de novembro: três dias de palestras, minicursos e conexões na Semana de Tecnologia SENAI Sorocaba." },
      { property: "og:title", content: "Semana de Tecnologia 2026 | SENAI Sorocaba" },
      { property: "og:description", content: "Tecnologia, inovação e oportunidades para construir o futuro." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const highlights = [
  { icon: Lightbulb, number: "01", title: "Inovação", text: "Descubra tecnologias de ponta e tendências emergentes em software e mecatrônica." },
  { icon: Wrench, number: "02", title: "Oficinas", text: "Experiências práticas com especialistas, conectando ideias, habilidades e novas ferramentas." },
  { icon: Network, number: "03", title: "Conexões", text: "Encontre profissionais, estudantes e empresas que estão transformando o futuro da tecnologia." },
];

const schedule = [
  {
    weekday: "SÁBADO", date: "14 NOV",
    activities: [
      { time: "09:00", type: "PALESTRA", title: "Comunicação que transforma: a arte da oratória no mundo técnico", speaker: "Jorge Sabino · Consultor em performance", place: "Auditório · Piso superior", text: "Clareza, confiança e presença para comunicar ideias técnicas que realmente movimentam pessoas." },
      { time: "14:00", type: "PALESTRA", title: "Indústria 4.0: excelência, arquitetura e inteligência artificial", speaker: "Rodrigo Ferreira · Especialista em inovação", place: "Laboratório de tecnologia", text: "Aplicações práticas de automação e inteligência artificial para a indústria conectada." },
      { time: "16:30", type: "MINICURSO", title: "Primeiros passos em automação com n8n", speaker: "David Vieira e equipe · Analistas de dados", place: "Sala maker · Piso térreo", text: "Construa um fluxo simples e conheça os conceitos essenciais da automação." },
    ],
  },
  {
    weekday: "DOMINGO", date: "15 NOV",
    activities: [
      { time: "09:00", type: "PALESTRA", title: "Cloud e arquitetura de dados para soluções escaláveis", speaker: "Gabriel Faria e Silva · Gestor de Projetos", place: "Auditório · Piso superior", text: "Como transformar desafios complexos em produtos digitais seguros, simples e preparados para crescer." },
      { time: "13:30", type: "MINICURSO", title: "Inteligência artificial aplicada: do prompt ao protótipo", speaker: "Equipe de Tecnologia SESI · Facilitadores", place: "Laboratório de informática", text: "Uma experiência prática para criar, testar e aprimorar soluções com ferramentas de inteligência artificial." },
      { time: "16:00", type: "PALESTRA", title: "Saúde mental e liderança na era digital", speaker: "Bruno Souza · Psicólogo e consultor", place: "Auditório · Piso superior", text: "Estratégias para construir relações de trabalho mais conscientes, humanas e sustentáveis." },
    ],
  },
  {
    weekday: "SEGUNDA-FEIRA", date: "16 NOV",
    activities: [
      { time: "09:00", type: "MINICURSO", title: "Prototipagem rápida com cultura maker", speaker: "Equipe Maker SESI · Instrutores", place: "Sala maker · Piso térreo", text: "Da ideia ao primeiro protótipo com ferramentas digitais, colaboração e experimentação prática." },
      { time: "14:00", type: "PALESTRA", title: "Cibersegurança para pessoas e organizações", speaker: "Gabriel Faria e Silva · Gestor de Projetos", place: "Auditório · Piso superior", text: "Hábitos, riscos e decisões essenciais para proteger dados e operações em um mundo conectado." },
      { time: "17:00", type: "PALESTRA", title: "Atitude, propósito e alta performance", speaker: "Eric Garcia · Palestrante e treinador", place: "Auditório · Piso superior", text: "Um encerramento sobre escolhas, comportamento e o papel de cada pessoa na construção do futuro." },
    ],
  },
];

const speakers = [
  { image: gabriel, name: "Gabriel Faria e Silva", role: "Gestor de Projetos", company: "Cyber Horizon Group", bio: "Especialista em cloud e arquitetura de dados, transforma desafios complexos em soluções simples e escaláveis." },
  { image: bruno, name: "Bruno Souza", role: "Psicólogo e consultor", company: "Consultoria em Desenvolvimento Humano", bio: "Atua com saúde mental, liderança e desenvolvimento humano para ambientes de trabalho mais conscientes." },
  { image: eric, name: "Eric Garcia", role: "Palestrante e treinador", company: "Desenvolvimento Comportamental", bio: "Especialista em comunicação, atitude e alta performance, conectando propósito a resultados sustentáveis." },
];

const gallery = [eventLab, eventTalk, eventWorkshop];
const nav = [["Sobre", "sobre"], ["Agenda", "agenda"], ["Palestrantes", "palestrantes"], ["Galeria", "galeria"]];

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
  const [dark, setDark] = useState(true);
  const [showFullSchedule, setShowFullSchedule] = useState(false);

  useEffect(() => {
    const saved = window.localStorage.getItem("senai-theme");
    const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setSlide((current) => (current + 1) % gallery.length);
    }, 5000);

    return () => window.clearInterval(interval);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("senai-theme", next ? "dark" : "light");
  };

  return (
    <main className="bg-background text-foreground">
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="SENAI Sorocaba — início"><span>SENAI</span><small>SOROCABA</small></a>
        <nav aria-label="Navegação principal">
          {nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <Button variant="ghost" size="icon" className="theme-toggle" onClick={toggleTheme} aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"} title={dark ? "Modo claro" : "Modo escuro"}>
          {dark ? <Sun /> : <Moon />}
        </Button>
      </header>

      <section id="inicio" className="hero-section">
        <div className="hero-copy">
          <p className="hero-kicker">SENAI SOROCABA APRESENTA</p>
          <h1>SEMANA DE<br /><strong>TECNOLOGIA</strong><br /><span>2026</span></h1>
          <p className="hero-description">Educação que transforma. Tecnologia que conecta. Três dias para experimentar o futuro em movimento.</p>
          <div className="hero-actions">
            <Button variant="event" size="event" asChild><a href="#agenda">VER PROGRAMAÇÃO <ArrowDown /></a></Button>
            <span><CalendarDays /> 14—16 NOV 2026</span>
          </div>
        </div>
        <div className="hero-visual">
          <img src={facultyPhoto.url} alt="Fachada da unidade SENAI Sorocaba" width={980} height={652} />
        </div>
        <div className="hero-stats">
          <div><strong>03</strong><span>PALESTRAS</span></div>
          <div><strong>03</strong><span>ESPECIALISTAS</span></div>
          <div><strong>100%</strong><span>CONHECIMENTO</span></div>
          <div><strong>LIVRE</strong><span>PARA O PÚBLICO</span></div>
        </div>
      </section>

      <section id="sobre" className="page-section">
        <div className="section-shell">
          <SectionHeading index="01">POR QUE VIVER A<br /><em>SEMANA DE TECNOLOGIA?</em></SectionHeading>
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
          <SectionHeading index="02">AGENDA DO <em>EVENTO</em></SectionHeading>
          {schedule.map((day, dayIndex) => (
            <div key={day.date} className={dayIndex > 0 && !showFullSchedule ? "schedule-day schedule-day-hidden" : "schedule-day"}>
              <div className="agenda-date"><CalendarDays /><span>{day.weekday}</span><strong>{day.date}</strong></div>
              <div className="schedule-list">
                {day.activities.map((item) => (
                  <article key={item.title}>
                    <time>{item.time}</time>
                    <div><b className="activity-type">{item.type}</b><h3>{item.title}</h3><p>{item.text}</p><span><Users /> {item.speaker}</span><span><MapPin /> {item.place}</span></div>
                    <Button variant="event" size="event" asChild aria-label={`Inscreva-se em ${item.title}`}><a href="mailto:eventos@senaisorocaba.org.br?subject=Inscrição na Semana de Tecnologia"><span>INSCREVA-SE</span><ArrowUpRight /></a></Button>
                  </article>
                ))}
              </div>
            </div>
          ))}
          <Button variant="event" size="event" className="schedule-toggle" onClick={() => setShowFullSchedule((current) => !current)} aria-expanded={showFullSchedule}>
            {showFullSchedule ? <Minus /> : <Plus />} {showFullSchedule ? "VER MENOS" : "VER A AGENDA COMPLETA"}
          </Button>
        </div>
      </section>

      <section id="palestrantes" className="page-section">
        <div className="section-shell">
          <SectionHeading index="03">CONHEÇA OS <em>PALESTRANTES</em></SectionHeading>
          <div className="speaker-grid">
            {speakers.map((speaker, index) => (
              <article key={speaker.name}>
                <div className="speaker-photo"><img src={speaker.image} alt={`Retrato de ${speaker.name}`} loading="lazy" width={768} height={960} /></div>
                <h3>{speaker.name}</h3><strong>{speaker.role}</strong><small>{speaker.company}</small><p>{speaker.bio}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="galeria" className="page-section">
        <div className="section-shell">
          <SectionHeading index="04">GALERIA DO <em>EVENTO</em></SectionHeading>
          <div className="gallery-stage">
            <img key={slide} className="gallery-image" src={gallery[slide]} alt={`Momento da Semana de Tecnologia ${slide + 1}`} width={1200} height={800} />
            <span className="gallery-count">0{slide + 1} / 03</span>
            <div className="gallery-controls">
              <Button variant="outline" size="icon" onClick={() => setSlide((slide + 2) % 3)} aria-label="Foto anterior"><ChevronLeft /></Button>
              <Button variant="event" size="icon" onClick={() => setSlide((slide + 1) % 3)} aria-label="Próxima foto"><ChevronRight /></Button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div><strong>SENAI</strong><span>SEMANA DE TECNOLOGIA 2026</span></div>
        <p>EDUCAÇÃO QUE PREPARA PESSOAS PARA TRANSFORMAR O MUNDO.</p>
        <div className="footer-links"><Button variant="outline" size="icon" asChild><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a></Button><Button variant="outline" size="icon" asChild><a href="mailto:eventos@senaisorocaba.org.br" aria-label="E-mail"><Mail /></a></Button></div>
      </footer>
    </main>
  );
}