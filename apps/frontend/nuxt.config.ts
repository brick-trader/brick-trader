// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: ["@pinia/nuxt"],
  build: {
    transpile: ["chart.js"],
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: "",
    },
  },
  nitro: {
    devProxy: {
      "/api": {
        target: "http://localhost:3000",
        changeOrigin: true,
      },
    },
  },
});
