'use strict';

import config from '../config';
import gulp from 'gulp';

gulp.task('pages', function() {

    return gulp.src(config.pages.src)
        .pipe(gulp.dest(config.pages.dest))
});