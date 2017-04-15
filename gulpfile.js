var gulp        = require('gulp');
var browserSync = require('browser-sync')
var cp          = require('child_process')
var runSequence = require('run-sequence');
var config = require('./jekyll-gulp-config.json')

gulp.task('default',['watch'])

gulp.task('build', function(done){
    /** Handles a build of the site **/
    browserSync.notify('Rebuilding site')
    return cp.spawn('jekyll', ['build', '--incremental'], { stdio: 'inherit' }).on('close', done)
})

gulp.task('build-drafts', function(done){
    /** Handles a build - including drafts - of the site **/
    browserSync.notify('Rebuilding site')
    return cp.spawn('jekyll', ['build', '--incremental', '--drafts'], { stdio: 'inherit' }).on('close', done)
})

gulp.task('rebuild', ['build'], function(){
    /** Reloads browser-sync once the build has completed **/
    browserSync.reload()
})

gulp.task('rebuild-drafts', ['build-drafts'], function(){
    /** Reloads browser-sync once the build has completed **/
    browserSync.reload()
})

gulp.task('watch', ['build'], function(){
    /** Watches for changes - and reloads the browser if found **/
    browserSync.init( {
        server: 
        {
            baseDir: "./_site/"
        }
     })

    gulp.watch(["./_posts/*", "./_sass/*", "./css/*", "./_layouts/*", "./_includes/*"], ["rebuild"])
})

gulp.task('watch-drafts', ['build-drafts'], function(){
    /** Watches for changes - including in drafts - and reloads the browser if found **/
    browserSync.init( {
        server: 
        {
            baseDir: "./_site/"
        }
     })

    gulp.watch(["./_posts/*", "./_sass/*", "./css/*", "./_layouts/*", "./_includes/*", "./_drafts/*"], ["rebuild-drafts"])
})

gulp.task('clean', function(done){
    /** Handles a clean of the Jekyll build **/
    return cp.spawn('jekyll', ['clean'], { stdio: 'inherit' }).on('close', done)
})

gulp.task('publish', ['clean', 'build'], function(done){
    /** Publishes the latest Jekyll build */
    return cp.spawn('rsync', ['-avzdh', '-e', 'ssh', '_site/', config.destinationFolder],  { stdio: 'inherit' }).on('close', done)
})