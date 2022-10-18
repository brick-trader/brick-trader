<template>
  <canvas ref="chartCanvas"></canvas>
</template>

<script setup lang="ts">
import { Chart } from "chart.js";

const chartCanvas = ref<HTMLCanvasElement>(null);
const props = defineProps<{
  data: any;
}>();
const chart = ref(null);

onMounted(() => {
  chart.value = new Chart(chartCanvas.value, {
    type: "line",
    data: props.data,
    options: {
      elements: {
        point: {
          radius: 0,
        },
      },
    },
  });
});

watch(
  () => props.data,
  () => {
    chart.value.destroy();
    chart.value = new Chart(chartCanvas.value, {
      type: "line",
      data: props.data,
      options: {
        elements: {
          point: {
            radius: 0,
          },
        },
      },
    });
  },
);
</script>
