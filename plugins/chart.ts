import { Chart, registerables } from "chart.js";

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("app:beforeMount", () => {
    Chart.register(...registerables);
  });
});
