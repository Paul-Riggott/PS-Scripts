#target photoshop
app.bringToFront();
function main(){
var Prefs ={};
try{
  var desc1 = app.getCustomOptions('30082bf0-700a-11df-be2b-0800200c9a66');
  Prefs = eval(desc1.getString(0));
    }catch(e){}
var win = new Window( 'dialog', 'PP' ); 
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
g.backgroundColor = myBrush;
win.orientation='stack';
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.g1 = win.p1.add('group');
win.g1.orientation = "row";
win.title = win.g1.add('statictext',undefined,'Picture Processor');
win.title.helpTip="Compliments of Paul Riggott";
win.title.alignment="fill";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
win.g5 =win.p1.add('group');
win.g5.orientation = "row";
win.g5.alignment='fill';
win.g5.spacing=10;
win.g5.rb1 = win.g5.add('radiobutton',undefined,'Use Folder');
win.g5.rb3 = win.g5.add('radiobutton',undefined,'Use Bridge Files');
win.g5.cb1 = win.g5.add('checkbox',undefined,'Save files to existing folder');
win.g5.cb1.helpTip="Files will be overwritten if they exist!";
win.g5.rb1.value=true;
win.g10 =win.p1.add('group');
win.g10.orientation = "row";
win.g10.alignment='fill';
win.g10.cb1 = win.g10.add('checkbox',undefined,'Process Sub Folders');
win.g10.cb2 = win.g10.add('checkbox',undefined,'Preserve Sub Folder Structure');
win.g10.cb2.helpTip="Only folders that contain files will be created.";
win.g10.cb2.enabled=false;
win.g10.cb1.onClick= function(){
    if(win.g10.cb1.value){
        win.g10.cb2.value=false;
        if(!win.g5.cb1.value) win.g10.cb2.enabled=true;
        }else{
            win.g10.cb2.value=false;
            win.g10.cb2.enabled=false;
            }
}

var FileExtensions = "ALL FILES,DNG,PSD,PDD,JPEG,JPG,JPE,GIF,BMP,RLE,DIB,TIF,CRW,NEF,RAF,ORF,CIN,DPX,EPS,PS,FLM,PSB,EXR,PCX,PDP," +
"PCD,RAW,PICT,PCT,PIC,PXR,PNG,TGA,VDA,ICB,VST,TIF,TIFF,WBM,DNG,SCT,PBM,CRW,CR2,DC2,DCR,NEF,MOS,MRW,X3F";
FileExtensions= FileExtensions.toUpperCase();
FileExtensions = FileExtensions.split(",");
FileExtensions= ReturnUniqueSortedList(FileExtensions);
win.g12 =win.p1.add('group');
win.g12.orientation = 'row';
win.g12.alignment='fill';
win.g12.spacing=10;
win.g12.st1 = win.g12.add('statictext',undefined,'Source Folder :-');
win.g12.st1.preferredSize=[160,20];
win.g12.st2 = win.g12.add('statictext',undefined,'File Type');
win.g12.dd1 = win.g12.add('dropdownlist',undefined,FileExtensions);
win.g12.dd1.selection=0;
if(Prefs.FileExts  != undefined){
    win.g12.dd1.selection = Number(Prefs.FileExts);
    }
win.g15 =win.p1.add('group');
win.g15.spacing=10;
win.g15.orientation = 'row';
win.g15.alignment="left";
win.g15.et1 = win.g15.add('edittext',undefined,'');
win.g15.et1.preferredSize=[300,20];
win.g15.et1.enabled=false;
win.g15.bu1 = win.g15.add('button',undefined,'Browse');
win.g15.bu1.helpTip="Select source folder";
win.g15.bu1.onClick = function() {
    try{
        if(Prefs.folder2 != undefined){
        var Folder2 = Folder(Prefs.folder2);
        topLevelFolder = Folder(Prefs.folder2);
        }else{
            var Folder2 ='';
            }
        }catch(e){}
  topLevelFolder = Folder.selectDialog("Please select the source folder",Folder2);	
	if(topLevelFolder !=null){
		win.g15.et1.text =  decodeURI(topLevelFolder.fsName); 
        Prefs.folder2 = decodeURI(topLevelFolder.fsName);
		}
}
if(Prefs.folder2 != undefined){
win.g15.et1.text = Prefs.folder2;
topLevelFolder = Folder(Prefs.folder2);
}
  
win.g5.rb3.onClick = function(){
    win.g5.rb1.onClick();
    }
win.g5.rb1.onClick = function(){
    if(win.g5.rb1.value){
        win.g10.cb1.value=false;
        win.g10.cb1.enabled=true;
        win.g10.cb2.value=false;
        win.g10.cb2.enabled=false;
        win.g15.et1.enabled=false;
        win.g15.bu1.enabled=true;
        win.g12.dd1.enabled=true;
        }else{
        win.g10.cb1.value=false;
        win.g10.cb1.enabled=false;
        win.g10.cb2.value=false;
        win.g10.cb2.enabled=false;
        win.g15.bu1.enabled=false;
        win.g12.dd1.enabled=false;
            }
}

win.g20 =win.p1.add('group');
win.g20.st1 = win.g20.add('statictext',undefined,'Output / Top Level Folder :-');
win.g25 =win.p1.add('group');
win.g25.spacing=10;
win.g25.orientation = 'row';
win.g25.alignment="left";
win.g25.et1 = win.g25.add('edittext',undefined,'');
win.g25.et1.preferredSize=[300,20];
win.g25.et1.enabled=false;
win.g25.bu1 = win.g25.add('button',undefined,'Browse');
win.g25.bu1.helpTip="Select output folder";
win.g25.bu1.onClick = function() {
    try{
        if(Prefs.folder != undefined){
        var Folder1 = Folder(Prefs.folder);
        outputFolder = Folder(Prefs.folder);
        }else{
            var Folder1 ='';
            }
        }catch(e){}
  outputFolder = Folder.selectDialog("Please select the output folder",Folder1);	
	if(outputFolder !=null){
		win.g25.et1.text =  decodeURI(outputFolder.fsName); 
        Prefs.folder = decodeURI(outputFolder.fsName);
		}
}
win.g5.cb1.onClick=function(){
    if(win.g5.cb1.value){
         win.g10.cb2.value=false;
          win.g10.cb2.enabled=false;
          win.g25.bu1.enabled=false;
        }else{
            win.g25.bu1.enabled=true;
            win.g10.cb1.onClick();
            }
}
try{
if(Prefs.folder != undefined){
win.g25.et1.text = Prefs.folder;
outputFolder = Folder(Prefs.folder);
}
    }catch(e){}
win.g27 =win.p1.add('group');
win.g27.spacing=10;
win.g27.orientation = 'row';
win.g27.alignment="left";
win.g27.cb1 = win.g27.add('checkbox',undefined,'Flatten');
win.g27.cb1.helpTip="Flatten document";
win.g27.cb2 = win.g27.add('checkbox',undefined,'Conv. to 8bit');
win.g27.cb2.helpTip="Convert to 8bit document";
win.g27.cb3 = win.g27.add('checkbox',undefined,'Rem. Paths');
win.g27.cb3.helpTip="Remove all paths";
win.g27.cb4 = win.g27.add('checkbox',undefined,'Rem. Alpha Channels');
win.g27.cb4.helpTip="Remove all alpha channels";
win.g27.cb1.value=true;
if(Prefs.Flatten  != undefined)  win.g27.cb1.value = Prefs.Flatten;
if(Prefs.EightBit  != undefined)  win.g27.cb2.value = Prefs.EightBit;
if(Prefs.Paths  != undefined) win.g27.cb3.value = Prefs.Paths;
if(Prefs.Channels  != undefined) win.g27.cb4.value = Prefs.Channels;
win.g28 =win.p1.add('group');
win.g28.spacing=5;
win.g28.orientation = 'row';
win.g28.alignment="left";
win.g28.cb1 = win.g28.add('checkbox',undefined,'Sort');
win.g28.cb2 = win.g28.add('checkbox',undefined,'AlphaNumeric Sort');
win.g28.cb3 = win.g28.add('checkbox',undefined,'Reverse Order');
if(Prefs.sort  != undefined)  win.g28.cb1.value = Prefs.sort;
if(Prefs.sortAlpha != undefined) win.g28.cb2.value = Prefs.sortAlpha;
if(Prefs.reverse != undefined) win.g28.cb3.value = Prefs.reverse;

win.g29 =win.p1.add('group');
win.g29.spacing=0;
win.g29.orientation = 'row';
win.g29.alignment="left";
win.g29.cb0 = win.g29.add('checkbox',undefined,'Resize Documents');
win.g29.bu1 = win.g29.add('button',undefined,'Refine Resize Options');
win.g29.bu1.visible=false;
win.pnl1a = win.add('panel', undefined, undefined, {borderStyle:"black"}); 
win.pnl1a.orientation='column';
win.pnl1a.alignment='fill';
win.pnl1a.st1 = win.pnl1a.add('statictext',undefined,'Resize Documents');
win.pnl1a.st1.graphics.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
///***************
win.pnl1a.g28 =  win.pnl1a.add('group');
win.pnl1a.g28.orientation = 'row';
win.pnl1a.g28.alignment="left";
win.pnl1a.g28.cb4 = win.pnl1a.g28.add('checkbox',undefined,'Resize documents after actions have been applied');
win.pnl1a.sGrp0 =win.pnl1a.add('group');
win.pnl1a.sGrp0.p1= win.pnl1a.sGrp0.add('panel', undefined, undefined, {borderStyle:"black"}); 
win.pnl1a.sGrp0.p1.preferredSize=[400,2];

win.pnl1a.g29 =  win.pnl1a.add('group');
win.pnl1a.g29.orientation = 'row';
win.pnl1a.g29.alignment="left";
win.pnl1a.g29.cb1 = win.pnl1a.g29.add('checkbox',undefined,'Fit Image');
win.pnl1a.g29.cb1.helpTip="Fit Image (Size is in Pixels)";
win.pnl1a.g29.cb2 = win.pnl1a.g29.add('checkbox',undefined,'Don\'t reduce');
win.pnl1a.g29.cb2.helpTip="Downsize only if the original is larger";
win.pnl1a.g29.cb3 = win.pnl1a.g29.add('checkbox',undefined,'Don\'t enlarge');
win.pnl1a.g29.cb3.helpTip="Do not make larger";
win.pnl1a.g29a =  win.pnl1a.add('group');
win.pnl1a.g29a.orientation = 'row';
win.pnl1a.g29a.alignment="left";
win.pnl1a.g29.st1 = win.pnl1a.g29a.add('statictext',undefined,'Width : (pixels)');
win.pnl1a.g29.st1.helpTip="Pixels";
win.pnl1a.g29.et1 = win.pnl1a.g29a.add('edittext',undefined,'')
win.pnl1a.g29.et1.preferredSize=[50,20];
win.pnl1a.g29.st3 = win.pnl1a.g29a.add('statictext',undefined,'Height : (pixels)');
win.pnl1a.g29.st3.helpTip="Pixels";
win.pnl1a.g29.et2 = win.pnl1a.g29a.add('edittext',undefined,'');
win.pnl1a.g29.et2.preferredSize=[50,20];
win.pnl1a.g29.et1.enabled=false; 
win.pnl1a.g29.et2.enabled=false;
win.pnl1a.g29.cb1.onClick = function(){
    if(win.pnl1a.g29.cb1.value){
        win.pnl1a.g29.et1.enabled=true;
        win.pnl1a.g29.cb2.enabled=true;
        win.pnl1a.g29.cb3.enabled=true;
        win.pnl1a.g29.et1.active=true;
        win.pnl1a.g29.et2.enabled=true;    
        win.pnl1a.g29a.cb0.value=false;
        win.pnl1a.g29a.cb0.onClick();
        }else{
            win.pnl1a.g29.et1.enabled=false;
            win.pnl1a.g29.et2.enabled=false;
            win.pnl1a.g29.cb2.enabled=false;
            win.pnl1a.g29.cb2.value=false;
            win.pnl1a.g29.cb3.enabled=false;
            win.pnl1a.g29.cb3.value=false;
            }
}
win.pnl1a.g29.cb1.onClick();
win.pnl1a.g29.cb2.onClick = function(){
    if(win.pnl1a.g29.cb2.value) win.pnl1a.g29.cb3.value=false;
}
win.pnl1a.g29.cb3.onClick = function(){
    if(win.pnl1a.g29.cb3.value) win.pnl1a.g29.cb2.value=false;
}
win.pnl1a.g29.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.pnl1a.g29.et2.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};

