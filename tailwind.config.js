module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {        
        'hero-image': "url('../public/img/exchange-wallpaper.jpg')",      
      },
      fontFamily: {
        "zallord" : [ "Zallord" ],
        "goshbe" : [ "Goshbe" ]
      },
      fontSize: {
        'hero-lg': '30rem',
        'hero-md': '15rem',
        'hero-sm': '10rem'
      }
    },
  },
  plugins: [],
}
