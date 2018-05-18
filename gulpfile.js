/**
 * Created by Witt on 2016/3/20.
 */
const gulp = require('gulp'),
  rubySass = require('gulp-ruby-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  rename = require('gulp-rename'),
  uglify = require('gulp-uglify')


gulp.task('sass', function () {
  return rubySass('./src/sass/scss/*.scss', { sourcemap: true })
    .on('error', rubySass.logError)
    .pipe(sourcemaps.write('../css', {
      includeContent: false,
      sourceRoot: 'source',
    }))
    .pipe(gulp.dest('./src/css'))
})

gulp.task('js', function () {
  return gulp.src('./src/js/*.js')
    .pipe(rename({ suffix: '.min' }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
})

gulp.task('watch', function () {
  gulp.run('sass')
  gulp.watch(['./src/sass/scss/*.scss', './src/sass/components/*.scss', './src/sass/stylesheets/bootstrap/*.scss'], function () {
    gulp.run('sass')
  })
})

gulp.task('default', function () {
  gulp.start('sass')
})