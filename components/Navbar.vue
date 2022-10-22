<script setup lang="ts">
import { useStrategy } from "~~/stores/strategy";

const route = useRoute();
const path = computed(() => route.path);
const isStrategyVaild = computed(() => useStrategy().isStrategyVaild());
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
    <div
      v-if="path != '/dashboard'"
      :class="{
        button: true,
        'button-enable': isStrategyVaild,
      }"
    >
      <NuxtLink to="/dashboard" :class="{ 'disable-link': !isStrategyVaild }">
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
  background: linear-gradient(45deg, #cea4f8, #7723ca, #5500aa);
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
  font-weight: bold;
  background: #c9c9c9;
}

.button-enable {
  cursor: pointer;
  background: #ff9f1c;
}

nav > div > a {
  color: #5700ad;
  text-decoration: none;
}

.disable-link {
  color: #888;
  pointer-events: none;
}
</style>
