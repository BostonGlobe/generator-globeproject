# generator-globegraphic

Yeoman generator for a Boston Globe graphic. Supports SASS, Compass, Lodash templates, includes Bitbucket/GitHub integration. Concatenates/uglifies/minifies everything to one file.

Also known as **MAGIC**.

Please note: do not reproduce Boston Globe logos or fonts without written permission.

## Prerequisites

- Install [Node.js](http://nodejs.org/).
- Install [hub](https://github.com/github/hub) (on OS X, using [Homebrew](http://brew.sh)): `brew install hub`.
- Install [Yeoman](http://yeoman.io/): `sudo npm install -g yo`.
- Install [Gulp](https://github.com/gulpjs/gulp): `sudo npm install -g gulp`.
- Install this generator: `sudo npm install -g generator-globegraphic`.
- Install various CSS utilities: `gem install sass compass breakpoint`.
- If you want to commit your project to version control (highly recommended), you'll need to create a [GitHub](http://github.com) or [Bitbucket](http://bitbucket.org) account. Bitbucket offers unlimited free repositories. GitHub does not, but it is a much better tool. You decide.

## Update

- To update the generator: `sudo npm update -g generator-globegraphic`.

## Creating a new project
- Create the folder and cd into it: `mkdir myProject && cd $_`.
- Invoke the generator: `yo globegraphic`.
- Follow all prompts.
- Once the generator finishes scaffolding, run `bower install` and `npm install`.
- NOTE: if you get an error mentioning "Please try running this command again as root/Administrator.", try running the same command as **super-user**. E.g. `sudo bower install`.

## Guide

The generator creates various folders and files. Here's a guide to the important bits.

### Editing HTML

Put your graphic's html in `html/graphic.html`, specifically inside `<div id='gf'></div>`.

### Editing CSS

Put your CSS in `css/layout.css` (or `css/_layout.scss`, if you're using Sass).

### Editing JavaScript

Put your JavaScript in `js/globe.graphic.js`, specifically inside the `globe.graphic` function. If you need to load external libraries (e.g. [Leaflet](http://leafletjs.com/) or [D3](http://d3js.org/)), there are two ways to do it:

1. Use [Bower](http://bower.io/) from the command line. For example, to install D3, run `bower install d3 --save`. For Leaflet: `bower install leaflet --save`.
2. Download the library manually. Place it in the `js/libs` folder.

Either way, you'll now have to reference the library in `html/js.html`. For example, for D3, add `<script src='js/libs/d3/d3.js'></script>`.

## Usage

### Development

The following commands will start a server at [http://localhost:5000](http://localhost:5000). The generator will auto-reload the browser on file changes. Hit `control+c` to stop either server.

- `gulp standalone` for **standalone** graphic.
- `gulp homepage` for **homepage** graphic.

### Production

The following commands will create a PROD.jpt. This file will contain everything inlined - HTML, CSS, JS - so you can copy+paste into Methode.

- `gulp standalone-prod` for **standalone** graphic.
- `gulp homepage-prod` for **homepage** graphic.

## Extras

### Sublime shortcut

- Install [Sublime Text](http://www.sublimetext.com/3) and [setup](http://crabonature.pl/posts/20-sublime-text-3-on-os-x-terminal) the super-handy `subl` alias.
- Now, from the command line, run `subl globegraphic.sublime-project`. Sublime Text will hide all non-essentials folders and files. Much cleaner!

### Lodash templates

- [Lodash templates are cool!](http://lodash.com/docs#template) And this generator supports them out of the box. Create a lodash template, place it in `js/templates`, and make sure to name it `*.template` (e.g. `js/templates/table.template`). The generator will automatically compile all templates to `js/templates/templates.js`. Add this file to `html/js.html`, and done! To reference the template: `window.JST['story.template']({name: "gabriel"})`.

- Note: if the `templates/templates.js` file is not there or has been deleted, run `gulp` again in the command line.

## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)
