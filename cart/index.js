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

$(function()
{

    var $overall = 0;

    $("tr.sum").each(function()
    {

        var $qnt = $(this).find("td").eq(1);
        var $price = $(this).find("td").eq(2);

        console.log($qnt+" | "+$price);

        var sum = parseFloat($price.text()) * parseFloat($qnt.text());

        $(this).find("td").eq(3).text(sum);
        
        $overall+= sum;

    });
    
    $(".total").text($overall);

});