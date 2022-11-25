<?php

/***************
 *  初始化页面
 * 
 * 
 *  
 ****************/
// SQL 初始化
include('php/sql.php');
$servername = "localhost";
$sqlname = "";
$sqlpassword = "";
$sqldatabase = "miegame";

// 获取请求信息
if (!isset($_POST['ask'])) {
    // 如果没有请求信息 就当首页处理
    $_POST['ask'] = "main";
}

// 如果是关卡请求 
if ($_POST['ask'] == "level") {
    // 普通关卡(难度4)
    if (!isset($_POST['main'])) {
        // 请求有误
    }
    if ($_POST['main'] == "level") {
        if ($_POST["playerCode"]) {
            // 请求有误
        }
        $map = get_map($_POST['main'], "".$_POST["id"]);
        if ( !$map["address"] ){
            echo '';
            die();
        }
        $mapJson = file_get_contents($map["address"]);
        $mapJson = replay_map($mapJson, $_POST["playerCode"]);
        echo $mapJson;
    }
}
// 如果是主页请求 
else if ($_POST['ask'] == "main") {
    $star = get_star();
    $page = file_get_contents("./index.html");
    $page = substr_replace(
        $page,
        $star,
        stripos($page, "<script id=\"json-script-district\" type=\"application/json\"></script>")
            + strlen("<script id=\"json-script-district\" type=\"application/json\">"),
        0
    );
    echo $page;
}
// 如果是新游戏请求
else if ($_POST['ask'] == "newgame") {
    new_game();
} else if( $_POST['ask'] == "nextgame" ){
    if( $_POST['playerCode'] ){
        nextgame($_POST['playerCode']);
    }
    
} else if( $_POST['ask'] == "district" ){
    $star = get_star();
    echo $star;
}


