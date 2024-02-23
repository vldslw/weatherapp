// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@nuxtjs/google-fonts',
    {
      families: {
        Roboto: [400, 700],
      },
    },
  ]],
  css: ['~/assets/css/global.scss']
});
