# Optinoud

Optinoud lets you write ES6+ and SASS snippets, while transpiling to ES5+CSS, and live injecting it into a specified website.

## (Only when not installed through the Optinoud Yeoman generator)

Manually intialize the packages in the currect directory once by running:

```shell
npm install
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

### Adding images

To add images, just drop them in the `/src` folder. These will now be relatively accessible through the URL, i.e. `/example.jpg`.
