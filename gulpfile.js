// - generate `*.scss` files to one single file for development
// - generate `*.scss` files to one single file and add a hash and generate a manifest file
// - default command to start the dev-mode incl. starting the php server

const { series, watch, src, dest, task } = require("gulp");
const connect = require("gulp-connect-php");
const sass = require("gulp-sass");
const autoprefixer = require("gulp-autoprefixer");
const uglifycss = require("gulp-uglifycss");
const browserSync = require("browser-sync");
const hash = require("gulp-hash");

function defaultTask(cb) {
  cb();
}

function serve(cb) {
  connect.server({ router: "kirby/router.php" }, function () {
    browserSync({
      proxy: "127.0.0.1:8000",
    });
  });

  watch("assets/sass/**/*.scss", sassGenerator);

  watch("**/*.php").on("change", function () {
    browserSync.reload();
    cb();
  });

  watch("assets/css/**/*.css").on("change", function () {
    browserSync.reload();
    cb();
  });
}

task("build", function (cb) {
  sassGeneratorWithHash(cb);
});

function sassGenerator(cb) {
  src("assets/sass/**/*.scss")
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(uglifycss())
    .pipe(dest("assets/css"))
    .on("end", cb);
}

function sassGeneratorWithHash(cb) {
  src("assets/sass/**/*.scss")
    .pipe(hash())
    .pipe(sass())
    .pipe(autoprefixer())
    .pipe(uglifycss())
    .pipe(dest("assets/css"))
    .pipe(
      hash.manifest("source.json", {
        deleteOld: true,
        sourceDir: __dirname + "/assets/css",
      })
    )
    .pipe(dest("./assets/css"))
    .on("end", cb);
}

exports.default = series(serve);
