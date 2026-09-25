import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowUp,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Instagram,
  Lightbulb,
  Mail,
  MapPin,
  Network,
  Users,
  Wrench,
} from "lucide-react";
import { useState } from "react";
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
      {
        name: "description",
        content: "Três dias de palestras, oficinas e conexões na Semana de Tecnologia SESI Sorocaba.",
      },
      { property: "og:title", content: "Semana de Tecnologia 2025 | SESI Sorocaba" },
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
    title: "Inovação",
    text: "Descubra tecnologias de ponta e tendências emergentes em software e mecatrônica.",
  },
  {
    icon: Wrench,
    title: "Oficinas",
    text: "Experiências práticas com especialistas, conectando ideias, habilidades e novas ferramentas.",
  },
  {
    icon: Network,
    title: "Conexões",
    text: "Encontre profissionais, estudantes e empresas que estão transformando o futuro da tecnologia.",
  },
];

const schedule = [
  {
    title: "Comunicação que transforma: a arte da oratória no mundo técnico",
    speaker: "Jorge Sabino · Consultor em performance",
    place: "Auditório · Piso superior",
    text: "Uma conversa direta sobre clareza, confiança e presença para comunicar ideias técnicas que realmente movimentam pessoas.",
  },
  {
    title: "Indústria 4.0: excelência, arquitetura e inteligência artificial",
    speaker: "Rodrigo Ferreira · Especialista em inovação",
    place: "Laboratório de tecnologia",
    text: "Os desafios e as oportunidades da indústria conectada, com aplicações práticas de automação e inteligência artificial.",
  },
  {
    title: "Primeiros passos em automação com n8n",
    speaker: "David Vieira e equipe · Analistas de dados",
    place: "Sala maker · Piso térreo",
    text: "Aprenda os conceitos essenciais da automação e construa um fluxo simples durante a oficina.",
  },
];

const speakers = [
  {
    image: gabriel,
    name: "Gabriel Faria e Silva",
    role: "Gestor de Projetos",
    company: "Cyber Horizon Group",
    bio: "Especialista em cloud e arquitetura de dados, transforma desafios complexos em soluções simples e escaláveis.",
  },
  {
    image: bruno,
    name: "Bruno Souza",
    role: "Psicólogo e consultor",
    company: "Consultoria em Desenvolvimento Humano",
    bio: "Atua com saúde mental, liderança e desenvolvimento humano para ambientes de trabalho mais conscientes.",
  },
  {
    image: eric,
    name: "Eric Garcia",
    role: "Palestrante e treinador",
    company: "Desenvolvimento Comportamental",
    bio: "Especialista em comunicação, atitude e alta performance, conectando propósito a resultados sustentáveis.",
  },
];

const gallery = [eventLab, eventTalk, eventWorkshop];

function SectionTitle({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <div className="mx-auto mb-12 max-w-3xl text-center">
      <h2 className="font-display text-4xl leading-tight text-foreground sm:text-5xl">
        {children} <span className="text-primary">{accent}</span>
      </h2>
    </div>
  );
}

