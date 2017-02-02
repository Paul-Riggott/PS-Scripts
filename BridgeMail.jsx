#target bridge   
   if( BridgeTalk.appName == "bridge" ) {  
bridgeMail = new MenuElement("command", "Mail Selected Items", "at the end of Thumbnail");
}
bridgeMail.onSelect = function () { 
	  mainBridgeMail();
	  }
function mainBridgeMail(){
AB= new File("~/AdressBook.txt");
if(!AB.exists) updateAddessBook();
var items = app.document.selections; 
var dlg =
"dialog{text:'Script Interface',bounds:[100,100,760,530],"+
"panel0:Panel{bounds:[10,10,650,420] , text:'' ,properties:{borderStyle:'etched',su1PanelCoordinates:false},"+
"mes:StaticText{bounds:[10,120,190,140] , text:'Message Header' ,properties:{scrolling:undefined,multiline:undefined}},"+
"messHeader:EditText{bounds:[230,120,620,140] , text:'As requested..' ,properties:{multiline:false,noecho:false,readonly:false}},"+
"mess:StaticText{bounds:[10,170,250,190] , text:'Message      -       For a new line use Ctrl\/J' ,properties:{scrolling:undefined,multiline:undefined}},"+
"address:Button{bounds:[255,170,390,190] , text:'Update AddressBook' },"+
"attachments:StaticText{bounds:[410,170,600,195] , text:'Attachments' ,properties:{scrolling:undefined,multiline:undefined}},"+
"messageText:EditText{bounds:[10,200,620,370] , text:'' ,properties:{multiline:true,noecho:false,readonly:false}},"+
"mail:StaticText{bounds:[10,80,111,100] , text:'Mail To:' ,properties:{scrolling:undefined,multiline:undefined}},"+
"mailTo:EditText{bounds:[230,80,620,100] , text:'' ,properties:{multiline:false,noecho:false,readonly:false}},"+
"addBook:StaticText{bounds:[10,50,100,70] , text:'Address Book:' ,properties:{scrolling:undefined,multiline:undefined}},"+
"adBook:DropDownList{bounds:[230,50,620,70]},"+
"edit:Button{bounds:[101,50,228,70] , text:'Edit Adresss Book' },"+
"button0:Button{bounds:[10,380,290,401] , text:'Send Mail' },"+
"button1:Button{bounds:[330,380,610,401] , text:'Cancel' },"+
"title:StaticText{bounds:[250,10,580,40] , text:'BridgeMail' ,properties:{scrolling:undefined,multiline:undefined}}}};";

var win = new Window(dlg,"BridgeMail");
if(app.version.substr(0,app.version.indexOf('.'))>1){
win.panel0.title.graphics.font = ScriptUI.newFont("Times","BOLDITALIC",26);
win.panel0.attachments.graphics.font = ScriptUI.newFont("Times","BOLD",14);
g = win.graphics;
b=win.panel0.title.graphics;
a=win.panel0.attachments.graphics;
var myBrush = g.newBrush(g.BrushType.SOLID_COLOR, [0.99, 0.99, 0.99, 1]);
g.backgroundColor = myBrush;
var myPen =b.newPen (g.PenType.SOLID_COLOR, [0.00, 0.00, 0.99, 1],lineWidth=1);
var myPen2 =b.newPen (g.PenType.SOLID_COLOR, [0.99, 0.00, 0.00, 1],lineWidth=1);
var myPen3 =b.newPen (g.PenType.SOLID_COLOR, [0.00, 0.00, 0.00, 1],lineWidth=1);
g.foregroundColor = myPen;
b.foregroundColor = myPen2;
a.foregroundColor = myPen3;
}
var addressBookArray = new Array();
AB.open("r");
while(!AB.eof){
var mailAD = AB.readln();
if (mailAD.length >3) addressBookArray.push(mailAD); 
}
AB.close();	
addressBookArray = addressBookArray.sort();
	for (i in addressBookArray) {
	win.panel0.adBook.add('item',addressBookArray[i]);
  }
win.panel0.adBook.selection=0;
win.panel0.mailTo.text = addressBookArray[0];
win.panel0.adBook.onChange = function(){
	win.panel0.mailTo.text = this.selection.text;
	}
win.panel0.attachments.text = items.length + " attachment(s) will be sent.";
win.panel0.edit.onClick = function() {
	AB.execute();
}
win.panel0.address.onClick=function(){
    updateAddessBook();
AB.open("r");
while(!AB.eof){
var mailAD = AB.readln();
if (mailAD.length >3) addressBookArray.push(mailAD); 
}
AB.close();	
win.panel0.adBook.removeAll();
addressBookArray = addressBookArray.sort();
	for (i in addressBookArray) {
	win.panel0.adBook.add('item',addressBookArray[i]);
  }
win.panel0.adBook.selection=0;
win.panel0.mailTo.text = addressBookArray[0];
}
win.panel0.button0.onClick = function() {
var mess = validate();
if(mess != true){
	alert(mess);
	}else{
this.parent.parent.close(1);
	}
}

win.center();
var done = false; 
    while (!done) { 
      var x = win.show(); 
      if (x == 0 || x == 2) {
        win.canceled = true;
        done = true; 
      } else if (x == 1) { 
        done = true;  
			processMail();
      }
} 

function validate(){
	if(win.panel0.mailTo.text == '') return "No Email Address entered";
	if(win.panel0.messageText.text == '') return "No message entered";
	return true;
}
function processMail(){
var BM = new File("~/BridgeSendMail.vbs");
if(BM.exists) BM.remove();
BM.open("e");
BM.writeln("Dim ToAddress");
BM.writeln("Dim MessageSubject");
BM.writeln("Dim MessageBody");
BM.writeln("Dim myAttachments");
BM.writeln("Dim ol, ns, newMail");
BM.writeln("ToAddress = \"" + win.panel0.mailTo.text +"\"");
BM.writeln("MessageSubject = \""+ win.panel0.messHeader.text + "\"");
var bulkText = win.panel0.messageText.text;
bulkText = bulkText.replace(/\n/g, "\" & vbCrLf & \"");
BM.writeln("MessageBody = \"" + bulkText + "\"");
BM.writeln("Set ol = WScript.CreateObject(\"Outlook.Application\")");
BM.writeln("Set ns = ol.getNamespace(\"MAPI\")");
BM.writeln("ns.logon \"\",\"\",true,false");
BM.writeln("Set newMail = ol.CreateItem(olMailItem)");
BM.writeln("newMail.Subject = MessageSubject");
BM.writeln("newMail.Body = MessageBody & vbCrLf");
for(a=0;a<items.length;a++){
BM.writeln("newMail.Attachments.Add \"" + items[a].path + "\"");
}
BM.writeln("Set myRecipient = ns.CreateRecipient(ToAddress)");
BM.writeln("myRecipient.Resolve");
BM.writeln("If Not myRecipient.Resolved Then");
BM.writeln("MsgBox \"unknown recipient\"");
BM.writeln("Else");
BM.writeln("newMail.Recipients.Add(myRecipient)");
BM.writeln("newMail.Send");
BM.writeln("End If");
BM.writeln("Set ol = Nothing");
BM.writeln(" ");
BM.close();

BM.execute();
}
function updateAddessBook(){
var UAB = new File("~/updateAddressBook.vbs");
UAB.open('w');
UAB.writeln('On Error Resume Next'); 
UAB.writeln('Set wshShell = WScript.CreateObject("WScript.Shell")');
UAB.writeln('Set wshSysEnv = wshShell.Environment("PROCESS")');
UAB.writeln('sMyFile = "c:" & wshSysEnv("HOMEPATH") & "\\AdressBook.txt"');
UAB.writeln('Dim objFileSystem, objOutputFile');
UAB.writeln('Dim strOutputFile');
UAB.writeln('Set objFileSystem = CreateObject("Scripting.fileSystemObject")');
UAB.writeln('Set objOutputFile = objFileSystem.CreateTextFile(sMyFile, TRUE)');
UAB.writeln('Const olFolderContacts = 10 ');
UAB.writeln('Set objOutlook = CreateObject("Outlook.Application") ');
UAB.writeln('Set objNamespace = objOutlook.GetNamespace("MAPI") ');
UAB.writeln('Set colContacts = objNamespace.GetDefaultFolder(olFolderContacts).Items ');
UAB.writeln('For Each objContact In colContacts ');
UAB.writeln('objOutputFile.WriteLine( objContact.Email1Address )');
UAB.writeln('Next ');
UAB.close();
UAB.execute();
$.sleep(500);
//UAB.remove();
    }
}//end main



