document.addEventListener("DOMContentLoaded", () => {

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
                $('#resultado').empty(); //limpio resultados para que no se dupliquen
                $.each(data, function(key, product) {
                    if (product.name.search(expression) != -1 || product.description.search(expression) != -1) {
                        $('#resultado').append('<li class="list-group-item link-class"><img src="' + product.imgSrc + '" height="40" width="40" class="img-thumbnail" /> ' + product.name + '<span class="text-muted">' + product.cost + " " + product.currency + '</span></li>');
                    }
                });
            });
        });
        $('#resultado').on('click', 'li', function() {
            var click_text = $(this).text().split('|');
            alert(click_text); //muestro el resultado selecionado
            $('#ajaxSearch').val($.trim(click_text[0]));
            $("#resultado").html('');
        });

        //si cliquean fura del cuadro de busqueda borro el texto escrito y elimino los resultados
        $('body').on('click', function() {
            $('#ajaxSearch').val("");
            $('#resultado').empty();
        });

    });



});