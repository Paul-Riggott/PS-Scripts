#target bridge   
 if( BridgeTalk.appName == "bridge" ) {  
var menu = MenuElement.find ('myBridgeMenu');
if (menu == null){
var newMenu = MenuElement.create( "menu", "Bridge", "before tools/ps", "myBridgeMenu" );
changeDate = MenuElement.create( "command", "Change CreateDate", "at the end of myBridgeMenu" );
}else{
    changeDate = MenuElement.create( "command", "Change CreateDate", "at the end of myBridgeMenu" );
    }
}
changeDate.onSelect = function () { 
if(app.document.selectionLength == 0){
      alert("No documents are selected");
      return;
    }
thumbs= app.document.getSelection("psd, jpg, tif, dng");
thumbsRaw = app.document.getSelection("3fr,crw,cr2,tiff,raw,rw2,nef,orf,erf,mef,mos,dcr,raf,rwl,srf,sr2,pef,x3f,arw,kdc,mrw,iiq,nrw,srw");
if(thumbs.length == 0 && thumbsRaw.length == 0)  {
  alert("No valid documents are selected");
  return;
    }
var win = new Window('dialog','CreateDate');
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
var myPen =g.newPen (g.PenType.SOLID_COLOR, [0.00, 0.00, 0.00, 1],lineWidth=1);
g.backgroundColor = myBrush;
g.foregroundColor = myPen;
win.alignChildren="row";
win.g10 = win.add('group');
win.g10.orientation = "row";
win.title = win.g10.add('statictext',undefined,"Change CreateDate");
win.title.helpTip="Written by Paul Riggott";
win.title.alignment="bottom";
var g = win.title.graphics;
try{g.font = ScriptUI.newFont("Georgia","BOLDITALIC",26);
}catch(e){g.font = ScriptUI.newFont("Arial","BOLDITALIC",26);}
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.g2 =win.p1.add('group');
win.g2.orientation = "row";
win.g2.alignment="left";
win.g2.rb1 = win.g2.add('radiobutton',undefined,'Add to Date');
win.g2.rb2 = win.g2.add('radiobutton',undefined,'Subtract from Date');
win.g2.rb1.value=true;
win.g2.cb2 = win.g2.add('checkbox',undefined,'Set all dates same as createdate');
win.g2.cb2.helpTip="Non RAW files only!";
win.g3 =win.p1.add('group');
win.g3.orientation = "row";
win.g3.alignment="left";
win.g3.st1 = win.g3.add('statictext',undefined,'Weeks');
win.g3.dd1 = win.g3.add('dropdownlist');
win.g3.dd1.preferredSize=[50,20];
for(var a = 0;a<53;a++){win.g3.dd1.add('item',a);}
win.g3.dd1.selection=0;
win.g3.st2 = win.g3.add('statictext',undefined,'Days');
win.g3.dd2 = win.g3.add('dropdownlist');
win.g3.dd2.preferredSize=[50,20];
for(var a = 0;a<7;a++){win.g3.dd2.add('item',a);}
win.g3.dd2.selection=0;
win.g3.st3 = win.g3.add('statictext',undefined,'Hours');
win.g3.dd3 = win.g3.add('dropdownlist');
win.g3.dd3.preferredSize=[50,20];
for(var a = 0;a<24;a++){win.g3.dd3.add('item',a);}
win.g3.dd3.selection=0;
win.g3.st4 = win.g3.add('statictext',undefined,'Minutes');
win.g3.dd4 = win.g3.add('dropdownlist');
win.g3.dd4.preferredSize=[50,20];
for(var a = 0;a<60;a++){win.g3.dd4.add('item',a);}
win.g3.dd4.selection=0;
win.g3.st5 = win.g3.add('statictext',undefined,'Seconds');
win.g3.dd5 = win.g3.add('dropdownlist');
win.g3.dd5.preferredSize=[50,20];
for(var a = 0;a<60;a++){win.g3.dd5.add('item',a);}
win.g3.dd5.selection=0;
win.g4 =win.p1.add('group');
win.g4.orientation = "row";
win.g4.bu1 = win.g4.add('button',undefined,'Process selected files');
win.g4.bu1.preferredSize=[240,35];
win.g4.bu2 = win.g4.add('button',undefined,'Cancel');
win.g4.bu2.preferredSize=[240,35];
win.g4.bu1.onClick = function(){
try{
var sec = 1000;
var min = sec * 60;
var hour = min * 60;
var day = hour * 24;
var week = day * 7;
var changeTime = 0;
changeTime += win.g3.dd5.selection.index * sec;
changeTime += win.g3.dd4.selection.index * min;
changeTime += win.g3.dd3.selection.index * hour;
changeTime += win.g3.dd2.selection.index * day;
changeTime += win.g3.dd1.selection.index * week;
if(changeTime == 0) {
    alert("You have not selected any time!");
    win.g3.dd5.selection.active=true;
    return;
    }
win.close(0);
if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
for(var z in thumbs){
var md = thumbs[z].synchronousMetadata;
md.namespace = "http://ns.adobe.com/exif/1.0/";
var DateCreated = md.DateTimeOriginal ? new XMPDateTime(md.DateTimeOriginal.toString()).getDate().getTime() : thumbs[z].spec.created.getTime();
if(win.g2.rb1.value){
var newDate = DateCreated + changeTime;
}else{
    var newDate = DateCreated - changeTime;
    }
md.DateTimeOriginal ='';
md.DateTimeOriginal = new XMPDateTime(new Date(newDate));
if(win.g2.cb2.value){
    md.namespace = "http://ns.adobe.com/photoshop/1.0/";
    md.DateCreated = '';
    md.DateCreated = new XMPDateTime(new Date(newDate));
    md.namespace = "http://ns.adobe.com/xap/1.0/";
    md.CreateDate='';
    md.CreateDate = new XMPDateTime(new Date(newDate));
    md.ModifyDate='';
    md.ModifyDate = new XMPDateTime(new Date(newDate));
    md.MetadataDate='';
    md.MetadataDate= new XMPDateTime(new Date(newDate));
    }
    }
//////////////  Process Raw    ///////////
for(var r in thumbsRaw){
var md = thumbsRaw[r].synchronousMetadata;
md.namespace = "http://ns.adobe.com/exif/1.0/";
var DateCreated = md.DateTimeOriginal ? new XMPDateTime(md.DateTimeOriginal.toString()).getDate().getTime() : thumbs[z].spec.created.getTime();
var Name = File(thumbsRaw[r].spec).name.replace(/\.[^\.]+$/, '');
var file = File(thumbsRaw[r].spec.path + "/" + Name + ".xmp");
  if(file.exists){
     file.open('r');
     file.encoding = "UTF8";
     file.lineFeed = "unix"; 
     file.open("r", "TEXT", "????");
     var xmpStr = file.read();
     file.close();
     }else{
         var xmpStr='';
     }
 var xmp = new XMPMeta( xmpStr );
if(win.g2.rb1.value){
var newDate = DateCreated + changeTime;
}else{
    var newDate = DateCreated - changeTime;
    }
if( xmp.doesPropertyExist(XMPConst.NS_EXIF, "DateTimeOriginal" ) )  xmp.deleteProperty( XMPConst.NS_EXIF, "DateTimeOriginal" );
        xmp.setProperty( XMPConst.NS_EXIF, "DateTimeOriginal" ,new XMPDateTime(new Date(newDate)));
     file.open('w');
     file.encoding = "UTF8";
     file.lineFeed = "unix"; 
     file.write( xmp.serialize() );
     file.close();
}

}catch(e){alert(e + "\n" + e.line);}
}
var result = win.show();
if(result == 0){
app.document.chooseMenuItem("PurgeCacheForSelected");
alert("All done");
}
};