<template>
  <div class="buttons">
    <div class="note button">
      <img src="../assets/svg_icons/music_note.svg" alt="note-img" />
      <p>Guess a note</p>
    </div>
    <div class="major-minor button">
      <img
        src="../assets/svg_icons/music_major_minor.png"
        alt="major-minor-img"
      />
      <p>Major/Minor</p>
    </div>
    <div class="intervals button">
      <img src="../assets/svg_icons/music_intervals.svg" alt="intervals-img" />
      <p>Intervals</p>
    </div>
    <div class="chords button">
      <img src="../assets/svg_icons/music_chord.svg" alt="chord-img" />
      <p>Guess a chord</p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: center;

  margin: 0 auto;
  max-width: 1200px;
  height: 100vh;

  .button {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    max-width: 170px;

    cursor: pointer;

    p {
      font-size: 24px;
    }
  }

  .button:hover {
    color: white;
  }
}
</style>
