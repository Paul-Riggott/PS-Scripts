#target bridge 
if( BridgeTalk.appName == "bridge" ) { 
NameSpace = new MenuElement("command", "NameSpace List", "at the end of tools");
}
NameSpace.onSelect = function () { 
if (ExternalObject.AdobeXMPScript == undefined) ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
var xmp = new XMPMeta("");
var f = new File(Folder.desktop +"/Name Spaces.txt");
f.open("w", "TEXT", "????");
f.writeln(XMPMeta.dumpNamespaces());
f.close();
alert("Name Spaces.txt has been created on the desktop");
};