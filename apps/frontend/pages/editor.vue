<script setup lang="ts">
import Editor from "~/components/editor/Editor.vue";

definePageMeta({
  pageTransition: {
    mode: "default",
  },
});

const editor = ref<InstanceType<typeof Editor> | null>(null);
</script>

<template>
  <div>
    <ClientOnly>
      <Editor ref="editor" />
    </ClientOnly>
  </div>
</template>
