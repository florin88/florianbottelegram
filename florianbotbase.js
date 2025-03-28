// configurazione del bot
var apiToken = "YOU_TELEGRAM_TOKEN"; (il token è quello offerto da @BotFather)  
var appUrl   = "YOUR_APPSCRIPT_URL"; (questo link è quello offerto dalla piattaforma Google Apps Script quando viene cliccato Esegui il deployment)
var apiUrl   = "https://api.telegram.org/bot"+apiToken;
var command  = {
  "/start": "Benvenuto/a nel mio bot",
  "ciao": "ciao, scrivimi come posso aiutarti!",
  "come ti chiami?": "il mio nome è primo bot"
}

// settiamo il webhook
function setWebhook(){
  var url = apiUrl + "/setwebhook?url="+appUrl;
  var res = UrlFetchApp.fetch(url).getContentText();
  Logger.log(res);
}

// settiamo il handle webhook
function doPost(e){
  var webhookData = JSON.parse(e.postData.contents);
  var from = webhookData.message.from.id;
  var text = webhookData.message.text;

  if(typeof command[text] == 'undefined'){
    var sendText = encodeURIComponent("command not found");
  }else{
    var sendText = encodeURIComponent(command[text]);
  }

  var url  = apiUrl+"/sendmessage?parse_mode=HTML&chat_id="+from+"&text="+sendText;
  var opts = {"muteHttpExceptions": true}
  UrlFetchApp.fetch(url, opts).getContentText();
}


function doGet(e){
  return ContentService.createTextOutput("Method GET not allowed");
}
