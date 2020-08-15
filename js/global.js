document.addEventListener("DOMContentLoaded", () => {
    const autenticado = false;
    alert("lei el file")
    if (localStorage.getItem("USERNAME") == "") {
        alert("no hay usuario")
    } else {
        autenticado = true;
    }


});