//Written by Paul Riggott
allActions=[];
letterActions=[];
selection=99;
var dlg=
"dialog{text:'Script Interface',bounds:[100,100,700,390],"+
"panel0:Panel{bounds:[10,10,590,280] , text:'' ,properties:{borderStyle:'etched',su1PanelCoordinates:true},"+
"title:StaticText{bounds:[180,10,390,40] , text:'Action Finder' ,properties:{scrolling:undefined,multiline:undefined}},"+
"panel1:Panel{bounds:[10,50,570,110] , text:'' ,properties:{borderStyle:'etched',su1PanelCoordinates:true},"+
"ActionSet:DropDownList{bounds:[10,20,220,40]},"+
"ActionName:DropDownList{bounds:[230,20,440,40]},"+
"useact1:Button{bounds:[450,20,550,40] , text:'Use Action' }},"+
"panel2:Panel{bounds:[10,120,570,220] , text:'' ,properties:{borderStyle:'etched',su1PanelCoordinates:true},"+
"ActionSet:DropDownList{bounds:[10,10,220,30]},"+
"ActionName:DropDownList{bounds:[240,10,440,30]},"+
"useact2:Button{bounds:[450,10,550,30] , text:'Use Action' },"+
"statictext1:StaticText{bounds:[10,40,210,57] , text:'Find actions starting with :-' ,properties:{scrolling:undefined,multiline:undefined}},"+
"prefix:EditText{bounds:[240,40,440,60] , text:'a' ,properties:{multiline:false,noecho:false,readonly:false}},"+
"findpre:Button{bounds:[450,40,550,60] , text:'Find' },"+
"statictext2:StaticText{bounds:[10,70,220,87] , text:'Find actions containing :-' ,properties:{scrolling:undefined,multiline:undefined}},"+
"containing:EditText{bounds:[240,70,440,90] , text:'' ,properties:{multiline:false,noecho:false,readonly:false}},"+
"findcon:Button{bounds:[450,70,550,90] , text:'Find' }},"+
"button4:Button{bounds:[10,230,570,260] , text:'Cancel' }}};"
var win = new Window(dlg,'Action Finder');
win.center();
if(version.substr(0,version.indexOf('.'))>9){
win.panel0.title.graphics.font = ScriptUI.newFont("Arial","BOLDITALIC",26);
g = win.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [1.00, 1.00, 1.00, 1]);
g.backgroundColor = myBrush;
var myPen =g.newPen (g.PenType.SOLID_COLOR, [1.00, 0.00, 0.00, 1],lineWidth=1);
}
var actionSets = new Array();
actionSets = getActionSets();
for (var i=0,len=actionSets.length;i<len;i++) {
	item = win.panel0.panel1.ActionSet.add ('item', "" + actionSets[i]);      
}; 
win.panel0.panel1.ActionSet.selection=0;

var actions = new Array();	
actions = getActions(actionSets[0]);
for (var i=0,len=actions.length;i<len;i++) {
	item = win.panel0.panel1.ActionName.add ('item', "" + actions[i]);      
};
win.panel0.panel1.ActionName.selection=0;

win.panel0.panel1.ActionSet.onChange = function() {
win.panel0.panel1.ActionName.removeAll();
actions = getActions(actionSets[parseInt(this.selection)]);
for (var i=0,len=actions.length;i<len;i++) {
	item = win.panel0.panel1.ActionName.add ('item', "" + actions[i]);  
	}
	win.panel0.panel1.ActionName.selection=0;
};
var aSets = getActionSets();
for(var a in aSets){
  var temp1 =  getActions(aSets[a]);
  for(var z in temp1){
	  allActions.push([[temp1[z].toString()],[aSets[a].toString()]]);
      }
}

allActions = allActions.sort();
for(var d in allActions){
if(allActions[d][0].toString().match(/^a/i)) letterActions.push(allActions[d]);
}
for (var i=0,len=letterActions.length;i<len;i++) {
	 win.panel0.panel2.ActionName.add ('item', "" + letterActions[i][0]);  
	 win.panel0.panel2.ActionSet.add ('item', "" + letterActions[i][1]);
	}
	win.panel0.panel2.ActionName.selection=0;
	win.panel0.panel2.ActionSet.selection=0;
