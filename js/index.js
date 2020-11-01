document.addEventListener("DOMContentLoaded", () => {
    localStorage.clear();
    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-form-submit-button");
    //  const loginWithGoogle = document.getElementById("google-login-button");

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const username = loginForm.userEmail.value;
        const password = loginForm.pass.value;

        if (username == "user@net.com" && password == "1234") {
            localStorage.setItem('NOMBRE', "Jonh");
            localStorage.setItem('APELLIDO', "Constantine");
            localStorage.setItem('USER_EMAIL', username);
            localStorage.setItem('TELEFONO', "097575958");
            localStorage.setItem('DIRECCION', "Av True Value 7777");
            localStorage.setItem('PAIS', "Uruguay");
            //
            localStorage.setItem("USER_PROFILE_IMG", "https://image.flaticon.com/icons/svg/244/244341.svg");
            window.location.href = "mainPage.html";
        } else {
            alert("Error con el usuario y/o la contraseña");
        }
    })
});