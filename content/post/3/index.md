+++
title = '帝国CMS整合一键排版和百度编辑器'
description = '将编辑器更换为百度编辑器并增加一键排版，提升编辑使用体验。'
date = 2023-10-26T13:56:17+08:00
categories = ['编程']
tags = ['帝国CMS']
image = ''
slug = 'c82eb1ea'
draft = false
+++

- [fex-team/ueditor: rich text 富文本编辑器](https://github.com/fex-team/ueditor)

## 安装

下载后解压并重命名为 ueditor ，上传到网站的 */e/extend/* 目录内。

## 使用

这两项修改都是针对文章编辑的体验提升，所以修改的字段类型应为编辑器，如默认的文章模型中该字段为 `newstext` 。登录网站后台，打开 *系统-数据表与系统模型-管理数据表* ，再点击 *管理字段* 进行修改即可。

### 一键排版

注意：该插件依赖 JQuery 。

```html
<script src="/e/extend/ueditor/jquery.min_1.8.3.js"></script>
<script src="/e/extend/ueditor/formatText.js"></script>
<script>
// 自动获取文章标题
$("input[name='title']").change(function(){
    $("#Title").val($("input[name='title']").val());
});
// 未审核文章自动排版
if(<?= $r[checked] ?> == 0){
    setTimeout(()=>{
        formatText()
    },5000)
}
</script>
<table width="100%" border="0" align="center" cellpadding="3" cellspacing="1" class="tableborder"><tr class="header"><td><label for="Title">图片标题</label><input id="Title" name="Title" type="text"><input id="CenterImg" name="CenterImg" type="checkbox" checked><label for="CenterImg">图片居中</label><input id="clearImg" name="clearImg" type="checkbox"><label for="clearImg">清除图片</label><input id="clearLine" name="clearLine" type="checkbox" checked="checked"><label for="clearLine">格式化行</label><input id="clearScript" name="clearScript" type="checkbox" checked="checked"><label for="clearScript">清除脚本</label><input id="clearObject" name="clearObject" type="checkbox"><label for="clearObject">清除对象</label><input id="clearAttr" name="clearAttr" type="checkbox" checked="checked"><label for="clearAttr">清除属性</label><input id="clearA" name="clearA" type="checkbox" checked="checked"><label for="clearA">清除链接</label><input id="clearUL" name="clearUL" type="checkbox"><label for="clearUL">清除列表</label><input id="clearTb" name="clearTb" type="checkbox"><label for="clearTb">清除表格</label><input type="button" id="formatTextButton" name="formatTextButton" value="一键排版" onClick="formatText()"><input name="this_reset" id="this_reset" type="reset" value="重置" /></td></tr></table>
```

### 百度编辑器

```html
<?php
$ziduan='newstext';//编辑器使用的字段名称
if($enews=='MAddInfo' || $enews=='MEditInfo'){//前台投稿
$qiantai=1;
$ziduanzhi=$ecmsfirstpost==1?"":DoReqValue($mid,$ziduan,stripSlashes($r[$ziduan]));
}else{//后台
$qiantai=0;
$ziduanzhi=$ecmsfirstpost==1?"":stripSlashes($r[$ziduan]);
}
?>
<script>var classid='<?=$classid?>',infoid='<?=$id?>',filepass='<?=$filepass?>',ehash='<?=$ecms_hashur[ehref]?>',qiantai='<?=$qiantai?>';</script>
<script src="<?=$public_r['newsurl']?>e/extend/ueditor/ueditor.config.js"></script>
<script src="<?=$public_r['newsurl']?>e/extend/ueditor/ueditor.all.min.js"></script>
<script src="<?=$public_r['newsurl']?>e/extend/ueditor/ueditor.toolbarconfig.js"></script>
<textarea id="<?=$ziduan?>" name="<?=$ziduan?>"><?=$ziduanzhi?></textarea>
<script>
<?=$ziduan?>=UE.getEditor('<?=$ziduan?>',{
serverUrl: "<?=$public_r['newsurl']?>e/extend/ueditor/php/controller.php",//自己的请求接口
toolbars:Default,//工具栏配置文件，具体参考ueditor.toolbarconfig.js文件中说明
pageBreakTag:'',//帝国分页标签
initialFrameWidth:'100%',//编辑器宽
initialFrameHeight:200//编辑器高
//等等其它配置自行添加，参考UE默认配置文件复制修改即可
});
//自定义请求参数
<?=$ziduan?>.ready(function(){
<?=$ziduan?>.execCommand('serverparam',{
'filepass':'<?=$filepass?>',//修改时候是信息ID
'classid' :'<?=$classid?>',
'qiantai':<?=$qiantai?>
});
});
</script>
<table width="100%" border="0" cellpadding="3" cellspacing="1" bgcolor="#DBEAF5">
<tr height="25">
    <td bgcolor="#FFFFFF">
        <input name="dokey" type="checkbox" value="1" <?=$r[dokey]==1?' checked':''?>>关键字替换&nbsp;&nbsp;<input name="copyimg" type="checkbox" id="copyimg" checked value="1">远程保存图片(<input name="mark" type="checkbox" id="mark" value="1"><a href="SetEnews.php" target="_blank">加水印</a>)&nbsp;&nbsp;<input name="copyflash" type="checkbox" id="copyflash" value="1">远程保存FLASH(地址前缀：<input name="qz_url" type="text" id="qz_url" size="">)
    </td>
</tr>
<tr height="25">
    <td bgcolor="#FFFFFF">
        <input name="repimgnexturl" type="checkbox" id="repimgnexturl" value="1"> 图片链接转为下一页&nbsp;&nbsp;<input name="autopage" type="checkbox" id="autopage" value="1">自动分页,每<input name="autosize" type="text" id="autosize" value="5000" size="5">个字节为一页&nbsp;&nbsp;取第<input name="getfirsttitlepic" type="text" id="getfirsttitlepic" value="1" size="1">张上传图为标题图片(<input name="getfirsttitlespic" type="checkbox" id="getfirsttitlespic" value="1">缩略图: 宽<input name="getfirsttitlespicw" type="text" id="getfirsttitlespicw" size="3" value="<?=$public_r[spicwidth]?>">*高<input name="getfirsttitlespich" type="text" id="getfirsttitlespich" size="3" value="<?=$public_r[spicheight]?>">)
    </td>
</tr>
</table>
```