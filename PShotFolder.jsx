//This script is called by the Bridge script "Bridge Hot Folder.jsx"
#target Photoshop
main();
function main(){
if($.getenv('HotFolder') == null){
alert("Please re-start the Hot Folder in Bridge!");
return;
}    
try{
var hotFolder = Folder(decodeURI($.getenv('HotFolder')));
if(!hotFolder.exists){
    alert("Shit can't find hot folder!"+ "\n" + hotFolder);
    return;
    }
//create a couple of folders if they do not exist
var ProcessedFolder = Folder(hotFolder +"/Processed");
if(!ProcessedFolder.exists) ProcessedFolder.create();
var OriginalsFolder = Folder(hotFolder +"/Originals");
if(!OriginalsFolder.exists) OriginalsFolder.create();

//get a list of files in the hot folder
var fileList = hotFolder.getFiles(/\.(jpg|tif|psd|cr2|nef)$/i);
//This is where all the work is done
for(var z in fileList){
//Add your own code to suit your needs
//Example code ....
//open each file
open(fileList[z]);
var Name = decodeURI(app.activeDocument.name).replace(/\.[^\.]+$/, '');
//run an action ?
//app.doAction('atn name', 'atnSet name');
//resize
FitImage( 1024, 600 );
//save processed file
var saveFile = File(ProcessedFolder +"/" + Name + ".psd");
SavePSD(saveFile);
//close file
app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
//move file to Originals folder
fileList[z].rename(File(OriginalsFolder + "/" + fileList[z].name));
    }
}catch(e){alert(e + "\n" + e.line);}
}
function SavePSD(saveFile){ 
psdSaveOptions = new PhotoshopSaveOptions(); 
psdSaveOptions.embedColorProfile = true; 
psdSaveOptions.alphaChannels = true;  
psdSaveOptions.layers = true;  
activeDocument.saveAs(saveFile, psdSaveOptions, true, Extension.LOWERCASE); 
}
function FitImage( inWidth, inHeight ) {
	if ( inWidth == undefined || inHeight == undefined ) {
		alert( "FitImage requires both Width & Height!");
		return;
	}
	var desc = new ActionDescriptor();
	var unitPixels = charIDToTypeID( '#Pxl' );
	desc.putUnitDouble( charIDToTypeID( 'Wdth' ), unitPixels, inWidth );
	desc.putUnitDouble( charIDToTypeID( 'Hght' ), unitPixels, inHeight );
	var runtimeEventID = stringIDToTypeID( "3caa3434-cb67-11d1-bc43-0060b0a13dc4" );	
	executeAction( runtimeEventID, desc, DialogModes.NO );
}