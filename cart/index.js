let counterDisplayElem = document.querySelector('.counter-display');
let counterMinusElem = document.querySelector('.counter-minus');
let counterPlusElem = document.querySelector('.counter-plus');
let count = 0;
updateDisplay();

counterPlusElem.addEventListener("click",()=>{
    count++;
    updateDisplay();
}) ;

counterMinusElem.addEventListener("click",()=>{
    count--;
    updateDisplay();
});

function updateDisplay(){
    counterDisplayElem.innerHTML = count;
};

function getInputFromTextBox() {
    var input = document.getElementById("userInput").value;
    alert(input);
}



function update_amounts()
{
    var sum = 0.0;
    $('.table > tbody  > tr').each(function() {
        var qty = $(this).find('option:selected').val();
        var price = $(this).find('.price').val();
        var amount = (qty*price)
        sum+=amount;
        $(this).find('.amount').text(''+amount);
    });

    $('.total').text(sum);
}

update_amounts();
$('.qty').change(function() {
    update_amounts();
});