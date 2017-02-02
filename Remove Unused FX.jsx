#target photoshop
app.bringToFront();

app.activeDocument.suspendHistory('Remove Unused FX', 'main()');

function main(){
if(!documents.length) return;
selectAllLayers();
var selLayers = getSelectedLayersIdx();
for(var a in selLayers){
clearUnusedFX(Number(selLayers[a]));
    }
}
function clearUnusedFX(idx){
var ref = new ActionReference(); 
ref.putProperty( charIDToTypeID("Prpr") , stringIDToTypeID( "layerEffects" )); 
ref.putIndex( charIDToTypeID( "Lyr " ), idx);
var desc = executeActionGet(ref);
if(desc.hasKey(stringIDToTypeID('layerEffects'))){
makeActiveByIndex( idx );
var FXs = desc.getObjectValue(stringIDToTypeID('layerEffects'));
var ref9 = new ActionReference(); 
ref9.putProperty( charIDToTypeID("Prpr") , stringIDToTypeID( 'layerFXVisible')); 
ref9.putIndex( charIDToTypeID( "Lyr " ), idx);
var vis = executeActionGet(ref9);
var delALL = undefined;
if(vis.hasKey(stringIDToTypeID('layerFXVisible')))  delALL =  vis.getBoolean(stringIDToTypeID('layerFXVisible'));
    }else{
        return;
        }
var c = FXs.count;
var Effects= new Array();
for(var i=0;i<c;i++){ 
  Effects.push(typeIDToStringID(FXs.getKey(i)));
}
for(var z in Effects){
if(z == 0) continue;
var bool = FXs.getObjectValue(stringIDToTypeID(Effects[z].toString())).getBoolean (stringIDToTypeID('enabled'));
if(!bool || delALL == false) delFx(Effects[z].toString());
}
function delFx(fx){
var desc147 = new ActionDescriptor();
var ref45 = new ActionReference();
switch(fx.toString()){
        case 'dropShadow' : ref45.putClass(charIDToTypeID('DrSh')); break;
        case 'innerShadow' : ref45.putClass(charIDToTypeID('IrSh')); break;
        case 'outerGlow' : ref45.putClass(charIDToTypeID('OrGl')); break;
        case 'innerGlow' : ref45.putClass(charIDToTypeID('IrGl')); break;
        case 'bevelEmboss' :ref45.putClass(charIDToTypeID('ebbl')); break;
        case 'frameFX' : ref45.putClass(charIDToTypeID('FrFX')); break;
        case 'chromeFX' : ref45.putClass(charIDToTypeID('ChFX')); break;
        case 'solidFill' : ref45.putClass(charIDToTypeID('SoFi')); break;
        case 'gradientFill' : ref45.putClass(charIDToTypeID('GrFl')); break;
        case 'patternFill' : ref45.putClass(stringIDToTypeID('patternFill')); break;
        default : break;
        }       
ref45.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
desc147.putReference( charIDToTypeID('null'), ref45 );
try{
executeAction( charIDToTypeID('dsfx'), desc147, DialogModes.NO );   
}catch(e){}
    }
};
function makeActiveByIndex( idx ){ 
    var desc = new ActionDescriptor(); 
      var ref = new ActionReference(); 
      ref.putIndex(charIDToTypeID( "Lyr " ), idx) 
      desc.putReference( charIDToTypeID( "null" ), ref ); 
      desc.putBoolean( charIDToTypeID( "MkVs" ), false ); 
   executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO ); 
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