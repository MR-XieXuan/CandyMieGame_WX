export default class CanvasCommunicatGame {
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
