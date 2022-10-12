var button=document.getElementById('button')

var inputvalue=document.getElementById('inputvalue')

var displayDiv=document.getElementById('displayDiv')


button.addEventListener('click',function(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+inputvalue.value+'&appid=3b5bf9fff32fbb83f6be69df59404dfe')
    .then(Response=>Response.json())
    .then(data=>{
        console.log(data)
        displayDiv.innerHTML=JSON.stringify(data);
    }
    
    )
    
    .catch(err=>alert("Invalid"));
})