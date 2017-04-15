# Dependencies

* Jekyll (and any plugins/gems required for your particular site)
* rsync
* node
* npm
* gulp (optional, installed globally makes life easier though)

# Install

In your Jekyll's website directory, softlink package.json and hardlink gulpfile.js.

    ln /path/to/jekyll-gulp/gulpfile.js /path/to/jekyll/directory/
    ln -s /path/to/jekyll-gulp/package.json /path/to/jekyll/directory/

To install, run the npm install command from inside the Jekyll directory

    npm install

Now copy `jekyll-gulp-config.json` to `/path/to/jekyll/directory/jekyll-gulp-config.json`, and edit `destination-folder` so that it reflects the destination to publish to. This must be a remote server you have ssh access to, and a key authentication setup for (e.g. `user@website:/website/folder/`).

# Usage

The default task is watch.
Below is a description of the different tasks available.

## build

Invoked with `gulp build`.
Launches an incremental build of Jenkins to the default `_site` directory.

## build-drafts

Invoked with `gulp build-drafts`.
Same as `build`, but with drafts enabled.

## watch

Invoked with `gulp watch`.
Launches BrowserSync. Watches for changes in the `_posts`, `_sass`, `css`, `_layouts`, and `_includes`. Upon detection of a change, rebuilds the site and updates notifies browserSync.

## watch-drafts

Invoked with `gulp watch-drafts`.
Same as `watch`, but also monitors `_drafts` and builds with drafts enabled.

## clean

Invoked with `gulp clean`.
Cleans the current Jekyll build.

## publish

Invoked with `gulp publish`.
Cleans then builds the Jekyll site. Pushes the site to the destination set in jekyll-gulp-config.json with rsync.