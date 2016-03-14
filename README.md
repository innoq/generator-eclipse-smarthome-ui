# generator-eclipse-smarthome-ui [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][daviddm-image]][daviddm-url] [![Coverage percentage][coveralls-image]][coveralls-url]
> Eclipse SmartHome UI

# UNDER CONSTRUCTION

## ToDos

 - Finnish gulp to build modules 
 - Add ESH start page tile
 - Add CSS preprocessor sample to quickly enable less/stylus
 - Add concat/minify step
 

## Installation

First, install [Yeoman](http://yeoman.io) and generator-eclipse-smarthome-ui 
using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-eclipse-smarthome-ui
```

Then change into the ui folder of your [Eclipse SmartHome](https://eclipse.org/smarthome) clone 
or use [Eclipse Installer](http://www.eclipse.org/smarthome/documentation/development/ide.html) to setup everything for you.
That will clone ESH for you, too. 

Then change to the ESH folder and generate your new user interface:

```bash
#git clone https://github.com/eclipse/smarthome.git ./esh
cd esh/extensions/ui
yo eclipse-smarthome-ui
```

After that, open the Eclipse Import dialog and re-scan the ESH folder. Deselect all and select onyl your new UI.
Maybe indexing takes a while. Then edit the launch config (little arrow next to the play/debug button on the toolbar)
and add your UI to the launch config. Then start Eclipse and here you go.

## Getting To Know Yeoman

Yeoman has a heart of gold. He&#39;s a person with feelings and opinions, but he&#39;s very easy to work with. 
If you think he&#39;s too opinionated, he can be easily convinced. Feel free to [learn more about him](http://yeoman.io/).

## License

Apache-2.0 © [Sebastian Janzen](https://innoq.com)


[npm-image]: https://badge.fury.io/js/generator-eclipse-smarthome-ui.svg
[npm-url]: https://npmjs.org/package/generator-eclipse-smarthome-ui
[travis-image]: https://travis-ci.org/innoq/generator-eclipse-smarthome-ui.svg?branch=master
[travis-url]: https://travis-ci.org/innoq/generator-eclipse-smarthome-ui
[daviddm-image]: https://david-dm.org/innoq/generator-eclipse-smarthome-ui.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/innoq/generator-eclipse-smarthome-ui
[coveralls-image]: https://coveralls.io/repos/innoq/generator-eclipse-smarthome-ui/badge.svg
[coveralls-url]: https://coveralls.io/r/innoq/generator-eclipse-smarthome-ui
