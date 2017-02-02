#target photoshop
app.bringToFront();
///////////////////////////////////
// Photoshop CS5 or better
///////////////////////////////////
function main(){
if(Number(app.version.match(/^\d+/)) <12){
   alert("Sorry but you need to have Photoshop CS5 or better");
   return;
    }
if(!documents.length) return;
var startRulerUnits = app.preferences.rulerUnits;
app.preferences.rulerUnits = Units.PIXELS;
if (ExternalObject.AdobeXMPScript == undefined)  ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
var psNamespace = "http://ns.multiguidesets/1.0/";
var psPrefix = "mgsets:";
XMPMeta.registerNamespace(psNamespace, psPrefix);
existingGuidePresets = [];
existingGuidePresets = getGuideArray();
var guides = app.activeDocument.guides;
var gH = '';
var gV = '';
for( var g = 0; g < guides.length; g++ ){
    if(guides[g].direction.toString() == 'Direction.HORIZONTAL'){
        gH+=(parseInt(guides[g].coordinate.value));
        gH+=',';
        }else{
            gV+=(parseInt(guides[g].coordinate.value));
            gV+=','
            }
}
gH=gH.replace(/,$/,'');
gV=gV.replace(/,$/,'');
app.preferences.rulerUnits = startRulerUnits;
var win = new Window( 'dialog', 'Custom Guides' ); 
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
g.backgroundColor = myBrush;
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.g1 = win.p1.add('group');
win.g1.orientation = "row";
win.title = win.g1.add('statictext',undefined,'Custom Guides');
win.title.alignment="fill";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
win.g5 =win.p1.add('group');
win.g5.orientation = "row";
win.g5.alignment='fill';
win.g5.spacing=10;
win.g5.st1 = win.g5.add('statictext',undefined,'Existing Presets');
win.g5.dd1 = win.g5.add('dropdownlist');
win.g5.dd1.preferredSize=[300,20];
for(var w in existingGuidePresets){
    win.g5.dd1.add('item',existingGuidePresets[w].toString().match(/[^¬]*/));
    }
win.g5.dd1.selection=0;
win.g10 =win.p1.add('group');
win.g10.orientation = "row";
win.g10.alignment='fill';
win.g10.spacing=10;
win.g10.bu1 = win.g10.add('button',undefined,'Remove Preset');
win.g10.bu2 = win.g10.add('button',undefined,'Use and Append Guides');
win.g10.bu3 = win.g10.add('button',undefined,'Use and Remove Guides');
win.g15 =win.p1.add('group');
win.g15.orientation = "row";
win.g15.alignment='fill';
win.g15.st1 = win.g15.add('statictext',undefined,'New Preset Name');
win.g20 =win.p1.add('group');
win.g20.orientation = "row";
win.g20.alignment='fill';
win.g20.spacing=10;
win.g20.et1 = win.g20.add('edittext');
win.g20.et1.preferredSize=[300,20];
win.g20.bu1 = win.g20.add('button',undefined,'Add New Preset');
win.g200 =win.p1.add('group');
win.g200.orientation = "row";
win.g200.bu1 = win.g200.add('button',undefined,'Cancel');
win.g200.bu1.preferredSize=[350,30];
win.g10.bu1.onClick=function(){
if(existingGuidePresets.length == 0) return;
existingGuidePresets.splice(win.g5.dd1.selection.index,1);
win.g5.dd1.removeAll();
for(var w in existingGuidePresets){
    win.g5.dd1.add('item',existingGuidePresets[w].toString().match(/[^¬]*/));
    }
win.g5.dd1.selection=0;
putGuideArray(existingGuidePresets);
    }
win.g10.bu2.onClick=function(){
if(existingGuidePresets.length == 0) return;
win.close(0);
var ar1 = existingGuidePresets[win.g5.dd1.selection.index].toString().split('¬');
var Hor = ar1[1].toString().split(',');
var Ver = ar1[2].toString().split(',');
for(var H in Hor){
    activeDocument.guides.add(Direction.HORIZONTAL,new UnitValue(Number(Hor[H]),'px'));
    }
for(var V in Ver){
    activeDocument.guides.add(Direction.VERTICAL,new UnitValue(Number(Ver[V]),'px'));
    }
    }
win.g10.bu3.onClick=function(){
if(existingGuidePresets.length == 0) return;
win.close(0);
clearGuides();
var ar1 = existingGuidePresets[win.g5.dd1.selection.index].toString().split('¬');
var Hor = ar1[1].toString().split(',');
var Ver = ar1[2].toString().split(',');
for(var H in Hor){
    activeDocument.guides.add(Direction.HORIZONTAL,new UnitValue(Number(Hor[H]),'px'));
    }
for(var V in Ver){
    activeDocument.guides.add(Direction.VERTICAL,new UnitValue(Number(Ver[V]),'px'));
    }
    }
win.g20.bu1.onClick=function(){
if(app.activeDocument.guides.length == 0){
    alert("No guides exist");
    return;
    }
if(win.g20.et1.text == ''){
    alert("You need to enter a name for the new preset");
    return;
    }
win.close(0);
currentGuides = win.g20.et1.text + "¬" + gH + "¬" + gV;
existingGuidePresets.push(currentGuides);
putGuideArray(existingGuidePresets);
    }
win.center();
win.show();
function getGuideArray(){
var xmp; 
var newGuideArray=[];
xmp = new XMPMeta( app.activeDocument.xmpMetadata.rawData );
var Count = xmp.countArrayItems(psNamespace, "GuideArray");
for(var i = 1;i <= Count;i++){
	newGuideArray.push(xmp.getArrayItem(psNamespace, "GuideArray", i).toString());
}
return newGuideArray;
 }
function putGuideArray(gArray){
var xmp; 
xmp = new XMPMeta( app.activeDocument.xmpMetadata.rawData ); 
xmp.deleteProperty(psNamespace, "GuideArray");		
 for(var g in gArray){
 xmp.appendArrayItem(psNamespace, "GuideArray", gArray[g].toString(), 0, XMPConst.ARRAY_IS_UNORDERED);
 }
app.activeDocument.xmpMetadata.rawData = xmp.serialize();
}
function clearGuides() { 
   var id556 = charIDToTypeID( "Dlt " ); 
       var desc102 = new ActionDescriptor(); 
       var id557 = charIDToTypeID( "null" ); 
           var ref70 = new ActionReference(); 
           var id558 = charIDToTypeID( "Gd  " ); 
           var id559 = charIDToTypeID( "Ordn" ); 
           var id560 = charIDToTypeID( "Al  " ); 
           ref70.putEnumerated( id558, id559, id560 ); 
       desc102.putReference( id557, ref70 ); 
   executeAction( id556, desc102, DialogModes.NO ); 
};
}
main();