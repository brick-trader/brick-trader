<template>
  <div class="cube-wrapper">
    <div class="cube">
      <div class="cube-face cube-face-front"></div>
      <div class="cube-face cube-face-back"></div>
      <div class="cube-face cube-face-left"></div>
      <div class="cube-face cube-face-right"></div>
      <div class="cube-face cube-face-top"></div>
      <div class="cube-face cube-face-bottom"></div>
    </div>
  </div>
</template>

<style scoped>
.cube-wrapper {
  perspective: 1000px;
}

.cube {
  width: 300px;
  height: 300px;
  position: relative;
  margin: 0 auto;
  margin-top: 150px;
  transform-style: preserve-3d;
  transform-origin: center center -200px;
  animation: around 30s linear infinite;
}

.cube-face {
  width: 100%;
  height: 100%;
  background-color: #fff;
  box-shadow: inset 0px 0px 100px 0px #333;
  position: absolute;
  transform-origin: center;
  text-align: center;
  line-height: 3;
}

.cube-face-back {
  transform: translateZ(-300px);
}

.cube-face-left {
  transform: rotateY(-90deg) translateX(-150px) translateZ(150px);
}

.cube-face-right {
  transform: rotateY(90deg) translateX(150px) translateZ(150px);
}

.cube-face-top {
  transform: rotateX(-90deg) translateY(150px) translateZ(150px);
}

.cube-face-bottom {
  transform: rotateX(90deg) translateY(-150px) translateZ(150px);
}

@keyframes around {
  from {
    transform: rotateX(360deg) rotateY(360deg);
  }
}
</style>
