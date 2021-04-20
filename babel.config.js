const plugins = [];
if (process.env.MY_CYPRESS_ENV === 'coverage') {
  plugins.push(['istanbul']);
} else if (process.env.NODE_ENV === 'test') {
  plugins.push(['babel-plugin-rewire']);
  plugins.push(['istanbul']);
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
};
