<template>
  <v-col cols="12" class="d-flex">
    <v-spacer></v-spacer>

    <v-btn @click="toggleSortByReleaseDate">Sort</v-btn>
  </v-col>
</template>


<script>
export default {
  computed: {
    popularMovies() {
      return this.$store.state.movies.popularMovies;
    },

  },
  methods: {
    toggleSortByReleaseDate() {
      this.$store.commit('movies/SORT_BY_RELEASE_DATE');
    },
  },
};
</script>

<style lang="scss" scoped>

</style>