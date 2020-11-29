var fadeTime = 100;
var fadeTimeCards = 300;
let articleList = [];
var moneda;
const cotizacion = 40;
var existenElementos = false;
var productosCompradosSender;
var totalSender = 0;

function cargoArrayArticulos() { //CARGO MI ARRAYLIST CON LA INFORMACION DEL JSON
    return $.ajax({
        url: PRELOADED_ARTICLE_JSON,
        type: "GET",
        dataType: 'json',
        async: false, //SINCRONICO, NO ESPERO EL CALLBACK, DALE QUE ES TARTDE
        success: function(data) {
            for (var i = 0; i < data.articles.length; i++) {
                var newArticle = new Article(data.articles[i].name, data.articles[i].count, data.articles[i].unitCost, data.articles[i].currency, data.articles[i].src); //CREO EL OBJETO
                articleList.push(newArticle); //AGREGO EL OBJETO AL ARRAYLIST
            }
        }
    });
};

function dibujoArticulos() {
    var htmlContentToAppend = "";
    for (var i = 0; i < articleList.length; i++) {
        var precioArticuloLinea = articleList[i].unitCost * articleList[i].count;
        if (articleList[i].currency == "USD") { //PASO A PESOS CUALQUIER ELEMENTO QUE ESTE EN DOLARES
            articleList[i].unitCost = articleList[i].unitCost * cotizacion;
            articleList[i].currency = "UYU";
            precioArticuloLinea = articleList[i].unitCost;
        }
        moneda = articleList[i].currency;
        htmlContentToAppend += `
            <div class="p-3 clearfix item">
                <img src="` + articleList[i].src + `" width="80px">
                <div class="col-lg-5 col-5 text-lg-left product-name-and-unit-cost">
                    <h4 class="product-name">` + articleList[i].name + `<br>
                        <h5  class="product-unit-cost">costo unitario: ` + articleList[i].unitCost + " " + articleList[i].currency + `</h5>
                    </h4>
                </div>
                <div class="product-price d-none">` + articleList[i].unitCost + `</div>
                <div class="pass-quantity col-lg-3">
                    <label for="pass-quantity" class="pass-quantity">Cantidad</label>
                    <input class="form-control itemsComprados" type="number" value="` + articleList[i].count + `" min="1">
                </div>
                <div class="col-lg-2 col-md-1 col-sm-2 product-line-price pt-4">
                    <span class="product-line-price text-right">` + precioArticuloLinea + " " + moneda + `</span>
                </div>
                <div class="remove-item pt-4">
                    <button class="remove-product btn btn-danger ">eliminar</button>
                </div>
            </div>`
        document.getElementById("itemList").innerHTML = htmlContentToAppend;
    }
}

