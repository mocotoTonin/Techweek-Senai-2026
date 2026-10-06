<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep the event as a single static landing page with in-page section navigation; this matches the reference experience and requires no backend.
- Keep the event exclusively dark with SENAI red emphasis; use the SENAI Sorocaba facade across the header and opening, fading into the continuous #212121 background, while the header scrolls away with the page.
- Keep speaker photo interactions in SpeakerCard; resolve agenda targets from existing schedule entries so navigation expands the agenda and highlights the speaker's activities without duplicating event content.
- Keep direction-aware viewport entrances in useScrollReveal with IntersectionObserver and reduced-motion support; replaying entrances must not interfere with speaker flips or dynamic agenda content.
