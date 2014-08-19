# generator-globeproject

Yeoman generator for a Boston Globe project. Supports SASS, Compass, Lodash templates, includes Bitbucket/GitHub integration. Concatenates/uglifies/minifies everything to one file.

Also known as **MAGIC**.

Please note: do not reproduce Boston Globe logos or fonts without written permission.

## Prerequisites

- Install [Node.js](http://nodejs.org/).
- Install [hub](https://github.com/github/hub) (on OS X, using [Homebrew](http://brew.sh)): `brew install hub`.
- Install [Yeoman](http://yeoman.io/), [Gulp](https://github.com/gulpjs/gulp), and this generator: `sudo npm install -g yo gulp generator-globeproject`.
- Install various CSS utilities: `gem install sass compass breakpoint`.
- If you want to commit your project to version control (highly recommended), you'll need to create a [GitHub](http://github.com) or [Bitbucket](http://bitbucket.org) account. Bitbucket offers unlimited free repositories. GitHub does not, but it is a much better tool. You decide.

## Update

- To update the generator: `sudo npm update -g generator-globeproject`.

## Creating a new project
- Create the folder and cd into it: `mkdir myProject && cd $_`.
- Invoke the generator: `yo globeproject`.
- Follow all prompts.
- Once the generator finishes scaffolding, run `npm install`.
- To add a new graphic to your project, run `yo globeproject:graphic`.
- NOTE: if you get an error mentioning "Please try running this command again as root/Administrator.", try running the same command as **super-user**. E.g. `sudo bower install`.

## Guide

Every graphic in your project has various folders and files. Here's a guide to the important bits.

### Editing HTML

Put your graphic's html in `graphics/<graphic>/html/graphic.html`, specifically inside `<div class='gf <graphic>'></div>`.

### Editing CSS

Put your CSS in `graphics/<graphic>/css/_layout.scss`.

### Editing JavaScript

Put your JavaScript in `graphics/<graphic>/js/globe.graphic.js`, specifically inside the `globe.graphic` function. If you need to load external libraries (e.g. [D3](http://d3js.org/)):

1. Use [Bower](http://bower.io/). If you're not familiar with this tool,
2. Download the library manually. Place it in the `libs` folder.

Either way, you'll now have to reference the library in `graphics/<graphic>/html/js.html`. For example, for D3, add `<script src='js/libs/d3/d3.js'></script>`.

## Usage

Run `gulp` and follow all prompts.

## Extras

### Sublime shortcut

- Install [Sublime Text](http://www.sublimetext.com/3) and [setup](http://crabonature.pl/posts/20-sublime-text-3-on-os-x-terminal) the super-handy `subl` alias.
- Now, from the command line, run `subl globeproject.sublime-project`. Sublime Text will hide all non-essentials folders and files. Much cleaner!

### Lodash templates

- [Lodash templates are cool!](http://lodash.com/docs#template) And this generator supports them out of the box. Create a lodash template, place it in `graphics/<graphic>/js/templates`, and make sure to name it `*.template` (e.g. `graphics/<graphic>/js/templates/table.template`). The generator will automatically compile all templates to `js/templates/templates.js`. Add this file to `graphics/<graphic>/html/js.html`, and done! To reference the template: `window.JST['story.template']({name: "gabriel"})`.

## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)
