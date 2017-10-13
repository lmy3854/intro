var gulp = require('gulp');
//var cleanCSS = require('gulp-clean-css');
var rename = require("gulp-rename");
var uglify = require('gulp-uglify');


// Minify compiled CSS
//gulp.task('minify-css', function() {
//  return gulp.src('css/notice/*.css')
//    .pipe(cleanCSS({
//      compatibility: 'ie8'
//    }))
//    .pipe(rename({
//      suffix: '.min'
//    }))
//    .pipe(gulp.dest('css/notice/'))
//});

// Minify custom JS
gulp.task('minify-js', function() {
  return gulp.src('js/notice/notice.js')
    .pipe(uglify())
    .pipe(rename({
      suffix: '.min'
    }))
    .pipe(gulp.dest('js/notice/'))
});

// Default task
gulp.task('default', ['minify-js']);
