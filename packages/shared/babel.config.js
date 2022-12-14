module.exports = {
  presets: [
    "module:metro-react-native-babel-preset",
    [
      "@babel/preset-env",
      { useBuiltIns: "entry", corejs: "2", targets: { node: "current" } },
    ],
    "@babel/preset-typescript",
  ],
  plugins: [
    function () {
      return {
        visitor: {
          MetaProperty(path) {
            path.replaceWithSourceString("process");
          },
        },
      };
    },
  ],
  env: {
    production: {
      plugins: ["react-native-paper/babel"],
    },
  },
};
