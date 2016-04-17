import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import del from 'del';
import svgSprite from 'gulp-svg-sprite';
import cheerio from 'gulp-cheerio';

const src = {
  scss: './src/scss',
  icons: './src/icons'
};

const dest = {
  css: './dist/css',
  icons: './dist/icons'
};

const scssOpts = {
  outputStyle: 'compact'
};

const svgSpriteOpts = {
  shape: {
    dimension: {
      maxWidth: 64,
      maxHeight: 64
    },
    spacing: {
      padding: 2
    }
  },
  mode: {
    symbol: true
  },
  svg: {
    xmlDeclaration: false,
  },
};

const autoprefixerOpts = {
  browsers: ['last 2 versions'],
  cascade: false
};

gulp.task('scss', ['clean'], () =>
  gulp.src(`${src.scss}/**/base.scss`)
    .pipe(sass(scssOpts)
    .on('error', sass.logError))
    .pipe(autoprefixer(autoprefixerOpts))
    .pipe(gulp.dest(dest.css))
);

gulp.task('svg', ['clean'], () =>
  gulp.src(`${src.icons}/*.svg`)
    .pipe(svgSprite(svgSpriteOpts))
    .pipe(cheerio({
      run ($) {
        $('symbol:not([id$="-color"]) [fill]').removeAttr('fill');
        $('[fill-rule]').removeAttr('fill-rule');
      },
      parserOptions: { xmlMode: true }
    }))
    .pipe(gulp.dest(dest.icons))
);

gulp.task('clean', () => del(['./dist']));

gulp.task('default', ['scss', 'svg']);
