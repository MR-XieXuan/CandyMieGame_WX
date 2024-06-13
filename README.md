# CandyMieGame_WX
WX 卡牌堆叠小游戏。适用与竖屏手机！
这个程序是开源的 仓库地址 ：
https://github.com/MR-XieXuan/CandyMieGame_WX

# 运行环境
已测试正常环境：
* PHP-74,MySQL-5.5.62

# 开始运行(装载到服务器)

## 把 CandyMieGame_PHP 版本安装到你的服务器
你需要再你的服务器中创建 Mysql 库 ，库的结构在 文件 [SQL.md](./SQL.md) 中。
并且在文件[index.php](./index.php)中填写入你访问数据库的账号与密码
```php
$sqlname = "";
$sqlpassword = "";
```
并且运行文件 [SQL.md](./SQL.md)中的命令。
或者直接导入 sql 内的 sql 文件 。

# 添加关卡
需要在数据库 miegame 中表 level 中添加字段 代码如下：
```sql
INSERT INTO `level` (`id`, `address`, `level`, `trytasnum`, `tasnum`) VALUES ([第几关], [json存放路径], 4, 0, 0);
```
## 把 微信小程序程序 运行起来
找到 https://game.mrxie.xyz/ 把他改成你自己的 PHP 网页地址，不要到我这里跑，我的DEMO没有隐藏接口。

#  联系作者
有任何问题都可以联系作者：
<br/>
<center>
QQ: <a href="https://qm.qq.com/cgi-bin/qm/qr?k=DCit0lvtepx0NIsyInE0ynJbVZT3PYzE&noverify=0">[ 3325629928 ]</a>
<br>
E-mail: <a href = "mailto:Mr_Xie_@outlook.com">[ Mr_Xie_@outlook.com ]</a>
<br>
GitHub: <a  href = "https://github.com/MR-XieXuan">[ https://github.com/MR-XieXuan }</a>
<br>
个人私站: <a href = "https://main.mrxie.xyz/">[ https://main.mrxie.xyz/ ]</a>
</center>
<br/>
<br/>

# 加入此项目
CSDN ： [https://bbs.csdn.net/topics/609056350](https://bbs.csdn.net/topics/609056350)
