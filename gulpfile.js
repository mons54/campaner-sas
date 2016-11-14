var gulp = require('gulp'),
    connect = require('connect'),
    serveStatic = require('serve-static');

gulp.task('serve', function (cb) {
  var app = connect().use(serveStatic('./'));
  app.listen(8000);
  cb();
  console.log('Server started on http://localhost:8000');
});
