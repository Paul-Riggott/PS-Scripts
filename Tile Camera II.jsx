//Script to reassemble tiles with alpha rendered by the Tile Camera in Cinema 4d
//N.B. Tile Camera script must be run first!

#target photoshop  
app.bringToFront();  
main();  
function main(){  
if(!documents.length) return;  
try{  
var startRulerUnits = preferences.rulerUnits;  
preferences.rulerUnits = Units.PIXELS;  
var SOLayers = getNamesPlusIDs();  
for( var b in SOLayers){  
    //Remove non SO layers  
if(SOLayers[b][2].toString() != "false") continue;  
deleteLayerByID(Number(SOLayers[b][0]));  
}  
activeDocument.activeLayer = activeDocument.layers[activeDocument.layers.length-1];  
if(activeDocument.activeLayer.isBackgroundLayer){  
    activeDocument.activeLayer.name=activeDocument.activeLayer.name;  
}  
SOLayers = getNamesPlusIDs();  
//extract all layers and put them into the main document.  
//Then remove the SO.  
for( var a in SOLayers){  
    //Only work on SO layers  
if(SOLayers[a][2].toString() != "true") continue;  
var layerID = Number(SOLayers[a][0]);  
selectLayerById(layerID);  
selectArea();  
var LB = getLayerBoundsByIndex( layerID);  
openSO();  
//create layers from channels  
var aChannels =app.activeDocument.channels.length;  
var start = app.activeDocument.componentChannels.length;  
for(var g = start;g<aChannels;g++){  
    var cName = app.activeDocument.channels[g].name;  
    app.activeDocument.activeChannels = [app.activeDocument.channels.getByName(cName)];  
    app.activeDocument.selection.selectAll();  
    app.activeDocument.selection.copy();  
    app.activeDocument.artLayers.add();  
    app.activeDocument.paste();  
    app.activeDocument.activeLayer.name = cName;  
    app.activeDocument.selection.deselect();  
}  
//set visibility on for all layers  
setLayersVisOn();  
activeDocument.activeLayer = activeDocument.layers[activeDocument.layers.length-1];  
if(activeDocument.activeLayer.isBackgroundLayer){  
    activeDocument.activeLayer.name=activeDocument.activeLayer.name;  
}  
selectAllLayers();  
dupLayers(app.documents[0].name);  
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);  
activeDocument.selection.translate(LB[0],LB[1]);  
deleteLayerByID(layerID);  
if(a % 20 == 0) mergeSameNamedLayers();  
}  
mergeSameNamedLayers();  
WaterMarkHide();  
//Update Alpha channels from created layers  
var aChannels =app.activeDocument.channels.length;  
var start = app.activeDocument.componentChannels.length;  
for(var a = aChannels-1;a>=start;a--){  
var cName = app.activeDocument.channels[a].name;  
activeDocument.activeLayer = activeDocument.artLayers.getByName(cName);  
activeDocument.channels[cName].remove();  
activeDocument.channels[0].duplicate().name=cName;  
activeDocument.activeChannels = activeDocument.componentChannels;  
activeDocument.activeLayer.visible=false;  
    }  
activeDocument.activeLayer = activeDocument.layers[activeDocument.layers.length-1];  
activeDocument.activeLayer.isBackgroundLayer=true;  
activeDocument.activeLayer.visible=false;  
app.preferences.rulerUnits = startRulerUnits;  
}catch(e){alert(e + " - " + e.line);}  
};  
//////////////////F U N C T I O N S  
function twoOrMoreSelected(){   
var ref = new ActionReference();   
ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );   
var desc = executeActionGet(ref);   
if( desc.hasKey( stringIDToTypeID( 'targetLayers' ) ) )  return true;  
return false;  
}  
function mergeSameNamedLayers(){  
//Get a list of the layer names  
var layerNameList = getNamesPlusIDs();  
//create an array for unique layer names  
var uniqueName = new Array();  
for(var s in layerNameList){  
    if(layerNameList[s][2] == "false") uniqueName.push( layerNameList[s][1].toString());  
    }  
//now we should have unique layer names  
uniqueName = UniqueSortedList( uniqueName ).sort();  
//select all layers with the same name, merge them and set blendmode  
var BlendMode = new String();  
for ( var w in uniqueName){  
    deselectLayers();  
    for(var z in layerNameList){  
        if(uniqueName[w].toString() == layerNameList[z][1].toString()){  
            //select these layers and get blendmode.  
            BlendMode = layerNameList[z][3].toString();  
            selectLayerById(Number(layerNameList[z][0]), true);  
        }  
        }  
if(twoOrMoreSelected()) activeDocument.activeLayer.merge();  
        setBlendMode(BlendMode);  
}  
};  
function hasSelection (doc) {   
if(doc == undefined) doc = activeDocument;  
  var res = false;   
  var as = doc.activeHistoryState;   
  doc.selection.deselect();   
  if (as != doc.activeHistoryState) {   
    res = true;   
    doc.activeHistoryState = as;   
  }   
  return res;   
};  
function deselectLayers() {   
    var desc01 = new ActionDescriptor();   
        var ref01 = new ActionReference();   
        ref01.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );   
    desc01.putReference( charIDToTypeID('null'), ref01 );   
    executeAction( stringIDToTypeID('selectNoLayers'), desc01, DialogModes.NO );   
};  
function setBlendMode(blendMode) {  
var desc = new ActionDescriptor();  
var ref = new ActionReference();  
ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );  
desc.putReference( charIDToTypeID('null'), ref );  
var desc2 = new ActionDescriptor();  
desc2.putEnumerated( charIDToTypeID('Md  '), charIDToTypeID('BlnM'), stringIDToTypeID(blendMode) );  
desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc2 );  
executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );  
};  
function UniqueSortedList(ArrayName){  
var unduped = new Object;  
for (var i = 0; i < ArrayName.length; i++) {     
unduped[ArrayName[i]] = ArrayName[i];  
}  
var uniques = new Array;for (var k in unduped) {  
   uniques.push(unduped[k]);}  
return uniques;  
}  
function selectLayerById(ID, add) {  
    add = (add == undefined)  ? add = false : add;  
 var ref = new ActionReference();  
 ref.putIdentifier(charIDToTypeID('Lyr '), ID);  
 var desc = new ActionDescriptor();  
 desc.putReference(charIDToTypeID('null'), ref);  
 if (add) {  
  desc.putEnumerated(stringIDToTypeID('selectionModifier'), stringIDToTypeID('selectionModifierType'), stringIDToTypeID('addToSelection'));  
 }  
 desc.putBoolean(charIDToTypeID('MkVs'), false);  
 executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);  
}  
function getNamesPlusIDs(){   
   var ref = new ActionReference();   
   ref.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );   
   var count = executeActionGet(ref).getInteger(charIDToTypeID('NmbL')) +1;   
   var Names=[];  
