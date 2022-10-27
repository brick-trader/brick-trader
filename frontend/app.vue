<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
@import url("https://fonts.googleapis.com/css2?family=Quantico&family=Silkscreen&display=swap");

*,
*::before,
*::after {
  font-family: "Quantico", monospace;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body::-webkit-scrollbar {
  width: 0.5em;
}

body::-webkit-scrollbar-track {
  background: #eee;
}

body::-webkit-scrollbar-thumb {
  background: #ccc;
}

body::-webkit-scrollbar-thumb:hover {
  background: #5700ad;
}

body {
  width: 100vw;
  height: 100vh;
  overflow-x: hidden;
}

.blocklyTreeLabel {
  font-family: "Quantico", monospace;
}
</style>
