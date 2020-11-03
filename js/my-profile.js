var datos = "php/consulta.php";
document.addEventListener("DOMContentLoaded", function(e) {



    $('#getUser').on('click', function() {
        var user_id = $('#user_id').val();
        $.ajax({
            type: 'POST',
            url: 'getData.php',
            dataType: "json",
            data: { user_id: user_id },
            success: function(data) {
                if (data.status == 'ok') {
                    $('#userName').text(data.result.name);
                    $('#userEmail').text(data.result.email);
                    $('#userPhone').text(data.result.phone);
                    $('#userCreated').text(data.result.created);
                    $('.user-content').slideDown();
                } else {
                    $('.user-content').slideUp();
                    alert("User not found...");
                }
            }
        });
    });

    $('#test').click(function() {


        var conexion1;
        conexion1 = new XMLHttpRequest();

        conexion1.open('GET', 'php/consultas.php', true);
        conexion1.send();
        console.log(conexion1);
        // if (conexion1.readyState == 4) {
        alert('Cadena en formato JSON:  ' + conexion1.responseText);

        var datos = conexion1.responseText;
        var salida = '';
        for (var f = 0; f < datos.length; f++) {
            salida += 'Codigo:' + datos[f].name + "<br>";
        }
        document.getElementById("resultado").innerHTML = salida;
        //} else {
        //    document.getElementById("resultado").innerHTML = "Cargando...";
        //  }

    });

    var htmlContentToAppend = "";
    htmlContentToAppend += `<div class="row">
        <div class="col-md-4 border-right">
            <div name="profile-lateral-resume" class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" src="` + localStorage.getItem("USER_PROFILE_IMG") + `" width="90"><span class="font-weight-bold">` + localStorage.getItem("NOMBRE") + " " + localStorage.getItem("APELLIDO") + `</span><h5 class="text-black-50">` + localStorage.getItem("USER_EMAIL") + `</h5></div>
        </div>
        <div class="col-md-8">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <div class="d-flex flex-row align-items-center back"><i class="fa fa-long-arrow-left mr-1 mb-1"></i>
                        <h6>Mi Perfil</h6>
                    </div>
                </div>
                <div class="row mt-2">
                    <div name="input-nombre" class="col-md-6"><input type="text" class="form-control" placeholder="Nombre" value="` + localStorage.getItem("NOMBRE") + `"></div>
                    <div name="input-apellido" class="col-md-6"><input type="text" class="form-control" placeholder="Apellido" value="` + localStorage.getItem("APELLIDO") + `"></div>
                </div>
                <div class="row mt-3">
                    <div name="input-email" class="col-md-6"><input type="text" class="form-control" placeholder="Correo electronico" value="` + localStorage.getItem("USER_EMAIL") + `" disabled></div>
                    <div name="input-telefono" class="col-md-6"><input type="text" class="form-control" placeholder="Telefono" value="` + localStorage.getItem("TELEFONO") + `"></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-6"><input type="text" class="form-control" placeholder="Edad" value="` + localStorage.getItem("EDAD") + `"></div>
                   
                </div>
                <div class="mt-5 text-right">
                    <button id="guardarCambios" class="btn btn-primary profile-button" type="button">Guardar cambios</button>
                </div>
            </div>
        </div>
    </div>`;
    document.getElementById("main-profile-container").innerHTML = htmlContentToAppend;
});