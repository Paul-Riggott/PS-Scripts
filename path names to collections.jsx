#target bridge; 
   if( BridgeTalk.appName == "bridge" ) {  
pToColls = new MenuElement("command", "Paths to Collections", "at the end of Tools");
}
pToColls.onSelect = function () { 
app.document.deselectAll(); 
var Thumbs = app.document.getSelection("psd,psb,tif,jpg,eps");
var pathList = new Array();
var pathNames = new Array();
var Name = '';
for (var z in Thumbs){
    Name = getFirstPathName(Thumbs[z].spec);
    if(Name != ''){
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
}
function getFirstPathName(file){
if(!file.exists) return;
file.open("r");
file.encoding.BINARY;
var dat = file.read();
file.close();
if((result = dat.match(/8BIM\x07\xd0/)) != null) {
ofs = Number(result.index+(result[0].length));
if(dat.charCodeAt(ofs)>0) Text = dat.substr(ofs+1, dat.charCodeAt(ofs));
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