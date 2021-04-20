module.exports = {
  all: true,
  checkCoverage: true,
  exclude: [
    'src/components/documentation/**',
    'src/main.js',
    'src/router/index.js',
    'src/store/index.js',
    'src/views/Contribute.vue',
    'src/views/Documentation/**/*',
    'src/views/Home.vue'
  ],
  extension: [
    '.js',
    '.vue'
  ],
  include: [
    'src/**/*.js',
    'src/**/*.vue'
  ],
  reporter: [
    'lcov',
    'text',
    'text-summary'
  ]
};
