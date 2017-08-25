'use strict';
const gulp = require('gulp');
const clean = require('gulp-clean');

gulp.task('clean spec', () => {
  gulp.src('**/*.spec.*', {read: false})
  .pipe(clean());
});
