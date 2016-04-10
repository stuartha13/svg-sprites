import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import del from 'del';

const src = {
  scss: './src/scss'
};

const dest = {
  css: './dist/css'
};

const scssOpts = {
  outputStyle: 'compact'
};

const autoprefixerOpts = {
  browsers: ['last 2 versions'],
  cascade: false
};

gulp.task('scss', () =>
  gulp.src(`${src.scss}/**/base.scss`)
    .pipe(sass(scssOpts)
    .on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOpts))
    .pipe(gulp.dest(dest.css))
);

gulp.task('clean', () => del(['./dist']));

gulp.task('default', ['clean', 'scss']);
