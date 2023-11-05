/** @type {import('next').NextConfig} */
module.exports = {
  images: {
    domains: ["w3schoolsua.github.io", "lh3.googleusercontent.com", "html-plus.in.ua"],
  },
  webpack: (config, { dev }) => {
    // Add file loader for mp3 files
    config.module.rules.push({
      test: /\.(mp3)$/,
      use: [
        {
          loader: dev ? "url-loader" : "file-loader",
          options: {
            publicPath: "/_next/static/", // Path where the mp3 files will be hosted
            outputPath: "static/", // Directory where mp3 files will be placed in the output folder
            name: "[name].[ext]", // Name of the file in the output folder
            esModule: false, // Disable ES modules for mp3 files
          },
        },
      ],
    });

    return config;
  },
};
