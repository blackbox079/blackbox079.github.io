---
title: 转移到Hugo框架的尝试
categories: CS
tags:
  - blog
  - hugo
  - 教程
abbrlink: 1ff52b24
date: 2019-04-26 21:00:41
updates:
---

因为hexo的编译速度比较慢，而尝试迁移到 [Hugo](https://gohugo.io/) 框架。

> [GitHub](https://github.com/gohugoio/hugo)

虽然现在又转回来了，但可以记录一下。

<!--more-->

## 安装Hugo

```shell
yay -S hugo # Arch Linux里安装Hugo
hugo new site hugo # 在hugo文件夹生成Hugo站点
cd hugo && ls # 切换并查看文件夹内容
git clone https://github.com/olOwOlo/hugo-theme-even themes/even # 安装主题
```

主题的选择还是蛮多的，可在 [官网](https://themes.gohugo.io/) 查看并选择喜欢的主题。也可到GitHub搜索。

[Even](https://github.com/olOwOlo/hugo-theme-even)提供的配置选项也不少，也蛮喜欢这个主题的风格。相关配置请看GitHub上的 [说明](https://github.com/olOwOlo/hugo-theme-even/blob/master/README-zh.md) 。

## Hugo使用

```shell
hugo server -w # 启动本地服务器
hugo # 将内容生成到public文件夹
cd public # 切换到public文件夹
git init # git初始化
git remote add origin git@github.com:blackbox079/blackbox079.github.io.git
git add . # 添加到git暂存区
git commit -m "提交信息" # 将暂存区的改动提交到本地版本库
git push origin master # 推送到远程仓库
```

## 部署到GitHub Pages

GitHub Pages 可选显示的是 *master* 分支或 *gh-pages* 分支或 *master* 分支的 */docs* 目录。可在仓库的设置里查看。 ![GitHub-Pages.png](https://i.loli.net/2019/05/04/5ccdb45bf1e14.png) 参考 [Configuring a publishing source for GitHub Pages - GitHub Help](https://help.github.com/en/articles/configuring-a-publishing-source-for-github-pages) 

所以，我们可以将原本的Hexo放到其他分支，将Hugo站点内的 */public* 文件夹push到 *master* 分支。

## 两者区别

### 文件头部写法

以本篇为示例：

- Hexo

```markdown
---
title: 转移到Hugo框架的尝试
categories: CS
tags:
  - blog
  - hugo
  - 教程
abbrlink: 1ff52b24
date: 2019-04-26 21:00:41
updates:
---
```

- Hugo

```markdown
---
title: "转移到Hugo框架的尝试"
date: 2019-04-26T21:00:41+08:00
categories: ["CS"]
tags: ["blog", "hugo", "教程"]
---
```