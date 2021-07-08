import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: null,
    loginErrors: []
  },
  actions: {
    getUser ({commit}) {
      axios.get('/api/auth/getUser')
      .then(response => {
        commit('setUser', response.data)
      })
    },
    login ({commit}, params) {
      commit('clearLoginErrors')
      axios.get('/api/auth/login', {params})
        .then(response => {
          return new Promise((resolve, reject) => {
            commit('setUser', response.data)
            resolve()
          })
        })
        .catch(error => {
            commit('setLoginErrors', error.response.data.errors) 
        })
    },
    logout ({commit}) {
      commit('clearUser')
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user
    },
    clearUser (state) {
      state.user = null
    },    
    setLoginErrors (state, errors) {
      state.loginErrors = errors
    },
    clearLoginErrors (state) {
      state.loginErrors = []
    },
    increment (state) {
      state.count++
    }
  }
})

export default store