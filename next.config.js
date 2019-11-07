const path = require("path");

const withMDX = require("@zeit/next-mdx")({
  extension: /\.mdx?$/
});

module.exports = withMDX({
  pageExtensions: ["js", "jsx", "mdx", "md"],
  webpack: config => {
    config.resolve.alias["~"] = path.resolve(__dirname);
    return config;
  }
});
