#target Photoshop
app.bringToFront();
main();
function main(){
if(!documents.length) return;
var selLayers=getSelectedLayersIdx();
var selIdxNames=[];
for(var s in selLayers){
    selIdxNames.push([[Number(selLayers[s])],[getLayerNameByIndex(Number(selLayers[s]))]]);
    }
selectAllLayers();
var allLayers = getSelectedLayersIdx();
var allIdxNames=[];
for(var n in allLayers){
    allIdxNames.push([[Number(allLayers[n])],[getLayerNameByIndex(Number(allLayers[n]))]]);
    }
try{
var win = new Window( 'dialog', 'Layer Name Editor' ); 
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
g.backgroundColor = myBrush;
win.orientation='column';
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.p1.preferredSize=[380,100];
win.g1 = win.p1.add('group');
win.g1.orientation = "row";
win.title = win.g1.add('statictext',undefined,'Layer Name Editor');
win.title.alignment="fill";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
win.g5 =win.p1.add('group');
win.g5.orientation = "row";
win.g5.alignment='fill';
win.g5.spacing=10;
win.g5.rb1 = win.g5.add('radiobutton',undefined,'Use Selected Layers');
win.g5.rb2 = win.g5.add('radiobutton',undefined,'Use All Layers');
win.g5.rb1.value=true;
win.g10 =win.p1.add('group');
win.g10.orientation = "row";
win.g10.alignment='fill';
win.g10.rb1 = win.g10.add('radiobutton',undefined,'Prefix');
win.g10.rb2 = win.g10.add('radiobutton',undefined,'Suffix');
win.g10.rb3 = win.g10.add('radiobutton',undefined,'Remove');
win.g10.rb4 = win.g10.add('radiobutton',undefined,'Insert');
win.g10.rb5 = win.g10.add('radiobutton',undefined,'Replace');
win.g10.rb5.value=true;
win.g15 =win.p1.add('group');
win.g15.orientation = "row";
win.g15.alignment='fill';
win.g15.cb1 = win.g15.add('checkbox',undefined,'Create Snapshot');

win.stack =win.add('group');
win.stack.spacing=10;
win.stack.orientation = 'stack';
win.stack.alignment="left";

win.p2= win.stack.add("panel", undefined, undefined, {borderStyle:"black"}); //Prefix
win.p2.preferredSize=[380,100];
win.p2.visible=false; 
win.g200 =win.p2.add('group');
win.g200.orientation = "row";
win.g200.alignment='fill';
win.g200.st1 = win.g200.add('statictext',undefined,'Prefix');
win.g200.st1.preferredSize=[75,20];
win.g200.et1 = win.g200.add('edittext');
win.g200.et1.preferredSize=[200,20];

win.p3= win.stack.add("panel", undefined, undefined, {borderStyle:"black"}); //Suffix
win.p3.preferredSize=[380,100];
win.p3.visible=false;
win.g300 =win.p3.add('group');
win.g300.orientation = "row";
win.g300.alignment='fill';
win.g300.st1 = win.g300.add('statictext',undefined,'Suffix');
win.g300.st1.preferredSize=[75,20];
win.g300.et1 = win.g300.add('edittext');
win.g300.et1.preferredSize=[200,20];

win.p4= win.stack.add("panel", undefined, undefined, {borderStyle:"black"}); //Remove
win.p4.preferredSize=[380,100];
win.p4.visible=false;
win.g400 =win.p4.add('group');
win.g400.orientation = "row";
win.g400.alignment='fill';
win.g400.rb1 = win.g400.add('radiobutton',undefined,'First(n) chars');
win.g400.rb2 = win.g400.add('radiobutton',undefined,'Last(n) chars');
win.g400.rb3 = win.g400.add('radiobutton',undefined,'Range From(n)');
win.g400.rb1.value=true;
win.g410 =win.p4.add('group');
win.g410.orientation = "row";
win.g410.alignment='fill';
win.g410.et1 = win.g410.add('edittext');
win.g410.et1.preferredSize=[50,20];
win.g410.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g410.st1 = win.g410.add('statictext',undefined,'Number of Chars.');
win.g410.et2 = win.g410.add('edittext');
win.g410.et2.preferredSize=[50,20];
win.g410.et2.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};
win.g410.et2.visible=false;
win.g410.st1.visible=false;
win.g400.rb1.onClick=function(){
    win.g410.et2.visible=false;
    win.g410.st1.visible=false;
}
win.g400.rb2.onClick=function(){
    win.g410.et2.visible=false;
    win.g410.st1.visible=false;
}
win.g400.rb3.onClick=function(){
    win.g410.et2.visible=true;
    win.g410.st1.visible=true;
}

win.p5= win.stack.add("panel", undefined, undefined, {borderStyle:"black"}); //Insert
win.p5.preferredSize=[380,100];
win.p5.visible=false;
win.g500 =win.p5.add('group');
win.g500.orientation = "row";
win.g500.alignment='fill';
win.g500.st1 = win.g500.add('statictext',undefined,'Insert');
win.g500.st1.preferredSize=[75,20];
win.g500.et1 = win.g500.add('edittext');
win.g500.et1.preferredSize=[200,20];
win.g510 =win.p5.add('group');
win.g510.orientation = "row";
win.g510.alignment='fill';
win.g510.st1 = win.g510.add('statictext',undefined,'At position');
win.g510.st1.preferredSize=[75,20];
win.g510.et1 = win.g510.add('edittext');
win.g510.et1.preferredSize=[50,20];
win.g510.et1.onChanging = function() { 
  if (this.text.match(/[^\-\.\d]/)) { 
    this.text = this.text.replace(/[^\-\.\d]/g, ''); 
  } 
};

win.p6= win.stack.add("panel", undefined, undefined, {borderStyle:"black"}); //Replace
win.p6.preferredSize=[380,100];
win.g600 =win.p6.add('group');
win.g600.orientation = "row";
win.g600.alignment='fill';
win.g600.st1 = win.g600.add('statictext',undefined,'Replace');
win.g600.st1.preferredSize=[75,20];
win.g600.et1 = win.g600.add('edittext');
win.g600.et1.preferredSize=[200,20];
win.g610 =win.p6.add('group');
win.g610.orientation = "row";
win.g610.alignment='fill';
win.g610.st1 = win.g610.add('statictext',undefined,'With');
win.g610.st1.preferredSize=[75,20];
win.g610.et1 = win.g610.add('edittext');
win.g610.et1.preferredSize=[200,20];
win.g620 =win.p6.add('group');
win.g620.orientation = "row";
win.g620.alignment='fill';
win.g620.cb1 = win.g620.add('checkbox',undefined,'Global');
win.g620.cb2 = win.g620.add('checkbox',undefined,'Case Insensitive');
win.g620.cb2.value=true;

win.g10.rb1.onClick=function(){
if(win.g10.rb1.value){
win.p2.visible=true;
win.p3.visible=false;
win.p4.visible=false;
win.p5.visible=false;
win.p6.visible=false;
}
}
win.g10.rb2.onClick=function(){
if(win.g10.rb2.value){
win.p2.visible=false;
win.p3.visible=true;
win.p4.visible=false;
win.p5.visible=false;
win.p6.visible=false;
}
}
win.g10.rb3.onClick=function(){
if(win.g10.rb3.value){
win.p2.visible=false;
win.p3.visible=false;
win.p4.visible=true;
win.p5.visible=false;
win.p6.visible=false;
}
}
win.g10.rb4.onClick=function(){
if(win.g10.rb4.value){
win.p2.visible=false;
win.p3.visible=false;
win.p4.visible=false;
win.p5.visible=true;
win.p6.visible=false;
}
}
win.g10.rb5.onClick=function(){
if(win.g10.rb5.value){
win.p2.visible=false;
win.p3.visible=false;
win.p4.visible=false;
win.p5.visible=false;
win.p6.visible=true;
}
}

win.g1000 =win.add('group');
win.g1000.orientation = "row";
win.g1000.alignment='center';
win.g1000.bu1 = win.g1000.add('button',undefined,'Process');
win.g1000.bu1.preferredSize=[150,30];
win.g1000.bu2 = win.g1000.add('button',undefined,'Cancel');
win.g1000.bu2.preferredSize=[150,30];
snapshotFlag = false;
win.g1000.bu1.onClick=function(){
if(win.g15.cb1.value && !snapshotFlag){
    snapshotFlag=true;
    snapShot();
    }
if(win.g10.rb1.value){//Prefix
    if(win.g200.et1.text == ''){
        alert("No Prefix has been entered!");
        return;
        }
    win.close(0);
if(win.g5.rb1.value){var lList = selIdxNames;}else{var lList=allIdxNames;};
for(var z in lList){
putLayerNameByIndex( Number(lList[z][0]), win.g200.et1.text.toString() + lList[z][1].toString());
}
    }
if(win.g10.rb2.value){//suffix
     if(win.g300.et1.text == ''){
        alert("No Suffix has been entered!");
        return;
        }
    win.close(0);
if(win.g5.rb1.value){var lList = selIdxNames;}else{var lList=allIdxNames;};
for(var z in lList){
putLayerNameByIndex( Number(lList[z][0]), lList[z][1].toString() + win.g300.et1.text.toString());
}
    }
if(win.g10.rb3.value){//Remove
    if(win.g400.rb1.value){
        if(win.g410.et1.text == ''){
            alert("No number has been entered!");
            return;
            }
         if(Number(win.g410.et1.text) <1 ){
             alert("You can't remove zero characters!");
             return;
             }
            win.close(0);
if(win.g5.rb1.value){var lList = selIdxNames;}else{var lList=allIdxNames;};
for(var z in lList){
var n = Number(win.g410.et1.text);
var rex = "/^(.{"+ n+"})(.+)/";
putLayerNameByIndex( Number(lList[z][0]), lList[z][1].toString().match(eval(rex))[2]);
}
        }
    if(win.g400.rb2.value){
            if(win.g410.et1.text == ''){
            alert("No number has been entered!");
            return;
            }
         if(Number(win.g410.et1.text) <1 ){
             alert("You can't remove zero characters!");
             return;
             }
            win.close(0);
if(win.g5.rb1.value){var lList = selIdxNames;}else{var lList=allIdxNames;};
for(var z in lList){
var n = Number(win.g410.et1.text);
var rex = "/(.+)(.{"+n+"}$)/";
putLayerNameByIndex( Number(lList[z][0]), lList[z][1].toString().match(eval(rex))[1]);
}
        }
    if(win.g400.rb3.value){
                if(win.g410.et1.text == '' || win.g410.et2.text == ''){
            alert("No number has been entered!");
            return;
            }
         if(Number(win.g410.et1.text) <1 || Number(win.g410.et2.text) <1 ){
             alert("You can't remove zero characters!");
             return;
             }
            win.close(0);
if(win.g5.rb1.value){var lList = selIdxNames;}else{var lList=allIdxNames;};
for(var z in lList){
var n = Number(win.g410.et1.text);
var r = Number(win.g410.et2.text);
var rex = "/^(.{"+ n+"})(.{"+r+"})(.+)/";
var parts = lList[z][1].toString().match(eval(rex));
var newName = parts[1] + parts[3];
putLayerNameByIndex( Number(lList[z][0]), newName);
}
        }
    }
if(win.g10.rb4.value){//Insert
if(win.g500.et1.text == ''){
    alert("You have not entered a string!");
    return;
    }
if(win.g510.et1.text == ''){
    alert("You must enter a start number!");
    return;
    }
win.close(0);
if(win.g5.rb1.value){var lList = selIdxNames;}else{var lList=allIdxNames;};
for(var z in lList){
var n = Number(win.g510.et1.text);
if(n<1) n=1;
var rex = "/^(.{"+ n+"})(.+)/";
var parts = lList[z][1].toString().match(eval(rex));
var newName = parts[1] + win.g500.et1.text.toString()+ parts[2];
putLayerNameByIndex( Number(lList[z][0]), newName);
        }
    }
if(win.g10.rb5.value){//Replace
if(win.g600.et1.text == ''){
    alert("No replace value has been entered!");
    return;
    }
    win.close(0);
if(win.g620.cb1.value && !win.g620.cb2.value) var changeFrom = new RegExp (win.g600.et1.text.toString(),"g");
if(!win.g620.cb1.value && win.g620.cb2.value) var changeFrom = new RegExp (win.g600.et1.text.toString(),"i");
if(win.g620.cb1.value && win.g620.cb2.value) var changeFrom = new RegExp (win.g600.et1.text.toString(),"gi");
if(!win.g620.cb1.value && !win.g620.cb2.value) var changeFrom = new RegExp (win.g600.et1.text.toString());
if(win.g5.rb1.value){var lList = selIdxNames;}else{var lList=allIdxNames;};
for(var z in lList){
    if(changeFrom.test( lList[z][1].toString())){
    putLayerNameByIndex( Number(lList[z][0]), lList[z][1].toString().replace(changeFrom,win.g610.et1.text.toString())); 
    }
    }
    }    
}
}catch(e){alert(e + " - " + e.line);}
win.center();
win.show();
};
function selectLayerByIndex(index,add){ 
	add = (add == undefined)  ? add = false : add;
 var ref = new ActionReference();
    ref.putIndex(charIDToTypeID("Lyr "), index);
    var desc = new ActionDescriptor();
    desc.putReference(charIDToTypeID("null"), ref );
	      if(add) desc.putEnumerated( stringIDToTypeID( "selectionModifier" ), stringIDToTypeID( "selectionModifierType" ), stringIDToTypeID( "addToSelection" ) ); 
      desc.putBoolean( charIDToTypeID( "MkVs" ), false ); 
	  try{ executeAction(charIDToTypeID("slct"), desc, DialogModes.NO );}catch(e){}
};
function getLayerNameByIndex( idx ) { 
    var ref = new ActionReference(); 
    ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "Nm  " )); 
    ref.putIndex( charIDToTypeID( "Lyr " ), idx );
    return executeActionGet(ref).getString(charIDToTypeID( "Nm  " ));
};
function selectAllLayers() {
    var desc29 = new ActionDescriptor();
        var ref23 = new ActionReference();
        ref23.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
    desc29.putReference( charIDToTypeID('null'), ref23 );
    executeAction( stringIDToTypeID('selectAllLayers'), desc29, DialogModes.NO );
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
function snapShot() {
    var desc9 = new ActionDescriptor();
        var ref5 = new ActionReference();
        ref5.putClass( charIDToTypeID('SnpS') );
    desc9.putReference( charIDToTypeID('null'), ref5 );
        var ref6 = new ActionReference();
        ref6.putProperty( charIDToTypeID('HstS'), charIDToTypeID('CrnH') );
    desc9.putReference( charIDToTypeID('From'), ref6 );
    desc9.putEnumerated( charIDToTypeID('Usng'), charIDToTypeID('HstS'), charIDToTypeID('FllD') );
    executeAction( charIDToTypeID('Mk  '), desc9, DialogModes.NO );
};
function putLayerNameByIndex( idx, name ) {
     if( idx == 0 ) return;
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putIndex( charIDToTypeID( 'Lyr ' ), idx );
    desc.putReference( charIDToTypeID('null'), ref );
    desc.putBoolean( charIDToTypeID( "MkVs" ), false ); 
        var nameDesc = new ActionDescriptor();
        nameDesc.putString( charIDToTypeID('Nm  '), name );
    desc.putObject( charIDToTypeID('T   '), charIDToTypeID('Lyr '), nameDesc );
    executeAction( charIDToTypeID( 'slct' ), desc, DialogModes.NO ); 
    executeAction( charIDToTypeID('setd'), desc, DialogModes.NO );
};