---
title: EPUB电子书制作
categories: Insterest
tags:
  - 教程
  - 电子书
abbrlink: a3793d46
date: 2019-04-24 17:44:58
updates:
---

因为希望提高阅读体验，而尝试自行制作epub文档，了解不算多，后续会继续完善。

<!--more-->

## 准备工作

- 原始文档(一般是txt)
- [VSCode](https://code.visualstudio.com/) (处理txt文档)
- [Sigil](https://sigil-ebook.com/) (制作成epub文档)

## VSCode完善文本

-  **清除多余空格** : 搜索 ` |　` 替换为空（这里看情况而定，如果有章节名的话就不能这么简单粗暴）
-  **清除多余换行** : 搜索 `\n\n` 替换为 `\n`
-  **添加详情** : 在文档开头添加书籍信息，比如作者、发布（日期）、链接、类型、标签、系列、简介、文案等等。
- **校正错漏**
- **标准化卷、章、节**

详情参考

```html
<div class="info">
    <p><span>作者</span> 作者名</p>
    <p><span>发布</span> 日期</p>
    <p><span>链接</span> <a class="" href=""> 该链接的title</a></p>
    ...
    <div id="description">
        <p>文案</p>
        ...
    </div>
</div>
```

### 添加标签

- **添加p标签** 搜索 `(.*)` 替换为 `<p>$1</p>`
- **处理卷** 搜索 `<p>(第.*卷.*|卷.*)</p>` 替换为 `<hr class="sigil_split_marker"/>\n<h1>$1</h1>` 
- **处理章** 搜索 `<p>(第.*章.*|番外.*)</p>` 替换为 `<hr class="sigil_split_marker"/>\n<h2>$1</h2>`

其中， `<hr class="sigil_split_marker"/>` 是Sigil的切分标记。

### 处理内容提要

根据内容提要在文档中的具体位置进行处理。参考：

搜索 `<h2>(第.*章.*|番外.*) (.*)</h2>` 替换为 `<h2>$1</h2>\n<div class="summary">\n<p>$2</p>\n</div>`

### 添加脚注

首先明确需要添加脚注的位置，原文档中注解出现的位置可能各有不同。epub3原生脚注参考：

```xhtml
<a epub:type="noteref" href="#footnote_1">需要添加脚注的内容</a>
...
<a epub:type="noteref" href="#footnote_2">需要添加脚注的内容2</a>
<!--可在xhtml的</body>前统一添加脚注内容-->
<section epub:type="footnotes">
    <aside epub:type="footnote" id="footnote_1">
        <p>脚注内容</p>
    </aside>
    <aside epub:type="footnote" id="footnote_2">
        <p>脚注内容2</p>
    </aside>
</section>
```

（多看阅读对原生样式的支持不算友好，因为它有自己的一套标准。）

## Sigil制作epub

打开 *Sigil* ，默认是新建的一本书，删除默认文件在 `<body></body>`标签里的内容，将文本从VSCode复制到此处。

如果已经有通用的样式文件，则在 *Styles* 文件夹上右键添加已存在的文件将其加入到这本书里。（可顺手把自动生成的样式文件删除）

### Sigil使用提示

Sigil有保存的搜索功能，可把常用的搜索替换保存到此处。支持正则表达式，所以也比较方便。注意：版本升级可能出现不兼容，所以也要注意备份配置文件。

### 添加封面和元数据

通过其他渠道获取封面和元数据。元数据通常包括：

- *title* : 书名
- *creator* : 作者
- *created* : 建立时间或发表时间
- *language* : 语言，通常是 `zh` 或 `zh-CN`
- *source* : 来源
- *description* : 描述

### 建立html目录

快捷键 *F6* 在标记处切分。检查章节是否有分割错误，确认无误后修改xhtml文件名。文件名参考：

- *Cover* ： 封面
- *Introduction* ： 简介，详情
- *Nav* ： 目录
- *Volume* ： 卷
- *Chapter* ： 章
- *Subchapter* ： 节
- *Gaiden* ：番外
- *Version* ：版本记录

### 完善title和添加样式

搜索 `(?s)<title></title>(.*)<h2>(.*)</h2> `，替换为 `<title>\2</title>\n<link href="../Styles/main.css" ref="stylesheet"/>\1<h2>\2</h2>` 。

`(?s)` 是Sigil的匹配多行写法，这里和标准正则表达式不一致。

卷设为h1，章为h2，节为h3。h3一般也不进行切分处理。如果书籍有分卷的话则把上边的搜索替换从h2换成h1来一遍即可。对详情目录版本记录等页面手动补充title信息。

完成后检查是否有误。

### 处理作话

搜索 `(?s)<p>(作者有话.*)</p>\n(<p>.*</p>)` 替换为 `<div class="authorSayBox">\n<p class="">\1</p>\n\2\n</div>`

### 处理目录和卷

生成目录支持自动提取h1，h2等标题标签内容，完成后回到打开 *Nav.xhtml* 删除关于里程碑那段 `<nav>...</nav>`

卷目前只有简单的h1，可以简单地完善一下。比如添加小目录，从目录里复制该卷的ol列表粘贴到卷的文件里。参考：

```xhtml
<div class="volume">
    <h1>卷一...</h1>
    <ol>
        <li><a href="../Text/Chapter01.xhtml">第1章</a></li>
        ...
    </ol>
    <div class="return">
        <p><a href="../Text/Nav.xhtml">返回目录</a></p>
    </div>
</div>
```

### 更新opf清单



### 最后工作

- 检查是否有错漏之处
- 测试兼容效果

## 样式参考

文案的文字居中，内容提要和卷目录设置背景色，作话添加边框。配色需要再琢磨。

目录设置居中在一些阅读器上无法对齐，故不进行设置。

### 颜色

```
#41555d 黯
#758a99 墨灰
#ffb61e 藤黄
#ffb3a7 粉红
#f47983 桃红
#9d2933 胭脂
#db5a6b 樱桃红
#fffbf0 象牙白
```

### CSS

```css

div {
  display: block;
}

p {
  text-indent: 2em;
  duokan-text-indent: 2em;
}

a {
  text-decoration: none;
  color: #ef475d;
}

nav ol li a {
  color: #41555d;
  font-weight: bold;
  font-size: 1.2em;
  line-height: 1.5em;
}

nav ol ol li a {
  color: #758a99;
  font-weight: normal;
}

ul,
li,
ol {
  list-style: none;
}


/* 标题一 篇*/

h1 {
  font-family: "DK-HEITI", "黑体", "微软雅黑"，sans-serif;
  font-size: 1.6em;
  margin-top: 2em;
  margin-bottom: 2em;
  margin-left: 0;
  text-indent: 0;
  line-height: 1.8em;
  padding: 5px 2px 2px 18px;
  background: #008080;
  color: #fff;
  text-align: center;
}


/* 标题二 章*/

h2 {
  font-family: "DK-HEITI", "黑体", "微软雅黑"，sans-serif;
  font-size: 1.5em;
  margin-top: 1.5em;
  margin-bottom: 2em;
  text-align: center;
  color: #4682B4;
  line-height: 1.3em;
}


/* 标题三 节*/

h3 {
  margin: 2.5em 0 1.3em;
  color: #800000;
  line-height: 120%;
  text-align: left;
  font-size: 1.3em;
  border-style: none none none solid;
  border-width: 0px 0px 0px 3px;
  border-color: #B22222;
  padding: 5px 2px 2px 10px;
}

div.summary {
  color: #9d2933;
  margin: 1em 0;
  padding: .45em .45em .45em 1em;
  border-left: 4px solid #db5a6b;
  background: #fdecee;
}

div.summary p+p {
  margin-top: .35em!important;
}

div.summary p {
  margin: 0;
  font-size: .9em;
}

.authorSayBox {
  border: solid 1px #ffb3a7;
  border-radius: 15px;
  color: #7b4741;
  padding: .5rem;
  margin: 0;
}

.JJ {
  color: #090;
}

.CP {
  color: #2aa184;
}

.QHY {
  color: #9fd599;
}

.BX {
  color: #2e9fff;
}

.FW {
  color: #222;
}

.AO3 {
  color: #840000;
}

.MGD {
  color: #f1677d;
}

.LXF {
  color: #7a1617;
}

.QD {
  color: #ee2030;
}


/* 详情页 */

.circle {
  margin: 0 auto;
  width: 1rem;
  height: 1rem;
  background: #4682B4;
  border-radius: 50px;
}

div.info span {
  color: #b36d61;
  font-weight: bold;
}

div.info p {
  color: #a98175;
  text-indent: 1em;
}

#description {
  font-weight: bold;
  text-align: center;
  padding: .5rem;
  border-style: none double;
  border-color: #4682B4;
}


/* 卷 */

div.volume {
  background-color: #fffbf0;
  width: 100%;
}

.return {
  clear: both;
  height: 2em;
  line-height: 2em;
  width: 100%;
  text-align: center;
  margin: 0 auto;
  font-weight: bold;
  border-bottom: solid #008080 10px;
}

.return a {
  color: #41555d;
}

#version .ver1 span {
  color: #ffb61e;
}
```