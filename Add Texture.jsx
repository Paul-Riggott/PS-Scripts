#target photoshop
function main(){
var win = new Window('dialog','Add Texture');
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.g1 = win.p1.add('group');
win.g1.orientation = "row";
win.title = win.g1.add('statictext',undefined,'Add Texture');
win.title.alignment="fill";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
win.g5 =win.p1.add('group');
win.g5.orientation = "row";
win.g5.alignment='fill';
win.g5.spacing=10;
win.g5.st1 = win.g5.add('statictext',undefined,'BlendMode');
var Blends = ['COLORBLEND','COLORBURN','COLORDODGE','DARKEN','DIFFERENCE','DISSOLVE','EXCLUSION',
'HARDLIGHT','HARDMIX','HUE','LIGHTEN','LINEARBURN','LINEARDODGE','LINEARLIGHT','LUMINOSITY','MULTIPLY',
'NORMAL','OVERLAY','PINLIGHT','SATURATION','SCREEN','SOFTLIGHT','VIVIDLIGHT'];
win.g5.dd1 = win.g5.add('dropdownlist',undefined,Blends);
win.g5.dd1.selection=17;
win.g5.st2 = win.g5.add('statictext',undefined,'Opacity');
win.g5.dd2 = win.g5.add('dropdownlist');
for(var a =0;a<101;a++){
    win.g5.dd2.add('item',a);
    }
win.g5.dd2.selection=60;
win.g6 =win.p1.add('group');
win.g6.orientation = "row";
win.g6.alignment='left';
win.g6.cb1 = win.g6.add('radiobutton',undefined,'Use Bridge File');
win.g6.cb2 = win.g6.add('radiobutton',undefined,'Use Open File');
win.g6.cb3 = win.g6.add('radiobutton',undefined,'Select File');
win.g6.cb3.value=true;

win.g7 =win.p1.add('group');
win.g7.orientation = "row";
win.g7.alignment='left';
win.g7.dd1 = win.g7.add('dropdownlist');
win.g7.dd1.preferredSize=[250,20];
var thisDoc = activeDocument;
for(var a =0;a<documents.length;a++){
    if(documents[a] != thisDoc){
        win.g7.dd1.add('item',documents[a].name);
        }
    }
win.g7.dd1.selection=0;
win.g7.dd1.enabled=false;
win.g6.cb1.onClick=function(){
    checkState();
    }
win.g6.cb2.onClick=function(){
    checkState();
    }
win.g6.cb3.onClick=function(){
    checkState();
    }
win.g10 =win.p1.add('group');
win.g10.orientation = "row";
win.g10.alignment='left';
win.g10.st1 = win.g10.add('statictext',undefined,'Please select Texture');
win.g10.st1.preferredSize=[350,20]
win.g10.bu1 = win.g10.add('button',undefined,'Select');
win.g10.bu1.onClick = function() {
TextureFile = File.openDialog ("Please Select Texture", "Select:*.tif;*.psd;*.jpg");
if(TextureFile !=null){
	win.g10.st1.text =  decodeURI(TextureFile); 
	}
}
checkState();
function checkState(){
    if(documents.length<2) win.g6.cb2.enabled=false;
    if(win.g6.cb1.value) win.g10.bu1.enabled=false;
    if(win.g6.cb2.value){
        win.g10.bu1.enabled=false;
        win.g7.dd1.enabled=true;
        }else{
            win.g7.dd1.enabled=false;
            }
     if(win.g6.cb3.value) win.g10.bu1.enabled=true;
    }
win.g15 =win.p1.add('group');
win.g15.orientation = "row";
win.g15.bu1 = win.g15.add('button',undefined,'Process');
win.g15.bu1.preferredSize=[220,35];
win.g15.bu2 = win.g15.add('button',undefined,'Cancel');
win.g15.bu2.preferredSize=[220,35];
win.g15.bu1.onClick=function(){
    if(win.g6.cb3.value){
    if(!File(win.g10.st1.text).exists) {
        alert("You need to select a texture!");
        return;
        }}
if(win.g6.cb1.value){
       if (!BridgeTalk.isRunning("Bridge")) {
    alert("Bridge is not running!");
    return;
    }
 bridgeFile = GetFilesFromBridge();
        if(!bridgeFile.length ){
            alert("No Bridge File Has Been Selected!");
            return;
            }
}
    win.close(1);
var startRulerUnits = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;
var doc = activeDocument;
doc.activeLayer = doc.layers[0];
if(win.g6.cb1.value){
placeFile(File(bridgeFile[0])); 
rasterLayer();
    }
if(win.g6.cb3.value){
placeFile(TextureFile); 
rasterLayer();
}
if(win.g6.cb2.value){
var thisDoc = activeDocument;
activeDocument = documents.getByName(win.g7.dd1.selection.text);
if(activeDocument.layers.length >1){
     var savedState = activeDocument.activeHistoryState;
        activeDocument.flatten();
        activeDocument.selection.selectAll();
        activeDocument.selection.copy();
        activeDocument.selection.deselect();
        activeDocument.activeHistoryState = savedState;
    }else{
        activeDocument.selection.selectAll();
        activeDocument.selection.copy();
        activeDocument.selection.deselect();
        }
activeDocument = thisDoc;
activeDocument.paste();
}
var LB = doc.activeLayer.bounds; 
var docHeight = doc.height;
var docWidth = doc.width;
if(doc.height>doc.width){
var LHeight = Math.round(LB[3].value) - Math.round(LB[1].value);
var LWidth = Math.round(LB[2].value) - Math.round(LB[0].value); 
if(LWidth> LHeight) activeDocument.activeLayer.rotate(90);
LB = doc.activeLayer.bounds; 
    }
if(doc.height<doc.width){
var LHeight = Math.round(LB[3].value) - Math.round(LB[1].value);
var LWidth = Math.round(LB[2].value) - Math.round(LB[0].value); 
if(LWidth<LHeight) activeDocument.activeLayer.rotate(90);
LB = doc.activeLayer.bounds; 
}

LHeight = Math.round(LB[3].value) - Math.round(LB[1].value);
LWidth = Math.round(LB[2].value) - Math.round(LB[0].value);    
var perWidth = ((docWidth/LWidth)*100);
var perHeight = ((docHeight/LHeight)*100);
doc.activeLayer.resize(perWidth,perHeight,AnchorPosition.MIDDLECENTER);
LB = doc.activeLayer.bounds;
doc.activeLayer.translate((0-LB[0].value),(0-LB[1].value));
doc.activeLayer.opacity = win.g5.dd2.selection.index;
doc.activeLayer.blendMode = eval('BlendMode.'+win.g5.dd1.selection.text);
app.preferences.rulerUnits = startRulerUnits;
}
win.center();
win.show();
function placeFile(file) {
var desc = new ActionDescriptor();
desc.putPath( charIDToTypeID('null'), new File( file ) );
desc.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') );
var desc2 = new ActionDescriptor();
desc2.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.000000 );
desc2.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.000000 );
desc.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), desc2 );
desc.putBoolean( charIDToTypeID('AntA'), true );
executeAction( charIDToTypeID('Plc '), desc, DialogModes.NO );
};
function rasterLayer() {
var desc = new ActionDescriptor();
var ref = new ActionReference();
ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
desc.putReference( charIDToTypeID('null'), ref );
executeAction( stringIDToTypeID('rasterizeLayer'), desc, DialogModes.NO );
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
};
};
if(documents.length) app.activeDocument.suspendHistory('Add Texture', 'main()');
