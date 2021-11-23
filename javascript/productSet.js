
let  productsForm=document.getElementById('productsForm');
let productsList=[];

//to red image
const Image_Input = document.getElementById('inputImage');
var uploadedImg = "";

Image_Input.addEventListener('change',function()  {
    const reader = new FileReader()
    reader.addEventListener("load",() => {
        uploadedImg = reader.result;
    })
    reader.readAsDataURL(this.files[0])
})

// set product
let submitBtn = document.getElementById('inputButton')
submitBtn.addEventListener('click',()=>{
    const productData={
        name:document.getElementById('inputNameProduct').value,
        description:document.getElementById('inputDescription').value,
        date:new Date(),
        price:document.getElementById('inputPrice').value,
        category:document.getElementById('inputSelect').value,
        image:uploadedImg,
        id: Date.now()
    };
    console.log(productData)
    productsList.push(productData);
    localStorage.setItem('productsList', JSON.stringify(productsList));
})
// var retrievedObject = localStorage.getItem('productsList');
// console.log('retrievedObject: ', JSON.parse(retrievedObject));  



