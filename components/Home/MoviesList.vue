<template>
  <v-row justify="center" align="center" v-on:scroll="handleScroll" class="scroblleCard">
    <HomeAllFilters />
    <v-col v-if="filteredMovies.length === 0 && !loading">
      <div class="noMoviesTitle">No movies found in this genre.</div>
    </v-col>
    <v-col
      md="3"
      sm="6"
      cols="12"
      v-for="movie in filteredMovies"
      :key="movie.id"
    >
      <HomeSingleMovieCard :movie="movie" />
    </v-col>
    <v-overlay :value="loading" opacity="1">
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </v-overlay>

    <button class="scrollTopBtn" v-if="showScrollBtn" @click="scrollToTop">
      <v-icon>mdi-chevron-up</v-icon>
    </button>
  </v-row>
</template>

<script>
export default {
  data(){
    return{
      showScrollBtn: false,

    }
  },
  computed: {
    popularMovies() {
      return this.$store.state.movies.popularMovies;
    },
    loading() {
      return this.$store.state.movies.loading;
    },
    selectedGenre() {
      return this.$store.state.movies.selectedGenre;
    },
    filteredMovies() {
      if (!this.selectedGenre) {
        return this.popularMovies?.results || [];
      }
      return this.popularMovies?.results.filter((movie) =>
        movie.genre_ids.includes(this.selectedGenre)
      );
    },
  },
  methods: {
    getNextPage() {
      this.$store.dispatch(
        "movies/setCurrentPage",
        this.$store.state.movies.currentPage + 1
      );
      this.$store.dispatch("movies/fetchPopularMovies");
    },
    handleScroll() {
      if (this.selectedGenre) {
        return;
      }
      const el = this.$el;
      const scrollTop = el.scrollTop;
      const scrollHeight = el.scrollHeight;
      const clientHeight = el.clientHeight;
      this.showScrollBtn = scrollTop > clientHeight;

      if (scrollTop + clientHeight >= scrollHeight) {
        this.getNextPage();
      }
    },
    scrollToTop() {
      const el = this.$el;
      el.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    },
  },
  async created() {
    await this.$store.dispatch("movies/fetchPopularMovies");
    await this.$store.dispatch("movies/getAllGenres");
  },
};
</script>

<style lang="scss" scoped>
.scroblleCard {
  max-height: 100vh;
  overflow-y: scroll;
  overflow-x: hidden;
  &::-webkit-scrollbar {
    width: 0.5rem;
  }

  &::-webkit-scrollbar-track {
    background: grey;
  }

  &::-webkit-scrollbar-thumb {
    background: white;
    border-radius: 0.313rem !important;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #555;
    border-radius: 0.313rem !important;
  }
  .noMoviesTitle{
    text-align: center;
    font-size: 25px;
    padding-top: 200px;
  }
  .scrollTopBtn {
  position: fixed;
  right: 2rem;
  bottom: 2rem;
  background-color: #ff0000;
  color: #000;
  border: none;
  border-radius: 50%;
  width: 4rem;
  height: 4rem;
  font-size: 2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  opacity: 0.8;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
}
}
</style>
