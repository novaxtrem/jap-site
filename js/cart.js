

let articleList=[];
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

function cargoArrayArticulos(){
    return $.ajax({
        url: PRELOADED_ARTICLE_JSON,
        type:"GET",
        dataType:'json', 
        async: false,
        success:function(data){
            for(var i = 0; i <data.articles.length; i++) {
                var newArticle = new Article( data.articles[i].name, data.articles[i].count, data.articles[i].unitCost, data.articles[i].currency, data.articles[i].src);
                articleList.push(newArticle);
            }
        }
    });
};

function dibujoArticulos(){
    var htmlContentToAppend="";
    alert(articleList.length);
    for(var i=0; i<articleList.length; i++){
        htmlContentToAppend += `
                
            <div class="border border-gainsboro p-3 mt-3 clearfix item">
            <div class="text-lg-left">
            <i class="fa fa-ticket fa-2x text-center" aria-hidden="true"></i>
            </div>
            <div class="col-lg-5 col-5 text-lg-left">
            <h3 class="h6 mb-0">`+ articleList[i].name +`<br><small><small>Cost: `+ articleList[i].unitCost +`/ea</small></small></h3>
            </div>
            <div class="product-price d-none">`+articleList[i].unitCost+`</div>
            <div class="pass-quantity col-lg-3 col-md-4 col-sm-3">
            <label for="pass-quantity" class="pass-quantity">Quantity</label>
            <input class="form-control" type="number" value="`+articleList[i].count+`" min="1">
            </div>
            <div class="col-lg-2 col-md-1 col-sm-2 product-line-price pt-4">
            <span class="product-line-price">`+articleList[i].unitCost+`</span>
            </div>
            <div class="remove-item pt-4">
            <button class="remove-product btn-light">
                Delete
            </button>
            </div>
        </div><!-- item -->
        </div> `
        document.getElementById("coso").innerHTML = htmlContentToAppend;
    
    }
}


document.addEventListener("DOMContentLoaded", function(e) {

    cargoArrayArticulos();
    dibujoArticulos();



   
});

