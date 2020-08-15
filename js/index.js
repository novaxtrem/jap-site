document.addEventListener("DOMContentLoaded", () => {
    alert("hola")
    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-form-submit-button");
    //  const loginWithGoogle = document.getElementById("google-login-button");

    loginButton.addEventListener("click", (e) => {
        e.preventDefault();
        const username = loginForm.userEmail.value;
        const password = loginForm.pass.value;

        if (username == "user@net.com" && password == "1234") {
            //alert("You have successfully logged in.");
            window.location.href = "mainPage.html";
        } else {
            alert("nop");
        }
    })




});