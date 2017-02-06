//The Hot Folder will be the folder where you run the script.
//You should be able to use bridge as normal.
//It calls PShotFolder.jsx in  the presets/scripts folder
if( BridgeTalk.appName == "bridge" ) {  
var newMenuHF = new MenuElement( "menu", "Hot Folder", "after Help", "hotFolder" );
var runHotFolder= new MenuElement( "command", "Start Hot Folder", "at the end of hotFolder" , "hotFolderxx" );
}
runHotFolder.onSelect = function () { 
var thisFolder = decodeURI(Folder(app.document.presentationPath));
var cmd = "$.setenv('HotFolder','" +decodeURI(thisFolder)+ "');";
var bt = new BridgeTalk();
bt.target = "photoshop";
bt.body = cmd; 
bt.send();
processHotFolder = function(){
    /* files to look for */
if(Folder(thisFolder).getFiles(/\.(jpg|tif|psd|cr2,nef)$/i).length <1) return;
if (BridgeTalk.getStatus("photoshop") == "IDLE"){
bt.target = "photoshop";
bt.body = "var PShotFolder = " + PShot.toSource() + "; PShotFolder();"; 
bt.send();
    }
}
BottomBar = app.document.navbars.filesystem.bottom;
BottomBar.height = 30;
BottomBar.visible = true;
BottomBar.bu1 = BottomBar.add ('button',[5,5,300,25],'Stop Hot Folder');
id = app.scheduleTask( "processHotFolder()", 2000, true ); 

BottomBar.bu1.onClick=function(){
app.cancelTask (id);
BottomBar.visible = false;
var cmd = "$.setenv('HotFolder','');";
var bt = new BridgeTalk();
bt.target = "photoshop";
bt.body = cmd; 
bt.send();
}
function PShot(){
try{
var SCRIPTS_FOLDER =  decodeURI(app.path + '/' + localize("$$$/ScriptingSupport/InstalledScripts=Presets/Scripts"));
var hotFile = new File(SCRIPTS_FOLDER + "/PShotFolder.jsx");
$.evalFile (hotFile);
}catch(e){alert(e + " - " + e.line);}
    }
};
