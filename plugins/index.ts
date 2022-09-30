export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", async () => {
    await import("./blockly/custom-rsi");
    await import("./blockly/rsi");
    await import("./theme/custom-renderer");
  });
});
