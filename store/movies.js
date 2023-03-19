import axios from 'axios'

export const state = () => ({
  popularMovies:null,
  currentPage: 1,
  sortByReleaseDateAsc: true,
  loading:false,
  genres:null,
  selectedGenre:null
})

export const mutations = {
  setPopularMovies(state, movies) {
    state.popularMovies
    ? (state.popularMovies.results.push(...movies.results), state.popularMovies.page = movies.page)
    : state.popularMovies = movies;
 },
  setCurrentPage(state, page) {
    state.currentPage = page
  },
  sortByReleaseDate(state) {
    state.popularMovies?.results?.sort((a, b) => {
      return state.sortByReleaseDateAsc ? new Date(a.release_date) - new Date(b.release_date) : new Date(b.release_date) - new Date(a.release_date);
    });
    state.sortByReleaseDateAsc = !state.sortByReleaseDateAsc;
  },
  setGenre(state,genres){
    state.genres=genres
  },
  setSelectedGenre(state,selectedGenre){
    state.selectedGenre = selectedGenre
  },
  setLoading(state, loading) {
    state.loading = loading
  }
}

export const actions = {
  async fetchPopularMovies({ commit, state }) {
    try {
      commit('setLoading', true)
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=${state.currentPage}`)
      commit('setPopularMovies', response.data)
      commit('setLoading', false)

    } catch (error) {
      console.error(error)
      commit('setLoading', false)

    }
  },
  async getAllGenres({commit}){
    try{
      commit('setLoading',true)
      const response = await axios.get(`https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.MOVIES_API_KEY}&language=en-US`)
      commit('setGenre', response.data.genres)
      commit('setLoading', false)
    } catch (error) {
      console.error(error)
      commit('setLoading', false)

    }
  },
  setCurrentPage({ commit }, page) {
    commit('setCurrentPage', page)
  }
}
