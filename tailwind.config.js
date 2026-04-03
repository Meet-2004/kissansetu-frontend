// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],

//   theme: {
//     extend: {
     
//     },
//   },
  
//    corePlugins: {
//     preflight: false,
//   },

//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    extend: {
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        float: "float 3s ease-in-out infinite",
      },
    },
  },

  corePlugins: {
    preflight: false,
  },

  plugins: [],
};