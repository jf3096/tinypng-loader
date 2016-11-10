/**
 * Created by allen on 2016/11/4.
 */
import * as gulp from 'gulp';
import * as gulpTinyPng from './gulp/index';

gulp.task('tinypng', (cb) => {
    gulp.src(`test/img/**/*.png`)
        .pipe(gulpTinyPng())
        .pipe(gulp.dest('test/dist'))
        .on('end', cb);
});