//C:\Program Files (x86)\Common Files\Adobe\Startup Scripts CS6\Adobe Photoshop\photoshop.jsx

#target bridge 
if( BridgeTalk.appName == "bridge" ) {   
  var menu = MenuElement.find ("contextTools");
if (menu == null) var newMenu = MenuElement.create( "menu", "Photoshop", "at the end of Thumbnail", "contextTools" );
 
 var IProc = new MenuElement("command","Image Processor...", "at the end of contextTools","ImageProc");
 var ThumbBatch = new MenuElement("command","Batch...", "at the end of contextTools","BatchProc");
 var stackFromBridge = new MenuElement("command","Load files into Photoshop layers", "at the end of contextTools","StacktoLayers");
 var PhotoMerg = new MenuElement("command","Photomerge...", "at the end of contextTools","PhotoMerg");
 var mergeToHDR = new MenuElement("command","Merge to HDR Pro.", "at the end of contextTools","MergHDR");
 var contactSheet  = new MenuElement("command","Contact Sheet II...", "at the end of contextTools","Contactsheet");
 var lensCorrect = new MenuElement("command","Lens Correction...", "at the end of contextTools","lensCorrection");
 var picturePack = new MenuElement("command","Picture Package...", "at the end of contextTools","picPackage");
 var place = new MenuElement("command","Place in Photoshop...", "at the end of contextTools","picPlace");
 var print = new MenuElement("command","Print...", "at the end of contextTools","picPrint");

IProc.onSelect =photoshop.imageprocessorFromBridge;
ThumbBatch.onSelect = photoshop.batchFromBridge;
stackFromBridge.onSelect = photoshop.loadFilesIntoStackFromBridge;
PhotoMerg.onSelect = photoshop.photomergeFromBridge;
mergeToHDR.onSelect = photoshop.mergeToHDRFromBridge;
contactSheet.onSelect = photoshop.contactSheetFromBridge;
lensCorrect.onSelect = photoshop.lensCorrectFromBridge;
picturePack.onSelect = photoshop.picturePackageFromBridge;
place.onSelect = function(){
    photoshop.place(app.document.selections[0].spec);
};
print.onSelect = function(){
    //photoshop.jsx needs amendment from document.print(); to document.printOneCopy(); for CS6
    photoshop.print(app.document.selections[0].spec);
    };
};

