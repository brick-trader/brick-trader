<script setup lang="ts">
import { Chart } from "chart.js";

const options = {
  elements: {
    point: {
      radius: 0,
    },
  },
};
const chartCanvas = ref<HTMLCanvasElement | null>(null);
const props = defineProps<{
  data: any;
}>();
const chart = ref(null);

onMounted(() => {
  chart.value = new Chart(chartCanvas.value, {
    type: "line",
    data: props.data,
    options,
  });
});

watch(
  () => props.data,
  () => {
    chart.value.destroy();
    chart.value = new Chart(chartCanvas.value, {
      type: "line",
      data: props.data,
      options,
    });
  },
);
</script>

<template>
  <div class="chart-container">
    <canvas ref="chartCanvas"></canvas>
  </div>
</template>

<style scoped>
.chart-container {
  position: relative;
  width: 90vw;
}
</style>
