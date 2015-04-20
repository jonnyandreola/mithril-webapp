'use strict'

// Load gulp
var gulp = require('gulp');

// Modules container
var $ = {};

// Modules declaration
var modules = {
        concat     : 'gulp-concat',
        del        : 'del',
        sass       : 'gulp-ruby-sass',
        rename     : 'gulp-rename',
        minify_css : 'gulp-minify-css',
        version    : 'gulp-rev',
        uglify     : 'gulp-uglify',
        inject     : 'gulp-inject',
        autoprefix : 'gulp-autoprefixer',
        jshint     : 'gulp-jshint',
        size       : 'gulp-size',
        browserSync: 'browser-sync'
    };

// Load all modules into modules container
for(var key in modules) {
    if (modules.hasOwnProperty(key)) {
        $[key] = require(modules[key]);
    }
}


///////////////////////
// DEVELOPMENT TASKS //
///////////////////////

/////////////
// Scripts //
/////////////

/**
 * Concatenates all bower dependencies in components folder
 */
gulp.task('vendor', function(){

    // List of all dependencies
    var dependencies = [
        'bower_components/mithril/mithril.js'
    ];

    return gulp.src(dependencies)
    .pipe($.concat('vendor.js'))
    .pipe(gulp.dest('./'));
});

/**
 * Concatenates all application scripts in assets/js folder
 */
gulp.task('script', function(){
    return gulp.src('app/**/*.js')
    .pipe($.jshint())
    .pipe($.jshint.reporter('default'))
    .pipe($.concat('app.js'))
    .pipe(gulp.dest('./'));
});


////////////
// Styles //
////////////

/**
 * Compile style
 */
gulp.task('style', function() {
    return $.sass('./content/sass/main.sass')
    .pipe(gulp.dest('./main.css'));
});


//////////////////
// Browser Sync //
//////////////////
gulp.task('serve', function (cb) {
      $.browserSync({
        files: ['./*.{js,css,html}'],
        port: 8080,
        notify: false,
        server: {
          baseDir: './',
          index: 'index.html'
        }
      }, cb)
    });


///////////////
// MAIN TASK //
///////////////

/**
 * Sets watchers and triggers appropriate tasks
 */
gulp.task('default', ['script', 'vendor', 'serve'], function() {

    // Watch for scripts changes
    gulp.watch('./**/*.js', ['script']);

    // Watch for SASS changes
    // gulp.watch('./**/*.sass', ['style']);
});
