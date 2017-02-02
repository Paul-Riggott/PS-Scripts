#target photoshop;
app.bringToFront();
if(documents.length) main();
function main(){
var selectedLayers=[];
var selLayers = getSelectedLayersIdx().reverse();
for(var x in selLayers){
    if(!isLayerSet(selLayers[x])) selectedLayers.push(selLayers[x]);
    }

if(selectedLayers.length <2){
    alert('You need to have more than one layer selected!');
    return;
    }
var FileName = decodeURI(activeDocument.name).replace(/\.[^\.]+$/, '');
var win = new Window( 'dialog', '',undefined, {closeButton: false});
win.graphics.backgroundColor = win.graphics.newBrush(win.graphics.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
win.grp3000 = win.add('group');
win.grp3000.st1= win.grp3000.add('statictext',undefined,'Layer Saver Plus');
win.grp3000.st1.graphics.font = ScriptUI.newFont('Georgia','BOLDITALIC',30);
win.all= win.add('group');
win.all.orientation = 'row';
win.p1= win.all.add('panel', undefined, undefined, {borderStyle:'black'}); 
win.p1.preferredSize=[500,425];
win.p2= win.all.add('panel', undefined, undefined, {borderStyle:'black'}); 
win.p2.preferredSize=[500,425];
win.g10 = win.p1.add('group');
win.g10.orientation = 'row';
win.title = win.g10.add('statictext',undefined,'Please select common layers');
win.title.helpTip="All Adjustment layers are selected automatically";
win.title.alignment='bottom';
var g = win.title.graphics;
g.font = ScriptUI.newFont('Georgia','BOLDITALIC',28);
win.g20 = win.p1.add('group');
win.g20.orientation = 'row';
win.lb1 = win.g20.add('listbox',undefined,'Layer List' ,{multiselect: true});
win.lb1.preferredSize=[450,295];
for(a=0;a<selectedLayers.length;a++){
	win.lb1.add('item',getLayerName(selectedLayers[a]));
    if(isAjustmentLayer(selectedLayers[a])) win.lb1.items[a].checked = true;
	}
win.g30 = win.p1.add('group');
win.g30.orientation = 'row';
win.g30.bu1 = win.g30.add('button',undefined,'Tick Common Layers');
win.g30.bu1.preferredSize=[220,40];
win.g30.bu2 = win.g30.add('button',undefined,'Un-Tick Common Layers');
win.g30.bu2.preferredSize=[220,40];
win.g30.alignment='center';
win.g30.bu1.onClick = function(){
	var itemNames = win.lb1.selection;
	for(var a in itemNames){
	win.lb1.items[itemNames[a].index].checked = true;
	}
}
win.g30.bu2.onClick = function(){
   	var itemNames = win.lb1.selection;
	for(var a in itemNames){
	win.lb1.items[itemNames[a].index].checked = false;
	}
}
win.g1000 = win.p2.add('group');
win.g1000.orientation='row';
win.g1000.alignment='center';
win.g1000.title = win.g1000.add('statictext',undefined,'Save Options');
win.g1000.title.graphics.font = ScriptUI.newFont('Georgia','BOLDITALIC',28);
win.g1005 = win.p2.add('group');
win.g1005.orientation='row';
win.g1005.alignment='left';
win.g1005.cb1 = win.g1005.add('checkbox',undefined,'Merge Visible ?');
win.g1005.cb2 = win.g1005.add('checkbox',undefined,'Trim Layers ?');
win.g1020 = win.p2.add('group');
win.g1020.orientation='row';
win.g1020.alignment='left';
win.g1020.cb1=win.g1020.add('checkbox',undefined,'Run Action');
win.g1030 = win.p2.add('group');
win.g1030.orientation='row';
win.g1030.alignment='fill';
win.g1030.dd1 = win.g1030.add('dropdownlist');
win.g1030.dd1.preferredSize=[220,25];
win.g1030.dd2 = win.g1030.add('dropdownlist');
win.g1030.dd2.preferredSize=[220,25];
var actionSets = new Array();
actionSets = getActionSets();
for (var i=0,len=actionSets.length;i<len;i++) {
	win.g1030.dd1.add ('item', '' + actionSets[i]);   
}; 
win.g1030.dd1.selection=0;
var actions = new Array();	
actions = getActions(actionSets[0]);
for (var i=0,len=actions.length;i<len;i++) {
	win.g1030.dd2.add ('item', '' + actions[i]);    
};
win.g1030.dd2.selection=0;
win.g1030.dd1.onChange = function() {
win.g1030.dd2.removeAll();
actions = getActions(actionSets[parseInt(this.selection)]);
for (var i=0,len=actions.length;i<len;i++) {
	win.g1030.dd2.add ('item', '' + actions[i]);  
	}
	win.g1030.dd2.selection=0;
};
win.g1020.cb1.onClick=function(){
if(!win.g1020.cb1.value){
    win.g1030.dd1.enabled=false;
    win.g1030.dd2.enabled=false;
    }else{
    win.g1030.dd1.enabled=true;
    win.g1030.dd2.enabled=true;
        }
}
win.g1020.cb1.onClick();
win.g1040 = win.p2.add('group');
win.g1040.orientation='row';
win.g1040.alignment='fill';
win.g1040.st1 = win.g1040.add('statictext',undefined,'Please select Output Folder');
win.g1050 = win.p2.add('group');
win.g1050.orientation='row';
win.g1050.alignment='fill';
win.g1050.et1 = win.g1050.add('edittext');
win.g1050.et1.enabled=false;
win.g1050.et1.preferredSize=[380,25];
win.g1050.bu1 = win.g1050.add('button',undefined,'Browse');
win.g1050.bu1.preferredSize=[65,25];
win.g1050.bu1.onClick = function() {
  outPutFolder = Folder.selectDialog('Please select the source folder',activeDocument.path);	
	if(outPutFolder !=null){
		win.g1050.et1.text =  decodeURI(outPutFolder.fsName); 
		}else{
            win.g1050.et1.text = "                                                          ";
            }
}
var Options= ['Layer Name','FileName + Sequence No.','FileName + Layer Name ','User Defined with Sequence No.'];
win.g1060 = win.p2.add('group');
win.g1060.orientation='row';
win.g1060.alignment='fill';
win.g1060.st1 = win.g1060.add('statictext',undefined,'Save Options:-');
win.g1070 = win.p2.add('group');
win.g1070.orientation='row';
win.g1070.alignment='fill';
win.g1070.dd1 = win.g1070.add('dropdownlist',undefined,Options);
win.g1070.dd1.preferredSize=[250,25];
win.g1070.dd1.selection=2;
win.g1070.et1 = win.g1070.add('edittext');
win.g1070.et1.preferredSize=[200,25];
win.g1070.et1.hide();
win.g1070.dd1.onChange=function(){
    if(this.selection.index==3){
        win.g1070.et1.show();
        }else{
            win.g1070.et1.hide();
            }
}
win.g1080 =win.p2.add('group');
win.g1080.orientation = 'row';
win.g1080.st1 = win.g1080.add('statictext',undefined,'Save as :');
var Types = ['PNG','PSD','PDF','TIF','JPG','JPG SFW','PCX','PNG SFW'];
win.g1080.dd1 = win.g1080.add('dropdownlist',undefined,Types);
win.g1080.dd1.selection = 5;
win.g1080.alignment='left';

win.g1090 =win.g1080.add('group');
win.g1090.orientation = 'stack';

win.g1090b =win.g1090.add('group');
win.g1090b.st1 = win.g1090b.add('statictext',undefined,'Quality');
win.g1090b.dd1 = win.g1090b.add('dropdownlist');
for(var a =1;a<13;a++){
    win.g1090b.dd1.add('item',a);
    }
win.g1090b.dd1.selection = 7;
win.g1090b.visible=false;

win.g1090c =win.g1090.add('group');
win.g1090c.st1 = win.g1090c.add('statictext',undefined,'Compression');
var tiffOptions=['LZW','ZIP','JPG','None'];
win.g1090c.dd1 = win.g1090c.add('dropdownlist',undefined,tiffOptions);
win.g1090c.dd1.selection = 0;
win.g1090c.visible=false;

win.g1090d =win.g1090.add('group');
win.g1090d.st1 = win.g1090d.add('statictext',undefined,'Quality');
win.g1090d.dd1 = win.g1090d.add('dropdownlist');
for(var a =1;a<101;a++){
    win.g1090d.dd1.add('item',a);
    }
win.g1090d.dd1.selection = 79;
win.g1090d.visible=false;
win.g1080.dd1.onChange=function(){
    switch(Number(this.selection.index)){
        case 0 : win.g1090b.visible=false; win.g1090c.visible=false; win.g1090d.visible=false; break;
        case 1 : win.g1090b.visible=false; win.g1090c.visible=false; win.g1090d.visible=false; break;
        case 2 : win.g1090b.visible=false; win.g1090c.visible=false; win.g1090d.visible=false; break;
        case 3 : win.g1090b.visible=false; win.g1090c.visible=true; win.g1090d.visible=false; break;
        case 4 : win.g1090b.visible=true; win.g1090c.visible=false; win.g1090d.visible=false; break;
        case 5 : win.g1090b.visible=false; win.g1090c.visible=false; win.g1090d.visible=true; break;
        case 6 : win.g1090b.visible=false; win.g1090c.visible=false; win.g1090d.visible=false; break;
        case 7 : win.g1090b.visible=false; win.g1090c.visible=false; win.g1090d.visible=false; break;
        case 8 : win.g1090b.visible=false; win.g1090c.visible=false; win.g1090d.visible=false; break;
        default :break;
        }
}
win.g1080.dd1.onChange();
win.g1085 =win.p2.add('group');
win.g1085.p1= win.g1085.add('panel', undefined, undefined, {borderStyle:'black'});
win.g1085.p1.preferredSize=[450,5];
win.g1090 =win.p2.add('group');
win.g1090.orientation = 'row';
win.g1090.alignment='center';
win.g1090.bu1 = win.g1090.add('button',undefined,'Process');
win.g1090.bu1.preferredSize=[220,40];
win.g1090.bu2 = win.g1090.add('button',undefined,'Cancel');
win.g1090.bu2.preferredSize=[220,40];
win.g1090.bu1.onClick=function(){
var Ticked = [];
var Unticked = [];
for(var a =0;a< win.lb1.items.length;a++){
	if(win.lb1.items[a].checked == true){
        Ticked.push(Number(selectedLayers[a]));
        }else{
            Unticked.push(Number(selectedLayers[a]));
            }
	}
if(Ticked.length<1){
var result = Window.confirm ("There are  no common layers selected!\rAll Layers will saved as single files!\rContinue ?", true, "Ooooops");
if(!result) return;
    }
if(win.g1050.et1.text =='' || outPutFolder == null ){
    alert("you have not selected an output folder!");
    return;
    }
if(!outPutFolder.exists){
    alert("Output folder does not exist!");
    return;
    }
if(win.g1070.dd1.selection.index == 3 && win.g1070.et1.text == ''){
    alert("No User Defined text has been entered !");
    return;
    }
win.close(0);
for(var u =0;u < Unticked.length; u++){
deselectLayers();
selectLayerByIndex(Number(Unticked[u]));
LayerName =activeDocument.activeLayer.name;
for(var t in Ticked) {selectLayerByIndex(Number(Ticked[t]),true);}
dupToFile();
if(win.g1005.cb1.value) {
    try{activeDocument.mergeVisibleLayers();}catch(e){}
    }
if(win.g1005.cb2.value){
     try{activeDocument.trim(TrimType.TRANSPARENT,true,true,true,true);}catch(e){}
     }
if(win.g1020.cb1.value){
    doAction(win.g1030.dd2.selection.text, win.g1030.dd1.selection.text);
    }
var saveFile='';
switch(win.g1070.dd1.selection.index){
    case 0 : saveFile = outPutFolder + "/" + LayerName; break;
    case 1 : saveFile = outPutFolder + "/" + FileName + '-' + zeroPad((u+1),4); break;
    case 2 : saveFile = outPutFolder + "/" + FileName  + '-' + LayerName; break;
    case 3 : saveFile = outPutFolder + "/" + win.g1070.et1.text + "-" + zeroPad((u+1),4); break;
    default : break;
    }
SaveDOC(saveFile);
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
    }
}
win.show();
function getLayerName(idx) { 
var ref = new ActionReference(); 
ref.putIndex(charIDToTypeID( 'Lyr ' ), idx); 
return executeActionGet(ref).getString(charIDToTypeID( 'Nm  ' )); 
};
function deselectLayers() { 
var desc01 = new ActionDescriptor(); 
var ref01 = new ActionReference(); 
ref01.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') ); 
desc01.putReference( charIDToTypeID('null'), ref01 ); 
executeAction( stringIDToTypeID('selectNoLayers'), desc01, DialogModes.NO ); 
};
function dupToFile() {
var desc = new ActionDescriptor();
var ref = new ActionReference();
ref.putClass( charIDToTypeID('Dcmn') );
desc.putReference( charIDToTypeID('null'), ref );
desc.putString( charIDToTypeID('Nm  '), 'TempFile' );
var ref2 = new ActionReference();
ref2.putEnumerated( charIDToTypeID('Lyr '), charIDToTypeID('Ordn'), charIDToTypeID('Trgt') );
desc.putReference( charIDToTypeID('Usng'), ref2 );
desc.putInteger( charIDToTypeID('Vrsn'), 5 );
try{
executeAction( charIDToTypeID('Mk  '), desc, DialogModes.NO );
}catch(e){}
};

function selectLayerByIndex(index,add){ 
var ref = new ActionReference();
ref.putIndex(charIDToTypeID('Lyr '), index);
var desc = new ActionDescriptor();
desc.putReference(charIDToTypeID('null'), ref );
if(add) desc.putEnumerated( stringIDToTypeID( 'selectionModifier' ), stringIDToTypeID( 'selectionModifierType' ), stringIDToTypeID( 'addToSelection' ) ); 
desc.putBoolean( charIDToTypeID( 'MkVs' ), false ); 
try{
executeAction(charIDToTypeID('slct'), desc, DialogModes.NO );
}catch(e){}
};
function getSelectedLayersIdx(){ 
      var selectedLayers = new Array(); 
      var backGroundCounter = 1;
            if(activeDocument.artLayers.length > 0){
            backGroundCounter = activeDocument.artLayers[activeDocument.artLayers.length - 1].isBackgroundLayer ? 0 : 1;
            }
      var ref = new ActionReference(); 
	  ref.putProperty(charIDToTypeID("Prpr"), stringIDToTypeID("targetLayers"));
      ref.putEnumerated( charIDToTypeID("Dcmn"), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
      var desc = executeActionGet(ref); 
      if( desc.hasKey( stringIDToTypeID( "targetLayers" ) ) ){ 
         desc = desc.getList( stringIDToTypeID( "targetLayers" )); 
          var c = desc.count; 
          var selectedLayers = new Array(); 
          for(var i=0;i<c;i++){ 
               selectedLayers.push(  desc.getReference( i ).getIndex() +backGroundCounter ); 
          } 
      if(app.version.match(/^\d+/) > 15) return selectedLayers ;
       }else{ 
           if(app.version.match(/^\d+/) > 15) return selectedLayers ;
         var ref = new ActionReference(); 
         ref.putProperty( charIDToTypeID("Prpr") , charIDToTypeID( "ItmI" )); 
         ref.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") ); 
         if(!backGroundCounter){
            selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )) -1);
            }else{
                selectedLayers.push( executeActionGet(ref).getInteger(charIDToTypeID( "ItmI" )));
                }
     var vis = app.activeDocument.activeLayer.visible;
        if(vis == true) app.activeDocument.activeLayer.visible = false;
        var desc9 = new ActionDescriptor();
    var list9 = new ActionList();
    var ref9 = new ActionReference();
    ref9.putEnumerated( charIDToTypeID("Lyr "), charIDToTypeID("Ordn"), charIDToTypeID("Trgt") );
    list9.putReference( ref9 );
    desc9.putList( charIDToTypeID("null"), list9 );
    executeAction( charIDToTypeID("Shw "), desc9, DialogModes.NO );
    if(app.activeDocument.activeLayer.visible == false) selectedLayers.shift();
        app.activeDocument.activeLayer.visible = vis;
      } 
      return selectedLayers; 
};
function isAjustmentLayer(idx){
var ref = new ActionReference(); 
ref.putIndex( charIDToTypeID( 'Lyr ' ), idx);
var desc = executeActionGet(ref);
if(desc.hasKey(charIDToTypeID('Adjs'))){
adjust=true;
var vMask = desc.getBoolean(stringIDToTypeID('hasVectorMask' )); 
    try{
      if(vMask == true){
          adjust = false;
          var Shape = true; 
          }
      }catch(e){var adjust = false; var Shape = false;}
      }
      return adjust;
};
function isLayerSet(idx){
var ref = new ActionReference(); 
ref.putIndex( charIDToTypeID( 'Lyr ' ), idx);
var desc = executeActionGet(ref);
var isSet = typeIDToStringID(desc.getEnumerationValue(stringIDToTypeID('layerSection')));
var LayerSet=false;
switch (isSet.toString()){
    case 'layerSectionStart' : LayerSet=true; break;
    case 'layerSectionEnd' : LayerSet=true; break;
    case 'layerSectionContent' : LayerSet=false; break;
    }
return LayerSet;
};
function getActionSets(){
var aSets=[];
var ref = new ActionReference();
ref.putIndex(charIDToTypeID('ASet'), 1);
var desc = executeActionGet(ref);
var Count = desc.getInteger(stringIDToTypeID('count')) + 1;
for(var t=1; t<=Count; t++){
var ref = new ActionReference();
ref.putIndex(charIDToTypeID('ASet'), t);
var desc = executeActionGet(ref);
var actName = desc.getString(charIDToTypeID('Nm  '));
aSets.push(actName);
}
return aSets;
};
function getActions(aSet){
var names = [];
var ref = new ActionReference();
ref.putName(charIDToTypeID('ASet'), aSet);
var desc = executeActionGet(ref);
var Count = desc.getInteger(stringIDToTypeID('numberOfChildren'));
for(var t=1; t<=Count; t++){
var ref = new ActionReference();
ref.putIndex(charIDToTypeID('Actn'), t);
ref.putName(charIDToTypeID('ASet'), aSet);
var desc = executeActionGet(ref);
names.push(desc.getString(charIDToTypeID('Nm  ')));
}
return names;
};
function SaveDOC(saveFile){
    switch(Number(win.g1080.dd1.selection.index)){
        case 0 : SavePNG(File(saveFile+".png")); break;
        case 1:  SavePSD(File(saveFile+".psd")); break;
        case 2:  SavePDF(File(saveFile+".pdf")); break;
        case 3:  SaveTIFF(File(saveFile+".tif"),Number(win.g1090c.dd1.selection.index)); break;
        case 4:  SaveJPG(File(saveFile+".jpg"),Number(win.g1090b.dd1.selection.index)+1); break;
        case 5:  SaveForWeb(File(saveFile+ ".jpg"),Number(win.g1090d.dd1.selection.index)+1); break;
        case 6:  savePCX(saveFile +".pcx"); break;
        case 7: saveAsPNG24SFW(File(saveFile+".png")); break;
        default : break;
        }
};
function zeroPad(n, s) { 
   n = n.toString(); 
   while (n.length < s)  n = '0' + n; 
   return n; 
};
function SavePNG(saveFile){
    pngSaveOptions = new PNGSaveOptions(); 
activeDocument.saveAs(saveFile, pngSaveOptions, true, Extension.LOWERCASE); 
};
function SaveTIFF(saveFile,Comp){
tiffSaveOptions = new TiffSaveOptions(); 
tiffSaveOptions.embedColorProfile = true; 
tiffSaveOptions.transparency = true; 
tiffSaveOptions.alphaChannels = true; 
tiffSaveOptions.layers = true;
switch (Number(Comp)){
    case 0 : tiffSaveOptions.imageCompression = TIFFEncoding.TIFFLZW; break;
    case 1 : tiffSaveOptions.imageCompression = TIFFEncoding.TIFFZIP; break;
    case 2 : tiffSaveOptions.imageCompression = TIFFEncoding.JPEG; break;
    case 3 : tiffSaveOptions.imageCompression = TIFFEncoding.NONE; break;
    default : break;
}
activeDocument.saveAs(saveFile, tiffSaveOptions, true, Extension.LOWERCASE); 
};
function SavePSD(saveFile){ 
psdSaveOptions = new PhotoshopSaveOptions(); 
psdSaveOptions.embedColorProfile = true; 
psdSaveOptions.alphaChannels = true;  
psdSaveOptions.layers = true;  
activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE); 
};
function SavePDF(saveFile){ 
pdfSaveOptions = new PDFSaveOptions(); 
activeDocument.saveAs(saveFile, pdfSaveOptions, true, Extension.LOWERCASE); 
};
function SaveJPG(saveFile, jpegQuality){
    try{
jpgSaveOptions = new JPEGSaveOptions();
jpgSaveOptions.embedColorProfile = true;
jpgSaveOptions.formatOptions = FormatOptions.STANDARDBASELINE;
jpgSaveOptions.matte = MatteType.NONE;
jpgSaveOptions.quality = jpegQuality;
activeDocument.saveAs(saveFile, jpgSaveOptions, true,Extension.LOWERCASE);
}catch(e){$.writeln(e+" - "+e.line);}
};
function SaveForWeb(saveFile,jpegQuality) {
var sfwOptions = new ExportOptionsSaveForWeb(); 
   sfwOptions.format = SaveDocumentType.JPEG; 
   sfwOptions.includeProfile = false; 
   sfwOptions.interlaced = 0; 
   sfwOptions.optimized = true; 
   sfwOptions.quality = Number(jpegQuality); 
var tmpFile = File(saveFile.path+"/tmpFile.jpg");      
activeDocument.exportDocument(tmpFile, ExportType.SAVEFORWEB, sfwOptions);
tmpFile.rename(decodeURI(saveFile.name));
};
function savePCX(saveFile) {
var desc = new ActionDescriptor();
desc.putString( charIDToTypeID('As  '), "PCX" );
desc.putPath( charIDToTypeID('In  '), new File( saveFile ) );
executeAction( charIDToTypeID('save'), desc, DialogModes.NO );
};
function saveAsPNG24SFW(fileName) {
    var desc3 = new ActionDescriptor();
        var desc4 = new ActionDescriptor();
        desc4.putEnumerated( charIDToTypeID('Op  '), charIDToTypeID('SWOp'), charIDToTypeID('OpSa') );
        desc4.putEnumerated( charIDToTypeID('Fmt '), charIDToTypeID('IRFm'), charIDToTypeID('PN24') );
        desc4.putBoolean( charIDToTypeID('Intr'), false );
        desc4.putBoolean( charIDToTypeID('Trns'), true );
        desc4.putBoolean( charIDToTypeID('Mtt '), false );
        desc4.putInteger( charIDToTypeID('MttR'), 255 );
        desc4.putInteger( charIDToTypeID('MttG'), 255 );
        desc4.putInteger( charIDToTypeID('MttB'), 255 );
        desc4.putBoolean( charIDToTypeID('SHTM'), false );
        desc4.putBoolean( charIDToTypeID('SImg'), true );
        desc4.putBoolean( charIDToTypeID('SSSO'), false );
            var list1 = new ActionList();
        desc4.putList( charIDToTypeID('SSLt'), list1 );
        desc4.putBoolean( charIDToTypeID('DIDr'), false );
        desc4.putPath( charIDToTypeID('In  '), new File( fileName ) );
    desc3.putObject( charIDToTypeID('Usng'), stringIDToTypeID('SaveForWeb'), desc4 );
    executeAction( charIDToTypeID('Expr'), desc3, DialogModes.NO );
};
};