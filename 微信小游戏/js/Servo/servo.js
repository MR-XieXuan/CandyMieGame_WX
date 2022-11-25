export default class Servo {

    constructor(postList, from, gotoWhere) {
        this.data = "";
        this.status = 0;
        this.fromCode = from;
        this.whereCode = gotoWhere;
        this.SERVO(postList);
        this.postList = postList;
        
    }

    SERVO(postList) {
        // 检查缓存文件是否正确
        
        // POST
        let msg = "";
        for (let i in postList) {
            msg = msg + i + "=" + postList[i] + "&";
        }
        var xhr = {
            url: "https://game.mrxie.xyz/",
            data: msg,
            header: {
                'content-type': "application/x-www-form-urlencoded"
            },
            method: "POST",
            responseType: 'text',
            success: this.apiContat.bind(this),

            fail: this.apifail.bind(this)
        };
        console.log("開始訪問 : " + msg);
        xhr = new wx.request(xhr);

    }

    apiContat(data) {
        this.status = 1;
        this.data = data.data;
    }

    apifail(data) {
        this.status = -1;
        console.log(data.errMsg);
    }

    dataMsgOk() {
        return this.status == 1 ? true : false;
    }

    dataMsg() {
        console.log(this.data);
        return this.data;
    }

    downloadListSc() {

    }

}