var nameDivisas="";
var divisas="";
var actualizacionDatos="La ultima Actualizacion de datos fue: ";
function perfomGetRequest3(){

    axios.get('https://kynlhdk1q5.execute-api.us-east-1.amazonaws.com/beta')
        .then(function (response) {
			actualizarDatos();
            divisas=JSON.parse(response.data);
        })
        .catch(function (error) {
            resultElement.innerHTML = genereateErrorHTML(error);
        })
}
var ini= function perfomGetRequest1() {
	perfomGetRequest3();
    axios.get('https://h44w9det1b.execute-api.us-east-1.amazonaws.com/beta')
        .then(function (response) {
        	genereateSuccesHTML(response,"1");
			genereateSuccesHTML(response,'2');
        })
        .catch(function (error) {
            //genereateSuccesHTML(response,'1');
        })
}


function genereateSuccesHTML(response,index) {
	var solo='getResult'+index;
    var resultElement = document.getElementById(solo);
	var S = '<select id="inputState'+index+'" class="form-control" onChange="ShowSelected()">';
    nameDivisas = JSON.parse(response.data);
    for (var key in nameDivisas) {
	   S+= '<option>'+key +" "+ nameDivisas[key]+'</option>';
	}
    S+='</select>'
    resultElement.innerHTML = S;
}
function actualizarDatos(){
	var f=new Date();
	actualizacionDatos="La ultima Actualizacion de datos fue: ";
	actualizacionDatos+=f.getDate()+"/"+(f.getMonth()+1)+"/"+f.getFullYear()+ " A las: " +f.getHours()+":"+f.getMinutes()+":"+f.getSeconds(); 
	var resultElement = document.getElementById("getResult7");
	var retornar='<label for="inputState">'+actualizacionDatos+'</label>';
	resultElement.innerHTML =retornar;
}
function ShowSelected()
{
    /* Para obtener el texto */
    var combo = document.getElementById("inputState1");
    var selected = combo.options[combo.selectedIndex].text;
    var res = "USD"+selected.split(" ")[0];
    var combo2 = document.getElementById("inputState2");
    var selected2 = combo2.options[combo2.selectedIndex].text;
    var res2 = "USD"+selected2.split(" ")[0];
	var resultElement = document.getElementById('getResult4');
    var retornar='<label for="inputState">El Valor de cambio actual de 1 '+selected.split(" ")[0]+ ' a '+ selected2.split(" ")[0]+' es: '+(divisas[res2]/divisas[res])+' '+selected2.split(" ")[0]+'.</label>';
    resultElement.innerHTML =retornar;
}
function ShowSelected2()
{   
    var combo = document.getElementById("inputState1");
    var selected = combo.options[combo.selectedIndex].text;
    var res = "USD"+selected.split(" ")[0];
    var combo2 = document.getElementById("inputState2");
    var selected2 = combo2.options[combo2.selectedIndex].text;
    var res2 = "USD"+selected2.split(" ")[0];
    var valor=document.getElementById("valor").value;
	var resultElement = document.getElementById('getResult5');
    var retornar='<label for="inputState">El Valor de cambio actual de '+valor+' '+selected.split(" ")[0]+ ' a '+ selected2.split(" ")[0]+' es: '+valor*(divisas[res2]/divisas[res])+' '+selected2.split(" ")[0]+'.</label>';
	resultElement.innerHTML =retornar;
}
function genereateErrorHTML(error) {

    return '<h4>Result:</h4>' +
        '<h5>Message: </h5>' +
        '<pre>' + error.message + '</pre>' +
        '<h5>Status:</h5>' +
        '<pre>' + error.status + ' ' + error.statusText + '</pre>' +
        '<h5>Headers:</h5>' +
        '<pre>' + JSON.stringify(error.headers, null, '\t') + '</pre>' +
        '<h5>Body:</h5>' +
        '<pre>' + JSON.stringify(error.data, null, '\t') + '</pre>'

}
