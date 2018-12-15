const gulp = require('gulp');
const rename = require('gulp-rename');

gulp.task('serve', () => {
  const browserSync = require('browser-sync').create();
  const reload = browserSync.reload;

  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });

  gulp.watch("dist/*.*").on("change", reload);
});

gulp.task('html', () => {
  return gulp
    .src('./app/*.html')
    .pipe(gulp.dest('./dist'))
});

gulp.task('sass', () => {
  const sass = require('gulp-sass');
  const postcss = require('gulp-postcss');
  const autoprefixer = require('autoprefixer');
  const minify = require('gulp-clean-css');

  let sassOptions = {
    errLogToConsole: true,
    outputStyle: 'expanded'
  }
  
  return gulp
    .src('./app/*.sass')
    .pipe(rename(path => { path.basename += ".min"; }))
    .pipe(sass(sassOptions)).on('error', sass.logError)
    .pipe(postcss([autoprefixer()]))
    .pipe(minify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('javascript', () => {
  const uglify = require('gulp-uglify-es').default;

  return gulp
    .src('./app/*.js')
    .pipe(rename(path => { path.basename += ".min"; }))
    .pipe(uglify())
    .pipe(gulp.dest('./dist'))
});

gulp.task('default', gulp.series('html', 'sass', 'javascript'));
