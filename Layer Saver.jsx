#target photoshop
function main(){
if(!documents.length) return;
if(activeDocument.layers.length == 1) return;
var Prefs ={};
try{
  var desc1 = app.getCustomOptions('ed0f5560-dfb3-11e0-9572-0800200c9a66');
  Prefs = eval(desc1.getString(0));
    }catch(e){
Prefs={
 saveType:0,
 tiffComp:0,
 jpgQual:11,
 jpgsfwQual:79,
 FileName:0,
 merge:false,
 trim:false,
 rUnits:0,
 rMethod:0,
 Folder1:decodeURI(app.activeDocument.path)
};
}
var doc = activeDocument;
var LSets = activeDocument.layerSets.length;
var LSetsVis=[];
var ArtLayers = activeDocument.artLayers.length;
var NoOfLayers = activeDocument.layers.length;
var Back = hasBackground();
var hasTop = false;
var selLayers =getSelectedLayersIdx();
var selGroups=[];
if(LSets>0){
    for(var s in selLayers){
   if(isLayerSet(selLayers[s])) selGroups.push(selLayers[s]);
        }
    }
if(activeDocument.layers[0].typename == 'ArtLayer') hasTop = true;
var win = new Window('dialog','Layer Saver');
//Photoshop CS6 or CC has a bug in the font size, so it won't fit on a laptop screen so use row.
if(app.version.match(/\d+/) >= 13 && $.screens[0].bottom < 800 ){
win.orientation = "row";
}
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
g.backgroundColor = myBrush;
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.p1.preferredSize=[500,260];
win.g1 = win.p1.add('group');
win.g1.orientation = "row";
win.title = win.g1.add('statictext',undefined,'Layer Saver');
win.title.alignment="fill";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
win.g5 =win.p1.add('group');
win.g5.orientation = "column";
win.g5.alignChildren='left';
win.g5.spacing=0;
if(LSets  == 0){
win.g5.rb1 = win.g5.add('radiobutton',undefined,'Save selected layers');
win.g5.rb2 = win.g5.add('radiobutton',undefined,'Save selected layers along with the top layer');
win.g5.rb3 = win.g5.add('radiobutton',undefined,'Save selected layers along with background layer');
win.g5.rb4 = win.g5.add('radiobutton',undefined,'Save all layers');
win.g5.rb5 = win.g5.add('radiobutton',undefined,'Save all layers along with the top layer');
win.g5.rb6 = win.g5.add('radiobutton',undefined,'Save all layers along with background layer');
win.g5.rb7 = win.g5.add('radiobutton',undefined,'Save all layers along with bottom layer');
win.g5.rb8 = win.g5.add('radiobutton',undefined,'Save selected layers along with bottom layer');
win.g5.rb9 = win.g5.add('radiobutton',undefined,'Save selected layers along with top and background layers');
win.g5.rb3.enabled=Back;
win.g5.rb6.enabled=Back;
win.g5.rb7.enabled=!Back;
win.g5.rb8.enabled=!Back;
win.g5.rb9.enabled=Back;
win.g5.rb4.value=true;
}else{
win.g5.rb1 = win.g5.add('radiobutton',undefined,'Save selected layerSets');
win.g5.rb2 = win.g5.add('radiobutton',undefined,'Save selected layerSets along with the top layer');
win.g5.rb3 = win.g5.add('radiobutton',undefined,'Save selected layerSets along with background layer');
win.g5.rb4 = win.g5.add('radiobutton',undefined,'Save all layerSets');
win.g5.rb5 = win.g5.add('radiobutton',undefined,'Save all layerSets along with the top layer');
win.g5.rb6 = win.g5.add('radiobutton',undefined,'Save all layerSets along with background layer');
win.g5.rb7 = win.g5.add('radiobutton',undefined,'Save all layerSets along with top layerset');
win.g5.rb8 = win.g5.add('radiobutton',undefined,'Save all layerSets along with bottom layerset');
win.g5.rb9 = win.g5.add('radiobutton',undefined,'Save all layerSets along with top and bottom layersets');
win.g5.rb10 = win.g5.add('radiobutton',undefined,'Save all layers within all layerSets');
win.g5.rb4a = win.g5.add('checkbox',undefined,'Save all layerSets along with selected layers');
win.g5.rb4a.helpTip="No LayerSets should be selected!\rOnly layers to be saved with each LayerSet";
win.g5.rb3.enabled=Back;
win.g5.rb6.enabled=Back;
win.g5.rb2.enabled=hasTop;
win.g5.rb5.enabled=hasTop;
if(LSets < 3){
    win.g5.rb7.enabled=false;
    win.g5.rb8.enabled=false;
    }
if(LSets < 4){
    win.g5.rb9.enabled=false;
    }
if(selGroups.length <1){
    win.g5.rb1.enabled=false;
    win.g5.rb2.enabled=false;
    win.g5.rb3.enabled=false;
    }
win.g5.rb4.value=true;
    }
win.p2 = win.add("panel", undefined, undefined, {borderStyle:"black"});
win.p2.preferredSize=[500,260];
win.p2.st1 = win.p2.add('statictext',undefined,'Output details');
win.p2.st1.graphics.font = ScriptUI.newFont("Tahoma", "Bold", 18);
win.g10 =win.p2.add('group');
win.g10.orientation = "row";
win.g10.alignment='left';
win.g10.et1 = win.g10.add('edittext');
win.g10.et1.preferredSize=[350,20];
win.g10.et1.enabled=false;
win.g10.bu1 = win.g10.add('button',undefined,'Select Folder');
win.g10.bu1.onClick=function(){
Folder1 = Folder(Prefs.Folder1);
outputFolder = Folder.selectDialog("Please select the output folder",Folder1);	
	if(outputFolder !=null){
		win.g10.et1.text =  decodeURI(outputFolder.fsName); 
		}
}
if(Folder(Prefs.Folder1).exists){
    outputFolder= Folder(Prefs.Folder1);
    win.g10.et1.text =  decodeURI(outputFolder.fsName);
    }
win.g12 =win.p2.add('group');
win.g12.orientation = "row";
win.g12.alignment='left';
win.g12.cb1 = win.g12.add('checkbox',undefined,'Merge Visible Layers?');
win.g12.cb1.value = Prefs.merge;
win.g12.cb2 = win.g12.add('checkbox',undefined,'Trim Layer');
win.g12.cb2.value=Prefs.trim;

win.g11 =win.p2.add('group');
win.g11.spacing=10;
win.g11.orientation = 'row';
win.g11.alignment="left";
win.g11.cb1 = win.g11.add('checkbox',undefined,'Run Action');
win.g11.dd1 = win.g11.add('dropdownlist');
win.g11.dd1.preferredSize=[150,20];
win.g11.dd2 = win.g11.add('dropdownlist');
win.g11.dd2.preferredSize=[150,20];
win.g11.dd1.enabled=false; 
win.g11.dd2.enabled=false;
win.g11.cb1.onClick = function(){
    if(win.g11.cb1.value){
        win.g11.dd1.enabled=true;
        win.g11.dd2.enabled=true;   
        }else{
            win.g11.dd1.enabled=false;
            win.g11.dd2.enabled=false;
            }
}
var actions = new Array();
var actionSets= new Array();
actionSets = getActionSets();
for (var i=0,len=actionSets.length;i<len;i++) {
	win.g11.dd1.add ('item', "" + actionSets[i]);  
}; 
win.g11.dd1.selection=0;
actions = getActions(actionSets[0]);
for (var i=0,len=actions.length;i<len;i++) {
	win.g11.dd2.add ('item', "" + actions[i]);    
};
win.g11.dd2.selection=0;
win.g11.dd1.onChange = function() {
win.g11.dd2.removeAll();
actions = getActions(actionSets[parseInt(this.selection)]);
for (var i=0,len=actions.length;i<len;i++) {
	win.g11.dd2.add ('item', "" + actions[i]);  
	}
	win.g11.dd2.selection=0;
};
win.g14 =win.p2.add('group');
win.g14.orientation = "row";
win.g14.alignment='left';
win.g14.cb1 = win.g14.add('checkbox',undefined,'Add Suffix/Prefix');
win.g14.rb1 = win.g14.add('radiobutton',undefined,'Prefix');
win.g14.rb2 = win.g14.add('radiobutton',undefined,'Suffix');
win.g14.rb2.value=true;
win.g15 =win.p2.add('group');
win.g15.orientation = "row";
win.g15.alignment='left';
var Options= ["Layer/Group Name","FileName + Sequence No.","FileName + Layer/Group Name ","User Defined with Sequence No.","Group Name + LayerName"];
win.g15.st1 = win.g15.add('statictext',undefined,'Save Options..');
win.g15.dd1 = win.g15.add('dropdownlist',undefined,Options);
win.g15.dd1.remove(4);
if(Number(Prefs.FileName) == 4) Prefs.FileName = 0;
win.g15.dd1.selection=Number(Prefs.FileName);
if(LSets > 0){
win.g5.rb1.onClick=function(){
    win.g5.rb4a.value=false;
        win.g5.rb4a.enabled=false;
    win.g5.rb10.onClick();
    }
win.g5.rb2.onClick=function(){
    win.g5.rb4a.value=false;
        win.g5.rb4a.enabled=false;
    win.g5.rb10.onClick();
    }
win.g5.rb2.onClick=function(){
    win.g5.rb4a.value=false;
        win.g5.rb4a.enabled=false;
    win.g5.rb10.onClick();
    }
win.g5.rb3.onClick=function(){
    win.g5.rb4a.value=false;
        win.g5.rb4a.enabled=false;
    win.g5.rb10.onClick();
    }
win.g5.rb4.onClick=function(){
    if(win.g5.rb4.value){
    win.g5.rb4a.enabled=true;
    }
    win.g5.rb10.onClick();
    }
win.g5.rb5.onClick=function(){
   win.g5.rb4a.value=false;
        win.g5.rb4a.enabled=false;
    win.g5.rb10.onClick();
    }
win.g5.rb6.onClick=function(){
    win.g5.rb4a.value=false;
        win.g5.rb4a.enabled=false;
    win.g5.rb10.onClick();
    }
win.g5.rb7.onClick=function(){
    win.g5.rb4a.value=false;
        win.g5.rb4a.enabled=false;
    win.g5.rb10.onClick();
    }
win.g5.rb8.onClick=function(){
    win.g5.rb4a.value=false;
        win.g5.rb4a.enabled=false;
    win.g5.rb10.onClick();
    }
win.g5.rb9.onClick=function(){
    win.g5.rb4a.value=false;
        win.g5.rb4a.enabled=false;
    win.g5.rb10.onClick();
    }
win.g15.dd1.add('item','Group Name + LayerName');
win.g5.rb10.onClick=function(){
    if(win.g5.rb4.value){
    win.g5.rb4a.enabled=true;
    }else{
   win.g5.rb4a.value=false;
        win.g5.rb4a.enabled=false;
        }
    if(win.g5.rb10.value){
        win.g15.dd1.add('item','Group Name + LayerName');
        }else{
            try{
            win.g15.dd1.remove(4);
            }catch(e){}
            win.g15.dd1.selection=0;
            }
}
win.g5.rb4.onClick();
}
win.g15.et1 = win.g15.add('edittext');
win.g15.et1.preferredSize=[150,20];
win.g15.et1.hide();
win.g15.dd1.onChange=function(){
  if(this.selection.index==0){
      win.g14.cb1.enabled=true;
      }else{
          win.g14.cb1.value=false;
          win.g14.cb1.enabled=false;
          }
  if(this.selection.index==3){
      win.g15.et1.show();
      }else{
          win.g15.et1.hide();
          }
    }
win.g14.cb1.onClick=function(){
    if(win.g14.cb1.value){
        win.g15.et1.show();
        }else{
            win.g15.et1.hide();
            }
    }
win.g15.dd1.onChange();
win.g18 =win.p2.add('group');
win.g18.orientation = "row";
win.g18.st1 = win.g18.add('statictext',undefined,'Save as :');
var Types = ["PNG","PSD","PDF","TIF","JPG","JPG SFW","PCX","PNG SFW"];
win.g18.dd1 = win.g18.add('dropdownlist',undefined,Types);
win.g18.dd1.selection = Number(Prefs.saveType);
win.g18.alignment='left';

win.g19 =win.g18.add('group');
win.g19.orientation = "stack";

win.g19b =win.g19.add('group');
win.g19b.st1 = win.g19b.add('statictext',undefined,'Quality');
win.g19b.dd1 = win.g19b.add('dropdownlist');
for(var a =1;a<13;a++){
    win.g19b.dd1.add('item',a);
    }
win.g19b.dd1.selection = Number(Prefs.jpgQual);
win.g19b.visible=false;

win.g19c =win.g19.add('group');
win.g19c.st1 = win.g19c.add('statictext',undefined,'Compression');
var tiffOptions=["LZW","ZIP","JPG","None"];
win.g19c.dd1 = win.g19c.add('dropdownlist',undefined,tiffOptions);
win.g19c.dd1.selection = Number(Prefs.tiffComp);
win.g19c.visible=false;

win.g19d =win.g19.add('group');
win.g19d.st1 = win.g19d.add('statictext',undefined,'Quality');
win.g19d.dd1 = win.g19d.add('dropdownlist');
for(var a =1;a<101;a++){
    win.g19d.dd1.add('item',a);
    }
win.g19d.dd1.selection = Number(Prefs.jpgsfwQual);
win.g19d.visible=false;
win.g19d.cb1 = win.g19d.add('checkbox',undefined,'Nearest Size Kilobytes');
win.g19d.et1 = win.g19d.add('edittext');
win.g19d.cb1.helpTip="This could take some time as multiple saves are required!";
win.g19d.et1.preferredSize=[70,20];
win.g19d.cb1.onClick = function(){
    if(win.g19d.cb1.value){
        win.g19d.dd1.enabled=false;
        win.g19d.et1.enabled=true;
        }else{
            win.g19d.dd1.enabled=true;
            win.g19d.et1.enabled=false;
            }
}
win.g19d.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g19d.cb1.onClick();
win.g18.dd1.onChange=function(){
    switch(Number(this.selection.index)){
        case 0 : win.g19b.visible=false; win.g19c.visible=false; win.g19d.visible=false; break;
        case 1 : win.g19b.visible=false; win.g19c.visible=false; win.g19d.visible=false; break;
        case 2 : win.g19b.visible=false; win.g19c.visible=false; win.g19d.visible=false; break;
        case 3 : win.g19b.visible=false; win.g19c.visible=true; win.g19d.visible=false; break;
        case 4 : win.g19b.visible=true; win.g19c.visible=false; win.g19d.visible=false; break;
        case 5 : win.g19b.visible=false; win.g19c.visible=false; win.g19d.visible=true; break;
        case 6 : win.g19b.visible=false; win.g19c.visible=false; win.g19d.visible=false; break;
        case 7 : win.g19b.visible=false; win.g19c.visible=false; win.g19d.visible=false; break;
        default :break;
        }
}
win.g18.dd1.onChange();
////*******************************************************
try{
resizeMethod = ["Bicubic", "BicubicSharper","BicubicSmoother", "Bilinear", "NearestNeighbor"];
resizeUnits = ["pixels", "percent", "inches","cm", "mm", "points", "picas"];
win.g29a =win.p2.add('group');
win.g29a.spacing=0;
win.g29a.orientation = 'row';
win.g29a.alignment="left";
win.g29a.cb0 = win.g29a.add('checkbox',undefined,'Custom Fit Image');
win.g29a.cb1 = win.g29a.add('checkbox',undefined,'Constrain Proportions');
win.g29a.cb1.value=true;
win.g29a.cb1.helpTip="If unticked this could distort the image!";
win.g29b =win.p2.add('group');
win.g29b.spacing=0;
win.g29b.orientation = 'row';
win.g29b.alignment="left";
win.g29b.st1 = win.g29b.add('statictext',undefined,'Width');
win.g29b.et1 = win.g29b.add('edittext',undefined,'');
win.g29b.et1.preferredSize=[40,20];
win.g29b.st2 = win.g29b.add('statictext',undefined,'Height');
win.g29b.et2 = win.g29b.add('edittext',undefined,'');
win.g29b.et2.preferredSize=[40,20];
win.g29b.dd1 = win.g29b.add('dropdownlist',undefined,resizeUnits);
win.g29b.dd1.selection= Prefs.rUnits;
win.g29b.dd2 = win.g29b.add('dropdownlist',undefined,resizeMethod);
win.g29b.dd2.selection= Prefs.rMethod;
win.g29c =win.p2.add('group');
win.g29c.spacing=0;
win.g29c.orientation = 'row';
win.g29c.alignment="left";
win.g29c.cb0 = win.g29c.add('checkbox',undefined,'Use document resolution');
win.g29c.cb0.value=true;
win.g29c.st1 = win.g29c.add('statictext',undefined,'Enter resolution');
win.g29c.et1 = win.g29c.add('edittext');
win.g29c.et1.preferredSize=[40,20];

win.g29c.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g29c.cb0.onClick=function(){
    if(win.g29c.cb0.value){
        win.g29c.et1.visible=false;
        win.g29c.st1.visible=false;
        }else{
            win.g29c.et1.visible=true;
            win.g29c.st1.visible=true;
            }
    }
win.g29c.cb0.onClick();
win.g29a.cb0.onClick = function(){
    if(win.g29a.cb0.value){
        win.g29a.cb1.enabled=true;
        win.g29b.et1.enabled=true;
        win.g29b.et2.enabled=true;
        win.g29b.dd1.enabled=true;
        win.g29b.dd2.enabled=true;
        win.g29c.cb0.enabled=true;
        }else{
            win.g29a.cb1.enabled=false;
            win.g29b.et1.enabled=false;
            win.g29b.et2.enabled=false;
            win.g29b.dd1.enabled=false;
            win.g29b.dd2.enabled=false;
            win.g29c.cb0.enabled=false;
            win.g29c.cb0.value=true;
            win.g29c.cb0.onClick();
            win.g29a.cb1.value=true;
            }
}
win.g29b.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g29b.et2.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g29a.cb0.onClick();
}catch(e){alert(e+" - "+e.line);}

////*******************************************************
win.g200 =win.p2.add('group');
win.g200.orientation = "row";
win.g200.bu1 = win.g200.add('button',undefined,'Process');
win.g200.bu1.preferredSize=[200,35];
win.g200.bu2 = win.g200.add('button',undefined,'Cancel');
win.g200.bu2.preferredSize=[200,35];

win.g200.bu1.onClick=function(){
    if(win.g19d.cb1.value){
        if(win.g19d.et1.text == ''){
            alert("No JPG size has been entered!");
            return;
            }
        }
    if(win.g10.et1.text == ''){
        alert("No Output Folder has been Selected!");
        return;
        }
    if(win.g15.dd1.selection.index==3){
        if(win.g15.et1.text ==''){
            alert("No FileName Has Been Entered!");
            return;
            }
        }
    if(win.g14.cb1.value){
          if(win.g15.et1.text ==''){
            alert("No Prefix/Suffix Has Been Entered!");
            return;
            }
        }
    if(win.g29a.cb0.value){//Resize output file
        if(win.g29b.et1.text == ''){
            alert("No Width has been entered for the resize!");
            return;
            }
        if(win.g29b.et2.text == ''){
            alert("No Height has been entered for the resize!");
            return;
            }
        if(!win.g29c.cb0.value && win.g29c.et1.text == ''){
            alert("No resolution has been entered!");
            return;
            }
        }
Prefs.jpgsfwQual = win.g19d.dd1.selection.index;
Prefs.tiffComp = win.g19c.dd1.selection.index;
Prefs.jpgQual = win.g19b.dd1.selection.index
Prefs.saveType = win.g18.dd1.selection.index;
Prefs.FileName = win.g15.dd1.selection.index;
Prefs.merge = win.g12.cb1.value;
Prefs.trim = win.g12.cb2.value;
Prefs.rUnits = win.g29b.dd1.selection.index;
Prefs.rMethod = win.g29b.dd2.selection.index;
Prefs.Folder1= decodeURI(outputFolder);  
var desc2 = new ActionDescriptor();
desc2.putString(0, Prefs.toSource()); 
app.putCustomOptions('ed0f5560-dfb3-11e0-9572-0800200c9a66', desc2, true );
win.close(1); 
if($.os.match(/windows/gi)){
if(app.version.match(/\d+/) ==13){
var Tabbed = isTabInterface();
if(!Tabbed) tabInterface();
}
}
Process();
if($.os.match(/windows/gi)){
if(app.version.match(/\d+/) ==13){
if(!Tabbed) tabInterface(false);
}
}
}
win.center();
win.show();
function Process(){
function resizeDoc(){
//Custom Fit Image ****************************
var doc=activeDocument;
resUnits= win.g29b.dd1.selection.text.toString();
resWidth = new UnitValue(Number(win.g29b.et1.text),resUnits);  
resHeight = new UnitValue(Number(win.g29b.et2.text),resUnits);
if(win.g29a.cb1.value){//Constrain Proportions
  if(doc.width>doc.height){
      resHeight = undefined;
      }else{
          resWidth = undefined;
   }
}
if(!win.g29a.cb1.value){
    if(doc.height > doc.width){
        resHeight = new UnitValue(Number(win.g29b.et1.text),resUnits);  
        resWidth = new UnitValue(Number(win.g29b.et2.text),resUnits);
        }
}
if(win.g29c.cb0.value){
resizeRes = undefined;
}else{
    resizeRes = Math.round(Number(win.g29c.et1.text));
    }
resizeMethods = win.g29b.dd2.selection.text.toString().toUpperCase();
activeDocument.resizeImage (resWidth, resHeight, resizeRes, eval("ResampleMethod."+resizeMethods));
//end custom Fit Image
}
if(LSets == 0){
//Process layers only
if(win.g5.rb1.value){//Save selected layers
for(var b in selLayers){
    selectLayerByIndex(Number(selLayers[b]));
     var lName = activeDocument.activeLayer.name;
    var saveFile= File(outputFolder+ "/" + getName(b,lName));
    dupLayers();
    if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
     if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
    if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    }//End Save selected layers
if(win.g5.rb2.value){//Save selected layers along with the top layer
for(var b in selLayers){
    selectLayerByIndex(Number(selLayers[b]));
     var lName = activeDocument.activeLayer.name;
    activeDocument.activeLayer= activeDocument.layers[0];
    selectLayerByIndex(Number(selLayers[b]),true);
    var saveFile= File(outputFolder+ "/" + getName(b,lName));
    dupLayers();
    if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    }//End Save selected layers along with the top layer
if(win.g5.rb3.value){//Save selected layers along with background layer
    for(var b in selLayers){
    selectLayerByIndex(Number(selLayers[b]));
     var lName = activeDocument.activeLayer.name;
    activeDocument.activeLayer = activeDocument.layers[activeDocument.layers.length-1];
    selectLayerByIndex(Number(selLayers[b]),true);
    var saveFile= File(outputFolder+ "/" + getName(b,lName));
    dupLayers();
    activeDocument.layers[0].visible=true;
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    }//End Save selected layers along with background layer
if(win.g5.rb4.value){//Save all layers
selectAllLayers();
selLayers =getSelectedLayersIdx();
 for(var b in selLayers){
     selectLayerByIndex(Number(selLayers[b]));
     var lName = activeDocument.activeLayer.name;
    var saveFile= File(outputFolder+ "/" + getName(b,lName));
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
     }
    }//End Save all layers
if(win.g5.rb5.value){//Save all layers along with the top layer
selectAllLayers();
selLayers =getSelectedLayersIdx();
for(var b in selLayers){
    selectLayerByIndex(Number(selLayers[b]));
     var lName = activeDocument.activeLayer.name;
    activeDocument.activeLayer = activeDocument.layers[0];
    selectLayerByIndex(Number(selLayers[b]),true);
    var saveFile= File(outputFolder+ "/" + getName(b,lName));
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    }//End Save all layers along with the top layer
if(win.g5.rb6.value){//Save all layers along with background layer
selectAllLayers();
selLayers =getSelectedLayersIdx();
    for(var b in selLayers){
    selectLayerByIndex(Number(selLayers[b]));
     var lName = activeDocument.activeLayer.name;
    activeDocument.activeLayer = activeDocument.layers[activeDocument.layers.length-1];
    selectLayerByIndex(Number(selLayers[b]),true);
    var saveFile= File(outputFolder+ "/" + getName(b,lName));
    dupLayers();
    activeDocument.layers[0].visible=true;
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    }//End Save all layers along with background layer
if(win.g5.rb7.value){//Save all layers along with bottom layer
selectAllLayers();
selLayers =getSelectedLayersIdx();
activeDocument.activeLayer = activeDocument.layers[activeDocument.layers.length-1];
var bottomLayer = getSelectedLayersIdx();
    for(var b in selLayers){
     if(Number(selLayers[b]) == Number(bottomLayer[0])) continue;
    selectLayerByIndex(Number(selLayers[b]));
     var lName = activeDocument.activeLayer.name;
    selectLayerByIndex(Number(bottomLayer[0]),true);
    var saveFile= File(outputFolder+ "/" + getName(b,lName));
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    }//End Save all layers along with bottom layer
if(win.g5.rb8.value){//Save selected layers along with bottom layer
selLayers =getSelectedLayersIdx();
activeDocument.activeLayer = activeDocument.layers[activeDocument.layers.length-1];
var bottomLayer = getSelectedLayersIdx();
    for(var b in selLayers){
     if(Number(selLayers[b]) == Number(bottomLayer[0])) continue;
    selectLayerByIndex(Number(selLayers[b]));
     var lName = activeDocument.activeLayer.name;
    selectLayerByIndex(Number(bottomLayer[0]),true);
    var saveFile= File(outputFolder+ "/" + getName(b,lName));
    dupLayers();
    activeDocument.layers[0].visible=true;
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    }//End Save selected layers along with bottom layer
if(win.g5.rb9.value){//Save selected layers along with top and bottom layer
selLayers =getSelectedLayersIdx();
activeDocument.activeLayer = activeDocument.layers[0];
var topLayer = getSelectedLayersIdx();
    for(var b in selLayers){
     if(Number(selLayers[b]) == Number(topLayer[0])) continue;
    selectLayerByIndex(Number(selLayers[b]));
     var lName = activeDocument.activeLayer.name;
    selectLayerByIndex(Number(topLayer[0]),true); 
    selectLayerByIndex(0,true); 
    var saveFile= File(outputFolder+ "/" + getName(b,lName));
    dupLayers();
    activeDocument.layers[0].visible=true;
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    }//End Save selected layers along with top and bottom layer
    }else{
//Process LayerSets Only
if(win.g5.rb1.value){//Save selected layerSets
    for(var g in selGroups){
        selectLayerByIndex(Number(selGroups[g]));
        var lName = activeDocument.activeLayer.name;
        var saveFile= File(outputFolder+ "/" + getName(g,lName));
        dupLayers();
            if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
   }//End Save selected layerSets
if(win.g5.rb2.value){//Save selected layerSets along with the top layer
    for(var g in selGroups){
        selectLayerByIndex(Number(selGroups[g]));
     var lName = activeDocument.activeLayer.name;
    activeDocument.activeLayer= activeDocument.layers[0];
    selectLayerByIndex(Number(selGroups[g]),true);
    var saveFile= File(outputFolder+ "/" + getName(g,lName));
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
    }//End Save selected layerSets along with the top layer
if(win.g5.rb3.value){//Save selected layerSets along with background layer
    for(var g in selGroups){
    selectLayerByIndex(Number(selGroups[g]));
     var lName = activeDocument.activeLayer.name;
    activeDocument.activeLayer = activeDocument.layers[activeDocument.layers.length-1];
    selectLayerByIndex(Number(selGroups[g]),true);
    var saveFile= File(outputFolder+ "/" + getName(g,lName));
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
    }//End Save selected layerSets along with background layer
if(win.g5.rb4.value){//Save all layerSets   
for(var y =0; y< LSets;y++){
    LSetsVis.push(doc.layerSets[y].visible);
    doc.layerSets[y].visible=false;
    }
    for(var g =0;g<LSets;g++){
         activeDocument.activeLayer = activeDocument.layerSets[g];
         var lName = activeDocument.activeLayer.name;
         activeDocument.layerSets[g].visible=true;
         if(win.g5.rb4a.value){
         for(var d in selLayers ){    
         selectLayerByIndex(Number(selLayers[d]),true);
         }
     }
         var saveFile= File(outputFolder+ "/" + getName(g,lName));
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    activeDocument.layerSets[g].visible=false;
        }
    for(var y =0; y< LSets;y++){
    doc.layerSets[y].visible = LSetsVis[y];
    }
         if(win.g5.rb4a.value){
         for(var d in selLayers ){    
         selectLayerByIndex(Number(selLayers[d]),true);
         }
     }
    }//End Save all layerSets
if(win.g5.rb5.value){//Save all layerSets along with the top layer
    activeDocument.activeLayer = activeDocument.layers[0];
    var TopIDX =getSelectedLayersIdx();
     for(var g =0;g<LSets;g++){
         activeDocument.activeLayer = activeDocument.layerSets[g];
         var lName = activeDocument.activeLayer.name;
         selectLayerByIndex(Number(TopIDX[0]),true);
         var saveFile= File(outputFolder+ "/" + getName(g,lName));
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
    }//End Save all layerSets along with the top layer
if(win.g5.rb6.value){//Save all layerSets along with background layer
         for(var g =0;g<LSets;g++){
         activeDocument.activeLayer = activeDocument.layerSets[g];
         var lName = activeDocument.activeLayer.name;
         selectLayerByIndex(0,true);
         var saveFile= File(outputFolder+ "/" + getName(g,lName));
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
    }//End Save all layerSets along with background layer
if(win.g5.rb7.value){//Save all layerSets along with top layerset
    activeDocument.activeLayer = activeDocument.layerSets[0];
   var topLayerSet = getSelectedLayersIdx();
    for(var g =1;g<LSets;g++){
         activeDocument.activeLayer = activeDocument.layerSets[g];
         var lName = activeDocument.activeLayer.name;
         var saveFile= File(outputFolder+ "/" + getName(g,lName));
         selectLayerByIndex(Number(topLayerSet[0]),true);
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
    }//End Save all layerSets along with top layerset
if(win.g5.rb8.value){//Save all layerSets along with bottom layerset
    activeDocument.activeLayer = activeDocument.layerSets[LSets-1];
   var bottomLayerSet = getSelectedLayersIdx();
    for(var g =0;g<LSets-1;g++){
         activeDocument.activeLayer = activeDocument.layerSets[g];
         var lName = activeDocument.activeLayer.name;
         var saveFile= File(outputFolder+ "/" + getName(g,lName));
         selectLayerByIndex(Number(bottomLayerSet[0]),true);
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
    }//End Save all layerSets along with bottom layerset
if(win.g5.rb9.value){//Save all layerSets along with top and bottom layerset
    activeDocument.activeLayer = activeDocument.layerSets[0];
   var topLayerSet = getSelectedLayersIdx();
    activeDocument.activeLayer = activeDocument.layerSets[LSets-1];
   var bottomLayerSet = getSelectedLayersIdx();
    for(var g =1;g<LSets-1;g++){
         activeDocument.activeLayer = activeDocument.layerSets[g];
         var lName = activeDocument.activeLayer.name;
         var saveFile= File(outputFolder+ "/" + getName(g,lName));
         selectLayerByIndex(Number(topLayerSet[0]),true);
         selectLayerByIndex(Number(bottomLayerSet[0]),true);
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
        }
    }//End Save all layerSets along with top and bottom layerset
if(win.g5.rb10.value){//Save all layers including those in layersets
selectAllLayers();
selLayers =getSelectedLayersIdx();
 for(var b in selLayers){
     selectLayerByIndex(Number(selLayers[b]));
     if(activeDocument.activeLayer.typename == 'LayerSet') continue;
     if(app.activeDocument.activeLayer.kind == LayerKind.HUESATURATION ) continue;
      if(app.activeDocument.activeLayer.kind == LayerKind.COLORBALANCE ) continue;
     if(app.activeDocument.activeLayer.kind ==  LayerKind.CURVES ) continue;
      if(app.activeDocument.activeLayer.kind == LayerKind.LEVELS ) continue;
      if(app.activeDocument.activeLayer.kind == LayerKind.BLACKANDWHITE ) continue;
      if(app.activeDocument.activeLayer.kind == LayerKind.BRIGHTNESSCONTRAST ) continue;
      if(app.activeDocument.activeLayer.kind == LayerKind.GRADIENTFILL ) continue;
      if(app.activeDocument.activeLayer.kind == LayerKind.GRADIENTMAP ) continue;
      if(app.activeDocument.activeLayer.kind == LayerKind.INVERSION ) continue;
      if(app.activeDocument.activeLayer.kind == LayerKind.GRADIENTFILL ) continue;
      if(app.activeDocument.activeLayer.kind == LayerKind.PATTERNFILL ) continue;
      if(app.activeDocument.activeLayer.kind == LayerKind.SELECTIVECOLOR ) continue;
      if(app.activeDocument.activeLayer.kind == LayerKind.THRESHOLD ) continue;     
     var lName = activeDocument.activeLayer.name;
    var saveFile= File(outputFolder+ "/" + getName(b,lName));
    dupLayers();
        if(win.g12.cb1.value){
        try{activeDocument.mergeVisibleLayers();}catch(e){}
        }
    if(win.g12.cb2.value){
         try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
         }
     if(win.g11.cb1.value) doAction(win.g11.dd2.selection.text, win.g11.dd1.selection.text);
     if(win.g29a.cb0.value) resizeDoc();
    SaveDOC(saveFile);
    app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
     }
    }//End Save all layers
        }
}
function getName(seq,lName){
lName = lName.replace(/\....$/,'');
seq = zeroPad((Number(seq)+1), 3);
 var dName = decodeURI(activeDocument.name).replace(/\.[^\.]+$/, '');
var Name ='';
if(win.g15.dd1.selection.index ==0 && win.g14.cb1.value){
    if(win.g14.rb1.value){
        Name += win.g15.et1.text + lName;
        return Name;
        }else{
        Name += lName + win.g15.et1.text;
        return Name;
            }
    }
switch (Number(win.g15.dd1.selection.index)){
    case 0: Name += lName; break;
    case 1: Name += dName +"-"+seq; break;
    case 2: Name += dName +"-"+ lName; break;
    case 3: Name += win.g15.et1.text + "-"+seq; break;
    case 4: Name += ParentName() + lName; break;
    default :break;
    }
return Name;
    }
function ParentName(){
if(activeDocument.activeLayer.parent.typename == "LayerSet") {
return activeDocument.activeLayer.parent.name + " - ";
}else{
    return "";
}
    }
function SaveDOC(saveFile){
    switch(Number(win.g18.dd1.selection.index)){
        case 0 : SavePNG(File(saveFile+".png")); break;
        case 1:  SavePSD(File(saveFile+".psd")); break;
        case 2:  SavePDF(File(saveFile+".pdf")); break;
        case 3:  SaveTIFF(File(saveFile+".tif"),Number(win.g19c.dd1.selection.index)); break;
        case 4:  SaveJPG(File(saveFile+".jpg"),Number(win.g19b.dd1.selection.index)+1); break;
        case 5:  SFW(saveFile); break;
        case 6:  savePCX(saveFile +".pcx"); break;
        case 7: saveAsPNG24SFW(File(saveFile+".png")); break;
        default : break;
        }
    }
function SFW(saveFile){
  if(!win.g19d.cb1.value){
      SaveForWeb(File(saveFile+".jpg"),Number(win.g19d.dd1.selection.index)+1);
      }else{
          try{
          tmpFile = File(saveFile+".jpg");
          for(var z =100;z>5;z -=4){
              SaveForWeb(tmpFile,z);
              var chkFile = File(saveFile+".jpg");
              // $.writeln(tmpFile + " qual = " + z + " Size = " +(chkFile.length/1024).toFixed(2) + "k" ); 
              if((chkFile.length/1024).toFixed(2) < Number(win.g19d.et1.text)) break;
              tmpFile.remove();
              }
          if(!tmpFile.exists)  SaveForWeb(tmpFile,5);
          }catch(e){$.writeln(e + " - " + e.line);}
          }//sfw nearest size
      }
}
main();
function hasBackground() { 
   var ref = new ActionReference(); 
   ref.putProperty( charIDToTypeID("Prpr"), charIDToTypeID( "Bckg" )); 
   ref.putEnumerated(charIDToTypeID( "Lyr " ),charIDToTypeID( "Ordn" ),charIDToTypeID( "Back" ));
   var desc =  executeActionGet(ref); 
   var res = desc.getBoolean(charIDToTypeID( "Bckg" )); 
   return res    
} 
function getSelectedLayersIdx(){ 
      var selectedLayers = new Array(); 
      var backGroundCounter = 1;
            if(activeDocument.artLayers.length > 0){
            backGroundCounter = activeDocument.artLayers[activeDocument.artLayers.length - 1].isBackgroundLayer ? 0 : 1;
            }
      var ref = new ActionReference(); 
	  ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("targetLayers"));
      ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
      var desc = executeActionGet(ref); 
      if( desc.hasKey( stringIDToTypeID( "targetLayers" ) ) ){ 
         desc = desc.getList( stringIDToTypeID( "targetLayers" )); 
          var c = desc.count; 
          var selectedLayers = new Array(); 
          for(var i=0;i<c;i++){ 
               selectedLayers.push(  desc.getReference( i ).getIndex() +backGroundCounter ); 
          } 
      if(app.version.match(/^\d+/) > 15) return selectedLayers ;
       }else{ 
           if(app.version.match(/^\d+/) > 15) return selectedLayers ;
         var ref = new ActionReference(); 
         ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" )); 
         ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
         if(!backGroundCounter){
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )) -1);
            }else{
                selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )));
                }
     var vis = app.activeDocument.activeLayer.visible;
        if(vis == true) app.activeDocument.activeLayer.visible = false;
        var desc9 = new ActionDescriptor();
    var list9 = new ActionList();
    var ref9 = new ActionReference();
    ref9.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
    list9.putReference( ref9 );
    desc9.putList( charIDToTypeID("null"), list9 );
    executeAction( charIDToTypeID("Shw "), desc9, DialogModes.NO );
    if(app.activeDocument.activeLayer.visible == false) selectedLayers.shift();
        app.activeDocument.activeLayer.visible = vis;
      } 
      return selectedLayers; 
};
function isLayerSet(idx) {         
   var ref = new ActionReference(); 
   ref.putIndex(1283027488, idx); 
   var desc =  executeActionGet(ref); 
   var type = desc.getEnumerationValue(stringIDToTypeID("layerSection")); 
   var res = typeIDToStringID(type); 
   if(res == 'layerSectionStart') return true;
       return false;   
} 
function deselectLayers() { 
    var desc01 = new ActionDescriptor(); 
        var ref01 = new ActionReference(); 
        ref01.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') ); 
    desc01.putReference( charIDToTypeID('null'), ref01 ); 
    executeAction( stringIDToTypeID('selectNoLayers'), desc01, DialogModes.NO ); 
};
function dupLayers() { 
    var desc143 = new ActionDescriptor();
        var ref73 = new ActionReference();
        ref73.putClass( charIDToTypeID('Dcmn') );
    desc143.putReference( charIDToTypeID('null'), ref73 );
    desc143.putString( charIDToTypeID('Nm  '), activeDocument.activeLayer.name );
        var ref74 = new ActionReference();
        ref74.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc143.putReference( charIDToTypeID('Usng'), ref74 );
    executeAction( charIDToTypeID('Mk  '), desc143, DialogModes.NO );
};
function selectLayerByIndex(index,add){ 
add = (add == undefined)  ? add = false : add;
var ref = new ActionReference();
ref.putIndex(charIDToTypeID("Lyr "), index);
var desc = new ActionDescriptor();
desc.putReference(charIDToTypeID("null"), ref );
if(add) desc.putEnumerated( stringIDToTypeID( "selectionModifier" ), stringIDToTypeID( "selectionModifierType" ), stringIDToTypeID( "addToSelection" ) ); 
desc.putBoolean( charIDToTypeID( "MkVs" ), false ); 
try{
executeAction(charIDToTypeID("slct"), desc, DialogModes.NO );
}catch(e){}
};
function selectAllLayers() {
    var desc29 = new ActionDescriptor();
        var ref23 = new ActionReference();
        ref23.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc29.putReference( charIDToTypeID('null'), ref23 );
    executeAction( stringIDToTypeID('selectAllLayers'), desc29, DialogModes.NO );
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
function tabInterface(onOff) {
if(onOff == undefined) onOff=true;
    var desc19 = new ActionDescriptor();
        var ref8 = new ActionReference();
        ref8.putProperty( charIDToTypeID('Prpr'), stringIDToTypeID('interfacePrefs') );
        ref8.putEnumerated( charIDToTypeID('capp'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc19.putReference( charIDToTypeID('null'), ref8 );
        var desc20 = new ActionDescriptor();
        desc20.putBoolean( charIDToTypeID('EGst'), true );
        desc20.putBoolean( stringIDToTypeID('openNewDocsAsTabs'), onOff );
    desc19.putObject( charIDToTypeID('T   '), stringIDToTypeID('interfacePrefs'), desc20 );
    executeAction( charIDToTypeID('setd'), desc19, DialogModes.NO );
};
function isTabInterface(){
var ref = new ActionReference();
ref.putEnumerated( charIDToTypeID("capp"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
return executeActionGet(ref).getObjectValue(stringIDToTypeID('interfacePrefs')).getBoolean(stringIDToTypeID( 'openNewDocsAsTabs'));
};
function zeroPad(n, s) { 
   n = n.toString(); 
   while (n.length < s)  n = '0' + n; 
   return n; 
}
function SavePNG(saveFile){
    pngSaveOptions = new PNGSaveOptions(); 
activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE); 
}
function SaveTIFF(saveFile,Comp){
tiffSaveOptions = new TiffSaveOptions(); 
tiffSaveOptions.embedColorProfile = true; 
tiffSaveOptions.transparency = true; 
tiffSaveOptions.alphaChannels = true; 
tiffSaveOptions.layers = true;
switch (Number(Comp)){
    case 0 : tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW; break;
    case 1 : tiffSaveOptions.imageCompression = TIFFEncoding.TIFFZIP; break;
    case 2 : tiffSaveOptions.imageCompression = TIFFEncoding.JPEG; break;
    case 3 : tiffSaveOptions.imageCompression = TIFFEncoding.NONE; break;
    default : break;
}
activeDocument.saveAs(saveFile, tiffSaveOptions, true, Extension.LOWERCASE); 
}
function SavePSD(saveFile){ 
psdSaveOptions = new PhotoshopSaveOptions(); 
psdSaveOptions.embedColorProfile = true; 
psdSaveOptions.alphaChannels = true;  
psdSaveOptions.layers = true;  
activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE); 
}
function SavePDF(saveFile){ 
pdfSaveOptions = new PDFSaveOptions(); 
activeDocument.saveAs(saveFile, pdfSaveOptions, true, Extension.LOWERCASE); 
}
function SaveJPG(saveFile, jpegQuality){
    try{
jpgSaveOptions = new JPEGSaveOptions();
jpgSaveOptions.embedColorProfile = true;
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
jpgSaveOptions.matte = MatteType.NONE;
jpgSaveOptions.quality = jpegQuality;
activeDocument.saveAs(saveFile, jpgSaveOptions, true,Extension.LOWERCASE);
}catch(e){$.writeln(e+" - "+e.line);}
}
function SaveForWeb(saveFile,jpegQuality) {
var sfwOptions = new ExportOptionsSaveForWeb(); 
   sfwOptions.format = SaveDocumentType.JPEG; 
   sfwOptions.includeProfile = false; 
   sfwOptions.interlaced = 0; 
   sfwOptions.optimized = true; 
   sfwOptions.quality = Number(jpegQuality); 
activeDocument.exportDocument(saveFile, ExportType.SAVEFORWEB, sfwOptions);
}
function savePCX(saveFile) {
var desc = new ActionDescriptor();
desc.putString( charIDToTypeID('As  '), "PCX" );
desc.putPath( charIDToTypeID('In  '), new File( saveFile ) );
executeAction( charIDToTypeID('save'), desc, DialogModes.NO );
};
function saveAsPNG24SFW(fileName) {
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
        desc4.putPath( charIDToTypeID('In  '), new File( fileName ) );
    desc3.putObject( charIDToTypeID('Usng'), stringIDToTypeID('SaveForWeb'), desc4 );
    executeAction( charIDToTypeID('Expr'), desc3, DialogModes.NO );
};