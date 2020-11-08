const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";
//CUSTOM DATA ORIGINS
const AVATAR_IMG_AND_SOME_MORE_DATA = "https://api.jsonbin.io/b/5f4ee062993a2e110d3c7a11/4";
const PRELOADED_ARTICLE_JSON = "https://japdevdep.github.io/ecommerce-api/cart/654.json";
//
//CUSTOM EXTERNAL SERVER WITH PHP - WEB NEED TO CHECK MYSQL INJECTION -> MAYBE LATER
const CUSTOM_ABOUT_PAGE_WITH_SQL_AND_PHP_CODE = "https://jap-site.000webhostapp.com/";
const GET_ALL_USER_PHP_RESPONSE_JSON_LINK = "https://jap-site.000webhostapp.com/consulta.php";
const SCRIPT_TO_UPLOAD_FILES = "https://jap-site.000webhostapp.com/upload.php"; //NOT USED AT THE MOMENT, IMAGES WILL BE SAVED ON BASE64 STRING IN DB (BAD IKNOW), BUTS WORKS FINE
const INSERT_USER_SCRIP_POST = "https://jap-site.000webhostapp.com/insert.php?"; //INSERT
const UPDATE_USER_SCRIPT_POST = "https://jap-site.000webhostapp.com/update.php?"; //UPDATE

var BUY_SUCCESS_MSG = "";

document.addEventListener("DOMContentLoaded", function(e) {

    getJSONData = function(url) {
        var result = {};
        showSpinner();
        return fetch(url)
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw Error(response.statusText);
                }
            })
            .then(function(response) {
                result.status = 'ok';
                result.data = response;
                hideSpinner();
                return result;
            })
            .catch(function(error) {
                result.status = 'error';
                result.data = error;
                hideSpinner();
                return result;
            });
    }

    var showSpinner = function() {
        if ($("#spinner-wrapper").length > 0) { //CONTROL DE NULL, POR LAS DUDAS
            document.getElementById("spinner-wrapper").style.display = "block";
        }
    }
    var hideSpinner = function() {
        if ($("#spinner-wrapper").length > 0) { //CONTROL DE NULL, POR LAS DUDAS
            document.getElementById("spinner-wrapper").style.display = "none";
        }
    }
});