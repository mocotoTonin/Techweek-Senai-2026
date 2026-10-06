import { useState } from "react";
import { ArrowUpRight, Info, Maximize2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

type Speaker = {
  image: string;
  name: string;
  role: string;
  company: string;
  bio: string;
};

export function SpeakerCard({ speaker, talkTitle, targetId, onNavigate }: {
  speaker: Speaker;
  talkTitle: string;
  targetId: string;
  onNavigate: () => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [flipped, setFlipped] = useState(false);

  return (
    <article className={`speaker-card${flipped ? " is-flipped" : ""}`}>
      <Button variant="ghost" asChild className="speaker-link">
        <a href={`#${targetId}`} aria-label={`Ver palestra de ${speaker.name}: ${talkTitle}`} onClick={(event) => {
          event.preventDefault();
          onNavigate();
        }}>
          <div className="speaker-flipper">
            <div className="speaker-face speaker-front">
              <img src={speaker.image} alt={`Retrato de ${speaker.name}`} loading="lazy" width={768} height={960} />
            </div>
            <div className="speaker-face speaker-back">
              <div className="speaker-details">
                <h3>{speaker.name}</h3>
                <strong>{speaker.role}</strong>
                <small>{speaker.company}</small>
                <p>{speaker.bio}</p>
              </div>
              <div className="speaker-talk">
                <span>PALESTRA / MINICURSO</span>
                <b>{talkTitle}</b>
                <ArrowUpRight aria-hidden="true" />
              </div>
            </div>
          </div>
        </a>
      </Button>
      <Button variant="outline" size="icon" className="speaker-info-toggle" aria-label={`Informações de ${speaker.name}`} aria-pressed={flipped} onClick={() => setFlipped((value) => !value)}>
        <Info />
      </Button>
      <Button variant="outline" size="icon" className="speaker-enlarge" title="Ampliar foto" aria-label={`Ampliar foto de ${speaker.name}`} onClick={() => setExpanded(true)}>
        <Maximize2 />
      </Button>
      <Dialog open={expanded} onOpenChange={setExpanded}>
        <DialogContent className="speaker-lightbox">
          <DialogTitle className="sr-only">Foto de {speaker.name}</DialogTitle>
          <DialogDescription className="sr-only">{speaker.role} · {speaker.company}</DialogDescription>
          <img src={speaker.image} alt={`Retrato ampliado de ${speaker.name}`} />
        </DialogContent>
      </Dialog>
    </article>
  );
}