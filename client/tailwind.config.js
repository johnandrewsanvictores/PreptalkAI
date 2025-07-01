// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bgColor: "#F3F7FB",
        bgColor2: "#E4ECF4",
        headingText: "#1A2A42",
        subHeadingText: "#4F5D75",
        primary: "#2F80ED",
        red: "#DE5656",
        green: "#52E081",
        brown: "#DDAE86",
      },
      fontSize: {
        h1: "3.815rem",
        h2: "3.052rem",
        h3: "2.441rem",
        h4: "1.953rem",
        h5: "1.563rem",
        h6: "1.25rem",
        p: "1rem",
        small: "0.8rem",
      },
      fontFamily: {
        nunito: ['"Nunito"', "sans-serif"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
