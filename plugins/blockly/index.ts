export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", async () => {
    await import("./custom-rsi");
    await import("./rsi");
  });
});
