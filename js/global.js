document.addEventListener("DOMContentLoaded", () => {
    const autenticado = false;

    if (localStorage.getItem("userName") == "") {
        alert("no hay usuario")
    } else {
        autenticado = true;
    }


});