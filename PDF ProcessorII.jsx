#target photoshop
app.bringToFront();

function main(){
var win = new Window( 'dialog', '' ); 
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
g.backgroundColor = myBrush;
win.orientation='stack';
win.p1= win.add('panel', undefined, undefined, {borderStyle:'black'}); 
win.g1 = win.p1.add('group');
win.g1.orientation = 'row';
win.title = win.g1.add('statictext',undefined,'PDF Processor II');
win.title.helpTip='Compliments of Paul Riggott';
win.title.alignment='fill';
var g = win.title.graphics;
g.font = ScriptUI.newFont('Georgia','BOLDITALIC',22);
win.g10 =win.p1.add('group');
win.g10.orientation = 'row';
win.g10.alignment='fill';
win.g10.spacing=4;
var openModes = ['CMYK Color','RGB Color','Grayscale', 'Lab Color'];
win.g10.st1 = win.g10.add('statictext',undefined,'Mode');
win.g10.st1.helpTip="Document Mode";
win.g10.dd1 = win.g10.add('dropdownlist',undefined,openModes);
win.g10.dd1.selection=1;
var BitOptions = [8,16]; 
win.g10.st2 = win.g10.add('statictext',undefined,'Bits');
win.g10.st2.helpTip="Bits/Channel";
win.g10.dd2 = win.g10.add('dropdownlist',undefined,BitOptions);
win.g10.dd2.selection=0;
win.g10.st3 = win.g10.add('statictext',undefined,'Res');
win.g10.st3.helpTip="Resolution";
win.g10.et1 = win.g10.add('edittext',undefined,'300');
win.g10.et1.preferredSize=[60,20];
win.g10.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
var Crops = ['Bounding Box','Media Box','Crop Box','Bleed Box','Trim Box','Art Box'];
win.g10.st4 = win.g10.add('statictext',undefined,'CropTo');
win.g10.dd3 = win.g10.add('dropdownlist',undefined,Crops);
win.g10.dd3.selection=0;
win.g15 =win.p1.add('group');
win.g15.orientation = 'row';
win.g15.alignment='fill';
win.g15.cb1 = win.g15.add('checkbox',undefined,'Use Width/Height');
win.g15.st1 = win.g15.add('statictext',undefined,'Width');
win.g15.et1 = win.g15.add('edittext');
win.g15.et1.preferredSize=[60,20];
win.g15.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g15.st2 = win.g15.add('statictext',undefined,'Height');
win.g15.et2 = win.g15.add('edittext');
win.g15.et2.preferredSize=[60,20];
win.g15.et2.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g15.et1.enabled=false;
win.g15.et2.enabled=false;
win.g15.cb1.onClick=function(){
    if(win.g15.cb1.value){
        win.g15.et1.enabled=true;
        win.g15.et2.enabled=true;
        }else{
            win.g15.et1.enabled=false;
            win.g15.et1.text='';
            win.g15.et2.enabled=false;
            win.g15.et2.text='';
            }
}
win.g20 =win.p1.add('group');
win.g20.orientation = 'row';
win.g20.alignment='fill';
win.g20.spacing=10;
var pageTypes = [ 'First page only','All pages','Range of pages'];
win.g20.st1 = win.g20.add('statictext',undefined,'Pages to process');
win.g20.dd1 = win.g20.add('dropdownlist',undefined,pageTypes);
win.g20.dd1.selection=0;
win.g20.st2 = win.g20.add('statictext',undefined,'From');
win.g20.et1 = win.g20.add('edittext',undefined,'1');
win.g20.et1.preferredSize=[60,20];
win.g20.st3 = win.g20.add('statictext',undefined,'To');
win.g20.et2 = win.g20.add('edittext');
win.g20.et2.preferredSize=[60,20];
win.g20.dd1.onChange=function(){
    if(this.selection.index == 2){
        win.g20.et1.enabled=true;
        win.g20.et2.enabled=true;
         win.g20.st2.visible=true;
         win.g20.et1.visible=true;
         win.g20.st3.visible=true;
         win.g20.et2.visible=true;
        }else{
            win.g20.et1.enabled=false;
            win.g20.et2.enabled=false;
            win.g20.st2.visible=false;
            win.g20.et1.visible=false;
            win.g20.st3.visible=false;
            win.g20.et2.visible=false;
            }
    };
win.g20.dd1.onChange();
win.g20.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g20.et2.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g25 =win.p1.add('group');
win.g25.orientation = 'row';
win.g25.alignment='fill';
win.g25.spacing=10;
win.g25.st1 = win.g25.add('statictext',undefined,'Please select');
win.g25.st1.preferredSize=[80,20];
var fileFolder = ['Single File','Folder','Folder and Sub-Folders'];
win.g25.dd1 = win.g25.add('dropdownlist',undefined,fileFolder);
win.g25.dd1.selection=0;
win.g30 =win.p1.add('group');
win.g30.orientation = 'row';
win.g30.alignment='fill';
win.g30.spacing=10;
win.g30.st1 = win.g30.add('statictext',undefined,'File/Folder');
win.g30.et1 = win.g30.add('edittext');
win.g30.st1.preferredSize=[80,20];
win.g30.et1.preferredSize=[250,20];
win.g30.et1.enabled=false;
win.g30.bu1 = win.g30.add('button',undefined,'Browse');
topLevelFolder='';
win.g30.bu1.onClick=function(){
  if(win.g25.dd1.selection.index == 0){
      topLevelFolder = File.openDialog('Please select PDF file.','PDF File:*.pdf'); 	
  }else{
       topLevelFolder = Folder.selectDialog('Please select the source folder');
      }
	if(topLevelFolder !=null){
		win.g30.et1.text =  decodeURI(topLevelFolder.fsName); 
		}
}
win.g25.dd1.onChange=function(){
    switch(this.selection.index){
        case 0 : if(topLevelFolder instanceof Folder){topLevelFolder=''; win.g30.et1.text='';}; break;
        case 1 : if(topLevelFolder instanceof File){topLevelFolder=''; win.g30.et1.text='';}; break;
        case 2 : if(topLevelFolder instanceof File){topLevelFolder=''; win.g30.et1.text='';}; break;
        default : break;
        }
    }
win.g35 =win.p1.add('group');
win.g35.orientation = 'row';
win.g35.alignment='fill';
win.g35.spacing=10;
win.g35.cb1 = win.g35.add('checkbox',undefined,'Save to original folder?');
win.g40 =win.p1.add('group');
win.g40.orientation = 'row';
win.g40.alignment='fill';
win.g40.spacing=10;
win.g40.st1 = win.g40.add('statictext',undefined,'Output folder');
win.g40.st1.preferredSize=[80,20];
win.g40.et1 = win.g40.add('edittext');
win.g40.et1.preferredSize=[250,20];
win.g40.et1.enabled=false;
win.g40.bu1 = win.g40.add('button',undefined,'Browse');
win.g35.cb1.onClick=function(){
    if(win.g35.cb1.value){
        win.g40.bu1.enabled=false;
        }else{
            win.g40.bu1.enabled=true;
            }
    }
win.g40.bu1.onClick=function(){
       outputFolder = Folder.selectDialog('Please select the output folder');
	if(outputFolder !=null){
		win.g40.et1.text =  decodeURI(outputFolder.fsName); 
		}
}
win.g45 =win.p1.add('group');
win.g45.orientation = 'row';
win.g45.alignment='fill';
win.g45.spacing=2;
win.g45.cb1 = win.g45.add('checkbox',undefined,'Resize to fit');
win.g45.cb1.preferredSize=[90,20];
win.g45.st1 = win.g45.add('statictext',undefined,'Width :');
win.g45.et1 = win.g45.add('edittext');
win.g45.et1.preferredSize=[50,20];
win.g45.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g45.st2 = win.g45.add('statictext',undefined,'px');
win.g45.st2.preferredSize=[20,20];
win.g45.st3 = win.g45.add('statictext',undefined,'Height :');
win.g45.et2 = win.g45.add('edittext');
win.g45.et2.preferredSize=[50,20];
win.g45.et2.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g45.st4 = win.g45.add('statictext',undefined,'px');
win.g45.st4.preferredSize=[20,20];
var beforeAfter = ["Before Action","After Action"];
win.g45.dd1 = win.g45.add('dropdownlist',undefined,beforeAfter);
win.g45.dd1.selection=0;
win.g45.cb1.onClick=function(){
    if(win.g45.cb1.value){
        win.g45.et1.enabled=true;
        win.g45.et2.enabled=true;
        win.g45.dd1.enabled=true;
        }else{
            win.g45.et1.enabled=false;
            win.g45.et2.enabled=false;
            win.g45.dd1.enabled=false;
            }
    }
win.g45.cb1.onClick();
win.g50 =win.p1.add('group');
win.g50.orientation = 'row';
win.g50.alignment='fill';
win.g50.spacing=10;
win.g50.cb1 = win.g50.add('checkbox',undefined,'Run action');
win.g50.dd1 = win.g50.add('dropdownlist');//actionSet
win.g50.dd2 = win.g50.add('dropdownlist');
var actionSets = getActionSets();
for (var i in actionSets) {
	win.g50.dd1.add ('item',actionSets[i].toString());      
}; 
win.g50.dd1.selection=0;
var actions = getActions(actionSets[0]);
for (var i in actions) {
	win.g50.dd2.add ('item',actions[i].toString());      
};
win.g50.dd2.selection=0;
win.g50.dd1.onChange = function() {
win.g50.dd2.removeAll();
actions = getActions(actionSets[this.selection.index]);
for (var i in actions) {
	win.g50.dd2.add ('item', actions[i]);      
    }
win.g50.dd2.selection=0;
};
win.g50.cb1.onClick=function(){
    if(win.g50.cb1.value){
        win.g50.dd1.enabled=true;
        win.g50.dd2.enabled=true;
       }else{
           win.g50.dd1.enabled=false;
           win.g50.dd2.enabled=false;
           }
    };
win.g50.cb1.onClick();
win.g100 =win.p1.add('group');
win.g100.orientation = 'row';
win.g100.alignment='fill';
win.g100.spacing=5;
win.g100.st1 = win.g100.add('statictext',undefined,'FileName Options');
var options = ['Document Name','New Name','Sequence No only'];
win.g100.dd1 = win.g100.add('dropdownlist',undefined,options);
win.g100.dd1.selection=0;
var numbers =[2,3,4,5];
win.g100.st2 = win.g100.add('statictext',undefined,'Seq No:');
win.g100.st2.helpTip='Start sequence number';
win.g100.et1 = win.g100.add('edittext',undefined,'1');
win.g100.et1.preferredSize=[50,20];
win.g100.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
}
win.g100.st3 =win.g100.add('statictext',undefined,'Length');
win.g100.st3.helpTip='Sequence number length';
win.g100.dd2 =win.g100.add('dropdownlist',undefined,numbers);
win.g100.dd2.selection=2;

