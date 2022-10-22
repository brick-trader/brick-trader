<template>
  <div class="animation">
    <span :style="styles" class="spinner spinner--rotate-square4">
      <span class="loader-inner"></span>
    </span>
  </div>
</template>

<script setup lang="ts">
const size = "250px";
const color = "#41b883";

const styles = computed(() => {
  return {
    width: size,
    height: size,
    "--bg-color": color,
  };
});
</script>

<style scoped>
.animation {
  background-color: transparent;
  width: auto;
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  position: relative;
  border: 4px solid var(--bg-color);
  animation: loader 2s infinite ease;
}
.spinner * {
  line-height: 0;
  box-sizing: border-box;
}
.loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: var(--bg-color);
  animation: loader-inner 2s infinite ease-in;
}
@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  25% {
    transform: rotate(180deg);
  }
  50% {
    transform: rotate(180deg);
  }
  75% {
    transform: rotate(360deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes loader-inner {
  0% {
    height: 0%;
  }
  25% {
    height: 0%;
  }
  50% {
    height: 100%;
  }
  75% {
    height: 100%;
  }
  100% {
    height: 0%;
  }
}
</style>
