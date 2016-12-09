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
    for (key in msg.today) {
        var data = msg.today[key];
        // console.log(data);
        if (title == data.title) {
            liveURL = "";
            if (data.url !== undefined) {
                liveURL = data.url[0];
                liveURL = liveURL.replace(" ", "");
            }
              $("#a1Box").html("<div id='a1'></div>");
            index.playChannels['默认'] = liveURL;
            var obj = '<li class="list-group-item"><a class="btn btn-default active play-nomarl" dataUrl="' + liveURL + '" >默认</a></li>';;
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
index.callback_line = function(msg) {
    console.log(msg);
    var data = msg[today()];
    for (var key in data) {
        if (key == title) {
            var obj = '<ul class="list-group">';
            for (var keys in data[key]) {
                var _index = data[key][keys];
                var _name = _index.name;
                var _url = _index.url;
                if (_name == "线路2") {
                    obj += '<li class="list-group-item"><a class="btn btn-default play-iframe" dataUrl="' + _url + '" >' + _name + '(推荐)</a></li>';
                } else {
                    index.playChannels[_name] = _url;
                    obj += '<li class="list-group-item"><a class="btn btn-default play-nomarl" dataUrl="' + _url + '" >' + _name + '</a></li>';
                }
            };
            obj += "</ul>";
            $(".chooseLine").html(obj);
            return
        }
    }
};

// live
index.invoke_data(index.url_live, index.data, index.callback_play);
// 加载线路
index.invoke_data(index.url_line, index.data, index.callback_line);
$(document).ready(function() {
    $(".chooseLine").on("click", ".play-nomarl", function() {
        $(this).closest('ul').find("a").removeClass('active');
        $(this).addClass('active');
        var name = $(this).html();
        for (var key in index.playChannels) {
            if (name = key) {
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
        var obj = ' <iframe src="' + url + '" frameborder="0" width="100%" height="500px" id="a2"></iframe>';
        $("#a1Box").html(obj);
    })
});
