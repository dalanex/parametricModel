
function clickSubmit() { 
    var width=document.getElementById('inputWidth').value;
    var height=document.getElementById('inputHeight').value;
    var depth=document.getElementById('inputDepth').value;
    var levels=document.getElementById('inputLevels').value;
    //alert("Width: " + width + " \nHeight: " + height + " \nDepth: " + depth + " \nLevels: " + levels);
   
    var numbers = /^[-+]?[0-9]+$/;
    if(width.match(numbers) && height.match(numbers) && depth.match(numbers) && levels.match(numbers))
    {
        fetch(`http://localhost:8000/${width}&${height}&${depth}&${levels}`)
        .then(response => {})
    } else { alert(" Please, introduce only numbers and without comma"); } 
}