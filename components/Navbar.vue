<script setup lang="ts">
const route = useRoute();
const path = computed(() => route.path);
</script>

<template>
  <nav>
    <div>
      <NuxtLink to="/">
        <div id="title">© Brick Trader</div>
      </NuxtLink>
    </div>
    <div v-if="path != '/editor'" class="button">
      <NuxtLink to="/editor">
        <pre>▶   Continue Editing Strategy</pre>
      </NuxtLink>
    </div>
    <div v-if="path != '/dashboard'" class="button">
      <NuxtLink to="/dashboard">
        <pre>See Backtest Result   ▶</pre>
      </NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4rem;
  background: #ff9f1c;
}

nav > div {
  margin: 0 2em;
}

#title {
  font-size: calc(0.75vw + 0.6em);
  color: #111;
  font-weight: bold;
  text-align: center;
  font-family: "Silkscreen";
  text-shadow: 0 0 2px #fff;
}

.button {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.5em 1em;
  border-radius: 5px;
  background: #5700ad;
  font-weight: bold;
}

nav > div > a {
  color: #ffc779;
  text-decoration: none;
}
</style>
