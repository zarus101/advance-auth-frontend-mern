module.exports = {
  content: ["./src/**/**.{js,jsx,ts,tsx}"],

  theme: {
    extend: {
      colors: {
     
      },
      backgroundImage: {
        'loginImg': 'url("./assests/login/bg1.png")',
      },
      

      screens: {
        "2xl": { max: "1535px" },
        xl: { max: "1279px" },
        lg: { max: "1023px" },
        md: { max: "800px" },
        mobile: { max: "512px" },
      },
      boxShadow: {
      },
    },
  },
  variants: {},
  plugins: [],
};
