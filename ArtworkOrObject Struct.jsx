/*
    Example on how to populate ArtworkOrObject and locationShown fields
*/
#target photoshop;
app.bringToFront();

if(documents.length){
if (ExternalObject.AdobeXMPScript == undefined)  ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
xmp = new XMPMeta( app.activeDocument.xmpMetadata.rawData );
xmp.setProperty("http://ns.useplus.org/ldf/xmp/1.0/","ImageSupplierImageID", activeDocument.name);
newxmp = new XMPMeta(ArtworkOrObject("1944-12-20T00:00Z","Source field","Copyright field","Title field","Your name","123456789"));
XMPUtils.appendProperties(newxmp, xmp, XMPConst.APPEND_ALL_PROPERTIES);
newxmp = new XMPMeta(locationShown("Daisy Hill","Bradford","W. Yks","England","+44","In the stars"));
XMPUtils.appendProperties(newxmp, xmp, XMPConst.APPEND_ALL_PROPERTIES);
app.activeDocument.xmpMetadata.rawData = xmp.serialize();
};
function ArtworkOrObject(date,Source,Copy,Title,Creator,SInvNo){
if(date == undefined) date = ''; if(Source == undefined) Source = '';
if(Copy == undefined) Copy = ''; if(Title == undefined) Title ='';
if(Creator == undefined) Creator = ''; if(SInvNo == undefined) SInvNo = '';
var s ="<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27        \">";
s+="<rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">";
s+="<rdf:Description rdf:about=\"\" xmlns:Iptc4xmpExt=\"http://iptc.org/std/Iptc4xmpExt/2008-02-29/\">"
s+="<Iptc4xmpExt:ArtworkOrObject><rdf:Bag><rdf:li><rdf:Description ";      
s+=" Iptc4xmpExt:AODateCreated=\"" + date + "\"  Iptc4xmpExt:AOSource=\"" +Source + "\" ";
s+=" Iptc4xmpExt:AOSourceInvNo=\""+SInvNo + "\"  Iptc4xmpExt:AOCopyrightNotice=\"" + Copy +"\">";
s+="<Iptc4xmpExt:AOTitle><rdf:Alt><rdf:li xml:lang=\"x-default\">" + Title;
s+=" </rdf:li></rdf:Alt></Iptc4xmpExt:AOTitle><Iptc4xmpExt:AOCreator><rdf:Seq><rdf:li>";
s+=  Creator +"</rdf:li></rdf:Seq></Iptc4xmpExt:AOCreator></rdf:Description>";
s+="</rdf:li></rdf:Bag></Iptc4xmpExt:ArtworkOrObject></rdf:Description></rdf:RDF></x:xmpmeta>";
return s;
}; 
function locationShown(SubLoc,City,State,CountryName,CountryCode,WorldRegion){
if(SubLoc == undefined) SubLoc = ''; if(City == undefined) City = '';
if(State == undefined) State = ''; if(CountryName == undefined) CountryName = '';
if(CountryCode == undefined) CountryCode = ''; if(WorldRegion == undefined) WorldRegion = '';
var s ="<x:xmpmeta xmlns:x=\"adobe:ns:meta/\" x:xmptk=\"Adobe XMP Core 5.3-c011 66.145661, 2012/02/06-14:56:27        \">"
 s +="<rdf:RDF xmlns:rdf=\"http://www.w3.org/1999/02/22-rdf-syntax-ns#\">";
 s += "<rdf:Description rdf:about=\"\"   xmlns:Iptc4xmpExt=\"http://iptc.org/std/Iptc4xmpExt/2008-02-29/\">";
 s +="<Iptc4xmpExt:LocationShown><rdf:Bag><rdf:li rdf:parseType=\"Resource\">";
 s +="<Iptc4xmpExt:Sublocation>" +SubLoc +"</Iptc4xmpExt:Sublocation>";
 s +="<Iptc4xmpExt:City>"+City +"</Iptc4xmpExt:City>";
 s +="<Iptc4xmpExt:ProvinceState>"+ State +"</Iptc4xmpExt:ProvinceState>";
 s +="<Iptc4xmpExt:CountryName>" + CountryName + "</Iptc4xmpExt:CountryName>";
 s +="<Iptc4xmpExt:CountryCode>" + CountryCode + "</Iptc4xmpExt:CountryCode>";
 s +="<Iptc4xmpExt:WorldRegion>" + WorldRegion + "</Iptc4xmpExt:WorldRegion>";
 s +="</rdf:li></rdf:Bag></Iptc4xmpExt:LocationShown></rdf:Description></rdf:RDF></x:xmpmeta>";
 return s;
};