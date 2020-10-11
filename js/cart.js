/* Set rates */
var taxRate = 0.05;
var fadeTime = 100;
let articleList = [];
var tax;
var total;
var subtotal;
var moneda;

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

function cargoArrayArticulos() { //CARGO MI ARRAYLIST CON LA INFORMACION DEL JSON
    return $.ajax({
        url: PRELOADED_ARTICLE_JSON,
        type: "GET",
        dataType: 'json',
        async: false, //SINCRONICO, NO ESPERO EL CALLBACK, DALE QUE ES TARTDE
        success: function (data) {
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
            articleList[i].unitCost = articleList[i].unitCost * 40;
            articleList[i].currency = "UYU";
            precioArticuloLinea = articleList[i].unitCost;
        }
        moneda = articleList[i].currency;
        htmlContentToAppend += `
            <div class="border border-gainsboro p-3 clearfix item">
                <img src="`+ articleList[i].src + `" width="80px">
                <div class="col-lg-5 col-5 text-lg-left">
                    <h4>`+ articleList[i].name + `<br>
                        <h5>costo unitario: `+ articleList[i].unitCost + " " + articleList[i].currency + `</h5>
                    </h4>
                </div>
                <div class="product-price d-none">`+ articleList[i].unitCost + `</div>
                <div class="pass-quantity col-lg-3">
                    <label for="pass-quantity" class="pass-quantity">Cantidad</label>
                    <input class="form-control" type="number" value="`+ articleList[i].count + `" min="1">
                </div>
                <div class="col-lg-2 col-md-1 col-sm-2 product-line-price pt-4">
                    <span class="product-line-price">`+ precioArticuloLinea + " " + moneda + `</span>
                </div>
                <div class="remove-item pt-4">
                    <button class="remove-product btn btn-danger">eliminar</button>
                </div>
            </div>`
        document.getElementById("itemList").innerHTML = htmlContentToAppend;
    }

}



/* Recalculate cart */
function recalculateCart() {
    subtotal = 0;

    /* Sum up row totals */
    $('.item').each(function () {
        subtotal += parseFloat($(this).children('.product-line-price').text());
    });

    /* Calculate totals */
    tax = subtotal * taxRate;
    total = subtotal + tax;

    /* Update totals display */
    $('.totals-value').fadeOut(fadeTime, function () {
        $('#cart-subtotal').html(subtotal.toFixed(1));
        $('#cart-tax').html(tax.toFixed(1));
        $('.cart-total').html(total.toFixed(1));
        $('.moneda').html(moneda);
        if (total == 0) {
            $('.checkout').fadeOut(fadeTime);
        } else {
            $('.checkout').fadeIn(fadeTime);
        }
        $('.totals-value').fadeIn(fadeTime);
    });
}



/* Update quantity */
function updateQuantity(quantityInput) {
    /* Calculate line price */
    var productRow = $(quantityInput).parent().parent();
    var price = parseFloat(productRow.children('.product-price').text());
    var quantity = $(quantityInput).val();
    var linePrice = price * quantity;

    /* Update line price display and recalc cart totals */
    productRow.children('.product-line-price').each(function () {
        $(this).fadeOut(fadeTime, function () {
            $(this).text(linePrice.toFixed(1)+" "+moneda);
            recalculateCart();
            $(this).fadeIn(fadeTime);
        });
    });
}

/* Remove item from cart */
function removeItem(removeButton) {
    /* Remove row from DOM and recalc cart total */
    var productRow = $(removeButton).parent().parent();
    productRow.slideUp(fadeTime, function () {
        productRow.remove();
        recalculateCart();
    });
}



$(document).ready(function () {
    cargoArrayArticulos();
    dibujoArticulos();
    recalculateCart();
    //
    $('.pass-quantity input').change(function () {
        updateQuantity(this);
    });
    $('.remove-item button').click(function () {
        removeItem(this);
    });
});