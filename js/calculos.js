

//funciones de calculadora en Js


/* si se tiene  una estacion terrena con una antena de 4 mts de diametro alimentado por una potencia de 100 w frecuencia de subida de 
14 GHz, esta radiada al satelite GEO a 36.000 km, el angulo de recepcion es la antena del satelite que es O3db=2° 
La frecuencia del satelite es de 55% y la estacion terrena de 65% en  el satelite la potencia es 20w, frecuencia de trabajo es igual a 12 Ghz que se irradia
con un O3db=4°, la antena de la estacion terrena tiene un diametro de 6 mts con eficiencia de 60% la del satelite es 55% 

Enlace de subida
Calcular la ganancia de la antena


*/

/* Formulas
 * 
 * Free Space Path Loss (FSPL)
 * (4*PI*D*F/C)elevado al cuadrado
 * D: es la distancia del receptor al transmisor (metros)
 * F: intensidad en frecuencia (Hertz)
 * C: velocidad de la luz en el vacio (metros por segundos) */

var calculos_result={};

Object.defineProperty(calculos_result,'fspldecibels', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'pire', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'densidad', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'fsl1', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'gan_anten_reci', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'pot_recept', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'figura', {value: '0', writable:true, enumerable:true, configurable:true});
Object.defineProperty(calculos_result,'c_no', {value: '0', writable:true, enumerable:true, configurable:true});

/*Object.defineProperty(calculos_result, 'temp', {value:'0',
  get: function() { return temp; },
  set: function(newValue) { bValue = newValue; },
  enumerable: true,
  configurable: true
});*/

function fspl_decibels(){
	var pi=Math.PI;
	var velocidad_luz=300000000;
	var distancia = document.getElementById('distmts').value;
	var frecuencia=document.getElementById('frecuehz').value;
	var eficiencia_sat=document.getElementById('eficisate1').value;
	eficiencia_sat=eficiencia_sat/100;
	var valor=eficiencia_sat*Math.pow((pi*distancia*frecuencia/velocidad_luz),2);
	var valordb=10*Math.log10(valor);
	valordb=valordb.toFixed(3);
	document.densidad.gain.value=valordb; //Colocamos el valor de ganancia en el input de densidad
	document.form_pire.gananc.value=valordb;//Colocamos el valor de ganancia en el input de PIRE
	
	valordbf=valordb.toString().concat(' db');
	calculos_result.fspldecibels=valordbf;
	localStorage["gtx"] =valordb;// esto sirve para guardar 
	document.getElementById("gainpx1").innerHTML=calculos_result.fspldecibels;
	//return valor;	
	
}


/* function ganancia_antena(efictierra,diametro,frecuencia_up,frecuencia_up_hz){
//var pi = 3.1416;
var pi=Math.PI;
//var efictierra =efictierra; //eficiencia antena en tierra
frecuencia_up; //frecuencia de subida 
diametro;//metros del diametro
frecuencia_up_hz;//unidad de la frecuencia de subida
var valorFrecuencia= escala_hertz(frecuencia_up,frecuencia_up_hz); //transformo el valor segun la unidad correspondiente
var velocidad_luz=300000000;
var ganancia=efictierra*(Math.pow((pi*diametro*valorFrecuencia/velocidad_luz),2));

var ganancia_total= 10*Math.log10(ganancia);
return ganancia_total;

} */



function potenciatx(pot){

var potenciatotal=10*Math.log10(pot);
return potenciatotal;
}

//Calculadora EIRP
/* http://www.pasternack.com/t-calculator-eirp.aspx */
function getPire(){
	var potenciatx=document.getElementById('potx').value;
	var ganancia=document.getElementById('gananc').value;
	//var losscable=document.getElementById('lossc').value;

	indice=document.form_pire.units.selectedIndex; 
	unidad=document.form_pire.units.options[indice].value;
	var potenciafinal=escala_watts(potenciatx,unidad);
	//alert(potenciafinal);
	potenciafinal1=potenciafinal*1;
	document.densidad.potantena.value=potenciafinal1;
	//losscable1=losscable*1;
	ganancia1=ganancia*1;
	var val_pire=potenciafinal1+ganancia1;
	//-losscable;
	val_pire=val_pire.toFixed(3);
	calculos_result.pire=val_pire;
	localStorage["pire"]=calculos_result.pire;
	document.getElementById("valpire").innerHTML=calculos_result.pire;


//return pire;

}


