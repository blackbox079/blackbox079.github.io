---
title: "Hexo主题之NexT设置"
categories: ["CS"]
tags: ["教程" , "Hexo"]
date: 2019-04-21T23:00:15+08:00
---

Hexo有很多的 [主题](https://hexo.io/themes/) ，其中， [NexT](https://github.com/theme-next/hexo-theme-next) 的完成度是比较高的。

> [GitHub](https://github.com/theme-next/hexo-theme-next)
> 
> [官网](https://theme-next.org/)

<!--more-->

## foot设置

```yml
footer:
  since: 2019 # 指定站点的日期，若无则使用当前年份

  # Icon between year and copyright info.
   icon:
    # Icon name in fontawesome, see: https://fontawesome.com/v4.7.0/icons/
    # `heart` is recommended with animation in red (#ff0000).
    name: heart
    # 图标动画效果
    animated: true
    # 图标颜色, using Hex Code.
    color: "#ff0000"
used.
  copyright: false # 是否设置版权信息
  powered:
    # Hexo link (Powered by Hexo).
    enable: false
    # Version info of Hexo after Hexo link (vX.X.X).
    version: false

  theme:
    # Theme & scheme info link (Theme - NexT.scheme).
    enable: true
    # Version info of NexT after scheme info (vX.X.X).
    version: true
```

## cc 协议

```yml
creative_commons:
  license: by-nc-sa # cc协议类型，by-nc-sa为署名-禁商业用途-相同方式分享
  sidebar: false # 是否在侧边栏显示
  post: true # 是否在文章里显示
  language: zh # 语言
```

归档在配置里取消注释即可显示。

## Follow me on GitHub

```yml
github_banner:
  enable: true
  permalink: https://github.com/blackbox079
  title: Follow me on GitHub
```

## 菜单栏

### 创建分类页面

`hexo new pages categories` 会在/source里创建文件夹 categories ，打开该文件夹的 index.md 在---之间添加

```md
type: "categories"
comments: false
```

### 创建标签页面

`hexo new pages tags` 打开/scource/tags里的index.md在---之间添加

```md
type: "tags"
comments: false
```

### 修改主题配置文件

```yml
menu:
  home: / || home
  categories: /categories/ || th
  tags: /tags/ || tags
  archives: /archives/ || archive
```

## 主题样式

NexT提供了四种样式，喜欢哪个取消注释即可。

```yml
# Schemes
#scheme: Muse
#scheme: Mist
#scheme: Pisces
scheme: Gemini
```

## 社交链接

```yml
social:
  GitHub: https://github.com/blackbox079 || github
  #E-Mail: mailto:yourname@gmail.com || envelope
  #Weibo: https://weibo.com/yourname || weibo
  #Google: https://plus.google.com/yourname || google
  #Twitter: https://twitter.com/yourname || twitter
  #FB Page: https://www.facebook.com/yourname || facebook
  #VK Group: https://vk.com/yourname || vk
  #StackOverflow: https://stackoverflow.com/yourname || stack-overflow
  #YouTube: https://youtube.com/yourname || youtube
  #Instagram: https://instagram.com/yourname || instagram
  #Skype: skype:yourname?call|chat || skype

social_icons:
  enable: true
  icons_only: false
  transition: true
```

## 回到顶部

```yml
back2top:
  enable: true
  # Back to top in sidebar.
  sidebar: false
  # Scroll percent label in b2t button.
  scrollpercent: true
```

## 不蒜子统计

```yml
busuanzi_count:
  enable: true
  total_visitors: true
  total_visitors_icon: user
  total_views: true
  total_views_icon: eye
  post_views: true
  post_views_icon: eye
```

## 本地搜索

安装模块 `npm i --save hexo-generator-searchdb`

```yml
local_search:
  enable: true
```

## 动画效果

### pace进度条

#### 下载pace

```shell
cd theme/next
git clone https://github.com/theme-next/theme-next-pace source/lib/pace
```

#### 启用pace

在 **_config.yml** 中设置

```yml
pace: true
pace_theme: pace-theme-minimal
```

### canvas-next背景动画

#### 下载canvas-next

```shell
cd theme/next
git clone https://github.com/theme-next/theme-next-canvas-nest source/lib/canvas-nest
```

#### 启用canvas-next

在 **_config.yml** 中设置

```yml
canvas_nest:
  enable: true
  onmobile: true # 是否在移动设备显示
  color: '0,0,255' # RGB 值, 使用 ',' 分隔
  opacity: 0.5 # 线的不透明度: 0~1
  zIndex: -1 # z-index 属性的背景
  count: 99 # 行数
```


