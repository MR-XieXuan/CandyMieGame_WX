import InterPage from "./InterPage/interpage"
import Servo from "./Servo/servo"
import LoadPage from "./LoadPage/LoadPage"
import GamePage from "./GamePage/gamepage";
import Music from "./Audio/audio"
import DownLoad from "./downLoad/downLoad"

const canvas = wx.createCanvas();
const ctx = canvas.getContext('2d');

export default class Main {

    // 创建画布
    constructor() {
        this.prH = canvas.height;
        this.prW = canvas.width;

        this.audio = new Music();

        //获取必要参数
        this.nowPageNum = 0;
        this.nowPage = new LoadPage(canvas);

        this.download = new DownLoad();

        // 检查资源是否缺少
        this.imgList = [
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/1.png', wx.env.USER_DATA_PATH + '/' + 'candys1.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/2.png', wx.env.USER_DATA_PATH + '/' + 'candys2.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/3.png', wx.env.USER_DATA_PATH + '/' + 'candys3.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/4.png', wx.env.USER_DATA_PATH + '/' + 'candys4.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/5.png', wx.env.USER_DATA_PATH + '/' + 'candys5.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/6.png', wx.env.USER_DATA_PATH + '/' + 'candys6.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/7.png', wx.env.USER_DATA_PATH + '/' + 'candys7.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/8.png', wx.env.USER_DATA_PATH + '/' + 'candys8.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/9.png', wx.env.USER_DATA_PATH + '/' + 'candys9.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/10.png', wx.env.USER_DATA_PATH + '/' + 'candys10.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/11.png', wx.env.USER_DATA_PATH + '/' + 'candys11.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/12.png', wx.env.USER_DATA_PATH + '/' + 'candys12.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/candys/13.png', wx.env.USER_DATA_PATH + '/' + 'candys13.png', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/audio/XingYueYe.mp3', wx.env.USER_DATA_PATH + '/' + 'XingYueYe.mp3', 0],
            ['https://panxie.mrxie.xyz/Project/CandyMieGame/images/ctrl/close.png', wx.env.USER_DATA_PATH + '/' + 'close.png', 0]
        ]

        this.imgs = []
        this.imgList.forEach(src => {
            let fs = wx.getFileSystemManager();
            // 同步接口
            try {
                fs.accessSync(src[1]);
            } catch (e) {
                this.download.download(src);
            }
        });

        this.server = new Servo({
                ask: 'district'
            },
            1, 1);


        // 持续刷新
        setInterval(this.show.bind(this), 1000 / 60);

    }

    have_not_file(res) {
        console.log(res);
    }


    updata() {
        this.download.download();
        let flag = this.nowPage.updata();
        if (flag != this.nowPageNum) {
            if (this.nowPageNum == 0) {
                if (this.server.dataMsgOk() && this.download.all_download()) {
                    //console.log("OK");
                    flag = this.server.whereCode;
                } else {
                    return;
                }
            }
            switch (flag) {
                case 0:
                    this.pageQuest = this.nowPage.pageQuest;
                    this.server = new Servo(this.pageQuest.quest, this.nowPageNum, this.pageQuest.nextPage);
                    this.nowPage = new LoadPage(canvas);
                    this.nowPageNum = 0;
                    break;
                case 1:
                    this.nowPage = new InterPage(canvas, this.server.dataMsg());
                    this.nowPageNum = 1;
                    break;
                case 2:
                    this.nowPage = new GamePage(canvas, this.server.dataMsg());
                    this.nowPageNum = 2;
                    break;
            }
        }
    }

    show() {
        this.updata();
        switch (this.nowPageNum) {
            case 0:
                this.nowPage.show();
                break;
            case 1:
                this.nowPage.show();
                break;
            case 2:
                this.nowPage.show();
                break;
            default:
                break;
        }

    }
    addDownLoad(res) {
        this.downloadedList.push(res.filePath);
    }

}