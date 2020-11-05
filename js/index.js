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
            url: "https://jap-site.000webhostapp.com/consulta.php",
            type: "GET",
            dataType: 'json',
            async: false, //SINCRONICO, NO ESPERO EL CALLBACK, DALE QUE ES TARTDE
            success: function(data) {
                for (var i = 0; i < data.length; i++) {
                    alert("test " + data[i].name);
                    /*var newArticle = new Article(data.articles[i].name, data.articles[i].count, data.articles[i].unitCost, data.articles[i].currency, data.articles[i].src); //CREO EL OBJETO
                    articleList.push(newArticle); //AGREGO EL OBJETO AL ARRAYLIST
                    */

                }
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