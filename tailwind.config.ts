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
      colors: { 
        customBeige: 'rgba(156, 132, 73, 0.9)',
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
    screens: { 'custom-md': '780px', "custom-nmd":"485px" },
  }, 
  darkMode: "class",
  plugins: [nextui()],
} satisfies Config;
