/*
* @Author: 张驰阳
* @Date:   2016-12-27 18:09:21
* @Last Modified by:   张驰阳
* @Last Modified time: 2016-12-27 18:14:45
*/

'use strict';
	var test;
jQuery(document).ready(function($) {
	
	$.ajax({
		url: 'http://127.0.0.1:3000/'+"getjson/twitter-user",
		type: 'POST',
		dataType: 'json',
		success:userlist
	});

});

function userlist(msg){
test=msg;
}