#target bridge  
   if( BridgeTalk.appName == "bridge" ) {  
moveStack = MenuElement.create("command", "Move Stack", "at the end of submenu/Stack");
}
moveStack.onSelect = function () { 
var currentFolder = Folder(app.document.presentationPath);
var selectedStacks = getselectedStacks();
if(!selectedStacks.length) return;
var copyFolder = Folder.selectDialog("Please select folder to move stack to...",Folder(app.document.presentationPath));
if(copyFolder == null ) return;
if(decodeURI(copyFolder) == decodeURI(Folder(app.document.presentationPath))) return;
app.eventHandlers.push( { handler: onDocLoadEvent} );
var stk = getStackFiles(app.document.stacks[Number(selectedStacks[0])]);
for(var s in stk){
    new Thumbnail(stk[s]).copyTo(copyFolder);
}
app.document.thumbnail = copyFolder;

function getselectedStacks(){
var stackSels = app.document.selections;
var stacksSelected = new Array();
var stks = app.document.stacks;
for(var a =0;a<stackSels.length;a++){
for(var z =0;z< stks.length;z++){
if (stks[z].thumbnails[0].spec.toString() == stackSels[a].spec.toString()){
    stacksSelected.push(z);
    break;
        }
    }
 }
return stacksSelected;
};
function getStackFiles( stack ){
      var files = new Array();
      for( var f = 0; f<stack.thumbnails.length;f++){
           files.push(stack.thumbnails[f].spec);
      }
      return files;
};
function createStack(){
for(var t in stk){ 
    app.document.select(new Thumbnail(File(Folder(app.document.presentationPath) + "/" +new Thumbnail(stk[t]).spec.name)));
    }
app.document.chooseMenuItem('StackGroup'); 
app.eventHandlers.pop();
app.document.thumbnail = currentFolder;
for(var t in stk){ 
    new Thumbnail(stk[t]).remove();
    }
stk = new Array();
stacksSelected = new Array();
stackSels = new Array();
};
function onDocLoadEvent( event ){
if(event.object instanceof Document &&  event.type == "loaded" ){
if(decodeURI(copyFolder) == decodeURI(Folder(app.document.presentationPath)))  createStack();
	}
	return { handled: false}; 
};
};