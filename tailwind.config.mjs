/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}"],
  theme: {
    extend: {
      lineClamp: {
        8: "8",
        10: "10",
      },
    },
  },
  plugins: [],
};
