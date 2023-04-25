<template>
  <div class="controls">
    <label for="start-note" @click="getNotes()">Start note: </label>
    <select name="start-note" id="start-note">
      <option v-for="note in startNotes" :key="note">{{ note }}</option>
    </select>
    <label for="octave">Octave: </label>
    <select name="octave" id="octave">
      <option v-for="octave in octaves" :key="octave">{{ octave }}</option>
    </select>
  </div>

  <div class="chord-notes">
    <p class="notes">abra - kadabra</p>
    <p class="inervals">biba - boba - biba</p>
  </div>

  <div class="buttons">
    <!-- TODO use v-for -->
    <button v-for="chord in chordNames" :key="chord">
      {{ chord.aliases[0] }}
    </button>
  </div>
</template>

<script>
// import { Note, Interval, Chord } from "tonal";
import { ChordType } from "tonal";

export default {
  name: "LibraryPage",

  data() {
    return {
      startNotes: [
        "C",
        "C#",
        "Db",
        "D",
        "D#",
        "Eb",
        "E",
        "F",
        "F#",
        "Gb",
        "G",
        "G#",
        "Ab",
        "A",
        "A#",
        "Bb",
        "B",
      ],
      octaves: [1, 2, 3, 4, 5, 6, 7],
      chordNames: ChordType.all(),

      // TODO delete
      // someNote: Note.name("A4"),
      // someInterval: Interval.get("5P"),
      // someChord: Chord.getChord("maj7"),
    };
  },

  methods: {},
};
</script>

<style scoped lang="scss">
.controls {
  display: flex;
  justify-content: center;
  font-size: 18px;

  select {
    margin: 0 8px;
  }
}

.chord-notes {
  display: flex;
  justify-content: center;
  flex-direction: column;

  font-size: 24px;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  width: 100%;

  button {
    flex-grow: 1;
    min-width: 200px;
    height: 50px;

    border-radius: 8px;
    border: 2px solid rgba(rgb(0, 0, 0), 0.5);

    background-color: rgba(255, 255, 255, 0.25);
    margin: 10px;

    font-size: 18px;
    cursor: pointer;
  }

  button:hover {
    border: 2px solid white;
    color: white;
  }
}
</style>
