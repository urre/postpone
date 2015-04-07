var gulp = require('gulp');
/*-------------------------------------------------------------------
	
	Sync plugin folder with WP test environment every time we save

-------------------------------------------------------------------*/
var watch = require('gulp-watch');

var source = './',
    destination = '/Applications/mamp/htdocs/plugintest/wp-content/plugins/postpone/';

gulp.task('default', function() {  
  gulp.src(source + '/**/*', {base: source})
    .pipe(watch(source, {base: source}))
    .pipe(gulp.dest(destination));
});