/*
 * @Author: 张驰阳
 * @Date:   2017-01-09 17:34:07
 * @Last Modified by:   张驰阳
 * @Last Modified time: 2017-01-09 17:57:27
 */

'use strict';
var voice = {};
var data;
function loadXMLDoc(url) {
    var xmlhttp;
    var txt, xx, x, i;
    if (window.XMLHttpRequest) { // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp = new XMLHttpRequest();
    } else { // code for IE6, IE5
        xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange = function() {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            x = xmlhttp.responseXML.documentElement.getElementsByTagName("channel");
            console.log(x);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}
jQuery(document).ready(function($) {
    $.ajax({
        url: 'http://voice.hupu.com/generated/voice/news_nba.xml',
        // type:"GET",
        dataType:"jsonp",
        success: function(msg) {
        	data=msg;
            console.log($(msg).find(".channel"));
        }
    })
// loadXMLDoc('http://voice.hupu.com/generated/voice/news_nba.xml');

});
