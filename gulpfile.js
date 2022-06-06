const gulp = require("gulp");
const sass = require('gulp-sass')(require('sass'));
const sourcemaps = require('gulp-sourcemaps');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();

function server(cb) {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        host: "192.168.0.24",
    });
    cb();
}

function css() {
    return gulp.src('./scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            outputStyle: 'expanded' //compressed
        }).on('error', sass.logError))
        .pipe(autoprefixer())
        .pipe(sourcemaps.write("."))
        .pipe(gulp.dest('./css'))
        .pipe(browserSync.stream())
}

function watch(cb) {
    gulp.watch("./scss/**/*.scss", gulp.series(css))
    gulp.watch("./*.html").on('change', browserSync.reload);
    cb();
}

module.exports.css = css;
module.exports.watch = watch;
module.exports.server = server;
module.exports.default = gulp.series(server, css, watch);