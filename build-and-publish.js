const webpack = require('webpack');
const webpackConfig = require('./webpack.config');
const path = require('path');
const fs = require('fs');
const promisify = require('util').promisify;
const childProcess = require('child_process');
const ghpages = require('gh-pages');
// import * as ghpages from 'gh-pages';

const exec = async (command) => {
    const execFunc = promisify(childProcess.exec);

    return execFunc(command);
};
// import * as path from 'path';
// import * as fs from 'fs';

const build = async () => {
    // const indexPath = path.resolve(__dirname, './index.html');
    const appPath = path.resolve(__dirname);
    const distPath = `${appPath}/publish_dist`;
    const assetsPath = `${appPath}/example/assets`;
    const indexPath = `${appPath}/example/index.prod.html`;
    const rootFilesPath = `${appPath}/example/root_files`;

    await exec(`mkdir -p ${distPath}`);
    await exec(`cp ${indexPath} ${distPath}/index.html`);
    await exec(`cp -R ${assetsPath} ${distPath}`);
    console.log('Copying root files 🗂');
    await exec(`cp -R ${rootFilesPath}/ ${distPath}`);

    const compiler = webpack({
        ...webpackConfig,
        mode: 'production',
        output: {
            path: distPath,
            filename: 'dist-bundle.js'
        }
    });
    console.log('Creating build 📦');
    return new Promise((resolve, reject) => {
        compiler.run((_, stats) => {
            console.log('hasErrors', stats.hasErrors());
            console.log(stats.toString());
            if (stats.hasErrors()) {
                reject(stats.toString());
            } else {
                resolve(distPath);
            }
        })
    });
}

const publish = async (distPath) => {

    return new Promise((resolve, reject) => {
        ghpages.publish(
            distPath,
            {
                repo: 'git@github.com:soswow/portfolio.git'
            },
            (err) => {
                if (err) {
                    console.log('gh-pages publish error', err);
                    reject(err);
                }else{
                    resolve();
                }
            }
        );
    });
    
}


build().then(publish).then(() => console.log('done'));