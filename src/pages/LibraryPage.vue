<template>
  <h2>library</h2>
  <p>{{ someNote }}</p>
  <p>{{ someInterval }}</p>
</template>

<script>
import { Note, Interval } from "tonal";

export default {
  name: "LibraryPage",

  data() {
    return {
      someNote: Note.name("A4"),
      someInterval: Interval.get("5P"),
    };
  },
};
</script>

<style lang="scss"></style>
