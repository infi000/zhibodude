$(document).ready(function() {
    var index = new Dude();
    index.callback_data = function(msg) {
        if (msg.reason == "查询成功") {
            var data = msg.result.list;
            $(".match h3").html(data[1].title + "赛况");
            var obj_today = "<ul'>";
            // 今日比赛结构
            data[1].tr.map(function(index, key) {
                var player1logo = index.player1logo;
                var player2logo = index.player2logo;
                var player1 = index.player1;
                var player2 = index.player2;
                var score = index.score;
                var time = index.time;
                var link1url = index.link1url;
                var link2url = index.link2url;
                if (index.status == 0) {
                    var status = '<span class="f-red">未开赛</span>'

                } else if (index.status == 1) {
                    var status = '<span class="f-green">直播中</span>'
                } else {
                    var status = '<a class="f-green statistics" href="public/lookback.html?&=' + link2url + '">技统&nbsp&nbsp</a><a class="f-blue lookBack" href="' + link1url + '">&nbsp&nbsp集锦</a>'
                }
                obj_today += "<li class='match-team'><dl><dt>";
                obj_today += "<img class='logox78 animated fadeInLeft' src='" + player1logo + "'></dt>";
                obj_today += "<dd class='text-center'>" + player1 + "</dd></dl>";
                obj_today += '<dl><dt><b class="match-team-score">' + score + '</b></dt>';
                obj_today += '<dd><span class="match-team-time">' + status + '</span></dd></dl>';
                obj_today += '<dl><dt><img class="logox78 animated fadeInLeft" src="' + player2logo + '"</dt>';
                obj_today += '<dd class="text-center">' + player2 + '</dd></dl></li>';
                return obj_today;
            });
            obj_today += "</ul>";
            $(".match-team-box").html(obj_today);
        }
    };
    index.callback_live = function(msg) {
        index.liveData = msg;
        var obj_today = "<ul id='todayGame'>";
        var obj_tom = "<ul id='tomGame' style='display:none'>";
        for (key in msg.today) {
            var data = msg.today[key];
            var player1logo = data.teams[0].avatar;
            var player2logo = data.teams[1].avatar;
            var player1 = data.teams[0].name;
            var player2 = data.teams[1].name;
            var url = (data.url == undefined) ? "" : data.url[0];
            var title = encodeURIComponent(data.title);
            var time = data.time;
            obj_today += '<li class="match-live"><dl><dt>';
            obj_today += '<img class="logox78 animated fadeInLeft" src="' + player1logo + '" alt="jrs直播"></dt>';
            obj_today += '<dd class="text-center">' + player1 + '</dd></dl>';
            obj_today += '<dl><dt><a class="match-live-page" href="public/play.html?&=' + title + '">观看</a></dt>'
            obj_today += '<dd><span class="match-live-time">' + time + '</span></dd></dl>';
            obj_today += '<dl><dt><img class="logox78 animated fadeInLeft" src="' + player2logo + '"</dt>';
            obj_today += '<dd class="text-center">' + player2 + '</dd></dl></li>';
        }
        for (key in msg.tomorrow) {
            var data = msg.tomorrow[key];
            var player1logo = data.teams[0].avatar;
            var player2logo = data.teams[1].avatar;
            var player1 = data.teams[0].name;
            var player2 = data.teams[1].name;
            var url = (data.url == undefined) ? "" : data.url[0];
            var title = encodeURIComponent(data.title);
            var time = data.time;
            obj_tom += '<li class="match-live"><dl><dt>';
            obj_tom += '<img class="logox78 animated fadeInLeft" src="' + player1logo + '" alt="jrs直播"></dt>';
            obj_tom += '<dd class="text-center">' + player1 + '</dd></dl>';
            // if (url == "") {
            //     obj_tom += '<dl><dt><a class="match-nolive-page">暂无</a></dt>'
            // } else {
            //     obj_tom += '<dl><dt><a class="match-live-page" href="public/play.html?&=' + title + '">观看</a></dt>'
            // };
            obj_tom += '<dl><dt><a class="match-nolive-page" href="public/play.html?&=' + title + '">暂无</a></dt>'
            obj_tom += '<dd><span class="match-live-time">' + time + '</span></dd></dl>';
            obj_tom += '<dl><dt><img class="logox78 animated fadeInLeft" src="' + player2logo + '"</dt>';
            obj_tom += '<dd class="text-center">' + player2 + '</dd></dl></li>';
        }
        obj_today += "</ul>";
        obj_tom += "</ul>";
        $(".match-live-box").html(obj_today + obj_tom);
    };
    index.callback_slogan = function(data) {
        var msg;
        var img;
        var name;
        for (key in data) {
            msg = data[key].msg;
            img = data[key].img;
            name = data[key].name
        };
        $(".slogan").find("h2").html(msg);
        $(".slogan").find("p").html("--" + name);
        $(".banner").css({ 'background-image': 'url(' + img + ')', 'background-size': 'contain' });
    };
    index.callback_twitter = function(msg) {
        var obj = "";
        var data = msg
        for (var key in data) {
            var index = data[key];
            console.log(index);
            console.log(index.name);
            var name = index.name;
            var time = index.time;
            var weight = index.weight;
            var head = index.head;
            var msg = index.msg;
            var img = (index.img == "no") ? "" : '<p><img src="http://www.zhibodude.com/static/twitterImg/' + index.img + '" alt="兄弟直播"  class="twitterImg"></p>';
            obj += '<li class="list-group-item"><div class="media"><a class="media-left" href="#">';
            obj += '<img src=".' + head + '" alt="兄弟直播" class="playerHead"></a>';
            obj += '<div class="media-body"><h4 class="media-heading">' + name + '<small style="margin-left:14px;">' + time + '</small></h4><div><p>' + msg + '</p></div>';
            obj += img + '</div></div></li>';
        };
        $(".twitter-live-box").html(obj);
    };
    index.callback_ins = function(msg) {
        var obj = "";
        var data = msg
        for (var key in data) {
            var index = data[key];
            var name = index.name;
            var weight = index.weight;
            var msg = index.msg;
            var img = index.img;
            obj += '<div class="ins-live-box-item col-xs-6 col-sm-4 col-md-3 col-lg-2"> <div class="thumbnail">';
            obj += '<img src="static/insImg/' + img + '" alt="jrs直播"><div class="caption">';
            obj += '<h3>' + name + '</h3>';
            obj += '<p>' + msg + '</p></div></div></div>';
        };
        $(".ins-live-box").html(obj);
        var $ins_live_box = $('.ins-live-box').imagesLoaded(function() {
            // init Masonry after all images have loaded
            $ins_live_box.masonry({
                // options...
                itemSelector: '.col-xs-6',
                percentPosition: true
            });
        });
    };
    index.data = {
        key: "d40b83c5590a7a27358c405d40b41659"
    };
    index.data_slogan = {
            orderBy: "weight",
            limitToLast: 1
        }
        // 球队对阵
    index.invoke_data(index.url_data, index.data, index.callback_data);
    // live
    index.invoke_data(index.url_live, index.data, index.callback_live);
    //名人名言
    $.ajax({
        url: 'https://infi000.wilddogio.com/zhibodude.json?orderBy="weight"&limitToLast=1',
        success: index.callback_slogan
    });
    //TWITTER更新
    index.invoke_data(index.url_twitter + '?orderBy="weight"&limitToLast=1000', index.data, index.callback_twitter);
    //ins更新
    index.invoke_data(index.url_ins + '?orderBy="weight"&limitToLast=1000', index.data, index.callback_ins);
    //选择频道
    $(".liveChannels").on("click", function() {
        // console.log(13);
        var title = $(this).attr("dataType");
        var channels = {
            "CCTV—5": "http://cctv5.vtime.cntv.dnion.com:8000/live/no/211_/seg0/index.m3u8",
            "CCTV—5_2": "http://111.39.226.103:8112/120000001001/wlds:8080/ysten-business/live/cctv-5/.m3u8&s=4&c=1",
            "五星体育": "http://183.207.255.190/live/program/live/ssty/2300000/mnf.m3u8",
            "广东体育": "http://125.88.92.166:30001/PLTV/88888956/224/3221227703/1.m3u8",
            "北京体育": "http://btv6.vtime.cntv.cloudcdn.net:8500/cache/314_/seg0/index.m3u8",
            "青海卫视": "http://223.75.3.82:8081/live/live3/QHWS/2000/QHWS-2000-node1.m3u8?fmt=x264_2000k_mpegts&authType=2&node=1&type=live",
        }
        var URL;
        for (var key in channels) {
            if (title == key) {
                URL = channels[key];
                break;
            }
        }

        // for (key in channels) {
        //     if (channels[key].type == 0) {
        //         if (channels[key].title == title) {
        //             URL = channels[key].url;
        //             console.log("key", key);
        //             console.log("url", URL);
        //             console.log("type", channels[key].type);
        //             break;
        //         };
        //     } else if (channels[key].type == 1) {
        //         if (title == "风云足球") {
        //             URL = "http%3A%2F%2F124.192.145.197%2Fm3u8%2Ffyzq_1300%2Fdesc.m3u8%3Fstream_id%3Dfyzq_1300%26path%3D124.192.145.194%2C124.192.145.66%2C124.192.145.154%26amltag%3D202%26mltag%3D202%26platid%3D10%26splatid%3D1003%26qos%3D4%26fcheck%3D0%26uid%3D2093832770.rp%26keyitem%3DdpoOd-l3AnupIUuBI8VtFwmKzWltcfnZpngeV5Yo3I1Oleh6yGrbVeKRoRQ.%26ntm%3D1480430400%26nkey2%3D6af0f495d57059bbc2ea9c8868d0851e%26nkey%3D2067e8bde51570a85ff460e0978b0971%26tag%3Dlive%26video_type%3Dm3u8%26useloc%3D0%26mslice%3D3%26uidx%3D0%26errc%3D0%26gn%3D149%26lrtmcd%3D109%26buss%3D202%26cips%3D124.205.90.66%26geo%3DCN-1-12-16%26tmn%3D1480411885%26pnl%3D149%2C149%2C398%2C224%26ext%3Dm3u8%26sign%3Dlive_web%26ostype%3Dmacos%26hwtype%3Diphone%26tm%3D1480411885%26key%3D8147886b91774b159938af37a94a62da&s=4";
        //             // break;
        //         } else if (title == "广东体育") {
        //             URL = "http%3A%2F%2F124.192.145.192%2Fm3u8%2Fguangdongtiyu_1300%2Fdesc.m3u8%3Fstream_id%3Dguangdongtiyu_1300%26path%3D124.192.145.211%2C124.192.145.83%2C124.192.145.154%26amltag%3D202%26mltag%3D202%26platid%3D10%26splatid%3D1003%26qos%3D4%26fcheck%3D0%26uid%3D2093832770.rp%26keyitem%3DdpoOd-l3AnupIUuBI8VtFwmKzWltcfnZpngeV5Yo3I1Oleh6yGrbVeKRoRQ.%26ntm%3D1480431000%26nkey2%3Dfeb3771b39490ce6e0a21e5652f3002f%26nkey%3D417f638fbb98588d013e33e7941255b9%26tag%3Dlive%26video_type%3Dm3u8%26useloc%3D0%26mslice%3D3%26uidx%3D0%26errc%3D0%26gn%3D149%26lrtmcd%3D109%26buss%3D202%26cips%3D124.205.90.66%26geo%3DCN-1-12-16%26tmn%3D1480412802%26pnl%3D149%2C149%2C398%2C224%26ext%3Dm3u8%26sign%3Dlive_web%26ostype%3Dmacos%26hwtype%3Diphone%26tm%3D1480412803%26key%3D8b47032625e85fa108669f2ffd476fec&s=4";
        //             // break;
        //         } else if (title == "深圳体育") {
        //             URL = "http%3A%2F%2F124.192.145.203%2Fm3u8%2Fws_sztyjk_1300%2Fdesc.m3u8%3Fstream_id%3Dws_sztyjk_1300%26path%3D124.192.145.210%2C124.192.145.82%2C124.192.145.156%26amltag%3D202%26mltag%3D202%26platid%3D10%26splatid%3D1003%26qos%3D4%26fcheck%3D0%26uid%3D2093832770.rp%26keyitem%3DdpoOd-l3AnupIUuBI8VtFwmKzWltcfnZpngeV5Yo3I1Oleh6yGrbVeKRoRQ.%26ntm%3D1480431000%26nkey2%3D42844197aacd78ee829d1464e228b729%26nkey%3D2087665be98d5c62a86fa39e515c8e22%26tag%3Dlive%26video_type%3Dm3u8%26useloc%3D0%26mslice%3D3%26uidx%3D0%26errc%3D0%26gn%3D149%26lrtmcd%3D109%26buss%3D202%26cips%3D124.205.90.66%26geo%3DCN-1-12-16%26tmn%3D1480412885%26pnl%3D149%2C149%2C398%2C224%26ext%3Dm3u8%26sign%3Dlive_web%26ostype%3Dmacos%26hwtype%3Diphone%26tm%3D1480412885%26key%3Da469598e59d469c1841ffb6ffb9e96a6&s=4";
        //             // break;
        //         }
        //     }
        // };
        $(".slogan").html("");
        $(".slogan").html("<div id='a1' class='animated fadeIn' style='width:100%;height:100%'></div>");
        var flashvars = {
            f: 'lib/m3u8/m3u8.swf',
            a: URL,
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
        var video = [URL];
        CKobject.embed('lib/ckplayer/ckplayer.swf', 'a1', 'ckplayer_a1', '100%', '100%', false, flashvars, video, params);
    });
    $("#saveWeb").on("click", function() {
        index.AddFavorite("zhibodude", "www.zhibodude.com")
    });
    //切换直播日期
    $(".dude-box").on("click", "#go-todayGame", function() {
        $("#todayGame").show();
        $("#tomGame").hide();
    });
    $(".dude-box").on("click", "#go-tomGame", function() {
        $("#todayGame").hide();
        $("#tomGame").show();
    });
});
