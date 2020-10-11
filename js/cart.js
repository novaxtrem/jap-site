

  


/* Set rates */
var taxRate = 0.05;
var fadeTime = 100;
let articleList = [];
var tax;
var total;
var subtotal;

//
class Article {
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

function cargoArrayArticulos() {
    return $.ajax({
        url: PRELOADED_ARTICLE_JSON,
        type: "GET",
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.articles.length; i++) {
                var newArticle = new Article(data.articles[i].name, data.articles[i].count, data.articles[i].unitCost, data.articles[i].currency, data.articles[i].src);
                articleList.push(newArticle);
            }
        }
    });
};

function dibujoArticulos() {

    var htmlContentToAppend = "";
    for (var i = 0; i < articleList.length; i++) {
        var precioArticuloLinea = articleList[i].unitCost * articleList[i].count;
        if(articleList[i].currency=="USD"){
            articleList[i].unitCost = articleList[i].unitCost*40;
            articleList[i].currency ="UYU";
            precioArticuloLinea = articleList[i].unitCost ;
        }
        htmlContentToAppend += `
            <div class="border border-gainsboro p-3 clearfix item">
                <div class="text-lg-left">
                    <i class="fa fa-ticket fa-2x text-center" aria-hidden="true"></i>
                </div>
                <div class="col-lg-5 col-5 text-lg-left">
                    <h3 class="h6 mb-0">`+ articleList[i].name + `<br>
                        <h5>costo unitario: `+ articleList[i].unitCost +" "+ articleList[i].currency+`</h5>
                    </h3>
                </div>
                <div class="product-price d-none">`+ articleList[i].unitCost + `</div>
                <div class="pass-quantity col-lg-3 col-md-4 col-sm-3">
                    <label for="pass-quantity" class="pass-quantity">Cantidad</label>
                    <input class="form-control" type="number" value="`+ articleList[i].count + `" min="1">
                </div>
                <div class="col-lg-2 col-md-1 col-sm-2 product-line-price pt-4">
                    <span class="product-line-price">`+ precioArticuloLinea + `</span>
                </div>
                <div class="remove-item pt-4">
                    <button class="remove-product btn-light">Delete</button>
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
        $('#cart-subtotal').html(subtotal.toFixed(2));
        $('#cart-tax').html(tax.toFixed(2));
        $('.cart-total').html(total.toFixed(2));
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
            $(this).text(linePrice.toFixed(2));
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