win.g150 =win.p1.add('group');
win.g150.spacing=10;
win.g150.orientation = 'row';
win.g150.alignment='fill';
win.g150.st1 = win.g150.add('statictext',undefined,'New filename');
win.g150.st1.helpTip="Do not add an extension";
win.g150.et1 = win.g150.add('edittext',undefined,'');
win.g150.et1.preferredSize=[200,20];

win.g100.dd1.onChange=function(){
    if(this.selection.index == 1){
        win.g150.et1.enabled=true;
        }else{
            win.g150.et1.enabled=false;
            }
    }
win.g150.et1.enabled=false;
win.g160 =win.p1.add('group');
win.g160.orientation = 'row';
win.g160.alignment='left';
win.g160.cb1 = win.g160.add('checkbox',undefined,'Flatten document');
/////////////////////////**********************
win.g257 =win.p1.add('group');
win.g257.orientation = 'row';
win.g257.alignment='left';
win.g257.st1 = win.g257.add('statictext',undefined,'Save Options :-');
win.g257.st1.helpTip="Multiple save formats can be selected";
var z = win.g257.st1.graphics;
z.font = ScriptUI.newFont('Georgia','BOLDITALIC',18);
win.g260 =win.p1.add('group');
win.g260.spacing=1;
win.g260.orientation = 'row';
win.g260.alignment='left';
win.g260.cb1 = win.g260.add('checkbox',undefined,'TIF');
var tiffOptions=['LZW','ZIP','JPG','None'];
win.g260.dd1 = win.g260.add('dropdownlist',undefined,tiffOptions);
win.g260.dd1.selection=0;
win.g260.cb2 = win.g260.add('checkbox',undefined,'PSD');
win.g260.dd1.enabled=false;
win.g260.cb1.onClick = function(){
    if(win.g260.cb1.value){
        win.g260.dd1.enabled=true;
        }else{
            win.g260.dd1.enabled=false;
            }
}
win.g260.cb3 = win.g260.add('checkbox',undefined,'PNG');
win.g260.cb3.helpTip='Save For Web PNG 24bit';
win.g260.dd2 = win.g260.add('dropdownlist')
for(var a = 0;a<101;a++){
    win.g260.dd2.add('item',a);
    }
