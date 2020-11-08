var userImageProfile = "";

document.addEventListener("DOMContentLoaded", () => {
    localStorage.clear();
    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-form-submit-button");
    //
    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const username = loginForm.userEmail.value;
        const password = loginForm.pass.value;
        //
        return $.ajax({
            url: GET_ALL_USER_PHP_RESPONSE_JSON_LINK + "?username=" + username + "&password=" + password, //ONLINE FREE HOSTING WITH PHP + EXTERNAL REMOTE DB (FREE ALSO)
            type: "GET", // SENDING A USER AND PASSWORD WITHOUT HASH AND WITH GET METHOD, OUTSTANDING (SARCASTIC)
            dataType: 'json',
            async: false,
            success: function(data) {
                if (!$.trim(data)) {
                    alert("Error con el usuario y/o la contraseña");
                } else {
                    localStorage.setItem('NOMBRE', data[0].name);
                    localStorage.setItem('APELLIDO', data[0].last_name);
                    localStorage.setItem('USER_EMAIL', username);
                    localStorage.setItem('TELEFONO', data[0].phone_num);
                    localStorage.setItem('EDAD', data[0].age);
                    localStorage.setItem("USER_PROFILE_IMG", "https://image.flaticon.com/icons/svg/244/244341.svg");
                    //
                    window.location.href = "mainPage.html";
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


                document.getElementById('test').innerHTML = `<img src="` + e.target.result + `" />'`;

            }
            reader.readAsDataURL(input.files[0]);
        }
    }
    $("#imageUpload").change(function() {
        readURL(this);
    });


    $("#btnRegistrar").click(function() {

        var nameSender = "Mati";
        var last_nameSender = "V";
        var ageSender = "29";
        var imageProfileSender = userImageProfile;
        var phoneNumSender = "545211";
        var emailSender = "w33ewqghghail.eeee";
        var passwordSender = "147";

        console.log('starting ajax');
        $.ajax({
            url: "https://jap-site.000webhostapp.com/insert.php?",
            type: "post",
            data: { name: nameSender, last_name: last_nameSender, age: ageSender, image_profile: imageProfileSender, phone_num: phoneNumSender, email: emailSender, password: passwordSender },
            success: function(data) {
                var dataParsed = JSON.parse(data);

            }
        });

    });

});