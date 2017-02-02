//Apply layer to selected layer comps
#target Photoshop

function main(){
if(!documents.length) return;
var newLayer = getSelectedLayersIdx()[0]; 
var doc = app.activeDocument;
for( var c = 0; c < doc.layerComps.length; c++ ){
    if( doc.layerComps[c].selected == true ){
   doc.layerComps[c].apply();
   makeActiveByIndex( Number(newLayer), true );
   doc.activeLayer.visible=true;
   doc.layerComps[c].recapture();
        }
    }
}
main();
function makeActiveByIndex( idx, visible ){ 
    var desc = new ActionDescriptor(); 
      var ref = new ActionReference(); 
      ref.putIndex(charIDToTypeID( "Lyr " ), idx) 
      desc.putReference( charIDToTypeID( "null" ), ref ); 
      desc.putBoolean( charIDToTypeID( "MkVs" ), visible ); 
   executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO ); 
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