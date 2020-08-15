document.addEventListener("DOMContentLoaded", () => {



    const loginForm = document.getElementById("login-form");
    const loginButton = document.getElementById("login-form-submit-button");
    const loginWithGoogle = document.getElementById("google-login-button");

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

    loginWithGoogle.addEventListener("click", onSignIn(googleUser));

    function onSignIn(googleUser) {
        // Useful data for your client-side scripts:
        var profile = googleUser.getBasicProfile();
        console.log("ID: " + profile.getId()); // Don't send this directly to your server!
        console.log('Full Name: ' + profile.getName());
        console.log('Given Name: ' + profile.getGivenName());
        console.log('Family Name: ' + profile.getFamilyName());
        console.log("Image URL: " + profile.getImageUrl());
        console.log("Email: " + profile.getEmail());

        // The ID token you need to pass to your backend:
        var id_token = googleUser.getAuthResponse().id_token;
        console.log("ID Token: " + id_token);
        redirect(profile);

    }

    function redirect(profile) {
        if (profile.getId() == "") {
            alert("error")
        } else {
            //alert('Full Name: ' + profile.getName());
            localStorage.setItem('USERNAME', profile.getName());
            alert('USERNAME: ' + localStorage.getItem('USERNAME'));
            window.location.href = "mainPage.html";
        }

    }


});