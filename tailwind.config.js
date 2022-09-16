/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{vue,js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {}
  },
  plugins: [
    function ({ addBase }) {
      addBase({
        ".el-button": {
          "background-color": "var(--el-button-bg-color,val(--el-color-white))"
        }
      })
    }
  ]
}
