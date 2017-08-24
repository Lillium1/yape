$(document).ready(function() {
	//Timer 21seg reenviar codigo
	function startTimer(duration, display) {
	    var timer = duration, minutes, seconds;
	    setInterval(function () {
	        
	        seconds = parseInt(timer % 60, 10);     
	        seconds = seconds < 20 ?  seconds : seconds;

	        display.text(seconds);

	        if (--timer < 0) {
	            timer = duration;
	            $.ajax({
					url: '/api/resendCode',
					type: 'POST',
					data: {'phone' : localStorage.phone},
				})
				.done(function(res) {
					console.log("success");
					localStorage.codigo = res.data;
					$("#codigoUser").text(localStorage.codigo);
				})
				.fail(function(res) {
					console.log("error");
					console.log(res);
				})  
	        }
	    }, 1000);
	}
	//Timer 21seg cambia seg en el span del html
	jQuery(function ($) {
	    var fiveMinutes = 21,
	        display = $('#time');
	    startTimer(fiveMinutes, display);
	});

	//funcion que impre codigo y lo valida
	(function validarCamposCodigo(){
			//Imprime el codigo en un alert
			$('.m_cajainput').append('<div class="alert alert-info"><a id="codigo" href="#" class="close" data-dismiss="alert" aria-label="close" title="close">×</a>' +
								  '<strong>Código de validación: </strong><p id="codigoUser">' + localStorage.codigo +
									'</p></div>');
				//Validar campos del codigo
			$("#m_inputt").blur(function(){
				if ($('#m_inputt').val() == localStorage.codigo) {
					event.preventDefault(); // prevent sending 
					window.location.href = "ingreseDatos_04.html";
				}else{
					$("#errorCodigo").remove();
					$(".m_cajainput").append("<span id='errorCodigo'>* Debe ingresar codigo válido</span>");
				}
			})
	})();
	

	//Funcion registrar Numero Api
	function registrarNumero(num){
			$.ajax({
				url: '/api/registerNumber',
				type: 'POST',
				data: {'terms' : 'true', 'phone' : num},
			})
			.done(function(res) {
				console.log("success");
				localStorage.codigo = res.data.code;
				//startTime();
			})
			.fail(function(res) {
				console.log("error");
				console.log(res);
			})
	}

	//Funcion registrar Usuario Api
	function registrarUsuario(num, name, email, pass){
			$.ajax({
				url: '/api/createUser',
				type: 'POST',
				data: {'phone' : num, 'name' : name, 'email' : email, 'password' : pass},
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
			})
			.fail(function(res) {
				console.log("error");
				console.log(res);
			})
	}

	//Funcion registrar Tarjeta
	function registrarTarjeta(num, tarjetaNumero, tarjetaMes, tarjetaYear, tarjetaPass){
			$.ajax({
				url: '/api/registerCard',
				type: 'POST',
				data: {'phone' : num, 'cardNumber' : tarjetaNumero, 'cardMonth' : tarjetaMes, 'cardYear' : tarjetaYear, 'cardPassword' : tarjetaPass},
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
			})
			.fail(function(res) {
				console.log("error");
				console.log(res);
			})
	}
	
	//boton guarda numero
	$('#ingrese-celular-btn').click(function(){
		event.preventDefault(); // prevent sending 
		localStorage.phone = $("#ingrese-celular-num").val();
		registrarNumero(localStorage.phone);
		window.location.href = "ingreseCodigo_03.html";
	})

	//boton guarda datos usuario
	$('#btn-registro-user').click(function(){
		event.preventDefault(); // prevent sending 
		localStorage.name = $("#usr").val();
		localStorage.email = $("#email").val();
		localStorage.pass = $("#pass").val();
		registrarUsuario(localStorage.phone, localStorage.name, localStorage.email, localStorage.pass);
		window.location.href = "registreTarjeta_05.html";
	})

	//boton guarda datos tarjeta
	$('#btn-registro-tarjeta').click(function(){
		localStorage.tarjetaNumero = $("#tarjeta").val();
		localStorage.tarjetaMes = $("#tarjeta-mes").val();
		localStorage.tarjetaYear = $("#tarjeta-year").val();
		localStorage.tarjetaPass = $("#tarjeta-pass").val();
		registrarTarjeta(localStorage.phone, localStorage.tarjetaNumero, localStorage.tarjetaMes, localStorage.tarjetaYear, localStorage.tarjetaPass);
	})


});