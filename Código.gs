var url = "https://docs.google.com/spreadsheets/d/1K5LfaNLdE9dKRm8qlKRkt4OFptazPm-pqQxQRTMoSLM/edit#gid=0";
function doGet(e){
  if(e.parameters.v == "form"){
    return carregaForm();
  }else{
    return HtmlService.createTemplateFromFile("home").evaluate();
  }
  

}

function carregaForm(){
    
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("OPCOES");
  var list = ws.getRange(1,1,ws.getRange("A1").getDataRegion().getLastRow(),1).getValues();
  var htmlListArray = list.map(function(r){ return '<option>' + r[0] + '<option>'; }).join('');

  var tmp = HtmlService.createTemplateFromFile("index");
  tmp.list = htmlListArray;
  return tmp.evaluate();

}

function usarClique(infoUsuario){
  
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("DADOS");

  ws.appendRow([new Date(), infoUsuario.polo, infoUsuario.vinculo, infoUsuario.funcao, infoUsuario.user, infoUsuario.cpf, infoUsuario.email, infoUsuario.sistemas, infoUsuario.tel]);

  //Logger.log(name + "Você clicou no botão");
}
function autoComplete(){
  var ss = SpreadsheetApp.openByUrl(url);
  var ws = ss.getSheetByName("OPCOES");
  var data = ws.getRange(1,3).getDataRegion().getValues();

  var options = {};
  data.forEach(function(v){
    options[v[0]] = null;
  });
}
function include(filename){
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}
