interface Music {
  title: string;
  slug: string;
  coverImg: string;
  youtubeUrl?: string;
  description?: string;
}

/* --- STATE --- */
interface MusicState {
  musics: Music[];
}

export type { Music, MusicState };
