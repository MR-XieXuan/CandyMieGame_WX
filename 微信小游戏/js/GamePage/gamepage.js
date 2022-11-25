import MieGamePoker from "./MieGamePoker/MieGamePoker"
import MieGameCan from "./MieGameCan/MieGameCan"
import CanvasCommunicatGame from "./CanvasCommunicatGame/CanvasCommunicatGame"


export default class GamePage {
    constructor(canvas, gameJson) {
        console.log("进入 InterPage 界面");

        if( typeof(gameJson.playerCode) == "undefined" ){
            return 0 ;
        }

        console.log("获取画布信息");
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.prH = canvas.height;
        this.prW = canvas.width;
        this.gameJson = gameJson;

        console.log("获取时间类的信息");
        this.startTime = new Date().getTime();
        console.log("set startTime time : " + this.startTime);
        this.lastShowTime = this.startTime;
        this.invokeTime = new Date().getTime() - this.lastShowTime;

        console.log("获取屏幕信息 并确定界面布局");


        // 根据屏幕与地图大小划分区域
        // 找到短边 以短边来划分 地图占宽的 80
        let wh = this.prW / this.prH;
        if (wh >= 0.9 && wh <= 1) {
            this.headerSize = [this.prW * 0.9, this.prW * 0.1];
            this.headerPosition = [this.prW * 0.05, this.prW * 0.05];
            this.mapSize = parseInt((this.prW) * 0.6);
            this.mapPosition = [parseInt((this.prW - this.mapSize) / 2), parseInt((this.headerPosition[1]) + this.headerSize[1])];
            this.frePosition = [parseInt(this.headerPosition[0]), parseInt((this.headerPosition[1] + this.headerSize[1]))];
            this.freSize = [parseInt(this.mapPosition[0] - this.frePosition[0]), parseInt(this.mapSize)];
            this.canSize = [parseInt(this.headerSize[1] * 7), parseInt(this.headerSize[1])];
            this.canPosition = [parseInt((this.prW - this.canSize[0]) / 2), parseInt((this.mapPosition[1] + this.mapSize + this.prH * 0.05))];
            this.propsPosition = [parseInt(this.mapPosition[0] + this.mapSize), parseInt(this.headerPosition[1] + this.headerSize[1])];
            this.propsSize = [parseInt(this.headerPosition[0] + this.headerSize[0] - this.propsPosition[0]), parseInt(this.freSize[1])];
        } else if (wh >= 0.75 && wh <= 0.9) {
            console.log("ee" + wh);
            this.headerSize = [this.prW * 0.9, this.prW * 0.1];
            this.headerPosition = [this.prW * 0.05, this.prW * 0.05];
            this.mapSize = parseInt((this.prW) * 0.6);
            this.mapPosition = [parseInt((this.prW - this.mapSize) / 2), parseInt((this.headerPosition[1]) + this.headerSize[1])];
            this.frePosition = [parseInt(this.mapPosition[0]), parseInt((this.mapPosition[1] + this.mapSize))];
            this.freSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
            this.canPosition = [parseInt(0), parseInt((this.frePosition[1] + this.freSize[1]))];
            this.canSize = [parseInt(this.mapSize), parseInt(this.mapSize / 7)];
            this.canPosition[0] = (parseInt(this.prW - this.canSize[0]) / 2);
            this.propsPosition = [parseInt(this.mapPosition[0]), parseInt((this.canPosition[1] + this.canSize[1]))];
            this.propsSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
        } else if (wh >= 0.64 && wh <= 0.75) {
            console.log("ee" + wh);
            this.headerSize = [this.prW * 0.9, this.prW * 0.1];
            this.headerPosition = [this.prW * 0.05, this.prW * 0.05];
            this.mapSize = parseInt((this.prW) * 0.8);
            this.mapPosition = [parseInt((this.prW - this.mapSize) / 2), parseInt((this.headerPosition[1]) + this.headerSize[1])];
            this.frePosition = [parseInt(this.mapPosition[0]), parseInt((this.mapPosition[1] + this.mapSize))];
            this.freSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
            this.canPosition = [parseInt(0), parseInt((this.frePosition[1] + this.freSize[1]))];
            this.canSize = [parseInt(this.mapSize), parseInt(this.mapSize / 7)];
            this.canPosition[0] = (parseInt(this.prW - this.canSize[0]) / 2);
            this.propsPosition = [parseInt(this.mapPosition[0]), parseInt((this.canPosition[1] + this.canSize[1]))];
            this.propsSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
        } else if (wh >= 0.55 && wh <= 0.64) {
            this.headerSize = [this.prW * 0.9, this.prW * 0.1];
            this.headerPosition = [this.prW * 0.05, this.prW * 0.05];
            this.mapSize = parseInt((this.prW) * 0.8);
            this.mapPosition = [parseInt((this.prW - this.mapSize) / 2), parseInt((this.headerPosition[1]) + this.headerSize[1] + this.prH * 0.03)];
            this.frePosition = [parseInt(this.mapPosition[0]), parseInt((this.mapPosition[1] + this.mapSize + this.prH * 0.03))];
            this.freSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
            this.canPosition = [parseInt(0), parseInt((this.frePosition[1] + this.freSize[1]) + this.prH * 0.03)];
            this.canSize = [parseInt(this.mapSize), parseInt(this.mapSize / 7)];
            this.canPosition[0] = (parseInt(this.prW - this.canSize[0]) / 2);
            this.propsPosition = [parseInt(this.mapPosition[0]), parseInt((this.canPosition[1] + this.canSize[1]) + this.prH * 0.03)];
            this.propsSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
        } else if (wh >= 0.5 && wh <= 0.55) {
            this.headerSize = [this.prW * 0.9, this.prW * 0.1];
            this.headerPosition = [this.prW * 0.05, this.prW * 0.05];
            this.mapSize = parseInt((this.prW) * 0.9);
            this.mapPosition = [parseInt((this.prW - this.mapSize) / 2), parseInt((this.headerPosition[1] + this.headerSize[1]) + this.prH * 0.03)];
            this.frePosition = [parseInt(this.mapPosition[0]), parseInt((this.mapPosition[1] + this.mapSize) + this.prH * 0.03)];
            this.freSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
            this.canPosition = [parseInt(0), parseInt((this.frePosition[1] + this.freSize[1]) + this.prH * 0.02)];
            this.canSize = [parseInt(this.mapSize), parseInt(this.mapSize / 7)];
            this.canPosition[0] = (parseInt(this.prW - this.canSize[0]) / 2);
            this.propsPosition = [parseInt(this.mapPosition[0]), parseInt((this.canPosition[1] + this.canSize[1]) + this.prH * 0.03)];
            this.propsSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
        } else if (wh >= 0.45 && wh <= 0.5) {
            this.headerSize = [this.prW * 0.9, this.prW * 0.1];
            this.headerPosition = [this.prW * 0.05, this.prW * 0.05 + this.prH * 0.05];
            this.mapSize = parseInt((this.prW) * 0.9);
            this.mapPosition = [parseInt((this.prW - this.mapSize) / 2), parseInt((this.headerPosition[1] + this.headerSize[1]) + this.prH * 0.03)];
            this.frePosition = [parseInt(this.mapPosition[0]), parseInt((this.mapPosition[1] + this.mapSize) + this.prH * 0.03)];
            this.freSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
            this.canPosition = [parseInt(0), parseInt((this.frePosition[1] + this.freSize[1]) + this.prH * 0.02)];
            this.canSize = [parseInt(this.mapSize), parseInt(this.mapSize / 7)];
            this.canPosition[0] = (parseInt(this.prW - this.canSize[0]) / 2);
            this.propsPosition = [parseInt(this.mapPosition[0]), parseInt((this.canPosition[1] + this.canSize[1]) + this.prH * 0.03)];
            this.propsSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
        } else if (wh >= 0.0 && wh <= 0.45) {
            this.headerSize = [this.prW * 0.9, this.prW * 0.1];
            this.headerPosition = [this.prW * 0.05, this.prW * 0.05 + this.prH * 0.1];
            this.mapSize = parseInt((this.prW) * 0.9);
            this.mapPosition = [parseInt((this.prW - this.mapSize) / 2), parseInt((this.headerPosition[1] + this.headerSize[1]) + this.prH * 0.03)];
            this.frePosition = [parseInt(this.mapPosition[0]), parseInt((this.mapPosition[1] + this.mapSize) + this.prH * 0.03)];
            this.freSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
            this.canPosition = [parseInt(0), parseInt((this.frePosition[1] + this.freSize[1]) + this.prH * 0.02)];
            this.canSize = [parseInt(this.mapSize), parseInt(this.mapSize / 7)];
            this.canPosition[0] = (parseInt(this.prW - this.canSize[0]) / 2);
            this.propsPosition = [parseInt(this.mapPosition[0]), parseInt((this.canPosition[1] + this.canSize[1]) + this.prH * 0.03)];
            this.propsSize = [parseInt(this.mapSize), parseInt(this.prH * 0.1)];
        }

        // 设置比例
        this.communicate = new CanvasCommunicatGame(this.gameJson.mapSizeW, this.gameJson.mapSizeH, this.mapSize, this.mapSize);

        // 初始化游戏
        // 游戏
        this.can = new MieGameCan(7);
        this.game = new MieGamePoker(this.gameJson.pokerSize);
        for (var i = 0; i < this.gameJson.pokerAmount; i++) {
            this.game.place_a_poker(this.gameJson.pokerList[i][0], this.gameJson.pokerList[i][1], this.gameJson.pokerList[i][2]);
        }
        this.game.refresh_poker_a();


        console.log("加载图片列表");
        this.imgSrc = [
            wx.env.USER_DATA_PATH + '/' + 'candys1.png',
            wx.env.USER_DATA_PATH + '/candys2.png',
            wx.env.USER_DATA_PATH + '/candys3.png',
            wx.env.USER_DATA_PATH + '/candys4.png',
            wx.env.USER_DATA_PATH + '/candys5.png',
            wx.env.USER_DATA_PATH + '/candys6.png',
            wx.env.USER_DATA_PATH + '/candys7.png',
            wx.env.USER_DATA_PATH + '/candys8.png',
            wx.env.USER_DATA_PATH + '/candys9.png',
            wx.env.USER_DATA_PATH + '/candys10.png',
            wx.env.USER_DATA_PATH + '/candys11.png',
            wx.env.USER_DATA_PATH + '/candys12.png',
            wx.env.USER_DATA_PATH + '/candys13.png',
            wx.env.USER_DATA_PATH + '/close.png',
        ];

        this.imgs = []
        this.imgSrc.forEach(src => {
            const img = wx.createImage();
            img.src = src;
            this.imgs.push(img);
        });


        // 开始监听触摸事件
        this.touch = [-1, -1];
        wx.onTouchEnd(this.setTouch.bind(this));

    }

