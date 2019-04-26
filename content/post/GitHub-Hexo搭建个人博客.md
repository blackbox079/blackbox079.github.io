---
title: "GitHub+Hexo搭建个人博客"
categories: ["CS"]
tags: ["教程" , "Hexo"]
date: 2019-04-20T22:06:19+08:00
---

个人博客搭建和相关配置。采用 [Hexo](https://hexo.io/zh-cn/) 搭建，并部署到 [GitHub Pages](https://pages.github.com/) 。

<!--more-->

## 基础安装

### 安装 [Git](https://git-scm.com/downloads) 和 [Node.js](https://nodejs.org/en/)

Windows平台上去官方下载安装包然后基本就一路点next就可以装好了，[Node.js](https://nodejs.org/en/) 推荐下载LTS版本。

我这边是Arch Linux系统，yay是包管理器。

```shell
yay -S git nodejs # 安装
node -v && npm -v # 验证是否安装成功
npm config set registry https://registry.npm.taobao.org # 设置npm使用淘宝镜像源
npm config get registry # 查看是否成功设置
```

### 安装hexo

```shell
mkdir blog && cd blog # 新建并切换到该文件夹
npm i -g hexo-cli # 全局安装hexo模块
hexo init # 用hexo初始化当前文件夹(该文件夹必须为空)
npm i --save hexo-deployer-git eslint # 安装部署模块deployer，安装bebal-eslint依赖项eslint
npm audit fix # 自动修复
```

## hexo常用命令

```shell
hexo n "文章名" # 新建
hexo clean # 清除缓存
hexo g # 编译
hexo s # 本地预览
hexo d # 部署到远端
```

## [GitHub](https://github.com) 注册与设置

### GitHub注册

打开 [Github](https://github.com) ，点击右上角 [Sign up](https://github.com/join) ，填写用户名邮箱和密码后创建账号。

> GitHub Pages是 用户名.github.io  ，所以用户名是很重要的哦。

### 新建仓库

点击右上角+号，选择 `New repository` ![New repository](https://i.loli.net/2019/04/23/5cbe7ddfda67b.png)

填写仓库信息 ![Create a new repository](https://i.loli.net/2019/04/23/5cbe7de00c7ed.png) 
描述是可选填项，Public是公开该仓库，Private则是私人的。可勾选添加README文件。
仓库名必须是 用户名.github.io 哦，这样可以自动设置Github Pages。 ![Github Pages](https://i.loli.net/2019/04/23/5cbe7feae0fa4.png)

### 生成ssh key并保存到GitHub设置里

为了比较方便地部署到Github Pages，可使用SSH上传。GitHub官方的教程在这里： [Connecting to GitHub with SSH](https://help.github.com/en/articles/connecting-to-github-with-ssh)

#### 生成SSH key

```shell
ls ~/.ssh # 查看是否已存在ssh key
mkdir ~/.ssh && cd ~/.ssh # 如果没有则创建并切换到该目录
ssh-keygen -t rsa -C "your_email@example.com" # 生成ssh key，邮箱换成自己的。-t是指定密钥类型，默认是rsa，所以也可省略。-C是设置注释文字，比如邮箱
# 然后输入文件名和密码2次，这一步也可回车三连全设为默认。默认的文件名为 id_rsa
clip < ~/.ssh/id_rsa.pub # 复制SSH key文件内容
```

#### 添加SSH key到GitHub

打开GitHub，点击右上角头像，选择 `Settings` ， ![Github-Setting](https://i.loli.net/2019/04/23/5cbe83dac95e3.png) 在左侧栏点 `SSH and GPG keys` ，在右边点 `New SSH key` 添加。(我这边打码了下) ![GitHub-SSH-keys](https://i.loli.net/2019/04/23/5cbe83a6bc695.png)
Title随便填，在Key里粘贴刚才复制的内容。 ![GitHub-new-ssh.png](https://i.loli.net/2019/04/23/5cbe8a07e1c28.png)

#### Git全局配置

```shell
git config --global user.name "yourname" # 配置用户名
git config --global user.email "youremail@email.com" # 配置邮箱，建议用注册GitHub的邮箱
```

#### 测试

```shell
shh -T git@github.com # 测试是否可用
yes #首次会询问是否信任该网站
# 如果ssh key 里创建了密码，则还需输入密码
```

## Hexo设置

### 永久链接

`npm i --save hexo-abbrlink` 然后修改Hexo配置文件_config.yml

```yml
permalink: posts/:abbrlink/ #url链接
permalink_defaults:

# abbrlink config
abbrlink:
  alg: crc32  #support crc16(default) and crc32
  rep: hex    #support dec(default) and hex
```

### 设置RSS

`npm i --save hexo-generator-feed` 安装RSS模块，将其加入Hexo配置文件里的 `plugins` 。

```yml
plugins:
  hexo-generator-feed
```

在 NexT的 `_config.yml` 里设置 `rss: ./atom.xml`

### 添加搜索

`npm i --save hexo-generator-searchdb` 安装模块，然后在hexo配置添加

```yml
search:
path: search.xml
field: post
format: html
limit: 10000
```

修改NexT主题配置

```yml
local_search:
  enable: true
```

### 配置

```yml
# Site
title: 个人博客 # 网站标题
subtitle: # 网站副标题
description: # 网站描述
keywords:
author: Blackbox079 # 你的名字
language: zh-CN # 网站语言
timezone: Asia/Shanghai # 网站时区
# URL
url: https://blackbox079.github.io/ # 地址
root: /
permalink: posts/:abbrlink/ #url链接
permalink_defaults:
# abbrlink config
abbrlink:
  alg: crc32  #support crc16(default) and crc32
  rep: hex    #support dec(default) and hex
# Search 搜索功能
search:
path: search.xml
field: post
format: html
limit: 10000
# Extensions 扩展
plugins: # 插件
  hexo-generator-feed
theme: next # 主题
feed: #RSS
  type: atom
  path: atom.xml
  limit: 20
# Deployment 部署
deploy:
  type: git
  repo: git@github.com:blackbox079/blackbox079.github.io.git
  branch: master
```

### 压缩

```shell
npm i --save-dev gulp  gulp-htmlclean gulp-htmlmin gulp-clean-css gulp-imagemin gulp-uglify # 安装压缩模块
```

在根目录添加配置文件 `gulpfile.js` 

```js
const gulp = require('gulp');
const htmlclean = require('gulp-htmlclean');
const htmlmin = require('gulp-htmlmin');
const minifycss = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

//压缩 public 目录内 html
gulp.task('html', function () {
    return gulp.src('./public/**/*.html')
        .pipe(htmlclean())
        .pipe(htmlmin({
            removeComments: true,//清除 HTML 注释
            collapseWhitespace: true,//压缩 HTML
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
    return gulp.src('./public/**/*.css', '!./public/**/*.min.css')
        .pipe(minifycss())
        .pipe(gulp.dest('./public/css'))
})

//压缩 public 目录内 js
gulp.task('js', function () {
    return gulp.src('./public/**/*.js', '!./public/**/*.min.js')
        .pipe(uglify())
        .pipe(gulp.dest('./public/js'))
})

// 压缩 public 目录下的所有 img： 这个采用默认配置
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

// 设置默认任务，图片我会放外链，所以我就不压了
gulp.task('default', gulp.series(gulp.parallel('html', 'css', 'js')))
```

> 这里踩坑了，之前有装 `del` 这个模块，它会清理fontawesome，部署后图标就变为豆腐块，fontawesome是next主题的图标。

### 简化部署

在 `package.json` 里加上

```json
"scripts": {
    "push": "hexo clean && hexo g && gulp && hexo d"
  }
```

也可把 `hexo g` 这一步放到 `gulpfile.js` 里

```js
const Hexo = require('hexo');
//利用Hexo API 来生成博客内容， 效果和在命令行运行： hexo g 一样
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
gulp.task('default', gulp.series('generate', gulp.parallel('html', 'css', 'js')))
# gulp默认任务添加 hexo g 这一步，那么则可在 `package.json` 里省去这一步
```

这样可使用 `npm run push` 来部署。
 