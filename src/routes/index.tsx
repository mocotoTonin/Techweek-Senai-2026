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
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import eventLab from "@/assets/sesi-event-lab.jpg";
import eventTalk from "@/assets/sesi-event-talk.jpg";
import eventWorkshop from "@/assets/sesi-event-workshop.jpg";
import gabriel from "@/assets/speaker-gabriel.jpg";
import bruno from "@/assets/speaker-bruno.jpg";
import eric from "@/assets/speaker-eric.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Semana de Tecnologia 2025 | SESI Sorocaba" },
      { name: "description", content: "Três dias de palestras, oficinas e conexões na Semana de Tecnologia SESI Sorocaba." },
      { property: "og:title", content: "Semana de Tecnologia 2025 | SESI Sorocaba" },
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
  { time: "09:00", title: "Comunicação que transforma: a arte da oratória no mundo técnico", speaker: "Jorge Sabino · Consultor em performance", place: "Auditório · Piso superior", text: "Clareza, confiança e presença para comunicar ideias técnicas que realmente movimentam pessoas." },
  { time: "14:00", title: "Indústria 4.0: excelência, arquitetura e inteligência artificial", speaker: "Rodrigo Ferreira · Especialista em inovação", place: "Laboratório de tecnologia", text: "Aplicações práticas de automação e inteligência artificial para a indústria conectada." },
  { time: "16:30", title: "Primeiros passos em automação com n8n", speaker: "David Vieira e equipe · Analistas de dados", place: "Sala maker · Piso térreo", text: "Construa um fluxo simples e conheça os conceitos essenciais da automação." },
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
      <div />
    </div>
  );
}

function Index() {
  const [slide, setSlide] = useState(0);
  const [dark, setDark] = useState(true);

  useEffect(() => {
    const saved = window.localStorage.getItem("sesi-theme");
    const isDark = saved ? saved === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    setDark(isDark);
    document.documentElement.classList.toggle("dark", isDark);
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    window.localStorage.setItem("sesi-theme", next ? "dark" : "light");
  };

  return (
    <main className="bg-background text-foreground">
      <header className="site-header">
        <a href="#inicio" className="brand" aria-label="SESI Sorocaba — início"><span>SESI</span><small>SOROCABA</small></a>
        <nav aria-label="Navegação principal">
          {nav.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}
        </nav>
        <Button variant="outline" size="icon" onClick={toggleTheme} aria-label={dark ? "Ativar modo claro" : "Ativar modo escuro"} title={dark ? "Modo claro" : "Modo escuro"}>
          {dark ? <Sun /> : <Moon />}
        </Button>
      </header>

      <section id="inicio" className="hero-section">
        <div className="hero-copy">
          <div className="status-line"><span /> INOVAÇÃO & FUTURO</div>
          <p className="hero-kicker">SESI SOROCABA APRESENTA</p>
          <h1>SEMANA DE<br /><strong>TECNOLOGIA</strong><br /><span>2025</span></h1>
          <p className="hero-description">Educação que transforma. Tecnologia que conecta. Três dias para experimentar o futuro em movimento.</p>
          <div className="hero-actions">
            <Button variant="event" size="event" asChild><a href="#agenda">VER PROGRAMAÇÃO <ArrowDown /></a></Button>
            <span><CalendarDays /> 17—19 NOV 2025</span>
          </div>
        </div>
        <div className="hero-visual">
          <div className="tech-rings" aria-hidden="true"><i /><i /><i /></div>
          <img src={eventLab} alt="Estudantes participando de uma atividade de tecnologia" width={1200} height={800} />
          <div className="event-stamp">
            <strong>03</strong><span>DIAS DE<br />EXPERIÊNCIAS</span>
          </div>
          <p><MapPin /> SESI SOROCABA · BRASIL</p>
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
          <div className="agenda-date"><CalendarDays /><span>SEGUNDA-FEIRA</span><strong>17 NOV</strong></div>
          <div className="schedule-list">
            {schedule.map((item) => (
              <article key={item.title}>
                <time>{item.time}</time>
                <div><h3>{item.title}</h3><p>{item.text}</p><span><Users /> {item.speaker}</span><span><MapPin /> {item.place}</span></div>
                <Button variant="outline" size="icon" asChild aria-label={`Inscrever-se em ${item.title}`}><a href="mailto:eventos@sesisorocaba.org.br?subject=Inscrição na Semana de Tecnologia"><ArrowUpRight /></a></Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="palestrantes" className="page-section">
        <div className="section-shell">
          <SectionHeading index="03">CONHEÇA OS <em>PALESTRANTES</em></SectionHeading>
          <div className="speaker-grid">
            {speakers.map((speaker, index) => (
              <article key={speaker.name}>
                <div className="speaker-photo"><img src={speaker.image} alt={`Retrato de ${speaker.name}`} loading="lazy" width={768} height={960} /><span>0{index + 1}</span></div>
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
            <img src={gallery[slide]} alt={`Momento da Semana de Tecnologia ${slide + 1}`} width={1200} height={800} />
            <span className="gallery-count">0{slide + 1} / 03</span>
            <div className="gallery-controls">
              <Button variant="outline" size="icon" onClick={() => setSlide((slide + 2) % 3)} aria-label="Foto anterior"><ChevronLeft /></Button>
              <Button variant="event" size="icon" onClick={() => setSlide((slide + 1) % 3)} aria-label="Próxima foto"><ChevronRight /></Button>
            </div>
          </div>
        </div>
      </section>

      <footer>
        <div><strong>SESI</strong><span>SEMANA DE TECNOLOGIA 2025</span></div>
        <p>EDUCAÇÃO QUE PREPARA PESSOAS PARA TRANSFORMAR O MUNDO.</p>
        <div className="footer-links"><Button variant="outline" size="icon" asChild><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" aria-label="Instagram"><Instagram /></a></Button><Button variant="outline" size="icon" asChild><a href="mailto:eventos@sesisorocaba.org.br" aria-label="E-mail"><Mail /></a></Button></div>
      </footer>
    </main>
  );
}