/* Power Density Calculator
 * http://www.pasternack.com/t-calculator-power-density.aspx
 *     */

function densidadmaxima(){
	var pi=Math.PI;
	var potenciatx=document.getElementById('potantena').value;
	var ganancia=document.getElementById('gain').value;
	var distancia=document.getElementById('distancia').value;
	var val1=4*pi*Math.pow(distancia,2);
	var val2=potenciatx*ganancia;
	var val3=val2/val1;
	var valfin=10*Math.log10(val3);
	//var val_densidad=(potenciatx*ganancia/4*pi*Math.pow(distancia,2));
	val4=valfin.toFixed(3);
	//alert(val3);
	localStorage["density"]=val4;
	//valor3f=val3.toString().concat(' Watts/mts'.concat('2'.sup()));//.concat('2').sup();
	calculos_result.densidad=val4;
	document.getElementById('valdensity').innerHTML=calculos_result.densidad;

}

//Calculo potencia de recepcion
//punto 5 ejercicio 1
/*function potencia_recepcion(variable,distancia,frecuencia){
	var fsl0=variable+20*Math.log(distancia);
	var fsl1=20*Math.log(frecuencia);
	var fsl=fsl0+fsl1;
	
	return fsl;
	
}*/

//Funcion que esta en el punto 5
function fsl_segundo(){
	
	var distancia_kms=document.getElementById('distancia1').value;
		//alert(document.getElementById('units').options[document.getElementById('units').selectedIndex].text);
	//indice=document.formulario.units.selectedIndex; 
	//unidad=document.formulario.units.options[indice].value;
	//var distanciafinal=conversion_longitud(distancia_kms,unidad);
	//alert(distancafinal);
	var frecuencia_mhz=document.getElementById('frecuencia1').value;
	var valor = 20*Math.log10(distancia_kms)+20*Math.log10(frecuencia_mhz)+32.45;
	valor=valor.toFixed(3);
	localStorage["fsl"]=valor;
	valorf=valor.toString().concat(' db');
	calculos_result.fsl1=valorf;
	document.getElementById('vfsl1').innerHTML=calculos_result.fsl1;
//return valor;
	
}

function conversion_longitud(valor,unidad){
	if (unidad=="Kms"){
		result=valor*1;
	}
	if (unidad=="Meters"){
		result=valor*0.001;
	}
	
	if (unidad=="Miles"){
		result=valor*1.60934;
	}
	
	if (unidad=="Feet"){
		result=valor*0.0003048;
	}
	
	return result;
}
//punto 6
function ganancia_antena_receptora(){
	//var valor_pie=3.28*valmts; //valor de metro a pie

	valmts=document.getElementById('distpies').value;
	frecuencia=document.getElementById('frecuemhz').value;
	eficiencia_sat=document.getElementById('eficisate2').value;
	eficiencia_sat=eficiencia_sat/100;
	//alert(eficiencia_sat);
	var gp1=20*Math.log10(valmts)+20*Math.log10(frecuencia)+10*Math.log10(eficiencia_sat)- 49.92;
	
	var gpx=gp1;
	 gpx=gpx.toFixed(3);
	 localStorage["grx"]=gpx;
    gpxf=gpx.toString().concat(' dbi');
    calculos_result.gan_anten_reci=gpxf;
    //localStorage["gain_recep"]=calculos_result.gan_anten_reci;
	document.form_potrecept.ganancia_recept.value=gpx;
	document.form_figura.gain2.value=gpx;
	document.getElementById('gainpx').innerHTML=calculos_result.gan_anten_reci;
//return gpx;	 
}



