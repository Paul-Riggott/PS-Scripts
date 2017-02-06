//Script to reassemble tiles rendered by the Tile Camera in Cinema 4d
#target photoshop
function main(){
var dlg=
"dialog{text:'Script Interface',bounds:[100,100,500,280],"+
"panel0:Panel{bounds:[10,10,390,170] , text:'' ,properties:{borderStyle:'etched',su1PanelCoordinates:true},"+
"title:StaticText{bounds:[50,10,320,40] , text:'Tile Camera Maker' ,properties:{scrolling:undefined,multiline:undefined}},"+
"panel1:Panel{bounds:[10,50,370,120] , text:'' ,properties:{borderStyle:'etched',su1PanelCoordinates:true},"+
"folder1:EditText{bounds:[10,10,300,30] , text:'' ,properties:{multiline:false,noecho:false,readonly:false}},"+
"Browse:IconButton{bounds:[310,10,350,30] , icon:'SourceFolderIcon',properties:{style:'button'}},"+
"smart:Checkbox{bounds:[10,40,200,61] , text:'Smart Objects?' },"+
"flatten:Checkbox{bounds:[210,40,380,61] , text:'Flatten File?' }},"+
"process:Button{bounds:[10,130,180,151] , text:'Process' },"+
"button1:Button{bounds:[200,130,370,151] , text:'Cancel' }}};";
var win = new Window(dlg,'Tile Camera Maker');
if(version.substr(0,version.indexOf('.'))>9){
win.panel0.title.graphics.font = ScriptUI.newFont("Arial","BOLDITALIC",20);
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [1.00, 1.00, 1.00, 1]);
g.backgroundColor = myBrush;
var myPen =g.newPen (g.PenType.SOLID_COLOR, [1.00, 0.00, 0.00, 1],lineWidth=1);
}
win.panel0.panel1.folder1.enabled=false;
win.center();
win.panel0.panel1.Browse.onClick = function() {
 inputFolder = Folder.selectDialog("Please select the folder with Files to process");	
	if(inputFolder !=null){
		win.panel0.panel1.folder1.text =  decodeURI(inputFolder.fsName); 
		}
}
win.panel0.process.onClick = function() {
	if(win.panel0.panel1.folder1.text == '') {
			alert("No input folder selected!");
			return;
		}
	win.close(1);
	ProcessFiles();
}
win.show();
function ProcessFiles(){
var fileList = inputFolder.getFiles(/\.(jpg|tif|eps|psd|exr)$/i);
if(fileList == null) return;
var startRulerUnits = preferences.rulerUnits;
preferences.rulerUnits = Units.PIXELS;
app.displayDialogs = DialogModes.NO;
var Down = Math.sqrt(fileList.length);
fileList = fileList.sort();
var Across = Down;
open(fileList[0]);
app.activeDocument.duplicate(fileList[0].name.match(/(.*)\.[^\.]+$/)[1]+"-combined");
app.documents[0].close(SaveOptions.DONOTSAVECHANGES);
var FillColor = new SolidColor;
FillColor.rgb.hexValue = 'ffffff'; 
activeDocument.selection.selectAll();
activeDocument.selection.fill(FillColor);
activeDocument.selection.deselect();
var w=app.activeDocument.width*Down;
var h=app.activeDocument.height*Down;
var offsetX = app.activeDocument.width.value;
var offsetY = app.activeDocument.height.value;
app.activeDocument.resizeCanvas(w, h, AnchorPosition.TOPLEFT);
TLX = 0;	TLY = 0;	TRX = offsetX;	TRY = 0;    BRX = offsetX;	BRY = offsetY;	BLX = 0;	BLY = offsetY;
var z =0;
	for(var a = 0; a < Down; a++){
		for(var i = 0;i <Across; i++){
				activeDocument.selection.select([[TLX,TLY],[TRX,TRY],[BRX,BRY],[BLX,BLY]], SelectionType.REPLACE, 0, false); 
				placeFile(fileList[z]);
				if(!win.panel0.panel1.smart.value){
				rasterLayer();
				}
				activeDocument.activeLayer.name = fileList[z].name.match(/(.*)\.[^\.]+$/)[1];
				app.activeDocument.selection.deselect();
				z++;
TLX = offsetX * (i+1) ;	TRX  = TLX + offsetX;	BRX = TRX;	BLX = TLX;		
	}
TLX = 0;	TLY = offsetY * (a +1); TRX = offsetX;	TRY = offsetY * (a +1);
BRX = offsetX;	BRY = TRY + offsetY; BLX = 0;	BLY = (offsetY * (a +1)+offsetY);
	}
if(win.panel0.panel1.flatten.value) activeDocument.flatten();
app.preferences.rulerUnits = startRulerUnits;
	}
}
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