win.g260.dd2.selection=80;
win.g260.dd2.enabled=false;
win.g260.cb3.onClick = function(){
    if(win.g260.cb3.value){
        win.g260.dd2.enabled=true;
        }else{
            win.g260.dd2.enabled=false;
            }
}
var jpgQuality=[1,2,3,4,5,6,7,8,9,10,11,12];
win.g260.cb4 = win.g260.add('checkbox',undefined,'JPG');
win.g260.dd3 = win.g260.add('dropdownlist',undefined,jpgQuality);
win.g260.dd3.selection=7;

win.g260.dd3.enabled=false;
win.g260.cb4.onClick = function(){
    if(win.g260.cb4.value){
        win.g260.dd3.enabled=true;
        win.g270.cb1.value=false;
        win.g270.dd1.enabled=false;
        }else{
            win.g260.dd3.enabled=false;
            }
}
win.g260.cb5 = win.g260.add('checkbox',undefined,'PDF');

win.g270 =win.p1.add('group');
win.g270.spacing=10;
win.g270.orientation = 'row';
win.g270.alignment='left';
win.g270.cb1 = win.g270.add('checkbox',undefined,'Save For Web');
win.g270.dd1 = win.g270.add('dropdownlist');
for(var a = 1;a<101;a++){
    win.g270.dd1.add('item', a);
    }
