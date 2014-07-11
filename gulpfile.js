// include gulp
var gulp = require('gulp');

// include plug-ins
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var stripDebug = require('gulp-strip-debug');
var uglify = require('gulp-uglify');

// JS hint task
gulp.task('jshint', function() {
    gulp.src('./src/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// JS concat, strip debugging and minify
gulp.task('scripts', function() {
    gulp.src(['./src/soundmanager2.js', './src/*.js'])
        .pipe(concat('angular-soundmanager2.js'))
        .pipe(stripDebug())
        //.pipe(uglify())
        .pipe(gulp.dest('./dist/'));
});

// default gulp task
gulp.task('default', ['scripts'], function() {
    // watch for JS changes
    gulp.watch('./src/*.js', function() {
        gulp.run('scripts');
    });
});