#target photoshop
app.bringToFront();
function main(){
var Ver =app.version.match(/\d+/);
if(Ver < 10) return;
if(!documents.length) return;
var docRef = activeDocument;
if (docRef.activeLayer.isBackgroundLayer) return;
var selectedIDX = getSelectedLayersIdx();
var selectedID=new Array();
for(var s in selectedIDX){
   var info = getIDBounds( Number(selectedIDX[s]))
    selectedID.push([[info[0]],[info[1]],[info[2]]]);
    }
var Top =0;
var tmp = new Array();
var sorted = new Array();
var plusMinus = 50;
selectedID.sort(function(a,b){return a[2]-b[2];});
Top =Number(selectedID[0][2]);
for(var f =0;f<selectedID.length;f++){
	if(Top > (selectedID[f][2]-plusMinus) && Top < (selectedID[f][2]+plusMinus)){
		tmp.push([[Number(selectedID[f][0])],[Number(selectedID[f][1])]]);
		}else{
            Top =Number(selectedID[f][2]);
            tmp = tmp.sort(function(a,b){return a[1]-b[1];});
            for(var z in tmp){sorted.push(Number(tmp[z][0]));}
            tmp=[];
            tmp.push([[Number(selectedID[f][0])],[Number(selectedID[f][1])]]);
		}
}
tmp = tmp.sort(function(a,b){return a[1]-b[1];});
for(var z in tmp){sorted.push(Number(tmp[z][0]));}
tmp=[];

var win= new Window('dialog','Add Pics');
win.pnl1 = win.add('panel', undefined, undefined, {borderStyle:"black"}); 
win.grp5 = win.pnl1.add('group');
win.grp5.title = win.grp5.add('statictext',undefined,'Add Pictures');
win.grp5.title.graphics.font = ScriptUI.newFont("Georgia","BOLDITALIC",20);
var rPics = ["100%","101%","105%","110%","125%","150%","200%"];
win.pnl2 = win.pnl1.add('panel', undefined, undefined, {borderStyle:"black"}); 
win.pnl2.preferredSize=[200,3];
win.grp7 = win.pnl1.add('group');
win.grp7.alignment='left';
win.grp7.cb1 = win.grp7.add('checkbox',undefined,"Use Selected Bridge Files");
win.grp7.cb2 = win.grp7.add('checkbox',undefined,"Mark Files as 'Select'");
if (!BridgeTalk.isRunning( "bridge" ) ){
    win.grp7.cb1.enabled=false;
    win.grp7.cb2.enabled=false;
    }
win.grp7.cb1.onClick=function(){
    if(win.grp7.cb1.value){
        win.grp7.cb2.enabled=true;
        }else{
            win.grp7.cb2.value=false;
            win.grp7.cb2.enabled=false;
            }
    }
win.grp7.cb1.onClick();
win.grp8 = win.pnl1.add('group');
win.grp8.alignment='left';
win.grp8.cb1 = win.grp8.add('checkbox',undefined,"Merge Selected Masks");
win.grp8.cb2 = win.grp8.add('checkbox',undefined,"Just do it (don't adjust)");
win.grp10 = win.pnl1.add('group');
win.grp10.alignment='left';
win.grp10.st1 = win.grp10.add('statictext',undefined,'Picture Size');
win.grp10.dd1 = win.grp10.add('dropdownlist',undefined,rPics);
win.grp10.dd1.selection=0;
win.grp15 = win.pnl1.add('group');
win.grp15.cb1 = win.grp15.add('checkbox',undefined,"Run Action");
win.grp15.dd1 = win.grp15.add('dropdownlist');
win.grp15.dd1.preferredSize=[150,20];
win.grp15.dd1.enabled=false;
win.grp15.dd2 = win.grp15.add('dropdownlist');
win.grp15.dd2.preferredSize=[150,20];
win.grp15.dd2.enabled=false;
win.grp15.cb1.onClick=function(){
   if( win.grp15.cb1.value){
       win.grp15.dd1.enabled=true;
       win.grp15.dd2.enabled=true;
       }else{
            win.grp15.dd1.enabled=false;
            win.grp15.dd2.enabled=false;
           }
}
var actionSets = new Array();
actionSets = getActionSets();
for (var i=0,len=actionSets.length;i<len;i++) {
	item = win.grp15.dd1.add ('item', "" + actionSets[i]);      
}; 
win.grp15.dd1.selection=0;

var actions = new Array();	
actions = getActions(actionSets[0]);
for (var i=0,len=actions.length;i<len;i++) {
	item = win.grp15.dd2.add ('item', "" + actions[i]);      
};
win.grp15.dd2.selection=0;

win.grp15.dd1.onChange = function() {
win.grp15.dd2.removeAll();
actions = getActions(actionSets[parseInt(this.selection)]);
for (var i=0,len=actions.length;i<len;i++) {
	item = win.grp15.dd2.add ('item', "" + actions[i]);  
	}
	win.grp15.dd2.selection=0;
};
win.grp200 = win.add('group');
win.grp200.bu1 = win.grp200.add('button',undefined,'Add Pictures');
win.grp200.bu1.preferredSize=[200,30];
win.grp200.bu2 = win.grp200.add('button',undefined,'Cancel');
win.grp200.bu2.preferredSize=[200,30];
g = win.graphics;
g.backgroundColor = g.newBrush(g.BrushType.SOLID_COLOR, [1.00, 1.00, 1.00, 1]);
win.grp200.bu1.onClick=function(){
Size = Number(win.grp10.dd1.selection.index);
   win.close(1);
}
win.center();
waitForRedraw();
var result = win.show();
if(result == 1) app.activeDocument.suspendHistory('Add Pictures', 'addPic(Size)');
function addPic(Size){
if(win.grp8.cb1.value){
if(sorted.length > 1){
sorted=[];
mergeMasks();
sorted.push(getLayerID());
    }
}
if(win.grp7.cb1.value){
var bridgeFileList =[];
bridgeFileList =GetFilesFromBridge();
}
copyFX=true;
var FillColor = new SolidColor;
FillColor.rgb.hexValue = 'ff00f0'; 
var strtRulerUnits = app.preferences.rulerUnits;
var strtTypeUnits = app.preferences.typeUnits;
app.preferences.rulerUnits = Units.PIXELS;
app.preferences.typeUnits = TypeUnits.PIXELS;
for(var i=0;i<sorted.length;i++){ 
    if(win.grp7.cb1.value){
    if(i >= bridgeFileList.length) break;
     bridgeFile= File(bridgeFileList[i]);
    }
selectLayerById(Number(sorted[i]),false);
docRef.activeLayer = activeDocument.activeLayer;
var layerName = activeDocument.name;
app.activeDocument = docRef;  
//docRef.activeLayer = layerName; 
if(!hasFX()) copyFX=false;
unSelectMask();
docRef.selection.selectAll();
docRef.selection.fill(FillColor);
docRef.selection.deselect();
waitForRedraw();
selectLayerMask(Number(sorted[i])); 
hideFX(false);
var LB = activeDocument.activeLayer.bounds;
hideFX(true);
var res = activeDocument.resolution;
var width = LB[2]-LB[0];
var height = LB[3]-LB[1];
if(!win.grp7.cb1.value){
var sFile = File.openDialog("Please select Image");
	open(sFile);
   }else{
       open(bridgeFile);
if(win.grp7.cb2.value){
var bt = new BridgeTalk; 
bt.target = "bridge"; 
var myScript = "var Thumb =new Thumbnail(File('" + decodeURI( bridgeFile) +"')); Thumb.label='Select';";
bt.body = myScript; 
bt.send(8);
    }
       }
var layerFullName = decodeURI(activeDocument.fullName);
var dwidth = activeDocument.width.value; 
var dheight = activeDocument.height.value;   
var ratio = height/width; 
var dratio = dheight/dwidth; 
if (dratio > ratio) {  height = undefined; } else { width = undefined; } 
switch(win.grp10.dd1.selection.index){
   case 0:  break;
   case 1: if(height == undefined){}else{height = (height/100)*101;};
    if(width == undefined){}else{width = (width/100)*101;};break;    
   case 2: if(height == undefined){}else{height = (height/20)*21;};  
    if(width == undefined){}else{width = (width/20)*21;};break;   
   case 3: if(height == undefined){}else{height = (height/10)*11;};
    if(width == undefined){}else{width = (width/10)*11;};break;
   case 4: if(height == undefined){}else{height = (height/4)*5;};
    if(width == undefined){}else{width = (width/4)*5;};break;   
   case 5:if(height == undefined){}else{height = (height/2)*3;};
    if(width == undefined){}else{width = (width/2)*3;};break;
    case 6:if(height == undefined){}else{height = height*2;};
    if(width == undefined){}else{width = width*2;};break;
   default: break;
}
activeDocument.resizeImage(width, height, res, ResampleMethod.BICUBICSHARPER);
activeDocument.flatten();
if(win.grp15.cb1.value){
doAction(win.grp15.dd2.selection.text, win.grp15.dd1.selection.text);
activeDocument.flatten();
}
activeDocument.selection.selectAll();
activeDocument.selection.copy();
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES); 
activeDocument = docRef;
selArea();
docRef.paste(true);
if(copyFX) pasteStyle();
if(!win.grp8.cb2.value) freeTransform();
linkLayer();
docRef.activeLayer.name = layerFullName;
var newLayer = docRef.activeLayer;
selectLayerById(Number(sorted[i]),false);
activeDocument.activeLayer.remove();
docRef.activeLayer = newLayer;
$.gc();
	} 
app.preferences.rulerUnits = strtRulerUnits;
app.preferences.typeUnits = strtTypeUnits;
}
}
main();

