export default class MieGameCan {
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