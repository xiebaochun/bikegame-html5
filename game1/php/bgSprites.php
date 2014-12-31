<?php
// header("content-type:application/json");
//header('Content-type: text/html; charset=utf-8');


   $dir="../assets/bgsprites";  
   $dh  = opendir($dir);
  while (false !== ($filename = readdir($dh))) {
    if($filename!="."&&$filename!="..")
    {
      $bgFiles[] =iconv("GBK","UTF-8",$filename);
    }
  }
  sort($bgFiles);



$imageData=json_encode(array("bgsprites"=>$bgFiles));

$file = "bgspritesTemp.json";


file_put_contents($file, json_encode($imageData));

echo $imageData;

?>