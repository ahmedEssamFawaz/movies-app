<template>
  <v-col cols="12" class="d-flex">
    <v-spacer></v-spacer>

    <v-autocomplete
      v-model="selectedGenre"
      :items="genres"
      item-text="name"
      item-value="id"
      clearable
      dense
      label="Pick a genre"
    ></v-autocomplete>
    <v-spacer></v-spacer>

    <v-btn @click="toggleSortByReleaseDate">Sort by release date</v-btn>
    <v-spacer></v-spacer>
  </v-col>
</template>

<script>
export default {
  computed: {
    genres() {
      return this.$store.state.movies.genres;
    },
    selectedGenre: {
      get() {
        return this.$store.state.movies.selectedGenre;
      },
      set(value) {
        this.$store.commit("movies/setSelectedGenre", value);
      },
    },
  },
  methods: {
    toggleSortByReleaseDate() {
      this.$store.commit("movies/sortByReleaseDate");
    },
  },
};
</script>

<style lang="scss" scoped></style>
