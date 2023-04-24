<template>
  <RouterView />
</template>

<script>
export default {
  name: "App",
};
</script>

<style lang="scss">
@import url(@/assets/reset-styles.scss);

#app {
  font-family: "Oswald", sans-serif;
  // TODO
  // font-family: "Mulish", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  height: 100vh;
  background: rgb(1, 114, 175);
  background: linear-gradient(
    70deg,
    rgba(1, 114, 175, 1) 20%,
    rgba(1, 254, 189, 1) 80%
  );

  // TODO deside between colors
  // background: linear-gradient(
  //   90deg,
  //   rgba(1, 114, 175, 1) 26%,
  //   rgba(116, 254, 189, 1) 70%
  // );
}
</style>
