/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./app/**/*.{js,ts,jsx,tsx}",
      "./components/**/*.{js,ts,jsx,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
        colors: {
            primary: "#161622",
            secondary: {
                DEFAULT: "#FF9C01",
                100: "#FF9001",
                200: "#FF8E01",
            },
            black: {
                DEFAULT: "#000",
                100: "#1E1E2D",
                200: "#232533",
            },
            gray: {
                100: "#CDCDE0",
            },
        },
        fontFamily: {
            poppthin: ["Poppins-Thin", "sans-serif"],
            poppextralight: ["Poppins-ExtraLight", "sans-serif"],
            popplight: ["Poppins-Light", "sans-serif"],
            poppregular: ["Poppins-Regular", "sans-serif"],
            poppmedium: ["Poppins-Medium", "sans-serif"],
            poppsemibold: ["Poppins-SemiBold", "sans-serif"],
            poppbold: ["Poppins-Bold", "sans-serif"],
            poppextrabold: ["Poppins-ExtraBold", "sans-serif"],
            poppblack: ["Poppins-Black", "sans-serif"],
        },
    },
  },
  plugins: [],
}
