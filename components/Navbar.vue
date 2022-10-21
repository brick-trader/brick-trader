<template>
  <nav>
    <div>
      <NuxtLink to="/editor">Editor</NuxtLink>
    </div>
    <div>
      <NuxtLink to="/dashboard">Dashboard</NuxtLink>
    </div>
  </nav>
</template>

<style scoped>
nav {
  display: flex;
  align-items: center;
  height: 2rem;
  background: #ff9f1c;
}

nav > div {
  width: 10rem;
  height: 100%;
  padding-left: 2rem;
  padding-right: 2rem;
  background: #ff9f1c;

  font-size: 1.25rem;
  font-weight: bold;
}

nav > div > a {
  color: #5700ad;
  text-decoration: none;
}
</style>
