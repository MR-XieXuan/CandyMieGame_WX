let instance

// 统一的下载管理器
export default class DownLoad {
    constructor() {
        if (instance) return instance

        instance = this

        this.status = 0;
        this.downloadList = [
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
        ];



    }


    download(msg) {
        // 下载文件
        // 如果有 传入参数 就添加刀下载列表后面
        if (msg) {
            this.downloadList.push(msg.push(0));
        }

        // 如果下载状态是小于8个下载数 低于就下载
        if (this.status < 8) {
            // 如果列表数大于 下载 数
            if (this.downloadList.length > this.status) {
                // 查找没有被下载的 下载
                for (let i in this.downloadList) {
                    if (this.downloadList[i][2] == 0) {
                        this.downloadList[i][2] = 1;
                        this.status += 1;
                        wx.downloadFile({
                            url: this.downloadList[i][0],
                            filePath: this.downloadList[i][1],
                            success: this.downLoadNext.bind(this),
                            fail: this.downloadAgian.bind(this)
                        });
                        break;
                    }
                }

            }
        }
    }


    downLoadNext(res) {
        console.log(res.filePath);
        this.status -= 1;
        // 检查现在下载完成的是哪个 并且从列表删除
        for (let i in this.downloadList) {
            if (this.downloadList[i][1] == res.filePath) {
                console.log(this.downloadList[i][1] + "<->" + res.filePath);
                this.downloadList[i][2] = 3;
                wx.openDocument({ //打开
                    filePath: res.filePath,
                    success: function (res) {}
                })

                break;
            }
        }

        // 如果下载状态是小于8个下载数 低于就下载
        // 如果下载状态是小于8个下载数 低于就下载
        if (this.status < 8) {
            // 如果列表数大于 下载 数
            if (this.downloadList.length > this.status) {
                // 查找没有被下载的 下载
                for (let i in this.downloadList) {
                    if (this.downloadList[i][2] == 0) {
                        this.downloadList[i][2] = 1;
                        this.status += 1;
                        wx.downloadFile({
                            url: this.downloadList[i][0],
                            filePath: this.downloadList[i][1],
                            success: this.downLoadNext.bind(this),
                            fail: this.downloadAgian.bind(this)
                        });
                        break;
                    }
                }

            }
        }
    }

    all_download() {
        for (let i in this.downloadList) {
            if (this.downloadList[i][2] != 3) {
                return false;
            }
        }
        return true;
    }
    downloadAgian(err) {
        console.log(err);
        delete this.downloadList[0];
        this.downloadList.push();
        this.download();
    }

}