function selectLayerMask (ID) { 
var desc = new ActionDescriptor();
var ref = new ActionReference(); 
ref.putEnumerated( charIDToTypeID( "Chnl" ), charIDToTypeID( "Chnl" ), charIDToTypeID( "Msk " ) ); 
ref.putIdentifier(charIDToTypeID('Lyr '), ID);
desc.putReference( charIDToTypeID( "null" ), ref ); 
desc.putBoolean( charIDToTypeID( "MkVs" ), false ); 
executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO ); 
};
function hasFX(){
try{
executeAction(charIDToTypeID( "CpFX" ), undefined, DialogModes.NO );
return true;
}catch(e){return false;}
};
function pasteStyle(){
executeAction( charIDToTypeID( "PaFX" ), undefined, DialogModes.NO );
};	
function freeTransform() {  
    var desc = new ActionDescriptor(); 
    var ref = new ActionReference(); 
    ref.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') ); 
    desc.putReference( charIDToTypeID('null'), ref ); 
    desc.putEnumerated( charIDToTypeID('FTcs'), charIDToTypeID('QCSt'), charIDToTypeID('Qcsa') ); 
    var ldesc = new ActionDescriptor(); 
    ldesc.putUnitDouble( charIDToTypeID('Hrzn'), charIDToTypeID('#Pxl'), 0.00001 ); 
    ldesc.putUnitDouble( charIDToTypeID('Vrtc'), charIDToTypeID('#Pxl'), 0.00001 ); 
    desc.putObject( charIDToTypeID('Ofst'), charIDToTypeID('Ofst'), ldesc ); 
    desc.putUnitDouble( charIDToTypeID('Wdth'), charIDToTypeID('#Prc'),100.0000 ); 
    desc.putUnitDouble( charIDToTypeID('Hght'), charIDToTypeID('#Prc'), 100.0000 ); 
    executeAction( charIDToTypeID('Trnf'), desc, DialogModes.ALL ); 
};
function selArea(){
var desc467 = new ActionDescriptor();
        var ref331 = new ActionReference();
        ref331.putProperty( charIDToTypeID('Chnl'), charIDToTypeID('fsel') );
    desc467.putReference( charIDToTypeID('null'), ref331 );
        var ref332 = new ActionReference();
        ref332.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc467.putReference( charIDToTypeID('T   '), ref332 );
    executeAction( charIDToTypeID('setd'), desc467, DialogModes.NO );
};
function linkLayer(){
   var desc460 = new ActionDescriptor();
        var ref42 = new ActionReference();
        ref42.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc460.putReference( charIDToTypeID('null'), ref42 );
        var desc461 = new ActionDescriptor();
        desc461.putBoolean( charIDToTypeID('Usrs'), true );
    desc460.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), desc461 );
    executeAction( charIDToTypeID('setd'), desc460, DialogModes.NO );
};
function hideFX(Visible) {
	//true show false hide
    var desc172 = new ActionDescriptor();
        var ref97 = new ActionReference();
        ref97.putProperty( charIDToTypeID('Prpr'), charIDToTypeID('lfxv') );
        ref97.putEnumerated( charIDToTypeID('Dcmn'), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc172.putReference( charIDToTypeID('null'), ref97 );
        var desc173 = new ActionDescriptor();
        desc173.putBoolean( charIDToTypeID('lfxv'), Visible );
    desc172.putObject( charIDToTypeID('T   '), charIDToTypeID('lfxv'), desc173 );
    executeAction( charIDToTypeID('setd'), desc172, DialogModes.NO );
};
function unSelectMask() {
    var desc28 = new ActionDescriptor();
        var ref14 = new ActionReference();
        ref14.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('RGB ') );
    desc28.putReference( charIDToTypeID('null'), ref14 );
    desc28.putBoolean( charIDToTypeID('MkVs'), false );
    executeAction( charIDToTypeID('slct'), desc28, DialogModes.NO );
};
function waitForRedraw() {
  var desc = new ActionDescriptor();
  desc.putEnumerated(charIDToTypeID("Stte"), charIDToTypeID("Stte"), charIDToTypeID("RdCm"));
  executeAction(charIDToTypeID("Wait"), desc, DialogModes.NO);
};
function mergeMasks(){
    try{
    executeAction( charIDToTypeID('Mrg2'), undefined, DialogModes.NO );
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putProperty( charIDToTypeID('Chnl'), charIDToTypeID('fsel') );
    desc.putReference( charIDToTypeID('null'), ref );
        var ref2 = new ActionReference();
        ref2.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Trsp') );
    desc.putReference( charIDToTypeID('T   '), ref2 );
    executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
    var desc2 = new ActionDescriptor();
    desc2.putClass( charIDToTypeID('Nw  '), charIDToTypeID('Chnl') );
        var ref3 = new ActionReference();
        ref3.putEnumerated( charIDToTypeID('Chnl'), charIDToTypeID('Chnl'), charIDToTypeID('Msk ') );
    desc2.putReference( charIDToTypeID('At  '), ref3 );
    desc2.putEnumerated( charIDToTypeID('Usng'), charIDToTypeID('UsrM'), charIDToTypeID('RvlS') );  
    executeAction( charIDToTypeID('Mk  '), desc2, DialogModes.NO );
    }catch(e){return;}
};
function GetFilesFromBridge() {
function script(){
var fL = app.document.selections;
var tF=[];
for(var a in fL){
    if(fL[a].type =='file'){
        tF.push(new File(encodeURI(fL[a].spec.fsName)));
        }
    }
return tF.toSource();
}
	var fileList;
		var bt = new BridgeTalk();
		bt.target = "bridge";
        bt.body = "var ftn = " + script.toSource() + "; ftn();";
		bt.onResult = function( inBT ) { fileList = eval( inBT.body ); }
		bt.onError = function( inBT ) { fileList = new Array(); }
		bt.send(8); 
		bt.pump();
	if ( undefined == fileList ) fileList = new Array();
	return fileList; 
};
function getActionSets() { 
cTID = function(s) { return app.charIDToTypeID(s); }; 
sTID = function(s) { return app.stringIDToTypeID(s); }; 
  var i = 1; 
  var sets = [];  
  while (true) { 
    var ref = new ActionReference(); 
    ref.putIndex(cTID("ASet"), i); 
    var desc; 
    var lvl = $.level; 
    $.level = 0; 
    try { 
      desc = executeActionGet(ref); 
    } catch (e) { 
      break;  
    } finally { 
      $.level = lvl; 
    } 
    if (desc.hasKey(cTID("Nm  "))) { 
      var set = {}; 
      set.index = i; 
      set.name = desc.getString(cTID("Nm  ")); 
      set.toString = function() { return this.name; }; 
      set.count = desc.getInteger(cTID("NmbC")); 
      set.actions = []; 
      for (var j = 1; j <= set.count; j++) { 
        var ref = new ActionReference(); 
        ref.putIndex(cTID('Actn'), j); 
        ref.putIndex(cTID('ASet'), set.index); 
        var adesc = executeActionGet(ref); 
        var actName = adesc.getString(cTID('Nm  ')); 
        set.actions.push(actName); 
      } 
      sets.push(set); 
    } 
    i++; 
  } 
  return sets; 
}; 

