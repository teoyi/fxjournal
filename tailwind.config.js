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
        'hero-lg': '25rem',
        'hero-md': '15rem',
        'hero-sm': '10rem'
      },
      height: {
        'menu-slide': 'calc(100vh - 48px)',
        'pairs-side': 'calc(100vh - 88px)',
      },
      lineHeight: {
        'hero-lh': '28rem',
      },
      spacing: {
        '88': '88px',
      },
      margin: {
        '17r': '17rem',
      }
    },
  },
  plugins: [],
}
