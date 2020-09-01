var product = {};
var currentProductsArray = [];

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

//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
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
                            <img src="` + currentProductsArray[i].imgSrc + `" class="img-thumbnail">
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
});