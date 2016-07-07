'use strict';

const angularFilesort = require('gulp-angular-filesort'),
  browserSync = require('browser-sync'),
  concat = require('gulp-concat'),
  del = require('del'),
  gulp = require('gulp'),
  ngAnnotate = require('gulp-ng-annotate'),
  proxyMiddleware = require('http-proxy-middleware'),
  rename = require("gulp-rename"),
  uglify = require('gulp-uglify'),
  babel = require('gulp-babel');

const babelOptions = {presets: ['es2015']};

const paths = {
  scripts: [
    './web-src/js/app.js',
    './web-src/js/app-*.js',
    './web-src/js/extensions.js',
    './web-src/js/components.js'
  ],
  static: [
    './web-src/css/*.css',
    './web-src/img/*',
    './web-src/index.html'
  ],
  concat: [{
    'src': './web-src/components/*/*.js',
    'name': 'components.js'
  }, {
    'src': [
      './node_modules/angular-route/angular-route.min.js',
      './node_modules/angular-resource/angular-resource.min.js',
      './node_modules/angular-animate/angular-animate.min.js',
      './node_modules/angular-aria/angular-aria.min.js',
      './node_modules/angular-material/angular-material.min.js',
      './node_modules/angular-messages/angular-messages.min.js'
    ],
    'name': 'angular-bundle.js'
  }],
  partials: ['./web-src/partials/*.html'],
  JSLibs: [
    './node_modules/jquery/dist/jquery.min.js',
    './node_modules/angular/angular.min.js',
    './node_modules/bootstrap/dist/js/bootstrap.min.js'
  ],
  CSSLibs: [
    './node_modules/bootstrap/dist/css/bootstrap.min.css'
  ],
  FontLibs: []
};

gulp.task('default', ['build']);
gulp.task('build', ['uglify', 'concat', 'copyCSSLibs', 'copyFontLibs', 'copyJSLibs', 'copyStatic']);

gulp.task('uglify', function () {
  return gulp.src(paths.scripts)
    .pipe(babel(babelOptions))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('./web/js/'));
});

gulp.task('copyStatic', function () {
  return gulp.src(paths.static, {base: 'web-src'})
    .pipe(gulp.dest('./web'));
});

gulp.task('copyJSLibs', function () {
  return gulp.src(paths.JSLibs)
    .pipe(gulp.dest('./web/js'));
});

gulp.task('copyCSSLibs', function () {
  return gulp.src(paths.CSSLibs)
    .pipe(gulp.dest('./web/css'));
});

gulp.task('copyFontLibs', function () {
  return gulp.src(paths.FontLibs)
    .pipe(gulp.dest('./web/fonts'));
});

gulp.task('concat', function () {
  return paths.concat.forEach(function (obj) {
    return gulp.src(obj.src)
      .pipe(angularFilesort())
      .pipe(concat(obj.name))
      .pipe(rename(function (path) {
        path.basename += '.min';
        return path;
      }))
      .pipe(gulp.dest('./web/js'));
  });
});

gulp.task('clean', function () {
  return del([
    './web/'
  ]);
});

// Gulp Serve
function browserSyncInit(baseDir) {
  var server = {
    baseDir: baseDir
  };

  server.middleware = proxyMiddleware(['/rest'], {target: 'http://localhost:8080'});

  browserSync.instance = browserSync.init({
    startPath: '/',
    server: server,
    browser: 'default'
  });
}

gulp.task('serve', ['build'], function () {
  browserSyncInit(['./web-src', './web']);
});
