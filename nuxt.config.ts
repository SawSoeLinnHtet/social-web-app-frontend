export default defineNuxtConfig({
  css: [
    '~/assets/css/tailwind.css',
    'vue-toastification/dist/index.css'
  ],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
      autoprefixer: {},
    },
  },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  runtimeConfig: {
    public: {
      apiURL: process.env.API_URL,
      apiURLUnSlashed: process.env.API_URL_UNSLASHED,
    },
  },
  modules: [
    '@pinia/nuxt'
  ]
})
