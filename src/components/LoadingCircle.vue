<template>
  <div
    class="load-container d-flex flex-row justify-content-center align-items-center"
  >
    <div class="icon-container">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="load-icon bi bi-arrow-clockwise"
        viewBox="0 0 16 16"
      >
        <path
          fill-rule="evenodd"
          d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
        />
        <path
          d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped>
.load {
  display: block;
}
.load-container {
  min-width: 1.5em;
  position: relative;
}
.icon-container {
  position: relative;
  width: 1.2em;
  height: 1.2em;
}
.load-icon {
  position: absolute;
  animation-name: rotate;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes rotate {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>
