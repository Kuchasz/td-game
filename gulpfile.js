var gulp = require('gulp'),
    spawn = require('child_process').spawn,
    exec = require('child_process').exec,
    node;

var runSequence = require('run-sequence');

gulp.task('server', function () {
    if (node) node.kill();
    node = spawn('node', ['build/server/index.js'], {stdio: 'inherit'});
    node.on('close', function (code) {
        if (code === 8) {
            gulp.log('Error detected, waiting for changes...');
        }
    });
});

gulp.task('build', function(cb){
    exec('npm run compile-server', function (err) {
        console.log(err);
        cb(err);
    });
});

gulp.task('watch', function (cb) {
    gulp.watch('./src/**', function(){
        runSequence('build', 'server');
    });
});

gulp.task('default', function(){
    runSequence('build', 'server', 'watch');
});

process.on('exit', function () {
    if (node) node.kill();
});