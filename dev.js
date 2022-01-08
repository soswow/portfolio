const Webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');
const webpackConfig = require('./webpack.config.js');

const host = '0.0.0.0';
const defaultPort = 8080;
const port = parseInt(process.env.DEV_PORT || '', 10) || defaultPort;

const compiler = Webpack(webpackConfig);
const devServerOptions = { 
    ...webpackConfig.devServer,
    historyApiFallback: true,
    static: 'example',
    port,
    host,
};
const server = new WebpackDevServer(devServerOptions, compiler);

const runServer = async () => {
  console.log('Starting server...');
  await server.start();
  console.log('done. Running.')
};

runServer();