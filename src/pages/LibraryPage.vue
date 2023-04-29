<template>
  <div class="controls">
    <label for="start-note">Start note: </label>
    <select v-model="startNoteValue" name="start-note" id="start-note">
      <option v-for="note in startNotes" :key="note">{{ note }}</option>
    </select>
    <label for="octave">Octave: </label>
    <select v-model="startOctaveValue" name="octave" id="octave">
      <option v-for="octave in octaves" :key="octave">{{ octave }}</option>
    </select>
  </div>

  <div class="chord-notes">
    <p class="notes">{{ notesValue }}</p>
    <p class="inervals">{{ intervalsValue }}</p>
  </div>

  <div class="buttons">
    <button
      @click="getButtonName($event)"
      v-for="chord in chordNames"
      :key="chord"
    >
      {{ chord.aliases[0] }}
    </button>
  </div>
</template>

<script>
import { ChordType, Chord } from "tonal";

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
      octaves: ["1", "2", "3", "4", "5", "6", "7"],
      chordNames: ChordType.all(),
      startNoteValue: "C",
      startOctaveValue: "1",
      intervalsValue: "",
      notesValue: "",
      finalStartValues: "",
    };
  },

  methods: {
    // TODO change name
    getButtonName(event) {
      // console.log(Chord.get(event.target.innerText));
      this.intervalsInChord = Chord.get(event.target.innerText).intervals;
      this.intervalsValue = this.intervalsInChord.join(" - ");

      this.finalStartValues = this.startNoteValue + this.startOctaveValue;

      this.notesValue = this.intervalsInChord
        .map((int) => {
          return Chord.transpose(this.finalStartValues, int);
        })
        .join(" - ");
    },
  },
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
    min-width: 180px;
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
