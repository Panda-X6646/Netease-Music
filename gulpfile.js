var gulp = require('gulp');
var htmlClean = require('gulp-htmlclean');                          //压缩html的插件
var imagemin = require('gulp-imagemin');                            //压缩图片插件,报写入错误就用cnpm再下载一个
var uglify = require('gulp-uglify');                                //压缩js
var debug = require('gulp-strip-debug');                            //去掉js中的调试语句（debug等一些）
var less = require('gulp-less');                                    //将less转换为css插件
var cleanCss = require('gulp-clean-css');                           //压缩css
var autoprefixer = require('gulp-autoprefixer');                    //css样式添加前缀  +全局
var connect = require('gulp-connect');                              //开启服务器，并监听

process.env.NODE_ENV='production';                                  //设置程序当前的运行环境(等号两边不要有空格),不设置时的值为空。

var devMod = process.env.NODE_ENV == 'development'                   //当devMod的值为false时才进行打包，即：不设置运行环境和设置生产环境会打包文件

// 提示开发者程序的运行环境
if (!devMod) {
    console.log('Production Model');
}else{
    console.log('Development Model');
}


// 保存输入地址和输出地址
var folder = {
    src: 'src/',
    dist: 'dist/',
}

// 创建处理文件任务
gulp.task('html', function (cb) {
    var page = gulp.src(folder.src + 'html/*')
                    .pipe(connect.reload());                         //当检测到文件有改动就从新刷新页面
    if (!devMod) {
        page.pipe(htmlClean())                                       //执行压缩
    }
    page.pipe(gulp.dest(folder.dist + 'html/'));                     //输出地址./dist/html/
    
    cb();
})

gulp.task('css', function (cb) {
    var page = gulp.src(folder.src + 'less/*')
                    .pipe(connect.reload())                           //当检测到文件有改动就从新刷新页面
                    .pipe(less())                                     //将less转换成css
                    .pipe(autoprefixer({                              //給样式添加前缀
                        overrideBrowserslist: ['last 2 versions']     //autoprefixer一定要有值，否则不会加前缀
                    }))
    if (!devMod) {
        page.pipe(cleanCss())                                         //压缩css
    }
    page.pipe(gulp.dest(folder.dist + 'css/'));                       //输出地址./dist/css/
    cb();
})

gulp.task('js', function (cb) {
    var page = gulp.src(folder.src + 'js/*')
                    .pipe(connect.reload());                          //当检测到文件有改动就从新刷新
    if (!devMod) {
        page.pipe(debug())                                            //删除调试用的代码（debug等）
            .pipe(uglify())                                           //执行压缩
    }
    page.pipe(gulp.dest(folder.dist + 'js/'));                        //输出地址./dist/js/
    
    cb();
})

gulp.task('image', function (cb) {
    gulp.src(folder.src + 'image/*')
        .pipe(imagemin())                                             //执行压缩
        .pipe(gulp.dest(folder.dist + 'image/'));                     //输出地址./dist/image/
    
    cb();
})

gulp.task('server', function (cb) {                                   //开启监听后才可以显示页面
    connect.server({
        port: '8080',
        livereload: 'true',
        host: '192.168.31.19'
    });
    cb();
})


//开启监听
gulp.task('watch', function  () {
    gulp.watch([folder.src + 'html/*'], gulp.series('html'));
    gulp.watch([folder.src + 'less/*'], gulp.series('css'));
    gulp.watch([folder.src + 'js/*'], gulp.series('js'));
})

// 管理处理文件任务的回调执行default为默认开启函数名
gulp.task('default', gulp.parallel('html', 'image', 'css', 'js', 'server', 'watch'))

// task创建任务队列，由series（同步）和parallel（异步）进行管理任务的执行方式,cb与collback队列中的出列的next类似



//如果原文件已保存到但页面不刷新，就多点几次刷新










//gulp.src() 读取文件             
//gulp.dest() 创建流，将细化的任务放在流上执行
//gulp.task() 创建任务
//gulp.watch() 监听文件的改变
// gulp.dest() 输出文件




















