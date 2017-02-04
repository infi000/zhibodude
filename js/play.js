var index = new Dude();
var title = decodeURIComponent(document.URL.split("?&=")[1]);
var liveURL;
var today = function() {
    var oDate = new Date();
    var year = oDate.getFullYear(); //获取系统的年；
    var month = oDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
    var day = oDate.getDate(); // 获取系统日，
    return year + "-" + month + "-" + day
};
index.playChannels = {};
index.callback_play = function(msg) {
    msg=msg.raw;
    for (key in msg) {
        var data = msg[key];
        // console.log(data);
        if (title == data.title) {
            liveURL = "";
            if (data.url !== undefined&&data.url.length!=0) {
                liveURL = data.url;
                // liveURL = liveURL.replace(" ", "");
            }
            $("#a1Box").html("<div id='a1'></div>");
            index.playChannels['手机线路'] = liveURL;
            var obj = '<li class="list-group-item"><a class="btn btn-default active play-nomarl" dataUrl="' + liveURL + '" >手机线路</a></li>';;
            $(".chooseLine").find("ul").append(obj);
            var flashvars = {
                f: '../lib/m3u8/m3u8.swf',
                a: liveURL,
                s: 4,
                c: 0,
                p: 1
            };
            var params = {
                bgcolor: '#FFF',
                allowFullScreen: true,
                allowScriptAccess: 'always',
                wmode: 'transparent'
            };
            var video = [liveURL];
            CKobject.embed('../lib/ckplayer/ckplayer.swf', 'a1', 'ckplayer_a1', '100%', '100%', false, flashvars, video, params);
            return;
        }
    };

};
// index.callback_line = function(msg) {
//     // console.log(msg);
//     var data = msg[today()];
//     for (var key in data) {
//         if (key == title) {
//             var obj = '';
//             for (var keys in data[key]) {
//                 var _index = data[key][keys];
//                 var _name = _index.name;
//                 var _url = _index.url;
//                 var _type = _index.type;
//                 if (_type == "iframe") {
//                     obj += '<li class="list-group-item"><a class="btn btn-default play-iframe" dataUrl="' + _url + '" >' + _name + '</a></li>';
//                 } else {
//                     index.playChannels[_name] = _url;
//                     obj += '<li class="list-group-item"><a class="btn btn-default play-nomarl" dataUrl="' + _url + '" >' + _name + '</a></li>';
//                 }
//             };

//             $(".chooseLine ul").append(obj);
//             return
//         }
//     }
// };
index.callback_line = function(msg) {
    // console.log(msg);
    var data = msg;
    for (var key in data) {
        var macth = data[key].macth;
        if (macth == title) {
            var obj = '';
            for (var keys in data[key].line) {
                var _index = data[key].line[keys];
                var _name = _index.line;
                var _url = _index.url;
                var _type = _index.type;
                if (_type == "iframe") {
                    if (_name == "CCTV5") {
                        index.playChannels[_name] = "http%3A%2F%2Fcctv5.vtime.cntv.wscdns.com%2Flive%2Fcctv5hls_%2Findex.m3u8%3Fptype%3D1%26AUTH%3D%2BW4iHNI9Fhb3aSyQzynIs29VsDoKsM5uj6eLvK1FLHZ%2F%2BwObxa5LWWcpSwN7w4gVpSlpX2IfalQiGPvX8Bd2cg%3D%3D&c=0&p=1&s=4&v=100&lv=1&loaded=loadedHandler";
                        obj += '<li class="list-group-item"><a class="btn btn-default play-nomarl" dataUrl="" >' + _name + '</a></li>';
                    } else {

                        obj += '<li class="list-group-item"><a class="btn btn-default play-iframe" dataUrl="' + _url + '" >' + _name + '</a></li>';
                    }
                } else {
                    index.playChannels[_name] = _url;
                    obj += '<li class="list-group-item"><a class="btn btn-default play-nomarl" dataUrl="' + _url + '" >' + _name + '</a></li>';
                }
            };

            $(".chooseLine ul").append(obj);
            return
        }
    }
};
index.callback_wenzi = function(msg) {
    msg = JSON.parse(msg);
    msg.map(function(index, key) {

        if (index.title == title) {
            var wenziUrl = index.url;
            var obj = '<iframe src="' + wenziUrl + '" frameborder="0" width="100%" height="500px"></iframe>'
            $(".wzlive").html(obj);
            return
        }
    });
}

// live
$.ajax({
    url: 'http://www.zhibodude.com:3000/getjson/espn',
    type: 'POST',
    dataType: "json",
    success: index.callback_play
});
// 加载线路
// index.invoke_data(index.url_line, index.data, index.callback_line);
$.ajax({
    url: 'http://www.zhibodude.com:3000/getjson/jrs',
    type: 'POST',
    dataType: 'json',
    success: index.callback_line
})


$(document).ready(function() {
    $(".chooseLine").on("click", ".play-nomarl", function() {
        $(this).closest('ul').find("a").removeClass('active');
        $(this).addClass('active');
        var name = $(this).html();
        for (var key in index.playChannels) {
            if (name == key) {
                var liveURL = index.playChannels[key];
                $("#a1Box").html("<div id='a1'></div>");
                var flashvars = {
                    f: '../lib/m3u8/m3u8.swf',
                    a: liveURL,
                    s: 4,
                    c: 0,
                    p: 1
                };
                var params = {
                    bgcolor: '#FFF',
                    allowFullScreen: true,
                    allowScriptAccess: 'always',
                    wmode: 'transparent'
                };
                var video = [liveURL];
                CKobject.embed('../lib/ckplayer/ckplayer.swf', 'a1', 'ckplayer_a1', '100%', '100%', false, flashvars, video, params);
                return;
            }
        }
    });
    $(".chooseLine").on("click", ".play-iframe", function() {
        $(this).closest('ul').find("a").removeClass('active');
        $(this).addClass('active');
        var url = $(this).attr("dataUrl");
        var obj = ' <iframe src="' + url + '" frameborder="0" width="100%" height="700px" id="a2"></iframe>';
        $("#a1Box").html(obj);
    });
    //加载文字直播
    $(".wzlive button").on("click", function() {
        console.log(123);
        $.ajax({
            url: "http://www.zhibodude.com:3000/getjson/3g",
            type: "POST",
            success: index.callback_wenzi
        });
    })
});
