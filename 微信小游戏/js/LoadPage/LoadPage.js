export default class LoadPage {
    constructor(canvas) {
        console.log("进入 InterPage 界面");

        console.log("获取画布信息");
        this.canvas = canvas;
        this.ctx = this.canvas.getContext('2d');
        this.prH = canvas.height;
        this.prW = canvas.width;


        console.log("获取时间类的信息");
        this.startTime = new Date().getTime();
        console.log("set startTime time : " + this.startTime);
        this.lastShowTime = this.startTime;
        this.invokeTime = new Date().getTime() - this.lastShowTime;
        this.lodingtime = 0;

        console.log("获取屏幕信息 并确定界面布局");
        this.canvas_before = this.canvas.toDataURL();
        // 获取画面
        console.log("加载图片列表");
        this.imgSrc = [
            this.canvas_before,
            "images/background/starLoding.png",
            "images/background/loding.png"
        ];

        this.imgs = []
        this.imgSrc.forEach(src => {
            const img = wx.createImage();
            img.src = src;
            this.imgs.push(img);
        });
        this.showData = 0;
    }

    updata() {
        return 1;
    }

    show() {
        if (this.showData < 2) {
            this.img_1wh = this.imgs[1].width / this.imgs[1].height;
            this.img_1Size = [parseInt(this.img_1wh * this.prH * 0.3), parseInt(this.prH * 0.3)];
            this.img_1Position = [parseInt((this.prW - this.img_1Size[0]) / 2), parseInt((this.prH - this.img_1Size[1]) / 2)];
            this.moveTo_0_0 = (this.prW + 2 * this.img_1Size[0]) / 90;
            this.moveTo_0_1 = this.img_1Size[0] / 2;
            this.moveTo_1_0 = this.img_1Position[1] + this.img_1Size[1] / 2
            this.lineTo_0_1 = (this.img_1Position[1] / Math.tan(60 * 0.017453293));
            this.img_2wh = this.imgs[2].width / (this.imgs[2].height / 91);
            this.img_2Size = [parseInt(this.img_2wh * this.prH * 0.3), parseInt(this.prH * 0.3)];
            this.img_2Position = [parseInt((this.prW - this.img_2Size[0]) / 2), parseInt((this.prH - this.img_2Size[1]) / 2)];
            this.img_2_a_h = this.imgs[2].height / 91;
            this.showData++;
        }
        // console.log(this.lodingtime)
        this.ctx.beginPath();
        this.ctx.moveTo(this.moveTo_0_0 * this.lodingtime - this.moveTo_0_1, this.moveTo_1_0);
        this.ctx.lineTo(
            (this.moveTo_0_0 * this.lodingtime - this.moveTo_0_1) - this.lineTo_0_1,
            0);
        this.ctx.lineTo(0, 0);
        this.ctx.lineTo(0, this.prH);
        this.ctx.lineTo(
            (this.moveTo_0_0 * this.lodingtime - this.moveTo_0_1) - this.lineTo_0_1,
            this.prH);
        this.ctx.closePath();
        this.ctx.stroke();
        this.ctx.fillStyle = 'pink';
        this.ctx.fill();
        if (this.lodingtime < 90) {
            this.ctx.drawImage(this.imgs[1],
                this.moveTo_0_0 * this.lodingtime - this.img_1Size[0],
                this.img_1Position[1],
                this.img_1Size[0],
                this.img_1Size[1]);
        }
        this.ctx.drawImage(
            this.imgs[2],
            0,
            parseInt(this.lodingtime / 2) % 90  * this.img_2_a_h  ,
            this.imgs[2].width,
            this.img_2_a_h,
            (this.prW + this.img_2Size[0]) / 90 * ((this.lodingtime < 90 ? this.lodingtime : 90) - 45) - this.img_2Size[0],
            this.img_2Position[1],
            this.img_2Size[0],
            this.img_2Size[1]
        );
        this.lodingtime++;
    }



}