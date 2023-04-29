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

html {
  min-height: 100%;

  background: linear-gradient(
    90deg,
    rgba(1, 114, 175, 1) 20%,
    rgba(1, 230, 160, 1) 80%
  );

  // TODO deside between colors
  // background: linear-gradient(
  //   90deg,
  //   rgba(1, 114, 175, 1) 26%,
  //   rgba(116, 254, 189, 1) 70%
  // );
}

#app {
  font-family: "Oswald", sans-serif;
  // TODO
  // font-family: "Mulish", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;

  height: 100vh;
}

// ------Scrollbar style------
/* Works on Firefox */
* {
  scrollbar-width: thin;
  scrollbar-color: white black;
}
/* Works on Chrome, Edge, and Safari */
*::-webkit-scrollbar {
  width: 12px;
}
*::-webkit-scrollbar-track {
  background: black;
}
*::-webkit-scrollbar-thumb {
  background-color: white;
  border-radius: 20px;
  border: 3px solid black;
}
// ------Scrollbar style------ ends
</style>
