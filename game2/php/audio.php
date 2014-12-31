<?php
// header("content-type:application/json");
//header('Content-type: text/html; charset=utf-8');
if(isset($_GET["type"])){
    if($_GET["type"]=="delete"){
       deleteFile($_GET["fileName"],$_GET["fileType"]);
       return; 	
    }

   
}
function deleteFile($fileName,$fileType){

   if($fileType=="image"){
   	 unlink("../images/BG/".iconv("UTF-8","GBK",$fileName));
   	 echo json_encode($fileName."删除成功！");
   }

   if($fileType=="audio"){
   	 if(!unlink("../Music/".iconv("UTF-8","GBK",$fileName))){
         echo json_encode($fileName."删除失败！，请重试。");
   	 };
   	 echo json_encode($fileName."删除成功！");
   }

    // echo json_encode($fileName."删除失败！，请重试。");
}
//if($type=="delete"){
	//"delete success!";


//}





$dir = "../Music";
$dh  = opendir($dir);
while (false !== ($filename = readdir($dh))) {
	if($filename!="."&&$filename!="..")
	{
		$audioFiles[] =iconv("GBK","UTF-8",$filename);//urlencode($filename);
	}
}
sort($audioFiles);

$dir="../images/BG";
$dh  = opendir($dir);
while (false !== ($filename = readdir($dh))) {
	if($filename!="."&&$filename!="..")
	{
		$bgFiles[] =iconv("GBK","UTF-8",$filename);
	}
}
sort($bgFiles);




/* 处理json_encode中文乱码 */ 
// $data = array ('game' => '冰火国度', 'name' => '刺之灵', 'country' => '冰霜国', 'level' => 45 ); 
// echo json_encode ( $data ); 
// echo "<br>"; 
// $newData = array (); 
// foreach ( $data as $key => $value ) { 
// $newData [$key] = urlencode ( $value ); 
// } 
// echo urldecode ( json_encode ( $newData ) );

//print_r( iconv('GB2312', 'UTF-8', $audioFiles));
// print_r(array('dd'=>"中国"));


// print_r(json_encode(array("audioFiles"=>array("audioFiles"=>array("中国"))),JSON_UNESCAPED_UNICODE));


echo json_encode(array("audioFiles"=>$audioFiles,"bgFiles"=>$bgFiles));




?>