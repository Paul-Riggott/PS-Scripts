//#target photoshop
function main(){
if(!documents.length) return;
var win = new Window( 'dialog', 'RL' ); 
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
g.backgroundColor = myBrush;
win.orientation='stack';
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.g1 = win.p1.add('group');
win.g1.orientation = "row";
win.title = win.g1.add('statictext',undefined,'Resize Selected Layers');
win.title.alignment="fill";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
win.g5 =win.p1.add('group');
win.g5.orientation = "row";
win.g5.alignment='left';
win.g5.spacing=10;
win.g5.st1 = win.g5.add('statictext',undefined,'Resize to...');
win.g5.et1 = win.g5.add('edittext');
win.g5.et1.preferredSize=[60,20];
resizeUnits = ["pixels", "inches","cm", "mm"];
win.g5.dd1 = win.g5.add('dropdownlist',undefined,resizeUnits);
win.g5.dd1.selection=0;
var resizeWH=["Width","Height"];
win.g5.dd2 = win.g5.add('dropdownlist',undefined,resizeWH);
win.g5.dd2.selection=0;
win.g5.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g7 =win.p1.add('group');
win.g7.orientation = "row";
win.g7.alignment='left';
var ResizeMethods=["Nearest Neighbour","Bicubic","Bilinear","Bicubic Smoother","Bicubic Sharper","Bicubic Automatic"];
if(app.version.match(/\d+/) <13) ResizeMethods=["Nearest Neighbour","Bicubic","Bilinear","Bicubic Smoother","Bicubic Sharper"];
var ResizeMethod=["nearestNeighbor","bicubic","bilinear","bicubicSmoother","bicubicSharper","bicubicAutomatic"];
win.g7.st1 = win.g7.add('statictext',undefined,'Resize Method');
win.g7.dd1 = win.g7.add('dropdownlist',undefined,ResizeMethods);
if(app.version.match(/\d+/) >12){
win.g7.dd1.selection=5;
}else{
    win.g7.dd1.selection=1;
    }
win.g10 =win.p1.add('group');
win.g10.orientation = "row";
win.g10.alignment='fill';
win.g10.spacing=10;
win.g10.bu1 = win.g10.add('button',undefined,'Process');
win.g10.bu1.preferredSize=[150,25];
win.g10.bu2 = win.g10.add('button',undefined,'Cancel');
win.g10.bu2.preferredSize=[150,25];
win.g10.bu1.onClick=function(){
if(win.g5.et1.text == ''){
    alert("You have not entered a required size!");
    return;
    }
win.close(0);
var origResizeMethod = resizeMethod();
//0 = Width 1 = Height
var WH = win.g5.dd2.selection.index; 
Res = activeDocument.resolution;
Pixel = Number(win.g5.et1.text);
CM = Res/2.54;
MM = Res/25.4;
switch(win.g5.dd1.selection.index){
    case 0 : break;
    case 1 : Pixel = Pixel * Res; break;
    case 2 : Pixel = Pixel * CM; break;
    case 3 : Pixel = Pixel * MM; break;
    default : break;
    }
var selectedLayers = getSelectedLayersIdx();
var startRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;
setResizeMethod(ResizeMethod[win.g7.dd1.selection.index].toString());
for (var z in selectedLayers){
selectLayerByIndex(Number(selectedLayers[z]));
resizeLayer(Pixel,Number(WH));
    }
setResizeMethod(origResizeMethod);
app.preferences.rulerUnits = startRulerUnits;
}
win.center();
win.show();
}
main();

function resizeLayer(Pixel,WH){
var doc = activeDocument;
var res= doc.resolution;
var LB = activeDocument.activeLayer.bounds;
if(WH==1){
var Height = LB[3].value - LB[1].value;
var onePix = 100/Height;
}else{
var Width = LB[2].value - LB[0].value;
var onePix = 100/Width;
}
var newSize = onePix * Pixel; 
doc.activeLayer.resize( newSize , newSize, AnchorPosition.MIDDLECENTER); 
}
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
function getSelectedLayersIdx(){ 
      var selectedLayers = new Array; 
      var ref = new ActionReference(); 
      ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
      var desc = executeActionGet(ref); 
      if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) ){ 
         desc = desc.getList( stringIDToTypeID( 'targetLayers' )); 
          var c = desc.count 
          var selectedLayers = new Array(); 
          for(var i=0;i<c;i++){ 
            try{ 
               activeDocument.backgroundLayer; 
               selectedLayers.push(  desc.getReference( i ).getIndex() ); 
            }catch(e){ 
               selectedLayers.push(  desc.getReference( i ).getIndex()+1 ); 
            } 
          } 
       }else{ 
         var ref = new ActionReference(); 
         ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" )); 
         ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
         try{ 
            activeDocument.backgroundLayer; 
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1); 
         }catch(e){ 
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))); 
         } 
      } 
      return selectedLayers; 
};
function resizeMethod(){
var ref1 = new ActionReference();
ref1.putEnumerated( charIDToTypeID('capp'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
var resizeMethod =  typeIDToStringID(executeActionGet(ref1).getEnumerationValue(charIDToTypeID('IntM')));
return resizeMethod;
};
function setResizeMethod(Method) {
    var desc1 = new ActionDescriptor();
        var ref1 = new ActionReference();
        ref1.putProperty( charIDToTypeID('Prpr'), charIDToTypeID('GnrP') );
        ref1.putEnumerated( charIDToTypeID('capp'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc1.putReference( charIDToTypeID('null'), ref1 );
        var desc2 = new ActionDescriptor();
        desc2.putEnumerated( charIDToTypeID('IntM'), charIDToTypeID('Intp'), stringIDToTypeID(Method) );
        if(app.version.match(/\d+/) >12) desc2.putBoolean( stringIDToTypeID('legacyPathDrag'), true );
    desc1.putObject( charIDToTypeID('T   '), charIDToTypeID('GnrP'), desc2 );
    executeAction( charIDToTypeID('setd'), desc1, DialogModes.NO );
};