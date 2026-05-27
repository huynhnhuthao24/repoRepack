const path = require('path');

module.exports = {
  presets: ['module:@react-native/babel-preset'],
  env: {
    production: {
      plugins: ['transform-remove-console'],
    },
  },
  plugins: [
    ['transform-inline-environment-variables'],
    ['module:react-native-dotenv'],
    // other plugins
    [
      'react-native-unistyles/plugin',
      {
        // pass root folder of your application
        // all files under this folder will be processed by the Babel plugin
        // if you need to include more folders, or customize discovery process
        // check available babel options
        root: path.resolve(__dirname, 'src'),
      },
    ],
    // 'react-native-reanimated/plugin',
  ],
};