//punto 7
function potencia_recepcion(){
	//var psl=pire+(-fsl)+gpx;
	
	fsl=document.getElementById('perdida').value;
	gpx=document.getElementById('ganancia_recept').value;
	pire=document.getElementById('pire').value;
	pire1=pire*1;
	fsl1=fsl*1;
	gpx1=gpx*1;
	var psl=pire1+(-fsl1)+gpx1;
	psl1=psl.toFixed(3);
	calculos_result.pot_recept=psl1;
	localStorage["rsl"]=psl1;
	pslstr=psl1.toString().concat(' db');
	document.getElementById('gainrecept').innerHTML=pslstr;
	//return psl;
}
function pasar(){
    window.location="up-two.html";
	//document.form_potrecept.pire.value=localStorage["pire"];
	//document.form_potrecept.perdida.value=localStorage["fsl"];
	//document.getElementById('pire').value=localStorage["pire"];
	//document.getElementById('perdida').value=localStorage["fsl"];
	//document.getElementById('ganancia_recept').value=localStorage["gain_recep"];
}
function carga(){
	document.form_potrecept.pire.value=localStorage["pire"];
	document.form_potrecept.perdida.value=localStorage["fsl"];
	document.form_cnr.pirecnr.value=localStorage["pire"];
	document.form_cnr.perdidacnr.value=localStorage["fsl"];
}

function cargadown(){
	document.formpotreceptdown.piredown.value=localStorage["piredown"];
	document.formpotreceptdown.perdidadown.value=localStorage["fsldown"];
	document.formcnrdown.pirecnrdown.value=localStorage["piredown"];
	document.formcnrdown.perdidacnrdown.value=localStorage["fsldown"];
}


//Aqui cargamos los datos en la tabla1
function carga_resultados_up(){
	document.getElementById('gtxresult').innerHTML=localStorage["gtx"];
	document.getElementById('pireresult').innerHTML=localStorage["pire"];
	document.getElementById('densidadresult').innerHTML=localStorage["density"];
document.getElementById('fslresult').innerHTML=localStorage["fsl"];
document.getElementById('grxresult').innerHTML= localStorage["grx"];
document.getElementById('rslresult').innerHTML= localStorage["rsl"];
document.getElementById('gtresult').innerHTML= localStorage["gt"];
document.getElementById('cnresult').innerHTML= localStorage["cn"];

	
}

function cargaResultadosDown(){
	document.getElementById('gtxresultdown').innerHTML=localStorage["gtxdown"];
	document.getElementById('pireresultdown').innerHTML=localStorage["piredown"];
	document.getElementById('densidadresultdown').innerHTML=localStorage["densitydown"];
document.getElementById('fslresultdown').innerHTML=localStorage["fsldown"];
document.getElementById('grxresultdown').innerHTML= localStorage["grxdown"];
document.getElementById('rslresultdown').innerHTML= localStorage["rsldown"];
document.getElementById('gtresultdown').innerHTML= localStorage["gtdown"];
document.getElementById('cnresultdown').innerHTML= localStorage["cndown"];

	
}


//punto 8 
//calculamos figura merito
function calculo_figura(){
	//temp = system noise temperature	
	gprec=document.getElementById('gain2').value;
	temperatura=document.getElementById('temp').value;
	var calc_figura=gprec-10*Math.log10(temperatura);
	calc_figura1=calc_figura.toFixed(3);
	figurastr=calc_figura1.toString().concat(' db/k');
	localStorage["gt"]=calc_figura1;
	document.form_cnr.figuracnr.value=calc_figura1;
	document.getElementById('figuramerito').innerHTML=figurastr;
	//return calc_figura;
}

//punto 9
//C/NO

