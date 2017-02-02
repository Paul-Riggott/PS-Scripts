#target bridge  
//written by Paul Riggott
if( BridgeTalk.appName == "bridge" ) {  
if(!MenuElement.find("myMetaData")){
var newMenu = new MenuElement( "menu", "MetaData", "after Help", "myMetaData" );
}
var newCommand = new MenuElement( "command", "DIY Custom Metadata", "at the end of myMetaData" , "xx1C" );
}
newCommand.onSelect = function () { 
	  DIYMetadata();
	  }
function DIYMetadata(){
var win = new Window( 'dialog', 'With Compliments' ); 
var inputFile ='';
win.alignChildren=["row","bottom"];
win.g1 = win.add('group');
win.title = win.g1.add('statictext',undefined,'Bridge Input Metadata');
win.title.alignment="bottom";
win.title.graphics.font = ScriptUI.newFont("Georgia","BOLDITALIC",26);
win.title.helpTip="Written by Paul Riggott";
win.g0 = win.add('group');
win.g0.orientation = "row";
win.p1= win.g0.add("panel", undefined, "Select Fields", {borderStyle:"black"}); 
win.p1.helpTip="At least one field is required!";
win.p1.preferredSize=[150,490];
win.p1.alignChildren="column";
win.g5 =win.p1.add('group');
win.g5.orientation="column";
win.g5.alignChildren = "left";
win.g5.spacing=10;
var Options=['Keywords 1','Keywords 2','Description','Headline','Title','Instructions','Date Created','Location','City','Country','Rating','Copyright Notice','Creator','Label','Usage Terms','Credit','Source','Job Identifier'];
win.g5.cb1 = win.g5.add('checkbox',undefined,'Keywords 1');
win.g5.cb1.helpTip="Keywords in one field seperated by a semicolon ';'";
win.g5.cb2 = win.g5.add('checkbox',undefined,'Keywords 2');
win.g5.cb2.helpTip="Keywords in seperate fields\rThese must be last in the list!";
win.g5.cb3 = win.g5.add('checkbox',undefined,'Description');
win.g5.cb4 = win.g5.add('checkbox',undefined,'Headline');
win.g5.cb5 = win.g5.add('checkbox',undefined,'Title');
win.g5.cb6 = win.g5.add('checkbox',undefined,'Instructions');
win.g5.cb7 = win.g5.add('checkbox',undefined,'Date Created');
win.g5.cb8 = win.g5.add('checkbox',undefined,'Location');
win.g5.cb9 = win.g5.add('checkbox',undefined,'City');
win.g5.cb10 = win.g5.add('checkbox',undefined,'Country');
win.g5.cb11 = win.g5.add('checkbox',undefined,'Rating');
win.g5.cb12 = win.g5.add('checkbox',undefined,'Copyright Notice');
win.g5.cb13 = win.g5.add('checkbox',undefined,'Creator');
win.g5.cb14 = win.g5.add('checkbox',undefined,'Label');
win.g5.cb15 = win.g5.add('checkbox',undefined,'Usage Terms');
win.g5.cb16 = win.g5.add('checkbox',undefined,'Credit');
win.g5.cb17 = win.g5.add('checkbox',undefined,'Source');
win.g5.cb18 = win.g5.add('checkbox',undefined,'Job Identifier');

win.p2= win.g0.add("panel", undefined, "Order Of Fields In Input File", {borderStyle:"black"}); 
win.p2.helpTip="Shuffle as required";
win.p2.preferredSize=[150,490];
win.g10 =win.p2.add('group');
win.g10.lb1 = win.g10.add('listbox');
win.g10.lb1.preferredSize=[130,400];
win.g10a =win.p2.add('group');
win.g10a.orientation = "row";
win.g10a.bu1 = win.g10a.add('button',undefined,"Move Up");

win.p3= win.g0.add("panel", undefined, "Input Options", {borderStyle:"black"}); 
win.p3.helpTip="First field in the input file must be the filename only!";
win.p3.preferredSize=[150,490];
win.g15 =win.p3.add('group');
win.g15.orientation = "column";
win.g15.alignChildren = "left";
win.g15.cb1 = win.g15.add('checkbox',undefined,'Remove Header Line');
win.g15.cb1.helpTip="The first line of the input file\rwill be removed";
win.g15.rb1 = win.g15.add('radiobutton',undefined,'CSV Comma Delimited');
win.g15.rb2 = win.g15.add('radiobutton',undefined,'Text Tab Delimited');
win.g15.rb1.value=true;
win.g15.cb2 = win.g15.add('checkbox',undefined,'Use Files in Sub Folders');
win.g15.cb3 = win.g15.add('checkbox',undefined,'Copyright all files');
win.g10a.bu1.onClick = function(){
if(win.g10.lb1.selection == null) return;
var itemNames = win.g10.lb1.selection;
var pos =itemNames.index-1;
if(pos>-1){
var tmp =win.g10.lb1.selection.text;
win.g10.lb1.remove(itemNames.index);
win.g10.lb1.add("item",tmp,pos);
win.g10.lb1.selection=pos;
    }
}
win.g10a.bu2 = win.g10a.add('button',undefined,"Move Down");

win.g10a.bu2.onClick = function(){
if(win.g10.lb1.selection == null) return;
var itemNames = win.g10.lb1.selection;
var pos =itemNames.index+1;
if(pos<win.g10.lb1.items.length){
var tmp =win.g10.lb1.selection.text;
win.g10.lb1.remove(itemNames.index);
win.g10.lb1.add("item",tmp,pos);
win.g10.lb1.selection=pos;
    }
}

win.g20 = win.add('group');
win.p4= win.g20.add("panel", undefined, "Select Input File", {borderStyle:"black"}); 
win.p4.orientation = "row";
win.p4.spacing=40;
win.p4.preferredSize=[550,40];
win.p4.et1 = win.p4.add('edittext');
win.p4.et1.enabled=false;
win.p4.et1.preferredSize=[400,20];
win.p4.bu1 = win.p4.add('button',undefined,'Browse');
win.p4.bu1.onClick=function(){

if(win.g15.rb1.value){
 inputFile = File.openDialog("Open Keywords File","CSV File(*.csv):*.csv;"); 
}else{
     inputFile = File.openDialog("Open Keywords File","TXT File(*.txt):*.txt;"); 
    }
if(inputFile != null) win.p4.et1.text = decodeURI(inputFile.fsName);
}
win.g100 = win.add('group');
win.g100.spacing=20;
win.g100.orientation = "row";
win.g100.bu1 = win.g100.add('button',undefined,"Process");
win.g100.bu1.preferredSize=[250,40];
win.g100.bu2 = win.g100.add('button',undefined,"Cancel");
win.g100.bu2.preferredSize=[250,40];
win.layout.layout();
win.g100.bu1.onClick=function(){
 var Items =  win.g10.lb1.items.length;
 if(Items < 1) {
     alert("At least one field is required!");
     return;
     }
 if(inputFile == null) {
     alert("Input file has not been selected!");
     return;
     }
  if(!inputFile.exists) {
     alert("Input file has not been selected!");
     return;
     }
 var keyCount=0;
 var key2 = 99;
 var List = win.g10.lb1.items.toString().split(',');
 for(var x in List){  
     if(List[x].toString().match(/^Keywords/)) keyCount++;
      if(List[x].toString().match(/^Keywords 2/)) key2 = x;
     }
 if(keyCount >1) {
     alert("Only one set of Keywords allowed!");
     return;
     }
 if(key2 != 99){
     if(key2 != (win.g10.lb1.items.length-1)){
         win.g5.cb2.value=false;
         win.g5.cb2.onClick();
         win.g5.cb2.value=true;
         win.g5.cb2.onClick();
         alert("These keywords must be last in the list please\rcheck if the listing is now correct!");
         return;
         }
     }

 win.close(1);
 Process();
};

win.g5.cb1.onClick = function(){
    if(win.g5.cb1.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb2.onClick = function(){
    if(win.g5.cb2.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb3.onClick = function(){
    if(win.g5.cb3.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb4.onClick = function(){
    if(win.g5.cb4.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb5.onClick = function(){
    if(win.g5.cb5.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb6.onClick = function(){
    if(win.g5.cb6.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb7.onClick = function(){
    if(win.g5.cb7.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb8.onClick = function(){
    if(win.g5.cb8.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb9.onClick = function(){
    if(win.g5.cb9.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb10.onClick = function(){
    if(win.g5.cb10.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb11.onClick = function(){
    if(win.g5.cb11.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb12.onClick = function(){
    if(win.g5.cb12.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb13.onClick = function(){
    if(win.g5.cb13.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb14.onClick = function(){
    if(win.g5.cb14.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb15.onClick = function(){
    if(win.g5.cb15.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb16.onClick = function(){
    if(win.g5.cb16.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb17.onClick = function(){
    if(win.g5.cb17.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.g5.cb18.onClick = function(){
    if(win.g5.cb18.value) {
        win.g10.lb1.add("item",this.text);
        var Count = win.g10.lb1.items.toString().split(',').length;
        win.g10.lb1.selection=Number(Count-1);
        }else{
            var Items =  win.g10.lb1.items.toString().split(',');
            for(var a in Items){
                if(Items[a].toString().match(this.text)){
                   win.g10.lb1.remove(Number(a));
                    }               
                }
            }
    }
win.graphics.backgroundColor = win.graphics.newBrush(win.graphics.BrushType.SOLID_COLOR, [1.00, 1.00, 1.00, 1]);
win.center();
win.show();
function Process(){
var copyRight = win.g15.cb3.value;
folders=[];
if(win.g15.cb2.value){//Use subfolders
var topLevel = Folder(app.document.presentationPath);	
folders = FindAllFolders(topLevel, folders);
folders.unshift(topLevel);
}
var OrderList = win.g10.lb1.items.toString().split(',');
var Path =app.document.presentationPath;
var errorLog = File(Path +"/Error Log.txt");
 loadXMPLib();
inputFile.open('r');
if(win.g15.cb1.value) inputFile.readln();
var datFile=[];
while(!inputFile.eof){
var line = inputFile.readln();
if(line.length > 5) datFile.push(line);
	}
inputFile.close();
errorLog.open('w');
errorLog.writeln("Processing :: "+decodeURI(inputFile.fsName) +" Total Files = "+datFile.length+"\r\r");
errorLog.close();
for(var t in datFile){
var str=datFile[t];
if(win.g15.rb2.value){ 
str= str.split('\t'); 
}else{
    str= str.split(','); 
}
if(!win.g15.cb2.value){//Use subfolders
var fileName = new File(Path+"/"+ str.shift());
}else{
    var nextFile = str.shift();
    for(var g in folders){
        var fileName = new File(folders[g] + "/" + nextFile);
        if(fileName.exists) break;
        }
    if(!fileName.exists)  fileName = new File(Path + "/" + nextFile);
    }

var Keys=''; var Desc =''; var Head = ''; var Title =''; var Instructions =''; var CopyInfo =''; var Creator='';
var Location ='';  var scriptDate = ''; var d = ''; var City =''; var Country = ''; var Rating = 0; var Label='';var Usage='';var Credit=''; var Source='';var JobId='';
var doKeys  = doDesc = doHead = doTitle = doInst = doDate = doLoc = doCity = doCountry = doRating = doCopyInfo =doCreator = doLabel = doUsage = doCredit = doSource = doJobId = false;

for(var a in OrderList){
   switch(OrderList[a].toString()){
       case 'Keywords 1' : Keys =str.shift(); Keys = Keys.split(";") doKeys = true; break;
       case 'Keywords 2' : Keys = str; doKeys = true; break;
       case 'Description' : Desc = str.shift().toString().replace(/\"/g,''); doDesc = true; break;
       case 'Copyright Notice' : CopyInfo = str.shift().toString().replace(/\"/g,''); doCopyInfo = true; break;
       case 'Headline' : Head = str.shift().toString().replace(/\"/g,''); doHead = true; break;
       case 'Creator' : Creator = str.shift().toString().replace(/\"/g,''); doCreator = true; break;
       case 'Title' : Title = str.shift().toString().replace(/\"/g,''); doTitle = true; break;
       case 'Instructions' : Instructions = str.shift().toString().replace(/\"/g,''); doInst = true; break;
       case 'Date Created' : scriptDate = str.shift().toString().replace(/\"/g,'');
       d = new XMPDateTime(new Date(Date.parse (scriptDate))); doDate = true; break;
       case 'Location' : Location = str.shift().toString().replace(/\"/g,''); doLoc = true; break;
       case 'City' : City = str.shift().toString().replace(/\"/g,''); doCity = true; break;
       case 'Country' : Country = str.shift().toString().replace(/\"/g,''); doCountry = true; break;
       case 'Rating' : Rating = Number(str.shift()); doRating = true; break;
       case 'Label' : Label = str.shift().toString().replace(/\"/g,''); doLabel = true; break;
        case 'Usage Terms' : Usage= str.shift().toString().replace(/\"/g,''); doUsage = true; break;
        case 'Credit' : Credit = str.shift().toString().replace(/\"/g,''); doCredit = true; break;
        case 'Source' : Source = str.shift().toString().replace(/\"/g,''); doSource = true; break;
        case 'Job Identifier' : JobId = str.shift().toString().replace(/\"/g,''); doJobId = true; break;
       default : break;       
       }
    }
if(fileName.exists){
var thumb = new Thumbnail(fileName); 
   if(thumb.hasMetadata){ 
      var selectedFile = thumb.spec;    
      var myXmpFile = new XMPFile( selectedFile.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE); 
		var myXmp = myXmpFile.getXMP();
        if(doLabel){
            try{
                switch(Label.toString().toLowerCase()){
                    case 'select' : thumb.label='Select'; break;
                    case 'second' : thumb.label='Second'; break;
                    case 'approved' : thumb.label='Approved'; break;
                    case 'review' : thumb.label='Review'; break;
                    case 'to do' : thumb.label='To Do'; break;
                    default : break;
                    }
            }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Unable to Copyright");}
            }
        if(copyRight){
            try{
               myXmp.setProperty( XMPConst.NS_XMP_RIGHTS, "Marked",true, XMPConst.STRING);
                }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Unable to Copyright");}
            }
        if(doCreator){
         try{
        myXmp.deleteProperty(XMPConst.NS_DC, "creator");
       myXmp.appendArrayItem(XMPConst.NS_DC, "creator", Creator, 0,XMPConst.ARRAY_IS_ORDERED);
          }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Unable to add Creator");}
            }
        if(doCopyInfo){
        try{
        myXmp.deleteProperty(XMPConst.NS_DC, "rights"); 
        myXmp.setLocalizedText( XMPConst.NS_DC, "rights", null, "x-default", CopyInfo ); 
         }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Bad Copyright Info : "+CopyInfo);}
        }
        if(doRating){
            try{
         myXmp.deleteProperty(XMPConst.NS_XMP, "Rating");
         myXmp.setProperty(XMPConst.NS_XMP, "Rating", Number(Rating));
          }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Bad Rating : "+Rating);}
        }
    
        if(doInst){
            try{
        myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "Instructions");
        myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "Instructions", Instructions);
        }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Bad Instruction : "+Instructions);}
        }
        
        if(doCredit){
            try{
        myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "Credit");
        myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "Credit", Credit);
        }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Bad Credit: "+Credit);}
        }
    
        if(doSource){
            try{
        myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "Source");
        myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "Source", Source);
        }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Bad Source: "+ Source);}
        }
    
        if(doJobId){
            try{
        myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "TransmissionReference");
        myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "TransmissionReference", JobId);
        }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Bad Job Id: "+ JobId);}
        }
        
        if(doCountry){
            try{
         myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "Country");
         myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "Country", Country);
         }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Bad Country : "+Country);}
        }
    
        if(doCity){
            try{
         myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "City");
         myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "City", City);
         }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Bad City : "+City);}
        }
    
        if(doDesc){
           try{
        myXmp.deleteProperty(XMPConst.NS_DC, "description"); 
        myXmp.setLocalizedText( XMPConst.NS_DC, "description", null, "x-default", Desc ); 
        }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Bad Description : "+Desc);}
        }
    
        if(doLoc){
        try{
        myXmp.deleteProperty(XMPConst.NS_IPTC_CORE, "Location"); 
        myXmp.setProperty(XMPConst.NS_IPTC_CORE, "Location",Location); 
        }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Bad Location : "+Location);}
        }
        
        if(Head){
        try{
        myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "Headline"); 
        myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "Headline", Head); 
        }catch(e){sendError(errorLog,decodeURI(fileName)+" :: Bad Headline : "+Head);}
        }
        
        if(doDate){
         try{
         if(!d.toString().match(/^0000/)) {
        myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "DateCreated", d, XMPConst.XMPDATE);
        }else{sendError(errorLog,decodeURI(fileName)+ " :: Bad date : "+scriptDate);}
        }catch(e){sendError(errorLog,decodeURI(fileName)+ " :: Bad date : "+scriptDate);}
        }
    
        if(doTitle){
         try{
         myXmp.deleteProperty(XMPConst.NS_DC, "title");
        myXmp.appendArrayItem(XMPConst.NS_DC, "title", Title, 0, XMPConst.ALIAS_TO_ALT_TEXT);
        myXmp.setQualifier(XMPConst.NS_DC, "title[1]", "http://www.w3.org/XML/1998/namespace", "lang", "x-default");
        }catch(e){sendError(errorLog,decodeURI(fileName)+" :: Bad Title : "+Title);}
        }
    
     if(doUsage){
         try{
         myXmp.deleteProperty(XMPConst.NS_XMP_RIGHTS, "UsageTerms"); 
        myXmp.setLocalizedText( XMPConst.NS_XMP_RIGHTS, "UsageTerms", null, "x-default", Usage); 
        }catch(e){sendError(errorLog,decodeURI(fileName)+" :: Bad Usage : "+Usage);}
        }
    
        if(doKeys){
         try{
        myXmp.deleteProperty(XMPConst.NS_DC,'subject');
        for(var s in Keys){
        myXmp.appendArrayItem(XMPConst.NS_DC, "subject", Keys[s], 0,XMPConst.PROP_IS_ARRAY);
        }
        }catch(e){sendError(errorLog,decodeURI(fileName)+" :: Bad Keyword : "+Keys.toString());}
        }
   
if (myXmpFile.canPutXMP(myXmp)) { 
        myXmpFile.putXMP(myXmp);
         myXmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY); 
}  
        }
    }else{
errorLog.open('e');
errorLog.seek(0,2);
errorLog.writeln(decodeURI(fileName) + " does not exist!");
errorLog.close();
}
}

errorLog.execute();
}

function sendError(errorLog,errorMessage){
errorLog.open('e');
errorLog.seek(0,2);
errorLog.writeln(errorMessage);
errorLog.close();
}
function FindAllFolders( srcFolderStr, destArray) {
	var fileFolderArray = Folder( srcFolderStr ).getFiles();
	for ( var i = 0; i < fileFolderArray.length; i++ ) {
		var fileFoldObj = fileFolderArray[i];
		if ( fileFoldObj instanceof File ) {			
		} else {
         destArray.push( Folder(fileFoldObj) );
		FindAllFolders( fileFoldObj.toString(), destArray );
		}
	}
	return destArray;
}
function loadXMPLib(){
if (ExternalObject.AdobeXMPScript == undefined) {
    ExternalObject.AdobeXMPScript = new ExternalObject("lib:AdobeXMPScript");
	}
}
function unloadXMPLib(){ 
   if( ExternalObject.AdobeXMPScript ) { 
      try{ 
         ExternalObject.AdobeXMPScript.unload(); 
         ExternalObject.AdobeXMPScript = undefined; 
      }catch (e){ } 
   } 
}
}