try{
win.pnl1a.sGrp1 =win.pnl1a.add('group');
win.pnl1a.sGrp1.p1= win.pnl1a.sGrp1.add('panel', undefined, undefined, {borderStyle:"black"}); 
win.pnl1a.sGrp1.p1.preferredSize=[400,2];
resizeMethod = ["Bicubic", "BicubicSharper","BicubicSmoother", "Bilinear", "NearestNeighbor"];
resizeUnits = ["pixels", "percent", "inches","cm", "mm", "points", "picas"];
win.pnl1a.g29a =win.pnl1a.add('group');
win.pnl1a.g29a.spacing=0;
win.pnl1a.g29a.orientation = 'row';
win.pnl1a.g29a.alignment="left";
win.pnl1a.g29a.cb0 = win.pnl1a.g29a.add('checkbox',undefined,'Custom Fit Image');
win.pnl1a.g29a.cb1 = win.pnl1a.g29a.add('checkbox',undefined,'Constrain Proportions');
win.pnl1a.g29a.cb1.value=true;
win.pnl1a.g29a.cb1.helpTip="If unticked this could distort the image!";
win.pnl1a.g29b =win.pnl1a.add('group');
win.pnl1a.g29b.spacing=0;
win.pnl1a.g29b.orientation = 'row';
win.pnl1a.g29b.alignment="left";
win.pnl1a.g29b.st1 = win.pnl1a.g29b.add('statictext',undefined,'Width');
win.pnl1a.g29b.et1 = win.pnl1a.g29b.add('edittext',undefined,'');
win.pnl1a.g29b.et1.preferredSize=[40,20];
win.pnl1a.g29b.st2 = win.pnl1a.g29b.add('statictext',undefined,'Height');
win.pnl1a.g29b.et2 = win.pnl1a.g29b.add('edittext',undefined,'');
win.pnl1a.g29b.et2.preferredSize=[40,20];
win.pnl1a.g29b.dd1 = win.pnl1a.g29b.add('dropdownlist',undefined,resizeUnits);
win.pnl1a.g29b.dd1.selection=0;
win.pnl1a.g29b.dd2 = win.pnl1a.g29b.add('dropdownlist',undefined,resizeMethod);
win.pnl1a.g29b.dd2.selection=0;
win.pnl1a.g29c =win.pnl1a.add('group');
win.pnl1a.g29c.spacing=0;
win.pnl1a.g29c.orientation = 'row';
win.pnl1a.g29c.alignment="left";
win.pnl1a.g29c.cb0 = win.pnl1a.g29c.add('checkbox',undefined,'Use documents resolution');
win.pnl1a.g29c.cb0.value=true;
win.pnl1a.g29c.st1 = win.pnl1a.g29c.add('statictext',undefined,'Enter resolution');
win.pnl1a.g29c.et1 = win.pnl1a.g29c.add('edittext');
win.pnl1a.g29c.et1.preferredSize=[40,20];

win.pnl1a.g29c.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.pnl1a.g29c.cb0.onClick=function(){
    if(win.pnl1a.g29c.cb0.value){
        win.pnl1a.g29c.et1.visible=false;
        win.pnl1a.g29c.st1.visible=false;
        }else{
            win.pnl1a.g29c.et1.visible=true;
            win.pnl1a.g29c.st1.visible=true;
            }
    }
win.pnl1a.g29c.cb0.onClick();
win.pnl1a.g29a.cb0.onClick = function(){
    if(win.pnl1a.g29a.cb0.value){
        win.pnl1a.g29a.cb1.enabled=true;
        win.pnl1a.g29b.et1.enabled=true;
        win.pnl1a.g29b.et2.enabled=true;
        win.pnl1a.g29b.dd1.enabled=true;
        win.pnl1a.g29b.dd2.enabled=true;
        win.pnl1a.g29c.cb0.enabled=true;
        win.pnl1a.g29.cb1.value=false;
        win.pnl1a.g29.cb1.onClick();
        }else{
            win.pnl1a.g29a.cb1.enabled=false;
            win.pnl1a.g29b.et1.enabled=false;
            win.pnl1a.g29b.et2.enabled=false;
            win.pnl1a.g29b.dd1.enabled=false;
            win.pnl1a.g29b.dd2.enabled=false;
            win.pnl1a.g29c.cb0.enabled=false;
            win.pnl1a.g29c.cb0.value=true;
            win.pnl1a.g29c.cb0.onClick();
            win.pnl1a.g29a.cb1.value=true;
            }
}
win.pnl1a.g29b.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.pnl1a.g29b.et2.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.pnl1a.g29a.cb0.onClick();
}catch(e){alert(e+" - "+e.line);}
win.pnl1a.sGrp3 =win.pnl1a.add('group');
win.pnl1a.sGrp3.p1= win.pnl1a.sGrp3.add('panel', undefined, undefined, {borderStyle:"black"}); 
win.pnl1a.sGrp3.p1.preferredSize=[400,2];
win.grp1100= win.pnl1a.add('group');
win.grp1100.orientation='row';
win.grp1100.bu1 = win.pnl1a.add('button',undefined,'Done'); 
win.grp1100.bu1.alignment='fill';
win.pnl1a.visible=false;


win.grp1100.bu1.onClick=function(){
  if(!win.pnl1a.g29a.cb0.value && !win.pnl1a.g29.cb1.value){
      alert("You need to select Fit Image or Custom Fit Image!");
      return;
      }
  if(win.pnl1a.g29.cb1.value){//fit image
  if(win.pnl1a.g29.et1.text == ''){
      alert("No width value has been entered");
      return;
      }
  if(win.pnl1a.g29.et2.text == ''){
      alert("No height value has been entered");
      return;
      }
  }
 if(win.pnl1a.g29a.cb0.value){//Custom Fit Image
       if(win.pnl1a.g29b.et1.text == ''){
      alert("No width value has been entered");
      return;
      }
  if(win.pnl1a.g29b.et2.text == ''){
      alert("No height value has been entered");
      return;
      }
  if(!win.pnl1a.g29c.cb0.value){
       if(win.pnl1a.g29c.et1.text == ''){
           alert("No resolution has been entered");
           return;
           }
       if(Number(win.pnl1a.g29c.et1.text) < 1){
           alert("Invalid resolution entered");
           return;
           }
      }
     }
    win.pnl1a.visible=false;
    win.p1.visible=true;	
}
win.g29.cb0.onClick = function(){
  if(win.g29.cb0.value)  {
      win.g29.bu1.visible=true;
      win.p1.visible=false;	
        win.pnl1a.visible=true;
      }else{
          win.g29.bu1.visible=false;
          }
}
win.g29.bu1.onClick = function(){
        win.p1.visible=false;	
        win.pnl1a.visible=true;
}
//////////////////////////////////////////
win.g30 =win.p1.add('group');
win.g30.spacing=10;
win.g30.orientation = 'row';
win.g30.alignment="left";
win.g30.cb1 = win.g30.add('checkbox',undefined,'Run Action 1');
win.g30.dd1 = win.g30.add('dropdownlist');
win.g30.dd1.preferredSize=[150,20];
win.g30.dd2 = win.g30.add('dropdownlist');
win.g30.dd2.preferredSize=[150,20];
win.g30.dd1.enabled=false; 
win.g30.dd2.enabled=false;
win.g30.cb1.onClick = function(){
if(win.g40.cb1.value){
    win.g30.cb1.value=true;
    return;
    }
    if(win.g30.cb1.value){
        win.g30.dd1.enabled=true;
        win.g30.dd2.enabled=true;   
        win.g38.cb1.enabled=true;
        }else{
            win.g30.dd1.enabled=false;
            win.g30.dd2.enabled=false;
            win.g38.cb1.value=false;
            win.g38.cb1.enabled=false;
            }
}

win.g35 =win.p1.add('group');
win.g35.spacing=10;
win.g35.orientation = 'row';
win.g35.alignment="left";
win.g35.cb1 = win.g35.add('checkbox',undefined,'Run Action 2');
win.g35.dd1 = win.g35.add('dropdownlist');
win.g35.dd1.preferredSize=[150,20];
win.g35.dd2 = win.g35.add('dropdownlist');
win.g35.dd2.preferredSize=[150,20];
win.g35.dd1.enabled=false; 
win.g35.dd2.enabled=false;
win.g35.cb1.onClick = function(){
if(win.g40.cb1.value){
    win.g35.cb1.value=true;
    return;
    }
    if(win.g35.cb1.value){
        win.g35.dd1.enabled=true;
        win.g35.dd2.enabled=true;    
        }else{
            win.g35.dd1.enabled=false;
            win.g35.dd2.enabled=false;
            win.g40.cb1.value=false;
            }
}
/////////////////////////////////////////////////////
actionArray =[];
win.g38 =win.p1.add('group');
win.g38.spacing=10;
win.g38.orientation = 'row';
win.g38.alignment="left";
win.g38.cb1 = win.g38.add('checkbox',undefined,'Stack Actions');
win.g38.cb1.enabled=false;
win.g38.et1 = win.g38.add('edittext',undefined,'0');
win.g38.et1.preferredSize=[50,20];
win.g38.et1.enabled=false;
win.g38.et1.enabled=false;
win.g38.bu1 = win.g38.add('button',undefined,'Add Action');
win.g38.bu2 = win.g38.add('button',undefined,'Remove Action');
win.g38.cb1.onClick = function(){
   if(win.g38.cb1.value){
       win.g38.bu1.enabled=true;
       win.g38.bu2.enabled=true;
       win.g40.cb0.enabled=false;
       win.g40.cb0.value=false;
        win.g35.cb1.enabled=false;
        win.g35.dd1.enabled=false;
        win.g35.dd2.enabled=false;
       }else{
           win.g38.bu1.enabled=false;
            win.g38.bu2.enabled=false;
            win.g40.cb0.enabled=true;
            win.g35.cb1.enabled=true;
            win.g35.dd1.enabled=true;
            win.g35.dd2.enabled=true;
           }
       win.g40.cb0.onClick();
}
win.g38.bu1.onClick = function() {
	if(win.g38.cb1.value){
	actionArray.push([[win.g30.dd2.selection.text],[win.g30.dd1.selection.text]]);
	win.g38.et1.text = actionArray.length;
	}
}
win.g38.bu2.onClick = function() {
	if(win.g38.cb1.value){
	actionArray.pop();
	win.g38.et1.text = actionArray.length;
	}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
win.g40 =win.p1.add('group');
win.g40.spacing=2;
win.g40.orientation = 'row';
win.g40.alignment="left";
win.g40.cb0 = win.g40.add('checkbox',undefined,'Action1 Landscape/Action2 Portrait');
win.g40.cb1 = win.g40.add('checkbox',undefined,'Add Logo/Text');
win.g40.bu1 = win.g40.add('button',undefined,'Setup');
win.g40.bu1.visible=false; 
win.g40.cb0.onClick = function(){
    if(win.g40.cb0.value){
        win.g30.cb1.value=true;
        win.g30.cb1.onClick();
        win.g35.cb1.value=true;
        win.g35.cb1.onClick();
        }else{
        win.g30.cb1.onClick();
        win.g35.cb1.value=false;
        win.g35.cb1.onClick();
            }
    }
win.g50 =win.p1.add('group');
win.g50.spacing=10;
win.g50.orientation = 'row';
win.g50.alignment="left";
win.g50.st1 = win.g50.add('statictext',undefined,"FileName Options");
var options = ["Document Name","Document Name with Prefix","Document Name with Suffix","Document Name with Sequence Number","New Name with Sequence Number"];
win.g50.dd1 = win.g50.add('dropdownlist',undefined,options);
win.g50.dd1.selection=0;

win.g55 =win.p1.add('group');
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
win.g55c.st2 =win.g55c.add('statictext',undefined,'Len.');
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
win.g55d.et1.preferredSize=[200,20];
win.g55d.et2 = win.g55d.add('edittext',undefined,"");
win.g55d.et2.preferredSize=[50,20];
win.g55d.st2 =win.g55d.add('statictext',undefined,'len.');
win.g55d.dd1 =win.g55d.add('dropdownlist',undefined,numbers);
win.g55d.dd1.selection=2;
win.g55d.visible=false;
win.g55d.et2.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
}
win.g57 =win.p1.add('group');
win.g57.st1 = win.g57.add('statictext',undefined,"Save Options :-");
var z = win.g57.st1.graphics;
z.font = ScriptUI.newFont("Georgia","BOLDITALIC",18);

win.g60 =win.p1.add('group');
win.g60.spacing=1;
win.g60.orientation = 'row';
win.g60.alignment="left";
win.g60.cb1 = win.g60.add('checkbox',undefined,"TIF");
var tiffOptions=["LZW","ZIP","JPG","None"];
win.g60.dd1 = win.g60.add('dropdownlist',undefined,tiffOptions);
win.g60.dd1.selection=0;
win.g60.cb2 = win.g60.add('checkbox',undefined,"PSD");
if(Prefs.TIFcomp  != undefined)  win.g60.dd1.selection = Prefs.TIFcomp;
win.g60.dd1.enabled=false;
win.g60.cb1.onClick = function(){
    if(win.g60.cb1.value){
        win.g60.dd1.enabled=true;
        }else{
            win.g60.dd1.enabled=false;
            }
}
win.g60.cb3 = win.g60.add('checkbox',undefined,"PNG");
win.g60.cb3.helpTip="Save For Web PNG 24bit";
win.g60.dd2 = win.g60.add('dropdownlist')
for(var a = 0;a<101;a++){
    win.g60.dd2.add("item",a);
    }
win.g60.dd2.selection=80;
win.g60.dd2.enabled=false;
win.g60.cb3.onClick = function(){
    if(win.g60.cb3.value){
        win.g60.dd2.enabled=true;
        }else{
            win.g60.dd2.enabled=false;
            }
}
var jpgQuality=[1,2,3,4,5,6,7,8,9,10,11,12];
win.g60.cb4 = win.g60.add('checkbox',undefined,"JPG");
win.g60.dd3 = win.g60.add('dropdownlist',undefined,jpgQuality);
win.g60.dd3.selection=7;
if(Prefs.JPGqual  != undefined)  win.g60.dd3.selection = Prefs.JPGqual;
win.g60.dd3.enabled=false;
win.g60.cb4.onClick = function(){
    if(win.g60.cb4.value){
        win.g60.dd3.enabled=true;
        win.g70.cb1.value=false;
        win.g70.dd1.enabled=false;
        win.g70.dd2.enabled=false;
        win.g70a.cb1.enabled=false;
        win.g70a.cb2.enabled=false;
        win.g70a.cb3.enabled=false;
        }else{
            win.g60.dd3.enabled=false;
            }
}
win.g60.cb5 = win.g60.add('checkbox',undefined,"GIF");
win.g60.cb5.helpTip="Save Fow Web 256 Colours";
win.p3= win.p1.add("panel", undefined, undefined, {borderStyle:"etched"});
win.g70 =win.p3.add('group');
win.g70.spacing=10;
win.g70.orientation = 'row';
win.g70.alignment="left";
win.g70.cb1 = win.g70.add('checkbox',undefined,"Save For Web");
win.g70.dd1 = win.g70.add('dropdownlist');
for(var a = 1;a<101;a++){
    win.g70.dd1.add('item', a);
    }
