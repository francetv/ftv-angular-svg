var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sequence = require('run-sequence');
var del = require('del');
var htmlmin = require('gulp-htmlmin');
var template = require('gulp-angular-templatecache');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var svgsprite = require('gulp-svg-sprite');

var buildDir = 'dist';
var appName = 'component';
var js = {
    dest: buildDir,
    app: {
        name: appName + '.js',
        nameMin: appName + '.min.js',
        files: [
            // on server need version 1.8.3+1
            "./component.js",
        ]
    },
    templates: {
        name: 'templates.js',
        files: [
            'templates/**/*.html',
        ]
    }
};

var svg = {
    files: './svg/*.svg'
};

/************************************ js ********************************************/

gulp.task('js-template', function () {
    return gulp.src(js.templates.files)
        .pipe(htmlmin({collapseWhitespace: true}))
        .pipe(template(js.templates.name, {
            module:     'ftv.components.svg.templates',
            standalone: true,
            root: '/svg/'
        }))
        .pipe(gulp.dest(js.dest));
});

gulp.task('js-module', function() {
    var files = js.app.files;
    files.push(js.dest + '/' + js.templates.name);

    return gulp.src(files)
        .pipe(concat(js.app.name))
        .pipe(gulp.dest(js.dest));
});

gulp.task('js', function(callback) {
    sequence('js-template', 'js-module', callback);
});

gulp.task('js-min', function() {
    return gulp.src(js.dest + '/' + js.app.name)
        .pipe(uglify())
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(gulp.dest(js.dest));
});

gulp.task('build-js', function(callback) {
    sequence('js-template', 'js', callback);
});

/************************************ general ********************************************/

gulp.task('cleanup', function(cb) {
    return del(buildDir, cb);
});

gulp.task('build', function(callback) {
    sequence('build-common', 'js-min', callback);
});

gulp.task('build-common', function(callback) {
    sequence('cleanup', 'js', callback);
});

gulp.task('build-dev', function(callback) {
    sequence('build-common', callback);
});

gulp.task('refresh-js-src', function(callback) {
    sequence('build-js', callback);
});

gulp.task('build-dev-watch', function(callback) {
    sequence('build-dev', 'watch', callback);
});

gulp.task('watch', function() {
    gulp.watch(js.app.files, ['refresh-js-src']);
    gulp.watch(svg.files, ['svg']);
});

gulp.task('jenkins-tests', function (callback) {
    sequence('test', 'test-responsive', 'mocha-test-seo', callback);
});

gulp.task('lint', function(callback) {
    sequence('js-lint', callback);
});

gulp.task('js-lint', function() {
    return gulp.src([
            js.app.files[0],
        ])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

/************************************ SVG ********************************************/

gulp.task('svg', function(){
    return gulp.src('./svg/*.svg')
        .pipe(svgsprite({
            mode: {
                symbol: {
                    dest:'./',
                    sprite: 'sprite.svg'
                }
            }
        }))
        .pipe(gulp.dest('./svg/sprite'))
});
