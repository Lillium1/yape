var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');
var minifyCSS = require('gulp-minify-css');

gulp.task('script', function(){
    gulp.src(['node_modules/jquery/dist/jquery.js', 'node_modules/bootstrap/dist/js/bootstrap.js', 'assets/js/*.js'])
    .pipe(concat('script.js'))
    //carpeta dist
    .pipe(gulp.dest('public/js'));
});

gulp.task('style', function(){
    gulp.src(['node_modules/bootstrap/dist/css/bootstrap.css', 'assets/sass/main.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(minifyCSS())
    .pipe(concat('style.min.css'))
    .pipe(gulp.dest('public/css'));
});

/**
 * task para el sass -> cambios de estilos
 */

gulp.task('watch', function() {
    gulp.watch('assets/sass/*.scss', ['style']);
});

gulp.task('watchjs', function() {
    gulp.watch('assets/js/*.js', ['script']);
});


/**
 * Le indicamos a gulp cuales son las tareas a ejecutar al correr el comando gulp
 */

gulp.task('default', ['script', 'style', 'watch', 'watchjs']);
