#target bridge   
//start of file FFD8 step 1
//var startJpg=tempFile1.search(/\xFF\xD8\xFF/);
// start of stream DAFF step 2
//var stream =tempFile1.search(/\xDA\xFF/);
//end of file FFD9 step 3
//var endJpg = tempFile1.search(/\xFF\xD9/);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
   if( BridgeTalk.appName == "bridge" ) {  
quickJPGS = MenuElement.create("command", "Create Quick JPGS", "at the end of Thumbnail");
}
quickJPGS.onSelect = function () { 
	  mainQuickJPGS();
	  }
function mainQuickJPGS(){
var items = app.document.selections;
	for (var a =0; a<items.length;a++){
		if(items[a].type == "file" && items[a].name.match((/\.(crw|cr2|tiff|raw|rw2|dng|nef|orf|erf|mos|dcr|raf|srf|pef|pcx|x3f)$/i))){
var JPEG = new File(items[a].path.substr(0,items[a].path.lastIndexOf ('.'))+"-quick.jpg");
//var tempFile = new File(items[a]);
tempFile=new File(items[a].path);
var fileString='';
tempFile.open('r');
tempFile.encoding = 'BINARY'; 
fileString=tempFile.read();
tempFile.close();
for(var w =0;w<6;w++){
var startJpg=fileString.search(/\xFF\xD8\xFF/);
if(startJpg != -1){
if(testJPG()){
var endJpg = fileString.search(/\xFF\xD9/);
fileString = fileString.substr(0,endJpg+2);
JPEG.open('w');
JPEG.encoding = 'BINARY';
JPEG.write(fileString);
JPEG.close();
break;
}else{
fileString = fileString.substr(20);
	continue;
}}}}

function testJPG(){
var result=false;
fileString = fileString.substr(startJpg);
var endTest = fileString.search(/\xFF\xD9/);
if(endTest > 204800 ? result= true : result= false);
return result;
		}
	}
}