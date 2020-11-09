var userImageProfile = "";

document.addEventListener("DOMContentLoaded", () => {


    //
    $("#form-registrar-usuario").submit(function(e) { //EVITO EL REFRESCO DE LA MODAL
        e.preventDefault();
    });
    $("#login-form").submit(function(e) { //EVITO EL REFRESCO
        e.preventDefault();
    });
    //
    $("#logo_mati").attr("href", CUSTOM_ABOUT_PAGE_WITH_SQL_AND_PHP_CODE);

    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-form-submit-button");
    //
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        showSpinner();
        const emailSender = loginForm.userEmail.value;
        const passwordSender = loginForm.pass.value;

        $.ajax({
            url: SELECT_USER_SCRIPT_POST,
            type: "post",
            data: { email: emailSender, password: passwordSender },
            success: function(data) {
                hideSpinner();
                if (!$.trim(data)) {
                    alert("Error con el usuario y/o la contraseña");
                } else {
                    if (!data == "") {
                        if (guardoDatosLocalStorange(data)) {
                            location.href = "mainPage.html";
                        } else {
                            alert("ah ocurrido un problema");
                        }
                    }
                }
            }
        });
    })

    function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function(e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
                userImageProfile = e.target.result;
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function() {
        readURL(this);
    });


    function validateEmail(email) {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    $("#btnRegistrar").click(function() {

        var nameSender = $("#orangeForm-name").val();
        var last_nameSender = $("#orangeForm-last-name").val();
        var ageSender = $("#orangeForm-age").val();
        var imageProfileSender = userImageProfile;
        var phoneNumSender = $("#orangeForm-phone").val();
        var emailSender = $("#orangeForm-email").val();
        var passwordSender = $("#orangeForm-pass").val();
        //
        if ((nameSender || last_nameSender || ageSender || phoneNumSender || emailSender || passwordSender) == "") {
            alert("todos los campos son requeridos");
        } else {
            var valido = false;
            valido = validateEmail(emailSender);
            if (valido == true) {
                console.log('starting ajax');
                showSpinner();
                $.ajax({
                    url: INSERT_USER_SCRIP_POST,
                    type: "post",
                    data: { name: nameSender, last_name: last_nameSender, age: ageSender, image_profile: imageProfileSender, phone_num: phoneNumSender, email: emailSender, password: passwordSender },
                    success: function(data) {
                        var dataParsed = JSON.parse(data);
                        alert("usuario registrado correctamente");
                        //
                        $("#orangeForm-name").val() = "";
                        $("#orangeForm-last-name").val() = "";
                        $("#orangeForm-age").val() = "";
                        userImageProfile = "";
                        $("#orangeForm-phone").val() = "";
                        $("#orangeForm-email").val() = "";
                        $("#orangeForm-pass").val() = "";
                        //
                        $('#modalRegisterForm').delay(200).fadeOut(450);
                        setTimeout(function() {
                            $('#modalRegisterForm').modal("hide");
                        }, 1500);
                        //
                        hideSpinner();
                    }
                });
            }

        }
    });

});