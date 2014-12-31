var Obstacles=function (files){
   this.init(files);
}

var p=Obstacles.prototype;

p.bitmaps=[];

p.x=0;

p.y=0;

p.width=null;

p.height=null;

p.currentBitmap=null;

p.level=1;

p.init=function(files){

  if(!files){
    //console.log("break");
    return;
  }
  //console.log("continue!!");
	var images=new Array();
	for (var i = 1; i <6; i++) {
		  var temp=new Array();
		  for(var index in files["level"+i]){
             temp[index]=new createjs.Bitmap("assets/level/level0"+i+"/"+files["level"+i][index]);
		  }
          images["level"+i]=temp;
		};
  
  this.bitmaps=images;

  this.currentBitmap=images["level"+this.level][Math.floor(Math.random()*images["level"+this.level].length)];

  this.currentBitmap.x=-100;
  this.currentBitmap.y=100;
  this.currentBitmap.visible=false;
  //console.log(this.currentBitmap);
  this.fixSize();
  
}

p.changeImage=function(){
	//console.log(this);

  this.currentBitmap.image=this.bitmaps["level"+this.level][Math.floor(Math.random()*this.bitmaps["level"+this.level].length)].image;
  this.fixSize();
}

p.update=function(x,y,visible){
  this.fixSize();
  this.currentBitmap.visible=visible;
  this.currentBitmap.x=x+50;
  this.currentBitmap.y=y-(this.currentBitmap.image.height*this.currentBitmap.scaleX-100);
  
  //console.log(visible);
}

p.setVisible=function(visible){
  this.currentBitmap.visible=visible;
}

p.fixSize=function(){
  this.currentBitmap.scaleX=parseFloat(100+this.level*5)/this.currentBitmap.image.width;
  this.currentBitmap.scaleY=parseFloat(100+this.level*5)/this.currentBitmap.image.width;
  //console.log(parseFloat(100)/this.currentBitmap.image.width);
};


