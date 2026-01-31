export interface Track {
  id: string;
  title: string;
  description: string;
  audioSrc: string;
}

export const tracks: Track[] = [
  {
    id: "155",
    title: "155 — Genre Study",
    description: "Deconstructing Travis Scott's atmospheric trap aesthetic. Layered synth progressions with classic 808 patterns at 155 BPM. Understanding how psychedelic textures balance with rhythmic aggression.",
    audioSrc: "/music/155.mp3",
  },
  {
    id: "all-around",
    title: "All Around",
    description: "Sampled Marvin Gaye's 'All The Way Around' — transforming linear soul samples into cyclical soundscapes through reversal techniques. Using one segment as intro, then reversing another clip with effects for the main loop to create new emotional contexts.",
    audioSrc: "/music/All-Around.mp3",
  },
  {
    id: "silk-808",
    title: "Silk 808 — Cultural Synthesis",
    description: "Bridging traditional Chinese guzheng with contemporary hip-hop. An exploration of cross-cultural sampling, integrating guzheng melodies into modern beat structures while navigating pentatonic and Western tonal systems.",
    audioSrc: "/music/Silk-808.mp3",
  },
];
