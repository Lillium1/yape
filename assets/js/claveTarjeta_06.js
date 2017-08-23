$("#m_crearusuario").hide();

$("#m_inputt").click(function(ev){
        ev.preventDefault();
        if($("#m_inputt").val() != "" || $("#m_inputt").length > 4){
            $("#m_crearusuario").show();
         }
    });