#target bridge 
if( BridgeTalk.appName == "bridge" ) { 
FindandReplace = new MenuElement("command", "Find and Replace", "at the end of tools","FindandReplace");
}
FindandReplace.onSelect = function () { 
var win = new Window( 'palette', 'Find & Replace' ); 
//~ var ver = app.version.match(/^\d/);
//~ if (ver != 5){
//~ g = win.graphics;
//~ var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
//~ g.backgroundColor = myBrush;
//~ }
win.orientation='column';
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.p1.preferredSize=[380,100];
win.g1 = win.p1.add('group');
win.g1.orientation = "row";
win.title = win.g1.add('statictext',undefined,'Find and Replace');
win.title.alignment="fill";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",22);
win.p6= win.p1.add("panel", undefined, undefined, {borderStyle:"black"}); //Replace
win.p6.preferredSize=[380,100];
win.g580 =win.p6.add('group');
win.g580.orientation = "row";
win.g580.alignment='fill';
win.g580.st1 = win.g580.add('statictext',undefined,'Choose Field');
win.g580.st1.preferredSize=[75,20];
win.g580.dd1 = win.g580.add('dropdownlist',undefined,["Description","Headline","Title","Keywords","Instructions","Description Writer",
"Credit Line","Rights Usage Terms","Address","Job Identifier","Source"]);
win.g580.dd1.selection=0;
win.g580.dd1.preferredSize=[200,20];
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
win.g610.st1.helpTip="Leave this field blank if you want to remove the characters";
win.g610.st1.preferredSize=[75,20];
win.g610.et1 = win.g610.add('edittext');
win.g610.et1.preferredSize=[200,20];
win.g620 =win.p6.add('group');
win.g620.orientation = "row";
win.g620.alignment='fill';
win.g620.cb1 = win.g620.add('checkbox',undefined,'Global');
win.g620.cb1.helpTip="Replace all occurrences of";
win.g620.cb2 = win.g620.add('checkbox',undefined,'Case Insensitive');
win.g620.cb2.value=true;
win.g620.cb3 = win.g620.add('checkbox',undefined,'Remove any ()[]');
win.g620.cb3.value=false;
win.g1000 =win.p1.add('group');
win.g1000.orientation = "row";
win.g1000.alignment='center';
win.g1000.bu1 = win.g1000.add('button',undefined,'Process');
win.g1000.bu1.preferredSize=[170,30];
win.g1000.bu2 = win.g1000.add('button',undefined,'Cancel');
win.g1000.bu2.preferredSize=[170,30];
win.g1000.bu2.onClick=function(){
    win.close(2);
    }
win.g1000.bu1.onClick=function(){
if(win.g600.et1.text == ''){
    alert("No replace value has been entered!");
    return;
    }
 win.close(0);
if ( !ExternalObject.AdobeXMPScript ) ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
var sels = app.document.selections;
for(var a in sels){
var thumb = sels[a];
md = thumb.synchronousMetadata;
if(win.g620.cb1.value && !win.g620.cb2.value) var patt = new RegExp (win.g600.et1.text.toString(),"g");
if(!win.g620.cb1.value && win.g620.cb2.value) var patt = new RegExp (win.g600.et1.text.toString(),"i");
if(win.g620.cb1.value && win.g620.cb2.value) var patt = new RegExp (win.g600.et1.text.toString(),"gi");
if(!win.g620.cb1.value && !win.g620.cb2.value) var patt = new RegExp (win.g600.et1.text.toString());
if(win.g580.dd1.selection.index==0){ //description
md.namespace =  "http://purl.org/dc/elements/1.1/";
var Caption = md.description ? md.description[0] : "";
if(Caption == "") continue;
var result=patt.test(Caption.toString());
if(result == true){
    var newCaption = Caption.replace(patt,win.g610.et1.text.toString());
    if(win.g620.cb3.value)  newCaption = newCaption.replace(/["'\(\)]/g, "");
    md.description='';
    md.description = newCaption;
        }
    }//end description
if(win.g580.dd1.selection.index==1){ //headline
md.namespace =  "http://ns.adobe.com/photoshop/1.0/"; 
var Caption = md.Headline ? md.Headline : "";
if(Caption == "") continue;
var result=patt.test(Caption.toString());
if(result == true){
    var newCaption = Caption.replace(patt,win.g610.et1.text.toString());
    if(win.g620.cb3.value)  newCaption = newCaption.replace(/["'\(\)]/g, "");
    md.Headline='';
    md.Headline = newCaption;
        }
    }//end headline
if(win.g580.dd1.selection.index==2){ //Title
md.namespace =  "http://purl.org/dc/elements/1.1/";
var Caption = md.title ? md.title[0] : "";
if(Caption == "") continue;
var result=patt.test(Caption.toString());
if(result == true){
    var newCaption = Caption.replace(patt,win.g610.et1.text.toString());
    if(win.g620.cb3.value)  newCaption = newCaption.replace(/["'\(\)]/g, "");
    md.title='';
    md.title = newCaption;
        }
    }//end title
if(win.g580.dd1.selection.index==3){ //Keywords
md.namespace =  "http://ns.adobe.com/photoshop/1.0/"; 
var Caption = md.Keywords;
if(Caption.length == 0) continue;
Caption = md.Keywords.toString();
var result=patt.test(Caption.toString());
if(result == true){
    var newCaption = Caption.replace(patt,win.g610.et1.text.toString());
    if(win.g620.cb3.value)  newCaption = newCaption.replace(/["'\(\)]/g, "");   
    md.Keywords='';
    md.Keywords = newCaption;
        }
    }//end keywords
if(win.g580.dd1.selection.index==4){ //Instruction
md.namespace =  "http://ns.adobe.com/photoshop/1.0/"; 
var Caption = md.Instructions ? md.Instructions : "";
if(Caption == "") continue;
var result=patt.test(Caption.toString());
if(result == true){
    var newCaption = Caption.replace(patt,win.g610.et1.text.toString());
    if(win.g620.cb3.value)  newCaption = newCaption.replace(/["'\(\)]/g, "");
    md.Instructions='';
    md.Instructions = newCaption;
        }
    }//end Instruction
if(win.g580.dd1.selection.index==5){ //Description Writer
md.namespace =  "http://ns.adobe.com/photoshop/1.0/"; 
var Caption = md.CaptionWriter ? md.CaptionWriter : "";
if(Caption == "") continue;
var result=patt.test(Caption.toString());
if(result == true){
    var newCaption = Caption.replace(patt,win.g610.et1.text.toString());
    if(win.g620.cb3.value)  newCaption = newCaption.replace(/["'\(\)]/g, "");
    md.CaptionWriter='';
    md.CaptionWriter = newCaption;
        }
    }//end Description Writer
if(win.g580.dd1.selection.index==6){ //Credit Line
md.namespace =  "http://ns.adobe.com/photoshop/1.0/"; 
var Caption = md.Credit ? md.Credit : "";
if(Caption == "") continue;
var result=patt.test(Caption.toString());
if(result == true){
    var newCaption = Caption.replace(patt,win.g610.et1.text.toString());
    if(win.g620.cb3.value)  newCaption = newCaption.replace(/["'\(\)]/g, "");
    md.Credit='';
    md.Credit = newCaption;
        }
    }//end Credit Line
if(win.g580.dd1.selection.index==7){ //Rights Usage Terms
md.namespace =  "http://ns.adobe.com/xap/1.0/rights/";
var Caption = md.UsageTerms[0] ? md.UsageTerms[0] : "";
if(Caption == "") continue;
var result=patt.test(Caption.toString());
if(result == true){
    var newCaption = Caption.replace(patt,win.g610.et1.text.toString());
    if(win.g620.cb3.value)  newCaption = newCaption.replace(/["'\(\)]/g, "");
    md.UsageTerms='';
    md.UsageTerms = newCaption;
        }
    }//end Rights Usage Terms
if(win.g580.dd1.selection.index==8){ //Creator Address
var xmp = new XMPMeta(thumb.synchronousMetadata.serialize());
var Caption = xmp.getStructField( XMPConst.NS_IPTC_CORE, "CreatorContactInfo", XMPConst.NS_IPTC_CORE, "CiAdrExtadr").toString();
if(Caption == "") continue;
var result=patt.test(Caption.toString());
if(result == true){
    var newCaption = Caption.replace(patt,win.g610.et1.text.toString());
    if(win.g620.cb3.value)  newCaption = newCaption.replace(/["'\(\)]/g, "");
    xmp.setStructField( XMPConst.NS_IPTC_CORE, "CreatorContactInfo", XMPConst.NS_IPTC_CORE, "CiAdrExtadr", newCaption);
    var newPacket = xmp.serialize(XMPConst.SERIALIZE_USE_COMPACT_FORMAT);
    thumb.metadata = new Metadata(newPacket); 
    }
    }//end Creator Address
if(win.g580.dd1.selection.index==9){ //Job Identifier
md.namespace =  "http://ns.adobe.com/photoshop/1.0/"; 
var Caption = md.TransmissionReference ? md.TransmissionReference : "";
if(Caption == "") continue;
var result=patt.test(Caption.toString());
if(result == true){
    var newCaption = Caption.replace(patt,win.g610.et1.text.toString());
    if(win.g620.cb3.value)  newCaption = newCaption.replace(/["'\(\)]/g, "");
    md.TransmissionReference='';
    md.TransmissionReference = newCaption;
        }
    }//end Job Identifier
if(win.g580.dd1.selection.index==10){ //Source
md.namespace =  "http://ns.adobe.com/photoshop/1.0/"; 
var Caption = md.Source ? md.Source : "";
if(Caption == "") continue;
var result=patt.test(Caption.toString());
if(result == true){
    var newCaption = Caption.replace(patt,win.g610.et1.text.toString());
    if(win.g620.cb3.value)  newCaption = newCaption.replace(/["'\(\)]/g, "");
    md.Source='';
    md.Source = newCaption;
        }
    }//end Source
    }
}
win.show();
app.document.chooseMenuItem("PurgeCacheForSelected");
};