function last(){
	var k=Math.pow(10,-23);
	pirecnr=document.getElementById('pirecnr').value;
	fslcnr=document.getElementById('perdidacnr').value;
	figuracnr=document.getElementById('figuracnr').value;
var boltzman=1.3806*k;
pirecnr1=pirecnr*1;
fslcnr1=fslcnr*1;
figuracnr1=figuracnr*1;
boltzman1=boltzman*1;

 var cnr=pirecnr1-fslcnr1+figuracnr1-boltzman1;
 cnrfin=cnr.toFixed(3);
 localStorage["cn"]=cnrfin;
 cnrstr=cnrfin.toString().concat(' db/Hz');
 document.getElementById('valcnr').innerHTML=cnrstr;
	
}




function escala_hertz(valor,unidad){
	if(unidad=="hertz"){
			var valortotal=valor*1;
		}

	if (unidad=="kilohertz"){

    	var valortotal=valor*1000;
		}

	if (unidad=="megahertz"){

    	var valortotal=valor*1000000;
		}
		
if (unidad=="gigahertz"){

    var valortotal=valor*1000000000;
		}


	if (unidad=="terahertz"){

    	var valortotal=valor*1000000000000;
		}

		if (unidad=="petahertz"){

    var valortotal=valor*1000000000000000;
			}

return valortotal;
}


function escala_watts(valor, unidad){
	if(unidad=="Watts"){
		var valortotal=valor*1;
	}

	if(unidad=="Miliwatts"){
		var valortotal=valor*1000;
	}	


	if(unidad=="dBm"){
		var valortotal=10*Math.log10(1000*valor);
	}

	if(unidad=="dbw"){
		var valortotal=10*Math.log10(valor);
	}

	return valortotal;
}

function conversor(valor){
	valorstr=valor.toString().replace('.',',');
	return valorstr;
}

function gananciaAntenaBajando(){
	var pi=Math.PI;
	var valorsatelital=document.getElementById('satelitedown').value;
	var satelitedown=valorsatelital/100;
	var anguloreceptor=document.getElementById('anguloantena').value;
	var gain=Math.pow(70*pi/anguloreceptor,2);
	gainres=gain*satelitedown;
	gainfinal1=10*Math.log10(gainres);
	gainfinal=gainfinal1.toFixed(3);
	document.formpiredown.ganancdown.value=gainfinal;
	document.densidaddown.gaindown.value=gainfinal;
	gainfinalstr=gainfinal.toString().concat(' dbi');
	localStorage["gtxdown"] =gainfinal;// esto sirve para guardar 
	document.getElementById('antenareceptora').innerHTML=gainfinalstr;
	
}

function getPireDown(){
	var potenciatx=document.getElementById('potxdown').value;
	var ganancia=document.getElementById('ganancdown').value;

	indice=document.formpiredown.units.selectedIndex; 
	unidad=document.formpiredown.units.options[indice].value;
	var potenciafinal=escala_watts(potenciatx,unidad);
    //alert(potenciafinal);
   document.densidaddown.potantenadown.value=potenciafinal.toFixed(3);
	potenciafinal1=potenciafinal*1;
	//losscable1=losscable*1;
	ganancia1=ganancia*1;
	var val_pire=potenciafinal1+ganancia1;
	//-losscable;
	val_pire=val_pire.toFixed(3);
	localStorage["piredown"]=val_pire;
	document.getElementById("valpiredown").innerHTML=val_pire;


//return pire;

}

function densidadMaximaDown(){
	var pi=Math.PI;
	var potenciatx=document.getElementById('potantenadown').value;
	var ganancia=document.getElementById('gaindown').value;
	var distancia=document.getElementById('distanciadown').value;
	var val1=4*pi*Math.pow(distancia,2);
	var val2=potenciatx*ganancia;
	var val3=val2/val1;
	var valfin=10*Math.log10(val3);
	//var val_densidad=(potenciatx*ganancia/4*pi*Math.pow(distancia,2));
	val4=valfin.toFixed(3);
	//alert(val3);
	localStorage["densitydown"]=val4;
	//valor3f=val3.toString().concat(' Watts/mts'.concat('2'.sup()));//.concat('2').sup();
	//calculos_result.densidad=val4;
	document.getElementById('valdensitydown').innerHTML=val4;

}

