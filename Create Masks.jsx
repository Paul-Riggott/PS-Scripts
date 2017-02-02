#target photoshop
app.bringToFront();
main();
function main(){
if(!documents.length) return;
var Ver =app.version.match(/\d+/);
if(Ver < 10) return;
try{
boundstest = activeDocument.selection.bounds;
}catch(e){
try{
var workPath = activeDocument.pathItems.getByName("Work Path");
workPath.makeSelection();
workPath.remove();
}catch(e){
    alert("You need to have made a\rSELECTION or a PATH\rbefore running this script!");
    return;
    }
}
var win= new Window('dialog','Create Masks');
win.pnl1 = win.add('panel', undefined, undefined, {borderStyle:"black"}); 
win.grp5 = win.pnl1.add('group');
win.grp5.title = win.grp5.add('statictext',undefined,'Mask Maker');
win.grp5.title.graphics.font = ScriptUI.newFont("Georgia","BOLDITALIC",20);
win.grp10 = win.pnl1.add('group');
var nMasks =[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
win.grp10.st1 = win.grp10.add('statictext',undefined,'Horizontal');
win.grp10.dd1 = win.grp10.add('dropdownlist',undefined,nMasks);
win.grp10.dd1.selection=0;
win.grp10.st2 = win.grp10.add('statictext',undefined,'Vertical');
win.grp10.dd2 = win.grp10.add('dropdownlist',undefined,nMasks);
win.grp10.dd2.selection=0;
win.grp10.st3 = win.grp10.add('statictext',undefined,'Pitch');
win.grp10.et1 = win.grp10.add('edittext',undefined,'20');
win.grp10.et1.preferredSize=[50,20];
win.grp12 = win.pnl1.add('group');
win.grp12.alignment='left';
var Shapes = ["Rectangle","Elipse", "Rounded Corners"];
win.grp12.dd1 = win.grp12.add('dropdownlist',undefined,Shapes);
win.grp12.dd1.selection=0;
win.grp12.st1 = win.grp12.add('statictext',undefined,'Feather');
win.grp12.et1 = win.grp12.add('edittext',undefined,'0');
win.grp12.et1.preferredSize=[50,20];
win.grp12.dd1.onChange=function(){
    if(Number(win.grp12.dd1.selection.index) == 2){
        win.grp12.et1.enabled=false;
        selectTool('roundedRectangleTool'); 
        }else{
            win.grp12.et1.enabled=true;
            }
    }
win.grp12.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.grp14 = win.pnl1.add('group');
win.grp14.alignment='left';
win.grp14.cb1 = win.grp14.add('checkbox',undefined,'Stroke Masks');
var colours = ["Black","White","Red","Green","Blue"];
win.grp14.dd1 = win.grp14.add('dropdownlist',undefined,colours);
win.grp14.dd1.selection=0;
win.grp14.st1 = win.grp14.add('statictext',undefined,'Width');
var nwidth=[1,2,3,4,5,6,7,8,9,10];
win.grp14.dd2 = win.grp14.add('dropdownlist',undefined,nwidth);
win.grp14.dd2.selection=4;

win.grp15 = win.pnl1.add('group');
win.grp15.alignment='left';
win.grp15.st1 = win.grp15.add('statictext',undefined,'Ratio');
var ratios =["None","1:1 Ratio","3:2 Ratio","5:4 Ratio","16:9 Ratio"];
win.grp15.dd1 = win.grp15.add('dropdownlist',undefined,ratios);
win.grp15.dd1.selection=0;
win.grp15.cb1 = win.grp15.add('checkbox',undefined,'Portrait Masks');
win.grp100 = win.add('group');
win.grp100.bu1 = win.grp100.add('button',undefined,'Make Masks');
win.grp100.bu1.preferredSize=[100,30];
win.grp100.bu2 = win.grp100.add('button',undefined,'Cancel');
win.grp100.bu2.preferredSize=[100,30];
win.grp100.bu3 = win.grp100.add('button',undefined,'Just One');
win.grp100.bu3.preferredSize=[100,30];
win.grp10.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.grp100.bu1.onClick=function(){
    win.close(1);
    }
win.grp100.bu3.onClick=function(){
  var FillColor = new SolidColor;
	FillColor.rgb.hexValue = 'CACACA'; 
     activeDocument.artLayers.add();
	activeDocument.selection.fill(FillColor);
    activeDocument.activeLayer.name =  (new Date().getTime()).toString();
    var desc = new ActionDescriptor();
    desc.putClass( charIDToTypeID('Nw  '), charIDToTypeID('Chnl') );
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk ') );
    desc.putReference( charIDToTypeID('At  '), ref );
    desc.putEnumerated( charIDToTypeID('Usng'), charIDToTypeID('UsrM'), charIDToTypeID('RvlS') );
    executeAction( charIDToTypeID('Mk  '), desc, DialogModes.NO );
     if(win.grp14.cb1.value) Stroke();
    win.close(3);
    }
win.center();
var result = win.show();

if(result == 1){
var strtRulerUnits = app.preferences.rulerUnits;   			 
var strtTypeUnits = app.preferences.typeUnits;   			 
app.preferences.rulerUnits = Units.PIXELS;   			 
app.preferences.typeUnits = TypeUnits.PIXELS;
var bounds =  activeDocument.selection.bounds;
var horizontal = Number(win.grp10.dd1.selection.index+1);
var vertical = Number(win.grp10.dd2.selection.index+1);
var pitch = Number(win.grp10.et1.text);
var ratio=0;
switch(win.grp15.dd1.selection.index){
	case 0: break;
	case 1:ratio =1;break;
	case 2:ratio =1.5;break;
	case 3:ratio = 1.25;break;
    case 4:ratio = 1.7777;break;
	default :break;
}
if(win.grp15.dd1.selection.index != 0){
var SH = bounds[3] - bounds[1];
var SW = bounds[2] - bounds[0];
SH = SH - (pitch*(vertical-1));
SW = SW - (pitch*(horizontal-1));
if(!win.grp15.cb1.value){
var MW = SW/horizontal;
var MH =SH/vertical;
if(MH>(MW/ratio)){
bounds[3] = ((MW/ratio) * vertical) + (pitch * (vertical - 1))+bounds[1];
	}else{
bounds[2] = ((MH*ratio) * horizontal) + (pitch * (horizontal -1))+bounds[0];		
		}
	}else{
var MH =SH/vertical;
var MW = MH/ratio;
bounds[2] = ((MW * horizontal) + (pitch * (horizontal -1)))+bounds[0];	
if((MW*horizontal)>SW){
var MW = SW/horizontal;
var MH =MW*ratio;
bounds[2] = ((MW * horizontal) + (pitch * (horizontal -1)))+bounds[0];
bounds[3] = ((MH * vertical) + (pitch * (vertical -1))) + bounds[1];
        }
	}
}
var masks = rMasks(bounds,horizontal,vertical,pitch);
var layerNames=[];		
	for(i=0;i<horizontal;i++){
		for(j=0;j<vertical;j++){
			var temp = masks[i][j];
			var maskName = (new Date().getTime()).toString();
			layerNames.push(maskName);
			MakeLayerMask(maskName,temp[0],temp[1],temp[2],temp[3],Number(win.grp12.et1.text));
		}
	}
selectTool('marqueeRectTool'); 
app.preferences.rulerUnits = strtRulerUnits;  
app.preferences.typeUnits = strtTypeUnits;
for(var a in layerNames){
    addToSelection(layerNames[a]);
        }
    }
function rMasks(bnds,horizontal,vertical,pitch){
	var masks = new Array(horizontal);
	var newWidth = (bnds[2]-bnds[0]-pitch*(horizontal-1))/horizontal;
	var newHeight = (bnds[3]-bnds[1]-pitch*(vertical-1))/vertical;
	for(var h =0;h<horizontal;h++){
		masks[h] = new Array(vertical);
		for(var v=0;v<vertical;v++){
			masks[h][v] = new Array();
			masks[h][v].push(Math.round(bnds[0]+h*(newWidth+pitch)));
			masks[h][v].push(Math.round(bnds[1]+v*(newHeight+pitch)));
			masks[h][v].push(Math.round(bnds[0]+newWidth+h*(newWidth+pitch)));
			masks[h][v].push(Math.round(bnds[1]+newHeight+v*(newHeight+pitch)));
		}
	}	
	return masks;
}
function MakeLayerMask(LayerName,Left,Top,Right,Bottom,Feather){
	var Colour = new SolidColor;
	Colour.rgb.hexValue = 'CACACA'; 
    switch(Number(win.grp12.dd1.selection.index)){
     case 0 : activeDocument.selection.select([[Left,Top],[Right,Top],[Right,Bottom],[Left,Bottom]], SelectionType.REPLACE,Feather, false); break;
    case 1 : Circle(Top,Left,Bottom,Right,Feather); break;
    case 2 : roundedBox(Left,Top,Right,Bottom); break;
    default : break;
    }
	 activeDocument.artLayers.add();
	activeDocument.selection.fill(Colour);
    addMask();
    if(win.grp14.cb1.value) Stroke();
	activeDocument.activeLayer.name = LayerName;
}
function addMask(){
    var desc = new ActionDescriptor();
    desc.putClass( charIDToTypeID('Nw  '), charIDToTypeID('Chnl') );
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk ') );
    desc.putReference( charIDToTypeID('At  '), ref );
    desc.putEnumerated( charIDToTypeID('Usng'), charIDToTypeID('UsrM'), charIDToTypeID('RvlS') );
    executeAction( charIDToTypeID('Mk  '), desc, DialogModes.NO );
}
function addToSelection(LayerName){
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putName( charIDToTypeID('Lyr '), LayerName );
    desc.putReference( charIDToTypeID('null'), ref );
    desc.putEnumerated( stringIDToTypeID('selectionModifier'), stringIDToTypeID('selectionModifierType'), stringIDToTypeID('addToSelection') );
    desc.putBoolean( charIDToTypeID('MkVs'), false );
    executeAction( charIDToTypeID('slct'), desc, DialogModes.NO );
};
function Circle(Top,Left,Bottom,Right,Feather) { 
if(Feather == undefined) Feather = 0;
var desc3 = new ActionDescriptor(); 
        var ref1 = new ActionReference(); 
        ref1.putProperty( charIDToTypeID('Chnl'), charIDToTypeID('fsel') ); 
    desc3.putReference( charIDToTypeID('null'), ref1 ); 
        var desc4 = new ActionDescriptor(); 
        desc4.putUnitDouble( charIDToTypeID('Top '), charIDToTypeID('#Pxl'), Top ); 
        desc4.putUnitDouble( charIDToTypeID('Left'), charIDToTypeID('#Pxl'), Left ); 
        desc4.putUnitDouble( charIDToTypeID('Btom'), charIDToTypeID('#Pxl'), Bottom ); 
        desc4.putUnitDouble( charIDToTypeID('Rght'), charIDToTypeID('#Pxl'), Right ); 
    desc3.putObject( charIDToTypeID('T   '), charIDToTypeID('Elps'), desc4 ); 
    desc3.putUnitDouble( charIDToTypeID('Fthr'), charIDToTypeID('#Pxl'), Feather );
    desc3.putBoolean( charIDToTypeID('AntA'), true ); 
    executeAction( charIDToTypeID('setd'), desc3, DialogModes.NO ); 
};
function roundedBox(Left,Top,Right,Bottom) {
    var desc54 = new ActionDescriptor();
        var ref38 = new ActionReference();
        ref38.putProperty( charIDToTypeID('Path'), charIDToTypeID('WrPt') );
    desc54.putReference( charIDToTypeID('null'), ref38 );
        var desc55 = new ActionDescriptor();
        desc55.putString( charIDToTypeID('Nm  '), "Rounded Square" );
        desc55.putUnitDouble( charIDToTypeID('Top '), charIDToTypeID('#Pxl'), Top );
        desc55.putUnitDouble( charIDToTypeID('Left'), charIDToTypeID('#Pxl'), Left );
        desc55.putUnitDouble( charIDToTypeID('Btom'), charIDToTypeID('#Pxl'), Bottom );
        desc55.putUnitDouble( charIDToTypeID('Rght'), charIDToTypeID('#Pxl'), Right );
    desc54.putObject( charIDToTypeID('T   '), stringIDToTypeID('customShape'), desc55 );
    try{
    executeAction( charIDToTypeID('setd'), desc54, DialogModes.NO );
    }catch(e){
         loadShapes(Left,Top,Right,Bottom);
         return;
        }
    var workPath = activeDocument.pathItems.getByName("Work Path");
    workPath.makeSelection();
    workPath.remove();
};
function loadShapes(Left,Top,Right,Bottom) {
    var desc3 = new ActionDescriptor();
        var ref3 = new ActionReference();
        ref3.putProperty( charIDToTypeID('Prpr'), stringIDToTypeID('customShape') );
        ref3.putEnumerated( charIDToTypeID('capp'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc3.putReference( charIDToTypeID('null'), ref3 );
    desc3.putPath( charIDToTypeID('T   '), new File( app.path +"/Presets/Custom Shapes/Shapes.csh" ) );
    desc3.putBoolean( charIDToTypeID('Appe'), true );
    executeAction( charIDToTypeID('setd'), desc3, DialogModes.NO );
     roundedBox(Left,Top,Right,Bottom);
};
function selectTool(tool) { 
    var desc = new ActionDescriptor(); 
        var ref = new ActionReference(); 
        ref.putClass( app.stringIDToTypeID(tool) ); 
    desc.putReference( app.charIDToTypeID('null'), ref ); 
    executeAction( app.charIDToTypeID('slct'), desc, DialogModes.NO ); 
};
function Stroke(){
var strokeColour =win.grp14.dd1.selection.index;
var sWidth = Number(win.grp14.dd2.selection.index)+1;
 var sColour = new SolidColor;
 switch(Number(strokeColour)){
     case 0 : sColour.rgb.hexValue = '000000'; break;
     case 1 : sColour.rgb.hexValue = 'ffffff'; break;
     case 2 : sColour.rgb.hexValue = 'ff0000'; break;
     case 3 : sColour.rgb.hexValue = '00ff00'; break;
     case 4 : sColour.rgb.hexValue = '0000ff'; break;
     default : sColour.rgb.hexValue = '000000'; break;
     }
    var desc15 = new ActionDescriptor();
        var ref6 = new ActionReference();
        ref6.putProperty( charIDToTypeID('Prpr'), charIDToTypeID('Lefx') );
        ref6.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc15.putReference( charIDToTypeID('null'), ref6 );
        var desc16 = new ActionDescriptor();
        desc16.putUnitDouble( charIDToTypeID('Scl '), charIDToTypeID('#Prc'), 416.666667 );
            var desc17 = new ActionDescriptor();
            desc17.putBoolean( charIDToTypeID('enab'), true );
            desc17.putEnumerated( charIDToTypeID('Styl'), charIDToTypeID('FStl'), charIDToTypeID('InsF') );
            desc17.putEnumerated( charIDToTypeID('PntT'), charIDToTypeID('FrFl'), charIDToTypeID('SClr') );
            desc17.putEnumerated( charIDToTypeID('Md  '), charIDToTypeID('BlnM'), charIDToTypeID('Nrml') );
            desc17.putUnitDouble( charIDToTypeID('Opct'), charIDToTypeID('#Prc'), 100.000000 );
            desc17.putUnitDouble( charIDToTypeID('Sz  '), charIDToTypeID('#Pxl'), sWidth );
                var desc18 = new ActionDescriptor();
                desc18.putDouble( charIDToTypeID('Rd  '), sColour.rgb.red );
                desc18.putDouble( charIDToTypeID('Grn '), sColour.rgb.green );
                desc18.putDouble( charIDToTypeID('Bl  '), sColour.rgb.blue );
            desc17.putObject( charIDToTypeID('Clr '), charIDToTypeID('RGBC'), desc18 );
        desc16.putObject( charIDToTypeID('FrFX'), charIDToTypeID('FrFX'), desc17 );
    desc15.putObject( charIDToTypeID('T   '), charIDToTypeID('Lefx'), desc16 );
    executeAction( charIDToTypeID('setd'), desc15, DialogModes.NO );
};
};