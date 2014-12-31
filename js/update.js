var keepPressTimes = 0;
var referencePressTimes = 0;
var referenceSpeed = 1;
var pressTimesArray = null;
var playerPressSpeed = 0;
function initUpdateConfig(arrayNumber) {

	if (arrayNumber) {
		pressTimesArray = new Array(arrayNumber); 
	} else {
		pressTimesArray = new Array((parseInt(config.preferTime) + 1) * 10); //指创建长度为X的数组 
	}
 
	for (var i = 0; i < pressTimesArray.length; i++)		//初始化数组为0
	{
		pressTimesArray[i] = 0;
	}
}

function updateSpeedF(pressTimes)
{
	var speed_Temp = 0;

	pressTimesArray.unshift(pressTimes);
	pressTimesArray.pop();

	for (var i = 0; i < pressTimesArray.length; i++) {
		speed_Temp += pressTimesArray[i];
	}

	playerPressSpeed = speed_Temp;	//得到玩家当前按键速度

	if (playerPressSpeed >= referenceSpeed) {		
		return 1;
	} else {		
		return 2;
	}
}
