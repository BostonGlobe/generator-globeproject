# generator-globegraphic

Yeoman generator for a Boston Globe graphic.

Also known as **MAGIC**.

Please note: do not reproduce Boston Globe logos or fonts without written permission.

## Prerequisites

- Install [Node.js](http://nodejs.org/).
- Install [hub](https://github.com/github/hub) (on OS X, using [Homebrew](http://brew.sh)): `brew install hub`.
- Install [Yeoman](http://yeoman.io/): `sudo npm install -g yo`.
- Install the generator: `sudo npm install -g generator-globegraphic`.
- If you want to commit your project to version control (highly recommended), you'll need to create a [GitHub](http://github.com) or [Bitbucket](http://bitbucket.org) account. Bitbucket offers unlimited free repositories. GitHub does not, but it is a much better tool. You decide.

## Creating a new project
- Create the folder and cd into it: `mkdir myProject && cd $_`.
- Invoke the generator: `yo globegraphic`.
- Follow all prompts.

## Guide

The generator creates various folders and files. Here's a guide to the important bits.

### HTML

Put your graphic's html in `html/graphic.html`, specifically inside `<div id='gf'></div>`. Don't delete this element, otherwise the graphic won't load.

### CSS

Put your CSS in `css/_layout.scss`.

### JavaScript

Put your JavaScript in `js/globe.graphic.js`, specifically inside the `globe.graphic` function. If you need to load external libraries (e.g. [Leaflet](http://leafletjs.com/) or [D3](http://d3js.org/)), there are two ways to do it:

1. Use [Bower](http://bower.io/) from the command line. For example, to install D3, run `bower install d3 --save`. For Leaflet: `bower install leaflet --save`.
2. Download the library manually. Place it in the `js/libs` folder.

Either way, you'll now have to reference the library in `html/js.html`. For example, for D3, add `<script src='js/libs/d3/d3.js'></script>`.

## Usage
- Run `gulp` to start the server at [http://localhost:5000](http://localhost:5000).
- Run `gulp prod` to deploy all assets to PROD.jpt.

## TODO

- mention sublime project and hiding
- mention templates
- explain why no delete gf
- add basic templ
- explain what happens during minification/compression 
## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)