import Vue from 'vue';
import Vuex from 'vuex';
import stateMachine from './modules/stateMachine';
import todos from './modules/todos';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    stateMachine,
    todos
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {}
});
