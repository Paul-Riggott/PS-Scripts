#target bridge 
if( BridgeTalk.appName == "bridge" ) { 
findInField = new MenuElement("command", "Find In Field", "at the end of tools");
}
findInField.onSelect = function () { 
var Fields=["Keywords","Description","Headline","Title","Instructions","State","Job ID","Caption Writer","Location","City","Country","Author","Event"];
var win = new Window("dialog","Find by field");
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
g.backgroundColor = myBrush;
win.alignChildren="row";
win.g10 = win.add('group');
win.g10.orientation = "row";
win.title = win.g10.add('statictext',undefined,'Find by field');
win.title.alignment="bottom";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.p1.alignChildren="fill";
win.g5 =win.p1.add('group');
win.g5.spacing=10;
win.g5.st1 = win.g5.add("statictext", undefined,"Select Field");
win.g5.dd1 = win.g5.add("dropdownlist", undefined,Fields);
win.g5.dd1.selection=0;
win.g10 =win.p1.add('group');
win.g10.spacing=10;
win.g10.st1 = win.g10.add("statictext", undefined,"Enter text to find...");
win.g10.et1 = win.g10.add("edittext");
win.g10.et1.preferredSize=[250,20];
win.g20 =win.p1.add('group');
win.g20.spacing=10;
win.g20.cb1 = win.g20.add('checkbox',undefined,'Case Insensitive');
win.g20.cb1.value=true;
win.g100 =win.p1.add('group');
win.g100.spacing=10;
win.g100.bu1 = win.g100.add("button",undefined,"Process");
win.g100.bu1.preferredSize=[200,30];
win.g100.bu2 = win.g100.add("button",undefined,"Cancel");
win.g100.bu2.preferredSize=[200,30];
win.g100.bu1.onClick=function(){
if(win.g10.et1.text == ""){
    alert("You have not entered anything to find!");
    return;
    }
win.close(0);
var thumbList = [];
app.document.deselectAll();
var items = app.document.getSelection("jpg,tif,gif,psd,pcx,png,eps,crw,cr2,tiff,raw,rw2,dng,nef,orf,erf,mos,dcr,raf,srf,pef,x3f");
if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
if(win.g20.cb1.value ) var patt = new RegExp (win.g10.et1.text.toString(),"i") else  var patt = new RegExp (win.g10.et1.text.toString());
for(var a in items){
var md = items[a].synchronousMetadata;
var xmp =  new XMPMeta(md.serialize());
if( xmp.doesPropertyExist( "http://ns.adobe.com/photoshop/1.0/","Keywords") && win.g5.dd1.selection==0){
var Keywords = md.read("http://ns.adobe.com/photoshop/1.0/","Keywords").toString().replace(/,/g,';');
if(patt.test(Keywords.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist( "http://purl.org/dc/elements/1.1/","dc:description") && win.g5.dd1.selection==1){
var Description =  md.read("http://purl.org/dc/elements/1.1/","dc:description").toString().replace(/\n/g,'-');
if(patt.test(Description.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist( "http://ns.adobe.com/photoshop/1.0/","photoshop:Headline") && win.g5.dd1.selection==2){
var Headline = md.read("http://ns.adobe.com/photoshop/1.0/","photoshop:Headline");
if(patt.test(Headline.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist( "http://purl.org/dc/elements/1.1/","dc:title") && win.g5.dd1.selection==3){
var Title = md.read("http://purl.org/dc/elements/1.1/","dc:title");
if(patt.test(Title.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist( "http://ns.adobe.com/photoshop/1.0/","photoshop:Instructions") && win.g5.dd1.selection==4){
var Instructions = md.read("http://ns.adobe.com/photoshop/1.0/","photoshop:Instructions");
if(patt.test(Instructions.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist( "http://ns.adobe.com/photoshop/1.0/","photoshop:State") && win.g5.dd1.selection==5){
var state = md.read("http://ns.adobe.com/photoshop/1.0/","photoshop:State");
if(patt.test(state.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist( "http://ns.adobe.com/photoshop/1.0/","photoshop:TransmissionReference") && win.g5.dd1.selection==6){
var jobID = md.read("http://ns.adobe.com/photoshop/1.0/","photoshop:TransmissionReference");
if(patt.test(jobID.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist( "http://ns.adobe.com/photoshop/1.0/","photoshop:CaptionWriter") && win.g5.dd1.selection==7){
var cWriter = md.read("http://ns.adobe.com/photoshop/1.0/","photoshop:CaptionWriter");
if(patt.test(cWriter.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist("http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/","Iptc4xmpCore:Location") && win.g5.dd1.selection==8){
var Location =  md.read("http://iptc.org/std/Iptc4xmpCore/1.0/xmlns/","Iptc4xmpCore:Location");
if(patt.test(Location.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist("http://ns.adobe.com/photoshop/1.0/","photoshop:City") && win.g5.dd1.selection==9){
var City = md.read("http://ns.adobe.com/photoshop/1.0/","photoshop:City");
if(patt.test(City.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist("http://ns.adobe.com/photoshop/1.0/","photoshop:Country") && win.g5.dd1.selection==10){
var Country = md.read("http://ns.adobe.com/photoshop/1.0/","photoshop:Country");
if(patt.test(Country.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist("http://purl.org/dc/elements/1.1/","dc:creator") && win.g5.dd1.selection==11){
var Author = md.read("http://purl.org/dc/elements/1.1/","dc:creator");
if(patt.test(Author.toString())) thumbList.push(items[a]);
}
if( xmp.doesPropertyExist("http://iptc.org/std/Iptc4xmpExt/2008-02-29/","Iptc4xmpExt:Event") && win.g5.dd1.selection==12){
var event = md.read("http://iptc.org/std/Iptc4xmpExt/2008-02-29/","Iptc4xmpExt:Event");
if(patt.test(event.toString())) thumbList.push(items[a]);
}
}
if(thumbList.length > 0) {
var name =Fields[Number(win.g5.dd1.selection)];
var Col = app.createCollection(name);
app.addCollectionMember(Col,thumbList);
app.document.thumbnail = Col;
}
    }
win.show();
};

