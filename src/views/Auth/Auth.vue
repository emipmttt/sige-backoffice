<template>
  <div
    class="page"
    :style="`
      background:url(${require('@/assets/images/background.svg')}); 
      background-size: 100%;
      background-position: bottom;
    `"
  >
    <div class="page__form">
      <h1 class="white--text">SIGE</h1>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-around;

  &__form {
    width: 40%;
  }
}
</style>