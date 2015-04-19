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
    return gulp.src('app/**/*.js'])
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
    return gulp.src(PATH.src.sass + '/main.sass')
    .pipe($.sass({
        'style': 'expanded',
        'sourcemap=none': true,
        'container':'jandreola-gulp-ruby-sass'
    }))
    .pipe($.autoprefix('last 2 versions', '> 1%', 'ie 8'))
    .pipe($.size({title: 'CSS: '}))
    .pipe(gulp.dest(PATH['public'].root));
});


////////////
// Images //
////////////
gulp.task('image', function(){
    return gulp.src(PATH.src.img + '/**/*.{jpg,jpeg,png,svg}')
        .pipe(gulp.dest(PATH['public'].img));
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
gulp.task('default', ['index'], function() {

    // Watch for scripts changes
    gulp.watch(PATH.src.js + '/**/*.js', ['script']);

    // Watch for SASS changes
    gulp.watch([PATH.src.sass + '/**/*.sass'], ['style']);
});
