<script setup lang="ts">
defineProps<{ title: string }>();
</script>

<template>
  <div class="card">
    <h2 v-if="title">{{ title }}</h2>
    <slot />
  </div>
</template>

<style scoped>
.card {
  width: fit-content;
  height: fit-content;
  display: flex;
  flex-direction: column;
  padding: 1rem;
  border-radius: 0.5rem;
  background-color: #fff;
  box-shadow: 0 0 0.5rem rgba(0, 0, 0, 0.1);
}

.card > h2 {
  width: fit-content;
  margin: 0;
}
</style>
