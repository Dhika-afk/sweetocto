export interface MemoryItem {
  title: string;
  image: string;
  text: string;
}

export interface AppConfig {
  recipientName: string;
  senderName: string;
  date: string;
  music: {
    file: string;
    volume: number;
  };
  flowerMessage: string;
  memories: MemoryItem[];
  personalMessage: string;
}

export const DEFAULT_CONFIG: AppConfig = {
  recipientName: "Ola",
  senderName: "Dika",
  date: "October 1, 2026",
  music: {
    file: "./assets/we-fell-in-love-in-october.mp3",
    volume: 0.35,
  },
  flowerMessage: "I think this one suits you.",
  memories: [
    {
      title: "The First Meet",
      image: "/assets/CFD.jpeg",
      text: "CFD Udayana Lombok. The very first time our paths crossed under the clear morning sky. A simple Sunday walk that quietly changed everything.",
    },
    {
      title: "The First Dinner",
      image: "/assets/BONO.jpeg",
      text: "Bono Dimsum Mataram. Our first dinner together — warm dimsum, chili oil, and conversations that made time completely disappear.",
    },
    {
      title: "we going gym together",
      image: "/assets/gym.jpeg",
      text: "Better and stronger together. Pushing through workouts side by side, making every heavy rep feel so much lighter.",
    },
    {
      title: "what we drink after gym",
      image: "/assets/jus.jpeg",
      text: "Tempat Beli Jus — chilled fresh juice right after gym. The sweetest, most refreshing way to wrap up our time together.",
    },
  ],
  personalMessage: `I wanted to build something quiet for you. Not a loud greeting, not a template, but a small world where you can pause whenever things get noisy.

When October arrived, I found myself thinking about all the small things — the effortless conversations, the way you notice details most people miss, and how easily your presence brings warmth into any space.

I don't know where all our stories will lead, but I know that meeting you is one of the brightest parts of my year.

Thank you for being you. Happy October 1st.`,
};

export function getConfig(): AppConfig {
  if (typeof window !== "undefined" && (window as unknown as { CONFIG?: AppConfig }).CONFIG) {
    const custom = (window as unknown as { CONFIG: Partial<AppConfig> }).CONFIG;
    return {
      recipientName: custom.recipientName || DEFAULT_CONFIG.recipientName,
      senderName: custom.senderName || DEFAULT_CONFIG.senderName,
      date: custom.date || DEFAULT_CONFIG.date,
      music: {
        file: custom.music?.file || DEFAULT_CONFIG.music.file,
        volume: typeof custom.music?.volume === "number" ? custom.music.volume : DEFAULT_CONFIG.music.volume,
      },
      flowerMessage: custom.flowerMessage || DEFAULT_CONFIG.flowerMessage,
      memories: Array.isArray(custom.memories) && custom.memories.length > 0 ? custom.memories : DEFAULT_CONFIG.memories,
      personalMessage: custom.personalMessage || DEFAULT_CONFIG.personalMessage,
    };
  }
  return DEFAULT_CONFIG;
}
