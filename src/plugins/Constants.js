const CONSTANTS = {
  MAIN_PRETTY_NAME: 'Vue 2 Testing',
  TODO_PRETTY_NAME: 'My Todos'
};

export default {
  install(Vue, options) {
    Vue.prototype.$getConstant = (key) => {
      return CONSTANTS[key];
    };
  }
};
