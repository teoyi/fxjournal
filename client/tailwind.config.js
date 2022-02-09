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
        'auth-sect': 'calc(100vh - 100px)',
      },
      lineHeight: {
        'hero-lh': '28rem',
      },
      spacing: {
        '88': '88px',
        '25p': '25px',
        '10p': '10px',
        '35p': '35px',
        '100p': '100px',
      },
      margin: {
        '17r': '17rem',
      },
      zIndex: {
        'n1' : '-1',
      },
      colors: {
        'banana': '#F9D342',
        'backdrop': '#292826',
        'hr-line': '#515151',
      }
    },
  },
  plugins: [],
}
