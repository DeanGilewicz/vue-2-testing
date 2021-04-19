import axios from 'axios';
import { doesObjPropertyExist, isEmptyObj } from '@/utils/helpers';

export const state = [
  // {
  //   id: 1,
  //   name: 'First Todo',
  //   completed: false
  // },
  // {
  //   id: 2,
  //   name: 'Second Todo',
  //   completed: false
  // },
  // {
  //   id: 3,
  //   name: 'Third Todo',
  //   completed: false
  // }
];

export const getters = {
  completedTodoNumber: (state) => {
    return state.reduce((sum, todo) => {
      // eslint-disable-next-line no-unused-expressions
      todo.completed ? sum += 1 : sum;
      return sum;
    }, 0);
  },
  doesTodoExist: (state) => (todo) => {
    const index = state.findIndex((stateTodo) => stateTodo.id === todo.id);
    if (index < 0) return false;
    return true;
  },
  incompleteTodoNumber: (state) => {
    return state.reduce((sum, todo) => {
      // eslint-disable-next-line no-unused-expressions
      todo.completed ? sum : sum += 1;
      return sum;
    }, 0);
  }
};

export const mutations = {
  addTodo(state, todo) {
    if (typeof isEmptyObj(todo) === 'undefined' || isEmptyObj(todo)) return;
    state.push(todo);
  },
  deleteTodo(state, todo) {
    if (typeof isEmptyObj(todo) === 'undefined' || isEmptyObj(todo) || !doesObjPropertyExist(todo, 'id')) return;
    const todoIndex = state.findIndex((stateTodo) => stateTodo.id === todo.id);
    if (todoIndex < 0) return;
    state.splice(todoIndex, 1);
  },
  setTodoName(state, { todo, name }) {
    if (typeof isEmptyObj(todo) === 'undefined' || isEmptyObj(todo) || !doesObjPropertyExist(todo, 'name')) return;
    const todoIndex = state.findIndex((stateTodo) => stateTodo.id === todo.id);
    if (todoIndex < 0) return;
    state[todoIndex].name = name;
  },
  setTodos(state, todos) {
    if (Array.isArray(todos) && todos.length > 0) {
      state.push(...todos);
    }
  },
  toggleTodoStatus(state, todo) {
    if (typeof isEmptyObj(todo) === 'undefined' || isEmptyObj(todo) || !doesObjPropertyExist(todo, 'completed')) return;
    const todoIndex = state.findIndex((stateTodo) => stateTodo.id === todo.id);
    if (todoIndex < 0) return;
    state[todoIndex].completed = !todo.completed;
  }
};

export const actions = {
  addTodo({ commit, getters }, todo) {
    if (!getters.doesTodoExist(todo)) {
      commit('addTodo', todo);
    }
  },
  deleteTodo({ commit, getters }, todo) {
    if (getters.doesTodoExist(todo)) {
      commit('deleteTodo', todo);
    }
  },
  getMessage() {
    return axios({
      method: 'get',
      url: 'http://localhost:4000/message'
    })
      .then((r) => r.data)
      .then((message) => {
        return message[0];
      })
      .catch((error) => {
        if (error.response) throw error.response;
        throw (error);
      });
  },
  getTodos({ commit }) {
    return axios({
      method: 'get',
      url: 'http://localhost:4000/todos'
    })
      .then((r) => r.data)
      .then((todos) => {
        commit('setTodos', todos);
        return true;
      })
      .catch((error) => {
        if (error.response) throw error.response;
        throw (error);
      });
  },
  setTodoName({ commit, getters }, { todo, name }) {
    if (getters.doesTodoExist(todo)) {
      commit('setTodoName', { todo, name });
    }
  },
  toggleTodoStatus({ commit, getters }, todo) {
    if (getters.doesTodoExist(todo)) {
      commit('toggleTodoStatus', todo);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
