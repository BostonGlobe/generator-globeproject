# generator-globeproject

Yeoman generator for a Boston Globe project. Supports SASS, Compass, Lodash templates, includes Bitbucket/GitHub integration. Concatenates/uglifies/minifies everything to one file.

Also known as **MAGIC**.

Please note: do not reproduce Boston Globe logos or fonts without written permission.

## Prerequisites

- Install [Node.js](http://nodejs.org/).
- Install [hub](https://github.com/github/hub) (on OS X, using [Homebrew](http://brew.sh)) and wget: `brew install hub wget git-extras`.
- Install [Yeoman](http://yeoman.io/), [Gulp](https://github.com/gulpjs/gulp), [the Lo-Dash cli](https://lodash.com/custom-builds), and this generator: `sudo npm install -g yo gulp lodash-cli generator-globeproject`.
- Install various CSS utilities: `gem install sass compass breakpoint`.
- If you want to commit your project to version control (highly recommended), you'll need to create a [GitHub](http://github.com) or [Bitbucket](http://bitbucket.org) account. Bitbucket offers unlimited free repositories. GitHub does not, but it is a much better tool. You decide.

## Update

- To update the generator: `sudo npm update -g generator-globeproject`.

## Creating a new project
- Create the folder and cd into it: `mkdir myProject && cd $_`.
- Invoke the generator: `yo globeproject`.
- Follow all prompts.
- Finally, run `npm install`. If this gives you any errors run it again as sudo, e.g. `sudo npm install`.

## Adding a new graphic to your project
- Run `yo globeproject:graphic` in your project's root directory.

## Guide

Every graphic in your project has various folders and files. Here's a guide to the important bits.

### Editing HTML

Put your graphic's html in `graphics/<graphic>/html/html.html`, specifically inside `<div class='<graphicType>-<graphic>'></div>`.

### Editing CSS

Put your CSS in `graphics/<graphic>/css/_layout.scss`.

### Editing JavaScript

Put your JavaScript in `graphics/<graphic>/js/main.js`.

#### Adding third-party libraries

If you need to load external libraries (e.g. [D3](http://d3js.org/)):

1. Install it with `npm` and require it, CommonJS style, like so: `var d3 = require('d3');`. If that didn't make any sense,
2. Use [Bower](http://bower.io/). If you're not familiar with this tool,
3. Download the library manually. Place it in the `libs` folder.

If you chose 2 or 3, you'll now have to reference the library in `graphics/<graphic>/html/js.html`. For example, for D3, add `<script src='js/libs/d3/d3.js'></script>`.

##### Examples

###### Leaflet

- `bower install leaflet`
- Add the following in `js.html` (make sure it's above the **bundle.js** reference): `<script src='../../libs/highcharts/highcharts.js'></script>`

## Usage

Run `gulp` and follow all prompts.

## Extras

### Sublime shortcut

- Install [Sublime Text](http://www.sublimetext.com/3) and [setup](http://crabonature.pl/posts/20-sublime-text-3-on-os-x-terminal) the super-handy `subl` alias.
- Now, from the command line, run `subl globeproject.sublime-project`. Sublime Text will hide all non-essentials folders and files. Much cleaner!

### Lodash templates

- [Lodash templates are cool!](http://lodash.com/docs#template) And this generator supports them out of the box. Create a lodash template, place it in `graphics/<graphic>/js/templates`, and make sure to name it `*.template` (e.g. `graphics/<graphic>/js/templates/table.template`). Templates are stored in `_.templates`, e.g.: `_.templates.mobile({name:"gabriel"})`.

### Precompiled Lodash templates (DISABLED AT THE MOMENT)

- If you want to create some html based on data, but don't want to do it in the client, you can precompile and render them to html. Uses the same Lodash templating style as our js templates.
- To use, create a <filename>.template file in the precompile folder. Create a JSON file with the same filename in the same folder.

```javascript
{"name": "jira", "age": 19}
```

```html
<p>Welcome {{name}}</p>
{= if(age < 21) { =}
	<p>You are too young to view this code</p>
{= } =}
```

- Run `gulp render-templates` to render all .template files in the precompile folder, output will be <filename>.html. Now you can just copy that over to your graphic html file.

### Google spreadsheet data to JSON (DISABLED AT THE MOMENT)
- Run `gulp spreadsheet` and follow the instructions on screen.
- Results will be put in the data folder as both csv and JSON.
- Note: to use this, you must publish your spreadsheet, and make it public to the web via the share options. The sheet key can be found in the url, as well as the gid for the different tabs.

## Contributors

- Gabriel Florit
- Russell Goldenberg
- Cecilia Reyes
- Andrew Tran

## License

MIT © [The Boston Globe](http://github.com/BostonGlobe)
