document.addEventListener("DOMContentLoaded", () => {
    const autenticado = false;
    // alert("lei el file")
    if (localStorage.getItem("USERNAME") == "") {
        alert("no hay usuario")
    } else {
        autenticado = true;
    }



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