var BgSprites;
(function(){

  //console.log("go into the backgroundsprites function");

  var BackGroundSprites=function(files){

     this.init(files);

  }  

  var p=BackGroundSprites.prototype;
  
  p.currentBitmapAnimation=null;
 

  p.ss=null;

  //console.log(p);
  
  p.init=function(files){
  
    var images=new Array();
    var spriteSheets=new Array();

    var animationFrequency=3;
    // for(var index in files["bgsprites"]){

    //   images[index]=new createjs.Bitmap("assets/bgs/"+files["bgsprites"][index]);
    //   console.log(images[index]);
    // }
    var h1=30;
    var h2=300;
    var count=16;
    var spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/01.png"],"frames":{"regX":0,"height":129,"count": count, "regY": 0, "width":1664/count}};
    var ss = new createjs.SpriteSheet(spriteSheet);
    images[0]=new createjs.BitmapAnimation(ss);
    images[0].y=h2;
    spriteSheets[0]=ss;
    
    count=9;
    spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/02.png"],"frames":{"regX":0,"height":181,"count": count, "regY": 0, "width":2250/count}};
    ss = new createjs.SpriteSheet(spriteSheet);
    images[1]=new createjs.BitmapAnimation(ss);
    images[1].y=h2+50;
    spriteSheets[1]=ss;

    count=8;
    spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/03.png"],"frames":{"regX":0,"height":62,"count": count, "regY": 0, "width":808/count}};
    ss = new createjs.SpriteSheet(spriteSheet);
    images[2]=new createjs.BitmapAnimation(ss);
    images[2].y=h2;
    spriteSheets[2]=ss;

    count=6;
    spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/04.png"],"frames":{"regX":0,"height":131,"count": count, "regY": 0, "width":666/count}};
    ss = new createjs.SpriteSheet(spriteSheet);
    images[3]=new createjs.BitmapAnimation(ss);
    images[3].y=h2;
    spriteSheets[3]=ss;

    count=5;
    spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/05.png"],"frames":{"regX":0,"height":425,"count": count, "regY": 0, "width":1850/count}};
    ss = new createjs.SpriteSheet(spriteSheet);
    images[4]=new createjs.BitmapAnimation(ss);
    images[4].y=h2-65;
    spriteSheets[4]=ss;

    count=12; 
    spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/06.png"],"frames":{"regX":0,"height":100,"count": count, "regY": 0, "width":804/count}};
    ss = new createjs.SpriteSheet(spriteSheet);
    images[5]=new createjs.BitmapAnimation(ss);
    images[5].y=h2;
    spriteSheets[5]=ss;
    
    count=14; 
    spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/07.png"],"frames":{"regX":0,"height":400,"count": count, "regY": 0, "width":5600/count}};
    ss = new createjs.SpriteSheet(spriteSheet);
    images[6]=new createjs.BitmapAnimation(ss);
    images[6].y=h1;
    spriteSheets[6]=ss;

    count=2; 
    spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/08.png"],"frames":{"regX":0,"height":118,"count": count, "regY": 0, "width":288/count}};
    ss = new createjs.SpriteSheet(spriteSheet);
    images[7]=new createjs.BitmapAnimation(ss);
    images[7].y=h1;
    spriteSheets[7]=ss;

    count=3; 
    spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/09.png"],"frames":{"regX":0,"height":146,"count": count, "regY": 0, "width":531/count}};
    ss = new createjs.SpriteSheet(spriteSheet);
    images[8]=new createjs.BitmapAnimation(ss);
    images[8].y=h1;
    spriteSheets[8]=ss;
    
    count=24; 
    spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/10.png"],"frames":{"regX":0,"height":92,"count": count, "regY": 0, "width":2112/count}};
    ss = new createjs.SpriteSheet(spriteSheet);
    images[9]=new createjs.BitmapAnimation(ss);
    images[9].y=h1;
    spriteSheets[9]=ss;

    count=22; 
    spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/11.png"],"frames":{"regX":0,"height":121,"count": count, "regY": 0, "width":2882/count}};
    ss = new createjs.SpriteSheet(spriteSheet);
    images[10]=new createjs.BitmapAnimation(ss);
    images[10].y=h1;
    spriteSheets[10]=ss;

    count=9; 
    spriteSheet ={"animations":{"loop":[0,count-1,"loop",animationFrequency]},"images":["assets/bgs/12.png"],"frames":{"regX":0,"height":179,"count": count, "regY": 0, "width":1557/count}};
    ss = new createjs.SpriteSheet(spriteSheet);
    images[11]=new createjs.BitmapAnimation(ss);
    images[11].y=h1;
    spriteSheets[11]=ss;
    
    for (var i = images.length - 1; i >= 0; i--) {
      images[i].scaleX = images[i].scaleY = 0.5;
    };

    //console.log(images[1]);
    this.ss=spriteSheets;
    this.bitmaps=images;
    this.currentBitmapAnimation=this.bitmaps[1];//images[Math.floor(Math.random()*images.length)];
    //console.log("BackGroundSprites currentBitmap:"+this.currentBitmapAnimation);
    // this.currentBitmapAnimation.x=100;
    // this.currentBitmapAnimation.y=100;
    
    //this.currentBitmapAnimation.gotoAndPlay("loop");
   
  }
  p.update=function(runningRate,level){
    this.currentBitmapAnimation.x-=runningRate;
    if(this.currentBitmapAnimation.x<=-200){
      //this.currentBitmapAnimation.visible=false;
      this.changeImage(level);
      //this.currentBitmapAnimation=new createjs.BitmapAnimation(this.ss[3]);
      this.currentBitmapAnimation.x=1024;
    }
  }
  p.changeImage=function(level){
    if(level==5||level==1){
      this.currentBitmapAnimation=this.bitmaps[Math.floor(Math.random()*this.bitmaps.length)];  
    }else{
      this.currentBitmapAnimation=this.bitmaps[Math.floor(Math.random()*(this.bitmaps.length-6))+6];  
    }
    
    //this.currentAniamtion.visible=true;
    this.currentBitmapAnimation.gotoAndPlay("loop");
    //this.currentBitmapAnimation.gotoAndPlay("loop");
    
  }

  // p.update=function(x,y,visible){
  //   this.fixSize();
  //   this.currentBitmap.visible=visible;
  //   this.currentBitmap.x=x+50;
  //   this.currentBitmap.y=y-(this.currentBitmap.image.height*this.currentBitmap.scaleX-100);
    
  //   //console.log(visible);
  // }

  p.setVisible=function(visible){
    this.currentBitmap.visible=visible;
  }
  //测试 test
  // //use the php to retrieve the images file name
  // $.get("php/bgSprites.php",function(data){
  //   var images=(data);
  //   console.log(images);
    
  //   var bgs=new BackGroundSprites(images);
    

  // },"json").fail(function(){
    
  //   console.log("get images by php fail!,it will use the cache path to get images");
  //   $.get("php/bgSpritesTemp.json",function(data){
  //        var images=jQuery.parseJSON(data);
  //      console.log(images);
  //      var bgs=new BackGroundSprites(images);
  //   },"json");
  // });
  BgSprites=BackGroundSprites;
 
}());

