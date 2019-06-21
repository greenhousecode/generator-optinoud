const fs = require('fs');
const gulp = require('gulp');
const fn = require('gulp-fn');
const sass = require('gulp-sass');
const babel = require('gulp-babel');
const insert = require('gulp-insert');
const uglify = require('gulp-uglify');
const replace = require('gulp-replace');
const cleanCss = require('gulp-clean-css');
const browserSync = require('browser-sync');
const prependFile = require('prepend-file');

let variant = 'variant';

const getVariantFromUrl = (url) => {
  const matches = url.match(/optinoud=([^#&]+)/);

  if (matches && matches[1]) {
    return fs.existsSync(`src/${matches[1]}.js`)
      ? matches[1]
      : 'variant';
  }

  return variant;
};

gulp.task('img', () => gulp
  .src('src/*.{png,gif,jpg}')
  .pipe(gulp.dest('dist')));

gulp.task('js', () => gulp
  .src('src/*.js')
  .pipe(babel({ presets: [['@babel/env', { targets: { browsers: ['>1%'] } }]] }))
  .pipe(uglify({ mangle: { toplevel: true } }))
  .pipe(replace('"use strict";', ''))
  .pipe(insert.prepend('(function(){'))
  .pipe(insert.append('}());'))
  .pipe(gulp.dest('dist')));

gulp.task('sass', () => gulp
  .src('src/*.scss')
  .pipe(sass())
  .pipe(cleanCss())
  .pipe(fn((file) => {
    const jsFilePath = file.path
      .replace('/src', '/dist')
      .replace('\\src', '\\dist')
      .replace('.css', '.js');

    const css = file.contents
      .toString('utf8')
      .replace(/'/g, '\\\'');

    const js = `(function(){var i=document.createElement('style');i.type='text/css';i.appendChild(document.createTextNode('${css}'));document.head.appendChild(i);}());`;

    prependFile(jsFilePath, js);
  })));

gulp.task('reload', (done) => {
  browserSync.reload();
  done();
});

gulp.task('browser-sync', (done) => {
  if (!fs.existsSync(`src/${variant}.js`)) {
    throw new Error(`"src/${variant}.js" doesn't exist!`);
  }

  browserSync.init({
    proxy: {
      target: '<%= website %>',
      middleware: (req, res, next) => {
        variant = getVariantFromUrl(req.url);
        next();
      },
    },
    serveStatic: ['dist'],
    rewriteRules: [{
      match: '</body>',
      fn: () => `<script src="/${variant}.js"></script></body>`,
    }],
  }, done);
});

gulp.task('build', gulp.series('img', 'js', 'sass'));
gulp.task('watch', () => gulp.watch('src/*', gulp.series('build', 'reload')));
gulp.task('default', gulp.series('build', 'browser-sync', 'watch'));
