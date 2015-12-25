var gulp = require("gulp"),
	browserSync = require('browser-sync'),
    wiredep = require('wiredep').stream,
	modernizr = require('gulp-modernizr');

// сборка html css javascript + удаление папки dist
var rimraf = require('gulp-rimraf'),    
    useref = require('gulp-useref'),    
    uglify = require('gulp-uglify'),
    gulpif = require('gulp-if'), 
    minifyCss = require('gulp-minify-css');

// финальная сборка
var filter = require('gulp-filter'), 
    imagemin = require('gulp-imagemin'),
    size = require('gulp-size');

var pass = require('./host.js');

// Перенос шрифтов
        gulp.task('fonts', function() {
          gulp.src('app/fonts/*')
            .pipe(filter(['*.eot','*.svg','*.ttf','*.woff','*.woff2']))
            .pipe(gulp.dest('dist/fonts/'))
        });

// Картинки
        gulp.task('images', function () {
          return gulp.src('app/img/**/*')
            .pipe(imagemin({
              progressive: true,
              interlaced: true
            }))
            .pipe(gulp.dest('dist/img'));
        });

// Остальные файлы, такие как favicon.ico и пр.
        gulp.task('extras', function () {
          return gulp.src([
            'app/*.*',
            '!app/*.html'
          ]).pipe(gulp.dest('dist'));
        });


gulp.task('server', function () {
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});

// Загружаем сервер
gulp.task('server-dist', function () {  
  browserSync({
    port: 9000,
    server: {
      baseDir: 'dist'
    }
  });
});

gulp.task('watch', function () {
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
		]).on('change', browserSync.reload);
        gulp.watch('bower.json', ['wiredep']);
});



gulp.task('modernizr', function() {
  gulp.src('app/js/**/*.js')
    .pipe(modernizr(
    	{
    // Avoid unnecessary builds (see Caching section below)
    "cache" : true,

    // Path to the build you're using for development.
    "devFile" : false,

    // Path to save out the built file
    "dest" : false,

    // Based on default settings on http://modernizr.com/download/
    "options" : [
        "setClasses",
        "addTest",
        "html5shiv"
    ],

    "tests": ['placeholder', 'opacity'],

    // By default, source is uglified before saving
    "uglify" : true,
}
    	))
    .pipe(gulp.dest("app/js/bower"))
});



gulp.task('default', ['modernizr','server', 'watch']);





// Следим за bower
    gulp.task('wiredep', function () {
      gulp.src('app/*.html')
        .pipe(wiredep())
        .pipe(gulp.dest('app/'))
    });

// Переносим HTML, CSS, JS в папку dist 
    gulp.task('useref', function () {
      return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify()))
        .pipe(gulpif('*.css', minifyCss({compatibility: 'ie8'})))
        .pipe(gulp.dest('dist'));
    });

    // Очистка
        gulp.task('clean', function() {
            return gulp.src('dist', { read: false }) 
            .pipe(rimraf());
        });


// Сборка и вывод размера содержимого папки dist
gulp.task('dist', ['useref', 'images', 'fonts', 'extras'], function () {
  return gulp.src('dist/**/*').pipe(size({title: 'build'}));
});

// Собираем папку DIST (только после компиляции Jade)
gulp.task('build', ['clean'], function () {
  gulp.start('dist');
});



// Отправка проекта на сервер
 var gutil = require('gulp-util'),
     ftp = require('vinyl-ftp');

    gulp.task( 'deploy', function() {

          var conn = ftp.create( {
              host:     'yammounie.ru',
              user:     pass.l,
              password: pass.p,
              parallel: 10,
              log: gutil.log
          } );

          var globs = [
              'dist/**/*'
          ];

          return gulp.src(globs, { base: 'dist/', buffer: false })
            .pipe(conn.dest( 'public_html/'));

        });