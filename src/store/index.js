import { createStore } from 'vuex';
import Auth from '../services/auth_service';

const store = createStore({
  state() {
    return {
      isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
      userData: JSON.parse(localStorage.getItem('userData')) || null
    };
  },
  mutations: {
    setLoginStatus(state, status) {
      state.isLoggedIn = status;
      localStorage.setItem('isLoggedIn', JSON.stringify(status)); 
    },
    setUserData(state, data) {
      state.userData = data;
      localStorage.setItem('userData', JSON.stringify(data)); 
    },
  },
  actions: {
    async login({ commit }, payload) {
      const response = await Auth.login(payload);
      if (response.success) {
        commit('setLoginStatus', true);
        commit('setUserData', response.user);
      } else {
        commit('setLoginStatus', false);
        commit('setUserData', null);
        throw new Error(response);
      }
    },
    async register({ commit }, payload) {
      const response = await Auth.register(payload);
      if (response.success) {
        commit('setLoginStatus', true);
        commit('setUserData', response.user);
      } else {
        commit('setLoginStatus', false);
        commit('setUserData', null);
        throw new Error(response);
      }
    },
    async logout({ commit }) {
      const response = await Auth.logout();
      if (response.success) {
        commit('setLoginStatus', false);
        commit('setUserData', null);
        localStorage.removeItem('isLoggedIn'); 
        localStorage.removeItem('userData'); 
      } else {
        throw new Error(response);
      }
    },
    async checkLoggedIn({ commit }) {
      const response = await Auth.checkLoggedIn();
      if (response.loggedIn && response.success) {
        commit('setLoginStatus', response.loggedIn);
        commit('setUserData', response.user.user);
      } else {
        commit('setLoginStatus', false);
        commit('setUserData', null);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('userData');
      }
    },
  },
  getters: {
    isLoggedIn: (state) => state.isLoggedIn,
    userData: (state) => state.userData,
  },
});

export default store;
