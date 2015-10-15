// jqyu's big fun gulpfile

var gulp        = require('gulp');
var gutil       = require('gulp-util');
var notify      = require('gulp-notify');

var babelify    = require('babelify');
var browserify  = require('browserify');
var htmlreplace = require('gulp-html-replace');
var nodemon     = require('gulp-nodemon');
var sass        = require('gulp-sass');
var source      = require('vinyl-source-stream');
var streamify   = require('gulp-streamify');
var uglify      = require('gulp-uglify');
var watchify    = require('watchify');

var paths = {
  dest: 'dist',
  public: 'public',
  html: 'app/index.html',
  js: {
    entry: 'app/js/index.js',
    out: 'build.js',
    dest: 'dist/src',
    minified: {
      out: 'build.min.js',
      dest: 'dist/build'
    }
  },
  sass: {
    src: 'app/scss/**/*.scss',
    dest: 'dist/css'
  }
}

gulp.task('default', ['html:copy', 'html:watch', 'sass:build', 'sass:watch', 'js:watch', 'webserver']);
gulp.task('production', ['html:replace', 'sass:build', 'js:build']);

 //-------------------------------\\
// web server stuff ---------------\\

var gNODE = gutil.colors.inverse.green("NODE:");
gulp.task('webserver', function() {
  var nm = nodemon({
    script: 'index.js',
    ext: 'js',
    ignore: ['.git', 'node_modules/**/node_modules', 'app', 'dist'],
    env: { 'NODE_ENV': 'development' }
  });
  nm.on('restart', function() {
    gutil.log(gNODE, "Restarting..."); 
  })
});

 //-------------------------------\\
// html stuff ---------------------\\

var gHTML = gutil.colors.inverse.yellow("HTML:");

gulp.task('html:copy', function() {
  gutil.log(gHTML, "Copying...");

  var dest = gulp.dest(paths.dest);

  gulp.src(paths.html)
    .pipe(dest);
});

gulp.task('html:replace', function() {
  var replace = htmlreplace({
    'js': 'build/'+paths.js.minified.out
  });
  var dest = gulp.dest(paths.dest);

  gulp.src(paths.html)
    .pipe(replace)
    .pipe(dest);
});

gulp.task('html:watch', function() {
  gulp.watch(paths.html, ['html:copy']);
});

 //-------------------------------\\
// js stuff -----------------------\\

var gJS = gutil.colors.inverse.blue("JS:");

gulp.task('js:build', function() {
  var out = source(paths.js.minified.out);
  var ugly = streamify(uglify());
  var dest = gulp.dest(paths.js.minified.dest);

  var bundler = browserify({
    entries: [paths.js.entry],
    transform: [babelify]
  });

  bundler
    .bundle()
    .pipe(out)
    .pipe(ugly)
    .pipe(dest);
});

gulp.task('js:watch', function() {

  var bundler = browserify({
    entries: [paths.js.entry],
    transform: [babelify],
    debug: true,
    cache: {},
    packageCache: {},
    fullPaths: true
  });

  bundler = watchify(bundler);

  var handleError = function() {
    var args = Array.prototype.slice.call(arguments);
    notify.onError({
      title: "Bundling Error:",
      message: "<%= error.message %>"
    }).apply(this, args);
    this.emit('end'); // Keep gulp from hanging on this task
  }

  var rebundle = function() {
    gutil.log(gJS, "Rebundling...");

    var stream = bundler.bundle();
    var out = source(paths.js.out);
    var dest = gulp.dest(paths.js.dest);
    return stream.on('error', handleError)
            .pipe(out)
            .pipe(dest);
  }

  bundler.on('update', rebundle);
  return rebundle();
});

 //-------------------------------\\
// sass stuff ---------------------\\

var gSASS = gutil.colors.inverse.magenta("SASS:");

gulp.task('sass:build', function() {
  gutil.log(gSASS, "Rebuilding...");
  var sasser = sass.sync().on('error', sass.logError);
  var dest = gulp.dest(paths.sass.dest);
  gulp.src(paths.sass.src)
    .pipe(sasser)
    .pipe(dest);
});

gulp.task('sass:watch', function() {
  gulp.watch(paths.sass.src, ['sass:build']);
});
