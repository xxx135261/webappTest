// require('./check-versions')()

process.env.NODE_ENV = 'production';

var ora = require('ora')
var rm = require('rimraf')
var path = require('path')
var chalk = require('chalk')
var webpack = require('webpack')
var config = require('../config')
var webpackConfig = require('./webpack.prod.conf')
var fs = require('fs');

var spinner = ora('building for production...')
spinner.start()

rm(path.join(config.build.assetsRoot, config.build.assetsSubDirectory), err => {
    if (err) throw err;
    webpack(webpackConfig, function (err, stats) {
        spinner.stop()
        if (err) throw err
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')

        //修改dist/html文件
        modifyHtml("dist/index.html");

        console.log(chalk.cyan('  Build complete.\n'))
        console.log(chalk.yellow(
            '  Tip: built files are meant to be served over an HTTP server.\n' +
            '  Opening index.html over file:// won\'t work.\n'
        ))
    })
});

//js 读取文件
function modifyHtml(file) {
    fs.readFile(file, function (err, data) {
        if (err) {
            console.log(err);
            return;
        }
        let context = new String(data).replace(/href=\/?static/g, "href=/dist/static");
        fs.writeFile(file, context, function (err) {
            if (err) {
                console.log(err);
                return;
            }
        });
    });
}
