//N.B This script was written for Windows, some function do not work with  a mac.
#target bridge   
 if( BridgeTalk.appName == "bridge" ) {  
var menu = MenuElement.find ('myBridgeMenu');
if (menu == null){
var newMenu = MenuElement.create( "menu", "Bridge", "before tools/ps", "myBridgeMenu" );
WebPics = MenuElement.create( "command", "Bridge Processor", "at the end of myBridgeMenu",  "BridgeProcessor" );
}
WebPics.onSelect = function () { 
   WebPictures();
   }
function WebPictures(){
if(app.version.match(/^\d+/) < 2){
    alert("You need CS3 or better to use this script!");
    return;
    }
if($.os.match(/windows/gi)){
var TemplateFolder = new Folder(Folder.userData.absoluteURI + "/Adobe/XMP/Metadata Templates");
var Templates = TemplateFolder.getFiles("*.xmp");
var TemplateNames =[];
for(var d in Templates){TemplateNames.push(decodeURI(Templates[d].name.toString().replace(/\.xmp$/i,'')));}
}
var PrefsFile = File(Folder.userData +"/BridgePrefs.dat");
var Prefs = {};
if(!PrefsFile.exists){
    Prefs.folder = decodeURI(app.document.presentationPath);
    Prefs.Width = 900;
    Prefs.Height = 800;  
    Prefs.quality = 79;
    Prefs.type = 0;
    if($.os.match(/windows/gi)){
    Prefs.template = 0;
    }
    }else{
PrefsFile.open('r');
Prefs = eval(PrefsFile.read());
PrefsFile.close();
if($.os.match(/windows/gi)){
if(Prefs.template == null) Prefs.template = 0;
if(Prefs.template == undefined) Prefs.template = 0;
    }
}
var win = new Window('dialog','Bridge Processor');
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
var myPen =g.newPen (g.PenType.SOLID_COLOR, [0.00, 0.00, 0.00, 1],lineWidth=1);
g.backgroundColor = myBrush;
g.foregroundColor = myPen;
win.alignChildren="row";
win.g10 = win.add('group');
win.g10.orientation = "row";
win.title = win.g10.add('statictext',undefined,"Bridge Processor");
win.title.helpTip="Written by Paul Riggott";
win.title.alignment="bottom";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",26);
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.p1.alignChildren="fill";

win.p2= win.p1.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.g3 =win.p2.add('group');
win.g3.orientation = "row";
win.g3.alignment="left";
win.g3.rb1 = win.g3.add('radiobutton',undefined,'Use selected Files');
win.g3.rb2 = win.g3.add('radiobutton',undefined,'Use files of Type');
var FileExtensions = "DNG,PSD,PDD,JPEG,JPG,JPE,GIF,BMP,RLE,DIB,TIF,CRW,NEF,RAF,ORF,CIN,DPX,EPS,PS,FLM,PSB,EXR,PCX,PDP," +
"PCD,RAW,PICT,PCT,PIC,PXR,PNG,TGA,VDA,ICB,VST,TIF,TIFF,WBM,DNG,SCT,PBM,CRW,CR2,DC2,DCR,NEF,MOS,MRW,X3F,MOV";
FileExtensions= FileExtensions.toUpperCase();
FileExtensions = FileExtensions.split(",");
FileExtensions= ReturnUniqueSortedList(FileExtensions);
win.g3.dd1 = win.g3.add('dropdownlist',undefined,FileExtensions);
try{
win.g3.dd1.selection= Number(Prefs.type);
}catch(e){win.g3.dd1.selection=0;};
win.g3.rb1.value=true;
win.g3.cb1 = win.g3.add('checkbox',undefined,'Use Subfolders');
win.g3.dd1.enabled=false;
win.g3.cb1.value=false;
win.g3.cb1.enabled=false;

win.g3.rb2.onClick = function(){
win.g3.dd1.enabled=true;
win.g3.cb1.value=false;
win.g3.cb1.enabled=true;
}
win.g3.rb1.onClick = function(){
win.g3.dd1.enabled=false;
win.g3.cb1.value=false;
win.g3.cb1.enabled=false;
}

win.p3= win.p1.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.g10a =win.p3.add('group');
win.g10a.alignment="left";
win.g10a.cb1 = win.g10a.add('checkbox',undefined,'Save to Same Location');

win.g11 =win.p3.add('group');
win.g11.spacing=10;
win.g11.orientation = 'row';
win.g11.alignment="left";
win.g11.st1 = win.g11.add('statictext',undefined,'Output Folder :-');
win.g11.st1.preferredSize=[200,20];
win.g11.bu1 = win.g11.add('button',undefined,'Browse');
win.g11.st1.alignment="left";
win.g11a =win.p3.add('group');
win.g11a.et1 = win.g11a.add('edittext');
win.g11a.et1.preferredSize=[400,20];
win.g11a.et1.enabled=false;
if(Folder(Prefs.folder.exists)){
    win.g11a.et1.text =  decodeURI(Folder(Prefs.folder).fsName); 
    outputFolder = Folder(Prefs.folder);
    }
win.g11.bu1.onClick=function(){   
     outputFolder = Folder.selectDialog("Please select the output folder",Prefs.folder);    
     if(outputFolder !=null) win.g11a.et1.text =  decodeURI(outputFolder.fsName); 
}

win.p4= win.p1.add("panel", undefined, undefined, {borderStyle:"black"});
win.g12 =win.p4.add('group');
win.g12.cb1 = win.g12.add('checkbox',undefined,'Use Fullsize JPEG');
win.g12.cb1.helpTip="This can take a lot more time!";
if($.os.match(/windows/gi)){
win.g12.cb2 = win.g12.add('checkbox',undefined,'Set Resolution');
win.g12.et1 = win.g12.add('edittext',undefined,'300');
win.g12.et1.preferredSize=[50,20];
win.g12.et1.onChanging = function() { 
  if (this.text.match(/[^\d]/)) { 
    this.text = this.text.replace(/[^\d]/g, ''); 
  } 
}
}
win.g12.orientation = 'row';
win.g12.alignment="left";
win.g12.spacing=20;
win.g12.cb2.onClick=function(){
    if(win.g12.cb2.value){
        win.g12.et1.enabled=true;
        }else{
            win.g12.et1.enabled=false;
            }
}
win.g12.cb2.onClick();
win.g14 =win.p4.add('group');
win.g14.spacing=0;
win.g14.orientation = 'row';
win.g14.alignment="left";
win.g14.cb1 = win.g14.add('checkbox',undefined,"Fit Image");
win.g14.cb1.preferredSize=[80,20];
win.g14.st0 = win.g14.add('statictext',undefined,"W: ");
win.g14.et1 = win.g14.add('edittext',undefined,'900');
win.g14.et1.preferredSize=[50,20];
win.g14.et1.enabled=false;
win.g14.et1.text = Number(Prefs.Width);
win.g14.st1 = win.g14.add('statictext',undefined,"px");
win.g14.st1.preferredSize=[30,20]
win.g14.st0a = win.g14.add('statictext',undefined,"H: ");
win.g14.et1a = win.g14.add('edittext',undefined,'900');
win.g14.et1a.preferredSize=[50,20];
win.g14.et1a.enabled=false;
win.g14.et1a.text = Number(Prefs.Height);
win.g14.st1a = win.g14.add('statictext',undefined,"px");
win.g14.st1a.preferredSize=[30,20]
win.g14.st3 = win.g14.add('statictext',undefined,"Quality");
win.g14.st3.preferredSize=[60,20];
win.g14.dd1 = win.g14.add('dropdownlist');
for(var a =1;a<101;a++){
    win.g14.dd1.add("item", a);
    }
win.g14.dd1.selection=Number(Prefs.quality);
win.g14.et1.onChanging = function() { 
  if (this.text.match(/[^\d]/)) { 
    this.text = this.text.replace(/[^\d]/g, ''); 
  } 
}
win.g14.et1a.onChanging = function() { 
  if (this.text.match(/[^\d]/)) { 
    this.text = this.text.replace(/[^\d]/g, ''); 
  } 
}
if($.os.match(/windows/gi)){
win.g18 =win.p4.add('group');
win.g18.spacing=25;
win.g18.orientation = 'row';
win.g18.alignment="left";
win.g18.cb1 = win.g18.add('checkbox',undefined,'Use Template');
win.g18.dd1 = win.g18.add('dropdownlist',undefined,TemplateNames);
if(Templates.length < 1) {
win.g18.cb1.enabled=false;
}else{
win.g18.dd1.selection=Number(Prefs.template);
}
win.g18.dd1.enabled=false;
win.g18.cb1.onClick=function(){
    if(win.g18.cb1.value){
        win.g18.dd1.enabled=true;
        }else{
            win.g18.dd1.enabled=false;
            }
    }
}
win.g14.cb1.onClick=function(){
   if( win.g14.cb1.value){
       win.g14.et1.enabled=true;
       win.g14.et1a.enabled=true;
       }else{
           win.g14.et1.enabled=false;
           win.g14.et1a.enabled=false;
           }
    }
win.g50 =win.p4.add('group');
win.g50.spacing=10;
win.g50.orientation = 'row';
win.g50.alignment="left";
win.g50.st1 = win.g50.add('statictext',undefined,"FileName Options");
var options = ["Document Name","Document Name with Prefix","Document Name with Suffix","Document Name with Sequence Number","New Name with Sequence Number"];
win.g50.dd1 = win.g50.add('dropdownlist',undefined,options);
win.g50.dd1.selection=0;
win.g55 =win.p4.add('group');
win.g55.spacing=10;
win.g55.orientation = 'stack';
win.g55.alignment="left";
win.g55a =win.g55.add('group');
win.g55a.spacing=10;
win.g55a.alignment="left";
win.g55a.st1 = win.g55a.add('statictext',undefined,"Prefix");
win.g55a.et1 = win.g55a.add('edittext',undefined,"");
win.g55a.et1.preferredSize=[250,20];
win.g55a.visible=false;
win.g55b =win.g55.add('group');
win.g55b.spacing=10;
win.g55b.alignment="left";
win.g55b.st1 = win.g55b.add('statictext',undefined,"Suffix");
win.g55b.et1 = win.g55b.add('edittext',undefined,"");
win.g55b.et1.preferredSize=[250,20];
win.g55b.visible=false;
var numbers =[2,3,4,5,6,7,8,9,10];
win.g55c =win.g55.add('group');
win.g55c.spacing=10;
win.g55c.alignment="left";
win.g55c.st1 = win.g55c.add('statictext',undefined,"Sequence Number");
win.g55c.et1 = win.g55c.add('edittext',undefined,"");
win.g55c.et1.preferredSize=[50,20];
win.g55c.st2 =win.g55c.add('statictext',undefined,'Length');
win.g55c.dd1 =win.g55c.add('dropdownlist',undefined,numbers);
win.g55c.dd1.selection=2;
win.g55c.visible=false;
win.g55c.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
}
win.g55d =win.g55.add('group');
win.g55d.spacing=10;
win.g55d.st1 = win.g55d.add('statictext',undefined,"FileName");
win.g55d.et1 = win.g55d.add('edittext',undefined,"");
win.g55d.et1.preferredSize=[195,20];
win.g55d.et2 = win.g55d.add('edittext',undefined,"");
win.g55d.et2.preferredSize=[50,20];
win.g55d.st2 =win.g55d.add('statictext',undefined,'length');
win.g55d.dd1 =win.g55d.add('dropdownlist',undefined,numbers);
win.g55d.dd1.selection=2;
win.g55d.visible=false;
win.g55d.et2.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
}
win.g50.dd1.onChange = function(){
    switch(this.selection.index){
        case 0 : hideFields();checkSave();break;
        case 1 : hideFields();
        win.g55a.visible=true;
        break;
        case 2 : hideFields();
        win.g55b.visible=true;
        break;
        case 3 : hideFields();
        win.g55c.visible=true;
        break;
        case 4 : hideFields();
        win.g55d.visible=true;
        break;
        default : break;
        }
}
function hideFields(){
win.g55a.visible=false;
win.g55a.et1.text='';
win.g55b.et1.text='';
win.g55b.visible=false;
win.g55c.visible=false;
win.g55c.et1.text='1';
win.g55d.visible=false;
win.g55d.et1.text='';
win.g55d.et2.text='1';
}
win.g150 =win.p1.add('group');
win.g150.spacing=10;
win.g150.orientation = 'row';
win.g150.alignment="top";
win.g150.bu1 = win.g150.add('button',undefined,"Process");
win.g150.bu1.preferredSize=[200,30];
win.g150.bu2 = win.g150.add('button',undefined,"Cancel");
win.g150.bu2.preferredSize=[200,30];
win.g10a.cb1.onClick=function(){
    if(win.g10a.cb1.value){
        win.g11.bu1.enabled=false;
        win.g50.dd1.selection=4;
        }else{
            win.g11.bu1.enabled=true;
            }
}
function checkSave(){
    if(win.g10a.cb1.value){
        alert("Sorry this is not allowed as it could overwrite the document!\nPlease use another option");
        win.g50.dd1.selection=4;
        return;
        }
}
win.g150.bu1.onClick=function(){
    if(win.g11a.et1.text == ''){
        alert("No output folder has been selected!");
        return;
        }
    if(Number(win.g14.et1.text) <10) {
        alert("Please enter a realistic Resize number!");
        return;
        }
    if(Number(win.g14.et1a.text) <10) {
        alert("Please enter a realistic Resize number!");
        return;
        }
    if(win.g50.dd1.selection.index == 1 && win.g55a.et1.text == ''){
        alert("No Prefix Has Been Entered!");
        win.g55a.et1.active=true;
        return;
        }
    if(win.g50.dd1.selection.index == 2 && win.g55b.et1.text == ''){
        alert("No Suffix Has Been Entered!");
        win.g55b.et1.active=true;
        return;
        }
    if(win.g50.dd1.selection.index == 3 && win.g55c.et1.text == ''){
        alert("No Sequence Number Has Been Entered!");
        win.g55c.et1.active=true;
        return;
        }
    if(win.g50.dd1.selection.index == 4 && win.g55d.et1.text == ''){
        alert("No File Name Has Been Entered!");
        win.g55d.et1.active=true;
        return;
        }
    if(win.g50.dd1.selection.index == 4 && win.g55d.et2.text == ''){
        alert("No Sequence Number Has Been Entered!");
        win.g55d.et2.active=true;
        return;
        }
Prefs.folder = decodeURI(outputFolder);
Prefs.Width = Number(win.g14.et1.text);
Prefs.Height = Number(win.g14.et1a.text); 
Prefs.quality = parseInt(win.g14.dd1.selection.index);
Prefs.type= parseInt(win.g3.dd1.selection.index);
if($.os.match(/windows/gi)){
if(Templates.length > 0) {
Prefs.template = parseInt(win.g18.dd1.selection.index);
}
}
PrefsFile.open('w');
PrefsFile.write(Prefs.toSource());
PrefsFile.close();
    win.close(1);
    process();
}
win.center();
result = win.show();
function process(){
var folders =[];
if(win.g3.cb1.value){
var topLevel = Folder(app.document.presentationPath);	
folders = FindAllFolders(topLevel, folders);
folders.unshift(topLevel);
}
var Quality = parseInt(win.g14.dd1.selection.index);
var ResizeW = Number(win.g14.et1.text);
var ResizeH = Number(win.g14.et1a.text);
var sels =[];
Count = 0;
mask = win.g3.dd1.selection.text.toLowerCase();
if(win.g3.rb1.value) {
    sels = app.document.selections;
   processSels();
    }
if(!win.g3.rb1.value &&  !win.g3.cb1.value){
app.document.deselectAll();   
sels = app.document.getSelection(mask);
processSels();
}
if(!win.g3.rb1.value &&  win.g3.cb1.value){//use subfolders
mask = "*."+ win.g3.dd1.selection.text.toLowerCase();
for(var k in folders){
sels = folders[k].getFiles(mask);
processSels();
}
}
function processSels(){
for(var z  in sels){
var Thumb1 = new Thumbnail(sels[z]);
Name = decodeURI(Thumb1.spec.name).replace(/\.[^\.]+$/, '');
var Seq1 = zeroPad((Number(Count)+Number(win.g55c.et1.text)), (parseInt(win.g55c.dd1.selection.index)+2));
var Seq2 = zeroPad((Number(Count)+Number(win.g55d.et2.text)), (parseInt(win.g55d.dd1.selection.index)+2));
var Prefix = win.g55a.et1.text;
var Suffix = win.g55b.et1.text;
var NewName = win.g55d.et1.text;
app.synchronousMode = true; 
if(win.g12.cb1.value){
Thumb1.core.fullsize.fullsize; 
}else{
    Thumb1.core.preview.preview; 
    }
var bm = undefined;
if(win.g12.cb1.value){
bm = Thumb1.core.fullsize.fullsize; 
}else{
    bm = Thumb1.core.preview.preview; 
    }
bm = bm.rotate(Thumb1.rotation);
if(win.g14.cb1.value){
if(bm.width > bm.height){
var maxSize = Math.max(bm.height,bm.width);
var minSize =Math.min(ResizeW,maxSize);
if(minSize < maxSize) bm = bm.resize(minSize,BitmapData.bicubicSharper);
}else{
    var maxSize = Math.max(bm.height,bm.width);
    var minSize =Math.min(ResizeH,maxSize);
if(minSize < maxSize) bm = bm.resize(minSize,BitmapData.bicubicSharper);
    }
}        
var parts = Thumb1.name.match(/(.*)\.([^\.]+)/);  
switch(Number(win.g50.dd1.selection.index)){
    case 0 : saveFile =  Name; break;
    case 1 : saveFile =  Prefix + Name; break;
    case 2 : saveFile =  Name + Suffix; break;
    case 3 : saveFile =  Name + Seq1; break;
    case 4 : saveFile =  NewName + Seq2; break;
    default : break;
    }
if(win.g10a.cb1.value) outputFolder =app.document.presentationPath;
bm.exportTo(new File(outputFolder +"/"+ saveFile +".jpg"),(Quality+1));
Count++;
if($.os.match(/windows/gi)){
if(win.g12.cb2.value){//set resolution
var res = Number(win.g12.et1.text);
var t = new Thumbnail(new File(outputFolder +"/"+ saveFile +".jpg"));
var mdata = t.synchronousMetadata;
mdata.namespace = "http://ns.adobe.com/tiff/1.0/";
mdata.XResolution =res*1000 +"/1000";
mdata.YResolution =res*1000 +"/1000";
mdata.ResolutionUnit =2;
    }
if(win.g18.cb1.value){
var t = new Thumbnail(new File(outputFolder +"/"+ saveFile +".jpg"));
var mdata = t.synchronousMetadata;
mdata.applyMetadataTemplate(win.g18.dd1.selection.text, "replace"); 
}
}
            }
        }
}
    if(result == 1) alert("All done!");
    
function ReturnUniqueSortedList(ArrayName){
var unduped = new Object;
for (var i = 0; i < ArrayName.length; i++) {   
unduped[ArrayName[i]] = ArrayName[i];
}
var uniques = new Array;
for (var ki in unduped) {
   uniques.push(unduped[ki]);
   }
uniques.sort();
return uniques;
}
 function FindAllFolders( srcFolderStr, destArray) {
	var fileFolderArray = Folder( srcFolderStr ).getFiles();
	for ( var i = 0; i < fileFolderArray.length; i++ ) {
		var fileFoldObj = fileFolderArray[i];
		if ( fileFoldObj instanceof File ) {			
		} else {
         destArray.push( Folder(fileFoldObj) );
		FindAllFolders( fileFoldObj.toString(), destArray );
		}
	}
	return destArray;
}   
function zeroPad(n, s) { 
n = n.toString(); 
while (n.length < s) n = '0' + n; 
return n; 
}
}
}