function fslDown(){
	
	var distancia_kms=document.getElementById('distancia1down').value;
		//alert(document.getElementById('units').options[document.getElementById('units').selectedIndex].text);
	//indice=document.formulario.units.selectedIndex; 
	//unidad=document.formulario.units.options[indice].value;
	//var distanciafinal=conversion_longitud(distancia_kms,unidad);
	//alert(distancafinal);
	var frecuencia_mhz=document.getElementById('frecuencia1down').value;
	var valor = 20*Math.log10(distancia_kms)+20*Math.log10(frecuencia_mhz)+32.45;
	valor=valor.toFixed(3);
	localStorage["fsldown"]=valor;
	valorf=valor.toString().concat(' db');
	//calculos_result.fsl1=valorf;
	document.getElementById('vfsl1down').innerHTML=valorf;
//return valor;
	
}

function gananciaAntenaReceptoraDown(){
	
	valmts=document.getElementById('distpiesdown').value;
	frecuencia=document.getElementById('frecuemhzdown').value;
	eficiencia_sat=document.getElementById('eficisate2down').value;
	eficiencia_sat=eficiencia_sat/100;
	//alert(eficiencia_sat);
	var gp1=20*Math.log10(valmts)+20*Math.log10(frecuencia)+10*Math.log10(eficiencia_sat)- 49.92;
	
	var gpx=gp1;
	 gpx=gpx.toFixed(3);
	 localStorage["grxdown"]=gpx;
    gpxf=gpx.toString().concat(' dbi');
    //calculos_result.gan_anten_reci=gpxf;
    //localStorage["gain_recep"]=calculos_result.gan_anten_reci;
	document.formpotreceptdown.gananciareceptdown.value=gpx;
	document.formfiguradown.gain2down.value=gpx;
	document.getElementById('gainpxdown').innerHTML=gpxf;
}

function potenciaRecepcionDown(){
	//var psl=pire+(-fsl)+gpx;
	
	fsl=document.getElementById('perdidadown').value;
	gpx=document.getElementById('gananciareceptdown').value;
	pire=document.getElementById('piredown').value;
	pire1=pire*1;
	fsl1=fsl*1;
	gpx1=gpx*1;
	var psl=pire1+(-fsl1)+gpx1;
	psl1=psl.toFixed(3);
	calculos_result.pot_recept=psl1;
	localStorage["rsldown"]=psl1;
	pslstr=psl1.toString().concat(' db');
	document.getElementById('gainreceptdown').innerHTML=pslstr;
	//return psl;
}

function calculoFiguraDown(){
	//temp = system noise temperature	
	gprec=document.getElementById('gain2down').value;
	temperatura=document.getElementById('tempdown').value;
	var calc_figura=gprec-10*Math.log10(temperatura);
	calc_figura1=calc_figura.toFixed(3);
	figurastr=calc_figura1.toString().concat(' db/k');
	localStorage["gtdown"]=calc_figura1;
	document.formcnrdown.figuracnrdown.value=calc_figura1;
	document.getElementById('figurameritodown').innerHTML=figurastr;
	//return calc_figura;
}

function lastDown(){
	var k=Math.pow(10,-23);
	pirecnr=document.getElementById('pirecnrdown').value;
	fslcnr=document.getElementById('perdidacnrdown').value;
	figuracnr=document.getElementById('figuracnrdown').value;
var boltzman=1.3806*k;
pirecnr1=pirecnr*1;
fslcnr1=fslcnr*1;
figuracnr1=figuracnr*1;
boltzmanwatts=10*Math.log10(boltzman);
boltzman1=boltzmanwatts*1;
 var cnr=pirecnr1-fslcnr1+figuracnr1-boltzman1;
 cnrfin=cnr.toFixed(3);
 localStorage["cndown"]=cnrfin;
 cnrstr=cnrfin.toString().concat(' db');
 document.getElementById('valcnrdown').innerHTML=cnrstr;
	
}

