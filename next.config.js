const path = require("path");
const webpack = require("webpack");
module.exports = {
  webpack: config => {
    config.resolve.alias["~"] = path.resolve(__dirname);

    config.plugins.push(
      new webpack.EnvironmentPlugin({
        API: "http://localhost:3000/api" // set default
      })
    );
    return config;
  }
};
