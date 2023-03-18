import axios from 'axios'

export const state = () => ({
  popularMovies: [],
  currentPage: 1,
  sortByReleaseDateAsc: true
})

export const mutations = {
  SET_POPULAR_MOVIES(state, movies) {
    state.popularMovies = movies
  },
  SET_CURRENT_PAGE(state, page) {
    state.currentPage = page
  },
  SORT_BY_RELEASE_DATE(state) {
    state.popularMovies.sort((a, b) => {
      return state.sortByReleaseDateAsc ? new Date(a.release_date) - new Date(b.release_date) : new Date(b.release_date) - new Date(a.release_date);
    });
    state.sortByReleaseDateAsc = !state.sortByReleaseDateAsc;
  },
}

export const actions = {
  async fetchPopularMovies({ commit, state }) {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.MOVIES_API_KEY}&language=en-US&page=${state.currentPage}`)
      commit('SET_POPULAR_MOVIES', response.data.results)
    } catch (error) {
      console.error(error)
    }
  },
  setCurrentPage({ commit }, page) {
    commit('SET_CURRENT_PAGE', page)
  }
}

export const getters = {
  popularMovies: state => state.popularMovies
}