win.g270.dd1.selection=79;
win.g270.dd1.enabled=false;
win.g270.cb1.onClick = function(){
    if(win.g270.cb1.value){
        win.g270.dd1.enabled=true;
        win.g260.cb4.value=false;
        win.g260.dd2.enabled=false;
        }else{
            win.g270.dd1.enabled=false;
            }
}
win.g270.cb2 = win.g270.add('checkbox',undefined,'Targa');
win.g270.cb3 = win.g270.add('checkbox',undefined,'Print Only');
win.g270.cb3.helpTip="Make sure your printer is set to Portrait orientaion!\nALL prints will be sent as portrait!"
win.g270.cb3.onClick = function(){
    if(win.g270.cb3.value){
        win.g40.bu1.enabled=false;
        win.g40.et1.text = '';
        }else{
            win.g40.bu1.enabled=true;
            }
    }
win.g2150 =win.p1.add('group');
win.g2150.spacing=10;
win.g2150.orientation = 'row';
win.g2150.alignment='top';
win.g2150.bu1 = win.g2150.add('button',undefined,'Process');
win.g2150.bu1.preferredSize=[210,30];
win.g2150.bu2 = win.g2150.add('button',undefined,'Cancel');
win.g2150.bu2.preferredSize=[210,30];

win.g2150.bu1.onClick=function(){ //process all pdfs
if(win.g15.cb1.value){
    if(win.g15.et1.text == ''){
        alert("No document width has been entered!");
        return;
        }
    if(win.g15.et2.text == ''){
        alert("No document height has been entered!");
        return;
        }
    }
if(win.g30.et1.text == ''){
    alert("No file/folder has been selected!");
    return;
    }
if(!win.g270.cb3.value){
if(win.g35.cb1.value == false && win.g40.et1.text == ''){
    alert("No output folder has been selected!");
    return;
    }
if(win.g100.dd1.selection.index == 1 && win.g150.et1.text == ''){
    alert("New document name has not been entered");
    return;
    }
}
if(win.g45.cb1.value == true && win.g45.et1.text == ''){
    alert("No resize width value has been entered!");
    return;
    }
if(win.g45.cb1.value == true && win.g45.et2.text == ''){
    alert("No resize height value has been entered!");
    return;
    }
if(win.g20.dd1.selection.index == 2){
if(win.g20.et1.text == ''){
    alert("No number has been has been entered in the From field");
    return;
    }
if(win.g20.et2.text == ''){
    alert("No number has been has been entered in the To field");
    return;
    }
if(Number(win.g20.et1.text) > Number(win.g20.et1.text)){
    alert("To field should be greater than the From field!");
    return;
    }
}
var saveFiles = 0;
if(win.g260.cb1.value) saveFiles++;
if(win.g260.cb2.value) saveFiles++;
if(win.g260.cb3.value) saveFiles++;
if(win.g260.cb4.value) saveFiles++;
if(win.g260.cb5.value) saveFiles++;
if(win.g270.cb1.value) saveFiles++;
if(win.g270.cb2.value) saveFiles++;
if(win.g270.cb3.value) saveFiles++;
if(saveFiles == 0){
    alert("No save format has been selected!");
    return;
    }
win.close(0);
var folders =[];
app.displayDialogs = DialogModes.NO;
var strtRulerUnits = app.preferences.rulerUnits;   			  			 
app.preferences.rulerUnits = Units.PIXELS;
if(win.g25.dd1.selection.index == 0){
    processPDF(topLevelFolder);//single file
}
if(win.g25.dd1.selection.index == 1){//folder of pdfs
    folders[0] = Folder(topLevelFolder);
    var fileList = folders[0].getFiles("*.pdf");
    for( var f in fileList){ processPDF(fileList[f]);}
}
if(win.g25.dd1.selection.index == 2){//folder and sub folders of pdfs
folders = FindAllFolders(topLevelFolder, folders);
folders.unshift(topLevelFolder);
for(var z in folders){
    var fileList = folders[z].getFiles("*.pdf");
    for( var k in fileList){ processPDF(fileList[k]);}
    }
}
app.preferences.rulerUnits = strtRulerUnits; 
function processPDF(pdfFile){
var noOfDocs = app.documents.length;
switch(win.g20.dd1.selection.index){
    case 0 : pageStart = 1; pageEnd = 2; break; //one page only
    case 1 : pageStart = 1; pageEnd = 9999; break; //all pages
    case 2 : pageStart = Number(win.g20.et1.text) ; pageEnd = (Number(win.g20.et2.text) + 1) ; break; //range of pages
    default : break;
    }
fileCount = (Number(win.g100.et1.text) -1);
if(win.g35.cb1.value) outputFolder = pdfFile.path;
Name='';
switch(win.g100.dd1.selection.index){
   case 0 : Name = decodeURI(pdfFile.name.replace(/\.[^\.]+$/, '')) + "#"; break;
   case 1 : Name = win.g150.et1.text.toString(); break;
   case 3 : Name = ''; break;
    }
var seqLength = Number(win.g100.dd2.selection.text);
for (var a = pageStart; a < pageEnd; a++){
var res = Number(win.g10.et1.text);
var modes = ['ECMY','RGBC','Grys','LbCl'];
var mode = modes[win.g10.dd1.selection.index];
var bits =[8,16];
var BitDepth = bits[win.g10.dd2.selection.index];
var cropTo = ['boundingBox','mediaBox','cropBox','bleedBox','trimBox','artBox'];
var cropto = cropTo[win.g10.dd3.selection.index];
if(!win.g15.cb1.value){
    rasterizePDF( a,res,mode,BitDepth,cropto,pdfFile);
    }else{
var W = Number(win.g15.et1.text);
var H = Number(win.g15.et2.text);
        rasterizePDF( a,res,mode,BitDepth,cropto,pdfFile,W,H);
        }
if(app.documents.length == noOfDocs) return; //no document opened
fileCount++;
if(win.g160.cb1.value) app.activeDocument.flatten();
var saveFile = outputFolder + "/" + Name + zeroPad(fileCount,seqLength).toString();
if(win.g45.cb1.value == true && win.g45.dd1.selection.index == 0){
    FitImage( Number(win.g45.et1.text), Number(win.g45.et2.text) );  
    }
if(win.g50.cb1.value){
    doAction(win.g50.dd2.selection.text.toString(), win.g50.dd1.selection.text.toString());
    }
if(win.g45.cb1.value == true && win.g45.dd1.selection.index == 1){
    FitImage( Number(win.g45.et1.text), Number(win.g45.et2.text) );  
    }
//Save files.....
if(win.g260.cb1.value){//tif
tifsaveFile = File(saveFile + ".tif");
if(tifsaveFile.exists){
    tifsaveFile = File(tifsaveFile.toString().replace(/\.tif$/,'') + "_" + time() + ".tif");
    }
    SaveTIFF(saveFile,win.g260.dd1.selection.index);
    }
if(win.g260.cb2.value) {//psd
    psdsaveFile = File(saveFile + ".psd");
if(psdsaveFile.exists){
    psdsaveFile = File(psdsaveFile.toString().replace(/\.psd$/,'') + "_" + time() + ".psd");
    }
    SavePSD(psdsaveFile);
    }
if(win.g260.cb3.value) {//png
    pngsaveFile = File(saveFile + ".png");
if(pngsaveFile.exists){
    pngsaveFile = File(pngsaveFile.toString().replace(/\.png$/,'') + "_" + time() + ".psd");
    }
    sfwPNG24(pngsaveFile,(win.g260.dd2.selection.index + 1));
    }
if(win.g260.cb4.value) {//jpg
    jpgsaveFile = File(saveFile + ".jpg");
if(jpgsaveFile.exists){
    jpgsaveFile = File(jpgsaveFile.toString().replace(/\.jpg$/,'') + "_" + time() + ".jpg");
    }
    SaveJPEG(jpgsaveFile,(win.g260.dd3.selection.index + 1));
    }
if(win.g260.cb5.value) {//pdf
    pdfsaveFile = File(saveFile + ".pdf");
if(pdfsaveFile.exists){
    pdfsaveFile = File(pdfsaveFile.toString().replace(/\.pdf$/,'') + "_" + time() + ".pdf");
    }
    SavePDF(pdfsaveFile);
    }
if(win.g270.cb1.value) {//sfw jpg
    sfwsaveFile = File(saveFile + ".jpg");
if(sfwsaveFile.exists){
    sfwsaveFile = File(sfwsaveFile.toString().replace(/\.jpg$/,'') + "_" + time() + ".jpg");
    }
    SaveForWeb(sfwsaveFile,(win.g270.dd1.selection.index + 1));
    }
if(win.g270.cb2.value) {//Targa
    tgasaveFile = File(saveFile + ".");
if(tgasaveFile.exists){
    tgasaveFile = File(tgasaveFile.toString().replace(/\.tga$/,'') + "_" + time() + ".tga");
    }
    saveTarga(tgasaveFile);
    }
if(win.g270.cb3.value) {//Print Only
    var doc = app.activeDocument; 
    if (doc.width > doc.height) doc.rotateCanvas(90);
    doc.printSettings.flip = false;
    doc.printSettings.setPagePosition(DocPositionStyle.SIZETOFIT);
    doc.printSettings.negative = false;
    doc.printOneCopy();
    }
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }//end from to
    }//end processPDF
}//end process
win.center();
win.show();
};