try{  
    activeDocument.backgroundLayer;  
var i = 0; }catch(e){ var i = 1; };  
   for(i;i<count;i++){   
       if(i == 0) continue;  
        ref = new ActionReference();   
        ref.putIndex( charIDToTypeID( 'Lyr ' ), i );  
        var desc = executeActionGet(ref);  
        var layerName = desc.getString(charIDToTypeID( 'Nm  ' ));  
        var Id = desc.getInteger(stringIDToTypeID( 'layerID' ));  
        if(layerName.match(/^<\/Layer group/) ) continue;  
        var layerType = typeIDToStringID(desc.getEnumerationValue( stringIDToTypeID( 'layerSection' )));  
         desc.hasKey( stringIDToTypeID( 'smartObject' ) )  ?  SO = true :  SO=false;  
         var blendmode = typeIDToStringID(desc.getEnumerationValue( stringIDToTypeID( 'mode' )));  
Names.push([[Id],[layerName],[SO],[blendmode]]);  
   };   
return Names;  
};  
function deleteLayerByID(ID) {  
    var desc = new ActionDescriptor();  
        var ref = new ActionReference();  
        ref.putIdentifier(charIDToTypeID('Lyr '), ID);  
    desc.putReference( charIDToTypeID('null'), ref );  
    executeAction( charIDToTypeID('Dlt '), desc, DialogModes.NO );  
};  
function dupLayers(DocName) {  
var desc = new ActionDescriptor();  
var ref = new ActionReference();  
ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );  
desc.putReference( charIDToTypeID('null'), ref );  
var ref2 = new ActionReference();  
ref2.putName( charIDToTypeID('Dcmn'), DocName);  
desc.putReference( charIDToTypeID('T   '), ref2 );  
desc.putInteger( charIDToTypeID('Vrsn'), 5 );  
executeAction( charIDToTypeID('Dplc'), desc, DialogModes.NO );  
};  
function WaterMarkHide() {  
var desc = new ActionDescriptor();  
var list = new ActionList();  
var ref = new ActionReference();  
ref.putName( charIDToTypeID('Lyr '), "Watermark (Alpha)" );  
list.putReference( ref );  
desc.putList( charIDToTypeID('null'), list );  
try{executeAction( charIDToTypeID('Hd  '), desc, DialogModes.NO );}catch(e){}  
};  
function selectAllLayers() {  
    var desc29 = new ActionDescriptor();  
        var ref23 = new ActionReference();  
        ref23.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );  
    desc29.putReference( charIDToTypeID('null'), ref23 );  
    executeAction( stringIDToTypeID('selectAllLayers'), desc29, DialogModes.NO );  
}  
function getLayerBoundsByIndex( ID ) {   
    var ref = new ActionReference();   
    ref.putProperty( charIDToTypeID("Prpr") , stringIDToTypeID( "bounds" ));   
    ref.putIdentifier(charIDToTypeID('Lyr '), ID);  
    var desc = executeActionGet(ref).getObjectValue(stringIDToTypeID( "bounds" ));  
    var bounds = [];  
    bounds.push(desc.getUnitDoubleValue(stringIDToTypeID('left')));  
    bounds.push(desc.getUnitDoubleValue(stringIDToTypeID('top')));  
    bounds.push(desc.getUnitDoubleValue(stringIDToTypeID('right')));  
    bounds.push(desc.getUnitDoubleValue(stringIDToTypeID('bottom')));   
    return bounds;  
};  
function selectArea() {  
var desc = new ActionDescriptor();  
var ref = new ActionReference();  
ref.putProperty( charIDToTypeID('Chnl'), charIDToTypeID('fsel') );  
desc.putReference( charIDToTypeID('null'), ref );  
var ref2 = new ActionReference();  
ref2.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Trsp') );  
desc.putReference( charIDToTypeID('T   '), ref2 );  
executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );  
};  
function openSO(){  
executeAction(stringIDToTypeID( "placedLayerEditContents" ), undefined, DialogModes.NO );  
};  
function setLayersVisOn(){   
   var ref = new ActionReference();   
   ref.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );   
   var count = executeActionGet(ref).getInteger(charIDToTypeID('NmbL')) +1;   
try{  
    activeDocument.backgroundLayer;  
var i = 0; }catch(e){ var i = 1; };  
   for(i;i<count;i++){   
        ref = new ActionReference();   
        ref.putIndex( charIDToTypeID( 'Lyr ' ), i );  
        var desc = executeActionGet(ref);  
        var layerName = desc.getString(charIDToTypeID( 'Nm  ' ))  
        if(layerName.match(/^<\/Layer group/) ) continue;  
        if(!desc.getBoolean(stringIDToTypeID('visible'))){  
            var list = new ActionList();  
            list.putReference( ref );  
            desc.putList( charIDToTypeID('null'), list );  
            executeAction( charIDToTypeID('Shw '), desc, DialogModes.NO );  
            }  
   };   
};