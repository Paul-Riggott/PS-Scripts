#target bridge; 
   if( BridgeTalk.appName == "bridge" ) {  
cpToColls = new MenuElement("command", "Clipping Path to Collections", "at the end of Tools");
}
cpToColls.onSelect = function () { 
app.document.deselectAll(); 
var Thumbs = app.document.getSelection("psd,psb,tif,jpg,eps");
var pathList = new Array();
var pathNames = new Array();
var Name = '';
for (var z in Thumbs){
    Name = getFirstClipPathName(Thumbs[z].spec);
    if(Name != ''){
        $.writeln("Name = " + Name + " length = " + Name.length);
        pathNames.push(Name);
        pathList.push([[Thumbs[z].spec],[Name]]);
        }    
    }
pathNames = UniqueList(pathNames);

for(var t=0;t< pathNames.length;t++){
tempArray = new Array();
 for(var p in pathList){
     if(pathList[p][1].toString() == pathNames[t].toString()) tempArray.push(new Thumbnail(File(pathList[p][0])));
     }
 var colls =app.getCollections();
 Found=false;
 for(var k in colls){
     if(colls[k].name.toString() == pathNames[t].toString()){
         app.addCollectionMember(colls[k],tempArray);
         Found=true;
         break;
         }
      }
     if(!Found){
             var newCollection = app.createCollection(pathNames[t].toString());
             app.addCollectionMember(newCollection,tempArray);
             }
    }
function getFirstClipPathName(file){
if(!file.exists) return;
file.open("r");
file.encoding.BINARY;
var dat = file.read();
file.close();
Text='';
if((result = dat.match(/8BIM\x0B\xB7/)) != null) {
ofs = Number(result.index+12);
Text = dat.substr(ofs+1, dat.charCodeAt(ofs));
    }
return Text;
};
function UniqueList(ArrayName){
var unduped = new Object;
for (var i = 0; i < ArrayName.length; i++) {   
unduped[ArrayName[i]] = ArrayName[i];
};
var uniques = new Array;for (var k in unduped) {
   uniques.push(unduped[k]);}
return uniques;
};
};