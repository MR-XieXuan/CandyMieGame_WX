-------------------------------
# miegame
```markdown
miegame
| ---- ---- ---- ---- level (默认地图)
| ---- ---- id (第几关)
| ---- ---- address (关卡文件存放地址)
| ---- ---- level (难度)
| ---- ---- trytasnum (总共游玩次数)
| ---- ---- tasnum (通关次数)
| ---- ---- ---- ---- star (省份星星数量)
| ---- ---- id (省份ID)
| ---- ---- name (省份中文名)
| ---- ---- starnum (星星数量)
| ---- ---- ---- ---- playerCode (游戏编号)
| ---- ---- playerCode (游戏编号)
| ---- ---- level (已过关的数量)
| ---- ---- creatTime (创建游戏的时间)
| ---- ---- updataTime (更新的时间)
```
```sql
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (1, '北京市', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (2, '北京市', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (3 , '上海市', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (4 , '重庆市', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (5 , '河北省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (6 , '山西省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (7 , '辽宁省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (8 , '吉林省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (9 , '黑龙江省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (10, '江苏省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (11, '浙江省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (12, '安徽省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (13, '福建省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (14, '江西省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (15, '山东省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (16, '河南省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (17, '湖北省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (18, '湖南省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (19, '广东省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (20, '海南省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (21, '四川省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (22, '贵州省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (23, '云南省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (24, '陕西省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (25, '甘肃省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (26, '青海省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (27, '台湾省', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (28, '内蒙古自治区', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (29, '广西壮族自治区', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (30, '西藏自治区', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (31, '宁夏回族自治区', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (32, '新疆维吾尔自治区', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (33, '香港特别行政区', '0');
INSERT INTO `star` (`id`, `name`, `starnum`) VALUES (34, '澳门特别行政区', '0');
INSERT INTO `star` (`id`, `address`, `level`, `trytasnum`, `tasnum`) VALUES (1, './map/level/level1.json', 4, 0, 0);
INSERT INTO `level` (`id`, `address`, `level`, `trytasnum`, `tasnum`) VALUES (2, './map/level/level2.json', 4, 0, 0);
```

