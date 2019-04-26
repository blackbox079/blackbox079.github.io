const gulp = require('gulp');
const htmlclean = require('gulp-htmlclean');
const htmlmin = require('gulp-htmlmin');
const minifycss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const Hexo = require('hexo');

//利用Hexo API 来生成博客内容， 效果和在命令行运行： hexo g 一样
//generate html with 'hexo generate'
let hexo = new Hexo(process.cwd(), {});
gulp.task('generate', function (cb) {
    hexo.init().then(function () {
        return hexo.call('generate', {
            watch: false
        });
    }).then(function () {
        return hexo.exit();
    }).then(function () {
        return cb()
    }).catch(function (err) {
        console.log(err);
        hexo.exit(err);
        return cb(err);
    })
})

//压缩 public 目录内 html
gulp.task('html', function () {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,//清除 HTML 注释
            collapseWhitespace: true,//压缩 HTML
            // preserveLineBreaks: true,//只保留1空行
            collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
            removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
            removeScriptTypeAttributes: true,//删除 <script> 的 type="text/javascript"
            removeStyleLinkTypeAttributes: true,//删除 <style> 和 <link> 的 type="text/css"
            minifyJS: true,//压缩页面 JS
            minifyCSS: true//压缩页面 CSS
        }))
        .pipe(gulp.dest('./public'))
});

//压缩 public 目录内 css
gulp.task('css', function () {
    return gulp.src('./public/**/*.css', '!./public/**/*.min.js')
        .pipe(minifycss())
        .pipe(gulp.dest('./public/css'))
})

//压缩public目录内js
gulp.task('js', function () {
    return gulp.src('./public/**/*.js', '!./public/**/*.min.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
})

// 压缩public目录下的所有img： 这个采用默认配置
gulp.task('img', function () {
    return gulp.src('./public/images/**/*.*')
        .pipe(imagemin())
        .pipe(gulp.dest('./public/images'))
})
// 同上，压缩图片，这里采用了： 最大化压缩效果。
gulp.task('img-aggressive', function () {
    return gulp.src('./public/images/**/*.*')
        .pipe(imagemin(
            [imagemin.gifsicle({ 'optimizationLevel': 3 }),
            imagemin.jpegtran({ 'progressive': true }),
            imagemin.optipng({ 'optimizationLevel': 7 }),
            imagemin.svgo()],
            { 'verbose': true }))
        .pipe(gulp.dest('./public/images'))
})

// gulp.task('default', gulp.series('generate', gulp.parallel('html', 'css', 'js')))
gulp.task('default', gulp.parallel('html', 'css', 'js'))
