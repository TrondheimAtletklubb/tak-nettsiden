import snatchVideo from "../assets/snatch-sigurd.mp4";
import snatchThumbnail from "../assets/snatch-thumbnail.webp";
import cjVideo from "../assets/clean-and-jerk-sigurd.mp4";
import cjThumbnail from "../assets/clean-and-jerk-thumbnail.webp";

export const liftsData = [
  {
    id: "snatch",
    title: "Rykk",
    description:
      "Rykk er det første løftet i olympisk vektløfting. Løfteren må løfte stangen fra gulvet til over hodet i én sammenhengende bevegelse. Dette krever eksplosiv kraft, fleksibilitet og presis teknikk. Løfteren må fange stangen i en dyp knebøy-posisjon med armene fullt strukket over hodet, før de reiser seg opp til stående posisjon.",
    videoSrc: snatchVideo,
    thumbnail: snatchThumbnail,
    videoLeft: true,
  },
  {
    id: "clean-jerk",
    title: "Støt",
    description:
      "Støt består av to deler: først løftes stangen til skuldrene (clean), deretter presses den over hodet (jerk). I clean-fasen løfter løfteren stangen fra gulvet til skuldrene og fanger den i en knebøy. I jerk-fasen brukes ben og hofter til å drive stangen over hodet, mens løfteren går ned i utfall eller knebøy for å fange vekten.",
    videoSrc: cjVideo,
    thumbnail: cjThumbnail,
    videoLeft: true,
  },
];
