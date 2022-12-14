/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const path = require('path');

const extraNodeModules = {
  modules: [
    path.resolve(path.join(__dirname, '../../node_modules')),
    path.resolve(path.join(__dirname, '../../../node_modules')),
  ],
};

const watchFolders = [
  path.resolve(__dirname, '../shared'),
  path.resolve(path.join(__dirname, '../../node_modules')),
  path.resolve(path.join(__dirname, '../shared/node_modules')),
];

const nodeModulesPaths = [path.resolve(path.join(__dirname, './node_modules'))];

const {getDefaultConfig} = require('@expo/metro-config');

const config = getDefaultConfig(__dirname);

config.resolver.sourceExts = process.env.RN_SRC_EXT
  ? [
      ...process.env.RN_SRC_EXT.split(',').concat(config.resolver.sourceExts),
      'cjs',
    ]
  : [...config.resolver.sourceExts, 'cjs']; // <-- cjs added here

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: true,
        inlineRequires: true,
      },
    }),
  },
  resolver: {
    extraNodeModules,
    nodeModulesPaths,
    sourceExts: [...config.resolver.sourceExts],
  },
  watchFolders,
};
