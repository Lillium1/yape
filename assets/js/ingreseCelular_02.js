$(document).ready(function(){

	// error variables
	var numberPhoneError = true,
		EmailError = true;


	/*----------* NUMERO CELULAR *----------*/
	$("#ingrese-celular-num").blur(function() {
		if($(this).val()==''){
			$(this).css("border-color", "#f64552");
			$("#form-ingrese-celular").append("<span id='numberPhoneError'>* Ingrese número celular</span>");
			numberPhoneError = true;
		}

		else if (!(/^\d{9}$/.test($("#ingrese-celular-num").val()))) {
			$(this).css("border-color", "#f64552");
			$("#form-ingrese-celular").append("<span id='numberPhoneError2'>* Ingrese solo números</span>");
			$(this).val("");
			numberPhoneError = true;
		}

		else {
			$(this).css("border-color", "#00c3a3");
			$("#numberPhoneError").hide();
			$("#numberPhoneError2").hide();
			UserError = false;
		}
	});

	/*----------* VALIDAR CHECKBOX *----------*/
	$('button[type="submit"]').attr('disabled','disabled');
	$("#ingrese-celular-checkbox").click(function() {  
        if($("#ingrese-celular-checkbox").is(':checked')) {  
            $('button[type="submit"]').removeAttr('disabled');  
        } else {  
        	$('button[type="submit"]').attr('disabled','disabled');
            $("#form-ingrese-celular").append("<span id='numberPhoneError3'>* Debe aceptar los términos y condiciones</span>");
        }  
    });

	$(".form-ingrese-celular-validacion").submit(function(event) {
		if(numberPhoneError === true){
		 	event.preventDefault(); // prevent sending 
		 	$("#ingrese-celular-num").blur();
	 	}
	});
});