function nextgame( $playerCode ){
    // 引入数据库信息
    global $servername, $sqlname, $sqlpassword, $sqldatabase;
    
    $mysql = new mysqli($servername, $sqlname, $sqlpassword);
    $mysql->set_charset('utf8');
    if (!SQL\usebase($mysql, $sqldatabase) == true) {
        die();
        $mysql->close();
    }
    // 添加一颗星星
    $star = get_star();
    $star = json_decode($star,true);
    $yon = SQL\selectsql($mysql, "`star`", "starnum", "id", "".$star[0]['id']."");
    $nextStar = mysqli_fetch_array($yon)[0] + 1;
    $yon = $mysql->query("UPDATE `star` SET `starnum`=". $nextStar . " WHERE `id` =".$star[0]['id']."");
    // 获取 下一关
    $yon = SQL\selectsql($mysql, "`playerCode`", "level", "playerCode", "\"".$playerCode."\"");
    $next = mysqli_fetch_array($yon)[0] + 1;
    $map = get_map("level", $next + 1 );
    if ( !$map["address"] ){
        echo '';
        die();
    }
    $mapJson = file_get_contents($map["address"]);
    $yon = $mysql->query("UPDATE `playercode` SET `level`=". $next . " WHERE `playerCode` = \"".$playerCode."\"");
    $mapJson = replay_map($mapJson, $playerCode);
    echo $mapJson;
}
function new_game()
{
    // 新游戏
    do {
        $playerCode = new_playerCode();
    } while ($playerCode == 0);
    $map = get_map("level", "1");
    $mapJson = file_get_contents($map["address"]);
    $mapJson = replay_map($mapJson, $playerCode);
    echo $mapJson;
}
function get_map($type, $id)
{
    // 引入数据库信息
    global $servername, $sqlname, $sqlpassword, $sqldatabase;
    $mysql = new mysqli($servername, $sqlname, $sqlpassword);
    $mysql->set_charset('utf8');
    if (!SQL\usebase($mysql, $sqldatabase) == true) {
        die();
        $mysql->close();
    }
    // 获取地图地址
    if ($type == "level") {
        // 默认地图
        // 获取地图地址
        $yon = SQL\selectsql($mysql, "`level`", "address", "id", $id);
        if (!$yon == true) {
            die();
            $mysql->close();
        }
        $map["address"] = mysqli_fetch_array($yon)[0];
        $yon = SQL\selectsql($mysql, "`level`", "level", "id", $id);
        $map["level"] = mysqli_fetch_array($yon)[0];
        $yon = SQL\selectsql($mysql, "`level`", "trytasnum", "id", $id);
        $map["trytasnum"] = mysqli_fetch_array($yon)[0];
        $yon = SQL\selectsql($mysql, "`level`", "tasnum", "id", $id);
        $map["tasnum"] = mysqli_fetch_array($yon)[0];
        $mysql->close();
        return $map;
    } else {
        return get_map("level", 0);
    }
}
function replay_map($json, $playerCode, $random = true)
{
    $json = json_decode($json, true);
    $json["playerCode"] = $playerCode;
    $pokerType = [];
    if ($random) {
        for ($i = 0; $i < $json["pokerAmount"];) {
            $type = mt_rand(1, $json['pokerTypeNum']);
            array_push($pokerType, $type, $type, $type);
            $i += 3;
        }
        shuffle($pokerType);
        for ($i = 0; $i < $json["pokerAmount"]; $i++) {
            $json["pokerList"][$i][2] = $pokerType[$i];
        }
    } else {
        $type = [];
        for ($i = 0; $i < $json['pokerTypeNum']; $i++) {
            $type[$i] = $i + 1;
        }
        shuffle($type);
        for ($i = 0; $i < $json["pokerAmount"]; $i++) {
            $json["pokerList"][$i][2] = $type[$json["pokerList"][$i][2] - 1];
        }
    }
    return json_encode($json);
}
function randomString($n)
{
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $randomString = '';

    for ($i = 0; $i < $n; $i++) {
        $index = rand(0, strlen($characters) - 1);
        $randomString .= $characters[$index];
    }

    return $randomString;
}
function new_playerCode()
{
    // 获取游戏编号
    do {
        $playerCode = randomString(25);

        global $servername, $sqlname, $sqlpassword, $sqldatabase;
        $mysql = new mysqli($servername, $sqlname, $sqlpassword);
        $mysql->set_charset('utf8');
        if (!SQL\usebase($mysql, $sqldatabase) == true) {
            die();
            $mysql->close();
        }
        $yon = SQL\selectsql($mysql, "`playerCode`", "*", "playerCode", $playerCode);
    } while ($yon);

    $creat =  SQL\insert(
        $mysql,
        "`playerCode`",
        array(
            'playerCode' => "'" . $playerCode . "'",
            'level' => "0",
            "creatTime" => time(),
            "updataTime" => time()
        )
    );
    $mysql->close();
    if ($creat) {
        return $playerCode;
    }
    return 0;
}
function get_star()
{
    global $servername, $sqlname, $sqlpassword, $sqldatabase;
    $mysql = new mysqli($servername, $sqlname, $sqlpassword);
    $mysql->set_charset('utf8');
    if (!SQL\usebase($mysql, $sqldatabase) == true) {
        die();
        $mysql->close();
    }
    $yon = SQL\selectsql($mysql, "`star` -- ", "*", "", "");
    $star = [];
    while ($row = $yon->fetch_assoc()) //这里不能直接使用$row
    {
        array_push($star, $row);
    }
    $cityCode = get_city($star);
    Array_unshift($star, $star[$cityCode - 1]);
    return json_encode($star, JSON_UNESCAPED_UNICODE);
}
function GET_IP()
{
    global $ip;
    if ($_SERVER['HTTP_CF_CONNECTING_IP'])
        $ip = $_SERVER['HTTP_CF_CONNECTING_IP'];
    else if ($_SERVER['REMOTE_ADDR'])
        $ip = $_SERVER['REMOTE_ADDR'];
    else if ($_SERVER['HTTP_X_FORWARDED_FOR'])
        $ip = $_SERVER['HTTP_X_FORWARDED_FOR'];
    else if ($_SERVER['HTTP_CLIENT_IP'])
        $ip = $_SERVER['HTTP_CLIENT_IP'];
    else
        $ip = "Unknow";
    return $ip;
}
function get_city($star)
{
    $ip = GET_IP();
    //获取用户IP
    if (empty($ip)) {
        return  0;
    }
    $url = 'https://sp0.baidu.com/8aQDcjqpAAV3otqbppnN2DJv/api.php?query=' . $ip . '&co=&resource_id=6006&t=&ie=utf8&oe=gbk&cb=op_aladdin_callback&format=json&tn=baidu&cb=&_=';
    //调用了百度接口
    $str = file_get_contents($url);
    $encode = mb_detect_encoding($str, array("ASCII", 'UTF-8', "GB2312", "GBK", 'BIG5'));
    $str = mb_convert_encoding($str, 'UTF-8', $encode);
    //转化编码
    $str = json_decode($str);
    //转换为json类型
    $str = $str->data[0]->location;
    //取出数据
    foreach ($star as $value) {
        if (!(stripos($str, $value["name"]) === FALSE)) {
            return $value['id'];
        }
    }
    return 0;
}
