var userImageProfile = "";

document.addEventListener("DOMContentLoaded", () => {

    localStorage.clear();
    //
    $("#form-registrar-usuario").submit(function(e) { //EVITO EL REFRESCO DE LA MODAL
        e.preventDefault();
    });
    $("#login-form").submit(function(e) { //EVITO EL REFRESCO
        e.preventDefault();
    });
    //




    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-form-submit-button");
    //
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const username = loginForm.userEmail.value;
        const password = loginForm.pass.value;
        //
        $.ajax({
            url: GET_ALL_USER_PHP_RESPONSE_JSON_LINK + "?username=" + username + "&password=" + password, //ONLINE FREE HOSTING WITH PHP + EXTERNAL REMOTE DB (FREE ALSO)
            type: "GET", // SENDING A USER AND PASSWORD WITHOUT HASH AND WITH GET METHOD, OUTSTANDING (SARCASTIC)
            dataType: 'json',
            async: false,
            success: function(data) {
                if (!$.trim(data)) {
                    alert("Error con el usuario y/o la contraseña");
                } else {
                    if (!data[0].name == "") {
                        alert(data[0].name)
                        localStorage.setItem('NOMBRE', data[0].name);
                        localStorage.setItem('APELLIDO', data[0].last_name);
                        localStorage.setItem('USER_EMAIL', username);
                        localStorage.setItem('TELEFONO', data[0].phone_num);
                        localStorage.setItem('EDAD', data[0].age);
                        //
                        //localStorage.setItem("USER_PROFILE_IMG", atob(data[0].image_profile));
                        //
                        window.location.href = "mainPage.html";
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
            alert(valido);
            if (valido == true) {
                console.log('starting ajax');
                $.ajax({
                    url: INSERT_USER_SCRIP_POST,
                    type: "post",
                    data: { name: nameSender, last_name: last_nameSender, age: ageSender, image_profile: imageProfileSender, phone_num: phoneNumSender, email: emailSender, password: passwordSender },
                    success: function(data) {
                        var dataParsed = JSON.parse(data);
                        alert("usuario registrado correctamente");
                        //
                        $('#modalRegisterForm').delay(1000).fadeOut(450);
                        setTimeout(function() {
                            $('#modalRegisterForm').modal("hide");
                        }, 1500);
                        //
                        $("#orangeForm-name").val() = "";
                        $("#orangeForm-last-name").val() = "";
                        $("#orangeForm-age").val() = "";
                        userImageProfile = "";
                        $("#orangeForm-phone").val() = "";
                        $("#orangeForm-email").val() = "";
                        $("#orangeForm-pass").val() = "";
                    }
                });
            }
        }
    });

});