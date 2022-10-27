<template>
  <div class="animation">
    <span :style="styles" class="spinner spinner--rotate-square4">
      <span class="loader-inner"></span>
    </span>
  </div>
</template>

<script setup lang="ts">
const size = "250px";
const color = "#9B52E4";

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
  width: auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.spinner {
  position: relative;
  animation: loader 2s infinite ease;
  background-color: #ff9f1c;
  z-index: 9999;
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
