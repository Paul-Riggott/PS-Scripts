#target bridge   
   if( BridgeTalk.appName == "bridge" ) {  
mapFromGPSMulti = MenuElement.create("command", "Map from GPS", "at the end of Tools");
}
mapFromGPSMulti.onSelect = function () {  
var ml = new File(Folder.temp + "/mapLocation.htm");
if(ml.exists) ml.remove();
try{
webMap.remove();
}catch(err){};
var locations = new Array();
var Center = new Array();
var sels = app.document.selections;
var Count =0;
for (var s in sels){
md = sels[s].synchronousMetadata;
md.namespace =  "http://purl.org/dc/elements/1.1/";
Filename = sels[s].name;
var Title ='';
Title = md.title ? md.title[0] : "";
if(Title == '' ) Title = Filename;
md.namespace =  "http://ns.adobe.com/exif/1.0/";
lat = md.GPSLatitude ? md.GPSLatitude : "" ;
lon = md.GPSLongitude ? md.GPSLongitude : "";
if(lat == "") continue;
if(lon == "") continue;
var latparts = lat.match(/\d+/g);
lat1 =( Number(latparts[0]) +(Number(latparts[1].toString()+"."+latparts[2].toString())/60)).toFixed(4);
var lonparts = lon.match(/\d+/g);
lon1 = (Number(lonparts[0]) +(Number(lonparts[1].toString()+"."+lonparts[2].toString())/60)).toFixed(4);
latneg='';
switch(lat.match(/.$/).toString()){
    case  'S' : latneg='-'; break;
    case  'W' : latneg='-'; break;
    }
lonneg='';
switch(lon.match(/.$/).toString()){
    case  'S' : lonneg= '-'; break;
    case  'W' : lonneg= '-'; break;
    }
var latResult=latneg+lat1;
var lonResult=lonneg+lon1;
locations.push(["'"+Title+"'",latResult,lonResult,++Count]);
}
var Counta=0;
var Countb=0;
for(n in locations){
    Counta += Number(locations[n][1]);
    Countb += Number(locations[n][2]);
    }
Center[0] = Counta/locations.length;
Center[1] = Countb/locations.length;
createHTML(ml,locations,Center);
var tmpFile = File(Folder.temp + "/mapL.htm");
ml.copy(tmpFile);
tmpFile.remove();
webMap = new TabbedPalette(app.document, "Photo Location", "mapID", "web", decodeURI(ml.fsName));
function createHTML(maploc,locations,Center){
maploc.open('w');
maploc.encoding="UTF8";
maploc.writeln("<!DOCTYPE html><html><head>");
maploc.writeln("<meta http-equiv=\"content-type\" content=\"text/html; charset=UTF-8\" /> ");
maploc.writeln("<title>Bridge Multiple Markers</title>"); 
maploc.writeln("<script src=\"http://maps.google.com/maps/api/js?sensor=false\"  type=\"text/javascript\"></script>");
maploc.writeln("</head> <body><div id=\"map\" style=\"width: 500px; height: 400px;\"></div><script type=\"text/javascript\">");
maploc.writeln("var locations =");
maploc.writeln(locations.toSource().replace(/"/g,''));
maploc.writeln("var map = new google.maps.Map(document.getElementById('map'), { zoom: 10,");
maploc.writeln("center: new google.maps.LatLng("+ Center.toString() +"), mapTypeId: google.maps.MapTypeId.ROADMAP });");
maploc.writeln("var infowindow = new google.maps.InfoWindow(); var marker, i;");
maploc.writeln("for (i = 0; i < locations.length; i++){marker = new google.maps.Marker({");
maploc.writeln("position: new google.maps.LatLng(locations[i][1], locations[i][2]),map: map});");
maploc.writeln("google.maps.event.addListener(marker, 'click', (function(marker, i) {");
maploc.writeln("return function(){infowindow.setContent(locations[i][0]);infowindow.open(map, marker);");
maploc.writeln("}})(marker, i));}</script></body></html>");
maploc.close();
    };
};