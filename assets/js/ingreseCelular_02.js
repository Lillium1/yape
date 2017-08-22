$(document).ready(function(){

	// error variables
	var numberPhoneError = true;

	/*----------* NUMERO CELULAR *----------*/

	// comienza el checkbox deshabilitado
	$('input[type="checkbox"]').attr('disabled','disabled');
	$("#ingrese-celular-num").blur(function() {
		// ingrese solo numeros
		if (!(/^\d{9}$/.test($("#ingrese-celular-num").val()))) {
			$("#numberPhoneError").remove();
			$(this).css("border-color", "#f64552");
			$("#form-ingrese-celular").append("<span id='numberPhoneError'>* Ingrese solo 9 números</span>");
			$(this).val("");
			numberPhoneError = true;
		}

		else {
			$(this).css("border-color", "#00c3a3");
			$("#numberPhoneError").remove();
			$('input[type="checkbox"]').removeAttr('disabled');
			numberPhoneError = false;
		}
	});
	
	/*----------* VALIDAR CHECKBOX *----------*/

	// comienza el boton continuar deshabilitado
	$('button[type="submit"]').attr('disabled','disabled');
	$("#ingrese-celular-checkbox").click(function() {  
		if($("#ingrese-celular-checkbox").is(':checked')) {  
			$('button[type="submit"]').removeAttr('disabled');  
		} else {  
			$('button[type="submit"]').attr('disabled','disabled');
			$("#numberPhoneError2").remove();
			$("#form-ingrese-celular").append("<span id='numberPhoneError2'>* Debe aceptar los términos y condiciones</span>");
		}  
	});

	// si los casos son falsos/incorrectos vuelve a que se cumplan las condiciones a true
	$(".form-ingrese-celular-validacion").submit(function(event) {
		if(numberPhoneError === true){
		 	event.preventDefault(); // prevent sending 
		 	$("#ingrese-celular-num").blur();
		}
	});
});