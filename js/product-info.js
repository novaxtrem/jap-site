var product = {};
var currentProductsArray = [];
var productsCommentsArray = [];
var productosRelacionados = [];
//
localStorage.setItem("contador", "0");


//DIBUJO GALERIA
function showImagesGallery(array) {
    let htmlContentToAppend = "";
    propiedad = "";
    for (let i = 0; i < array.length; i++) {

        if (i == 0) {
            propiedad = "item active";
        } else {
            propiedad = "item"
        }
        htmlContentToAppend += `<div class="` + propiedad + `">
        <img src="` + array[i] + `" width="100%" style="object-fit: cover;">
      </div>`


        document.getElementById("images-inner").innerHTML = htmlContentToAppend;
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
            getRelatedProducts(product.relatedProducts);
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
                            </div>` //se usa un template para que todos los elementos sean "iguales" (y que sea mas facil de concatenar codigo);
                        document.getElementById("relatedProductsInside").innerHTML = htmlContentToAppend;
                    };
                };
            });
            //
            let productNameHTML = document.getElementById("productName");
            let productDescriptionHTML = document.getElementById("productDescription");
            let productPriceAndCurrencyHTML = document.getElementById("productPriceAndCurrency");
            //
            productNameHTML.innerHTML = product.name;
            productDescriptionHTML.innerHTML = product.description;
            productPriceAndCurrencyHTML.innerHTML = product.cost + " " + product.currency;
            //Muestro las imagenes en forma de galería
            showImagesGallery(product.images);
        }
    });

    //AGREGO COMENTARIOS
    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
        productsCommentsArray = resultObj.data;
        var userImgArray = [];
        getJSONData(AVATAR_IMG_AND_SOME_MORE_DATA).then(function(resultObj) { //consulto otro json para las pictures, json mio
            let htmlContentToAppend = "";
            if (resultObj.status === "ok") {
                userImgArray = resultObj.data["usersProfileImg"]; //capturo la data de un array en concreto denro del json
                let starsToAdd = "";
                for (let i = 0; i < productsCommentsArray.length; i++) {
                    starsToAdd = ""; //reseteo la variable para que no se me acumulen las estrellas, hago esto porque mi append es acumulativo;
                    var anioMesDiaHora = productsCommentsArray[i].dateTime;
                    var anioMesDia = anioMesDiaHora.split(" ", 1);
                    var fechaOK = ChangeFormateDate(anioMesDia);
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
                            <small>` + fechaOK + `</small>
                        </div>`;
                }
            }
            if (!localStorage.getItem("NEW_COMMENT") == null || !localStorage.getItem("NEW_COMMENT") == undefined || !localStorage.getItem("NEW_COMMENT") == "") {
                document.getElementById("productsCommentsMain").innerHTML = localStorage.getItem("NEW_COMMENT");
            } else {
                document.getElementById("productsCommentsMain").innerHTML = htmlContentToAppend;
            }
        });
        document.getElementById("connectedUserImg").src = localStorage.getItem("USER_PROFILE_IMG");

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

    function ChangeFormateDate(oldDate) {
        return oldDate.toString().split("-").reverse().join("-");
    }


    //append mistico, dado que cuando hago un append en el html no lo estoy volcando en la db
    //y debo actualizar los commentarios (precargados del json y los nuevos);....no me gusta pero funciona
    $('input[name=option]').click(function() {
        let today = new Date().toLocaleDateString();
        //
        let starsToAdd = "";
        var htmlContentToAppend = document.getElementById("productsCommentsMain").innerHTML;
        score = ($('input[name=option]:checked').val());
        //
        localStorage.setItem("USER_COMMENT", document.getElementById("commentArea").value);
        //
        starsToAdd = mostrarEstrellas(score, starsToAdd);

        htmlContentToAppend += `
            <div  style="padding-bottom: 30px;" id="commentElement">
                <div class="float-left">
                    <img src="` + localStorage.getItem("USER_PROFILE_IMG") + `" style="width: 30px;">
                </div>
                <h4 style="padding-left: 40px;">
                    <a href="#">` + localStorage.getItem("USERNAME") + `</a>
                </h4>` + starsToAdd + `
                <h5 class="equal">` + localStorage.getItem("USER_COMMENT") + `</h5> 
                <small>` + today.toString().replaceAll("/", "-") + `</small>
            </div>`;
        localStorage.setItem("NEW_COMMENT", htmlContentToAppend);
        location.reload();
        getRelatedProducts(product.relatedProducts);
    });

});