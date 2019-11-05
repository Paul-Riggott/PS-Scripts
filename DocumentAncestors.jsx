// Remove Document Ancestors metadata
#target photoshop;
var File1 = File.openDialog("Please select Image","*.*");
if(File1.exists) {
    removeAncestors( File1);
    alert("Please check file now");
    }

function removeAncestors( file){
if ( !ExternalObject.AdobeXMPScript ) ExternalObject.AdobeXMPScript = new ExternalObject('lib:AdobeXMPScript');
        var xmpf = new XMPFile( File(file).fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE );
        var xmp = xmpf.getXMP();
        xmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "DocumentAncestors");
      if (xmpf.canPutXMP( xmp )) {
         xmpf.putXMP( xmp );
      }
      xmpf.closeFile( XMPConst.CLOSE_UPDATE_SAFELY );
}