win.panel0.panel2.ActionName.onChange =function(){
	try{
	win.panel0.panel2.ActionSet.selection=parseInt(win.panel0.panel2.ActionName.selection.index);
	}catch(e){}
}
win.panel0.panel2.ActionSet.onChange =function(){
	try{
	win.panel0.panel2.ActionName.selection=parseInt(win.panel0.panel2.ActionSet.selection.index);
	}catch(e){}
}
win.panel0.panel2.findpre.onClick = function(){
	if(win.panel0.panel2.prefix.text == '') {
		alert("Please enter search criteria!");
		return;
		}
var rex = new RegExp;
rex="^" +win.panel0.panel2.prefix.text;
letterActions=[];
win.panel0.panel2.ActionName.removeAll();
win.panel0.panel2.ActionSet.removeAll();
for(var d in allActions){
if(allActions[d][0].toString().match(rex,'i')) letterActions.push(allActions[d]);
}
if(letterActions.length <1){
	letterActions[0]=["Nothing Found","Nothing Found"];
	}
for (var i=0,len=letterActions.length;i<len;i++) {
	 win.panel0.panel2.ActionName.add ('item', "" + letterActions[i][0]);  
	 win.panel0.panel2.ActionSet.add ('item', "" + letterActions[i][1]);
	}
	win.panel0.panel2.ActionName.selection=0;
	win.panel0.panel2.ActionSet.selection=0;
}
win.panel0.panel2.findcon.onClick = function(){
	if(win.panel0.panel2.containing.text == '') {
		alert("Please enter search criteria!");
		return;
		}
var rex = new RegExp;
rex=win.panel0.panel2.containing.text;
letterActions=[];
win.panel0.panel2.ActionName.removeAll();
win.panel0.panel2.ActionSet.removeAll();
for(var d in allActions){
if(allActions[d][0].toString().match(rex,'i')) letterActions.push(allActions[d]);
}
if(letterActions.length <1){
	letterActions[0]=["Nothing Found","Nothing Found"];
	}
for (var i=0,len=letterActions.length;i<len;i++) {
	 win.panel0.panel2.ActionName.add ('item', "" + letterActions[i][0]);  
	 win.panel0.panel2.ActionSet.add ('item', "" + letterActions[i][1]);
	}
	win.panel0.panel2.ActionName.selection=0;
	win.panel0.panel2.ActionSet.selection=0;
}
win.panel0.panel1.useact1.onClick = function(){
if(win.panel0.panel1.ActionName.selection.text==''){
	alert("No Action is Selected!");
	return;
	}
selection=0;
	win.close(1);
}
win.panel0.panel2.useact2.onClick = function(){	
if(win.panel0.panel2.ActionName.selection.text=='Nothing Found'){
	alert("No Action is Selected!");
	return;
	}
selection=1;
	win.close(1);
}
var done = false; 
    while (!done) { 
      var x = win.show(); 
      if (x == 0 || x == 2) {
        win.canceled = true;
        done = true; 
      } else if (x == 1) { 
        done = true; 
        {
			switch(selection){
				case 0 :
			try{
		doAction(win.panel0.panel1.ActionName.selection.text,win.panel0.panel1.ActionSet.selection.text);
	}catch(e){}; break;
				case 1 :   
	   try{
		doAction(win.panel0.panel2.ActionName.selection.text,win.panel0.panel2.ActionSet.selection.text);
	}catch(e){alert(e)};break;
				default : break;
				}
      } 
   }
  }

function getActionSets() {  
  var i = 1; 
  var sets = [];  
  while (true) { 
    var ref = new ActionReference(); 
    ref.putIndex(charIDToTypeID("ASet"), i); 
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
    if (desc.hasKey(charIDToTypeID("Nm  "))) { 
      var set = {}; 
      set.index = i; 
      set.name = desc.getString(charIDToTypeID("Nm  ")); 
      set.toString = function() { return this.name; }; 
      set.count = desc.getInteger(charIDToTypeID("NmbC")); 
      set.actions = []; 
      for (var j = 1; j <= set.count; j++) { 
        var ref = new ActionReference(); 
        ref.putIndex(charIDToTypeID('Actn'), j); 
        ref.putIndex(charIDToTypeID('ASet'), set.index); 
        var adesc = executeActionGet(ref); 
        var actName = adesc.getString(charIDToTypeID('Nm  ')); 
        set.actions.push(actName); 
      } 
      sets.push(set); 
    } 
    i++; 
  } 
  return sets; 
};
function getActions(aset) {
  var i = 1;
  var names = [];
  if (!aset) {
    throw "Action set must be specified";
  }  
  while (true) {
    var ref = new ActionReference();
    ref.putIndex(charIDToTypeID("ASet"), i);
    var desc;
    try {
      desc = executeActionGet(ref);
    } catch (e) {
      break;  
    }
    if (desc.hasKey(charIDToTypeID("Nm  "))) {
      var name = desc.getString(charIDToTypeID("Nm  "));
      if (name == aset) {
        var count = desc.getInteger(charIDToTypeID("NmbC"));
        var names = [];
        for (var j = 1; j <= count; j++) {
          var ref = new ActionReference();
          ref.putIndex(charIDToTypeID('Actn'), j);
          ref.putIndex(charIDToTypeID('ASet'), i);
          var adesc = executeActionGet(ref);
          var actName = adesc.getString(charIDToTypeID('Nm  '));
          names.push(actName);
        }
        break;
      }
    }
    i++;
  }
  return names;
};