var profile = googleUser.getBasicProfile();

localStorage.setItem("userName", profile.getName());



document.addEventListener("DOMContentLoaded", () => {

    if (localStorage.getItem("userName") == "" || profile.getName() == "") {
        alert("no hay usuario")
    }


});