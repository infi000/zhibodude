/*
 * @Author: 张驰阳
 * @Date:   2016-12-28 16:09:20
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2016-12-28 17:03:03
 */

'use strict';
var Tw = function() {
    var that = this;
    this.domain = "http://www.zhibodude.com:3000/";
    this.invoke = function(url, callback) {
        $.ajax({
                url: that.domain + url,
                type: 'POST',
                dataType: 'json',
                success: callback
            })
            .done(function() {})
            .fail(function() {})
            .always(function() {});
    };
    this.callback = function(msg) {
        var obj = "";
        msg.twitter.map(function(index, key) {
            var name = index.name;
            var time = index.time;
            var head = that.domain+"static/img/"+index.thead;
            var msg = index.msg;
            var img = (index.img == "no") ? "" : '<p><img src="'+that.domain+'static/img/' + index.img + '" alt="兄弟直播"  class="twitterImg"></p>';
            obj += '<li class="list-group-item"><div class="media"><a class="media-left" href="#">';
            obj += '<img src="' + head + '" alt="兄弟直播" class="playerHead"></a>';
            obj += '<div class="media-body"><h4 class="media-heading">' + name + '<small style="margin-left:14px;">' + time + '</small></h4><div><p>' + msg + '</p></div>';
            obj += img + '</div></div></li>';
        });
        $(".twitter-live-box").html(obj);
    };
};
jQuery(document).ready(function($) {
    var tw = new Tw();
    tw.params = document.URL.split("?")[1];
    tw.invoke("getjson/tw-" + tw.params, tw.callback);
});
