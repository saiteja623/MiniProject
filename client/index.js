//creates a button
function applyProperties(text)
{
    var btn=document.createElement("BUTTON");
    btn.innerHTML=text;
    btn.style.margin="20px auto";
    btn.style.padding="4px 8px";
    return btn;
}

var ele1=document.getElementById("wishlistButtonStack");
var btn=applyProperties("Track the product");
ele1.appendChild(btn);
btn.addEventListener("click",function(e){
    e.preventDefault();
    change(btn,ele1);
});


//this should ask the user for the details of the product
function change(btn,ele)
{
    const url=window.location.href;
    //remove the button and add two inputs
    //1- email and 2- price of the product
    ele.removeChild(btn);
    var emailLabel=createLabel("Email");
    ele.appendChild(emailLabel);
    var input1=createEmailInput();
    ele.appendChild(input1);
    var priceLabel=createLabel("Enter the desired price");
    ele.appendChild(priceLabel);
    var priceInput=createPriceInput();
    ele.appendChild(priceInput);
    let btn2=applyProperties("Track the product");
    ele.appendChild(btn2);
    btn2.addEventListener("click",function(e){
        e.preventDefault();
        sendEmail(input1.value,priceInput.value,url);
    })
    
}


//creates a label element
function createLabel(inputText)
{
    var x = document.createElement("LABEL");
    var t = document.createTextNode(inputText);
    x.appendChild(t);
    x.style.margin="10px auto";
    return x;

}

//creates a input element
function createEmailInput()
{
    var input=document.createElement("input");
    input.setAttribute("type","email");
    input.setAttribute("name","email");
    input.setAttribute("id","email");
    input.style.width="100%";
    input.style.padding="4px 8px";
    input.style.margin="10px auto";
    return input;
}   

//creates input for the price
function createPriceInput()
{
    var input=document.createElement("input");
    input.setAttribute("type","number");
    input.setAttribute("name","price");
    input.setAttribute("id","price");
    input.style.width="100%";
    input.style.padding="4px 8px";
    input.style.margin="10px auto";
    return input;
}



//used to send a request to the server
async function sendEmail(email,price,url)
{
    const options={
        email:email,
        url:url,
        price:price
    }
    const response= await fetch("http://localhost:5000/sendmail",{
        method:'POST',
        headers:{
            'Content-Type':'application/json'
        },
        credentials:'include',
        body:JSON.stringify(options)
    }) 
    console.log(response);
}