    setTouch(e) {
        this.touch[0] = e.changedTouches[0].clientX;
        this.touch[1] = e.changedTouches[0].clientY;
    }

    show() {
        if( typeof(this.gameJson) == "undefined" ){
            this.miegame_fail();
            return 0 ;
        }

        // 背景
        this.ctx.fillStyle = "#f58f98";
        this.ctx.fillRect(0, 0,
            parseInt(this.prW), parseInt(this.prH));
        // 顶部导航栏
        this.ctx.drawImage(this.imgs[13], this.headerPosition[0], this.headerPosition[1], this.headerSize[1] * 0.6, this.headerSize[1] * 0.6);
        // 牌区
        this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.ctx.fillRect(this.mapPosition[0], this.mapPosition[1],
            this.mapSize, this.mapSize);
        // 闲置区
        this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.ctx.fillRect(this.frePosition[0], this.frePosition[1],
            this.freSize[0], this.freSize[1]);
        // 堆牌区
        this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.ctx.fillRect(this.canPosition[0], this.canPosition[1],
            this.canSize[0], this.canSize[1]);
        // 道具区
        this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.ctx.fillRect(this.propsPosition[0], this.propsPosition[1],
            this.propsSize[0], this.propsSize[1]);
        // 卡牌区
        for (var i = 1; i <= this.game.amount; i++) {
            if (this.game.get_poker_have(i)) {
                this.ctx.fillStyle = "#000000";
                this.ctx.drawImage(
                    this.imgs[this.game.get_poker_t(i)],
                    this.communicate.gw_to_cw(this.game.get_poker_x(i) - this.game.POKER_SIZE / 2) + this.mapPosition[0],
                    this.communicate.gh_to_ch(this.game.get_poker_y(i) - this.game.POKER_SIZE / 2) + this.mapPosition[1],
                    this.communicate.gw_to_cw(this.game.POKER_SIZE),
                    this.communicate.gh_to_ch(this.game.POKER_SIZE));
                this.ctx.strokeRect(
                    this.communicate.gw_to_cw(this.game.get_poker_x(i) - this.game.POKER_SIZE / 2) + this.mapPosition[0],
                    this.communicate.gh_to_ch(this.game.get_poker_y(i) - this.game.POKER_SIZE / 2) + this.mapPosition[1],
                    this.communicate.gw_to_cw(this.game.POKER_SIZE),
                    this.communicate.gh_to_ch(this.game.POKER_SIZE));
                if (!this.game.get_poker_a(i)) {
                    this.ctx.fillStyle = "rgba(0,0,0,0.25)";
                    this.ctx.fillRect(
                        this.communicate.gw_to_cw(this.game.get_poker_x(i) - this.game.POKER_SIZE / 2) + this.mapPosition[0],
                        this.communicate.gh_to_ch(this.game.get_poker_y(i) - this.game.POKER_SIZE / 2) + this.mapPosition[1],
                        this.communicate.gw_to_cw(this.game.POKER_SIZE),
                        this.communicate.gh_to_ch(this.game.POKER_SIZE));
                }
            }
        }
        // 牌堆区
        for (var i = 0; i < this.can.pokerAmount; i++) {
            if (this.can.pokerMap[i] == 0) {
                break;
            }
            this.ctx.drawImage(this.imgs[this.can.pokerMap[i]], i * this.canSize[0] / 7 + 2 + this.canPosition[0], parseInt(this.canPosition[1]) + 2,
                parseInt(this.canSize[0] / 7) - 4, parseInt(this.canSize[0] / 7) - 4);
            this.ctx.strokeRect(i * this.canSize[0] / 7 + 2 + this.canPosition[0], parseInt(this.canPosition[1]) + 2,
                parseInt(this.canSize[0] / 7) - 4, parseInt(this.canSize[0] / 7) - 4);
        }

    }

