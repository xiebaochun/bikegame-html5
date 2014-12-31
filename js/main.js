window.onload=function(){
	console.log("console");
	var game_icon;
    var preLevel=3;
    var preLevel2time={
        "1":2,
        "2":1.8,
        "3":1.6,
        "4":1.4,
        "5":1.2,
    };
    var time2preLevel={
        "2":1,
        "1.8":2,
        "1.6":3,
        "1.4":4,
        "1.2":5,
    };

    updateLevel();


    //alert(preLevel2time["4"]);
    

    // $("#short-setting li").hover(function(){
    //      $(this).siblings().css({"background": "url(images/star01.png"});
    //      $(this).prevAll().css({"background": "url(images/star00.png"});
    //      $(this).css({"background": "url(images/star00.png"});

    // },function(){
    //      //alert($(this).parent().children().length);
    //      $(this).siblings().css({"background": "url(images/star01.png"});
    //      $(this).css({"background": "url(images/star01.png"});
    //      for (var i = 0;i<preLevel; i++) {
    //          $(this).parent().children().eq(i).css({"background": "url(images/star00.png"});
    //      };
         
    // });
    $("#short-setting li").click(function(){
        //alert($(this).index());
        preLevel=$(this).index()+1;
        
        $.get("game1/php/setting.php",
            {"type":"update",
              "data":{"preferTime":preLevel2time[""+preLevel]
              }},
            function(data){
            //alert(data);//data="save success" from service
            //updateLevel();

            
        },"json").fail(function(){
           //alert("error,请检查是否已开启php服务！");
        });

        
         $.get("game2/php/setting.php",
            {"type":"update",
              "data":{"preferTime":preLevel2time[""+preLevel],
                     
              }},
            function(data){
              //alert(data);//成功返回
           
            },"json").fail(function(){
               //alert("error,请检查是否已开启php服务！");
        });

        updateLevel(preLevel);
        // $(this).siblings().css({"background": "url(images/star01.png)"});
        //  $(this).css({"background": "url(images/star01.png"});
        //  for (var i = 0;i<preLevel; i++) {
        //      $(this).parent().children().eq(i).css({"background": "url(images/star00.png)"});
        //  };


    });

    //game_icon.hover(function(){console.log("dj");},function(){});
    $("#content .game_list").each(function(){
    	$(this).hover(function(){
            //$(this).find(".game_name").css("opacity","0.6");
            $(this).find(".game_name").animate({"opacity":"0.5","height":"40px"},20,function(){

            });
            //$(this).find(".game_name").addClass("animated fadeIn");
            //$(this).find(".game_name").removeClass("animated bounceOutUp");
    	},function(){
            //$(this).find(".game_name").css("opacity","0.3");
            $(this).find(".game_name").animate({"opacity":"0.3","height":"40px"},20,function(){

            });
            //$(this).find(".game_name").removeClass("animated fadeOut");
            //$(this).find(".game_name").removeClass("animated fadeIn");
            //$(this).find(".game_name").addClass("animated bounceOutUp");
    	});
       //console.log(game_icon);	
    });
    $("#game3_icon").click(function(){
        $("html").animate({opacity:"0"},null,function(){
            window.location.href="game3/play.html";
        });
        //window.location.href="../html5videoplayer/index.html";
        
        //window.navigate("../../html5videoplayer/index.html");
    });
    $("#game2_icon").click(function(){
    	$("html").animate({opacity:"0"},null,function(){
    		window.location.href="game2/play.html";
    	});
    	//window.location.href="../html5videoplayer/index.html";
    	
    	//window.navigate("../../html5videoplayer/index.html");
    });
    $("#game1_icon").click(function(){
        $("html").animate({opacity:"0"},null,function(){
            window.location.href="game1/play.html";
        });
        //window.location.href="../html5videoplayer/index.html";
        
        //window.navigate("../../html5videoplayer/index.html");
    });
    //console.log(game_icon);
    $(".menu").hover(function(){
        $(".menu").animate({"height":"90px"},100,function(){});
    },function(){
        $(".menu").animate({"height":"30px"},100,function(){});
    });


    function updateLevel(level){
        if(level){
            for(var i=0;i<5;i++){
                    $("#short-setting").children().eq(i).css({"background-image": "url(images/star01.png)"});
                }

            for (var i = 0;i<level; i++) {
                
                   $("#short-setting").children().eq(i).css({"background-image": "url(images/star00.png)"});
            }
        }else{
            $.get("game1/config.xml",function(data){
                var config={};
                config.preferTime=parseFloat($(data).children().children("preferTime").html());
                //console.log(config.preferTime);
                preLevel=time2preLevel[""+config.preferTime];
                //alert(preLevel);
                for(var i=0;i<5;i++){
                    $("#short-setting").children().eq(i).css({"background-image": "url(images/star01.png)"});
                }
                for (var i = 0;i<preLevel; i++) {
                    
                    $("#short-setting").children().eq(i).css({"background-image": "url(images/star00.png)"});
                }

            });
        }
        
    }
}