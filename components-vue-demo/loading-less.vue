<template>
<div class="loading">
  <div class="spinner">
    <div class="dot"></div>
    <div class="dot"></div>
    <div class="dot"></div>
  </div>
</div>

</template>

<script>
export default {};
</script>
<style lang="less">
.loading {
     position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 10;
      background: rgba(255, 255, 255, 0.8);
    .spinner{
      position: absolute;
      top: 50%;
      left: 40%;
        .dot {
        width: 24px;
        height: 24px;
        background: #3ac;
        border-radius: 100%;
        display: inline-block;
        margin-right: 20px;
        animation: slide 1s infinite ease-in-out;
      }
      .dot:nth-child(1) {
        animation-delay: 0.1s;
        background: #32aacc;
      }
      .dot:nth-child(2) {
        animation-delay: 0.4s;
        background: #64aacc;
      }
      .dot:nth-child(3) {
        animation-delay: 0.6s;
        background: #96aacc;
      }
    }
   
}

@-webkit-keyframes slide{
  0%,
  100% {
     -webkit-transform:(scale(1));
  }

  50% {
      opacity: 0.3;
      -webkit-transform:(scale(2));
  }
}
@keyframes slide{
  0%,
  100% {
      transform: scale(1);
      -webkit-transform:(scale(1));
  }

  50% {
      opacity: 0.3;
      transform: scale(2);
      -webkit-transform:(scale(2));
  }
}

</style>
