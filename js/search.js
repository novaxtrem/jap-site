document.addEventListener("DOMContentLoaded", () => {
    /*
        const search_input = document.getElementById('search');
        const results = document.getElementById('results');

        var search_term = '';
        var products;

        const fetchProducts = async() => {
            products = await fetch(
                PRODUCTS_URL
            ).then(res => res.json());
        };

        const showproducts = async() => {
            results.innerHTML = '';

            await fetchProducts();

            const ul = document.createElement('ul');
            ul.id = "listaResultados";
           // ul.classList.add("countries");

            products
                .filter(product =>
                    product.name.toLowerCase().includes(search_term.toLowerCase()) || product.description.toLowerCase().includes(search_term.toLowerCase()))
                .forEach(product => {
                    const li = document.createElement('li');
                   // li.classList.add("country-item");
                    //
                    const product_image = document.createElement('img');
                    product_image.src = product.imgSrc;
                    product_image.classList.add("country-flag");
                    //
                    const product_name = document.createElement('h6');
                    product_name.innerText = product.name;
                   // product_name.classList.add("country-name");
                    //
                    const product_price = document.createElement('p');
                    product_price.innerText = Number(product.cost);
                 //   product_price.classList.add('country-population-text');

                    li.appendChild(product_name);
                    li.appendChild(product_price);
                    li.appendChild(product_image);

                    ul.appendChild(li);

                });

            results.appendChild(ul);
        };



        search_input.addEventListener('input', e => {
            search_term = e.target.product;
            if (search_term == "") {
                document.getElementById("listaResultados").style.display = "none";
            } else {
                showproducts();
            }

        });*/

    $(document).ready(function() {
        $.ajaxSetup({
            cache: false
        });
        $('#ajaxSearch').keyup(function() {
            $('#resultado').html('');
            $('#state').val('');
            var searchField = $('#ajaxSearch').val();
            var expression = new RegExp(searchField, "i");
            $.getJSON(PRODUCTS_URL, function(data) {
                $('#resultado').empty();
                $.each(data, function(key, product) {

                    if (product.name.search(expression) != -1 || product.description.search(expression) != -1) {

                        $('#resultado').append('<li class="list-group-item link-class"><img src="' + product.imgSrc + '" height="40" width="40" class="img-thumbnail" /> ' + product.name + ' | <span class="text-muted">' + product.cost + '</span></li>');
                    }
                });
            });
        });
        $('#resultado').on('click', 'li', function() {
            var click_text = $(this).text().split('|');
            $('#ajaxSearch').val($.trim(click_text[0]));
            $("#resultado").html('');
        });

        $('body').on('click', function() {
            $('#ajaxSearch').val("");
            $('#resultado').empty();
        });

    });



});