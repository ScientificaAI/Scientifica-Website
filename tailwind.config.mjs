/** @type {import('tailwindcss').Config} */
import animations from "@midudev/tailwind-animations";
import plugin from "tailwindcss/plugin";

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      lineClamp: {
        8: "8",
        10: "10",
      },
      animation: {
        fade: "fadeInUp 1s both",
      },

      keyframes: {
        fadeInUp: {
          "0%": { opacity: 0, transform: "translateY(2rem)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [
    animations,
    plugin(({ addVariant }) => {
      addVariant("intersect", "&:not([no-intersect])");
    }),
  ],
};
