function main(){
if(!documents.length) return;
var doc = activeDocument;
selectAllLayers();
var layersSelected=getSelectedLayersIdx();
var layerIDs=[];
for(var d =0;d<layersSelected.length;d++){ layerIDs.push([[layersSelected[d]],["N"]]);}
for( var c = 0; c < doc.layerComps.length; c++ ){
      doc.layerComps[c].apply();
      for(var z in layersSelected){
          if(getLayerVisibilityByIndex( Number(layersSelected[z]))){
              for(var s in layerIDs){
                  if(Number(layersSelected[z]) == Number(layerIDs[s][0])){
                      layerIDs[s][1] = "Y"; 
                      break;
                      }
                  }
              }
          }
}
var toDelete=[];
for(var l in layerIDs){
    if(layerIDs[l][1].toString() == "N") {
       toDelete.push(getIDX(Number(layerIDs[l][0])));
        }
    }for(var t in toDelete){
        selLayer(Number(toDelete[t]));
        doc.activeLayer.remove();
        }
removeEmptyLayerSets();
alert("All Done");
}
main();
function removeEmptyLayerSets(){
var numberOfPasses=3;
for(var o = 0;o<numberOfPasses;o++){
selectAllLayers();
var sel = getSelectedLayersIdx();
var layerSets= [];
for (var a in sel){
if( isLayerSet( Number(sel[a]) )){
    layerSets.push(getIDX(Number(sel[a]) ));
    }
}
for(var p in layerSets){
         selLayer(Number(layerSets[p]),false);
if(activeDocument.activeLayer.layers.length == 0){
    try{
   if(activeDocument.activeLayer.typename == "LayerSet") activeDocument.activeLayer.remove();
   }catch(e){}
    }
}
}
}
function getIDX(idx) {
    var ref = new ActionReference(); 
    ref.putProperty( charIDToTypeID("Prpr") , stringIDToTypeID( "layerID" )); 
    ref.putIndex( charIDToTypeID( "Lyr " ), idx ); 
    return executeActionGet(ref).getInteger(stringIDToTypeID( "layerID" ));
}
function isLayerSet(idx){
  var propName = stringIDToTypeID( 'layerSection' );// can't replace
   var ref = new ActionReference(); 
   ref.putProperty( 1349677170 , propName);
   ref.putIndex( 1283027488, idx );
   var desc =  executeActionGet( ref );
   var type = desc.getEnumerationValue( propName );
   var res = typeIDToStringID( type ); 
   return res == 'layerSectionStart' ? true:false;
}
function getLayerVisibilityByIndex( idx ) {
var ref = new ActionReference();
ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "Vsbl" ));
ref.putIndex( charIDToTypeID( "Lyr " ), idx );
return executeActionGet(ref).getBoolean(charIDToTypeID( "Vsbl" ));
};

function getLayerItemIndexByLayerID(id) { 
    var ref = new ActionReference(); 
    ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" )); 
    ref.putIdentifier( charIDToTypeID( "Lyr " ), id ); 
	try{
    return executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" ));
	}catch(e){return true;}
};
function selLayer(layerID,add){
var result =getLayerItemIndexByLayerID(layerID);
if(result > 0){
    try{ 
    activeDocument.backgroundLayer;
    var bkGround = 1;
    }catch(e) {var bkGround = 0;}
	selectLayerByIndex(result - bkGround ,add);
	}else{
alert("Layer does not exist");		
		}
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