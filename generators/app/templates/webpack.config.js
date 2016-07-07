/*eslint-env node, commonjs */
/*eslint comma-dangle:0 */

const webpack = require('webpack');
const NgAnnotatePlugin = require('ng-annotate-webpack-plugin');

const pkg = require('./package.json');
const banner = '' +
  '/*! ' + (pkg.title || pkg.name) + ' - v' + (pkg.version) + ' - ' + (new Date().toISOString().substring(0, 10)) + '\n' +
  ' * ' + (pkg.homepage) + '\n' +
  ' * Copyright (c) ' + (new Date().toISOString().substring(0, 4)) + ' ' + (pkg.author.name) + '\n' +
  ' * @license ' + (pkg.license) + ' */' +
  '';

const factory = function () {
  var result = {
    entry: {
      'app': './web-src/js/'
    },
    output: {
      path: __dirname + '/web',
      filename: '[name].min.js',
      publicPath: '<%= uiPath %>/' // FIXME get from pkg
    },
    devtool: 'source-map',
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'eslint'
        }
      ],
      loaders: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: 'presets[]=es2015',
          // plugins : [
          //     'transform-runtime'
          // ]
        }]
    },
    plugins: []

  };

  result.plugins.push(new (require('progress-bar-webpack-plugin')));

  result.plugins.push(new webpack.ProvidePlugin({
    // Automtically detect jQuery and $ as free var in modules
    // and inject the jquery library
    // This is required by many jquery plugins
    jQuery: "jquery",
    $: "jquery"
  }));
  result.plugins.push(new webpack.BannerPlugin(banner, {
    raw: true,
    entryOnly: true
  }));
  result.plugins.push(new NgAnnotatePlugin({
    add: true
  }));
  if (false) {
    result.plugins.push(new webpack.optimize.UglifyJsPlugin({
      sourceMap: true
    }));
  }

  return result;
};

module.exports = factory({
  minified: process.env.BUILD_MINIFIED ? true : false
});