/****************************************** F U N C T I O N S ********************************************/

function SaveTIFF(saveFile,Comp){
tiffSaveOptions = new TiffSaveOptions(); 
tiffSaveOptions.embedColorProfile = true;
tiffSaveOptions.transparency=true;
tiffSaveOptions.interleaveChannels=true;
tiffSaveOptions.alphaChannels = false; 
switch (Number(Comp)){
    case 0 : tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW; break;
    case 1 : tiffSaveOptions.imageCompression = TIFFEncoding.TIFFZIP; break;
    case 2 : tiffSaveOptions.imageCompression = TIFFEncoding.JPEG; break;
    case 3 : tiffSaveOptions.imageCompression = TIFFEncoding.NONE; break;
    default : break;
    }
activeDocument.saveAs(File(saveFile+".tif"), tiffSaveOptions, true, Extension.LOWERCASE); 
};
function saveTarga(saveFile){
targaSaveOptions = new TargaSaveOptions();
targaSaveOptions.alphaChannels = true;
targaSaveOptions.resolution = TargaBitsPerPixels.THIRTYTWO;//required if alpha channel is to be saved
activeDocument.saveAs(saveFile, targaSaveOptions, true, Extension.LOWERCASE);
};
function SavePSD(saveFile){ 
psdSaveOptions = new PhotoshopSaveOptions(); 
psdSaveOptions.embedColorProfile = true; 
psdSaveOptions.alphaChannels = true;  
psdSaveOptions.layers = true; 
activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE); 
};
function SavePDF(saveFile){ 
pdfSaveOptions = new PDFSaveOptions(); 
activeDocument.saveAs(saveFile, pdfSaveOptions, true, Extension.LOWERCASE); 
};
function SaveJPEG(saveFile,Quality){
var doc = activeDocument;
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;  
jpgSaveOptions = new JPEGSaveOptions()
jpgSaveOptions.embedColorProfile = true
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE
jpgSaveOptions.matte = MatteType.NONE
jpgSaveOptions.quality = Quality; 
activeDocument.saveAs(saveFile, jpgSaveOptions, true,Extension.LOWERCASE)
};
function SaveForWeb(saveFile,Quality) {
var doc = activeDocument;
var tmpName = File(File(saveFile).path + "/SFW_TEMP.jpg");
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
var sfwOptions = new ExportOptionsSaveForWeb(); 
   sfwOptions.format = SaveDocumentType.JPEG; 
   sfwOptions.includeProfile = false; 
   sfwOptions.interlaced = 0; 
   sfwOptions.optimized = true; 
   sfwOptions.quality = Quality; 
activeDocument.exportDocument(tmpName, ExportType.SAVEFORWEB, sfwOptions);
tmpName.rename(decodeURI(File(saveFile).name));
};
function sfwPNG24(saveFile,Quality){
var doc = activeDocument;
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
var pngOpts = new ExportOptionsSaveForWeb; 
pngOpts.format = SaveDocumentType.PNG;
pngOpts.PNG8 = false; 
pngOpts.transparency = true; 
pngOpts.interlaced = false; 
pngOpts.quality = Quality;
activeDocument.exportDocument(new File(saveFile),ExportType.SAVEFORWEB,pngOpts); 
};
function getActionSets() { 
  var i = 1; 
  var sets = [];  
  while (true) { 
    var ref = new ActionReference(); 
    ref.putIndex(charIDToTypeID('ASet'), i); 
    var desc; 
    var lvl = $.level; 
    $.level = 0; 
    try { 
      desc = executeActionGet(ref); 
    } catch (e) { 
      break;
    } finally { 
      $.level = lvl; 
    } 
    if (desc.hasKey(charIDToTypeID('Nm  '))) { 
      var set = {}; 
      set.index = i; 
      set.name = desc.getString(charIDToTypeID('Nm  ')); 
      set.toString = function() { return this.name; }; 
      set.count = desc.getInteger(charIDToTypeID('NmbC')); 
      set.actions = []; 
      for (var j = 1; j <= set.count; j++) { 
        var ref = new ActionReference(); 
        ref.putIndex(charIDToTypeID('Actn'), j); 
        ref.putIndex(charIDToTypeID('ASet'), set.index); 
        var adesc = executeActionGet(ref); 
        var actName = adesc.getString(charIDToTypeID('Nm  ')); 
        set.actions.push(actName); 
      } 
      sets.push(set); 
    } 
    i++; 
  } 
  return sets; 
}; 
function getActions(aset) {
  var i = 1;
  var names = [];
  if (!aset) {
    throw 'Action set must be specified';
  }  
  while (true) {
    var ref = new ActionReference();
    ref.putIndex(charIDToTypeID('ASet'), i);
    var desc;
    try {
      desc = executeActionGet(ref);
    } catch (e) {
      break; 
    }
    if (desc.hasKey(charIDToTypeID('Nm  '))) {
      var name = desc.getString(charIDToTypeID('Nm  '));
      if (name == aset) {
        var count = desc.getInteger(charIDToTypeID('NmbC'));
        var names = [];
        for (var j = 1; j <= count; j++) {
          var ref = new ActionReference();
          ref.putIndex(charIDToTypeID('Actn'), j);
          ref.putIndex(charIDToTypeID('ASet'), i);
          var adesc = executeActionGet(ref);
          var actName = adesc.getString(charIDToTypeID('Nm  '));
          names.push(actName);
        }
        break;
      }
    }
    i++;
  }
  return names;
};
function FitImage( inWidth, inHeight ) {
	var desc = new ActionDescriptor();
	var unitPixels = charIDToTypeID( '#Pxl' );
	desc.putUnitDouble( charIDToTypeID( 'Wdth' ), unitPixels, inWidth );
	desc.putUnitDouble( charIDToTypeID( 'Hght' ), unitPixels, inHeight );
	var runtimeEventID = stringIDToTypeID( '3caa3434-cb67-11d1-bc43-0060b0a13dc4' );	
	executeAction( runtimeEventID, desc, DialogModes.NO );
};
function rasterizePDF( pageNumber,res,mode,BitDepth,cropto,pdfFile,Width,Height){
    var desc = new ActionDescriptor(); 
        var optionsDesc = new ActionDescriptor(); 
        optionsDesc.putString( charIDToTypeID( 'Nm  ' ), 'rasterized page' ); 
        optionsDesc.putEnumerated( charIDToTypeID( 'Crop' ), stringIDToTypeID( 'cropTo' ), stringIDToTypeID( cropto ) ); 
        optionsDesc.putUnitDouble( charIDToTypeID( 'Rslt' ), charIDToTypeID( '#Rsl' ), res); 
        optionsDesc.putEnumerated( charIDToTypeID( 'Md  ' ), charIDToTypeID( 'ClrS' ), charIDToTypeID( mode ) );
        optionsDesc.putInteger( charIDToTypeID( 'Dpth' ), BitDepth ); 
        optionsDesc.putBoolean( charIDToTypeID( 'AntA' ), true ); 
        if(Width != undefined) optionsDesc.putUnitDouble( charIDToTypeID('Wdth'), charIDToTypeID('#Pxl'), Width );
        if(Height != undefined)optionsDesc.putUnitDouble( charIDToTypeID('Hght'), charIDToTypeID('#Pxl'), Height );
        optionsDesc.putBoolean( stringIDToTypeID( 'suppressWarnings' ), false ); 
        optionsDesc.putEnumerated( charIDToTypeID( 'fsel' ), stringIDToTypeID( 'pdfSelection' ), stringIDToTypeID( 'page'  )); 
        optionsDesc.putInteger( charIDToTypeID( 'PgNm' ), pageNumber ); 
    desc.putObject( charIDToTypeID( 'As  ' ), charIDToTypeID( 'PDFG' ), optionsDesc ); 
    desc.putPath( charIDToTypeID( 'null' ), File(pdfFile) ); 
executeAction( charIDToTypeID( 'Opn ' ), desc, DialogModes.NO ); 
}; 
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
};
function zeroPad(n, s) { 
   n = n.toString(); 
   while (n.length < s)  n = '0' + n; 
   return n; 
};
function time(){
var date = new Date();
	var d  = date.getDate();
	var day = (d < 10) ? '0' + d : d;
	var m = date.getMonth() + 1;
	var month = (m < 10) ? '0' + m : m;
	var yy = date.getYear();
	var year = (yy < 1000) ? yy + 1900 : yy;
	var digital = new Date();
	var hours = digital.getHours();
	var minutes = digital.getMinutes();
	var seconds = digital.getSeconds();
	var amOrPm = "AM";
	if (hours > 11) amOrPm = "PM";
	if (hours > 12) hours = hours - 12;
	if (hours == 0) hours = 12;
	if (minutes <= 9) minutes = "0" + minutes;
	if (seconds <= 9) seconds = "0" + seconds;
	todaysDate = "-" + hours + "_" + minutes + "_" + seconds + amOrPm;
	return todaysDate.toString();
};
if (app.version.match(/\d+/) <10){
    alert('Sorry but this script needs CS3 or better');
    }else{
main();
}