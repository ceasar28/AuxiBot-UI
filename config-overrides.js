const webpack = require("webpack");

module.exports = function override(config, env) {
  config.resolve.fallback = {
    url: require.resolve("url"),
    assert: require.resolve("assert"),
    crypto: false, // Exclude crypto from bundling
    http: require.resolve("stream-http"),
    https: require.resolve("https-browserify"),
    // os: require.resolve("os-browserify/browser"),
    buffer: require.resolve("buffer"),
    stream: require.resolve("stream-browserify"),
  };

  config.plugins.push(
    new webpack.ProvidePlugin({
      process: "process/browser.js", // Adjusted path for process
      Buffer: ["buffer", "Buffer"],
    }),
    new webpack.NormalModuleReplacementPlugin(/node:crypto/, (resource) => {
      resource.request = resource.request.replace(/^node:/, "");
    })
  );

  // Ensure proper handling of ES6 modules
  config.module.rules.unshift({
    test: /\.m?js$/,
    resolve: {
      fullySpecified: false, // Disable the behavior
    },
  });

  // Specify crypto as an external dependency for Node.js
  config.externals = {
    crypto: "crypto",
    target: "node",
    // Add other Node.js built-in modules here if needed
  };

  return config;
};
