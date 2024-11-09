/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  darkMode: "class",
  theme: {
    extend: {
      
      colors: {
        brown: {
          100: "#ECE0D1",
          300: "#DBC1AC",
          600: "#967259",
          900: "#634832",
        },
        bg_log: "#242A38",
      },
      boxShadow: {
        norml: "0px 1px 10px 0px rgba(0, 0, 0, 0.05)",
      },
      spacing: {
        25: "6.25rem",
        30: "7.5rem",
        50: "12.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      fontFamily: {
        "iran-S": "IRANSansWeb",
        "iranS-Med": "IRANSansWeb_Medium",
        "iranS-B": "IRANSansWeb_Bold",
        "iran-black": "IRANSansWeb_Black",
        "iran-light": "IRANSansWeb_Light",
      },
      letterSpacing: {
        tightest: "-0.065em",
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          lg: "0.625 rem",
        },
      },
      backgroundImage: {
        'soldierback':"url('../Style/img/soldier.png')",
        'bgbody':"url('../style/img/bg.jpg')",
        'bgover':"url('../style/img/bgover.jpg')",
        'bgsliper':"url('../style/img/bgslider.jpg')",

      },
    },
    screens: {
      xs: "375px",
      sm: "500px",
      md: "760px",
      lg: "970px",
      xl: "1280px",
    },
  },
  plugins: [
    function ({ addVariant }) {
      addVariant("child", "&>*");
      addVariant("child-hover", "&>*:hover");
    },
    // require("tailwind-scrollbar"),
  ],
};
