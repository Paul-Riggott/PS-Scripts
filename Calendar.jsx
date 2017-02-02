//Compliments of Paul R
#target photoshop
year = 0;
selectedMonth = 0;
if(documents.length < 1){
		alert("You must have a document open to use this script!");
	}else{
			main();
		}
function main(){
var dlg =
"dialog{text:'Script Interface',bounds:[100,100,470,220],"+
"panel0:Panel{bounds:[10,10,360,110] , text:'' ,properties:{borderStyle:'etched',su1PanelCoordinates:true},"+
"statictext0:StaticText{bounds:[120,10,240,30] , text:'Calendar Maker' ,properties:{scrolling:undefined,multiline:undefined}},"+
"statictext1:StaticText{bounds:[10,40,80,60] , text:'Enter Year' ,properties:{scrolling:undefined,multiline:undefined}},"+
"year:EditText{bounds:[90,40,140,60] , text:'2000' ,properties:{multiline:false,noecho:false,readonly:false}},"+
"statictext2:StaticText{bounds:[160,40,210,60] , text:'Month' ,properties:{scrolling:undefined,multiline:undefined}},"+
"month:DropDownList{bounds:[210,40,340,60]},"+
"button0:Button{bounds:[10,70,160,91] , text:'Cancel' },"+
"button1:Button{bounds:[190,70,340,91] , text:'Ok' }}}";
var win = new Window(dlg,"Pauls Calendar Maker");

win.center();

Months = new Array();
Months[0] = "January ";
Months[1] = "February ";
Months[2] = "March ";
Months[3] = "April ";
Months[4] = "May ";
Months[5] = "June ";
Months[6] = "July ";
Months[7] = "August ";
Months[8] = "September ";
Months[9] = "October ";
Months[10] = "November ";
Months[11] = "December ";

	for (i in Months) {
	win.panel0.month.add('item',Months[i])
  }
var toDay=new Date();
selectedMonth = toDay.getMonth();
var thisYear = toDay.getYear() + 1900;
win.panel0.year.text = thisYear;
win.panel0.month.selection=toDay.getMonth();
win.panel0.month.onChange = function(){
selectedMonth = parseInt(this.selection);
	}
var done = false; 
    while (!done) { 
      var x = win.show(); 
      if (x == 0 || x == 2) {
        win.canceled = true;
        done = true; 
      } else if (x == 1) { 
        done = true; 
       var result = validate();
        if(result != true) {
        	alert(result);
        	return;
        }else
        {
        calendar(parseInt(win.panel0.year.text),selectedMonth);      
        }
      } 
   } 
function validate(){
	if (isNaN(win.panel0.year.text)) return "Year MUST be a number"; 
	if (win.panel0.year.text.length != 4) return "Year must be FOUR numbers";
	if (parseInt(win.panel0.year.text) < 1800 || parseInt(win.panel0.year.text) > 3000) return "Year must be between 1800 and 3000";
		return true;
	}
}

function calendar(year,aMonth){
var myDate=new Date(year,aMonth,1);
var offset = myDate.getDay();
var days = getDaysInMonth(aMonth+1,year)
var month = Months[aMonth] + " " + year +"\r";
if(winMac()){
month += "Su\tMo\tTu\tWe\tTh\tFr\t\tSa\r"
month += "--------------------------------------\r";
}else{
month += "Su\tMo\tTu\tWe\tTh\tFr\tSa\r"
month += "------------------------------------\r";
	}
month += noOfDays(offset,days);
doc = app.activeDocument;
var startRulerUnits = preferences.rulerUnits
app.preferences.rulerUnits = Units.PIXELS
var res =doc.resolution;
if (doc.resolution != 72){
	 doc.resizeImage(undefined, undefined, 72, ResampleMethod.NONE);
	}
var fontSize = 40;
var fontName = "Helvetica"; 
 var textColor = new SolidColor(); 
        textColor.rgb.red  = 0; 
        textColor.rgb.green =0; 
        textColor.rgb.blue = 0; 
		
var newTextLayer = doc.artLayers.add(); 
newTextLayer.kind = LayerKind.TEXT; 
newTextLayer.textItem.kind = TextType.POINTTEXT
newTextLayer.textItem.color = textColor; 
newTextLayer.textItem.font = fontName;
newTextLayer.textItem.size = fontSize; 
newTextLayer.textItem.contents =month; 
newTextLayer.textItem.kind = TextType.PARAGRAPHTEXT; 
newTextLayer.textItem.height = 450; 	
newTextLayer.textItem.width = 490;
newTextLayer.textItem.position = Array(20, 20); 
newTextLayer.textItem.justification=Justification.LEFTJUSTIFIED; 
if(doc.resolution != res){
doc.resizeImage(undefined, undefined, res, ResampleMethod.NONE);
}
preferences.rulerUnits = startRulerUnits;
}

 function noOfDays(offset,days){
var month ="";
for(var a=0;a<offset;a++){
		month += "\t\t";
	}
month += "1";
for (a= 1;a<days;a++){
		if(a<10) {
			if(((offset +a) %7)){
				month += "\t\t";
				}else{
					month += "\r";
					}
			}else{
					if(((offset +a) %7)) {
						month += "\t";
						}else{
							month += "\r";
					}
				}
			month += (a+1);
	}
	return month;
}

function getDaysInMonth(month,year)  {
var days;
if (month==1 || month==3 || month==5 || month==7 || month==8 || month==10 || month==12)  days=31;
	else if (month==4 || month==6 || month==9 || month==11) days=30;
		else if (month==2)  {
if (isLeapYear(year)) { days=29; }
	else { days=28; }
		}
	return (days);
}
function isLeapYear (Year) {
if (((Year % 4)==0) && ((Year % 100)!=0) || ((Year % 400)==0)) {
	return (true);
		} else { return (false); }
}
function winMac(){
//return true if windows
	if($.os.match(/windows/i)) return true;
else return false;
}