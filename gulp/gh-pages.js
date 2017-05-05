'use strict';

var gulp        = require('gulp');
var deploy      = require('gulp-gh-pages');

gulp.task('deploy', function() {
  console.log("To gh-pages we go!");
  return gulp.src("./dist/**/*")
    .pipe(deploy());
});
