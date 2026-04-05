import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14141c",
        slate: "#6f7482",
        paper: "#f6f2ea",
        ember: "#ff6a3d",
        gold: "#e4b363",
        forest: "#234034",
        mist: "#eef1eb"
      },
      boxShadow: {
        panel: "0 18px 48px rgba(20, 20, 28, 0.12)"
      },
      fontFamily: {
        display: ["Georgia", "serif"],
        body: ["'Avenir Next'", "ui-sans-serif", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
} satisfies Config;
