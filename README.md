# kirby-cms-utils

This repo is ment to store some helpers for the development with the [Kirby CMS](https://getkirby.com/).
It fits to _my_ needs and is not ment to be perfect.

## Content

### Github action to install all dependencies and deploy files to a server
- install all composer deps
- install all npm deps
- generate all assets (css/js)
- deploy all stuff via ssh with rsync

### Gulpfile setup to generate assets
- generate `*.scss` files to one single file for development
- generate `*.scss` files to one single file and add a hash and generate a manifest file
- default command to start the dev-mode incl. starting the php server