/* Recalculate cart */
function recalculateCart() {
    productosCompradosSender = "";
    var subtotal = 0;
    var costoEnvio = 0;
    var tipoEnvio = 0;
    var total = 0;

    var nombreArticulo = "";
    var costoUnitario = "";
    var cantidadComprados = "";

    //
    existenElementos = false;
    $('.item').each(function() { //POR CADA UNA DE LAS "FILAS" (ELEMENTOS ITEMS) QUE ENCUENTRO DENTRO DEL HTML
        subtotal += parseFloat($(this).children('.product-line-price').text()); //ACCEDO AL IMPORTE Y LE HAGO UN PARSE PARA TRABAJAR MATEMATICAMENTE
        //
        nombreArticulo = $(this).children('.product-name-and-unit-cost').children(".product-name").text();
        costoUnitario = $(this).children('.product-name-and-unit-cost').children(".product-unit-cost").text();
        cantidadComprados = $(this).children('.pass-quantity').children(".itemsComprados").val();
        productosCompradosSender += nombreArticulo + " " + costoUnitario + " unidades compradas: " + cantidadComprados + " ";
        //
        existenElementos = true; // SI CAPTURO ALGUN ELEMENTO DE LA CALSE "ITEM", ES PORQUE EXISTEN ITEMS (EVIDENTEMENTE) ENTONCES "EXISTEN ELEMENTOS" = TRUE
    });
    //
    tipoEnvio = $("input[name='optradio']:checked").val(); //CALCULOS
    costoEnvio = tipoEnvio * subtotal;
    total = subtotal + costoEnvio;
    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function() {
        $('#cart-subtotal').html(parseFloat(subtotal).toFixed(2));
        $("#costoEnvio").html(parseFloat(costoEnvio).toFixed(2));
        $('#importeFinal').html(total.toFixed(2));
        $('.moneda').html(moneda);
        if (total == 0) {
            $('.checkout').fadeOut(fadeTime);
        } else {
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
    totalSender = total;
}

/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent(); //CONSIGO LA ROW MEDIANTE EL "PADRE-DEL-PADRE"
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function() {
        $(this).fadeOut(fadeTime, function() { //EFECTOS FADE PARA CHETEARLO
            $(this).text(linePrice.toFixed(1) + " " + moneda);
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}

/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent(); //CONSIGO LA ROW MEDIANTE EL "PADRE-DEL-PADRE" AGAIN
    productRow.slideUp(fadeTime, function() {
        productRow.remove();
        recalculateCart();
    });
}

function metodoDepago(optionSelected) { //RESETEO LAS VARIABLES DE LSO INPUTS CUANDO CAMBIAS EL MODO DE PAGO
    if ($(optionSelected).val() == "credito") {
        $('#numeroDeCuenta').val("");
        $('#cedulaIdentidad').val("");
        $('#pin').val("");
    } else {
        $('#titular').val("");
        $('#cardNumber').val("");
        $('#cvv').val("");
    }
}

function controlFinal() { // VALIDO CONTROLANDO LOS INPUT, PODRIA CONTROLAR TODOS LOS INPUT DE LA PAGINA Y/O FILTRAR POR CLASE, PERO TA; ERAN POCOS PINTO ID
    if (existenElementos == true) { //VALIDO QUE EXISTAN ELEMENTOS A COMPRAR, ESTO NO LO PIDE LA LETRA LO HAGO DE ONDA Y PORQUE ES UNA SOLA LINEA DE CODIGO
        if (!$('#calle').val() == "" && !$('#numero').val() == "" && !$('#esquina').val() == "") {
            if (((!$('#numeroDeCuenta').val() == "") && (!$('#cedulaIdentidad').val() == "") && (!$('#pin').val() == "")) || ((!$('#titular').val() == "") && (!$('#cardNumber').val() == "") && (!$('#cvv').val() == ""))) {
                var emailSender = localStorage.getItem("USER_EMAIL");
                $.ajax({
                    url: INSERT_ORDEN_COMPRA_POST,
                    type: "post",
                    data: { email: emailSender, orden_compra: productosCompradosSender, total: totalSender },
                    success: function(data) {
                        console.log(data);
                        alert(BUY_SUCCESS_MSG.msg);
                    }
                });
            } else {
                alert("debe completar datos de medio de pago");
            }
        } else {
            alert("debe completar la direccion");
        }
    } else {
        alert("no tiene elementos en el carrito de compra");
    }
}
$(document).ready(function() { //DOM CONTENT LOADED
    getJSONData(CART_BUY_URL).then(function(resultObj) { //CARGO EL MENSAJE "PERSONALIZADO" DEL JSON
        if (resultObj.status === "ok") {
            BUY_SUCCESS_MSG = resultObj.data;
        }
        return BUY_SUCCESS_MSG; //RETORNO LA RESPUESTA
    });
    //
    cargoArrayArticulos();
    dibujoArticulos();
    recalculateCart();
    //
    $('.pass-quantity input').change(function() {
        updateQuantity(this); //LE PASO EL ELEMENTO QUE DISPARO EL EVENTO A LA FUNCION
        if (($(this).val() == "") || ($(this).val() == "0")) { // SI PONES "" (VACIO) O PONES CANTIDAD EN CERO, ELIMINO EL ELEMENTO DE LA LISTA DE COMPRA, NADA DE VACILAR AL SOFTWARE :P
            removeItem(this);
        }
    });
    $('.remove-item button').click(function() {
        removeItem(this);
    });
    $('.envio input').change(function() {
        recalculateCart();
    });
    $('.medioPago input').change(function() {
        metodoDepago(this);
    });
    $('#btnFinalizarCompra').click(function() {
        controlFinal();
    });

});