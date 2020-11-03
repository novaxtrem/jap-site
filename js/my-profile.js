document.addEventListener("DOMContentLoaded", function(e) {

    $('#test1').click(function() {
        alert("cosopum");
        $.ajax({
            url: 'php/conexion.php',
            success: function(data) {
                $('#resultado').html(data);
            }
        });
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