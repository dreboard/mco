/*
npm install gulp-sass --save-dev
npm install gulp-uglify --save-dev
npm install gulp-plumber --save-dev
npm install gulp-rename --save-dev
npm install gulp-sourcemaps --save-dev
*/
//
var gulp = require('gulp'),
	uglify = require('gulp-uglify'),
	sass = require('gulp-sass'),
	plumber = require('gulp-plumber'),
	gulpConcat = require('gulp-concat'),
	sourcemaps = require('gulp-sourcemaps');

function errorLog(error){
	console.error.bind(error);
	this.emit('end');
}


//Javascript taks
gulp.task('js', function () {
    return gulp.src('js/app/**/*.js') //select all javascript files under js/ and any subdirectory
		.pipe(sourcemaps.init({loadMaps: true}))
        .pipe(gulpConcat('js/scripts.min.js')) //the name of the resulting file
        .pipe(uglify())
		.pipe(sourcemaps.write('./maps'))
        .pipe(gulp.dest('./')) //the destination folder
        //.pipe(notify({ message: 'Finished minifying JavaScript'}));
});


/*
.pipe(sass({outputStyle: 'compressed'}))
*/
var sassOptions = {
  errLogToConsole: true,
  outputStyle: 'compressed'
};

//Styles and sass taks
gulp.task('sass', function () {

  gulp.src('css/sass/**/*.scss')
  	.pipe(sourcemaps.init())
    .pipe(sass.sync()
	.pipe(sass({outputStyle: 'compressed'}))
	.on('error', sass.logError))
	.pipe(sourcemaps.write('../maps/css'))
    .pipe(gulp.dest('./css'));
});


//Watch for changes
gulp.task('watch', function(){
	//gulp.watch('**/*.js', ['scripts']);
	//gulp.watch('styles.scss', ['sass']);
});

gulp.task('default', ['js', 'sass']);
