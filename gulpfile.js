'use strict';

var gulp    = require('gulp'),
del         = require('del'),
fs          = require('fs'),
concat      = require('gulp-concat'),
copy        = require('gulp-copy'),
filter      = require('gulp-filter'),
gzip        = require('gulp-gzip'),
htmlreplace = require('gulp-html-replace'),
rename      = require('gulp-rename'),
s3          = require('gulp-s3'),
ghPages     = require('gulp-gh-pages'),
uglify      = require('gulp-uglify');

var options = {
  headers: {'Cache-Control': 'max-age=315360000, no-transform, public'},
  gzippedOnly: true
};

// var aws = JSON.parse(fs.readFileSync('./aws.json'));

gulp.task('clean', function(cb) {
  del(['dist/**/*'], cb);
});

gulp.task('copy-images', function(){
  return gulp.src('./src/img/**/*')
    .pipe(gulp.dest('./dist/img'));
});

gulp.task('copy-css', function(){
  return gulp.src('./src/css/**/*')
    .pipe(gulp.dest('./dist/css'));
});

gulp.task('copy-assets', [
  'copy-images',
  'copy-css'
]);

gulp.task('build-html', function(){
  return gulp.src('./src/index.html')
    .pipe(htmlreplace({
      'js': 'js/bundle.min.js'
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('compress-js', function(){
  return gulp.src([
    './src/js/main.js',
    './src/js/plugins.js' ])
    .pipe(concat('bundle.min.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/js'));
})

gulp.task('copy-vendor-js', function(){
  return gulp.src('./src/js/vendor/**/*')
    .pipe(gulp.dest('./dist/js/vendor'));
});

gulp.task('build', [
  'copy-assets',
  'build-html',
  'compress-js',
  'copy-vendor-js'
]);

gulp.task('publish-ghp', function(){
  return gulp.src('./dist/**/*')
    .pipe(ghPages());
});

gulp.task('publish-s3', function(){
  return gulp.src('./dist/**/*')
    .pipe(gzip())
    .pipe(s3(aws, options));
});
