/**
 * The following Servers are started here:
 *
 *  localhost:3000
 *  Entry point for developer. This one acts as proxy for web-src folder to deliver
 *  assets which were not handled by WebPack. It also proxies all requests to `/rest`
 *  to a local running ESH instance. See _package.json_ to configure the URL for that.
 *
 *  - localhost:3001 WebPack dev server
 *  WebPack dev server. Watches it's handled files and build in live in-memory.
 *
 */
const webpack = require('webpack');
const WebpackDevServer = require('webpack-dev-server');

const express = require('express');
const proxy = require('proxy-middleware');
const url = require('url');

const config = require('./webpack.config');
const pkg = require('./package.json');

let app = express();
app.use('/<%= uiPath %>', express.static('web-src'));
app.use('/<%= uiPath %>', proxy(url.parse('http://localhost:3001/<%= uiPath %>')));
app.use('/rest', proxy(url.parse(pkg.esh.localRestUrl)));
app.get('/*', function (req, res) {
  res.sendFile(__dirname + '/index.html');
});


let server = new WebpackDevServer(webpack(config), {
  contentBase: __dirname,
  quiet: false,
  noInfo: false,
  publicPath: '/' + config.output.publicPath,

  stats: {colors: true}
});

server.listen(3001, "localhost");
app.listen(3000, function () {
  console.log('Started Dev-Server on http://localhost:3000');
});