    updata() {
        //console.log("InterPage updata");
        //console.log("更新时间参数");
        this.invokeTime = new Date().getTime() - this.lastShowTime;
        //console.log("this.invokeTime => " + this.invokeTime);
        this.lastShowTime = new Date().getTime();
        //console.log("this.lastShowTime =>" + this.lastShowTime);
        //console.log(this.invokeTime);

        if( typeof(this.gameJson) == "undefined" ){
            this.miegame_fail();
            return 0 ;
        }

        // 按键事件处理
        if(this.miegame_action(this.touch[0], this.touch[1]) != 2){
            return 0 ;
        }
        return 2;
    }

    miegame_action(cx, cy) {
        // 获取鼠标点击的位置
        if (cx >= this.mapPosition[0] && cx <= this.mapPosition[0] + this.mapSize && cy >= this.mapPosition[1] && cy <= this.mapPosition[1] + this.mapSize) {
            // 如果点击的是地图内的话
            var gx = this.communicate.cw_to_gw(cx - this.mapPosition[0]);
            var gy = this.communicate.ch_to_gh(cy - this.mapPosition[1]);
            //  鼠标位置改为游戏位置
            //console.log("x:" + cx + ",y:" + cy);
            console.log("gx:" + gx + ",gy:" + gy);
            // 去除牌
            this.can.place_a_poker(this.game.takeaway_a_poker(gx, gy));
            this.can.eliminate_pokers();
            this.game.refresh_poker_a();
            if (this.can.get_poker_fall()) {
                // 如果牌堆满了
                this.miegame_fail(); // 游戏失败
                return 0;
            } else {}
            if (this.game.residue == 0) {
                // 如果卡牌区没牌了
                this.miegame_win(); //游戏胜利
                return 0;
            }
        } else if (cx >= this.headerPosition[0] &&
            cx <= this.headerPosition[0] + this.headerSize[1] * 0.6 &&
            cy >= this.headerPosition[1] &&
            cy <= this.headerPosition[1] + this.headerSize[1] * 0.6) {
            // 如果是返回键的话
            this.miegame_fail();
            return 0;
        }
        this.touch[0] = -1;
        this.touch[1] = -1;
        return 2;
    }
    miegame_win() {
        console.log("win");
        this.pageQuest = {
            nextPage : 2,
            quest:{
                ask: 'nextgame',
                playerCode: this.gameJson.playerCode
            }
        };
    }
    miegame_fail() {
        console.log("fail");
        this.pageQuest = {
            nextPage : 1,
            quest:{
                ask: 'district'
            }
        };
    }


}