#target bridge;  
if( BridgeTalk.appName == "bridge" ) {   
timeStack = MenuElement.create("command", "Time Stack", "at the end of submenu/Stack");  
}  
timeStack.onSelect = function () {  
Secs = Window.prompt("Please enter number of seconds","10","Seconds");
if (Secs == null)  return;
Secs  =  Number(Secs) * 1000;  
if (ExternalObject.AdobeXMPScript == undefined)  ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");  
var folder1 = Folder(app.document.presentationPath);  
var fileList = folder1.getFiles(/\.(jpg|jpe|jpeg|gif|eps|dng|bmp|tif|tiff|psd|crw|cr2|rle|dib|cin|dpx|ps|pcd|pict|vda|icb|vst|wbm|sct|pbm|flm|psb|exr|pcx|pdp|nef|dcr|dc2|erf|raf|orf|tga|mrw|mos|srf|pic|pct|pxr|pdd|pef|png|x3f|raw|rw2)$/i);  
var fileArray = new Array();  
for(var a in fileList){  
var md = new Thumbnail(fileList[a]).synchronousMetadata;  
try{  
var dateTime = new XMPDateTime(new Thumbnail(fileList[a]).metadata.read("http://ns.adobe.com/exif/1.0/","DateTimeOriginal")).getDate().getTime();  
}catch(e){dateTime = 1;}  
md.namespace = "http://ns.adobe.com/exif/1.0/aux/";
var cameraSerial  = md.SerialNumber ? md.SerialNumber : "123456";
if(Number(cameraSerial > 100 && Number(dateTime) > 1 )) fileArray.push([[decodeURI(fileList[a].name)],[dateTime],[cameraSerial]]);  
}  
if(fileArray.length < 2){
    alert("There are no files with Exif Info in this folder");
    return;
    }
fileArray = fileArray.sort(function(a,b){return a[1]-b[1];});  
var serNos = new Array();  
for(var s in fileArray){serNos.push(Number(fileArray[s][2]));}  
serNos = uniqueSortedList(serNos);  
var Camera = new Object();  
for(var g in serNos){Camera[serNos[g]] = new Array();};  
for(var d in fileArray){  
    Camera[Number(fileArray[d][2])].push([[fileArray[d][0].toString()],[Number(fileArray[d][1])]]);  
}  
fileArray=[];  
for(var k in serNos){  
var Camera1 = Camera[serNos[k]];  
while( Camera1.length > 0){  
    tmpArray=[];  
    tmpArray.push(Camera1.shift());  
    cmp = Number(tmpArray[0][1]) + Secs;  
while( Camera1.length > 0){  
        if(Number(Camera1[0][1]) <= Number(cmp)){  
            tmpArray.push(Camera1.shift());  
            }else{break; }  
            }  
if(tmpArray.length > 1) Stack();  
}  
}  
function Stack(){  
        app.document.deselectAll();  
        for(var s in tmpArray){  
            var splitIt=tmpArray[s].toString().split(',');  
        app.document.select(new Thumbnail(new File(app.document.presentationPath + "/" + splitIt[0])));  
        }  
    app.document.chooseMenuItem("StackGroup");  
}  
function uniqueSortedList(array){  
var unduped = new Object;  
for (var i in array) {unduped[array[i]] = array[i];}  
var uniques = new Array;  
for (var k in unduped) {uniques.push(unduped[k]);}  
return uniques.sort();  
}  
};