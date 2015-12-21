var gulp = require("gulp"),
	browserSync = require('browser-sync'),
	modernizr = require('gulp-modernizr');


gulp.task('server', function () {
	browserSync({
		port: 9000,
		server: {
			baseDir: 'app'
		}
	});
});
	

gulp.task('watch', function () {
	gulp.watch([
		'app/*.html',
		'app/js/**/*.js',
		'app/css/**/*.css'
		]).on('change', browserSync.reload);
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