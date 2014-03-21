# generator-globegraphic

Yeoman generator for a Boston Globe graphic.

Also known as **MAGIC**.

## Prerequisites

- Install [Node.js](http://nodejs.org/).
- Install Yeoman: `npm install -g yo`.
- You will need a [Bitbucket](http://bitbucket.org) account, since this generator commits each project as a private Bitbucket repo.
- This generator also assumes you have [Sublime Text](http://www.sublimetext.com/3) installed.
- Finally, make sure to create the handy `subl` alias - see [here](http://www.sublimetext.com/docs/2/osx_command_line.html).

## Install

- You should have a globe projects folder. `cd` into it.
- Clone this repository: `git clone https://github.com/BostonGlobe/generator-globegraphic.git`
- cd into the generator: `cd generator-globegraphic`
- npm link it (for convenience): `npm link`
- cd out: `cd ..`
- Place a copy of the starter shell script in your projects folder: `cp generator-globegraphic/globegraphic.sh globegraphic.sh`

## Create a new project

- From your globe projects folder run the following: `sh globegraphic.sh <graphic-name>`
- The generator will install a number of things, then (optionally) ask for your Bitbucket credentials. After that, more things will be installed. Eventually the terminal activity will stop. Now go to [http://localhost:5000](http://localhost:5000).

## Tour

The following is a tour of the generator's various features. Create a new project and follow along!

#### Files

The generator creates various files:

- `HTML.hbs`: This is where you place the HTML. By default, the `title` is set to the project name - feel free to change it.


- `CSS.hbs`: **Most of the time you won't have to edit this file.** It tells the generator to include `boilerplate.css` if this is a regular igraphic.


- `JS.hbs`: **Most of the time you won't have to edit this file.** By default the generator assumes all your JavaScript code will be in `js/globe.graphic.js`. If you have more JS files, add them here.


- `css/boilerplate.css`: **Most of the time you won't have to edit this file.** This CSS gets included by default with the exception of homepage graphics. It's pretty handy - it styles the byline, subhed, makes the graphic 100% wide, hides all the .asides, and styles the source and credit section.


- `css/main.css`: Add your CSS code here.

#### Live reload

Every time you save changes to a file your browser will live reload its contents.


#### History screenshot generation

Every time you save changes to a file the generator creates two screenshots of the graphic, at 320px and 1024px wide, and saves them in the `history` folder.


#### Easy methode deploy

When you're ready to put your code in Methode run the following command: `grunt deploy`. This will create a `DEPLOY.jpt` file that contains all your HTML, CSS and JS concatenated and minified. All you have to do is copy the contents of this file over to the Methode JPT.


#### Working with images

Place your images in `globegraphic_img` and reference them as usual in `HTML.hbs`. When you run `grunt deploy` the generator will insert the appropriate Methode image tags.


#### Target homepage

By default, the generator will use an igraphic template. Run `grunt --env=homepage` to target the homepage.


#### Installing JavaScript libraries

Say you want to use **D3**. Run the following command: `bower install d3 --save`. That's it - now you can start using D3. This magic is made possible by [Bower](http://bower.io/). Tip: search for all libraries in bower with the following command: `bower search <library>`.



#### Handlebar templates compilation

If you'd like to use Handlebars, place your templates in `js/templates`. The generator will compile the templates and bundle them with the rest of the JavaScript. To reference the precompiled templates in your code, do the following:

- Install handlebars with bower: `bower install handlebars --save-dev`
- For reasons beyond me, you'll have to add the handlebars.runtime.js reference manually to JS.hbs.
- Also add a reference to the compiled templates manually to JS.hbs: `<script src='js/templates/templates.js'></script>`
- Note how to refer to the template - e.g. `var template = this["JST"]["js/templates/races.template"];`

## TODO

- should it ask you if you're planning to make a fullscreen mobile map?
- add css comments with globe type stack
