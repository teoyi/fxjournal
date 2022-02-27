module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {        
        'hero-image': "url('../public/img/exchange-wallpaper.jpg')",   
        'bw1-image': "url('../public/img/b&w1.jpg')",
        'bw2-image': "url('../public/img/b&w2.jpg')",   
        'bw3-image': "url('../public/img/b&w3.jpg')",   
        'bw4-image': "url('../public/img/b&w4.jpg')",   
      },
      fontFamily: {
        "zallord" : [ "Zallord" ],
        "goshbe" : [ "Goshbe" ]
      },
      fontSize: {
        'hero-xl': '25rem',
        'hero-lg': '20rem',
        'hero-md': '15rem',
        'hero-sm': '10rem',
        'auth-lg': '19rem',
        'dash-3': '3.25rem',
      },
      height: {
        'menu-slide': 'calc(100vh - 48px)',
        'pairs-side': 'calc(100vh - 88px)',
        'auth-sect': 'calc(100vh - 100px)',
        'hero-home': 'calc(100vh - 68px)',
        'dash-height': 'calc(100vh - 64px)',
      },
      lineHeight: {
        'hero-lh': '28rem',
        'auth-lh': '20rem',
      },
      spacing: {
        '88': '88px',
        '25p': '25px',
        '10p': '10px',
        '35p': '35px',
        '100p': '100px',
        '20p' : '20px',
      },
      margin: {
        '17r': '17rem',
        '6r': '6rem',
        '14r': '14rem',
        '100p': '100px',
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