win.g70.dd1.selection=79;
if(Prefs.SFWqual  != undefined)  win.g70.dd1.selection = Prefs.SFWqual;
win.g70.dd2 = win.g70.add('dropdownlist');
var MetaList = [['No Metadata','MDNn'],
						['All Metadata','MDAl'],
						['Copyright','MDCp' ],
						['Copyright and Contact Info','MDCC'],
						['All Except Camera Info','MDAx']];

	for (var i in MetaList) {
	win.g70.dd2.add('item',MetaList[i][0]);
}
win.g70.dd2.selection=0;
if(Prefs.Metadata  != undefined)  win.g70.dd2.selection = Prefs.Metadata;
win.g70.dd2.enabled=false;
win.g70.dd1.enabled=false;
win.g70.cb1.onClick = function(){
    if(win.g70.cb1.value){
        win.g70.dd1.enabled=true;
        win.g70.dd2.enabled=true;
        win.g60.cb4.value=false;
        win.g60.dd2.enabled=false;
        win.g70a.cb1.enabled=true;
        win.g70a.cb2.enabled=true;
        win.g70a.cb3.enabled=true;
        }else{
            win.g70.dd1.enabled=false;
            win.g70.dd2.enabled=false;
            win.g70a.cb1.enabled=false;
            win.g70a.cb2.enabled=false;
            win.g70a.cb3.enabled=false;
            }
}
win.g70a =win.p3.add('group');
win.g70a.spacing=10;
win.g70a.orientation = 'row';
win.g70a.alignment="left";
win.g70a.cb1 = win.g70a.add('checkbox',undefined,"Embed Profile");
win.g70a.cb2 = win.g70a.add('checkbox',undefined,"sRGB");
win.g70a.cb3 = win.g70a.add('checkbox',undefined,"Progressive");
win.g70a.cb2.value=true;
if(Prefs.sRgb  != undefined)  win.g70a.cb2.value = Prefs.sRgb;
if(Prefs.Embed  != undefined)  win.g70a.cb1.value = Prefs.Embed;
if(Prefs.Progressive  != undefined)  win.g70a.cb3.value = Prefs.Progressive;
win.g70a.cb1.enabled=false;
win.g70a.cb2.enabled=false;
win.g70a.cb3.enabled=false;
win.g150 =win.p1.add('group');
win.g150.spacing=10;
win.g150.orientation = 'row';
win.g150.alignment="top";
win.g150.bu1 = win.g150.add('button',undefined,"Process");
win.g150.bu1.preferredSize=[200,20];
win.g150.bu2 = win.g150.add('button',undefined,"Cancel");
win.g150.bu2.preferredSize=[200,20];

if (app.version.match(/\d+/) ==10){
    win.g70.dd2.visible=false;
    win.g70a.cb2.visible=false;
     win.g70a.cb3.visible=false;
    }
