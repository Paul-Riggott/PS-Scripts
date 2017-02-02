#target bridge

	onDocLoadEvent = function( event ){
		if(event.object instanceof Document)
		{
			if( event.type == "loaded" )
			{
                $.sleep(1000);
				DataCopy();
			}
		}
		return { handled: false };  // Continue to do other handlers
	}
	
	// Add the event handler to the application
	app.eventHandlers.push( { handler: onDocLoadEvent} );


function DataCopy(){
    try{
	var SP = new TabbedPalette( app.document, "Copy MetaData", "CMtab", "script", "left", "top");
	SP.content.onResize = function(){
		var b = this.bounds;
		pnl.bounds = b;
		this.layout.resize(true);
		SP.content.layout.layout(true);
	}
    Keywords=[];
    Description =[];
    Title=[];
    Headline='';
	var pnl = SP.content.add("panel", undefined , "");
	pnl.alignChildren = ["center", "fill"];

	var mainBtnGp = pnl.add("group");
	mainBtnGp.orientation = "column";
	
	var titleGp = mainBtnGp.add("group");
	titleGp.alignment ="column";
	var title = titleGp.add("statictext", undefined, "Copy/Paste Metadata");
	var g = title.graphics;
	g.font = ScriptUI.newFont ("Arial", 14);

    var gp2 = mainBtnGp.add("group");
	gp2.p1 = gp2.add('panel');
     gp2a = gp2.p1.add('group');
    gp2a.orientation = "column";
	gp2a.alignment ="left";
    gp2a.alignChildren ="left";
    gp2a.cb1 = gp2a.add("checkbox",undefined,'Key Words');
    gp2a.cb2 = gp2a.add("checkbox",undefined,'Description');
    gp2a.cb3 = gp2a.add("checkbox",undefined,'Title');
    gp2a.cb4 =gp2a.add("checkbox",undefined,'Headline');
    gp2a.cb5 = gp2a.add("checkbox",undefined,'City');
    gp2a.cb6 =gp2a.add("checkbox",undefined,'State');
    gp2a.cb7 =gp2a.add("checkbox",undefined,'Country');  
    gp2a.cb8 =gp2a.add("checkbox",undefined,'Instructions');  
    
    gp2b = gp2.p1.add('group');
    gp2b.orientation = "column";
	gp2b.alignment = "fill"
    gp2b.bu1 = gp2b.add('button',undefined,'Select Data');
     gp2b.bu2 = gp2b.add('button',undefined,'Reset');
     
     gp2b.bu2.onClick = function(){
     Keywords=[];
     Description=[];
     Title=[];
     Headline='';
     City='';
     State='';
     Country='';
     Instructions='';
     gp2a.cb1.value  = false;
     gp2a.cb2.value  = false;
     gp2a.cb3.value  = false;
     gp2a.cb4.value  = false;
     gp2a.cb5.value  = false;
     gp2a.cb6.value  = false;
     gp2a.cb7.value  = false;
     gp2a.cb8.value  = false;
     }
    gp2b.bu1.onClick = function(){
        var dat = false;
        if(gp2a.cb1.value) dat = true;
        if(gp2a.cb2.value) dat = true;
        if(gp2a.cb3.value) dat = true;
        if(gp2a.cb4.value) dat = true;
        if(gp2a.cb5.value) dat = true;
        if(gp2a.cb6.value) dat = true;
        if(gp2a.cb7.value) dat = true;
        if(gp2a.cb8.value) dat = true;
        if(!dat) {
            alert("Please select at least one checkbox");
            return;
            }
        loadXMPLib();
        var thumb = app.document.selections[0]; 

if(!app.document.selections.length) return;
    if(thumb.type != "file") return;
var selectedFile = thumb.spec;    
var myXmpFile = new XMPFile( selectedFile.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_READ); 
myXmp = myXmpFile.getXMP();
try{
 if(gp2a.cb1.value){
Keywords = getArrayItems(XMPConst.NS_DC,'subject');
}
if(gp2a.cb2.value){
Description =  getArrayItems(XMPConst.NS_DC, "description");
    }
if(gp2a.cb3.value){
 Title = getArrayItems(XMPConst.NS_DC, "title");
    }
if(gp2a.cb4.value){
Headline =   myXmp.getProperty(XMPConst.NS_PHOTOSHOP, "Headline") ? myXmp.getProperty(XMPConst.NS_PHOTOSHOP, "Headline") : "";
    }
if(gp2a.cb5.value){
City =  myXmp.getProperty(XMPConst.NS_PHOTOSHOP, "City") ? myXmp.getProperty(XMPConst.NS_PHOTOSHOP, "City") : "";
    }
if(gp2a.cb6.value){
State = myXmp.getProperty(XMPConst.NS_PHOTOSHOP, "State") ? myXmp.getProperty(XMPConst.NS_PHOTOSHOP, "State") : "";
    }
if(gp2a.cb7.value){
Country =  myXmp.getProperty(XMPConst.NS_PHOTOSHOP, "Country") ? myXmp.getProperty(XMPConst.NS_PHOTOSHOP, "Country") : "";
    }
if(gp2a.cb8.value){
Instructions =  myXmp.getProperty(XMPConst.NS_PHOTOSHOP, "Instructions") ? myXmp.getProperty(XMPConst.NS_PHOTOSHOP, "Instructions") : "";
    }
unloadXMPLib();
}catch(e){alert(e +" Line: "+ e.line);}
        }

gp2b.bu3 = gp2b.add('button',undefined,'Use Metadata');
gp2b.bu3.onClick = function(){
var sels = app.document.selections;
loadXMPLib();
for (var a in sels){ 
var thumb = new Thumbnail(sels[a]); 
   if(thumb.hasMetadata){ 
      var selectedFile = thumb.spec;    
      var myXmpFile = new XMPFile( selectedFile.fsName, XMPConst.UNKNOWN, XMPConst.OPEN_FOR_UPDATE); 
		var myXmp = myXmpFile.getXMP();
        try{
        if(gp2a.cb1.value){
        myXmp.deleteProperty(XMPConst.NS_DC,'subject');
        for(var s in Keywords){
        myXmp.appendArrayItem(XMPConst.NS_DC, "subject", Keywords[s], 0,XMPConst.PROP_IS_ARRAY);
            }
        }
    if(gp2a.cb2.value){
        myXmp.deleteProperty(XMPConst.NS_DC, "description"); 
        myXmp.setLocalizedText( XMPConst.NS_DC, "description", null, "x-default", Description ); 
        }
    if(gp2a.cb3.value){
        myXmp.deleteProperty(XMPConst.NS_DC, "title");
        myXmp.appendArrayItem(XMPConst.NS_DC, "title", Title, 0, XMPConst.ALIAS_TO_ALT_TEXT);
        myXmp.setQualifier(XMPConst.NS_DC, "title[1]", "http://www.w3.org/XML/1998/namespace", "lang", "x-default");
        }
    if(gp2a.cb4.value){
        myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "Headline"); 
        myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "Headline", Headline); 
        }
    if(gp2a.cb5.value){
        myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "City"); 
        myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "City", City); 
        }
    if(gp2a.cb6.value){
        myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "State"); 
        myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "State", State); 
        }
    if(gp2a.cb7.value){
        myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "Country"); 
        myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "Country", Country); 
        }
    if(gp2a.cb8.value){l
        myXmp.deleteProperty(XMPConst.NS_PHOTOSHOP, "Instructions"); 
        myXmp.setProperty(XMPConst.NS_PHOTOSHOP, "Instructions", Instructions); 
        }
    if (myXmpFile.canPutXMP(myXmp)) { 
        myXmpFile.putXMP(myXmp);
         myXmpFile.closeFile(XMPConst.CLOSE_UPDATE_SAFELY); 
         }
    }catch(e){alert(e+" Line : "+e.line);}
    
        } 
    }
    unloadXMPLib();
    }//end put data
	SP.content.layout.layout(true);

function getArrayItems(ns, prop){
var arrItem=[];
try{
var items = myXmp.countArrayItems(ns, prop);
			for(var i = 1;i <= items;i++){
					arrItem.push(myXmp.getArrayItem(ns, prop, i));
                }
return arrItem;
}catch(e){alert(e +" Line: "+ e.line);}
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
    }catch(e){}
}
