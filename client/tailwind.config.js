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
        brandRed: "#DE5656",
        brandGreen: "#52E081",
        brandBrown: "#DDAE86",

        // Provide aliases so existing class names like bg-green or text-red still work
        green: {
          DEFAULT: "#52E081",
        },
        red: {
          DEFAULT: "#DE5656",
        },
        yellow: {
          DEFAULT: "#FACC15", 
        },
        brown: {
          DEFAULT: "#DDAE86",
        },
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
      animation: {
        "fade-in-up": "fadeInUp 0.7s ease-out forwards",
        "bounce-slow": "bounce 2s infinite",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