function Index() {
  const [slide, setSlide] = useState(0);
  const previous = () => setSlide((value) => (value + gallery.length - 1) % gallery.length);
  const next = () => setSlide((value) => (value + 1) % gallery.length);

  return (
    <main className="overflow-hidden bg-background text-foreground">
      <section className="event-hero relative flex min-h-[92vh] items-center justify-center px-5 py-24 text-center">
        <div className="event-grid absolute inset-0 opacity-40" />
        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/10 px-4 py-2 text-xs font-semibold text-primary sm:text-sm">
            <CalendarDays className="size-4" /> 17 a 19 de novembro de 2025
          </div>
          <p className="mb-3 text-sm font-semibold uppercase text-muted-foreground">SESI Sorocaba apresenta</p>
          <h1 className="font-display text-6xl leading-[1.05] text-foreground sm:text-7xl lg:text-8xl">
            Semana de <span className="text-primary">Tecnologia</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-xl font-semibold text-foreground sm:text-2xl">
            Educação que transforma. Tecnologia que conecta.
          </p>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Três dias de inovação, aprendizado e novas possibilidades para estudantes e profissionais.
          </p>
          <p className="mt-4 inline-flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="size-4 text-primary" /> SESI Sorocaba, Brasil
          </p>
          <div className="mt-8">
            <Button variant="event" size="event" asChild>
              <a href="#agenda">Ver programação <ArrowDown /></a>
            </Button>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-24 sm:py-28" id="sobre">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle accent="Semana de Tecnologia?">Por que viver a</SectionTitle>
          <p className="mx-auto -mt-8 mb-12 max-w-2xl text-center text-sm leading-7 text-muted-foreground">
            Uma experiência aberta ao público, pensada para quem quer aprender, criar e fazer parte do próximo passo.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {highlights.map(({ icon: Icon, title, text }) => (
              <article key={title} className="event-card group p-7">
                <div className="mb-6 flex size-12 items-center justify-center rounded-md bg-primary text-primary-foreground transition-transform group-hover:-translate-y-1">
                  <Icon className="size-6" />
                </div>
                <h3 className="text-xl font-bold">{title}</h3>
                <p className="mt-3 text-sm leading-7 text-muted-foreground">{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28" id="agenda">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle accent="Evento">Agenda do</SectionTitle>
          <p className="mx-auto -mt-8 mb-14 max-w-xl text-center text-sm leading-7 text-muted-foreground">
            Palestras e oficinas para ampliar repertórios, trocar experiências e colocar novas ideias em movimento.
          </p>
          <div className="mb-7 flex items-center gap-3">
            <CalendarDays className="size-5 text-primary" />
            <h3 className="font-display text-2xl">17 de novembro</h3>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {schedule.map((item) => (
              <article key={item.title} className="event-card flex flex-col p-6">
                <h3 className="text-lg font-bold leading-snug">{item.title}</h3>
                <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground"><Users className="size-4 text-primary" />{item.speaker}</p>
                <p className="mt-2 flex items-center gap-2 text-xs font-semibold"><MapPin className="size-4 text-primary" />{item.place}</p>
                <p className="my-5 flex-1 text-sm leading-7 text-muted-foreground">{item.text}</p>
                <Button variant="event" asChild>
                  <a href="mailto:eventos@sesisorocaba.org.br?subject=Inscrição na Semana de Tecnologia">
                    Faça sua inscrição <ExternalLink />
                  </a>
                </Button>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface py-24 sm:py-28" id="palestrantes">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle accent="Palestrantes">Conheça os</SectionTitle>
          <p className="mx-auto -mt-8 mb-12 max-w-xl text-center text-sm leading-7 text-muted-foreground">
            Profissionais que compartilham conhecimento e abrem caminhos para o futuro.
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {speakers.map((speaker) => (
              <article key={speaker.name} className="event-card overflow-hidden">
                <img src={speaker.image} alt={`Retrato de ${speaker.name}`} loading="lazy" width={768} height={960} className="aspect-[4/4.5] w-full object-cover object-top" />
                <div className="p-6">
                  <h3 className="text-xl font-bold">{speaker.name}</h3>
                  <p className="mt-1 text-sm font-semibold text-primary">{speaker.role}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{speaker.company}</p>
                  <p className="mt-5 text-sm leading-7 text-muted-foreground">{speaker.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 sm:py-28" id="galeria">
        <div className="mx-auto max-w-6xl px-5">
          <SectionTitle accent="Evento">Galeria do</SectionTitle>
          <p className="mx-auto -mt-8 mb-12 max-w-xl text-center text-sm text-muted-foreground">Tecnologia se aprende fazendo, compartilhando e criando juntos.</p>
          <div className="relative mx-auto max-w-5xl">
            <div className="overflow-hidden rounded-md border border-border bg-card">
              <img src={gallery[slide]} alt={`Momento da Semana de Tecnologia ${slide + 1}`} loading="lazy" width={1200} height={800} className="aspect-[16/9] w-full object-cover transition-opacity" />
            </div>
            <Button aria-label="Foto anterior" title="Foto anterior" variant="event" size="icon" className="absolute left-3 top-1/2 -translate-y-1/2" onClick={previous}><ChevronLeft /></Button>
            <Button aria-label="Próxima foto" title="Próxima foto" variant="event" size="icon" className="absolute right-3 top-1/2 -translate-y-1/2" onClick={next}><ChevronRight /></Button>
            <div className="mt-5 flex justify-center gap-2">
              {gallery.map((_, index) => (
                <button key={index} aria-label={`Mostrar foto ${index + 1}`} onClick={() => setSlide(index)} className={index === slide ? "size-2 rounded-full bg-primary" : "size-2 rounded-full bg-muted-foreground/40"} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-border bg-surface py-14">
        <div className="mx-auto flex max-w-6xl flex-col justify-between gap-10 px-5 md:flex-row">
          <div>
            <div className="flex items-center gap-3">
              <div className="flex size-12 items-center justify-center rounded-md bg-primary font-display text-2xl text-primary-foreground">S</div>
              <div><p className="text-xl font-bold">SESI Sorocaba</p><p className="text-xs text-muted-foreground">Semana de Tecnologia 2025</p></div>
            </div>
            <p className="mt-5 max-w-sm text-sm text-muted-foreground">Educação que prepara pessoas para transformar o mundo.</p>
          </div>
          <div>
            <p className="mb-4 text-xs font-bold uppercase text-muted-foreground">Conecte-se conosco</p>
            <div className="flex gap-2">
              <Button variant="outline" size="icon" aria-label="Instagram" title="Instagram" asChild><a href="https://www.instagram.com/" target="_blank" rel="noreferrer"><Instagram /></a></Button>
              <Button variant="outline" size="icon" aria-label="E-mail" title="E-mail" asChild><a href="mailto:eventos@sesisorocaba.org.br"><Mail /></a></Button>
            </div>
          </div>
        </div>
        <div className="mx-auto mt-10 max-w-6xl border-t border-border px-5 pt-7 text-center text-xs text-muted-foreground">© 2025 SESI Sorocaba. Todos os direitos reservados.</div>
      </footer>

      <Button variant="event" size="icon" aria-label="Voltar ao topo" title="Voltar ao topo" className="fixed bottom-5 right-5 z-40 rounded-full" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}><ArrowUp /></Button>
    </main>
  );
}