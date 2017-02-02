#target bridge   
   if( BridgeTalk.appName == "bridge" ) {  
dangerousRenamer = new MenuElement("command", "File Renamer", "at the end of Thumbnail");
}
dangerousRenamer.onSelect = function () { 
	  mainRenamer();
	  }

function mainRenamer(){
var dlg =
"dialog{text:'Script Interface',bounds:[100,100,500,270],"+
"panel0:Panel{bounds:[10,10,390,160] , text:'' ,properties:{borderStyle:'etched',su1PanelCoordinates:true},"+
"title:StaticText{bounds:[100,5,360,39] , text:'Rename - Replace' ,properties:{scrolling:undefined,multiline:undefined}},"+
"From:EditText{bounds:[20,90,190,110] , text:'' ,properties:{multiline:false,noecho:false,readonly:false}},"+
"statictext1:StaticText{bounds:[20,65,121,85] , text:'Replace' ,properties:{scrolling:undefined,multiline:undefined}},"+
"statictext2:StaticText{bounds:[200,65,330,85] , text:'With' ,properties:{scrolling:undefined,multiline:undefined}},"+
"To:EditText{bounds:[200,90,370,110] , text:'' ,properties:{multiline:false,noecho:false,readonly:false}},"+
"Global:Checkbox{bounds:[20,40,100,60] , text:'Global' },"+
"Case:Checkbox{bounds:[101,40,250,60] , text:'Case Insensitive' },"+
"button0:Button{bounds:[20,120,190,141] , text:'Ok' },"+
"button1:Button{bounds:[200,120,370,141] , text:'Cancel' }}};";

var win = new Window(dlg,"Bridge Rename Replace");
if(app.version.substr(0,app.version.indexOf('.'))>1){
win.panel0.title.graphics.font = ScriptUI.newFont("Arial","BOLDITALIC",26);
g = win.graphics;
b=win.panel0.title.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.20, 1]);
g.backgroundColor = myBrush;
var myPen =b.newPen (g.PenType.SOLID_COLOR, [0.00, 0.00, 0.99, 1],lineWidth=1);
var myPen2 =b.newPen (g.PenType.SOLID_COLOR, [0.99, 0.00, 0.00, 1],lineWidth=1);
g.foregroundColor = myPen;
b.foregroundColor = myPen2;
}
win.center();

var done = false; 
    while (!done) { 
      var x = win.show(); 
      if (x == 0 || x == 2) {
        win.canceled = true;
        done = true; 
      } else if (x == 1) { 
        done = true;  
       var result = validate();
        if(result != true) {
            alert(result);
            return;
        }else
        { 
			processFiles();
			}
      }
} 

function validate(){
	return true;
}
function processFiles(){
var items = app.document.selections; 
try{
if(win.panel0.Global.value && !win.panel0.Case.value) var changeFrom = new RegExp (win.panel0.From.text,"g");
if(!win.panel0.Global.value && win.panel0.Case.value) var changeFrom = new RegExp (win.panel0.From.text,"i");
if(win.panel0.Global.value && win.panel0.Case.value) var changeFrom = new RegExp (win.panel0.From.text,"gi");
if(!win.panel0.Global.value && !win.panel0.Case.value) var changeFrom = new RegExp (win.panel0.From.text);
}catch(e){
	alert("Incorrect Replace entered\rThis should be a Regular Expression");
	return;
}
for (var a =0;a<items.length;a++){
var file = items[a];
var ext = '.' + file.name.substr(file.name.indexOf('.')+1);
var fileName = file.name.slice(0,-4).replace(changeFrom,win.panel0.To.text); 
fileName += ext;
var changeFile = new File(file.path);
changeFile.rename(fileName);
	}
}
}
