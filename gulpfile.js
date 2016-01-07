// Settings

const PROJECT_NAME = "Papersheet";
const PROJECT_VERSION = "1.0.0-BETA";
const PROJECT_DESC = "The stylesheet for lazy people";
const PROJECT_CR = "Copyright (c) 2015 Adrien Navratil";

const SOURCES_FOLDER = 'src';

const BUILD_FOLDER = 'build';
const COMPILED_FOLDER = BUILD_FOLDER + '/compiled/css';
const MINIMIZED_FOLDER = BUILD_FOLDER + '/minimized/css';

const COMPASS_SETTINGS = { css: COMPILED_FOLDER, sass: SOURCES_FOLDER };

const LICENSE =
    "/*\n" +
    " * Copyright 2015 Adrien Navratil\n" +
    " *\n" +
    " * This file is part of Papersheet.\n" +
    " *\n" +
    ' * Papersheet is free software: you can redistribute it and/or modify\n' +
    ' * it under the terms of the GNU Lesser General Public License as published by\n' +
    " * the Free Software Foundation, either version 3 of the License, or\n" +
    " * (at your option) any later version.\n" +
    " *\n" +
    " * Papersheet is distributed in the hope that it will be useful,\n" +
    " * but WITHOUT ANY WARRANTY; without even the implied warranty of\n" +
    " * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the\n" +
    " * GNU Lesser General Public License for more details.\n" +
    " *\n" +
    " * You should have received a copy of the GNU Lesser General Public License\n" +
    " * along with Papersheet.  If not, see <http://www.gnu.org/licenses/>.\n" +
    " */\n" +
    "\n" +
    "/**\n" +
    " * Papersheet " + PROJECT_VERSION + "\n" +
    " * \n" +
    " * " + PROJECT_DESC + "\n" +
    " */\n";

// Modules & Hello

var gutil = require('gulp-util');

gutil.log("");
gutil.log(PROJECT_NAME + " - " + PROJECT_VERSION);
gutil.log(PROJECT_DESC);
gutil.log("");
gutil.log(PROJECT_CR);
gutil.log("");
gutil.log("");
gutil.log("Loading modules...");

var gulp = require('gulp');
var compass = require('gulp-compass');
var minifyCss = require('gulp-minify-css');
var del = require('del');
var header = require('gulp-header');
var sourcemaps = require('gulp-sourcemaps');
var rename = require("gulp-rename");

gutil.log("Loading script...");

gulp.task('default', ['minimize'], function() {});

gulp.task('compile', ['clean'], function() {
    return gulp.src(SOURCES_FOLDER + '/**/*.scss')
        .pipe(compass(COMPASS_SETTINGS));
});

gulp.task('minimize', ['compile'], function() {
    return gulp.src(COMPILED_FOLDER + '/*.css')
        .pipe(minifyCss())
        .pipe(header(LICENSE))
        .pipe(sourcemaps.write())
        .pipe(rename(function (path) {
            path.extname = ".min.css";
        }))
        .pipe(gulp.dest(MINIMIZED_FOLDER));
});

gulp.task('clean', ['clean-compile', 'clean-minimize'], function() {});

gulp.task('clean-compile', function()
{
    return del(COMPILED_FOLDER);
});

gulp.task('clean-minimize', function()
{
    return del(MINIMIZED_FOLDER);
});

gutil.log("  -> OK !");
gutil.log("");
