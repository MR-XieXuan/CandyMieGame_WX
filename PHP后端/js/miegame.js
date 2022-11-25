class MieGamePoker {
    MIEGAME_POKERAMOUNT_MAX = 504;
    POKERTYPE_AMOUNT = 6;
    POKER_REMOVE_NUM = 3;
    POKER_SIZE = 10;
    amount = 0; // 牌的总数
    residue = 0;
    pokerBitmap = []; // 最多容纳 504 张牌
    pokerPosition = []; // [牌号][位置x，位置y，类型t,亮暗a]
    constructor(pokerSize) {
        this.POKER_SIZE = pokerSize;
    }
    place_a_poker(x, y, type) {
        // 放置一张牌
        //判断是否可以放的下了
        if (this.amount + 1 <= this.MIEGAME_POKERAMOUNT_MAX) {
            // 放的下
            //printf("总数加1\n");
            this.amount++; // 总数加1
            this.residue++;
            //printf("Srtbit\n");
            this.pokerBitmap = this.Set_bit(this.pokerBitmap, this.amount - 1);
            this.pokerPosition[this.amount - 1] = [];
            this.pokerPosition[this.amount - 1][0] = x;
            this.pokerPosition[this.amount - 1][1] = y;
            this.pokerPosition[this.amount - 1][2] = type;
            this.pokerPosition[this.amount - 1][3] = 1;
            // 更新其他牌的亮暗状态
            //printf("刷新牌堆\n");
            //refresh_poker_a();
            //printf("返回牌数\n");
            return this.amount;
        } else {
            // 放不下
            return 0;
        }
    }
    takeaway_a_poker(x, y) {
        // 通过位置拿走一张牌
        for (let i = this.amount - 1; i >= 0; i--) {
            // 遍历牌堆
            if (this.Get_bit(this.pokerBitmap, i)) {
                // 如果这张牌没有被拿走 继续执行
            } else {
                /* 这张牌已经被拿走了 */
                continue;
            }
            if (this.pokerPosition[i][0] >= x - this.POKER_SIZE / 2 && this.pokerPosition[i][0] <= x + this.POKER_SIZE / 2) {
                // 检查x是否达标 
            } else {
                /* x 未达标 */
                continue;
            }
            if (this.pokerPosition[i][1] >= y - this.POKER_SIZE / 2 && this.pokerPosition[i][1] <= y + this.POKER_SIZE / 2) {
                // 检查y是否达标 继续执行
            } else {
                /* y 未达标 */
                continue;
            }
            if (this.pokerPosition[i][3] == 1) {
                // 检查这张牌是不是亮牌
            } else {
                /* 这张牌是暗牌 */
                continue;
            }
            // 移除这张牌，并返回牌的类型
            this.pokerBitmap = this.Res_bit(this.pokerBitmap, i);
            this.residue--;
            return this.pokerPosition[i][2];
        } return 0;
    }

    refresh_poker_a() {
        // 先将全部变为没有被压
        for (let i = this.amount - 1; i >= 0; i--) {
            this.pokerPosition[i][3] = 1;
        }
        // 找出被压牌
        for (let i = this.amount - 1; i >= 0; i--) {
            // 从大遍历所有牌
            //printf("遍历牌 i : %d \n", i);
            if (this.Get_bit(this.pokerBitmap, i)) {
                // 检查这张牌是否已经被拿走
                // 没有被拿走则继续执行
                //printf("没有被拿走 %d \n", i);
            } else { continue; }
            for (let j = i - 1; j >= 0; j--) {
                // 检查底下的牌是否有被这张牌压住的，被压住的标记为黑牌
                //printf("检查牌 j : %d \n", j);
                if (this.pokerPosition[i][0] + this.POKER_SIZE > this.pokerPosition[j][0] && this.pokerPosition[i][0] - this.POKER_SIZE < this.pokerPosition[j][0]) {
                    // 检查 x 方向是否被压
                    // x 方向被压 
                } else {
                    // x 方向没有被压 
                    //printf("没有被压 x \n");
                    continue;
                }
                if (this.pokerPosition[i][1] + this.POKER_SIZE > this.pokerPosition[j][1] && this.pokerPosition[i][1] - this.POKER_SIZE < this.pokerPosition[j][1]) {
                    // 检查 y 方向是否被压
                    this.pokerPosition[j][3] = 0;
                } else {
                    // y 方向没有被压 
                    //printf("没有被压 y \n");
                }
            }
        }
    }
    get_poker_a(n) {
        return this.pokerPosition[n - 1][3];
    }

    get_poker_x(n) {
        return this.pokerPosition[n - 1][0];
    }

    get_poker_y(n) {
        return this.pokerPosition[n - 1][1];
    }

    get_poker_t(n) {
        return this.pokerPosition[n - 1][2];
    }
    get_poker_have(n) {
        // 获取这张牌是否被拿走
        return this.Get_bit(this.pokerBitmap, n - 1);
    }

    Set_bit(st, num) {
        st[parseInt(num / 8)] |= (0x01 << (num % 8));
        return st;
    }

    Res_bit(st, num) {
        st[parseInt(num / 8)] &= ~(0x01 << (num % 8));
        return st;
    }

    Get_bit(st, num) {
        return (st[parseInt(num / 8)] & (0x01 << (num % 8))) > 0 ? 1 : 0;
    }


}

class CanvasCommunicatGame {
    constructor(gameW, gameH, canvaW, canvaH) {
        this.rateW = gameW / canvaW;
        this.rateH = gameH / canvaH;
    }
    cw_to_gw(canvaw) {
        return parseInt(this.rateW * canvaw);
    }
    ch_to_gh(canvah) {
        return parseInt(this.rateH * canvah);
    }
    gw_to_cw(gamew) {
        return parseInt(gamew / this.rateW);
    }
    gh_to_ch(gameh) {
        return parseInt(gameh / this.rateH);
    }

}

class MieGameCan {
    pokerMap = [];
    pokerAmount = 0;
    constructor(size) {
        this.size = size;
        for (var i = 0; i < size; i++) {
            this.pokerMap[i] = 0;
        }
    }
    place_a_poker(t) {
        // 遍历牌堆
        if (t == 0) {
            return 0;
        }
        if (this.pokerAmount == this.size) {
            // 如果牌堆满了
            return -1;
        }
        for (var i = 0; i <= this.pokerAmount; i++) {
            if (this.pokerMap[i] == t) {
                // 找到同型牌，并放到同型牌的后面
                this.pokerMap.splice(i + 1, 0, t);
                this.pokerAmount++;
                return i + 1;
            } else if (this.pokerMap[i] == 0) {
                this.pokerMap.splice(i, 0, t);
                this.pokerAmount++;
                return i;
            }
        }
    }
    eliminate_pokers() {
        // 消除 卡牌 
        for (var i = 0; i < this.pokerAmount - 2; i++) {
            if (this.pokerMap[i] == this.pokerMap[i + 1] && this.pokerMap[i + 1] == this.pokerMap[i + 2]) {
                this.pokerMap.splice(i, 3);
                this.pokerAmount -= 3;
                return 1;
            }
        }
        return 0;
    }
    get_pokercan() {
        return this.pokerMap;
    }
    get_poker_fall() {
        if (this.pokerAmount >= this.size) {
            // 如果牌堆满了
            return 1;
        } else {
            return 0;
        }
    }
}
