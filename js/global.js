var autenticado = false;
if (localStorage.getItem("USER_EMAIL") == undefined || localStorage.getItem("USER_EMAIL") == null || localStorage.getItem("USER_EMAIL") == "") {
    alert("no hay usuario, debe iniciar sesion")
    window.location.href = "index.html";
} else {
    autenticado = true;
}
//SHOW ME YOUR KUNG FU
class Usuario {
    constructor(nombre, apellido, edad, email, telefono, contraseña) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.edad = edad;
        this.email = email;
        this.telefono = telefono;
        this.contraseña = contraseña;
    }
}

class Article { //CREO LA CLASE ARTICULOS CON SUS ATRIBUTOS, PORQUE SI
    constructor(name, count, unitCost, currency, src) {
        this.name = name;
        this.count = count;
        this.unitCost = unitCost;
        this.currency = currency;
        this.src = src;
    }
    dameDatos() {
        console.log(this.name + " " + this.count + " " + this.unitCost + " " + this.currency + " " + this.src)
    }
}

document.addEventListener("DOMContentLoaded", () => {
    var htmlContentToAppend = "";
    if ($('#mainNav').length > 0 && !(localStorage.getItem("USER_EMAIL") == undefined || localStorage.getItem("USER_EMAIL") == null || localStorage.getItem("USER_EMAIL") == "")) {
        htmlContentToAppend += `
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <a class="navbar-brand" href="mainPage.html">INICIO</a>
          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavDropdown">
            <ul class="navbar-nav">
              <li class="nav-item">
                <a class="nav-link" href="categories.html">Categorias
                  <span class="sr-only">(current)</span>
                </a>
              </li>
              <li class="nav-item">
                <a class="nav-link" href="products.html">Productos</a>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">` + localStorage.getItem("NOMBRE") + " " + localStorage.getItem("APELLIDO") + `</a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                  <a class="dropdown-item" href="my-profile.html">Mi Perfil</a>
                  <a class="dropdown-item" href="cart.html">Mi Carrito</a>
                  <a class="dropdown-item" href="sell.html">Vender</a>
                  <a class="dropdown-item" href="logout.html">Salir</a>
                </div>
              </li>
            </ul>
          </div>
        </nav>`;
        document.getElementById("mainNav").innerHTML = htmlContentToAppend;
    }
});