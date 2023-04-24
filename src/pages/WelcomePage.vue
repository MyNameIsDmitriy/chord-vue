<template>
  <div class="wrapper">
    <div class="welcome-page">
      <h2>Welcome</h2>
      <p class="description">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla lectus
        orci, cursus quis tincidunt quis, porttitor sagittis tortor. Sed et
        pellentesque lectus. Sed malesuada elit augue, in interdum lectus
        euismod sit amet. Donec quis lectus tristique, hendrerit ligula vel,
        auctor lacus. Vestibulum quis egestas turpis, ultrices aliquam elit.
        Donec urna justo, tempor vel fermentum nec, congue facilisis sapien.
        Vivamus feugiat metus at lectus consequat, eget laoreet urna dignissim.
        Aenean sagittis viverra nunc, nec consequat purus pharetra quis. Proin
        sit amet tellus dolor. Nunc nec odio augue.
      </p>
      <div class="buttons">
        <p class="button button-shimmer">
          <router-link to="/library" class="router-link"
            >Go to library</router-link
          >
        </p>
        <p class="button button-shimmer">
          <router-link to="/game" class="router-link">Play a game</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "WelcomePage",
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.wrapper {
  width: 980px;
  height: inherit;
  margin: 0 auto;
}

.welcome-page {
  display: flex;
  flex-direction: column;
  justify-content: center;

  height: inherit;
  padding-bottom: 100px;

  h2 {
    font-size: 54px;
    margin-bottom: 15px;
  }

  .description {
    font-size: 18px;
  }
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 10em;

  margin-top: 20px;

  font-size: 24px;
}

.button {
  padding: 5px;
  border-radius: 8px;
  align-items: center;
  align-content: center;

  border: 2px solid black;

  cursor: pointer;

  .router-link {
    color: black;
  }
  .router-link:active {
    color: white;
  }
}

.button:hover {
  border: 2px solid white;

  .router-link {
    color: white;
  }
}

@keyframes shimmer {
  0% {
    background-position-x: 150%;
  }

  50%,
  100% {
    background-position-x: -150%;
  }
}

.button-shimmer {
  background-image: linear-gradient(
    -60deg,
    transparent,
    transparent 40%,
    #ffffff44,
    #ffffff44 60%,
    transparent 60%,
    transparent 100%
  );
  background-size: 200% 100%;
  background-repeat: no-repeat;
  background-position-x: 150%;
}

.button-shimmer:hover {
  // background-position-x: -150%;
  // transition: background-position-x 600ms;

  animation-duration: 1.6s;
  animation-name: shimmer;
  animation-iteration-count: infinite;
  animation-direction: alternate;
}
</style>
