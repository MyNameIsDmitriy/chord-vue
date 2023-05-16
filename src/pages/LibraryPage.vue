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
    <p class="notes">{{ chordValue }}</p>
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
import { ChordType, Chord, Note } from "tonal";
import { Howl } from "howler";
import {
  A1,
  Asharp1,
  B1,
  C1,
  Csharp1,
  D1,
  Dsharp1,
  E1,
  F1,
  Fsharp1,
  G1,
  Gsharp1,
  A2,
  Asharp2,
  B2,
  C2,
  Csharp2,
  D2,
  Dsharp2,
  E2,
  F2,
  Fsharp2,
  G2,
  Gsharp2,
  A3,
  Asharp3,
  B3,
  C3,
  Csharp3,
  D3,
  Dsharp3,
  E3,
  F3,
  Fsharp3,
  G3,
  Gsharp3,
  A4,
  Asharp4,
  B4,
  C4,
  Csharp4,
  D4,
  Dsharp4,
  E4,
  F4,
  Fsharp4,
  G4,
  Gsharp4,
  A5,
  Asharp5,
  B5,
  C5,
  Csharp5,
  D5,
  Dsharp5,
  E5,
  F5,
  Fsharp5,
  G5,
  Gsharp5,
  A6,
  Asharp6,
  B6,
  C6,
  Csharp6,
  D6,
  Dsharp6,
  E6,
  F6,
  Fsharp6,
  G6,
  Gsharp6,
  A7,
  Asharp7,
  B7,
  C7,
  Csharp7,
  D7,
  Dsharp7,
  E7,
  F7,
  Fsharp7,
  G7,
  Gsharp7,
} from "@/assets/index.js";

// const CircularJSON = require("circular-json");

// const sound = new Howl({
//   src: [A1],
//   volume: 0.2,
// });

const notes = [
  A1,
  Asharp1,
  B1,
  C1,
  Csharp1,
  D1,
  Dsharp1,
  E1,
  F1,
  Fsharp1,
  G1,
  Gsharp1,
  A2,
  Asharp2,
  B2,
  C2,
  Csharp2,
  D2,
  Dsharp2,
  E2,
  F2,
  Fsharp2,
  G2,
  Gsharp2,
  A3,
  Asharp3,
  B3,
  C3,
  Csharp3,
  D3,
  Dsharp3,
  E3,
  F3,
  Fsharp3,
  G3,
  Gsharp3,
  A4,
  Asharp4,
  B4,
  C4,
  Csharp4,
  D4,
  Dsharp4,
  E4,
  F4,
  Fsharp4,
  G4,
  Gsharp4,
  A5,
  Asharp5,
  B5,
  C5,
  Csharp5,
  D5,
  Dsharp5,
  E5,
  F5,
  Fsharp5,
  G5,
  Gsharp5,
  A6,
  Asharp6,
  B6,
  C6,
  Csharp6,
  D6,
  Dsharp6,
  E6,
  F6,
  Fsharp6,
  G6,
  Gsharp6,
  A7,
  Asharp7,
  B7,
  C7,
  Csharp7,
  D7,
  Dsharp7,
  E7,
  F7,
  Fsharp7,
  G7,
  Gsharp7,
];

let newGen = [];

notes.forEach((note) => {
  newGen.push(
    (note = new Howl({
      src: [note],
      volume: 0.2,
    }))
  );
});

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
      chordValue: "",
      simplifiedChord: [],
      finalStartValues: "",
      flatNotesSample: ["Db", "Eb", "Fb", "Gb", "Ab", "Bb", "Cb"],
      flatNotes: [],
      flatNotesAlternatesSample: [
        "Csharp",
        "Dsharp",
        "E",
        "Fsharp",
        "Gsharp",
        "Asharp",
        "B",
      ],
      flatNotesAlternates: [],
    };
  },

  methods: {
    // TODO change name
    getButtonName(event) {
      this.intervalsInChord = Chord.get(event.target.innerText).intervals;
      this.intervalsValue = this.intervalsInChord.join(" - ");

      this.finalStartValues = this.startNoteValue + this.startOctaveValue;

      this.chordValue = this.intervalsInChord
        .map((int) => {
          return Chord.transpose(this.finalStartValues, int);
        })
        .join(" - ");

      this.playChord(event);
    },

    playChord(event) {
      console.log("---------------------");

      this.transformateNotes();

      console.log("simplified: " + this.simplifiedChord);

      for (let k = 0; k < this.simplifiedChord.length; k++) {
        for (let idx = 0; idx < newGen.length; idx++) {
          if (
            newGen[idx]._src.substring(7, newGen[idx]._src.indexOf(".")) ==
            this.simplifiedChord[k]
          ) {
            console.log("idx: " + newGen[idx]._src);
            newGen[idx].play();
          }
        }
      }
      console.log("name of chord:  " + event.target.innerText);
    },

    transformateNotes() {
      // creating array of flatNotes
      for (let i = 1; i < 8; i++) {
        this.flatNotesSample.forEach((flatNote) => {
          this.flatNotes.push(flatNote + i);
        });
      }

      //crating array of Alternates of flat notes
      for (let i = 1; i < 8; i++) {
        this.flatNotesAlternatesSample.forEach((alter) => {
          this.flatNotesAlternates.push(alter + i);
        });
      }

      this.simplifiedChord = this.chordValue.split(" - ").map((note) => {
        note = Note.simplify(note);
        note = note.replace("#", "sharp");
        if (this.flatNotes.includes(note)) {
          note = this.flatNotesAlternates[this.flatNotes.indexOf(note)];
        }
        return note;
      });
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
