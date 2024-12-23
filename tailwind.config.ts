import {nextui} from '@nextui-org/theme';
import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/components/(button|ripple|spinner).js",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: () => ({ 'eclipse': "url('../assets/Eclipse.jpeg')", }),
      colors: { 
        customBeige: 'rgba(156, 132, 73, 0.9)',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    fontFamily: { sans: ['Helvetica', 'Arial', 'sans-serif'], newMono:["Syne Mono", "serif"],new:["Lilita One","serif"],
      newLuck:["Luckiest Guy","serif"], newGab:["Gabarito","serif"], 
    cursive: ['"Brush Script MT"', 'cursive'], },
    screens: { 'custom-md': '780px', "custom-nmd":"485px",'custom-lg': '1050px', 'sm': '576px',},
  }, 
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
