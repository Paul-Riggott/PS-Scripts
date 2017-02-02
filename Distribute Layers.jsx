//Row, Column or Grid can be selected and distributed.
#target photoshop
if(documents.length) app.activeDocument.suspendHistory('Distribute Layers', 'main()'); 
function main(){
var selectedLayers = getSelectedLayersIdx();
if(selectedLayers.length <3){
    alert("Not enough layers selected!");
    return;
    }
var boundsList=[];
var tempbnds=[];
showFX(false);
for(var a=0;a<selectedLayers.length;a++){
	var LB =getLayerBoundsByIndex(selectedLayers[a] );
	boundsList.push([[selectedLayers[a]],[LB[0]],[LB[1]],[LB[2]],[LB[3]]]);
	tempbnds=[];
	}
showFX(true);
boundsList.sort(function(a,b){return a[2]-b[2];}); 
var row1=[]; var row2=[]; var row3=[]; var row4=[]; var row5=[];
var row6=[]; var row7=[]; var row8=[]; var row9=[]; var row10=[];
var row11=[]; var row12=[]; var row13=[]; var row14=[]; var row15=[];
var row16=[]; var row17=[]; var row18=[]; var row19=[]; var row20=[];
var arrayNumber =1;
var TOP =Number(boundsList[0][2]);
for(var f =0;f<boundsList.length;f++){
	if(TOP > (boundsList[f][2]-50) && boundsList[f][2] < (boundsList[f][2]+50)){
		eval("row" +arrayNumber).push(boundsList[f]);
		}else{
            TOP =Number(boundsList[f][2]);
			arrayNumber++;
			eval("row" +arrayNumber).push(boundsList[f]);
		}
}
for(var d=0;d<arrayNumber;d++){
	eval("row" +(d+1)).sort(function(a,b){return a[1]-b[1];}); 
	}
if((row1.length*arrayNumber) != boundsList.length){
	alert("Unable to distribute this selection of layers!");
	return;
	}
for(var l=0;l<arrayNumber;l++){
var leftAnchor =Number(eval("row"+(l+1))[0][3]);
var spacingA =(Number(eval("row"+(l+1))[eval("row"+(l+1)).length-1][1])) - (Number(eval("row"+(l+1))[0][3]));
for(var a = 1;a<eval("row"+(l+1)).length-1;a++){
    var layerWidth = Number(eval("row"+(l+1))[a][3]) - Number(eval("row"+(l+1))[a][1]);
    spacingA = spacingA - layerWidth;
}
spacingA = spacingA/((eval("row"+(l+1)).length)-1);

for(var a = 1;a<eval("row"+(l+1)).length;a++){
makeActiveByIndex(Number(eval("row"+(l+1))[a][0]),false);
var Width = Number(eval("row"+(l+1))[a][3]) - Number(eval("row"+(l+1))[a][1]);
var shiftPixels = (leftAnchor+spacingA) - Number(eval("row"+(l+1))[a][1]);
activeDocument.activeLayer.translate(UnitValue(shiftPixels,'px') ,0);
leftAnchor +=(Width+spacingA);
	}
}
for(var v=0;v<row1.length;v++){
var topAnchor = Number(eval("row1")[v][4]);
var TopToBottom =(Number(eval("row"+(arrayNumber))[v][4])) - (Number(row1[v][2]));
var totalMasks =0;
for(var m = 0;m<arrayNumber;m++){
    var Height = Number(eval("row"+(m+1))[v][4]) - Number(eval("row"+(m+1))[v][2]);
    totalMasks +=Height;
    }
var SpacingB = (TopToBottom-totalMasks)/(arrayNumber-1);
for(var z = 1;z<arrayNumber-1;z++){
    makeActiveByIndex(Number(eval("row"+(z+1))[v][0]),false);
    var Height = (Number(eval("row"+(z+1))[v][4])) - (Number(eval("row"+(z+1))[v][2]));
    var shiftPixels =( topAnchor+SpacingB) - Number(eval("row"+(z+1))[v][2]);
    activeDocument.activeLayer.translate(0, UnitValue(shiftPixels,'px') );
    topAnchor += (Height+SpacingB);
    }
}
for(var a in selectedLayers){
    makeActiveByIndex(Number(selectedLayers[a]),false,true);
}
}
function selectLayerByIdx(idx, add) {
	var ref = new ActionReference();
	ref.putIndex(charIDToTypeID('Lyr '), idx);
	var desc = new ActionDescriptor();
	desc.putReference(charIDToTypeID('null'), ref);
	if(add) desc.putEnumerated(stringIDToTypeID('selectionModifier'), stringIDToTypeID('selectionModifierType'), stringIDToTypeID('addToSelection'));
    desc.putBoolean(charIDToTypeID('MkVs'), false);
	executeAction(charIDToTypeID('slct'), desc, DialogModes.NO);
}
function makeActiveByIndex( idx, visible,add ){ 
    if(add == undefined) add=false;
    var desc = new ActionDescriptor(); 
      var ref = new ActionReference(); 
      ref.putIndex(charIDToTypeID( "Lyr " ), idx) 
      desc.putReference( charIDToTypeID( "null" ), ref ); 
      if(add) desc.putEnumerated(stringIDToTypeID('selectionModifier'), stringIDToTypeID('selectionModifierType'), stringIDToTypeID('addToSelection'));
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
function getLayerBoundsByIndex( idx ) { 
    var ref = new ActionReference(); 
    ref.putProperty( charIDToTypeID("Prpr") , stringIDToTypeID( "bounds" )); 
    ref.putIndex( charIDToTypeID( "Lyr " ), idx );
    var desc = executeActionGet(ref).getObjectValue(stringIDToTypeID( "bounds" ));
    var bounds = [];
    bounds.push(desc.getUnitDoubleValue(stringIDToTypeID('left')));
    bounds.push(desc.getUnitDoubleValue(stringIDToTypeID('top')));
    bounds.push(desc.getUnitDoubleValue(stringIDToTypeID('right')));
    bounds.push(desc.getUnitDoubleValue(stringIDToTypeID('bottom'))); 
    return bounds;
};
function showFX(FX) {
    var desc48 = new ActionDescriptor();
        var ref34 = new ActionReference();
        ref34.putProperty( charIDToTypeID('Prpr'), charIDToTypeID('lfxv') );
        ref34.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc48.putReference( charIDToTypeID('null'), ref34 );
        var desc49 = new ActionDescriptor();
        desc49.putBoolean( charIDToTypeID('lfxv'), FX );
    desc48.putObject( charIDToTypeID('T   '), charIDToTypeID('lfxv'), desc49 );
    try{
    executeAction( charIDToTypeID('setd'), desc48, DialogModes.NO );
    }catch(e){}
};