window.addEventListener('load', function () {
    // 添加背景音乐
    let au = document.createElement("audio");
    let so = document.createElement("source");
    au.id = "audiomusic";
    au.controls = "controls";
    au.autoplay = "autoplay";
    au.style = "display: none;";
    so.src = "./星月夜.mp3";
    so.type = "audio/mpeg";
    au.append(so);
    document.body.append(au);
    cut_img_loding();
    // 获取屏幕 大小
    window.prH = window.screen.availHeight;
    window.prW = window.screen.availWidth;
    var canvasDiv = document.getElementById("canvas_div");
    var layer1 = document.createElement('canvas');
    layer1.width = prW;
    layer1.height = prH;
    layer1.id = "botton_canvas";
    canvasDiv.append(layer1);
    main_index();
})
function main_index() {
    window.nowPage = 1 ;
    //获取必要参数
    window.headerPosition = [parseInt(window.prW * 0.05), parseInt(window.prH * 0.05)];
    window.headerSize = [parseInt(window.prW * 0.9), parseInt(window.prH * 0.1)];
    window.bgPosition = [parseInt(window.prW * 0.05), parseInt(window.prH * 0.2)];
    window.bgSize = [parseInt(window.prW * 0.9), parseInt(window.prW * 0.9)];
    window.fireStarSize = [parseInt(window.bgSize[0] * 0.8), parseInt(window.prH * 0.1)];
    window.fireStarPosition = [parseInt((window.prW - fireStarSize[0]) / 2), parseInt(window.bgPosition[1] + window.bgSize[1])];
    window.regionSize = [parseInt(window.bgSize[0] * 0.8), parseInt(window.prH * 0.1)];
    window.regionPosition = [parseInt((window.prW - fireStarSize[0]) / 2), parseInt(window.fireStarPosition[1] + window.fireStarSize[1])];

    // 解析行政区
    const node = document.getElementById('json-script-district');
    const jsonStr = node.innerText;
    document.body.style.overflow = 'hidden';
    window.districk = JSON.parse(jsonStr);
    get_ranking();

    main_put_background();
    print_canvas();

    document.getElementById("botton_canvas").addEventListener("click", function (event) {
        get_mouse_pos(document.getElementById("botton_canvas"), event);
    });
}


