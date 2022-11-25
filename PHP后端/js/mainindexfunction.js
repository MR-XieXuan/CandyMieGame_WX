function main_put_background() {
    // 背景
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    canvas.fillStyle = "#f58f98";
    canvas.fillRect(0, 0,
        parseInt(window.prW), parseInt(window.prH));
    // 头
    let img = document.getElementById("img_main_title");
    let imgwh = img.width / img.height;
    console.log(imgwh);
    canvas.drawImage(img, window.headerPosition[0], window.headerPosition[1], window.headerSize[0], window.headerSize[0] / imgwh);
    // 地图
    img = document.getElementById("img_main_bg");
    imgwh = img.width / img.height;
    console.log(imgwh);
    canvas.drawImage(img, window.bgPosition[0], window.bgPosition[1], window.bgSize[0], window.bgSize[0] / imgwh);
    canvas.fillStyle = "rgba(255,255,255,0.5)";
    //canvas.fillRect(window.bgPosition[0], window.bgPosition[1],
    //    window.bgSize[0], window.bgSize[1]);
    //  冉起星星
    canvas.fillStyle = "rgba(255,255,255,0.5)";
    canvas.fillRect(window.fireStarPosition[0], window.fireStarPosition[1],
        window.fireStarSize[0], window.fireStarSize[1]);
    img = document.getElementById("img_main_fireStar");
    imgwh = img.width / img.height;
    console.log(imgwh);
    canvas.drawImage(img, window.fireStarPosition[0], window.fireStarPosition[1], window.fireStarSize[0], window.fireStarSize[0] / imgwh);
    // 地区以及排名
    canvas.fillStyle = "rgba(255,255,255,0.5)";
    canvas.fillRect(window.regionPosition[0], window.regionPosition[1],
        window.regionSize[0], window.regionSize[1]);
    canvas.fillStyle = "rgba(0,0,0,1)";
    canvas.font = window.regionSize[1] / 2 * 0.5 + "px Verdana";
    canvas.fillText(window.districk[0]["name"] + ":" + window.districk[0]["starnum"] + "颗星",
        window.regionPosition[0] + 20, window.regionPosition[1] + (window.regionSize[1] * 0.5) - (window.regionSize[1] / 2 * 0.2));
    canvas.fillText("全国排名" + ":" + window.districk[0]["rank"],
        window.regionPosition[0] + 20, window.regionPosition[1] + (window.regionSize[1] * 0.5) + (window.regionSize[1] / 2 * 0.6));
    img = document.getElementById("img_main_towards_r");
    imgwh = img.width / img.height;
    console.log(imgwh);
    canvas.drawImage(img,
        window.regionPosition[0] + window.regionSize[0] - window.regionSize[1] * imgwh, window.regionPosition[1] + window.regionSize[1] - window.regionSize[1],
        window.regionSize[1] * imgwh, window.regionSize[1]);
}
function clearn_canvas() {
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    var w = document.getElementById("botton_canvas").width;
    var h = document.getElementById("botton_canvas").height;
    canvas.clearRect(0, 0, w, h);
}
function print_canvas() {
    var canvas = document.getElementById("botton_canvas").getContext("2d");
    canvas.restore();
    canvas.save();
}
function get_a_ranking(a) {
    let starNum = [];
    for (let i = 1; i < window.districk.length; i++) {
        starNum[i - 1] = districk[i]["starnum"];
    }
    starNum.sort(function(a,b){return b-a});
    for (let i = 0; i < starNum.length; i++) {
        if (districk[a]["starnum"] == starNum[i])
            return i + 1;
    }
}
function get_ranking() {
    if (window.districk[0] == null) {
        window.districk[0] = window.districk[1];
    }
    for (let i = 0; i < window.districk.length; i++) {
        window.districk[i]["rank"] = get_a_ranking(window.districk[i]["id"]);
    }
}
function get_mouse_pos(canvas, event) {
    // 获取鼠标点击的位置
    document.getElementById('audiomusic').play();
    var rect = canvas.getBoundingClientRect();
    var cx = event.clientX - rect.left * (canvas.width / rect.width);
    var cy = event.clientY - rect.top * (canvas.height / rect.height);
    console.log("x:" + cx + ",y:" + cy);
    switch (window.nowPage) {
        case 0: break;
        case 1: main_action(cx, cy); break;
        case 2: miegame_action(cx, cy); break;
    }

}
function main_action(cx, cy) {
    if (cx >= fireStarPosition[0] && cx <= fireStarPosition[0] + fireStarSize[0] && cy >= fireStarPosition[1] && cy <= fireStarPosition[1] + fireStarSize[1]) {
        // 如果点击的是冉起星星内的话
        // 创建新游戏
        console.log("gogo");
        window.level = 1;
        wait_loding();
        new_game();
        window.nowPage = 0;
        //mie_game_index();
        //let post = { ask: "newgame" };
        //from_post("https://game.mrxie.xyz", post);
        //document.getElementById("botton_canvas").addEventListener("click", "");
    } else {
        // 如果是地图外的话
    }
}
function from_post(url, postList) {
    var post = document.createElement("form");
    post.action = url;
    post.method = "post";
    post.style.display = "none";
    for (let key in postList) {
        let input = document.createElement("input");
        input.type = "text";
        input.value = postList[key];
        input.name = key;
        post.append(input);
    }
    document.body.appendChild(post);
    post.submit();
}
function new_game() {
    let post = { ask: "newgame" };
    SERVO(post);
}
function SERVO(postList) {
    // POST
    var xhr;
    if (window.XMLHttpRequest) { // Mozilla, Safari...
        xhr = new XMLHttpRequest();
    } else if (window.ActiveXObject) { // IE
        try {
            xhr = new ActiveXObject('Msxml2.XMLHTTP');
        } catch (e) {
            try {
                xhr = new ActiveXObject('Microsoft.XMLHTTP');
            } catch (e) { }
        }
    }
    if (xhr) {
        xhr.onreadystatechange = onReadyStateChange;
        xhr.open('POST', '/', true);
        // 设置 Content-Type 为 application/x-www-form-urlencoded
        // 以表单的形式传递数据
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        let msg = "";
        for (let i in postList) {
            msg = msg + i + "=" + postList[i] + "&";
        }
        xhr.send(msg);
    }


    // onreadystatechange 方法
    function onReadyStateChange() {
        // 该函数会被调用四次
        console.log(xhr.readyState);
        if (xhr.readyState === 4) {
            // everything is good, the response is received
            if (xhr.status === 200) {
                window.gameJson = xhr.responseText;
                console.log(xhr.responseText);
                clearInterval(window.interval_loding);
                window.lodingtime = 0;
                window.nowPage = 0;
                document.getElementById("canvas_div").innerHTML = "";
                var canvasDiv = document.getElementById("canvas_div");
                var layer1 = document.createElement('canvas');
                layer1.width = prW;
                layer1.height = prH;
                layer1.id = "botton_canvas";
                canvasDiv.append(layer1);
                if (window.gameJson == '') {
                    main_index();
                    return;
                }
                mie_game_index();
            } else {
                console.log('There was a problem with the request.');
            }
        } else {
            // still not ready
            console.log('still not ready...');
        }
    }
}
function wait_loding() {
    let canvas = document.getElementById("botton_canvas");
    let canvas_canvas = canvas.getContext("2d");
    // 保存原来的画面
    let canvas_before = document.createElement("canvas");
    canvas_before.width = prW;
    canvas_before.height = prH;
    let canvas_before_canvas = canvas_before.getContext("2d");
    canvas_before_canvas.drawImage(canvas, 0, 0, prW, prH, 0, 0, prW, prH)
    document.getElementById("botton_canvas");
    // 获取画面
    let img_1 = document.getElementById("img_main_starLoding");
    let img_1wh = img_1.width / img_1.height;
    let img_1Size = [parseInt(img_1wh * prH * 0.3), parseInt(prH * 0.3)];
    let img_1Position = [parseInt((prW - img_1Size[0]) / 2), parseInt((prH - img_1Size[1]) / 2)];
    window.lodingtime = 0;
    window.interval_loding = setInterval(show, 1000 / 60);
    function show() {
        // console.log(window.lodingtime);
        let canvas_after = document.createElement("canvas");
        canvas_after.width = prW;
        canvas_after.height = prH;
        let canvas_after_canvas = canvas_after.getContext("2d");
        canvas_after_canvas.beginPath();
        canvas_after_canvas.moveTo((prW + 2 * img_1Size[0]) / 90 * window.lodingtime - img_1Size[0] / 2, img_1Position[1] + img_1Size[1] / 2);
        canvas_after_canvas.lineTo(
            ((prW + 2 * img_1Size[0]) / 90 * window.lodingtime - img_1Size[0] / 2) - (img_1Position[1] / Math.tan(60 * 0.017453293)),
            0);
        canvas_after_canvas.lineTo(0, 0);
        canvas_after_canvas.lineTo(0, prH);
        canvas_after_canvas.lineTo(
            ((prW + 2 * img_1Size[0]) / 90 * window.lodingtime - img_1Size[0] / 2) - (img_1Position[1] / Math.tan(60 * 0.017453293)),
            prH);
        canvas_after_canvas.closePath();
        canvas_after_canvas.stroke();
        canvas_after_canvas.fillStyle = 'pink';
        canvas_after_canvas.fill();
        if (window.lodingtime < 90) {
            canvas_after_canvas.drawImage(img_1, (prW + 2 * img_1Size[0]) / 90 * window.lodingtime - img_1Size[0], img_1Position[1], img_1Size[0], img_1Size[1]);
        }
        let img_2 = document.getElementById("img_main_loding_" + (parseInt(window.lodingtime / 2) % 91));
        let img_2wh = img_2.width / img_2.height;
        let img_2Size = [parseInt(img_2wh * prH * 0.3), parseInt(prH * 0.3)];
        let img_2Position = [parseInt((prW - img_2Size[0]) / 2), parseInt((prH - img_2Size[1]) / 2)];
        canvas_after_canvas.drawImage(img_2, (prW + img_2Size[0]) / 90 * ((window.lodingtime < 90 ? window.lodingtime : 90) - 45) - img_2Size[0], img_2Position[1], img_2Size[0], img_2Size[1]);
        clearn_canvas();
        canvas_canvas.drawImage(canvas_before, 0, 0, prW, prH, 0, 0, prW, prH);
        canvas_canvas.drawImage(canvas_after, 0, 0, prW, prH, 0, 0, prW, prH);
        print_canvas();
        window.lodingtime++;
    }
}