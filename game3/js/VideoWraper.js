;var  VideoWraper = function(videoObject,name){
	this.init(videoObject,name);
}

var p = VideoWraper.prototype;

p.video = null;

p.isPlaying = false;

p.volume = 0.8;

p.passedTime = 0;

p.init = function(videoObject,name){

   this.video = videoObject;
   this.video.src = "videos/"+name+".mp4";

}

p.play = function(){
   this.video.play();
   this.isPlaying = true;
}

p.stop = function(){
   this.video.pause();
  
   this.isPlaying = false;
}
p.pause = function(){
   this.video.pause();
  
   this.isPlaying = false;
}
p.isEnded = function(){
	console.log(this.video.ended);
	return this.video.ended;
}
