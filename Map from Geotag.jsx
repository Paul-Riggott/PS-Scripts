#target bridge   
   if( BridgeTalk.appName == "bridge" ) {  
mapFromGPS = MenuElement.create("command", "Map from GPS data", "at the end of Thumbnail");
}
mapFromGPS.onSelect = function () {  
try{
webMap.remove();
}catch(err){};
var ml = new File(Folder.temp + "/mapLocation.htm");
ml.encoding="UTF8";
if(ml.exists)ml.remove();
if(app.document.selections.length <1) return;
var thumb = app.document.selections[0];
md = thumb.synchronousMetadata;
md.namespace =  "http://ns.adobe.com/exif/1.0/";
lat = md.GPSLatitude ? md.GPSLatitude : "" ;
lon = md.GPSLongitude ? md.GPSLongitude : "";
if(lat == "") return;
if(lon == "") return;
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
createHTML(ml,latResult, lonResult);
//give it time to create html
var tmpFile = File(Folder.temp + "/mapL.htm");
ml.copy(tmpFile);
tmpFile.remove();
webMap = new TabbedPalette(app.document, "Photo Location", "mapID", "web", decodeURI(ml.fsName));
                        
function createHTML(maploc,lon,lat){
maploc.open('w');
maploc.writeln("<!DOCTYPE html>");
maploc.writeln("<html><head>");
maploc.writeln('<meta name="viewport" content="initial-scale=1.0, user-scalable=no">');
maploc.writeln('<meta charset="utf-8">');
maploc.writeln("<title>Simple markers</title>");
maploc.writeln("<style>html, body, #map-canvas {height: 100%;margin: 0px;padding: 0px}</style>");
maploc.writeln('<script src="https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false"></script>');
maploc.writeln("<script>function initialize() {");
maploc.writeln("var myLatlng = new google.maps.LatLng(" + lon +"," + lat  + ",true);");
maploc.writeln("var mapOptions = {zoom: 15,center: myLatlng,mapTypeId: google.maps.MapTypeId.ROADMAP}");
maploc.writeln("var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);");
maploc.writeln("var marker = new google.maps.Marker({position: myLatlng,map: map,title: 'My Picture Name'});}");
maploc.writeln("google.maps.event.addDomListener(window, 'load', initialize);");
maploc.writeln('</script></head><body><div id="map-canvas"></div></body></html>');
}
};