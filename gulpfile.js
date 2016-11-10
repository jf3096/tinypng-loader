"use strict";
/**
 * Created by allen on 2016/11/4.
 */
const gulp = require('gulp');
const gulpTinyPng = require('./gulp/index');
gulp.task('tinypng', (cb) => {
    gulp.src(`test/img/**/*`)
        .pipe(gulpTinyPng())
        .pipe(gulp.dest('test/dist'))
        .on('end', cb);
});
//# sourceMappingURL=gulpfile.js.map