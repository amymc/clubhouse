(function(){

    function changeQuantity() {

        $('.quantity-button').click(function(event) {
            event.preventDefault();

            var $button = $(this);
            var input = $button.closest('.quantity').find('input');
            var oldValue = $(input).val();

            if ($button.text() == "+") {
                // Don't allow incrementing above 10
                if (oldValue < 10) {
                    newVal = parseFloat(oldValue) + 1;
                }
               else {
                    newVal = 10;
                }
            }
            else {
                // Don't allow decrementing below 1
                if (oldValue > 1) {
                    newVal = parseFloat(oldValue) - 1;
                }
                else {
                    newVal = 1;
                }
            }

            $button.closest('.product').find('input').val(newVal);
            updateCost.call(input);
        });
    }

    function updateCost(){
       
        var val = $(this).val();

        //prevent user from entering value less than 1 or greater than 10
        if ( val !== ''){
            if (val < 1){
                $(this).val(1);
            }
            else if (val > 10){
                $(this).val(10);
            }
        }

        var parentRow = $(this).closest('.product');
        var price = $(parentRow).find('.price').data("price");
        var cost = parseFloat(val * price).toFixed(2);

        $(parentRow).find('.cost').empty().append(cost);
        updateTotal();
    }


    function updateTotal(){
        var subtotal = 0, tax, grandTotal;

        $('.cost').each(function(){
            var cost = $(this).text();
            subtotal += parseFloat(cost);
        });

        $('#subtotal').empty().append(subtotal.toFixed(2));
        tax = subtotal * 0.2;
        $('#tax').empty().append(tax.toFixed(2));

        grandTotal = (tax + subtotal);
        $('#grand-total').empty().append(grandTotal.toFixed(2));

    }

    function purchaseItems(){

       var data = $('.product').map(function(){
            return {
                name: $.trim($(this).find('.name').text()),
                quantity: $(this).find('.item-quantity').val(),
                cost: $(this).find('.cost').text()
            };
        }).get();

        $.ajax({
            type: "POST",
            url: "",
            data: data,
            dataType: "json",
            success: function(){
                alert('purchase successful!');
            }
        });
    }

    $('input').keyup(updateCost);

    $('.purchase').click(function(event){
        event.preventDefault();
        purchaseItems();
    });

    $('.remove').click(function(event){
        event.preventDefault();
        var input = $(this).closest('.quantity').find('input');
        input.val(0);
        $(this).closest('.product').remove();
        updateCost.call(input);
    });


    return {
        changeQuantity: changeQuantity(),
    };
 
})();