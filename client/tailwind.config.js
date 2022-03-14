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
        "zallord": ["Zallord"],
        "goshbe": ["Goshbe"]
      },
      fontSize: {
        'hero-xl': '25rem',
        'hero-lg': '20rem',
        'hero-md': '15rem',
        'hero-sm': '10rem',
        'auth-lg': '14rem',
        'auth-xl': '20rem',
        'dash-3': '3.25rem',
      },
      height: {
        'menu-slide': 'calc(100vh - 48px)',
        'pairs-side': 'calc(100vh - 88px)',
        'auth-sect': 'calc(100vh - 100px)',
        'hero-home': 'calc(100vh - 68px)',
        'dash-height': 'calc(100vh - 64px)',
        'journal-percent': 'calc(100% - 28px)',
      },
      lineHeight: {
        'hero-lh': '28rem',
        'auth-lg': '16rem',
        'auth-xl': '20rem',
      },
      spacing: {
        '88': '88px',
        '25p': '25px',
        '10p': '10px',
        '35p': '35px',
        '100p': '100px',
        '20p': '20px',
      },
      margin: {
        '17r': '17rem',
        '6r': '6rem',
        '14r': '14rem',
        '100p': '100px',
      },
      zIndex: {
        'n1': '-1',
      },
      colors: {
        'banana': '#FFD369',
        'backdrop': '#292826',
        'hr-line': '#515151',
        'black0C': '#0B0B0C',
        'black12': '#121212',
        'black10': '#0E0E10',
        'greyDC': '#CFD8DC',
        'black31': '#222831',
        'black46': '#393E46',
        'eee': '#EEEEEE',
        // 'black27': '#302d27',
        'black27': '#111111',
        'yellow39': '#ffc839',
      }
    },
  },
  plugins: [],
}
