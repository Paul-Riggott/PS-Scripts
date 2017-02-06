#target bridge;
if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
var jpeg = new File(Folder.desktop+ "/TestMe.jpg" );
var bitmap = new BitmapData( 100, 100 );
app.syncronousMode = true;
bitmap.exportTo( jpeg );
app.syncronousMode = false;
var xmp = new XMPMeta();
try {
     xmp.appendArrayItem( XMPConst.NS_DC, "creator", "Creator", 0, XMPConst.ARRAY_IS_ORDERED );
     xmp.setLocalizedText( XMPConst.NS_DC, "title", null, "en-US", "Title" );
     xmp.setProperty(XMPConst.NS_PHOTOSHOP, "AuthorsPosition", "Author Position");
     xmp.setProperty(XMPConst.NS_PHOTOSHOP, "Headline", "Headline");
     xmp.setLocalizedText( XMPConst.NS_DC, "description", null, "x-default", "Caption/Description" ); 
     xmp.setProperty(XMPConst.NS_PHOTOSHOP, "DateCreated", new XMPDateTime(new Date()), XMPConst.XMPDATE);
     var Keys=["Keyword1","Keyword2","Etc."];
     for(var s in Keys){
	 xmp.appendArrayItem(XMPConst.NS_DC, "subject", Keys[s], 0,XMPConst.PROP_IS_ARRAY);
	  }
     xmp.setStructField( XMPConst.NS_IPTC_CORE, "CreatorContactInfo", XMPConst.NS_IPTC_CORE, "CiAdrCtry", "England" );
     xmp.setStructField( XMPConst.NS_IPTC_CORE, "CreatorContactInfo", XMPConst.NS_IPTC_CORE, "CiEmailWork", "Joe.Bloggs@email.com" );
     xmp.setStructField( XMPConst.NS_IPTC_CORE, "CreatorContactInfo", XMPConst.NS_IPTC_CORE, "CiAdrCity","Leeds");
     xmp.setStructField( XMPConst.NS_IPTC_CORE, "CreatorContactInfo", XMPConst.NS_IPTC_CORE, "CiAdrExtadr","Address");
     xmp.setStructField( XMPConst.NS_IPTC_CORE, "CreatorContactInfo", XMPConst.NS_IPTC_CORE, "CiAdrPcode","LS12PP");
     xmp.setStructField( XMPConst.NS_IPTC_CORE, "CreatorContactInfo", XMPConst.NS_IPTC_CORE, "CiAdrRegion","West Yorkshire");
     xmp.setStructField( XMPConst.NS_IPTC_CORE, "CreatorContactInfo", XMPConst.NS_IPTC_CORE, "CiTelWork","0132999999");
     xmp.setStructField( XMPConst.NS_IPTC_CORE, "CreatorContactInfo", XMPConst.NS_IPTC_CORE, "CiUrlWork","www.mysite.co.uk");
     xmp.setProperty( XMPConst.NS_IPTC_CORE, "Iptc4xmpCore:Location","Sub Location");
     xmp.setProperty( XMPConst.NS_IPTC_CORE, "Iptc4xmpCore:IntellectualGenre","Itellectual Genre");
     xmp.appendArrayItem( XMPConst.NS_IPTC_CORE, "Iptc4xmpCore:SubjectCode","IPTC Subject Code",0,XMPConst.PROP_IS_ARRAY);
     xmp.appendArrayItem( XMPConst.NS_IPTC_CORE, "Iptc4xmpCore:Scene","IPTC Scene Code",0,XMPConst.PROP_IS_ARRAY);
     xmp.setProperty( XMPConst.NS_IPTC_CORE, "Iptc4xmpCore:CountryCode", "ISO Country Code" );
     xmp.setProperty(XMPConst.NS_PHOTOSHOP, "City", "London");
     xmp.setProperty(XMPConst.NS_PHOTOSHOP, "State", "State/Province");
     xmp.setProperty(XMPConst.NS_PHOTOSHOP, "Country", "Britain");
     xmp.setProperty(XMPConst.NS_PHOTOSHOP, "CaptionWriter", "Description Writer");
     xmp.setProperty(XMPConst.NS_PHOTOSHOP, "TransmissionReference", "Job Identifier");
     xmp.setProperty(XMPConst.NS_PHOTOSHOP, "Instructions", "Instructions");
     xmp.setProperty(XMPConst.NS_PHOTOSHOP, "Credit", "Credit Line");
     xmp.setProperty(XMPConst.NS_PHOTOSHOP, "Source", "Source");
     xmp.setLocalizedText( XMPConst.NS_DC, "rights", null, "x-default", "Copyright Notice" ); 
     xmp.appendArrayItem( XMPConst.NS_XMP_RIGHTS, "UsageTerms","Rights Usage",0,XMPConst.PROP_IS_ARRAY);
     var xmpFile = new XMPFile( jpeg.fsName, XMPConst.FILE_UNKNOWN, XMPConst.OPEN_FOR_UPDATE | XMPConst.OPEN_USE_SMART_HANDLER );
     if( xmpFile.canPutXMP( xmp ) )
     {
               xmpFile.putXMP(xmp);
     }
     xmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY);
} catch( e ) {
          $.writeln("ERROR SETTING METADATA: \n" + e + "\n"+e.line );
}