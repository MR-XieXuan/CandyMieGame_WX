// 加载糖果图片
for (let i = 1; i <= 18; i++) {
    let candy = document.createElement("img");
    let address = "./images/candys/" + i + ".png";
    candy.id = "img_candy_" + i;
    candy.src = address;
    candy.style = "display: none;";
    document.body.append(candy);
}
// 加载控制按钮图片
do {
    let img = document.createElement("img");
    let address = "./images/ctrl/close.png";
    img.id = "img_ctrl_close";
    img.style = "display: none;";
    img.src = address;
    document.body.append(img);
} while (0);
// 加载背景图片
do {
    let img = document.createElement("img");
    let address = "./images/background/mainbg.jpg";
    img.id = "img_main_bg";
    img.style = "display: none;";
    img.src = address;
    document.body.append(img);
} while (0);
// 加载标题title
do {
    let img = document.createElement("img");
    let address = "./images/background/title.png";
    img.id = "img_main_title";
    img.style = "display: none;";
    img.src = address;
    document.body.append(img);
} while (0);
// 加载冉起星星
do {
    let img = document.createElement("img");
    let address = "./images/background/fireStar.png";
    img.id = "img_main_fireStar";
    img.style = "display: none;";
    img.src = address;
    document.body.append(img);
} while (0);
do {
    let img = document.createElement("img");
    let address = "./images/background/towards_r.png";
    img.id = "img_main_towards_r";
    img.style = "display: none;";
    img.src = address;
    document.body.append(img);
} while (0);
// 加载starLoing
do {
    let img = document.createElement("img");
    let address = "./images/background/starLoding.png";
    img.id = "img_main_starLoding";
    img.style = "display: none;";
    img.src = address;
    document.body.append(img);
} while (0);
// 加载Loing
do {
    let img = document.createElement("img");
    let address = "./images/background/loding.png";
    img.id = "img_main_loding";
    img.style = "display: none;";
    img.src = address;
    document.body.append(img);
    
} while (0);
function cut_img_loding() {
    let img = document.getElementById("img_main_loding");
    a_img_w = img.width;
    a_img_h = img.height / 91;
    for (let i = 0; i < 91; i++) {
        let canvas = document.createElement("canvas");
        canvas.height = a_img_h;
        canvas.width = a_img_w;
        let canvas_canvas = canvas.getContext("2d");
        canvas_canvas.drawImage(img,0,-(i*a_img_h),img.width,img.height);
        let a_img = document.createElement("img");
        a_img.id = "img_main_loding_" + i ;
        a_img.src = canvas.toDataURL();
        document.body.append(a_img);
    }
}

