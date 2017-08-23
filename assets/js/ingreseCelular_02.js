$(document).ready(function(){
	// error variables
	var numberPhoneError = true;

	/*----------* NUMERO CELULAR *----------*/

	// comienza el checkbox deshabilitado
	$('input[type="checkbox"]').attr('disabled','disabled');
	$("#ingrese-celular-num").blur(function() {
		// ingrese solo numeros
		if (!(/^\d{3}$/.test($("#ingrese-celular-num").val()))) {
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
	/*$(".form-ingrese-celular-validacion").submit(function(event) {
		if(numberPhoneError === true){
		 	event.preventDefault(); // prevent sending 
		 	$("#ingrese-celular-num").blur();
		}
	});*/
	(function validarCodigo(){
	    $('.mensaje').last().append('<div class="alert alert-info"><a href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>' +
						  '<strong>Código de validación: </strong>' + localStorage.codigo +
							'</div>');
				
			$("#ingrese-codigo").click(function(){
				if ($('#codigo').val() == localStorage.codigo) {
					alert("pasa");
				}else{
					alert("codigo no valido")
				}
			})
	})()

	function registrarNumero(){
			$.ajax({
				url: '/api/registerNumber',
				type: 'POST',
				data: {'terms' : 'true', 'phone' : localStorage.phone},
			})
			.done(function(res) {
				console.log("success");
				localStorage.codigo = res.data.code;
			})
			.fail(function(res) {
				console.log("error");
				console.log(res);
			})
	}

	$('#ingrese-celular-btn').click(function(){
		event.preventDefault(); // prevent sending 
		localStorage.phone = $("#ingrese-celular-num").val();
		registrarNumero(localStorage.phone);
		window.location.href = "ingreseCodigo_03.html";
	})

});
