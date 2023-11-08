+++
title = 'Git 基础使用'
description = '持续缓更。'
date = 2023-10-21T21:49:58+08:00
categories = ['编程']
tags = ['Git']
image = ''
slug = '0a8fca5e'
draft = false
+++

## 安装

- [官网](https://git-scm.com/)
- [Download for Windows](https://git-scm.com/download/win)

Windows 直接下载安装包安装即可，采用包管理器方式安装也行。Linux 各个发行版安装方式大同小异，Git 的优先级很高，直接安装就行。

```bash
# Windows
scoop install git
# macOS
brew install git
# Debian/Ubuntu
apt-get install git
# Arch Linux
pacman -S git
```

## 配置

### git config

通常需要配置用户名和邮箱，*--global* 配置全局，*--local* 配置当前项目。

```bash
git config --global user.name yourname
git config --global user.email yourname@example.com
```

### ssh

通常采用 *ed25519* 或 *rsa* 算法生成，此处采用 *ed25519* 算法：

```bash
ssh-keygen -t ed25519 -C "your_email@example.com"
```

运行后会在用户目录下创建 *.ssh* 文件夹并生成 *id_ed25519* 和 *id_ed25519.pub* ，其中 *id_ed25519.pub* 是公钥文件，将内容复制到剪贴板后添加到 GitHub 账号设置中即可。

## 常用

- `git clone` 克隆线上仓库到本地
- `git status` 查看项目状态
- `git add` 添加到暂存区，可指定添加目录或文件或采用其他选项：*.* 添加所有文件
- `git commit` 提交：*-m* 选项可附加备注
- `git reset --hard HEAD^` 回退并清空工作区和暂存区，放弃本地修改
- `git reset --soft HEAD^` 回退到commit之前add之后
- `git push` 后接仓库和分支，通常为 *git push origin main* 或 *git push origin master*

## 参考

- [生成新的 SSH 密钥并将其添加到 ssh-agent - GitHub 文档](https://docs.github.com/zh/authentication/connecting-to-github-with-ssh/generating-a-new-ssh-key-and-adding-it-to-the-ssh-agent)
