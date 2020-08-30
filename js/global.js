var autenticado = false;
// alert("lei el file")
if (localStorage.getItem("USERNAME") == undefined || localStorage.getItem("USERNAME") == null || localStorage.getItem("USERNAME") == "") {
    alert("no hay usuario, debe iniciar sesion")
    window.location.href = "index.html";
} else {
    autenticado = true;
}

/*
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
*/


document.addEventListener("DOMContentLoaded", () => {
    var htmlContentToAppend = "";
    if ($('#mainNav').length > 0 && !(localStorage.getItem("USERNAME") == undefined || localStorage.getItem("USERNAME") == null || localStorage.getItem("USERNAME") == "")) {
        //const userNavBtn = document.createElement('ul');
        htmlContentToAppend += `<nav class="site-header sticky-top py-1 bg-dark">
          <div class="container d-flex flex-column flex-md-row justify-content-between">
              <a class="py-2 d-none d-md-inline-block" href="mainPage.html">Inicio</a>
              <a class="py-2 d-none d-md-inline-block" href="categories.html">Categorías</a>
              <a class="py-2 d-none d-md-inline-block" href="products.html">Productos</a>
              <div class="dropdown">
                  <button class="btn btn-info dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">` + localStorage.getItem("USERNAME") + `</button>
                  <div class="dropdown-menu" aria-labelledby="dropdownMenuLink">
                  <a class="dropdown-item" href="my-profile.html">Mi cuenta</a>
                  <a class="dropdown-item" href="sell.html">Vender</a>
                  <a class="dropdown-item" href="cart.html">Mi carrito</a>
                  <a class="dropdown-item" href="logout.html">Cerrar sesion</a>
                </div>
              </div>
          </div>
          </nav>`;
        document.getElementById("mainNav").innerHTML = htmlContentToAppend;
    }

});