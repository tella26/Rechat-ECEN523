/** @type {import('next').NextConfig} */
import fs from "fs";
import webpack from "./webpack.config.mjs";

const nextConfig = JSON.parse(fs.readFileSync("./next.config.json", "utf-8"));

nextConfig.webpack = (config, options) => {
  if (options.dev && !options.isServer) {
    config.devtool = 'source-map';
  }
  // Apply any other custom webpack configurations here
  return webpack(config, options);
};

export default nextConfig;
