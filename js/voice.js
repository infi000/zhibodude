/*
 * @Author: 张驰阳
 * @Date:   2017-01-09 17:34:07
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2017-01-11 11:38:32
 */

'use strict';
var voice = {};

function reTime(t) {
    var t = new Date(t);
    var n = new Date();
    var result = (n.getTime() - t.getTime()) / 1000 / 60 / 60;
    result = parseInt(result);
    return result;
}
var getVoice = function() {
    $.ajax({
        url: 'http://zhibodude.com:3000/hupu/1',
        success: function(msg) {

            var obj = "";
            $(msg).find("channel item").map(function(index, elem) {
                var title = $(elem).find("title").html();
                var link = $(elem).find("link").html();
                var des = $(elem).find("description").text();
                var o = $("<div></div>");
                o.html(des);
                var voicePic = o.find("img").attr("src");
                var info = o.find("p").eq(0).html();
                info = info.substr(0, 45) + "...";
                var date = $(elem).find("pubDate").html();
                date = reTime(date);
                obj += '<div class="voiceBox" type="button"  data-toggle="modal" data-target=".voiceArt" data-num="' + index + '">';
                obj += '<div class="voiceSite"><img src="http://7xiyp4.com2.z0.glb.qiniucdn.com/voice.hupu.com" width="16px" height="16px"><span>虎扑篮球新声</span></div>';
                obj += '<div class="voiceTitle">' + title + '</div><div class="voicePic"><img src="' + voicePic + '" width="100%"></div>';
                obj += '<div class="voiceView"><p>' + info + '</p></div>';
                obj += '<div class="voiceTime"><span class="glyphicon glyphicon-time"></span><span>' + date + '小时前</span></div> </div>';
                voice[index] = des;
                return obj;
            });
            $("#voiceContainer").html(obj);
            var $voiceContainer = $('#voiceContainer').imagesLoaded(function() {
                // init Masonry after all images have loaded
                $voiceContainer.masonry({
                    // options...
                    itemSelector: '.voiceBox',
                    percentPosition: true
                });
            });
        }
    });
}
jQuery(document).ready(function($) {
    //加载新闻
    getVoice();

    $("#voiceContainer").on("click", ".voiceBox", function() {
        var num = $(this).attr("data-num");
        var title = $(this).find(".voiceTitle").html();
        $(".modal-body").html(voice[num]);
        $("#myModalLabel").html(title);
    })

});
