import Music from "../Audio/audio";

export default class InterPage {


    constructor(canvas, district) {
        console.log("进入 InterPage 界面");

        console.log("获取画布信息");
        this.ctx = canvas.getContext('2d');
        this.prH = canvas.height;
        this.prW = canvas.width;
        this.district = district;

        console.log("获取时间类的信息");
        this.startTime = new Date().getTime();
        console.log("set startTime time : " + this.startTime);
        this.lastShowTime = this.startTime;
        this.invokeTime = new Date().getTime() - this.lastShowTime;

        console.log("获取屏幕信息 并确定界面布局");
        this.get_ranking();
        this.headerPosition = [parseInt(this.prW * 0.05), parseInt(this.prH * 0.05)];
        this.headerSize = [parseInt(this.prW * 0.9), parseInt(this.prH * 0.1)];
        this.bgPosition = [parseInt(this.prW * 0.05), parseInt(this.prH * 0.2)];
        this.bgSize = [parseInt(this.prW * 0.9), parseInt(this.prW * 0.9)];
        this.fireStarSize = [parseInt(this.bgSize[0] * 0.8), parseInt(this.prH * 0.1)];
        this.fireStarPosition = [parseInt((this.prW - this.fireStarSize[0]) / 2), parseInt(this.bgPosition[1] + this.bgSize[1])];
        this.regionSize = [parseInt(this.bgSize[0] * 0.8), parseInt(this.prH * 0.1)];
        this.regionPosition = [parseInt((this.prW - this.fireStarSize[0]) / 2), parseInt(this.fireStarPosition[1] + this.fireStarSize[1])];

        console.log("加载图片列表");
        this.imgSrc = [
            "images/background/title.png",
            "images/background/mainbg.jpg",
            "images/background/fireStar.png",
            "images/background/towards_r.png"
        ];

        this.imgs = []
        this.imgSrc.forEach(src => {
            const img = wx.createImage();
            img.src = src;
            this.imgs.push(img);
        });
        
        // 播放背景音乐
        this.audio = new Music();
        this.audio.playBgm();

        // 开始监听触摸事件
        this.touch = [-1, -1];
        wx.onTouchEnd(this.setTouch.bind(this));

    }

    setTouch(e) {
        this.touch[0] = e.changedTouches[0].clientX;
        this.touch[1] = e.changedTouches[0].clientY;
    }

    show() {
        // 背景
        this.ctx.fillStyle = "#f58f98";
        this.ctx.fillRect(0, 0,
            parseInt(this.prW), parseInt(this.prH));
        // 头
        let imgwh = this.imgs[0].width / this.imgs[0].height;
        this.ctx.drawImage(this.imgs[0], this.headerPosition[0], this.headerPosition[1], this.headerSize[0], this.headerSize[0] / imgwh);
        // 地图
        imgwh = this.imgs[1].width / this.imgs[1].height;
        this.ctx.drawImage(this.imgs[1], this.bgPosition[0], this.bgPosition[1], this.bgSize[0], this.bgSize[0] / imgwh);
        this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        //this.ctx.fillRect(this.bgPosition[0], this.bgPosition[1],
        //    this.bgSize[0], this.bgSize[1]);
        //  冉起星星
        this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.ctx.fillRect(this.fireStarPosition[0], this.fireStarPosition[1],
            this.fireStarSize[0], this.fireStarSize[1]);
        imgwh = this.imgs[2].width / this.imgs[2].height;
        this.ctx.drawImage(this.imgs[2], this.fireStarPosition[0], this.fireStarPosition[1], this.fireStarSize[0], this.fireStarSize[0] / imgwh);
        // 地区以及排名
        this.ctx.fillStyle = "rgba(255,255,255,0.5)";
        this.ctx.fillRect(this.regionPosition[0], this.regionPosition[1],
            this.regionSize[0], this.regionSize[1]);
        this.ctx.fillStyle = "rgba(0,0,0,1)";
        this.ctx.font = this.regionSize[1] / 2 * 0.5 + "px Verdana";

        this.ctx.fillText(this.district[0].name + ":" + this.district[0].starnum + "颗星",
            this.regionPosition[0] + 20, this.regionPosition[1] + (this.regionSize[1] * 0.5) - (this.regionSize[1] / 2 * 0.2));
        this.ctx.fillText("全国排名" + ":" + this.district[0].rank,
            this.regionPosition[0] + 20, this.regionPosition[1] + (this.regionSize[1] * 0.5) + (this.regionSize[1] / 2 * 0.6));
        imgwh = this.imgs[3].width / this.imgs[3].height;
        this.ctx.drawImage(this.imgs[3],
            this.regionPosition[0] + this.regionSize[0] - this.regionSize[1] * imgwh, this.regionPosition[1] + this.regionSize[1] - this.regionSize[1],
            this.regionSize[1] * imgwh, this.regionSize[1]);
        this.ctx.fillText("触摸点" + ":" + this.touch[0] + " , " + this.touch[1],
            0, 100);
    }

    updata() {
        //console.log("InterPage updata");
        //console.log("更新时间参数");
        this.invokeTime = new Date().getTime() - this.lastShowTime;
        //console.log("this.invokeTime => " + this.invokeTime);
        this.lastShowTime = new Date().getTime();
        //console.log("this.lastShowTime =>" + this.lastShowTime);
        //console.log(this.invokeTime);

        // 按键事件处理
        if (this.touch[0] > this.fireStarPosition[0] && this.touch[1] > this.fireStarPosition[1]) {
            if (this.touch[0] < this.fireStarPosition[0] + this.fireStarSize[0] &&
                this.touch[1] < this.fireStarPosition[1] + this.fireStarSize[1]) {
                this.pageQuest = {
                    nextPage : 2,
                    quest:{
                        ask: 'newgame'
                    }
                };
                return 0;
            }
        }
        return 1;
    }

    get_a_ranking(a) {
        let starNum = [];
        for (let i = 1; i < this.district.length; i++) {
            starNum[i - 1] = this.district[i]["starnum"];
        }
        starNum.sort(function(a,b){return b-a});
        for (let i = 0; i < starNum.length; i++) {
            if (this.district[a].starnum == starNum[i])
                return i + 1;
        }
    }
    get_ranking() {
        if (this.district[0] == null) {
            this.district[0] = this.district[1];
        }
        for (let i = 0; i < this.district.length; i++) {
            this.district[i].rank = this.get_a_ranking(this.district[i].id);
        }
    }


}