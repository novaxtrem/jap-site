document.addEventListener("DOMContentLoaded", () => {
    localStorage.clear();
    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-form-submit-button");
    //  const loginWithGoogle = document.getElementById("google-login-button");

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const username = loginForm.userEmail.value;
        const password = loginForm.pass.value;

        return $.ajax({
            url: GET_ALL_USER_PHP_RESPONSE_JSON_LINK + "?username=" + username, //I MAKE MY OWN RULES; ONLINE FREE HOSTING WITH PHP + EXTERNAL REMOTE DB (FREE ALSO)
            type: "GET",
            dataType: 'json',
            async: false,
            // data: { field1: username },
            success: function(data) {
                json = JSON.parse(data);
                if (json.hasOwnProperty('id')) {
                    alert("gola");




                } else {
                    alert("nop");
                }


                // for (var i = 0; i < data.length; i++) {

                /* if (username == data[i].email) {
                     if (password == data[i].password) {
                         alert(data[i].name + " " + data[i].last_name);
                         //
                         localStorage.setItem('NOMBRE', data[i].name);
                         localStorage.setItem('APELLIDO', data[i].last_name);
                         localStorage.setItem('USER_EMAIL', username);
                         localStorage.setItem('TELEFONO', data[i].phone_num);
                         localStorage.setItem('EDAD', data[i].age);
                         //
                         localStorage.setItem("USER_PROFILE_IMG", "https://image.flaticon.com/icons/svg/244/244341.svg");
                         window.location.href = "mainPage.html";
                     }
                 }
                 */
                /*var newArticle = new Article(data.articles[i].name, data.articles[i].count, data.articles[i].unitCost, data.articles[i].currency, data.articles[i].src); //CREO EL OBJETO
                articleList.push(newArticle); //AGREGO EL OBJETO AL ARRAYLIST
                */

                //  }
            }
        });
        /*
        if (username == "user@net.com" && password == "1234") {
            localStorage.setItem('NOMBRE', "Jonh");
            localStorage.setItem('APELLIDO', "Constantine");
            localStorage.setItem('USER_EMAIL', username);
            localStorage.setItem('TELEFONO', "097575958");
            localStorage.setItem('EDAD', "22");
            //
            localStorage.setItem("USER_PROFILE_IMG", "https://image.flaticon.com/icons/svg/244/244341.svg");
            window.location.href = "mainPage.html";
        } else {
            alert("Error con el usuario y/o la contraseña");
        }
        */
    })
});