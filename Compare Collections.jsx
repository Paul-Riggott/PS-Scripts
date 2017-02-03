#target bridge
if( BridgeTalk.appName == "bridge" ) {  
var compareColls = new MenuElement( "command","Compare Collections", "at the end of Tools" );
}
compareColls.onSelect = function () { 
var win = new Window('dialog','Compare Collections');
var cols = app.getCollections();
if (cols.length <2) {
    alert("You need to have at least two collections to use this script!");
    return;
    }
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
var myPen =g.newPen (g.PenType.SOLID_COLOR, [0.00, 0.00, 0.00, 1],lineWidth=1);
g.backgroundColor = myBrush;
g.foregroundColor = myPen;
win.alignChildren="row";
win.g10 = win.add('group');
win.g10.orientation = "row";
win.title = win.g10.add('statictext',undefined,"Compare Collections");
win.title.alignment="bottom";
var g = win.title.graphics;
g.font = ScriptUI.newFont("Georgia","BOLDITALIC",26);
win.p1= win.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.p2= win.p1.add("panel", undefined, undefined, {borderStyle:"black"}); 
win.g3 =win.p2.add('group');
win.g3.orientation = "row";
win.g3.alignment="left";
win.g3.st1 = win.g3.add('statictext',undefined,'please select collection 1');
win.g3.dl = win.g3.add('dropdownlist');
win.g3.dl.preferredSize=[250,20];
win.g30 =win.p2.add('group');
win.g30.orientation = "row";
win.g30.alignment="left";
win.g30.st1 = win.g30.add('statictext',undefined,'please select collection 2');
win.g30.dl = win.g30.add('dropdownlist');
win.g30.dl.preferredSize=[250,20];
for(var c in cols){
    win.g3.dl.add("item", cols[c].name);
    win.g30.dl.add("item", cols[c].name);
    }
win.g3.dl.selection=0;
win.g30.dl.selection=1;
win.g40 =win.p1.add('group');
win.g40.orientation = "row";
win.g30.alignment="top";
win.g40.bu1 = win.g40.add("button",undefined,"Process");
win.g40.bu2 = win.g40.add("button",undefined,"Cancel");
win.g40.bu1.preferredSize=[100,20];
win.g40.bu2.preferredSize=[100,20];
win.g40.bu1.onClick = function(){
    if(win.g3.dl.selection.index == win.g30.dl.selection.index ){
        alert("You cannot compare the same collection!");
        return;
        }
var col1 = win.g3.dl.selection.index;
var col2 = win.g30.dl.selection.index;
win.close(0);
var colMembers1 =app.getCollectionMembers(cols[col1]);
var colMembers2 =app.getCollectionMembers(cols[col2]);
var Dupname = cols[col1].name +"_"+ cols[col2].name;
var Dups = app.createCollection(Dupname);
for(b in colMembers1){
    if(app.isCollectionMember(cols[col2],colMembers1[b])){
        app.addCollectionMember(Dups,colMembers1[b]);
        }
    }
    }
win.show();
};