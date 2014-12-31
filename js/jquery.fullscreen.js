/*!
 * jQuery DOM fullscreen Plugin
 * version: 0.0.1
 * @requires jQuery v1.5 or later
 * Copyright (c) 2013 微个日光日
 * http://xiebaochun.github.com/
 */
;(function($) {
   //预定义变量，防止参数缺失
   $.fn.fullScreen = function(options){
   	    var s =$.extend({} ,{
          //配置默认选项
          isFullScreen:true,     //是否全屏
          
          },options); 
         
        var elem=this[0];
        //console.log(elem);
        if(s.isFullScreen){
         	if (elem.requestFullscreen) {
			   elem.requestFullscreen();
			} else if (elem.msRequestFullscreen) {
			   elem.msRequestFullscreen();
			} else if (elem.mozRequestFullScreen) {
		    	elem.mozRequestFullScreen();
			} else if (elem.webkitRequestFullscreen) {
		    	elem.webkitRequestFullscreen();
			}
		}else{
			if(document.cancelFullScreen) {
			document.cancelFullScreen();
			} else if(document.mozCancelFullScreen) {
			document.mozCancelFullScreen();
			} else if(document.webkitCancelFullScreen) {
			document.webkitCancelFullScreen();
			}
		}
        

   }
   
})(jQuery);