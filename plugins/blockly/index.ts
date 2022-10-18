export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", async () => {
    await Promise.all([
      import("./blocks"),
      import("./theme/custom-renderer"),
      import("./theme/custom-theme"),
    ]);
  });
});
