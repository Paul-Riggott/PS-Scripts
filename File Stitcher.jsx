#target photoshop
function main(){
var dlg=
"dialog{text:'Script Interface',bounds:[100,100,500,340],"+
"panel0:Panel{bounds:[10,10,390,230] , text:'' ,properties:{borderStyle:'etched',su1PanelCoordinates:true},"+
"title:StaticText{bounds:[100,10,320,40] , text:'File Stitcher' ,properties:{scrolling:undefined,multiline:undefined}},"+
"panel1:Panel{bounds:[10,50,370,180] , text:'' ,properties:{borderStyle:'etched',su1PanelCoordinates:true},"+
"folder1:EditText{bounds:[10,10,300,30] , text:'' ,properties:{multiline:false,noecho:false,readonly:false}},"+
"Browse:IconButton{bounds:[310,10,350,30] , icon:'SourceFolderIcon',properties:{style:'button'}},"+
"sText1:StaticText{bounds:[10,40,60,60] , text:'Across' ,properties:{scrolling:undefined,multiline:undefined}},"+
"across:DropDownList{bounds:[70,40,140,60]},"+
"sText2:StaticText{bounds:[170,40,220,60] , text:'Down' ,properties:{scrolling:undefined,multiline:undefined}},"+
"down:DropDownList{bounds:[230,40,300,60]},"+
"flatten:Checkbox{bounds:[10,70,120,90] , text:'Merge Layers?' },"+
"bridge:Checkbox{bounds:[121,70,240,90] , text:'Use Bridge Files?' },"+
"sort:Checkbox{bounds:[10,100,155,120] , text:'Alpha Numeric Sort?' },"+
"rev:Checkbox{bounds:[160,100,240,120] , text:'Reverse?' },"+
"so:Checkbox{bounds:[245,100,370,120] , text:'Raster Layers?' },"+
"topDown:Checkbox{bounds:[240,70,380,90] , text:'Tile Top Down' }},"+
"process:Button{bounds:[10,190,180,210] , text:'Process' },"+
"button1:Button{bounds:[200,190,370,210] , text:'Cancel' }}};";
var win = new Window(dlg,'Compliments of Paul');
win.panel0.panel1.so.helpTip="If unticked Smart Objects are created.";
if(version.substr(0,version.indexOf('.'))>9){
win.panel0.title.graphics.font = ScriptUI.newFont("Arial","BOLDITALIC",20);
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [1.00, 1.00, 1.00, 1]);
g.backgroundColor = myBrush;
var myPen =g.newPen (g.PenType.SOLID_COLOR, [1.00, 0.00, 0.00, 1],lineWidth=1);
}
win.panel0.panel1.folder1.enabled=false;
win.panel0.panel1.sort.value=true;
if (!BridgeTalk.isRunning("bridge")) { 
	win.panel0.panel1.bridge.enabled=false;
	}
