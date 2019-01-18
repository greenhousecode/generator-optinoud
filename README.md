# Optinoud Yeoman generator

Generate an Optinoud instance wherever you like.

Optinoud lets you write ES6+ and SASS snippets, while transpiling to ES5+CSS, and live injecting it into a specified website.

## How to generate

Open a Terminal window and navigate to the folder where you want to generate an Optinoud setup:

```shell
cd /path/to/folder
```

Then initiate Optinoud through `npx`, and follow the steps:

```shell
npx -p yo -p generator-optinoud -c 'yo optinoud'
```

## Using Optinoud

In your project directory, just run:

```shell
npm start
```

By default, it will load `/src/variant.js`, transpile it to ES5, and inject it into the website specified while installing Optinoud.

You can load alternative scripts by using the `optinoud` URL parameter. E.g: `?optinoud=example` will load `/src/example.js`.

### Adding SASS

To add static CSS, create a `.scss` file with the same filename as the `.js` file in `/src`. The SASS file will get transpiled to CSS, and inserted into the `.js` file in `/dist`.
