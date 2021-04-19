const plugins = [];
if (process.env.NODE_ENV === 'test') {
  plugins.push(['babel-plugin-rewire']);
}

module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  plugins
};