function getActions(aset) {
cTID = function(s) { return app.charIDToTypeID(s); }; 
sTID = function(s) { return app.stringIDToTypeID(s); };
  var i = 1;
  var names = [];
  if (!aset) {
    throw "Action set must be specified";
  }  
  while (true) {
    var ref = new ActionReference();
    ref.putIndex(cTID("ASet"), i);
    var desc;
    try {
      desc = executeActionGet(ref);
    } catch (e) {
      break;
    }
    if (desc.hasKey(cTID("Nm  "))) {
      var name = desc.getString(cTID("Nm  "));
      if (name == aset) {
        var count = desc.getInteger(cTID("NmbC"));
        var names = [];
        for (var j = 1; j <= count; j++) {
          var ref = new ActionReference();
          ref.putIndex(cTID('Actn'), j);
          ref.putIndex(cTID('ASet'), i);
          var adesc = executeActionGet(ref);
          var actName = adesc.getString(cTID('Nm  '));
          names.push(actName);
        }
        break;
      }
    }
    i++;
  }
  return names;
};
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
     var vis = app.activeDocument.activeLayer.visible;
        if(vis == true) app.activeDocument.activeLayer.visible = false;
        var desc9 = new ActionDescriptor();
    var list9 = new ActionList();
    var ref9 = new ActionReference();
    ref9.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    list9.putReference( ref9 );
    desc9.putList( charIDToTypeID('null'), list9 );
    executeAction( charIDToTypeID('Shw '), desc9, DialogModes.NO );
    if(app.activeDocument.activeLayer.visible == false) selectedLayers.shift();
        app.activeDocument.activeLayer.visible = vis;
      } 
      return selectedLayers; 
};
function getIDBounds( idx ) { 
    var ref = new ActionReference(); 
    ref.putIndex( charIDToTypeID( "Lyr " ), idx );
    var desc = executeActionGet(ref)
    var descBounds= desc.getObjectValue(stringIDToTypeID( "bounds" ));
    var results = [];
    var left =descBounds.getUnitDoubleValue(stringIDToTypeID('left'));
    var top = descBounds.getUnitDoubleValue(stringIDToTypeID('top'));
    var ID = desc.getInteger(stringIDToTypeID( 'layerID' ));
    results.push(ID);
    results.push(left);
    results.push(top);
    return results;
}
function getLayerID(){
var ref = new ActionReference();
ref.putEnumerated( charIDToTypeID('Lyr '),charIDToTypeID('Ordn'),charIDToTypeID('Trgt') ); 
var desc = executeActionGet(ref);
return desc.getInteger(stringIDToTypeID( 'layerID' ));
}