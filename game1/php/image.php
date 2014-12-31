<?php
// header("content-type:application/json");
//header('Content-type: text/html; charset=utf-8');

for($i=1;$i<6;$i++){
   $dir="../assets/level/level0".$i;  
   $dh  = opendir($dir);
  while (false !== ($filename = readdir($dh))) {
    if($filename!="."&&$filename!="..")
    {
      $bgFiles[] =iconv("GBK","UTF-8",$filename);
    }
  }
  sort($bgFiles);
  $imageFiles[]=$bgFiles;
  $bgFiles=array();
}


$imageData=json_encode(array("level1"=>$imageFiles[0],"level2"=>$imageFiles[1],"level3"=>$imageFiles[2],"level4"=>$imageFiles[3],"level5"=>$imageFiles[4]));

$file = "imageTemp.json";

//$json = json_decode(file_get_contents($file));

//$json[$user] = array("first" => $first, "last" => $last);

file_put_contents($file, json_encode($imageData));

echo $imageData;

?>