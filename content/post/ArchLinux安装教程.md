---
title: "ArchLinux安装教程"
categories: ["CS"]
tags: ["教程","Linux"]
date: 2018-10-29T23:18:05+08:00
---

在Windows10上安装Arch Linux组成双系统的教程(或者说是记录)。终于在虚拟机安装成功后就激情下单了u盘

<!--more-->

参考教程：
- [官方Wiki](https://wiki.archlinux.org/index.php/Main_page)
- [以官方Wiki的方式安装ArchLinux](https://www.viseator.com/2017/05/17/arch_install/) 

概况：联想的本子，A卡，单硬盘。已装有win10，版本是1803。现装Arch Linux，EFI启动。

如果本文有错漏之处，也请指正，感谢！

## 准备工作

1. **u盘** : 从u盘启动
2. **Arch Linux的iso文件** 地理位置距离较近，下载速度可能能快点
   - [官网下载](https://www.archlinux.org/download/)
   - [浙大镜像站](https://mirrors.zju.edu.cn/archlinux/iso/)
   - [清华镜像站](https://mirrors.tuna.tsinghua.edu.cn/archlinux/iso/)
   - [兰大镜像站](http://mirror.lzu.edu.cn/archlinux/iso/)
   - [国科大镜像站](https://mirrors.ustc.edu.cn/archlinux/iso/)
   - [北京交大镜像站](https://mirror.bjtu.edu.cn/disk3/archlinux/iso/)
   - [上海交大镜像站](http://ftp.sjtu.edu.cn/archlinux/iso/)
   - [大连东软镜像站](https://mirrors.neusoft.edu.cn/archlinux/iso/)
   - [网易镜像站](http://mirrors.163.com/archlinux/iso/)
3. **[USBWriter](https://sourceforge.net/projects/usbwriter/files/)**

### 数据备份

重要数据文件等应进行备份。

### 关闭快速启动

快速启动会影响Grub开机引导过程，故需将其关闭。

1. 快捷键 **Win+X** 菜单
2.  选择 **电源选项** 
3.   **选择电源按钮的功能** ![PowerButton.png](https://i.loli.net/2018/10/29/5bd6c15540c4e.png) 
4.   *更改当前不可用的设置* ，然后 **取消勾选快速启动** 后 *保存修改* ![PowerOptions.png](https://i.loli.net/2018/11/02/5bdc03f15869c.png) 

### 磁盘准备

*Win+X* 选择 *磁盘管理* ，考虑准备分配多少空间给Linux系统，在适当的分区右键选择 *压缩卷* ，填写你的数值（以M为单位），等压缩完成后即可看到一个新的未分配空间。

## 制作启动u盘

下载iso文件，安装好 *[USBWriter](https://sourceforge.net/projects/usbwriter/files/)* 后将其打开，将u盘连接上电脑 ![USBWriter.png](https://i.loli.net/2018/10/29/5bd6c155c41b9.png)
完成后可能电脑会看不到u盘，但它其实是变成了这种……后续从u盘启动时没遇到问题。 ![UsbDevice.png](https://i.loli.net/2018/11/02/5bdc03f0dcf0e.png)

> 一开始我是选择了使用UltraISO的，但选择从u盘启动时出现了无限重启，只好回Windows重新制作启动盘。

## 关闭安全启动


进入**BIOS** ， ![BIOSSetup.jpeg](https://i.loli.net/2018/11/02/5bdc03f16c590.jpeg) 按方向键移到 *Security* 选项卡，将 *Secure Boot* 修改为 *Disabled* 。 ![SecureBoot.jpeg](https://i.loli.net/2018/11/02/5bdc03f16d380.jpeg) 

> 不同电脑进入BIOS的方式有所不同，我手上的联想本子是机身有一个凹进去的小孔，关机后用牙签或笔芯之类较细的物品戳一下即可打开“Novo Button Menu”菜单

方向键移动到 *Boot* 选项卡， *Boot Mode* 即为启动方式。 ![BootMode.jpeg](https://i.loli.net/2018/10/31/5bd9600022467.jpeg) 较新的电脑基本都是EFI启动，所以就是顺手看一下。

*F10* 然后输入 *Y* ，退出并保存设置。

---

## u盘启动

进入 **Boot Menu** ![BootMenu.jpeg](https://i.loli.net/2018/10/31/5bd9629e3e840.jpeg) 然后选择从u盘启动。

正常情况就进入Arch Linux的界面啦，一个超大的LOGO，下边有几个启动选项，默认是 **Boot Arch Linux(x86_64)** （32位的电脑可能不一样），几秒后自动加载进入命令行安装界面。

## 开始安装

> GitHub上也有安装脚本，想简单点的话可以试试。

### 验证引导方式

主要分为EFI+GPT和BIOS(LEGACY)+MBR，`ls /sys/firmware/efi/efivars` 如果说目录不存在则可能是以BIOS启动的。

一个再保险点的方法， `fdisk -l` 查看分区表，EFI启动的话， *Disklable type* 的属性为 *gpt* 并且有一个 *EFI System* 小分区。 ![fisk-l.png](https://i.loli.net/2018/10/30/5bd7bfd49d171.png) 

> 我们刚才在BIOS里也查看了启动方式，不同的启动方式的分区挂载和Grub安装会有区别，所以需要确认呢。

### 联网

```shell
dhcpcd # 有线
wifi-menu # wifi
ping -c 5 baidu.com # 测试网络
```

### 更新系统时间

`timedatectl set-ntp true`

### 分区&格式化&挂载

#### 分区

`fdisk -l` 能看到磁盘（包括硬盘和u盘）。*Disk* 磁盘名称，*Device* 是分区。我这边的话是 */dev/sda* 是我的硬盘，*/dev/sda1* 是EFI分区。挂载时把 */boot* 挂载到EFI分区。

如果是在一块全新的硬盘安装，那么还需要创建引导分区的。EFI启动要求硬盘里必须有这个分区。

```shell
fdisk /dev/sda # sda替换为要操作的磁盘
n # 新建分区 选择序号和起始扇区都可以直接回车，也就是回车两次，然后输入结束扇区
+20g #设置该分区空间，大小自定，然后继续新建分区直到完成分区
p #查看分区情况
w #写入磁盘
q #退出fdisk
```

`fdisk -l` 时不能看到未分配的空间，但它们是存在的。可以给最后一个分区分配所有剩余空间。

安装完成后可能会提示逻辑分区和物理分区不一致，到时修复一下就行。

#### 格式化

```shell
mkfs.ext4 /dev/sdax #sdax替换为要格式化的分区，将创建的分区格式化为ext4文件系统
# 如果创建了交换分区
mkswap /dev/sdax #格式化为交换分区
swapon /dev/sdax #启用交换分区
```

#### 挂载分区

```shell
mount /dev/sdax /mnt #sdax替换为根分区，必须先挂载根分区
mkdir /mnt/boot /mnt/home /mnt/var #创建需挂载的目录
mount /dev/sda1 /mnt/boot #将引导分区挂载到boot
# 再依次挂载 | 若有交换分区启用即可，不用挂载
```

### 选择镜像源

官方源速度不是很稳定距离也较远，可以选择离我们更近的镜像源。使用nano打开源列表（nano是自带的，也可自行安装其他编辑器来打开它） `nano /etc/pacman.d/mirrorlist` 

```shell
# 在头部注释之后添加镜像源
# zju
Server = https://mirrors.zju.edu.cn/archlinux/$repo/os/$arch
# ustc
Server = https://mirrors.ustc.edu.cn/archlinux/$repo/os/$arch
# tsinghua
Server = https://mirrors.tuna.tsinghua.edu.cn/archlinux/$repo/os/$arch
```

*Ctrl+O* 写入， *Ctrl+X* 离开

## 安装基本系统

`pacstrap /mnt base base-devel` 使用 *pacstrap* 脚本安装基础包。

## 配置系统

### Fstab

`genfstab -U /mnt >> /mnt/etc/fstab` 生成fstab文件。执行完请检查一下生成的/mnt/etc/fstab文件是否正确。

`cat /mnt/etc/fstab` 检查分区和挂载是否正确。

#### Chroot

`arch-chroot /mnt` 执行这步之后，我们的操作都相当于在磁盘上的新装的系统中进行。

#### 设置时区

```shell
ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime
hwclock --systohc #硬件时间，运行hwclock以生成/etc/adjtime
```

#### 提前安装软件

`pacman -S git vim zsh ntf-3g dialog wpa_supplicant networkmanager`

安装 *git* , *vim* , *zsh* 和一些必须的包。

#### 本地化（设置Locale）

`vim /etc/locale.gen` 

找到 *zh_CN.UTF-8 UTF-8*  *zh_HK.UTF-8 UTF-8* *zh_TW.UTF-8 UTF-8*  和*en_US.UTF-8 UTF-8* 这四行，去掉行首的#号，保存并退出。

```shell
# vim使用
:数字 # 跳转到该行
i # 光标之前插入
I # 光标所在行的行首插入
a # 光标之后插入
A # 光标所在行的行尾插入
Esc # 退出插入模式
:wq # 保存退出
```

`locale-gen` 生成/etc/locale.gen文件

`vim /etc/locale.conf` 添加 *LANG=en_US.UTF-8* 

---
未完待续
