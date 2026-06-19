/**
 * Tailwind v4 Note:
 * Design tokens (colors, breakpoints, fonts, shadows, radii) are defined in
 * src/app/globals.css via @theme — this is the Tailwind v4 CSS-first approach.
 *
 * This file is kept for reference / IDE support only. In v4, tailwind.config.ts
 * is NOT auto-loaded unless you add @config to your CSS. The @theme block in
 * globals.css is authoritative.
 *
 * White-label accent color: school.config.ts → brand.accentColor
 *   → layout.tsx injects --accent CSS var at runtime
 *   → globals.css @theme inline maps --color-terracotta → var(--accent)
 *   → all bg-terracotta / text-terracotta Tailwind classes update automatically
 */
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [],
};

export default config;
