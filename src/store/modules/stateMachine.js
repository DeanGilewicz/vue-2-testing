/*
  example non exported function
  - must be used in an export function (or referenced) to be able to be accessed using Rewire
*/
const transformStates = (states) => {
  if (Array.isArray(states) && states.length > 0) {
    return states.map((state) => {
      return `transformed-${state}`;
    });
  }
};

export const state = {
  currentState: 'idle',
  states: ['idle', 'pending', 'fulfilled', 'rejected']
};

export const getters = {};

export const mutations = {
  setCurrentState(state, currentState) {
    state.currentState = currentState;
  },
  setTransformedStates(state, transformedStates) {
    state.transformedStates = transformedStates;
  }
};

export const actions = {
  arbitraryActionToUseTransformedData({ commit }, states) {
    commit('setTransformedStates', transformStates(states));
  },
  setCurrentState({ commit, state }, currentState) {
    if (typeof currentState !== 'undefined' && state.states.includes(currentState)) {
      commit('setCurrentState', currentState);
    }
  }
};

export default {
  state,
  getters,
  mutations,
  actions
};
