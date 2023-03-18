<template>
  <v-row justify="center" align="center">
    <HomeAllFilters/>
    <v-col md="4" v-for="movie in popularMovies" :key="movie.id">
      <HomeSingleMovieCard :movie="movie" />
    </v-col>
    <button @click="getNextPage">Next page</button>

  </v-row>
</template>

<script>
export default {
    computed: {
    popularMovies() {
      return this.$store.state.movies.popularMovies
    }
  },
  methods: {
    getNextPage() {
      this.$store.dispatch('movies/setCurrentPage', this.$store.state.movies.currentPage + 1)
      this.$store.dispatch('movies/fetchPopularMovies')
    }
  },
    async created() {
    await this.$store.dispatch('movies/fetchPopularMovies')
  }
};
</script>

<style lang="scss" scoped></style>
