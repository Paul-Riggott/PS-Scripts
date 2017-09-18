#target photoshop;
$.writeln("Active Layer Index = " + getActiveLayerIndex());
var lsetInfo = getLayersetLayerIDs(getActiveLayerIndex(),false);
$.writeln("Layer IDs = " + lsetInfo[0]); //Layer IDs in Layerset
if(lsetInfo[1].toString().length >1){
$.writeln("Nested LayerSet Indexs = " + lsetInfo[1]); //Nested layerset indexs
$.writeln("Number of nested layersets = " + lsetInfo[1].toString().split(",").length); //Number of nested layersets
}

function getLayersetLayerIDs(idx,nested){//nested = true  =  all nested layersets
var layerIDs = new Array();
lSetsIdx = new Array();
for(var y = idx-1, ls=0; ls >= 0 ; y--){  
var ref = new ActionReference();    
ref.putIndex(charIDToTypeID( "Lyr " ), y);   
var desc = executeActionGet(ref);   
var layerSection = typeIDToStringID(desc.getEnumerationValue(stringIDToTypeID('layerSection')));  
if(layerSection==="layerSectionStart"){  ls++;  lSetsIdx.push(y);}  
else if(layerSection==="layerSectionEnd"){  ls--;} else{
if(nested)layerIDs.push(desc.getInteger(stringIDToTypeID( 'layerID' )));
if(!nested && ls == 0)layerIDs.push(desc.getInteger(stringIDToTypeID( 'layerID' )));
//$.writeln(desc.getString(charIDToTypeID( 'Nm  ' )) + " ls = " + ls + " ID = " + desc.getInteger(stringIDToTypeID( 'layerID' )) + " Index = " + y);
}}
return [[layerIDs],[lSetsIdx]];
};
function getActiveLayerIndex() {
var ref = new ActionReference();
ref.putEnumerated( charIDToTypeID('Lyr '),charIDToTypeID('Ordn'),charIDToTypeID('Trgt') ); 
try{ activeDocument.backgroundLayer; 
return executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ))-1; 
}catch(e){ return executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )); }   
};