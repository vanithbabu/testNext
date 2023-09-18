/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      chicle: ["Chicle", "cursive"],
      FuturaPTMedium:['Futura PT Medium', "sans-serif"],
      FuturaPTBook: ['Futura PT Book', "sans-serif"],
      FuturaPTLight: ['Futura PT Light', "sans-serif"],
      FuturaPTBold: ['Futura PT Bold', "sans-serif"],
      FuturaPTDemi: ['Futura PT Demi', "sans-serif"],
    },
    extend: {
      boxShadow: {
        'xl': '0 0 0 1px #0C0300',
      },
      width: {
        '60': '60%',
        '40': '40%',
      },

      colors: {
        'blue': '#00b1d8',
        'white':'#fff',
        'yellow':'#f29f05',
        'light-yellow':'#eeb51d',
        'orange':'#ee7723',
        'light-blue':'#F6FBFE',
        'dark-blue':'#0085C4',
        'green':'#589C08',
        'deep-blue':'#048ABF',
        'red':"#FF0000"
      },
    },
  },
  plugins: [
  
    // ...
  ],
}

