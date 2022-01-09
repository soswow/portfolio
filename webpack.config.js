const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

module.exports = {
    "mode": "development",
    "entry": [
      "./example/index.tsx"
    ],
    "output": {
      "filename": "example-bundle.js"
    },
    "resolve": {
      "extensions": [
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".json"
      ]
    },
    "devtool": "source-map",
    "module": {
      "rules": [
        {
            test: /\.css$/i,
            use: ["style-loader", "css-loader"],
        },
        {
          test: /\.tsx?$/,
          "loader": "ts-loader"
        },
      ]
    },
    plugins: [
        new NodePolyfillPlugin()
    ],
    "devServer": {
      "historyApiFallback": true,
      "static": "example",
      "port": 8080,
      "host": "0.0.0.0",
      client:{
        overlay: {
          warnings: false,
          errors: true
        }
      }
    },
    "stats": 'minimal'
  };