const autenticado = false;
// alert("lei el file")
if (localStorage.getItem("USERNAME") == undefined || localStorage.getItem("USERNAME") == null || localStorage.getItem("USERNAME") == "") {
    alert("no hay usuario, debe iniciar sesion")
    window.location.href = "index.html";
} else {
    autenticado = true;
}


document.addEventListener("DOMContentLoaded", () => {

    window.onbeforeunload = function(e) {
        window.onunload = function() {
            window.localStorage.isMySessionActive = "false";
            localStorage.clear();
        }
        return undefined;
    };

    window.onload = function() {
        window.localStorage.isMySessionActive = "true";
    };

});