// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      apiSecret: process.env.NUXT_API_SECRET,
    },
  },
  devtools: { enabled: true },
  modules: [
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Roboto: [400, 700],
        },
      },
    ],
  ],
  css: ['~/assets/css/global.scss'],
});
