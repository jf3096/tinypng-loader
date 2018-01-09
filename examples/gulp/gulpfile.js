const gulp = require('gulp');
const gulpTinyPng = require('../../gulp/index');

gulp.task('tinypng', function (cb) {
    gulp.src('test/dist/**/*')
        .pipe(gulpTinyPng({maxConcurrency: 10}))
        .pipe(gulp.dest('test/dist'))
        .on('end', cb);
});