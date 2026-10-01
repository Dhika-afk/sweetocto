/**
 * Configuration for "October — A Little World For You"
 * All personal details, names, photos, music, and messages can be customized right here.
 */
const CONFIG = {
  // The name of the person this world was made for
  recipientName: "Ola",

  // Your name
  senderName: "Dika",

  // The special date
  date: "October 1, 2026",

  // Background music configuration
  music: {
    // Put your audio file at /assets/we-fell-in-love-in-october.mp3
    file: "./assets/we-fell-in-love-in-october.mp3",
    volume: 0.35
  },

  // Message shown in the flower garden
  flowerMessage: "I think this one suits you.",

  // Polaroids in the Memory Room
  memories: [
    {
      title: "The First Meet",
      image: "/assets/CFD.jpeg",
      text: "CFD Udayana Lombok. The very first time our paths crossed under the clear morning sky. A simple Sunday walk that quietly changed everything."
    },
    {
      title: "The First Dinner",
      image: "/assets/BONO.jpeg",
      text: "Bono Dimsum Mataram. Our first dinner together — warm dimsum, chili oil, and conversations that made time completely disappear."
    },
    {
      title: "we going gym together",
      image: "/assets/gym.jpeg",
      text: "Better and stronger together. Pushing through workouts side by side, making every heavy rep feel so much lighter."
    },
    {
      title: "what we drink after gym",
      image: "/assets/jus.jpeg",
      text: "Tempat Beli Jus — chilled fresh juice right after gym. The sweetest, most refreshing way to wrap up our time together."
    }
  ],

  // Personal letter revealed in the secret envelope
  personalMessage: `I wanted to build something quiet for you. Not a loud greeting, not a template, but a small world where you can pause whenever things get noisy.

When October arrived, I found myself thinking about all the small things — the effortless conversations, the way you notice details most people miss, and how easily your presence brings warmth into any space.

I don't know where all our stories will lead, but I know that meeting you is one of the brightest parts of my year.

Thank you for being you. Happy October 1st.`
};

// Expose to window for browser access
if (typeof window !== "undefined") {
  window.CONFIG = CONFIG;
}

// Export for module bundlers if needed
if (typeof module !== "undefined" && module.exports) {
  module.exports = CONFIG;
}
