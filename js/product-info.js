var product = {};
var currentProductsArray = [];
var productsCommentsArray = [];

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
        }
    });
    //AGREGO PRODUCTOS RELACIONADOS
    var currentCarSelected = "Chevrolet Onix Joy";
    getJSONData(PRODUCTS_URL).then(function(resultObj) {
        if (resultObj.status === "ok") {
            currentProductsArray = resultObj.data;

            let htmlContentToAppend = "";
            for (let i = 0; i < currentProductsArray.length; i++) {
                if (currentProductsArray[i].name == currentCarSelected) {
                    //do nothing
                } else {
                    htmlContentToAppend += `
                    <div class="col-sm-4 col-md-2">
                        <div class="card-img-top">
                            <img src="` + currentProductsArray[i].imgSrc + `"class="img-thumbnail" name="zoom" style="cursor:pointer">
                        </div>
                        <h4>
                            <a href="# " class="font-weight-bold text-dark text-uppercase small ">` + currentProductsArray[i].name + `</a>
                        </h4>
                        <h5 class="text-warning">` + currentProductsArray[i].cost + ` ` + currentProductsArray[i].currency + `</h5>
                    </div>`
                    document.getElementById("relatedProductsInside").innerHTML = htmlContentToAppend;
                }
            }
        }
    });
    //AGREGO COMENTARIOS
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        productsCommentsArray = resultObj.data;
        var userImgArray = [];
        getJSONData("https://api.jsonbin.io/b/5f4ee062993a2e110d3c7a11/1").then(function(resultObj) { //consulto otro json para las pictures, json mio
            if (resultObj.status === "ok") {
                userImgArray = resultObj.data;
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