<template>
  <div class="loader-wrapper">
    <div class="loader">
      <div class="a"></div>
      <div class="b"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "app-loading"
};
</script>

<style scoped>
.loader-wrapper {
  animation: fadeIn 1s ease-in;
  -webkit-animation: fadeIn 1s ease-in;
  animation-fill-mode: forwards;
  opacity: 0;
}
.loader {
  position: absolute;
  width: 40px;
  height: 80px;
  margin: auto;
  animation: rotate 10s linear infinite;
  -webkit-animation: rotate 10s linear infinite;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}

.a,
.b {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  position: absolute;
}

.a:after,
.b:after {
  display: block;
  content: "";
  transform: scale(0.5);
  width: 40px;
  height: 40px;
  border-radius: 100%;
}

.a {
  -webkit-animation: move 2s ease-in-out infinite alternate,
    zIndex 4s ease-in-out infinite;
}

.b {
  -webkit-animation: move 2s ease-in-out infinite alternate-reverse,
    zIndex 4s ease-in-out infinite reverse;
}

.a:after {
  background: #2845ae;
  -webkit-animation: zoom 2s ease-in-out infinite alternate;
  -webkit-animation-delay: -1s;
}

.b:after {
  background: #5493f7;
  -webkit-animation: zoom 2s ease-in-out infinite alternate-reverse;
  -webkit-animation-delay: -1s;
}
@-webkit-keyframes move {
  100% {
    transform: translateY(40px);
  }
}
@-webkit-keyframes zoom {
  0% {
    opacity: 0.2;
  }
  50% {
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
@-webkit-keyframes zIndex {
  25% {
    z-index: 1;
  }
  75% {
    z-index: -1;
  }
}
@-webkit-keyframes rotate {
  to {
    transform: rotateZ(360deg);
  }
}
@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
