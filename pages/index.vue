<script setup lang="ts">
import gsap from "gsap";
import { Power2, Power3, Expo, Circ } from "gsap";

onMounted(() => {});
</script>

<template>
  <div id="container">
    <div id="laptop-img"></div>

    <div id="left-panel">
      <div id="title">© Block Trader</div>

      <div id="subtitle">
        <p>Build your own trading</p>
        <p>
          strategy with
          <span id="blocks-text">BLOCKS</span>
        </p>
      </div>

      <div id="description">
        <p>A web-based trading strategy builder</p>
        <p>that allows you to build your own trading strategy with blocks,</p>
        <p>and we also provides a backtesting tool to test your strategy.</p>
      </div>

      <div id="buttons">
        <div id="start-btn">
          <a href="/editor">Get Started</a>
        </div>
        <div id="github-btn">
          <a
            href="https://github.com/brick-trader/brick-trader-frontend"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
            >
              <path
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
              />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#container {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(45deg, #a86fe0, #5700ad);
}

#laptop-img {
  position: absolute;
  top: 40%;
  left: 87%;
  width: 75%;
  height: 75%;
  transform: translate(-50%, -50%);
  background-image: url("../assets/brick-trader-laptop.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
}

#left-panel {
  position: absolute;
  top: 0;
  left: 0;
  width: 75%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-left: 10em;
}

#title {
  font-size: 2rem;
  color: #111;
  font-weight: bold;
  text-align: center;
  font-family: "Silkscreen";
  text-shadow: 0 0 2px #fff;
}

#subtitle {
  font-size: 4rem;
  color: #fff;
  font-weight: 400;
  text-align: center;
  margin-top: 1rem;
  text-align: left;
  font-weight: bold;
  letter-spacing: 1.5px;
}

#blocks-text {
  font-weight: bold;
  color: #ff9f1c;
}

#description {
  font-size: 1.5rem;
  color: #ddd;
  font-weight: 400;
  text-align: center;
  margin-top: 1rem;
  text-align: left;
  letter-spacing: 1.5px;
  margin-top: 2rem;
}

#buttons {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
}

#start-btn {
  width: 10rem;
  height: 3rem;
  background: #ff9f1c;
  border-radius: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s ease;
}

#start-btn:hover {
  background: #ff9f1c;
  transform: scale(1.05);
}

#start-btn a {
  font-size: 1.25rem;
  font-weight: bold;
  color: #5700ad;
  text-decoration: none;
}

#github-btn {
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: transform 0.3s ease;
  margin-top: 0.5em;
  margin-left: 3rem;
  transform: scale(2);
}
</style>
