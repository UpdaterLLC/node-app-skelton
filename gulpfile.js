var gulp = require('gulp');
var $    = require('gulp-load-plugins')();

var packageJSON = require('./package.json');
var BUNDLE_JS = packageJSON.name+'.js';

var config = {
  conf:       './conf',
  dat:        './dat',
  src:        './src',
  dist:       '.',
  isProd:     !process.env.NODE_ENV || process.env.NODE_ENV === 'production' ,
  envName:    !!process.env.NODE_ENV? process.env.NODE_ENV : 'production'
};

// Clean dist image
gulp.task('dist:clean', function(done) {
  var del = require( 'del' );
  del( config.dist+'/'+BUNDLE_JS, done );
});

// Copy config.js to src
gulp.task('config:copy', function() {
  return gulp.src(config.conf+'/'+config.envName+'.js')
    .pipe($.rename('config.js'))
    .pipe(gulp.dest(config.src))
    .on('end',function(){
      $.util.log('copied', $.util.colors.red(config.conf+'/'+config.envName+'.js'), 'as', $.util.colors.red(config.src+'/config.js') );
    });
});

// Bundle js files
gulp.task('bundle:js', $.watchify(function(watchify) {
  var buffer = require('vinyl-buffer');
  return gulp.src([
    config.src+'/index.js',
  ])
    .pipe($.plumber())
    .pipe(watchify({
      basedir: './',
      watch: false,
      debug: !config.isProd,
      detectGlobals: false,
      builtins: [],
      transform: [
        ['babelify', {
          'presets': ['stage-0','es2015'],
          'plugins': [
            'transform-class-properties',
            'transform-object-rest-spread',
            'transform-flow-strip-types',
          ],
          'ignore': [
            'gulpfile.js',
            'tmp/**/*.js'
          ]
        }]
      ]
    }))
    .pipe(buffer())
    .pipe($.if( config.isProd, $.sourcemaps.init({loadMaps: true}) ))
    .pipe($.if( config.isProd, $.uglify() ))
    .pipe($.rename(BUNDLE_JS))
    .pipe($.if( config.isProd, $.sourcemaps.write('.') ))
    .pipe(gulp.dest(config.dist));
}));

// Run tasks
gulp.task('build:dist', function(done) {
  var runSequence = require( 'run-sequence' );
  return runSequence(
    'dist:clean',
    'config:copy',
    'bundle:js',
    done
  );
});

// Default task
gulp.task('default', [ 'build:dist' ]);

//__END__