win.center();
for (var i = 1;i<201;i++){
	win.panel0.panel1.across.add ('item', "" + i);     
	win.panel0.panel1.down.add ('item', "" + i); 
}
win.panel0.panel1.across.selection=0;
win.panel0.panel1.down.selection=0;
win.panel0.panel1.Browse.onClick = function() {
 inputFolder = Folder.selectDialog("Please select the folder with Files to process");	
	if(inputFolder !=null){
		win.panel0.panel1.folder1.text =  decodeURI(inputFolder.fsName); 
		}
}
win.panel0.panel1.bridge.onClick = function() {
if(win.panel0.panel1.bridge.value){	
	win.panel0.panel1.Browse.enabled=false;
	}else{
		win.panel0.panel1.Browse.enabled=true;
		}
}
win.panel0.process.onClick = function() {
if(!win.panel0.panel1.bridge.value){
	if(win.panel0.panel1.folder1.text == '') {
			alert("No input folder selected!");
			return;
		}	
}
var Across = Number(win.panel0.panel1.across.selection.index)+1;
var Down = Number(win.panel0.panel1.down.selection.index)+1;
if(!win.panel0.panel1.bridge.value){
	fileList = inputFolder.getFiles(/\.(jpg|tif|eps|psd|png|exr|tga)$/i);
}else{
	fileList =GetFilesFromBridge();
	}
if(win.panel0.panel1.sort.value){
var fileListB=[];
for (var a in fileList){
	fileListB.push(decodeURI(fileList[a]));
}
fileList = fileListB.sort(sortAlphaNum);
}
var count = 	Across*Down;
if(fileList.length < count){
	alert("This folder does not contain enough files to complete the picture!");
	return;
}
if(win.panel0.panel1.rev.value){
    fileList = fileList.reverse();
    }
	win.close(1);
	ProcessFiles();
}
win.show();
function ProcessFiles(){
if(fileList == null) return;
var startRulerUnits = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;
app.displayDialogs = DialogModes.NO;
var Down = Number(win.panel0.panel1.down.selection.index)+1;
var Across = Number(win.panel0.panel1.across.selection.index)+1;
open(File(fileList[0]),undefined,true);
app.activeDocument.duplicate(File(fileList[0]).name.match(/(.*)\.[^\.]+$/)[1]+"-All");
app.documents[0].close(SaveOptions.DONOTSAVECHANGES);
if(win.panel0.panel1.so.value) rasterLayer();
var w=app.activeDocument.width*Across;
var h=app.activeDocument.height*Down;
var offsetX = app.activeDocument.width.value;
var offsetY = app.activeDocument.height.value;
app.activeDocument.resizeCanvas(w, h, AnchorPosition.TOPLEFT);
if(!activeDocument.activeLayer.isBackgroundLayer){
		activeDocument.activeLayer.isBackgroundLayer=true;
	}
TLX = 0;	TLY = 0;	TRX = offsetX;	TRY = 0;    BRX = offsetX;	BRY = offsetY;	BLX = 0;	BLY = offsetY;
var z =0;
var leftToRight =false;
if(!win.panel0.panel1.topDown.value){
//Left to Right
	for(var a = 0; a < Down; a++){
		for(var i = 0;i <Across; i++){
				activeDocument.selection.select([[TLX,TLY],[TRX,TRY],[BRX,BRY],[BLX,BLY]], SelectionType.REPLACE, 0, false); 
				placeFile(fileList[z]);
				if(win.panel0.panel1.so.value) rasterLayer();
                if(win.panel0.panel1.flatten.value) activeDocument.mergeVisibleLayers();
				activeDocument.activeLayer.name = decodeURI(File(fileList[z]).name.match(/(.*)\.[^\.]+$/)[1]);
				app.activeDocument.selection.deselect();
				z++;
TLX = offsetX * (i+1) ;	TRX  = TLX + offsetX;	BRX = TRX;	BLX = TLX;		
	}
TLX = 0;	TLY = offsetY * (a +1); TRX = offsetX;	TRY = offsetY * (a +1);
BRX = offsetX;	BRY = TRY + offsetY; BLX = 0;	BLY = (offsetY * (a +1)+offsetY);
	}
}else{
//Top to Bottom
	for(var a = 0; a < Across; a++){
		for(var i = 0;i <Down; i++){
			activeDocument.selection.select([[TLX,TLY],[TRX,TRY],[BRX,BRY],[BLX,BLY]], SelectionType.REPLACE, 0, false); 
				placeFile(fileList[z]);
				if(win.panel0.panel1.so.value) rasterLayer();
                if(win.panel0.panel1.flatten.value) activeDocument.mergeVisibleLayers();
				activeDocument.activeLayer.name =decodeURI( File(fileList[z]).name.match(/(.*)\.[^\.]+$/)[1]);
				app.activeDocument.selection.deselect();
				z++;
				TLY = offsetY * (i +1); 	TRY = offsetY * (i +1);
				BRY = TRY + offsetY;  BLY = TRY +offsetY;
			}
		TLX = offsetX * (a+1) ;	TRX  = TLX + offsetX;	BRX = TRX;	BLX = TLX;	TLY=0;  TRY=0; BLY=offsetY; BRY=offsetY;
		}
}
try{
activeDocument.activeLayer=activeDocument.backgroundLayer;
if(activeDocument.activeLayer.isBackgroundLayer){
	activeDocument.activeLayer.remove();
	}
}catch(e){};
app.preferences.rulerUnits = startRulerUnits;
	}
};
main();
function placeFile(placeFile) {
  function cTID(s) { return app.charIDToTypeID(s); };
    var desc21 = new ActionDescriptor();
    desc21.putPath( cTID('null'), new File(placeFile) );
    desc21.putEnumerated( cTID('FTcs'), cTID('QCSt'), cTID('Qcsa') );
        var desc22 = new ActionDescriptor();
        desc22.putUnitDouble( cTID('Hrzn'), cTID('#Pxl'), 0.000000 );
        desc22.putUnitDouble( cTID('Vrtc'), cTID('#Pxl'), 0.000000 );
    desc21.putObject( cTID('Ofst'), cTID('Ofst'), desc22 );
    executeAction( cTID('Plc '), desc21, DialogModes.NO );
};
function rasterLayer() {
    var desc9 = new ActionDescriptor();
        var ref4 = new ActionReference();
        ref4.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc9.putReference( charIDToTypeID('null'), ref4 );
    executeAction( stringIDToTypeID('rasterizeLayer'), desc9, DialogModes.NO );
};
function GetFilesFromBridge() {
	var fileList;
	if ( BridgeTalk.isRunning( "bridge" ) ) {
		var bt = new BridgeTalk();
		bt.target = "bridge";
		bt.body = "var theFiles = photoshop.getBridgeFileListForAutomateCommand();theFiles.toSource();";
		bt.onResult = function( inBT ) { fileList = eval( inBT.body ); }
		bt.onError = function( inBT ) { fileList = new Array(); }
		bt.send();
		bt.pump();
		$.sleep( 100 );
		var timeOutAt = ( new Date() ).getTime() + 5000;
		var currentTime = ( new Date() ).getTime();
		while ( ( currentTime < timeOutAt ) && ( undefined == fileList ) ) {
			bt.pump();
			$.sleep( 100 );
			currentTime = ( new Date() ).getTime();
		}
	}
	if ( undefined == fileList ) {
		fileList = new Array();
	}
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