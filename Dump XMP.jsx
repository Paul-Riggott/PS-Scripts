#target bridge;
if( BridgeTalk.appName == "bridge" ) { 
DumpXMP = new MenuElement("command", "Dump XMP", "at the end of tools");
}
DumpXMP.onSelect = function () { 
if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
var items = app.document.getSelection("jpg,tif,gif,psd,pcx,png,eps,crw,cr2,tiff,raw,rw2,dng,nef,orf,erf,mos,dcr,raf,srf,pef,x3f");
for(var a in items){
var thumb = items[a];
var f = new File(Folder.desktop +"/" + decodeURI(thumb.spec.name).replace(/\.[^\.]+$/, '') +".txt");
f.open("w", "TEXT", "????");
var md =thumb.synchronousMetadata;
var xmp =  new XMPMeta(md.serialize());
f.writeln(xmp.dumpObject());
f.close();
}
alert("All done");
};
