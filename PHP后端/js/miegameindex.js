function mie_game_index() {
    window.nowPage = 2 ;
    // 游戏
    window.can = new MieGameCan(7);
    window.gameJson = JSON.parse(window.gameJson);
    window.game = new MieGamePoker(window.gameJson.pokerSize);
    // 获取屏幕 大小
    window.prH = window.screen.availHeight;
    window.prW = window.screen.availWidth;
    // 根据屏幕与地图大小划分区域
    // 找到短边 以短边来划分 地图占宽的 80
    let wh = prW / prH;
    if (wh >= 0.9 && wh <= 1) {
        window.headerSize = [window.prW * 0.9, window.prW * 0.1];
        window.headerPosition = [window.prW * 0.05, window.prW * 0.05];
        window.mapSize = parseInt((prW) * 0.6);
        window.mapPosition = [parseInt((prW - mapSize) / 2), parseInt((headerPosition[1]) + headerSize[1])];
        window.frePosition = [parseInt(headerPosition[0]), parseInt((headerPosition[1] + headerSize[1]))];
        window.freSize = [parseInt(mapPosition[0] - frePosition[0]), parseInt(mapSize)];
        window.canSize = [parseInt(headerSize[1] * 7), parseInt(headerSize[1])];
        window.canPosition = [parseInt((prW - canSize[0]) / 2), parseInt((mapPosition[1] + mapSize + prH * 0.05))];
        window.propsPosition = [parseInt(mapPosition[0] + mapSize), parseInt(headerPosition[1] + headerSize[1])];
        window.propsSize = [parseInt(headerPosition[0] + headerSize[0] - propsPosition[0]), parseInt(freSize[1])];
    } else if (wh >= 0.75 && wh <= 0.9) {
        console.log("ee" + wh);
        window.headerSize = [window.prW * 0.9, window.prW * 0.1];
        window.headerPosition = [window.prW * 0.05, window.prW * 0.05];
        window.mapSize = parseInt((prW) * 0.6);
        window.mapPosition = [parseInt((prW - mapSize) / 2), parseInt((headerPosition[1]) + headerSize[1])];
        window.frePosition = [parseInt(mapPosition[0]), parseInt((mapPosition[1] + mapSize))];
        window.freSize = [parseInt(mapSize), parseInt(prH * 0.1)];
        window.canPosition = [parseInt(0), parseInt((frePosition[1] + freSize[1]))];
        window.canSize = [parseInt(mapSize), parseInt(mapSize / 7)];
        window.canPosition[0] = (parseInt(prW - window.canSize[0]) / 2);
        window.propsPosition = [parseInt(mapPosition[0]), parseInt((canPosition[1] + canSize[1]))];
        window.propsSize = [parseInt(mapSize), parseInt(prH * 0.1)];
    } else if (wh >= 0.64 && wh <= 0.75) {
        console.log("ee" + wh);
        window.headerSize = [window.prW * 0.9, window.prW * 0.1];
        window.headerPosition = [window.prW * 0.05, window.prW * 0.05];
        window.mapSize = parseInt((prW) * 0.8);
        window.mapPosition = [parseInt((prW - mapSize) / 2), parseInt((headerPosition[1]) + headerSize[1])];
        window.frePosition = [parseInt(mapPosition[0]), parseInt((mapPosition[1] + mapSize))];
        window.freSize = [parseInt(mapSize), parseInt(prH * 0.1)];
        window.canPosition = [parseInt(0), parseInt((frePosition[1] + freSize[1]))];
        window.canSize = [parseInt(mapSize), parseInt(mapSize / 7)];
        window.canPosition[0] = (parseInt(prW - window.canSize[0]) / 2);
        window.propsPosition = [parseInt(mapPosition[0]), parseInt((canPosition[1] + canSize[1]))];
        window.propsSize = [parseInt(mapSize), parseInt(prH * 0.1)];
    } else if (wh >= 0.55 && wh <= 0.64) {
        window.headerSize = [window.prW * 0.9, window.prW * 0.1];
        window.headerPosition = [window.prW * 0.05, window.prW * 0.05];
        window.mapSize = parseInt((prW) * 0.8);
        window.mapPosition = [parseInt((prW - mapSize) / 2), parseInt((headerPosition[1]) + headerSize[1] + prH * 0.03)];
        window.frePosition = [parseInt(mapPosition[0]), parseInt((mapPosition[1] + mapSize + prH * 0.03))];
        window.freSize = [parseInt(mapSize), parseInt(prH * 0.1)];
        window.canPosition = [parseInt(0), parseInt((frePosition[1] + freSize[1]) + prH * 0.03)];
        window.canSize = [parseInt(mapSize), parseInt(mapSize / 7)];
        window.canPosition[0] = (parseInt(prW - window.canSize[0]) / 2);
        window.propsPosition = [parseInt(mapPosition[0]), parseInt((canPosition[1] + canSize[1]) + prH * 0.03)];
        window.propsSize = [parseInt(mapSize), parseInt(prH * 0.1)];
    } else if (wh >= 0.5 && wh <= 0.55) {
        window.headerSize = [window.prW * 0.9, window.prW * 0.1];
        window.headerPosition = [window.prW * 0.05, window.prW * 0.05];
        window.mapSize = parseInt((prW) * 0.9);
        window.mapPosition = [parseInt((prW - mapSize) / 2), parseInt((headerPosition[1] + headerSize[1]) + prH * 0.03)];
        window.frePosition = [parseInt(mapPosition[0]), parseInt((mapPosition[1] + mapSize) + prH * 0.03)];
        window.freSize = [parseInt(mapSize), parseInt(prH * 0.1)];
        window.canPosition = [parseInt(0), parseInt((frePosition[1] + freSize[1]) + prH * 0.02)];
        window.canSize = [parseInt(mapSize), parseInt(mapSize / 7)];
        window.canPosition[0] = (parseInt(prW - window.canSize[0]) / 2);
        window.propsPosition = [parseInt(mapPosition[0]), parseInt((canPosition[1] + canSize[1]) + prH * 0.03)];
        window.propsSize = [parseInt(mapSize), parseInt(prH * 0.1)];
    } else if (wh >= 0.45 && wh <= 0.5) {
        window.headerSize = [window.prW * 0.9, window.prW * 0.1];
        window.headerPosition = [window.prW * 0.05, window.prW * 0.05 + prH * 0.05];
        window.mapSize = parseInt((prW) * 0.9);
        window.mapPosition = [parseInt((prW - mapSize) / 2), parseInt((headerPosition[1] + headerSize[1]) + prH * 0.03)];
        window.frePosition = [parseInt(mapPosition[0]), parseInt((mapPosition[1] + mapSize) + prH * 0.03)];
        window.freSize = [parseInt(mapSize), parseInt(prH * 0.1)];
        window.canPosition = [parseInt(0), parseInt((frePosition[1] + freSize[1]) + prH * 0.02)];
        window.canSize = [parseInt(mapSize), parseInt(mapSize / 7)];
        window.canPosition[0] = (parseInt(prW - window.canSize[0]) / 2);
        window.propsPosition = [parseInt(mapPosition[0]), parseInt((canPosition[1] + canSize[1]) + prH * 0.03)];
        window.propsSize = [parseInt(mapSize), parseInt(prH * 0.1)];
    } else if (wh >= 0.0 && wh <= 0.45) {
        window.headerSize = [window.prW * 0.9, window.prW * 0.1];
        window.headerPosition = [window.prW * 0.05, window.prW * 0.05 + prH * 0.1];
        window.mapSize = parseInt((prW) * 0.9);
        window.mapPosition = [parseInt((prW - mapSize) / 2), parseInt((headerPosition[1] + headerSize[1]) + prH * 0.03)];
        window.frePosition = [parseInt(mapPosition[0]), parseInt((mapPosition[1] + mapSize) + prH * 0.03)];
        window.freSize = [parseInt(mapSize), parseInt(prH * 0.1)];
        window.canPosition = [parseInt(0), parseInt((frePosition[1] + freSize[1]) + prH * 0.02)];
        window.canSize = [parseInt(mapSize), parseInt(mapSize / 7)];
        window.canPosition[0] = (parseInt(prW - window.canSize[0]) / 2);
        window.propsPosition = [parseInt(mapPosition[0]), parseInt((canPosition[1] + canSize[1]) + prH * 0.03)];
        window.propsSize = [parseInt(mapSize), parseInt(prH * 0.1)];
    }

    // 设置比例
    window.communicate = new CanvasCommunicatGame(window.gameJson.mapSizeW, window.gameJson.mapSizeH, mapSize, mapSize);

    for (var i = 0; i < window.gameJson.pokerAmount; i++) {
        game.place_a_poker(window.gameJson.pokerList[i][0], window.gameJson.pokerList[i][1], window.gameJson.pokerList[i][2]);
    }
    game.refresh_poker_a();
    miegame_put_background();
    put_pics_first();
    print_canvas();

    document.getElementById("botton_canvas").addEventListener("click", function (event) {
        get_mouse_pos(document.getElementById("botton_canvas"), event);
    });
    
}

