// src/data/cortesDoFundador.ts

export interface Corte {
  id: number;
  title: string;
  audioSrc: string;
  coverImage: string;
}

export const cortesDoFundador: Corte[] = [
  {
    id: 1,
    title: "Marcos 4:35-41 - Jesus acalma a tempestade",
    audioSrc:
      "https://res.cloudinary.com/dd7vxtdc0/video/upload/v1748956062/Cortes_Do_Fundador_evangelho_de_Marcos_4.35_-_41_mp3jkn.mp3",
    coverImage:
      "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748955861/4.35_-_41_hsq39d.jpg",
  },
  {
    id: 2,
    title: "A tempestade em Marcos 4:35-41 (2)",
    audioSrc:
      "https://res.cloudinary.com/dd7vxtdc0/video/upload/v1748956685/Cortes_Do_Nosso_Fundador_texto_em_Marcos_4_vers%C3%ADculo_35_jhi2mw.mp3",
    coverImage:
      "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748956787/yjbiyadf9h1hpy4k3meksuaarh16_l1eqma.jpg",
  },
  {
    id: 3,
    title: "Evangelho Transcrito em Lucas 9,57-62",
    audioSrc:
      "https://res.cloudinary.com/dd7vxtdc0/video/upload/v1748957431/cortes_Do_Nosso_Fundador_do_evangelho_transcrito_em_Lc_9_57-62_tmv4s0.mp3",
    coverImage:
      "https://res.cloudinary.com/dd7vxtdc0/image/upload/v1748957372/800px-Lasset_die_Kindlein_zu_mir_kommen_c1840_dkuosy.jpg",
  },
];
