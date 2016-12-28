/*
 * @Author: 张驰阳
 * @Date:   2016-12-27 18:09:21
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2016-12-28 16:05:53
 */

'use strict';
var test;
var Tw_user = function() {
    var that = this;
    this.domain = "http://www.zhibodude.com:3000/";
    this.tellmeurl = "https://infi000.wilddogio.com/zhibodude-tellme.json"
    this.invoke = function(_url, _callback) {
        $.ajax({
                url: that.domain + _url,
                type: 'POST',
                dataType: 'json',
                success: _callback
            }).done(function() {})
            .fail(function() {})
            .always(function() {});
    };
    this.callback = function(msg) {
        var obj = '';
        msg.map(function(index, key) {
            var name = index.player;
            var info = index.info;
            var img = that.domain + "static/img/" + index.head;
            var page = "twitter-user.html?" + decodeURIComponent(name);
            obj += '<div class="twitter-user">';
            obj += '<dl class="pull-left"><dt><div class="twitter-user-head">';
            obj += '<img src="' + img + '" alt="">';
            obj += '</div><a href="' + page + '" class="btn btn-primary" target="_blank">选择进入</a></dt>';
            obj += '<dd><span>' + name + '</span></dd></dl>';
            obj += '<p>' + info + '</p></div></div>';
        });
        $("#twitter-userBox").html(obj);
    };
}
jQuery(document).ready(function($) {
    var tw = new Tw_user();
    tw.invoke("getjson/twitter-user", tw.callback);
    var wdog = {};
    wdog.config = {
        authDomain: "infi000.wilddog.com",
        syncURL: "https://infi000.wilddogio.com"
    }
    wilddog.initializeApp(wdog.config);
    wdog.ref = wilddog.sync().ref("/zhibodude-tellme/");
    $(".tellme button").on("click", function() {
        var date = function(num) {
            var oDate = new Date();
            oDate.setDate(oDate.getDate() + num); //国外加一天
            var year = oDate.getFullYear(); //获取系统的年；
            var month = oDate.getMonth() + 1; //获取系统月份，由于月份是从0开始计算，所以要加1
            var day = oDate.getDate(); // 获取系统日，
            return year + "-" + month + "-" + day
        };
        var data = {
            time: date(0),
            msg: $(".tellme input").val()
        };
        if (data.msg == "") {
            $(".tellme input").focus();
        } else if (data.msg == wdog.type) {
            alert("请勿重复提交");
        } else {
            wdog.ref.push(data, function(err) {
                if (err == null) {
                    alert("感谢您的参与！");
                    wdog.type = data.msg;
                }
            });
        };
    })
});
