export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", async () => {
    await Promise.all([
      import("./custom-rsi"),
      import("./rsi"),
      import("./ema"),
      import("./apo"),
      import("./sma"),
      import("./macd"),
      import("./psar"),
      import("./theme/custom-renderer"),
    ]);
  });
});
