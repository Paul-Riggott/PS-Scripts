#target bridge   
 if( BridgeTalk.appName == "bridge" ) {  
var menu = MenuElement.find ('PictureProcessor');
if (menu == null){
PicProcessor = MenuElement.create( "command", "Picture Processor", "at the end of tools/ps",  "PictureProcessor" );
}
}
PicProcessor.onSelect = function () { 
   callPictureProcessor();
   }
function callPictureProcessor(){
if (BridgeTalk.appName != "photoshop") {
BridgeTalk.bringToFront ("photoshop");	
var btMessage = new BridgeTalk;
btMessage.target = "photoshop";
btMessage.body = "$.evalFile(new File(app.path + '/presets/scripts/Picture Processor.jsx'))";
btMessage.send(4);
}
}

