//This script is for expert users only!
#target bridge 
if( BridgeTalk.appName == "bridge" ) { 
expertSearch = new MenuElement("command", "Expert Search", "at the end of tools");
}
expertSearch.onSelect = function () { 
if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
var ns = [];
var xmp = new XMPMeta("");
ns= XMPMeta.dumpNamespaces();
ns =ns.split("\n");
var NameSpaces =[];
for(var a in ns){
    if(a == 0) continue;
    var parts = ns[a].split("=>");
    if(parts.length == 2) NameSpaces.push([[parts[0].toString().replace(/^\s+|\s+$/,"")],[parts[1].toString().replace(/^\s+|\s+$/,"")]]);   
    }
var win = new Window("dialog","Expert Find");
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
g.backgroundColor = myBrush;
win.alignChildren="row";
win.g10 = win.add('group');
win.g10.orientation = "row";
win.title = win.g10.add('statictext',undefined,'Expert Find');
win.title.alignment="bottom";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.p1.alignChildren="fill";
win.g5 =win.p1.add('group');
win.g5.spacing=10;
win.g5.st1 = win.g5.add("statictext", undefined,"Prefix");
win.g5.dd1 = win.g5.add("dropdownlist");
win.g5.dd1.preferredSize=[100,20];
win.g5.st2 = win.g5.add("statictext", undefined,"NameSpace");
win.g5.dd2 = win.g5.add("dropdownlist");
win.g5.dd2.preferredSize=[300,20];
for(var a in NameSpaces){
    win.g5.dd1.add("item",NameSpaces[a][0].toString().replace(/:/g,""));
    win.g5.dd2.add("item",NameSpaces[a][1].toString());
    }
win.g5.dd1.selection=0;
win.g5.dd2.selection=0;
win.g5.dd1.onChange = function(){
 win.g5.dd2.selection = win.g5.dd1.selection.index;
    }
win.g5.dd2.onChange = function(){
 win.g5.dd1.selection = win.g5.dd2.selection.index;
    }
win.g7 =win.p1.add('group');
win.g7.spacing=10;
win.g7.st1 = win.g7.add("statictext", undefined,"Enter Field Name...");
win.g7.et1 = win.g7.add("edittext");
win.g7.et1.preferredSize=[250,20];
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
win.g100.bu1.preferredSize=[270,40];
win.g100.bu2 = win.g100.add("button",undefined,"Cancel");
win.g100.bu2.preferredSize=[270,40];
win.g100.bu1.onClick=function(){
if(win.g7.et1.text == ""){
    alert("No Field Name has been entered!");
    return;
}
if(win.g10.et1.text == ""){
    alert("No Text to Find has been entered!");
    return;
    }
win.close(0);
var thumbList = [];
app.document.deselectAll();
var items = app.document.getSelection("jpg,tif,gif,psd,pcx,png,eps,crw,cr2,tiff,raw,rw2,dng,nef,orf,erf,mos,dcr,raf,srf,pef,x3f");
if(win.g20.cb1.value ) var patt = new RegExp (win.g10.et1.text.toString(),"i") else  var patt = new RegExp (win.g10.et1.text.toString());
var patt2 = new RegExp (win.g7.et1.text.toString(),"i")
for (var p in items){
       var md = items[p].synchronousMetadata;
       var xmp =  new XMPMeta(md.serialize());
        iter = xmp.iterator(0, win.g5.dd2.selection.text);
         while((prop = iter.next()) != null) {
            if(prop.path != null) {
            if(patt2.test(prop.path.toString())) {
                if(patt.test(prop.value.toString())){ thumbList.push(items[p]);
                    }
                }
            }
         }
    }
if(thumbList.length > 0) {
var name =win.g7.et1.text;
var Col = app.createCollection(name);
app.addCollectionMember(Col,thumbList);
app.document.thumbnail = Col;
}
}
win.show();
};