win.g50.dd1.onChange = function(){
    switch(this.selection.index){
        case 0 : hideFields();break;
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

var actionSets = new Array();
actionSets = getActionSets();
for (var i=0,len=actionSets.length;i<len;i++) {
	win.g30.dd1.add ('item', "" + actionSets[i]);  
    win.g35.dd1.add ('item', "" + actionSets[i]);  
}; 
win.g30.dd1.selection=0;
win.g35.dd1.selection=0;
var actions = new Array();	
actions = getActions(actionSets[0]);
for (var i=0,len=actions.length;i<len;i++) {
	win.g30.dd2.add ('item', "" + actions[i]);    
    win.g35.dd2.add ('item', "" + actions[i]);
};
win.g30.dd2.selection=0;
win.g35.dd2.selection=0;
win.g30.dd1.onChange = function() {
win.g30.dd2.removeAll();
actions = getActions(actionSets[parseInt(this.selection)]);
for (var i=0,len=actions.length;i<len;i++) {
	win.g30.dd2.add ('item', "" + actions[i]);  
	}
	win.g30.dd2.selection=0;
};
win.g35.dd1.onChange = function() {
win.g35.dd2.removeAll();
actions = getActions(actionSets[parseInt(this.selection)]);
for (var i=0,len=actions.length;i<len;i++) {
	win.g35.dd2.add ('item', "" + actions[i]);  
	}
	win.g35.dd2.selection=0;
};
pnl2 = win.add('panel', undefined, undefined, {borderStyle:"black"}); 
pnl2.orientation='column';
pnl2.alignment='fill';
pnl2.st1 = pnl2.add('statictext',undefined,'Add Logo or Text');
var h = pnl2.st1.graphics;
h.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
pnl2.grp5 =pnl2.add('group');
pnl2.grp5.orientation='row';
pnl2.grp5.alignment='fill';
pnl2.grp5.spacing=10;
pnl2.grp5.rb1 = pnl2.grp5.add('radiobutton',undefined,'Use Image');
pnl2.grp5.rb2 = pnl2.grp5.add('radiobutton',undefined,'Use Text');
pnl2.grp5.rb2.value=true;
pnl2.grp5.st2 = pnl2.grp5.add('statictext',undefined,'% of shortest side');
pnl2.grp5.dd2 = pnl2.grp5.add('dropdownlist');
for(var a = 1; a<151;a++){
	pnl2.grp5.dd2.add('item', a + ' %');
	}
pnl2.grp5.dd2.selection= 49;
try{
if(Prefs.Percent != undefined) pnl2.grp5.dd2.selection= Number(Prefs.Percent); 
}catch(e){}
pnl2.grp5a =pnl2.add('group');
pnl2.grp5a.orientation='row';
pnl2.grp5a.alignment='fill';
pnl2.grp5a.st1 = pnl2.grp5a.add('statictext',undefined,'Logo / Text Location');
var position =['Top Left','Top Center','Top Right','Center Left','Center','Center Right','Bottom Left','Bottom Center','Bottom Right'];
pnl2.grp5a.dd1 = pnl2.grp5a.add('dropdownlist',undefined,position);
pnl2.grp5a.cb1 = pnl2.grp5a.add('checkbox',undefined,'Rotate -45 Degrees');
pnl2.grp5a.dd1.selection=0;
pnl2.grp5a.cb1.visible=false;
pnl2.grp5a.cb1.value = false;

try{
if(Prefs.Position != undefined){
    pnl2.grp5a.dd1.selection = Number(Prefs.Position); 
    if(Number(Prefs.Position) == 4 ) pnl2.grp5a.cb1.visible=true;
    }else{
        pnl2.grp5a.cb1.visible=false;
        pnl2.grp5a.cb1.value = false;
        }
}catch(e){}
pnl2.grp5a.dd1.onChange = function(){
    if(pnl2.grp5a.dd1.selection.index == 4){
        pnl2.grp5a.cb1.visible=true;
        }else{
            pnl2.grp5a.cb1.visible=false;
            pnl2.grp5a.cb1.value = false;
            }
}
pnl2.grp6 =pnl2.add('group');
pnl2.grp6.orientation='row';
pnl2.grp6.alignment='fill';
pnl2.grp6.st1 = pnl2.grp6.add('statictext',undefined,'Relative Offset (Pixels)');
pnl2.grp6.dd1 = pnl2.grp6.add('dropdownlist');
pnl2.grp6.st2 = pnl2.grp6.add('statictext',undefined,'Horizontal');
pnl2.grp6.dd2 = pnl2.grp6.add('dropdownlist');
pnl2.grp6.st3 = pnl2.grp6.add('statictext',undefined,'Vertical');
for(var a = 0; a<150;a++){
	pnl2.grp6.dd1.add('item', a);
	pnl2.grp6.dd2.add('item', a);
	}
pnl2.grp6.dd1.selection= 10;
pnl2.grp6.dd2.selection= 10;
try{
if(Prefs.offSetX != undefined) pnl2.grp6.dd1.selection = Prefs.offSetX;
if(Prefs.offSetY != undefined) pnl2.grp6.dd2.selection = Prefs.offSetY;
}catch(e){}
pnl2.grp7 =pnl2.add('group');
pnl2.grp7.orientation='row';
pnl2.grp7.st1 = pnl2.grp7.add('statictext',undefined,'Select Logo...');
pnl2.grp7.alignment='fill';

pnl2.grp10 =pnl2.add('group');
pnl2.grp10.orientation='row';
pnl2.grp10.spacing=10;
pnl2.grp10.alignment='fill';
pnl2.grp10.et1 = pnl2.grp10.add('edittext');
pnl2.grp10.et1.preferredSize=[300,20];
pnl2.grp10.et1.enabled=false;
pnl2.grp10.bu1 = pnl2.grp10.add('button',undefined,'Browse');
var logoFile='';
pnl2.grp10.bu1.onClick = function(){
logoFile = File.openDialog ("Please Select Logo", "Select:*.png;*.tif;*.psd;*.jpg");
if(logoFile != null){
    pnl2.grp10.et1.text = decodeURI(logoFile.fsName);
    }
}
try{
logoFile = File(Prefs.LogoFile);
if(logoFile.exists) {
	pnl2.grp10.et1.text = decodeURI(logoFile.fsName);
	}else{
		pnl2.grp10.et1.text = '';
		logoFile='';
		}

}catch(e){}
pnl2.grp13 =pnl2.add('group');
pnl2.grp13.orientation='row';
pnl2.grp13.alignment='fill';
pnl2.grp13.st1 = pnl2.grp13.add('statictext',undefined,'Text');
pnl2.grp13.bu1 = pnl2.grp13.add('button',undefined,'Use ©');
pnl2.grp13.bu2 = pnl2.grp13.add('button',undefined,'Clear Text');

pnl2.grp15 =pnl2.add('group');
pnl2.grp15.orientation='row';
pnl2.grp15.alignment='fill';
pnl2.grp15.spacing=10;
pnl2.grp15.et1 = pnl2.grp15.add('edittext');
pnl2.grp15.et1.preferredSize=[300,20];

pnl2.grp13.bu2.onClick = function(){
   pnl2.grp15.et1.text =''; 
}

try{
if(Prefs.WaterMarkText != undefined) pnl2.grp15.et1.text = Prefs.WaterMarkText;
}catch(e){}
pnl2.grp13.bu1.onClick = function(){
pnl2.grp15.et1.text += '©';
}
pnl2.grp5.rb2.onClick = function(){
    pnl2.grp5.rb1.onClick();
    }
pnl2.grp25 =pnl2.add('group');
pnl2.grp25.orientation='row';
pnl2.grp25.alignment='fill';
pnl2.grp25.spacing=10;
pnl2.grp25.cb1 = pnl2.grp25.add('checkbox',undefined,'Use MetaData');
pnl2.grp25.cb1.helpTip="If nothing found the file name will be used";
if(Prefs.MetaData != undefined) pnl2.grp25.cb1.value = Prefs.MetaData;
var Meta = ['Document Title','Caption','Headline','CopyRight Info'];
if(app.version.match(/\d+/) == 10){
    Meta.splice(3,1);
    }
pnl2.grp25.dd1 = pnl2.grp25.add('dropdownlist',undefined,Meta);
pnl2.grp25.dd1.enabled = false;
pnl2.grp25.dd1.selection = 0;



pnl2.grp19 =pnl2.add('group');
pnl2.grp19.orientation='row';
pnl2.grp19.alignment='fill';
pnl2.grp19.spacing=3;
pnl2.grp19.cb1 = pnl2.grp19.add('checkbox',undefined,'Use FileName');
pnl2.grp19.cb2 = pnl2.grp19.add('checkbox',undefined,'Emboss');
pnl2.grp19.st1 = pnl2.grp19.add('statictext',undefined,'Opacity');
pnl2.grp19.dd1 = pnl2.grp19.add('dropdownlist');
pnl2.grp19.cb3 = pnl2.grp19.add('checkbox',undefined,'Stroke');
var StrokeWidth = [1,2,3,4,5,6,7,8,9,10];
pnl2.grp19.dd3 = pnl2.grp19.add('dropdownlist',undefined,StrokeWidth);
pnl2.grp19.dd3.selection=0;
var Colours = ["Black","White","Red","Green","Blue"];
pnl2.grp19.dd2 = pnl2.grp19.add('dropdownlist',undefined,Colours);
pnl2.grp19.dd2.selection=0;
if(Prefs.SW != undefined) pnl2.grp19.dd3.selection= Number(Prefs.SW);
if(Prefs.SC != undefined) pnl2.grp19.dd2.selection= Number(Prefs.SC);
for(var a = 0; a<101;a++){
    pnl2.grp19.dd1.add('item', a);
    }
pnl2.grp19.dd1.selection=0;
try{
    if(Prefs.Opacity != undefined){
        pnl2.grp19.dd1.selection = Number(Prefs.Opacity);
        }
}catch(e){}
pnl2.grp19a =pnl2.add('group');
pnl2.grp19a.orientation='row';
pnl2.grp19a.alignment='fill';
pnl2.grp19a.spacing=10;
pnl2.grp19a.cb1 = pnl2.grp19a.add('checkbox',undefined,'Add Sequence Number');
pnl2.grp19a.et1 = pnl2.grp19a.add('edittext',undefined,'1');
pnl2.grp19a.et1.preferredSize=[50,20];
var SIX = [2,3,4,5,6,7,8,9,10];
pnl2.grp19a.st1 = pnl2.grp19a.add('statictext',undefined,'Length');
pnl2.grp19a.dd1 = pnl2.grp19a.add('dropdownlist',undefined,SIX);
pnl2.grp19a.dd1.selection=3;
pnl2.grp19a.cb1.onClick=function(){
    if(pnl2.grp19a.cb1.value){
        pnl2.grp19a.et1.enabled=true;
        pnl2.grp19a.dd1.enabled=true;
        }else{
            pnl2.grp19a.et1.enabled=false;
            pnl2.grp19a.dd1.enabled=false;
            }
}
pnl2.grp19a.cb1.onClick();

pnl2.grp18 =pnl2.add('group');
pnl2.grp18.orientation='row';
pnl2.grp18.alignment='fill';
pnl2.grp18.spacing=10;
pnl2.grp18.st1 = pnl2.grp18.add('statictext',undefined,'Select Font');
pnl2.grp18.dd1 = pnl2.grp18.add('dropdownlist');
pnl2.grp18.dd1.preferredSize=[250,20];
for (var i=0,len=app.fonts.length;i<len;i++) {
 	pnl2.grp18.dd1.add ('item', app.fonts[i].name);
	}
pnl2.grp18.dd1.selection=0;
try{
pnl2.grp18.dd1.selection = Prefs.Font;
}catch(e){}
pnl2.grp20 =pnl2.add('group');
pnl2.grp20.orientation='row';
pnl2.grp20.alignment='fill';
pnl2.grp20.spacing=10;
pnl2.grp20.st1 = pnl2.grp20.add('statictext',undefined,'Text Colour');
pnl2.grp20.st1.helpTip='Not used if Emboss is selected';
pnl2.grp20.et1 = pnl2.grp20.add('edittext',undefined,'000000');
pnl2.grp20.et1.enabled=false;
if(Prefs.Colour1 != undefined) pnl2.grp20.et1.text = Prefs.Colour1;
pnl2.grp20.et1.preferredSize=[58,20];
pnl2.grp20.p1 = pnl2.grp20.add('panel');
pnl2.grp20.p1.preferredSize=[20,20];
pnl2.grp20.bu1 = pnl2.grp20.add('button',undefined,'Select Colour');
panelColour(pnl2.grp20.et1.text,1);
pnl2.grp20.bu1.onClick= function(){
var  myColour = colourPicker(pnl2.grp20.et1.text);
if(myColour != undefined){
    pnl2.grp20.et1.text = myColour.toString();
    panelColour(myColour,1)
    }
}
pnl2.grp22 =pnl2.add('group');
pnl2.grp22.orientation='row';
pnl2.grp22.alignment='fill';
pnl2.grp22.spacing=10;
pnl2.grp22.cb1 = pnl2.grp22.add('checkbox',undefined,'Add Colour Bar');
pnl2.grp22.cb1.helpTip='Used for Logo or Text';
pnl2.grp22.et1 = pnl2.grp22.add('edittext',undefined,'000000');
pnl2.grp22.et1.enabled=false;
if(Prefs.Colour2 != undefined) pnl2.grp22.et1.text = Prefs.Colour2;
pnl2.grp22.et1.preferredSize=[58,20];
pnl2.grp22.p1 = pnl2.grp22.add('panel');
pnl2.grp22.p1.preferredSize=[20,20];
pnl2.grp22.bu1 = pnl2.grp22.add('button',undefined,'Select Colour');
pnl2.grp22.bu1.enabled=false;
pnl2.grp22.st1 = pnl2.grp22.add('statictext',undefined,'Opacity');
pnl2.grp22.dd1 = pnl2.grp22.add('dropdownlist');
pnl2.grp22.dd1.enabled=false;
panelColour(pnl2.grp22.et1.text,2);
for(var a = 0; a<101;a++){
    pnl2.grp22.dd1.add('item', a);
    }
pnl2.grp22.dd1.selection=0;
if(Prefs.Opacity2 != undefined) pnl2.grp22.dd1.selection = Number(Prefs.Opacity2);
pnl2.grp22.cb1.onClick=function(){
    if(pnl2.grp22.cb1.value){
        pnl2.grp22.bu1.enabled=true;
        pnl2.grp22.dd1.enabled=true;
        }else{
            pnl2.grp22.bu1.enabled=false;
            pnl2.grp22.dd1.enabled=false;
            }
}
pnl2.grp22.cb1.onClick();
pnl2.grp22.bu1.onClick= function(){
var  myColour = colourPicker(pnl2.grp22.et1.text);
if(myColour != undefined){
    pnl2.grp22.et1.text = myColour.toString();
    panelColour(myColour,2)
    }
}
function panelColour(HexValue,Panel){
var col = new SolidColor;
col.rgb.hexValue = HexValue;
var r = col.rgb.red/255;
var g = col.rgb.green/255;
var b = col.rgb.blue/255;
switch(Panel){
case 1: C = pnl2.grp20.p1.graphics; var myBrush = C.newBrush(C.BrushType.SOLID_COLOR, [r, g, b, 1]); 
C.backgroundColor = myBrush; break;
case 2:  C = pnl2.grp22.p1.graphics; var myBrush = C.newBrush(C.BrushType.SOLID_COLOR, [r, g, b, 1]); 
C.backgroundColor = myBrush; break;
default : break;
}

}
try{
if( Prefs.FileName != undefined) pnl2.grp19.cb1.value = Prefs.FileName;
if( Prefs.Emboss != undefined) pnl2.grp19.cb2.value = Prefs.Emboss;
}catch(e){}
try{
if(Prefs.HexColour != undefined) pnl2.grp20.et1.text = Prefs.HexColour;
}catch(e){}
panelColour(pnl2.grp20.et1.text);

try{
if(Prefs.MetaSelection != undefined) pnl2.grp25.dd1.selection = Number(Prefs.MetaSelection);
}catch(e){}
pnl2.grp25.cb1.onClick = function(){
	if(pnl2.grp25.cb1.value){
		pnl2.grp25.dd1.enabled = true;
		}else{
			pnl2.grp25.dd1.enabled = false;
			}
}

pnl2.grp5.rb1.onClick = function(){
if(pnl2.grp5.rb1.value){
    pnl2.grp10.bu1.enabled=true;
    pnl2.grp15.et1.enabled=false;
    pnl2.grp19.cb1.value=false;
    pnl2.grp19.cb1.enabled=false;
    pnl2.grp19.cb2.value=false;
    pnl2.grp19.cb2.enabled=false;
    pnl2.grp19.cb2.enabled=false;
    pnl2.grp19.cb3.enabled=false;
    pnl2.grp19.cb3.value=false;
    pnl2.grp19.dd1.enabled=false;
    pnl2.grp19.dd2.enabled=false;
    pnl2.grp25.cb1.value=false;
    pnl2.grp25.cb1.enabled=false;
    pnl2.grp18.dd1.enabled=false;
    pnl2.grp19.dd3.enabled=false;
    pnl2.grp25.cb1.onClick();
}else{
    pnl2.grp10.bu1.enabled=false;
    pnl2.grp15.et1.enabled=true;
    pnl2.grp19.cb1.enabled=true;
    pnl2.grp19.cb2.enabled=true;
    pnl2.grp19.cb3.enabled=true;
    pnl2.grp25.cb1.enabled=true;
    pnl2.grp18.dd1.enabled=true;
    pnl2.grp19.dd1.enabled=true;
    pnl2.grp19.dd2.enabled=true;
    pnl2.grp19.dd3.enabled=true;
    pnl2.grp25.cb1.onClick();
    }
}
try{
if(Prefs.Image != undefined){
	pnl2.grp5.rb1.value = Prefs.Image;
	pnl2.grp5.rb1.onClick();
	}
}catch(e){}
pnl2.grp5.rb1.onClick();

pnl2.grp30 =pnl2.add('group');
pnl2.grp30.orientation='row';
pnl2.grp30.alignment='fill';
pnl2.grp30.spacing=10;
pnl2.grp30.cb1 = pnl2.grp30.add('checkbox',undefined,'Add Copyright');

pnl2.grp30.et1 = pnl2.grp30.add('edittext');
pnl2.grp30.et1.enabled=false;
pnl2.grp30.et1.preferredSize=[250,20];
pnl2.grp30.cb1.onClick = function(){
	if(pnl2.grp30.cb1.value){
		pnl2.grp30.et1.enabled=true;
		}else{
		pnl2.grp30.et1.enabled=false;
			}
}
try{
if( Prefs.AddCopy != undefined){
    pnl2.grp30.cb1.value = Prefs.AddCopy;
    if(pnl2.grp30.cb1.value) pnl2.grp30.et1.enabled=true;
    }
if( Prefs.CopyNotice != undefined)  pnl2.grp30.et1.text = Prefs.CopyNotice;
}catch(e){}    


pnl2.grp100 =pnl2.add('group');
pnl2.grp100.orientation='row';
pnl2.grp100.bu1 = pnl2.add('button',undefined,'Done');
pnl2.grp100.bu1.alignment='fill';
pnl2.visible=false;
pnl2.p2= pnl2.add("panel", undefined, undefined, {borderStyle:"black"}); 
pnl2.p2.preferredSize=[400,2];

win.g40.cb1.onClick = function(){
  if(win.g40.cb1.value)  {
      win.g40.bu1.visible=true;
      win.p1.visible=false;	
        pnl2.visible=true;
      }else{
          win.g40.bu1.visible=false;
          }
}
win.g40.bu1.onClick = function(){
        win.p1.visible=false;	
        pnl2.visible=true;
}
pnl2.grp100.bu1.onClick = function(){

if(pnl2.grp5.rb1.value){
	if(logoFile == null){
		alert("Logo file does not exits, please select Logo!");
		pnl2.grp10.et1.text='';
		return;
		}
	if(!logoFile.exists){
		alert("Logo file does not exits, please select Logo!");
		pnl2.grp10.et1.text='';
		return;
		}
}
if(pnl2.grp5.rb2.value){
var txtSelected =false;
if(pnl2.grp15.et1.text != '') txtSelected = true;
if(pnl2.grp19.cb1.value) txtSelected = true;
if(pnl2.grp19a.cb1.value) txtSelected = true;
if(pnl2.grp25.cb1.value) txtSelected = true;
if(!txtSelected){
    alert("No text, FileName or Metadata has been selected!");
    return;
    }
}
pnl2.visible=false;	
win.p1.visible=true;	
}

win.g150.bu1.onClick = function(){
     if(win.g30.cb1.value && win.g38.cb1.value && actionArray.length ==0) {
        alert("You have no stacked actions\r Please selected the required actions");
        return;
        }
    if(win.g5.rb3.value){
        if (!BridgeTalk.isRunning("Bridge")) {
    alert("Bridge is not running!");
    return;
    }
        var tmpFiles = GetFilesFromBridge();
        if(!tmpFiles.length ){
            alert("No Bridge Files Have Been Selected!");
            tmpFiles=[];
            return;
            }else{
                tmpFiles=[];
                }
        }
    if(win.g5.rb1.value && win.g15.et1.text == ''){
        alert("No Source Folder Has Been Selected!");
        return;
        }
    if(!win.g5.cb1.value){
    if(win.g25.et1.text == '') {
        alert("No Output Folder Has Been Selected!");
        return;
        }
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
    if(!win.g60.cb1.value && !win.g60.cb2.value && !win.g60.cb3.value && !win.g60.cb4.value && !win.g60.cb5.value && !win.g70.cb1.value){
        alert("No Save FileType Has Been Selected!");
        return;
        }
try{
Prefs.Flatten =  win.g27.cb1.value;
Prefs.EightBit =  win.g27.cb2.value;
Prefs.Channels = win.g27.cb4.value;
Prefs.Paths = win.g27.cb3.value;
Prefs.sort  = win.g28.cb1.value;
Prefs.sortAlpha = win.g28.cb2.value;
Prefs.reverse = win.g28.cb3.value;
Prefs.FileExts = Number(win.g12.dd1.selection.index); 
Prefs.TIFcomp = Number(win.g60.dd1.selection.index);
Prefs.JPGqual = Number(win.g60.dd3.selection.index);
Prefs.SFWqual = Number(win.g70.dd1.selection.index);
Prefs.Metadata = Number(win.g70.dd2.selection.index);
Prefs.Font = Number(pnl2.grp18.dd1.selection.index);
Prefs.Percent = Number(pnl2.grp5.dd2.selection.index);
Prefs.Position = Number(pnl2.grp5a.dd1.selection.index);
Prefs.offSetX = Number(pnl2.grp6.dd1.selection.index);
Prefs.offSetY = Number(pnl2.grp6.dd2.selection.index);
Prefs.MetaSelection = Number(pnl2.grp25.dd1.selection.index);
Prefs.Opacity = Number(pnl2.grp19.dd1.selection.index);
Prefs.WaterMarkText = pnl2.grp15.et1.text;
Prefs.HexColour = pnl2.grp20.et1.text;
Prefs.sRgb = win.g70a.cb2.value;
Prefs.Embed = win.g70a.cb1.value;
Prefs.Progressive = win.g70a.cb3.value;
Prefs.FileName = pnl2.grp19.cb1.value;
Prefs.Emboss = pnl2.grp19.cb2.value;
Prefs.Image = pnl2.grp5.rb1.value;
Prefs.MetaData = pnl2.grp25.cb1.value;
Prefs.AddCopy = pnl2.grp30.cb1.value;
Prefs.CopyNotice = pnl2.grp30.et1.text;
Prefs.LogoFile = logoFile;
Prefs.Opacity2 = pnl2.grp22.dd1.selection.index;
Prefs.Colour1 = pnl2.grp20.et1.text;
Prefs.Colour2 = pnl2.grp22.et1.text;
Prefs.SW =  pnl2.grp19.dd3.selection.index;
Prefs.SC = pnl2.grp19.dd2.selection.index;
var desc2 = new ActionDescriptor();
desc2.putString(0, Prefs.toSource()); 
app.putCustomOptions('30082bf0-700a-11df-be2b-0800200c9a66', desc2, true );
}catch(e){alert (e.line)}
    win.close(1);
    process();
}
win.show();
function process(){
folderList=[];
var saveFileFolder=''
if(win.g10.cb1.value){
	processFolder(topLevelFolder); 
    folderList.unshift(topLevelFolder);
for(var a in folderList){
if(win.g12.dd1.selection.text == 'ALL FILES'){
var PictureFiles = folderList[a].getFiles(/\.(jpg|jpe|jpeg|gif|eps|dng|bmp|tif|tiff|psd|crw|cr2|rle|dib|cin|dpx|ps|pcd|pict|vda|icb|vst|wbm|sct|pbm|flm|psb|exr|pcx|pdp|nef|dcr|dc2|erf|raf|orf|tga|mrw|mos|srf|pic|pct|pxr|pdd|pef|png|x3f|raw)$/i);
}else{
var str = "\\."+win.g12.dd1.selection.text.toLowerCase()+"$";
var fileMask = new RegExp(str, "i");
var PictureFiles = folderList[a].getFiles(fileMask);
    }
if(PictureFiles.length){
saveFileFolder = createRelativeFolder(outputFolder, folderList[a]);
saveFileFolder = decodeURI(saveFileFolder) + "/";
pictureProcess(PictureFiles,saveFileFolder);
    }
}
allDone();
}

if(win.g5.rb1.value && !win.g10.cb1.value){
folderList.unshift(topLevelFolder);
if(!win.g5.cb1.value) saveFileFolder = decodeURI(outputFolder +"/");
if(win.g12.dd1.selection.text == 'ALL FILES'){
var PictureFiles = folderList[0].getFiles(/\.(jpg|jpe|jpeg|gif|eps|dng|bmp|tif|tiff|psd|crw|cr2|rle|dib|cin|dpx|ps|pcd|pict|vda|icb|vst|wbm|sct|pbm|flm|psb|exr|pcx|pdp|nef|dcr|dc2|erf|raf|orf|tga|mrw|mos|srf|pic|pct|pxr|pdd|pef|png|x3f|raw)$/i);
}else{
var str = "\\."+win.g12.dd1.selection.text.toLowerCase()+"$";
var fileMask = new RegExp(str, "i");
var PictureFiles = folderList[0].getFiles(fileMask);
    }
pictureProcess(PictureFiles,saveFileFolder);
allDone();
}
if(win.g5.rb3.value){
var PictureFiles = GetFilesFromBridge();
if(!win.g5.cb1.value) saveFileFolder = decodeURI(outputFolder +"/");
if(win.g5.cb1.value) saveFileFolder = decodeURI("NONE");
pictureProcess(PictureFiles,saveFileFolder);
allDone();
}
 }
function pictureProcess(PictureFiles,saveFileFolder){
app.displayDialogs = DialogModes.NO; 			 
var strtRulerUnits = app.preferences.rulerUnits;   			 
var strtTypeUnits = app.preferences.typeUnits;   			 
app.preferences.rulerUnits = Units.PIXELS;   			 
app.preferences.typeUnits = TypeUnits.PIXELS;
var fileList=[];
for (var a in PictureFiles){
	fileList.push(decodeURI(PictureFiles[a]));
}

PictureFiles=fileList;
if(win.g28.cb1.value) PictureFiles = PictureFiles.sort();
if(win.g28.cb2.value) PictureFiles = PictureFiles.sort(sortAlphaNum);
if(win.g28.cb3.value) PictureFiles = PictureFiles.reverse();
    for(var a in PictureFiles){
    open(File(PictureFiles[a]));
var doc = activeDocument;
if(win.g5.cb1.value) saveFileFolder = decodeURI(doc.path + "/");
if(doc.mode == DocumentMode.INDEXEDCOLOR) doc.changeMode(ChangeMode.RGB);
if(doc.mode == DocumentMode.BITMAP ) doc.changeMode(ChangeMode.GRAYSCALE);
if(doc.mode == DocumentMode.MULTICHANNEL) doc.changeMode(ChangeMode.GRAYSCALE);
var Name='';
var saveFile ='';
if(win.g27.cb1.value) doc.flatten();
if(win.g27.cb2.value){
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
}
if(win.g27.cb3.value){
   doc.pathItems.removeAll(); 
}
if(win.g27.cb4.value){
RemoveAlphaChannels();
}
Name = decodeURI(activeDocument.name).replace(/\.[^\.]+$/, '');
var Seq1 = zeroPad((Number(a)+Number(win.g55c.et1.text)), (parseInt(win.g55c.dd1.selection.index)+2));
var Seq2 = zeroPad((Number(a)+Number(win.g55d.et2.text)), (parseInt(win.g55d.dd1.selection.index)+2));
var Seq3 = zeroPad((Number(a)+Number(pnl2.grp19a.et1.text)), (parseInt(pnl2.grp19a.dd1.selection.index)+2));
var Prefix = win.g55a.et1.text;
var Suffix = win.g55b.et1.text;
var NewName = win.g55d.et1.text;
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Resize before action
if(!win.pnl1a.g28.cb4.value && win.g29.cb0.value){
if(win.pnl1a.g29.cb1.value && win.pnl1a.g29.cb2.value && !win.pnl1a.g29.cb3.value){//do not reduce
    if(doc.width > doc.height){
    if(parseInt(win.pnl1a.g29.et1.text) <doc.width){
    FitImage( parseInt(win.pnl1a.g29.et1.text), parseInt(win.pnl1a.g29.et2.text) );
    }}
    if(doc.width < doc.height){
    if(parseInt(win.pnl1a.g29.et2.text) <doc.height){
    FitImage( parseInt(win.pnl1a.g29.et1.text), parseInt(win.pnl1a.g29.et2.text) );
    }}
    }
if(win.pnl1a.g29.cb1.value && !win.pnl1a.g29.cb2.value && win.pnl1a.g29.cb3.value){
    if(doc.width > doc.height){
    if(parseInt(win.pnl1a.g29.et1.text) <doc.width){
    FitImage( parseInt(win.pnl1a.g29.et1.text), parseInt(win.pnl1a.g29.et2.text) );
    }}
    if(doc.width < doc.height){
    if(parseInt(win.pnl1a.g29.et2.text) <doc.height){
    FitImage( parseInt(win.pnl1a.g29.et1.text), parseInt(win.pnl1a.g29.et2.text) );
    }}
    }
if(win.pnl1a.g29.cb1.value && !win.pnl1a.g29.cb2.value && !win.pnl1a.g29.cb3.value){
    FitImage( parseInt(win.pnl1a.g29.et1.text), parseInt(win.pnl1a.g29.et2.text) );
}
//Custom Fit Image
if(win.pnl1a.g29a.cb0.value){
resUnits= win.pnl1a.g29b.dd1.selection.text.toString();
resWidth = new UnitValue(Number(win.pnl1a.g29b.et1.text),resUnits);  
resHeight = new UnitValue(Number(win.pnl1a.g29b.et2.text),resUnits);
if(win.pnl1a.g29a.cb1.value){//Constrain Proportions
  if(doc.width>doc.height){
      resHeight = undefined;
      }else{
          resWidth = undefined;
   }
}
if(!win.pnl1a.g29a.cb1.value){
    if(doc.height > doc.width){
        resHeight = new UnitValue(Number(win.pnl1a.g29b.et1.text),resUnits);  
        resWidth = new UnitValue(Number(win.pnl1a.g29b.et2.text),resUnits);
        }
}
if(win.pnl1a.g29c.cb0.value){
resizeRes = undefined;
}else{
    resizeRes = Math.round(Number(win.pnl1a.g29c.et1.text));
    }
resizeMethods = win.pnl1a.g29b.dd2.selection.text.toString().toUpperCase();
activeDocument.resizeImage (resWidth, resHeight, resizeRes, eval("ResampleMethod."+resizeMethods));
    }
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Action section
if(!win.g40.cb0.value){
if(win.g30.cb1.value && !win.g38.cb1.value) doAction(win.g30.dd2.selection.text, win.g30.dd1.selection.text);
if(win.g30.cb1.value && win.g38.cb1.value && actionArray.length >0) {
	for(var a =0;a<actionArray.length;a++){
		doAction(actionArray[a][0].toString(),actionArray[a][1].toString());	
	}
}
if(win.g35.cb1.value) doAction(win.g35.dd2.selection.text, win.g35.dd1.selection.text);
}else{
if(win.g30.cb1.value && doc.width>doc.height) doAction(win.g30.dd2.selection.text, win.g30.dd1.selection.text);
if(win.g35.cb1.value && doc.width<doc.height) doAction(win.g35.dd2.selection.text, win.g35.dd1.selection.text);
    }
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
if(win.pnl1a.g28.cb4.value && win.g29.cb0.value){//resize after actions
if(win.pnl1a.g29.cb1.value && win.pnl1a.g29.cb2.value && !win.pnl1a.g29.cb3.value){//do not reduce
    if(doc.width > doc.height){
    if(parseInt(win.pnl1a.g29.et1.text) <doc.width){
    FitImage( parseInt(win.pnl1a.g29.et1.text), parseInt(win.pnl1a.g29.et2.text) );
    }}
    if(doc.width < doc.height){
    if(parseInt(win.pnl1a.g29.et2.text) <doc.height){
    FitImage( parseInt(win.pnl1a.g29.et1.text), parseInt(win.pnl1a.g29.et2.text) );
    }}
    }
if(win.pnl1a.g29.cb1.value && !win.pnl1a.g29.cb2.value && win.pnl1a.g29.cb3.value){
    if(doc.width > doc.height){
    if(parseInt(win.pnl1a.g29.et1.text) <doc.width){
    FitImage( parseInt(win.pnl1a.g29.et1.text), parseInt(win.pnl1a.g29.et2.text) );
    }}
    if(doc.width < doc.height){
    if(parseInt(win.pnl1a.g29.et2.text) <doc.height){
    FitImage( parseInt(win.pnl1a.g29.et1.text), parseInt(win.pnl1a.g29.et2.text) );
    }}
    }
if(win.pnl1a.g29.cb1.value && !win.pnl1a.g29.cb2.value && !win.pnl1a.g29.cb3.value){
    FitImage( parseInt(win.pnl1a.g29.et1.text), parseInt(win.pnl1a.g29.et2.text) );
}
//Custom Fit Image
if(win.pnl1a.g29a.cb0.value){
resUnits= win.pnl1a.g29b.dd1.selection.text.toString();
resWidth = new UnitValue(Number(win.pnl1a.g29b.et1.text),resUnits);  
resHeight = new UnitValue(Number(win.pnl1a.g29b.et2.text),resUnits);
if(win.pnl1a.g29a.cb1.value){//Constrain Proportions
  if(doc.width>doc.height){
      resHeight = undefined;
      }else{
          resWidth = undefined;
          }
}
if(!win.pnl1a.g29a.cb1.value){
    if(doc.height > doc.width){
        resHeight = new UnitValue(Number(win.pnl1a.g29b.et1.text),resUnits);  
        resWidth = new UnitValue(Number(win.pnl1a.g29b.et2.text),resUnits);
        }
}
if(win.pnl1a.g29c.cb0.value){
resizeRes = undefined;
}else{
    resizeRes = Math.round(Number(win.pnl1a.g29c.et1.text));
    }
resizeMethods = win.pnl1a.g29b.dd2.selection.text.toString().toUpperCase();
activeDocument.resizeImage (resWidth, resHeight, resizeRes, eval("ResampleMethod."+resizeMethods));
    }
}///////////////////////////////////////////////////////////////////
if(win.g40.cb1.value){
var useLogo = pnl2.grp5.rb1.value;
var Percent = Number(pnl2.grp5.dd2.selection.index) + 1;
var Position = Number(pnl2.grp5a.dd1.selection.index) + 1;
var OffsetX = Number(pnl2.grp6.dd1.selection.index);
var OffsetY = Number(pnl2.grp6.dd2.selection.index);
var Emboss = pnl2.grp19.cb2.value;
 var Colour = new SolidColor;
Colour.rgb.hexValue= pnl2.grp20.et1.text;
var Font = app.fonts[Number(pnl2.grp18.dd1.selection.index)].postScriptName;
var myDoc = activeDocument;
var docWidth = myDoc.width.value; 
var docHeight = myDoc.height.value;
var Name = decodeURI(activeDocument.name).replace(/\.[^\.]+$/, '');//.toUpperCase();
var TextInfo ='';
if(pnl2.grp19.cb1.value) TextInfo += Name;
if(pnl2.grp19a.cb1.value) TextInfo += " "+Seq3;
if(pnl2.grp15.et1.text != '') TextInfo += ' ' + pnl2.grp15.et1.text;
if(pnl2.grp30.cb1.value){
    activeDocument.info.copyrighted=CopyrightedType.COPYRIGHTEDWORK;
    activeDocument.info.copyrightNotice = pnl2.grp30.et1.text;
}
if(pnl2.grp25.cb1.value){
    switch(Number(pnl2.grp25.dd1.selection.index)){
        case 0 : if(activeDocument.info.title != ''){
            TextInfo += ' ' + activeDocument.info.title;
            break;
            }else{
                TextInfo +=' ' + Name; break;
                }
         case 1 : if(activeDocument.info.caption != ''){
            TextInfo += ' ' + activeDocument.info.caption;
            break;
            }else{
                TextInfo +=' ' + Name; break;
                }
            case 2 : if(activeDocument.info.headline != ''){
            TextInfo += ' ' + activeDocument.info.headline;
            break;
            }else{
                TextInfo +=' ' + Name; break;
                }
            case 3 : var CpyInfo = getCopyRightNotice(); if(CpyInfo !=''){
                TextInfo += ' ' + CpyInfo; break;
                }else{
                    TextInfo +=' ' + Name; break;
                    }
           default : break;
        }
}
if(!useLogo){
var newTextLayer = activeDocument.artLayers.add(); 
newTextLayer.kind = LayerKind.TEXT; 
newTextLayer.textItem.kind = TextType.POINTTEXT;
newTextLayer.textItem.color = Colour; 
newTextLayer.textItem.font = Font;
newTextLayer.textItem.size = 10; 
newTextLayer.textItem.contents = TextInfo;
}else{
    placeLogo(logoFile); 
    activeDocument.activeLayer.rasterize(RasterizeType.ENTIRELAYER );
    }
var LB = myDoc.activeLayer.bounds; 
var LHeight = Math.abs(LB[3].value) - Math.abs(LB[1].value);
var LWidth = Math.abs(LB[2].value) - Math.abs(LB[0].value);    
var percentageHeight = ((docHeight/LWidth)*Percent); 
var percentageWidth = ((docWidth/LWidth)*Percent);
if(docWidth < docHeight){
myDoc.activeLayer.resize(percentageWidth,percentageWidth,AnchorPosition.MIDDLECENTER);
}else{   
  myDoc.activeLayer.resize(percentageHeight,percentageHeight,AnchorPosition.MIDDLECENTER);
  }
if(!useLogo){
activeDocument.activeLayer.rasterize( RasterizeType.TEXTCONTENTS);
var strokeWth= pnl2.grp19.dd3.selection.index+1;
if(!Emboss){
if(pnl2.grp19.cb3.value)StrokeText(pnl2.grp19.dd2.selection.text,strokeWth);
}
if(Emboss) emboss(Number(pnl2.grp19.dd1.selection.index),pnl2.grp19.cb3.value,pnl2.grp19.dd2.selection.text,strokeWth);
}
switch (Position){
case 1 : align('AdLf'); align('AdTp');activeDocument.activeLayer.translate(OffsetX,OffsetY); break;
case 2 : align('AdCH'); align('AdTp');activeDocument.activeLayer.translate(OffsetX,OffsetY); break;
case 3 : align( 'AdRg'); align('AdTp');activeDocument.activeLayer.translate(-OffsetX,OffsetY); break;
case 4 : align('AdLf'); align('AdCV'); activeDocument.activeLayer.translate(OffsetX,0);break;
case 5 : align('AdCH'); align('AdCV'); if(pnl2.grp5a.cb1.value) activeDocument.activeLayer.rotate(-45); break;
case 6 : align('AdRg'); align('AdCV');activeDocument.activeLayer.translate(-OffsetX,0); break;
case 7 : align('AdLf'); align('AdBt');activeDocument.activeLayer.translate(OffsetX,-OffsetY);break;
case 8 : align('AdCH'); align('AdBt');activeDocument.activeLayer.translate(OffsetX,-OffsetY); break;
case 9 : align('AdRg'); align('AdBt');activeDocument.activeLayer.translate(-OffsetX,-OffsetY); break;
default : break;
}
if(pnl2.grp22.cb1.value){
var LB = activeDocument.activeLayer.bounds;
var OPACITY= Number(pnl2.grp22.dd1.selection.index)+1;
if(OPACITY >100) Op=100;
var ColourBar = new SolidColor;
ColourBar.rgb.hexValue = pnl2.grp22.et1.text; 
var end = activeDocument.width;
var logoLayer= activeDocument.activeLayer;
activeDocument.selection.select([[0,LB[1]], [end,LB[1]], [end,LB[3]], [0, LB[3]]], SelectionType.REPLACE, 0, false);
var CbLayer = activeDocument.artLayers.add();
activeDocument.selection.fill(ColourBar, ColorBlendMode.NORMAL, OPACITY, false );
activeDocument.selection.deselect();
logoLayer.move(activeDocument.activeLayer, ElementPlacement.PLACEBEFORE);
    }
if(win.g27.cb1.value) doc.flatten();
}
switch(Number(win.g50.dd1.selection.index)){
    case 0 : saveFile = saveFileFolder + Name; break;
    case 1 : saveFile = saveFileFolder + Prefix + Name; break;
    case 2 : saveFile = saveFileFolder + Name + Suffix; break;
    case 3 : saveFile = saveFileFolder + Name + Seq1; break;
    case 4 : saveFile = saveFileFolder + NewName + Seq2; break;
    default : break;
    }
if(win.g60.cb1.value){
    if(doc.mode == DocumentMode.DUOTONE) doc.changeMode(ChangeMode.GRAYSCALE);
    SaveTIFF(saveFile,Number(win.g60.dd1.selection.index));
    }
if(win.g60.cb2.value) SavePSD(saveFile); 
activeDocument.pathItems.removeAll();
if(win.g60.cb3.value){
    if(doc.mode == DocumentMode.DUOTONE) doc.changeMode(ChangeMode.GRAYSCALE);
    saveAsPNG24SFW(saveFile);
    }
if(win.g60.cb4.value) {
    if(doc.mode == DocumentMode.DUOTONE) doc.changeMode(ChangeMode.GRAYSCALE);
    if(saveFile.exists) saveFile.remove();
    SaveJPEG(saveFile, (Number(win.g60.dd3.selection.index)+1));
    }
if (app.version.match(/\d+/) == 10 && win.g70.cb1.value){
        if(doc.mode == DocumentMode.DUOTONE) doc.changeMode(ChangeMode.GRAYSCALE);
        saveFile = File(saveFile+".jpg");
        var tmpFile = File(saveFile.path+"/qwertyuiop.jpg");
        if(tmpFile.exists) tmpFile.remove();
        SaveForWebCS3(tmpFile,(Number(win.g70.dd1.selection.index)+1),win.g70a.cb1.value);
        if(saveFile.exists) saveFile.remove();
        tmpFile.rename(decodeURI(saveFile.name));
}
if (app.version.match(/\d+/) > 10 && win.g70.cb1.value){
    var Quality = Number(win.g70.dd1.selection.index)+1;
    var Profile ='';
	if(win.g70a.cb2.value ? Profile = 'CHsR' : Profile = 'CHDc' );
    var MetaData = MetaList[Number(win.g70.dd2.selection.index)][1];
    var Progressive = 1;
    if(win.g70a.cb3.value)  Progressive = 3;
    var Embed = win.g70a.cb1.value;
    if(doc.mode == DocumentMode.DUOTONE) doc.changeMode(ChangeMode.GRAYSCALE);
        saveFile = File(saveFile+".jpg");
        var tmpFile = File(saveFile.path+"/qwertyuiop.jpg");
        if(tmpFile.exists) tmpFile.remove();
        CS4orCS5SFW(tmpFile,Quality,MetaData,Profile,Progressive,Embed);
        if(saveFile.exists) saveFile.remove();
        tmpFile.rename(decodeURI(saveFile.name));
}
if(win.g60.cb5.value){ 
    saveFile = File(saveFile+".gif");
     var tmpFile = File(saveFile.path+"/qwertyuiop.gif");
    GifSFW(tmpFile);
    tmpFile.rename(decodeURI(saveFile.name));
}
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}
app.preferences.rulerUnits = strtRulerUnits;  
app.preferences.typeUnits = strtTypeUnits;
}
function allDone(){
var bridgeError = new Window( 'dialog', 'Phew!' ); 
bridgeError.alignChildren="column";
b = bridgeError.graphics;
var myBrushb = b.newBrush(b.BrushType.SOLID_COLOR, [1.00, 1.00, 1.00, 1]);
b.backgroundColor = myBrushb;
bridgeError.title = bridgeError.add('statictext',undefined,'Process Completed');
bridgeError.title.alignment="bottom";
var g = bridgeError.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",30);
bridgeError.add('button',undefined,'Ok');
bridgeError.center();
bridgeError.show();
}
function getActionSets() { 
cTID = function(s) { return app.charIDToTypeID(s); }; 
sTID = function(s) { return app.stringIDToTypeID(s); }; 
  var i = 1; 
  var sets = [];  
  while (true) { 
    var ref = new ActionReference(); 
    ref.putIndex(cTID("ASet"), i); 
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
    if (desc.hasKey(cTID("Nm  "))) { 
      var set = {}; 
      set.index = i; 
      set.name = desc.getString(cTID("Nm  ")); 
      set.toString = function() { return this.name; }; 
      set.count = desc.getInteger(cTID("NmbC")); 
      set.actions = []; 
      for (var j = 1; j <= set.count; j++) { 
        var ref = new ActionReference(); 
        ref.putIndex(cTID('Actn'), j); 
        ref.putIndex(cTID('ASet'), set.index); 
        var adesc = executeActionGet(ref); 
        var actName = adesc.getString(cTID('Nm  ')); 
        set.actions.push(actName); 
      } 
      sets.push(set); 
    } 
    i++; 
  } 
  return sets; 
}; 

function getActions(aset) {
cTID = function(s) { return app.charIDToTypeID(s); }; 
sTID = function(s) { return app.stringIDToTypeID(s); };
  var i = 1;
  var names = [];
  if (!aset) {
    throw "Action set must be specified";
  }  
  while (true) {
    var ref = new ActionReference();
    ref.putIndex(cTID("ASet"), i);
    var desc;
    try {
      desc = executeActionGet(ref);
    } catch (e) {
      break;    
    }
    if (desc.hasKey(cTID("Nm  "))) {
      var name = desc.getString(cTID("Nm  "));
      if (name == aset) {
        var count = desc.getInteger(cTID("NmbC"));
        var names = [];
        for (var j = 1; j <= count; j++) {
          var ref = new ActionReference();
          ref.putIndex(cTID('Actn'), j);
          ref.putIndex(cTID('ASet'), i);
          var adesc = executeActionGet(ref);
          var actName = adesc.getString(cTID('Nm  '));
          names.push(actName);
        }
        break;
      }
    }
    i++;
  }
  return names;
};
function GetFilesFromBridge() {
function script(){
var fL = app.document.selections;
var tF=[];
for(var a in fL){
    if(fL[a].type =='file'){
        tF.push(new File(encodeURI(fL[a].spec.fsName)));
        }
    }
return tF.toSource();
}
	var fileList;
		var bt = new BridgeTalk();
		bt.target = "bridge";
        bt.body = "var ftn = " + script.toSource() + "; ftn();";
		bt.onResult = function( inBT ) { fileList = eval( inBT.body ); }
		bt.onError = function( inBT ) { fileList = new Array(); }
		bt.send(8);
		bt.pump();
	if ( undefined == fileList ) fileList = new Array();
	return fileList; 
}
function sortAlphaNum(a, b) {
	var x = a.split("/"); 
	var y = b.split("/");
	x = x[x.length-1].replace(/\\\s/g," ").split(/(\d+)/); 
	y = y[y.length-1].replace(/\\\s/g," ").split(/(\d+)/); 
	for (var i in x) {
		if (x[i] && !y[i] || isFinite(x[i]) && !isFinite(y[i])) {
			return -1;
		} else if (!x[i] && y[i] || !isFinite(y[i]) && isFinite(y[i])) {
			return 1;
		} else if (!isFinite(x[i]) && !isFinite(y[i])) {
			x[i] = x[i].toLowerCase();
			y[i] = y[i].toLowerCase();
			if (x[i] < y[i]) return -1;
			if (x[i] > y[i]) return 1;
		} else {
			x[i] = parseFloat(x[i]);
			y[i] = parseFloat(y[i]);
			if (x[i] < y[i]) return -1;
			if (x[i] > y[i]) return 1;
		}
	}
	return 0;
}
function FitImage( inWidth, inHeight ) {
	var desc = new ActionDescriptor();
	var unitPixels = charIDToTypeID( '#Pxl' );
	desc.putUnitDouble( charIDToTypeID( 'Wdth' ), unitPixels, inWidth );
	desc.putUnitDouble( charIDToTypeID( 'Hght' ), unitPixels, inHeight );
	var runtimeEventID = stringIDToTypeID( "3caa3434-cb67-11d1-bc43-0060b0a13dc4" );	
	executeAction( runtimeEventID, desc, DialogModes.NO );
};
function zeroPad(n, s) { 
n = n.toString(); 
while (n.length < s) n = '0' + n; 
return n; 
};
function SavePSD(saveFile){ 
psdSaveOptions = new PhotoshopSaveOptions(); 
psdSaveOptions.embedColorProfile = true; 
psdSaveOptions.alphaChannels = true;  
activeDocument.saveAs(File(saveFile+".psd"), psdSaveOptions, true, Extension.LOWERCASE); 
}
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
}
function SaveJPEG(saveFile, jpegQuality){
var doc = activeDocument;
RemoveAlphaChannels();
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
jpgSaveOptions = new JPEGSaveOptions();
jpgSaveOptions.embedColorProfile = true;
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
jpgSaveOptions.matte = MatteType.NONE;
jpgSaveOptions.quality = jpegQuality; 
activeDocument.saveAs(File(saveFile+".jpg"), jpgSaveOptions, true,Extension.LOWERCASE);
}
function SaveForWebCS3(saveFile,jpegQuality,Profile) {
var doc = activeDocument;
RemoveAlphaChannels();
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
if(Profile == undefined) Profile = false;
var sfwOptions = new ExportOptionsSaveForWeb(); 
   sfwOptions.format = SaveDocumentType.JPEG; 
   sfwOptions.includeProfile = Profile; 
   sfwOptions.interlaced = 0; 
   sfwOptions.optimized = true; 
   sfwOptions.quality = jpegQuality;
activeDocument.exportDocument(File(saveFile), ExportType.SAVEFORWEB, sfwOptions);
}
function saveAsPNG24SFW(saveFile) {
var doc = activeDocument;
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
    var desc3 = new ActionDescriptor();
        var desc4 = new ActionDescriptor();
        desc4.putEnumerated( charIDToTypeID('Op  '), charIDToTypeID('SWOp'), charIDToTypeID('OpSa') );
        desc4.putEnumerated( charIDToTypeID('Fmt '), charIDToTypeID('IRFm'), charIDToTypeID('PN24') );
        desc4.putBoolean( charIDToTypeID('Intr'), false );
        desc4.putBoolean( charIDToTypeID('Trns'), true );
        desc4.putBoolean( charIDToTypeID('Mtt '), false );
        desc4.putInteger( charIDToTypeID('MttR'), 255 );
        desc4.putInteger( charIDToTypeID('MttG'), 255 );
        desc4.putInteger( charIDToTypeID('MttB'), 255 );
        desc4.putBoolean( charIDToTypeID('SHTM'), false );
        desc4.putBoolean( charIDToTypeID('SImg'), true );
        desc4.putBoolean( charIDToTypeID('SSSO'), false );
            var list1 = new ActionList();
        desc4.putList( charIDToTypeID('SSLt'), list1 );
        desc4.putBoolean( charIDToTypeID('DIDr'), false );
        desc4.putPath( charIDToTypeID('In  '), new File( saveFile+".png" ) );
    desc3.putObject( charIDToTypeID('Usng'), stringIDToTypeID('SaveForWeb'), desc4 );
    executeAction( charIDToTypeID('Expr'), desc3, DialogModes.NO );
};
function GifSFW(saveFile) {
var doc = activeDocument;
RemoveAlphaChannels();
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
    var desc21 = new ActionDescriptor();
        var desc22 = new ActionDescriptor();
        desc22.putEnumerated( charIDToTypeID('Op  '), charIDToTypeID('SWOp'), charIDToTypeID('OpSa') );
        desc22.putBoolean( charIDToTypeID('DIDr'), false );
        desc22.putPath( charIDToTypeID('In  '), new File( saveFile ) );
        desc22.putEnumerated( charIDToTypeID('Fmt '), charIDToTypeID('IRFm'), charIDToTypeID('GIFf') );
        desc22.putBoolean( charIDToTypeID('Intr'), true );
        desc22.putEnumerated( charIDToTypeID('RedA'), charIDToTypeID('IRRd'), charIDToTypeID('Sltv') );
        desc22.putBoolean( charIDToTypeID('RChT'), false );
        desc22.putBoolean( charIDToTypeID('RChV'), false );
        desc22.putBoolean( charIDToTypeID('AuRd'), false );
        desc22.putInteger( charIDToTypeID('NCol'), 256 );//number of colours
        desc22.putEnumerated( charIDToTypeID('Dthr'), charIDToTypeID('IRDt'), charIDToTypeID('Dfsn') );
        desc22.putInteger( charIDToTypeID('DthA'), 100 );
        desc22.putInteger( charIDToTypeID('DChS'), 0 );
        desc22.putInteger( charIDToTypeID('DCUI'), 0 );
        desc22.putBoolean( charIDToTypeID('DChT'), false );
        desc22.putBoolean( charIDToTypeID('DChV'), false );
        desc22.putInteger( charIDToTypeID('WebS'), 0 );
        desc22.putEnumerated( charIDToTypeID('TDth'), charIDToTypeID('IRDt'), charIDToTypeID('None') );
        desc22.putInteger( charIDToTypeID('TDtA'), 100 );
        desc22.putInteger( charIDToTypeID('Loss'), 60 );//amount of loss
        desc22.putInteger( charIDToTypeID('LChS'), 0 );
        desc22.putInteger( charIDToTypeID('LCUI'), 100 );
        desc22.putBoolean( charIDToTypeID('LChT'), false );
        desc22.putBoolean( charIDToTypeID('LChV'), false );
        desc22.putBoolean( charIDToTypeID('Trns'), true );
        desc22.putBoolean( charIDToTypeID('Mtt '), false );
        desc22.putInteger( charIDToTypeID('MttR'), 255 );
        desc22.putInteger( charIDToTypeID('MttG'), 255 );
        desc22.putInteger( charIDToTypeID('MttB'), 255 );
        desc22.putBoolean( charIDToTypeID('SHTM'), false );
        desc22.putBoolean( charIDToTypeID('SImg'), true );
        desc22.putEnumerated( charIDToTypeID('SWsl'), charIDToTypeID('STsl'), charIDToTypeID('SLAl') );
        desc22.putEnumerated( charIDToTypeID('SWch'), charIDToTypeID('STch'), charIDToTypeID('CHsR') );
        desc22.putEnumerated( charIDToTypeID('SWmd'), charIDToTypeID('STmd'), charIDToTypeID('MDNn') );
        desc22.putBoolean( charIDToTypeID('ohXH'), false );
        desc22.putBoolean( charIDToTypeID('ohIC'), true );
        desc22.putBoolean( charIDToTypeID('ohAA'), true );
        desc22.putBoolean( charIDToTypeID('ohQA'), true );
        desc22.putBoolean( charIDToTypeID('ohCA'), false );
        desc22.putBoolean( charIDToTypeID('ohIZ'), true );
        desc22.putEnumerated( charIDToTypeID('ohTC'), charIDToTypeID('SToc'), charIDToTypeID('OC03') );
        desc22.putEnumerated( charIDToTypeID('ohAC'), charIDToTypeID('SToc'), charIDToTypeID('OC03') );
        desc22.putInteger( charIDToTypeID('ohIn'), -1 );
        desc22.putEnumerated( charIDToTypeID('ohLE'), charIDToTypeID('STle'), charIDToTypeID('LE03') );
        desc22.putEnumerated( charIDToTypeID('ohEn'), charIDToTypeID('STen'), charIDToTypeID('EN00') );
        desc22.putBoolean( charIDToTypeID('olCS'), false );
        desc22.putEnumerated( charIDToTypeID('olEC'), charIDToTypeID('STst'), charIDToTypeID('ST00') );
        desc22.putEnumerated( charIDToTypeID('olWH'), charIDToTypeID('STwh'), charIDToTypeID('WH01') );
        desc22.putEnumerated( charIDToTypeID('olSV'), charIDToTypeID('STsp'), charIDToTypeID('SP04') );
        desc22.putEnumerated( charIDToTypeID('olSH'), charIDToTypeID('STsp'), charIDToTypeID('SP04') );
            var list3 = new ActionList();
                var desc23 = new ActionDescriptor();
                desc23.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC00') );
            list3.putObject( charIDToTypeID('SCnc'), desc23 );
                var desc24 = new ActionDescriptor();
                desc24.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC19') );
            list3.putObject( charIDToTypeID('SCnc'), desc24 );
                var desc25 = new ActionDescriptor();
                desc25.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC28') );
            list3.putObject( charIDToTypeID('SCnc'), desc25 );
                var desc26 = new ActionDescriptor();
                desc26.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC24') );
            list3.putObject( charIDToTypeID('SCnc'), desc26 );
                var desc27 = new ActionDescriptor();
                desc27.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC24') );
            list3.putObject( charIDToTypeID('SCnc'), desc27 );
                var desc28 = new ActionDescriptor();
                desc28.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC24') );
            list3.putObject( charIDToTypeID('SCnc'), desc28 );
        desc22.putList( charIDToTypeID('olNC'), list3 );
        desc22.putBoolean( charIDToTypeID('obIA'), false );
        desc22.putString( charIDToTypeID('obIP'), "" );
        desc22.putEnumerated( charIDToTypeID('obCS'), charIDToTypeID('STcs'), charIDToTypeID('CS01') );
            var list4 = new ActionList();
                var desc29 = new ActionDescriptor();
                desc29.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC01') );
            list4.putObject( charIDToTypeID('SCnc'), desc29 );
                var desc30 = new ActionDescriptor();
                desc30.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC20') );
            list4.putObject( charIDToTypeID('SCnc'), desc30 );
                var desc31 = new ActionDescriptor();
                desc31.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC02') );
            list4.putObject( charIDToTypeID('SCnc'), desc31 );
                var desc32 = new ActionDescriptor();
                desc32.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC19') );
            list4.putObject( charIDToTypeID('SCnc'), desc32 );
                var desc33 = new ActionDescriptor();
                desc33.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC06') );
            list4.putObject( charIDToTypeID('SCnc'), desc33 );
                var desc34 = new ActionDescriptor();
                desc34.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC24') );
            list4.putObject( charIDToTypeID('SCnc'), desc34 );
                var desc35 = new ActionDescriptor();
                desc35.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC24') );
            list4.putObject( charIDToTypeID('SCnc'), desc35 );
                var desc36 = new ActionDescriptor();
                desc36.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC24') );
            list4.putObject( charIDToTypeID('SCnc'), desc36 );
                var desc37 = new ActionDescriptor();
                desc37.putEnumerated( charIDToTypeID('ncTp'), charIDToTypeID('STnc'), charIDToTypeID('NC22') );
            list4.putObject( charIDToTypeID('SCnc'), desc37 );
        desc22.putList( charIDToTypeID('ovNC'), list4 );
        desc22.putBoolean( charIDToTypeID('ovCM'), false );
        desc22.putBoolean( charIDToTypeID('ovCW'), true );
        desc22.putBoolean( charIDToTypeID('ovCU'), true );
        desc22.putBoolean( charIDToTypeID('ovSF'), true );
        desc22.putBoolean( charIDToTypeID('ovCB'), true );
        desc22.putString( charIDToTypeID('ovSN'), "images" );
    desc21.putObject( charIDToTypeID('Usng'), stringIDToTypeID('SaveForWeb'), desc22 );
    executeAction( charIDToTypeID('Expr'), desc21, DialogModes.NO );
};
function CS4orCS5SFW(FileName,Quality,MetaData,Profile,Progressive,Embed) {
var doc = activeDocument;
RemoveAlphaChannels();
if (doc.bitsPerChannel != BitsPerChannelType.EIGHT) doc.bitsPerChannel = BitsPerChannelType.EIGHT;
    var desc7 = new ActionDescriptor();
        var desc8 = new ActionDescriptor();
        desc8.putEnumerated( charIDToTypeID('Op  '), charIDToTypeID('SWOp'), charIDToTypeID('OpSa') );
        desc8.putEnumerated( charIDToTypeID('Fmt '), charIDToTypeID('IRFm'), charIDToTypeID('JPEG') );
        desc8.putBoolean( charIDToTypeID('Intr'), false );
        desc8.putInteger( charIDToTypeID('Qlty'), Quality );
        desc8.putInteger( charIDToTypeID('QChS'), 0 );
        desc8.putInteger( charIDToTypeID('QCUI'), 0 );
        desc8.putBoolean( charIDToTypeID('QChT'), false );
        desc8.putBoolean( charIDToTypeID('QChV'), false );
        desc8.putBoolean( charIDToTypeID('Optm'), true );
        desc8.putInteger( charIDToTypeID('Pass'), Progressive ); 
        desc8.putDouble( charIDToTypeID('blur'), 0.000000 );
        desc8.putBoolean( charIDToTypeID('EICC'), Embed ); 
        desc8.putBoolean( charIDToTypeID('Mtt '), false );
        desc8.putInteger( charIDToTypeID('MttR'), 255 );
        desc8.putInteger( charIDToTypeID('MttG'), 255 );
        desc8.putInteger( charIDToTypeID('MttB'), 255 );
        desc8.putBoolean( charIDToTypeID('SHTM'), false );
        desc8.putBoolean( charIDToTypeID('SImg'), true );
        desc8.putEnumerated( charIDToTypeID('SWch'), charIDToTypeID('STch'), charIDToTypeID(Profile) );
        desc8.putEnumerated( charIDToTypeID('SWmd'), charIDToTypeID('STmd'), charIDToTypeID(MetaData) );
        desc8.putBoolean( charIDToTypeID('SSSO'), false );
            var list2 = new ActionList();
        desc8.putList( charIDToTypeID('SSLt'), list2 );
        desc8.putBoolean( charIDToTypeID('DIDr'), false );
        desc8.putPath( charIDToTypeID('In  '), new File( FileName) );
    desc7.putObject( charIDToTypeID('Usng'), stringIDToTypeID('SaveForWeb'), desc8 );
    executeAction( charIDToTypeID('Expr'), desc7, DialogModes.NO );
};
function createRelativeFolder(newTopLevelFolder, existingFolder){
var PathBits = decodeURI(newTopLevelFolder).toString().split('/');
var TmpArray = decodeURI(existingFolder).toString().split('/');
for(var a = 2;a<TmpArray.length;a++){
    PathBits.push(TmpArray[a]);
    }
for(var a = 2;a<PathBits.length;a++){
 var newFolder = '';
  for( var s = 0;s<a+1;s++){
      newFolder +=  PathBits[s].toString() +'/';
      }
 var toCreate = Folder(newFolder);
    if(!toCreate.exists) toCreate.create();
    }
return toCreate;
}
function processFolder(folder) {
    var fileList = folder.getFiles()
     for (var i = 0; i < fileList.length; i++) {
        var file = fileList[i];
if (file instanceof Folder) {	
	folderList.push(file);  
    processFolder(file);
	   }
   }
}
function RemoveAlphaChannels() {
	var channels = app.activeDocument.channels;
	var channelCount = channels.length - 1;
	while ( channels[channelCount].kind != ChannelType.COMPONENT ) {
		channels[channelCount].remove();
		channelCount--;
	}
}
function ReturnUniqueSortedList(ArrayName,NotCaseSensitive){
var unduped = new Object;
for (var i in ArrayName.sort()) {   
if(NotCaseSensitive){
unduped[ArrayName[i].toLocaleLowerCase()] = ArrayName[i];
}else{
    unduped[ArrayName[i]] = ArrayName[i];
    }
}
var uniques = new Array;
for (var k in unduped) {
   uniques.push(unduped[k]);
   }
return uniques;
}
};
function align(method) { 
activeDocument.selection.selectAll();
   var desc = new ActionDescriptor();
           var ref = new ActionReference();
           ref.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) ); 
       desc.putReference( charIDToTypeID( "null" ), ref ); 
       desc.putEnumerated( charIDToTypeID( "Usng" ), charIDToTypeID( "ADSt" ), charIDToTypeID( method ) );
	   try{
   executeAction( charIDToTypeID( "Algn" ), desc, DialogModes.NO ); 
   }catch(e){}
   activeDocument.selection.deselect();
};
function emboss(Opacity,Stroke,Colour,strokeWth) {
	if(Colour == undefined) Colour = "Black";
	if(Stroke == undefined) Stroke = false;
	if(Opacity == undefined) Opacity = 100;
    var desc32 = new ActionDescriptor();
        var ref5 = new ActionReference();
        ref5.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc32.putReference( charIDToTypeID('null'), ref5 );
        var desc33 = new ActionDescriptor();
        desc33.putUnitDouble( stringIDToTypeID('fillOpacity'), charIDToTypeID('#Prc'), Opacity );
            var desc34 = new ActionDescriptor();
            desc34.putUnitDouble( charIDToTypeID('Scl '), charIDToTypeID('#Prc'), 416.666667 );
                var desc35 = new ActionDescriptor();
                desc35.putBoolean( charIDToTypeID('enab'), true );
                desc35.putEnumerated( charIDToTypeID('hglM'), charIDToTypeID('BlnM'), charIDToTypeID('Scrn') );
                    var desc36 = new ActionDescriptor();
                    desc36.putDouble( charIDToTypeID('Rd  '), 255.000000 );
                    desc36.putDouble( charIDToTypeID('Grn '), 255.000000 );
                    desc36.putDouble( charIDToTypeID('Bl  '), 255.000000 );
                desc35.putObject( charIDToTypeID('hglC'), charIDToTypeID('RGBC'), desc36 );
                desc35.putUnitDouble( charIDToTypeID('hglO'), charIDToTypeID('#Prc'), 75.000000 );
                desc35.putEnumerated( charIDToTypeID('sdwM'), charIDToTypeID('BlnM'), charIDToTypeID('Mltp') );
                    var desc37 = new ActionDescriptor();
                    desc37.putDouble( charIDToTypeID('Rd  '), 35.042620 );
                    desc37.putDouble( charIDToTypeID('Grn '), 31.313698 );
                    desc37.putDouble( charIDToTypeID('Bl  '), 32.150531 );
                desc35.putObject( charIDToTypeID('sdwC'), charIDToTypeID('RGBC'), desc37 );
                desc35.putUnitDouble( charIDToTypeID('sdwO'), charIDToTypeID('#Prc'), 75.000000 );
                desc35.putEnumerated( charIDToTypeID('bvlT'), charIDToTypeID('bvlT'), charIDToTypeID('PrBL') );
                desc35.putEnumerated( charIDToTypeID('bvlS'), charIDToTypeID('BESl'), charIDToTypeID('InrB') );
                desc35.putBoolean( charIDToTypeID('uglg'), true );
                desc35.putUnitDouble( charIDToTypeID('lagl'), charIDToTypeID('#Ang'), 120.000000 );
                desc35.putUnitDouble( charIDToTypeID('Lald'), charIDToTypeID('#Ang'), 30.000000 );
                desc35.putUnitDouble( charIDToTypeID('srgR'), charIDToTypeID('#Prc'), 100.000000 );
                desc35.putUnitDouble( charIDToTypeID('blur'), charIDToTypeID('#Pxl'), 20.000000 );
                desc35.putEnumerated( charIDToTypeID('bvlD'), charIDToTypeID('BESs'), charIDToTypeID('In  ') );
                    var desc38 = new ActionDescriptor();
                    desc38.putString( charIDToTypeID('Nm  '), "Linear" );
                desc35.putObject( charIDToTypeID('TrnS'), charIDToTypeID('ShpC'), desc38 );
                desc35.putBoolean( stringIDToTypeID('antialiasGloss'), false );
                desc35.putUnitDouble( charIDToTypeID('Sftn'), charIDToTypeID('#Pxl'), 0.000000 );
                desc35.putBoolean( stringIDToTypeID('useShape'), false );
                desc35.putBoolean( stringIDToTypeID('useTexture'), false );
            desc34.putObject( charIDToTypeID('ebbl'), charIDToTypeID('ebbl'), desc35 );
                var desc39 = new ActionDescriptor();
                desc39.putBoolean( charIDToTypeID('enab'), Stroke );
                desc39.putEnumerated( charIDToTypeID('Styl'), charIDToTypeID('FStl'), charIDToTypeID('OutF') );
                desc39.putEnumerated( charIDToTypeID('PntT'), charIDToTypeID('FrFl'), charIDToTypeID('SClr') );
                desc39.putEnumerated( charIDToTypeID('Md  '), charIDToTypeID('BlnM'), charIDToTypeID('Nrml') );
                desc39.putUnitDouble( charIDToTypeID('Opct'), charIDToTypeID('#Prc'), 100.000000 );
                desc39.putUnitDouble( charIDToTypeID('Sz  '), charIDToTypeID('#Pxl'), strokeWth );
                    var desc40 = new ActionDescriptor();
					switch(Colour){
						case "Black" : RED = 0; GREEN = 0;BLUE =0; break;
						case "White" : RED = 255; GREEN = 255;BLUE =255; break;
						case "Red" : RED = 255; GREEN = 0;BLUE =0; break;
						case "Green" : RED = 0; GREEN = 255;BLUE =0; break;
						case "Blue" : RED = 0; GREEN = 0;BLUE =255; break;
						default :  RED = 0; GREEN = 0;BLUE =0; break;
						}					
                    desc40.putDouble( charIDToTypeID('Rd  '), RED );
                    desc40.putDouble( charIDToTypeID('Grn '), GREEN );
                    desc40.putDouble( charIDToTypeID('Bl  '), BLUE );
                desc39.putObject( charIDToTypeID('Clr '), charIDToTypeID('RGBC'), desc40 );
            desc34.putObject( charIDToTypeID('FrFX'), charIDToTypeID('FrFX'), desc39 );
        desc33.putObject( charIDToTypeID('Lefx'), charIDToTypeID('Lefx'), desc34 );
    desc32.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc33 );
    executeAction( charIDToTypeID('setd'), desc32, DialogModes.NO );
};
function StrokeText(Colour,strokeWth){
switch(Colour){
		case "Black" : RED = 0; GREEN = 0;BLUE =0; break;
        case "White" : RED = 255; GREEN = 255;BLUE =255; break;
		case "Red" : RED = 255; GREEN = 0;BLUE =0; break;
		case "Green" : RED = 0; GREEN = 255;BLUE =0; break;
		case "Blue" : RED = 0; GREEN = 0;BLUE =255; break;
		default :  RED = 0; GREEN = 0;BLUE =0; break;
}
   var desc205 = new ActionDescriptor();
        var ref149 = new ActionReference();
        ref149.putProperty( charIDToTypeID('Prpr'), charIDToTypeID('Lefx') );
        ref149.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc205.putReference( charIDToTypeID('null'), ref149 );
        var desc206 = new ActionDescriptor();
        desc206.putUnitDouble( charIDToTypeID('Scl '), charIDToTypeID('#Prc'), 416.666667 );
            var desc207 = new ActionDescriptor();
            desc207.putBoolean( charIDToTypeID('enab'), true );
            desc207.putEnumerated( charIDToTypeID('Styl'), charIDToTypeID('FStl'), charIDToTypeID('InsF') );
            desc207.putEnumerated( charIDToTypeID('PntT'), charIDToTypeID('FrFl'), charIDToTypeID('SClr') );
            desc207.putEnumerated( charIDToTypeID('Md  '), charIDToTypeID('BlnM'), charIDToTypeID('Nrml') );
            desc207.putUnitDouble( charIDToTypeID('Opct'), charIDToTypeID('#Prc'), 100.000000 );
            desc207.putUnitDouble( charIDToTypeID('Sz  '), charIDToTypeID('#Pxl'), strokeWth );
                var desc208 = new ActionDescriptor();
                desc208.putDouble( charIDToTypeID('Rd  '), RED );
                desc208.putDouble( charIDToTypeID('Grn '), GREEN );
                desc208.putDouble( charIDToTypeID('Bl  '), BLUE );
            desc207.putObject( charIDToTypeID('Clr '), charIDToTypeID('RGBC'), desc208 );
        desc206.putObject( charIDToTypeID('FrFX'), charIDToTypeID('FrFX'), desc207 );
    desc205.putObject( charIDToTypeID('T   '), charIDToTypeID('Lefx'), desc206 );
    executeAction( charIDToTypeID('setd'), desc205, DialogModes.NO );
}
function placeLogo(file) {
    var desc124 = new ActionDescriptor();
    desc124.putPath( charIDToTypeID('null'), new File( file ) );
    desc124.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );
        var desc125 = new ActionDescriptor();
        desc125.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );
        desc125.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );
    desc124.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc125 );
    desc124.putBoolean( charIDToTypeID('AntA'), true );
    executeAction( charIDToTypeID('Plc '), desc124, DialogModes.NO );
};
function colourPicker(HEXvalue){
var startColor = new SolidColor; 
startColor.rgb.hexValue =HEXvalue;
var originalUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;
var colourDoc = app.documents.add(10, 10, 72, null, NewDocumentMode.RGB, DocumentFill.WHITE);
app.activeDocument.selection.select([[0,0],[1,0],[1,1],[0,1]]);
app.preferences.rulerUnits = originalUnits;
    CreateSolidLayer();
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( stringIDToTypeID( "contentLayer" ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Trgt" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
    var modeDesc = new ActionDescriptor();
        var colorDesc = new ActionDescriptor();
            colorDesc.putDouble( charIDToTypeID( "Rd  " ), startColor.rgb.red );
            colorDesc.putDouble( charIDToTypeID( "Grn " ), startColor.rgb.green );
            colorDesc.putDouble( charIDToTypeID( "Bl  " ), startColor.rgb.blue );
        modeDesc.putObject( charIDToTypeID( "Clr " ), charIDToTypeID( "RGBC" ), colorDesc );
    desc.putObject( charIDToTypeID( "T   " ), stringIDToTypeID( "solidColorLayer" ), modeDesc );
try{
    executeAction( charIDToTypeID( "setd" ), desc, DialogModes.ALL )
}catch(e){colourDoc.close(SaveOptions.DONOTSAVECHANGES); return;}
    var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
    var desc = executeActionGet(ref)
    var adjList = desc.getList(stringIDToTypeID('adjustment'));
    var adjDesc = adjList.getObjectValue(0);
    var colorDesc = adjDesc.getObjectValue(stringIDToTypeID('color'));
    var Colour = new SolidColor();
        Colour.rgb.red = colorDesc.getDouble(charIDToTypeID('Rd  '));
        Colour.rgb.green = colorDesc.getDouble(charIDToTypeID('Grn '));
        Colour.rgb.blue = colorDesc.getDouble(charIDToTypeID('Bl  '));
 colourDoc.close(SaveOptions.DONOTSAVECHANGES);
  return Colour.rgb.hexValue;
};
function getCopyRightNotice(){
if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
xmp = new XMPMeta( app.activeDocument.xmpMetadata.rawData);
var CopyRightNotice =xmp.getLocalizedText( XMPConst.NS_DC, "rights", null, "x-default" );
return CopyRightNotice;
}
function CreateSolidLayer() {
        var startColor = app.foregroundColor;
        var desc = new ActionDescriptor();
            var ref = new ActionReference();
            ref.putClass( stringIDToTypeID('contentLayer') );
        desc.putReference( charIDToTypeID('null'), ref );
            var desc1 = new ActionDescriptor();
                var desc2 = new ActionDescriptor();
                    var desc3 = new ActionDescriptor();
                    desc3.putDouble( charIDToTypeID('Rd  '), startColor.rgb.red );
                    desc3.putDouble( charIDToTypeID('Grn '), startColor.rgb.green );
                    desc3.putDouble( charIDToTypeID('Bl  '), startColor.rgb.blue );
                desc2.putObject( charIDToTypeID('Clr '), charIDToTypeID('RGBC'), desc3 );
            desc1.putObject( charIDToTypeID('Type'), stringIDToTypeID('solidColorLayer'), desc2 );
        desc.putObject( charIDToTypeID('Usng'), stringIDToTypeID('contentLayer'), desc1 );
        executeAction( charIDToTypeID('Mk  '), desc, DialogModes.NO );
};
if (app.version.match(/\d+/) <10){
    alert("Sorry but this script needs CS3 or better");
    }else{
main();
}