#target bridge;
if( BridgeTalk.appName == "bridge" ) {  
var showLatestFile= new MenuElement( "command", "Preview Latest File", "at the end of Tools" , "findLatestPaul_R" );
}
showLatestFile.onSelect = function () { 
 findLatest = function(){
     try{
	var latest =app.document.visibleThumbnails[0];
	var thumbs = app.document.visibleThumbnails;
for( var t = 0; t < thumbs.length; ++t ){		
	var thumb = thumbs[t];
    if(latest.type == "folder") latest = thumb;
    if(thumb.type != "file") continue;
    if(thumb.hidden) continue;
    if( thumb.container ) continue;
	var mod = thumb.spec.modified.getTime();
	var lastMod = latest.spec.modified.getTime();
		if( mod > lastMod ) latest = thumb; 
     }
 if(latest == app.document.selections[0]) return;
     app.document.deselectAll();
	 app.document.select(latest);
     app.document.reveal(latest);
     }catch(e){$.writeln(e + "\n" + e.line); return;}
};
BottomBar = app.document.navbars.filesystem.bottom;
BottomBar.height = 30;
BottomBar.visible = true;
BottomBar.bu1 = BottomBar.add ('button',[5,5,300,25],'Stop Latest File Preview');
id = app.scheduleTask( "findLatest()", 500, true ); 
BottomBar.bu1.onClick=function(){
app.cancelTask (id);
BottomBar.visible = false;
    }
};