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

  <div class="labels">
    <div v-if="!isChordChosen" class="provoke-label">
      <p class="gradient-text">Choose a chord</p>
    </div>

    <div v-if="isChordChosen" class="chord-info">
      <div class="chord-names">
        <div class="chord-names-explanation gradient-text">
          Possible names of a chord
        </div>
        <p class="names">{{ possibleChordNames }}</p>
      </div>
      <div class="chord-notes">
        <div class="chord-notes-explanation gradient-text">Chord notes</div>
        <p class="notes">{{ chordValue }}</p>
      </div>
      <div class="chord-intervals">
        <div class="chord-intervals-explanation gradient-text">
          Chord Intervals
        </div>
        <p class="intervals">{{ intervalsValue }}</p>
      </div>
    </div>
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

// const notesSample = [
//   "A",
//   "Asharp",
//   "B",
//   "C",
//   "Csharp",
//   "D",
//   "Dsharp",
//   "E",
//   "F",
//   "Fsharp",
//   "G",
//   "Gsharp",
// ];

// let notes3 = [];

// for (let i = 1; i < 8; i++) {
//   notes2.forEach((note) => {
//     notes3.push(note + i);
//   });
// }

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
      newGen: [],
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
      isChordChosen: false,
      fadeDelay: 0,
      possibleChordNames: [],
    };
  },

  mounted() {
    notes.forEach((note) => {
      this.newGen.push(
        (note = new Howl({
          src: [note],
          volume: 0.1,
        }))
      );
    });

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

      this.possibleChordNames = Chord.detect(this.chordValue.split(" - ")).join(
        " - "
      );

      this.changeLabelVisibility();
      this.playChord(event);
    },

    changeLabelVisibility() {
      clearTimeout(this.fadeDelay);
      this.isChordChosen = true;

      this.fadeDelay = setTimeout(() => {
        this.isChordChosen = false;
      }, 30000);
    },

    playChord(event) {
      console.log("---------------------");

      this.transformateNotes();

      console.log("simplified: " + this.simplifiedChord);

      // TODO change to forEach
      let newGen = this.newGen;
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
      console.log("detect: " + Chord.detect(this.chordValue.split(" - ")));
    },

    transformateNotes() {
      this.simplifiedChord = this.chordValue.split(" - ").map((note) => {
        note = Note.simplify(note).replace("#", "sharp");
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

  margin-bottom: 5px;

  select {
    margin: 0 8px;
  }
}

.provoke-label {
  font-size: 24px;
}

.gradient-text {
  background: linear-gradient(-45deg, #6355a4, #6355a4, white, white);
  background-size: 200%;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: animated_text 10s ease-in-out infinite;
  -moz-animation: animated_text 10s ease-in-out infinite;
  -webkit-animation: animated_text 10s ease-in-out infinite;
}

@keyframes animated_text {
  0% {
    background-position: 0px 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0px 50%;
  }
}

.chord-names-explanation,
.chord-notes-explanation,
.chord-intervals-explanation {
  display: none;
  position: absolute;
  height: auto;
  top: -16px;

  font-size: 18px;
  z-index: 1;
}

.chord-names-explanation {
  width: 400px;
}

.chord-notes-explanation {
  width: 200px;
}

.chord-intervals-explanation {
  width: 250px;
}

.chord-names:hover .chord-names-explanation,
.chord-notes:hover .chord-notes-explanation,
.chord-intervals:hover .chord-intervals-explanation {
  display: inline;
}

.chord-info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  height: 125px;

  font-size: 24px;

  .chord-names,
  .chord-notes,
  .chord-intervals {
    position: relative;
    min-width: 50px;

    display: flex;
    flex-direction: column;
    align-items: center;

    .notes,
    .names,
    .intervals {
      justify-content: center;
      align-items: center;
    }
  }
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
