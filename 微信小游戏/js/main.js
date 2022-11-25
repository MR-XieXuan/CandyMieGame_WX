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
        this.server = new Servo({
                ask: 'district'
            },
            1, 1);


        // 持续刷新
        setInterval(this.show.bind(this), 1000 / 60);

    }



    updata() {
        this.download.download();
        let flag = this.nowPage.updata();
        if (flag != this.nowPageNum) {
            if (this.nowPageNum == 0) {
                if ( this.server.dataMsgOk() && this.download.all_download()  ) {
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