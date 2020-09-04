var product = {};
var currentProductsArray = [];
var productsCommentsArray = [];
var productosRelacionados = [];

//DIBUJO GALERIA
function showImagesGallery(array) {
    let htmlContentToAppend = "";

    for (let i = 0; i < array.length; i++) {
        let imageSrc = array[i];

        htmlContentToAppend += `
        <div class="col-lg-3 col-md-4 col-6">
            <div class="d-block mb-4 h-100">
                <img class="img-fluid img-thumbnail" src="` + imageSrc + `" alt="">
            </div>
        </div>
        `
        document.getElementById("productImagesGallery").innerHTML = htmlContentToAppend;
    }
}

function getRelatedProducts(array) {
    for (let i = 0; i < array.length; i++) {
        productosRelacionados.push(array[i]);
    }

}




//CARGO DESCRIPCION Y IMAGENES
document.addEventListener("DOMContentLoaded", function(e) {
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            product = resultObj.data;
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productPriceAndCurrencyHTML = document.getElementById("productPriceAndCurrency");

            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productPriceAndCurrencyHTML.innerHTML = product.cost + " " + product.currency;

            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
            getRelatedProducts(product.relatedProducts);
        }
    });

    //AGREGO PRODUCTOS RELACIONADOS
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        let htmlContentToAppend = "";
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;
            for (var i = 0; i < productosRelacionados.length; i++) {
                htmlContentToAppend += `
                <div class="col-sm-4 col-md-2">
                    <div class="card-img-top">
                        <img src="` + currentProductsArray[productosRelacionados[i]].imgSrc + `"class="img-thumbnail" name="zoom" style="cursor:pointer">
                    </div>
                    <h4>
                        <a href="# " class="font-weight-bold text-dark text-uppercase small ">` + currentProductsArray[productosRelacionados[i]].name + `</a>
                    </h4>
                    <h5 class="text-warning">` + currentProductsArray[productosRelacionados[i]].cost + ` ` + currentProductsArray[productosRelacionados[i]].currency + `</h5>
                </div>`
                document.getElementById("relatedProductsInside").innerHTML = htmlContentToAppend;
            };
        };
    });
    //AGREGO COMENTARIOS PRE-CARGADOS
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) { //esta funcion se podria dividir en funciones mas simples que se encarguen de cargar cada una los arrays con datos
        productsCommentsArray = resultObj.data;
        var userImgArray = [];
        getJSONData(AVATAR_IMG_AND_SOME_MORE_DATA).then(function(resultObj) { //consulto otro json para las pictures, json mio
            if (resultObj.status === "ok") {
                userImgArray = resultObj.data["usersProfileImg"]; //capturo la data de un array en concreto denro del json
                let htmlContentToAppend = "";
                let starsToAdd = "";
                for (let i = 0; i < productsCommentsArray.length; i++) {
                    starsToAdd = ""; //reseteo la variable para que no se me acumulen las estrellas, hago esto porque mi append es acumulativo;
                    var anioMesDiaHora = productsCommentsArray[i].dateTime;
                    var anioMesDia = anioMesDiaHora.split(" ", 1);
                    //
                    starsToAdd = mostrarEstrellas(productsCommentsArray[i].score, starsToAdd);
                    //
                    htmlContentToAppend += `
                            <div  style="padding-bottom: 30px;" id="commentElement">
                                <div class="float-left">
                                    <img src="` + userImgArray[i].imgSrc + `" style="width: 30px;">
                                </div>
                                <h4 style="padding-left: 40px;">
                                    <a href="#">` + productsCommentsArray[i].user + `</a>
                                </h4>` + starsToAdd + `
                                <h5 class="equal">` + productsCommentsArray[i].description + `</h5> 
                                <small>` + anioMesDia + `</small>
                            </div>`;
                    document.getElementById("productsCommentsMain").innerHTML = htmlContentToAppend;
                }
            }
        });
    });

    function mostrarEstrellas(score, starsToAdd) {
        var maxStars = 5;
        var uncheckedStars = (maxStars - score);
        for (var i = 0; i < score; i++) {
            starsToAdd += `<i class="fa fa-star checked"></i>`
        }
        for (var i = 0; i < uncheckedStars; i++) {
            starsToAdd += `<i class="fa fa-star"></i>`
        }
        return starsToAdd;
    }






});