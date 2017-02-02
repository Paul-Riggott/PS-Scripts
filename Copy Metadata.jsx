#target bridge  
if( BridgeTalk.appName == "bridge" ) {  
if (!MenuElement.find ('myMetaData')){
var newMenuData = new MenuElement( "menu", "Metadata", "after Help", "myMetaData" );}
if (!MenuElement.find ('zxcv1')){
var renamePutXMP = new MenuElement( "command", "Copy Metadata", "at the end of myMetaData" , "zxcv56" );}
}
renamePutXMP.onSelect =function(){
    try{
var win = new Window('dialog','Copy Metadata');
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.50, 0.50, 0.50, 1]);
g.backgroundColor = myBrush;
win.alignChildren="row";
win.g10 = win.add('group');
win.g10.orientation = "row";
win.title = win.g10.add('statictext',undefined,'Copy Metadata');
win.title.alignment="bottom";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.p1.alignChildren="fill";
var fileType = Array("JPG","PSD","DNG","TIF", "CRW","EPS","NEF", "RAF", "ORF", "MRW", "DCR", "MOS", "SRF", "PEF", "DCR", "CR2", "ERF", "X3F", "RAW" ).sort();
win.g2 =win.p1.add('group');
win.g2.spacing=10;
win.g2.st1 = win.g2.add('statictext',undefined,'Source File Type');
win.g2.dd1 = win.g2.add('dropdownlist',undefined,fileType);
win.g2.dd1.selection=5;
win.g2.st2 = win.g2.add('statictext',undefined,'Destination File Type');
win.g2.dd2 = win.g2.add('dropdownlist',undefined,fileType);
win.g2.dd2.selection=0;
win.g3 =win.p1.add('group');
win.g3.spacing=10;
win.g3.st1 = win.g3.add('statictext',undefined,'Please Select Schema(s) to Copy');
win.g4 =win.p1.add('group');
win.g4.spacing=2;
win.g4.cb1 = win.g4.add('checkbox',undefined,'Dublin Core');
win.g4.cb1.value=true;
win.g4.cb2 = win.g4.add('checkbox',undefined,'IPTC Core');
win.g4.cb2.value=true;
win.g4.cb3 = win.g4.add('checkbox',undefined,'Photoshop');
win.g4.cb3.value=true;
win.g4.cb4 = win.g4.add('checkbox',undefined,'XMP Rights');
win.g4.cb4.value=true;
win.g4.cb5 = win.g4.add('checkbox',undefined,'EXIF');
win.g4.cb6 = win.g4.add('checkbox',undefined,'EXIF AUX');
win.g4a =win.p1.add('group');
win.g4a.spacing=2;
win.g4a.cb1 = win.g4a.add('checkbox',undefined,'XMP');
win.g4a.cb2 = win.g4a.add('checkbox',undefined,'TIFF');
win.g4a.cb3 = win.g4a.add('checkbox',undefined,'Camera Raw');
win.g5 =win.p1.add('group');
win.g5.spacing=10;
win.g5.st1 = win.g5.add('statictext',undefined,'Source Files');
win.g5.st1.preferredSize=[100,20];
win.g5.et1 = win.g5.add('edittext');
win.g5.et1.preferredSize=[250,20];
win.g5.et1.enabled=false;
win.g5.bu1 = win.g5.add('button',undefined,'Browse');
win.g10 =win.p1.add('group');
win.g10.spacing=10;
win.g10.st1 = win.g10.add('statictext',undefined,'Destination Files');
win.g10.st1.preferredSize=[100,20];
win.g10.et1 = win.g10.add('edittext');
win.g10.et1.preferredSize=[250,20];
win.g10.et1.enabled=false;
win.g10.bu1 = win.g10.add('button',undefined,'Browse');
win.g15 =win.p1.add('group');
win.g15.orientation='row';
win.g15.alignment="top";
win.g15.spacing=10;
win.g15.bu1 = win.g15.add('button',undefined,'Process');
win.g15.bu1.preferredSize=[200,30];
win.g15.bu2 = win.g15.add('button',undefined,'Cancel');
win.g15.bu2.preferredSize=[200,30];
win.g5.bu1.onClick=function(){
     rawFolder = Folder.selectDialog("Please select the Source folder",app.document.presentationPath);
     if(rawFolder !=null){
		win.g5.et1.text =  decodeURI(rawFolder.fsName); 
		}
}
win.g10.bu1.onClick=function(){
     destinationFolder = Folder.selectDialog("Please select the destination files folder",app.document.presentationPath);
     if(destinationFolder !=null){
		win.g10.et1.text =  decodeURI(destinationFolder.fsName); 
		}
}
win.g15.bu1.onClick=function(){
var use =0;
if(win.g4.cb1.value) use++;
if(win.g4.cb2.value) use++;
if(win.g4.cb3.value) use++;
if(win.g4.cb4.value) use++;
if(win.g4.cb5.value) use++;
if(win.g4.cb6.value) use++;
if(win.g4a.cb1.value) use++;
if(win.g4a.cb2.value) use++;
if(win.g4a.cb3.value) use++;
    if(win.g5.et1.text == ''){
        alert("No Source folder selected!");
        return;
        }
    if(win.g10.et1.text == ''){
        alert("No Destination folder selected!");
        return;
        }
    if(win.g2.dd1.selection.index == win.g2.dd2.selection.index ){
        if(win.g5.et1.text.toString() == win.g10.et1.text.toString()){
            alert("You can not copy the same data to itself!");
            return;
            }
        }
    if(use==0){
        alert("you must select a schema to use this script!");
        return;
        }
    win.close(1);
    process(rawFolder,destinationFolder);
}
win.center();
}catch(e){alert(e + "\r" + e.line);}
win.show();
function process(rawFolder,destinationFolder){
var rawFiles = rawFolder.getFiles ("*."+win.g2.dd1.selection.text);
if(!rawFiles.length){alert("There are no source files to be processed!"); return;}
for (var a in rawFiles){
var Name = decodeURI(rawFiles[a].name).replace(/\.[^\.]+$/, '');
var destFile = File(destinationFolder + "/" + Name + "."+win.g2.dd2.selection.text);
if(destFile.exists)  updateMetaData(rawFiles[a],destFile);
    }
}
function updateMetaData(sourceFile,destFile){
if (ExternalObject.AdobeXMPScript == undefined)  ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
sourceFile = new Thumbnail(File(sourceFile));
destFile = new Thumbnail(File(destFile));
var md = sourceFile.synchronousMetadata;
var source = new XMPMeta( md.serialize() );
var md2 = destFile.synchronousMetadata;
var dest = new XMPMeta( md2.serialize() );
try{
if(win.g4.cb1.value){
XMPUtils.removeProperties(dest, XMPConst.NS_DC, "", XMPConst.REMOVE_ALL_PROPERTIES); 
copySchema( source, dest,XMPConst.NS_DC,[]);
}
if(win.g4.cb2.value){
XMPUtils.removeProperties(dest, XMPConst.NS_IPTC_CORE, "", XMPConst.REMOVE_ALL_PROPERTIES);
copySchema( source, dest,XMPConst.NS_IPTC_CORE,[]);
}
if(win.g4.cb3.value){
XMPUtils.removeProperties(dest, XMPConst.NS_PHOTOSHOP, "", XMPConst.REMOVE_ALL_PROPERTIES);
copySchema( source, dest,XMPConst.NS_PHOTOSHOP,[]);
}
if(win.g4.cb4.value){
XMPUtils.removeProperties(dest, XMPConst.NS_XMP_RIGHTS, "", XMPConst.REMOVE_ALL_PROPERTIES);  
copySchema( source, dest,XMPConst.NS_XMP_RIGHTS,[]);
}
if(win.g4.cb5.value){
XMPUtils.removeProperties(dest, XMPConst.NS_EXIF, "", XMPConst.REMOVE_ALL_PROPERTIES);  
copySchema( source, dest,XMPConst.NS_EXIF,[]);
}
if(win.g4.cb6.value){
XMPUtils.removeProperties(dest, XMPConst.NS_EXIF_AUX, "", XMPConst.REMOVE_ALL_PROPERTIES);  
copySchema( source, dest,XMPConst.NS_EXIF_AUX,[]);
}
if(win.g4a.cb1.value){
XMPUtils.removeProperties(dest, XMPConst.NS_XMP, "", XMPConst.REMOVE_ALL_PROPERTIES);  
copySchema( source, dest,XMPConst.NS_XMP,[]);
}
if(win.g4a.cb2.value){
XMPUtils.removeProperties(dest, XMPConst.NS_TIFF, "", XMPConst.REMOVE_ALL_PROPERTIES);  
copySchema( source, dest,XMPConst.NS_TIFF,[]);
}
if(win.g4a.cb3.value){
XMPUtils.removeProperties(dest, XMPConst.NS_CAMERA_RAW, "", XMPConst.REMOVE_ALL_PROPERTIES);  
copySchema( source, dest,XMPConst.NS_CAMERA_RAW,[]);
}

var updatedPacket = dest.serialize(XMPConst.SERIALIZE_OMIT_PACKET_WRAPPER | XMPConst.SERIALIZE_USE_COMPACT_FORMAT);
destFile.metadata = new Metadata(updatedPacket);
app.document.refresh();
}catch(e){alert(e+"\r"+e.line);}
}
function copySchema( source, dest, namespace, omitProps ) {  
	var propIter = source.iterator(XMPConst.ITERATOR_JUST_CHILDREN | XMPConst.ITERATOR_JUST_LEAF_NAME, namespace, "" );
	var prop = propIter.next();
	var prefix = XMPMeta.getNamespacePrefix( namespace );
	while(prop) {	    	
		var name = prop.path.substring( prefix.length );     
		 if(omitProps != undefined) var copy = !contains( omitProps, name);
		if( copy ) {
            try{
			XMPUtils.duplicateSubtree( source, dest, namespace, prop.path,namespace, prop.path, 0 );        
            }catch(e){}
		}
		prop = propIter.next();
	}         
}
function contains( arr, member ){
	var r = false;
	for( var i = 0; i < arr.length &! r; ++i  ) {
		r = arr[i] == member;
	}
	return r;
    }  
}