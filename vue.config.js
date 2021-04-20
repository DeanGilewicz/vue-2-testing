const { execSync } = require('child_process');

module.exports = {
  chainWebpack: (config) => {
    if (process.env.NODE_ENV === 'test') {
      if (process.platform === 'darwin') {
        // work around for resolving file path to components - https://github.com/istanbuljs/nyc/issues/718
        execSync("sed -i '' 's/source: pathutils.relativeTo(start.source, origFile),/source: origFile,/' node_modules/istanbul-lib-source-maps/lib/get-mapping.js");
      } else {
        execSync("sed -i 's/source: pathutils.relativeTo(start.source, origFile),/source: origFile,/' node_modules/istanbul-lib-source-maps/lib/get-mapping.js");
      }
    }
    return config;
  }
};
