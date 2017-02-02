KeyWordCount = function(event){  
   if ((event.type == 'hover') && (event.object instanceof Thumbnail)) {
           var Thumb  = new Thumbnail(event.object.spec);
            var md = Thumb.synchronousMetadata;
                md.namespace = "http://ns.adobe.com/photoshop/1.0/"; 
                if(md.Keywords.length >0){
            Thumb.core.itemContent.tooltip = "Keyword Count = " +md.Keywords.length;   
            }
      return { handled:false};
  }
}
app.eventHandlers.push( { handler: KeyWordCount } );
var prefs = app.preferences;
try{
if(!prefs.ShowTooltips) prefs.ShowTooltips=true;
}catch(e){}