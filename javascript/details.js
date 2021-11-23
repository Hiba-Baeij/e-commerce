
let details= JSON.parse(localStorage.getItem('detailsElement'));
//details product
window.addEventListener('load',()=>{
    let divRow = document.createElement("div");
    divRow.className = "row";
    console.log(divRow);
    let cardDetail=document.getElementById('cardDetail')
    divRow.innerHTML=`
    <div class="col-lg-8 col-sm-12">
        <h4>${details.name}</h4>
        <p>${details.description} Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum earum eligendi aut nihil, quisquam nobis id atque numquam libero similique. Sunt beatae quo nemo nihil, iure cum perferendis blanditiis quas!</p>
        <div class="d-flex justify-content-between">
            <span>${details.category}</span>
            <strong>${details.price}$</strong>
        </div>
        <div class=" d-flex justify-content-center align-items-center ">
            <button id="detailsBtns"> Buy Now <i class="fas fa-shopping-cart m-2"></i></button>
        </div>    
    </div>
    <div class="col-lg-4 col-sm-12">
        <img src="${details.image}" alt="">
    </div> 
    
    `
    cardDetail.append( divRow);  
    let detailsBtns=document.getElementById('detailsBtns') ;
    detailsBtns.addEventListener('click',()=>{
      detailsBtns=details.id;
      console.log(detailsBtns)
      addToCart(details)

    })

  //to add details product to cart
  function addToCart(element) {
  let cart = localStorage.getItem("cartProducts");
  if (!cart) {
    let cartProducts = [];
    cartProducts.push({ ...element, inCart: 1 });
    let totalPrice = element.price;
    localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    localStorage.setItem("totalPrice", totalPrice);
    console.log(" cart is empty");
  } else {
    console.log(" cart is not empty");
    let cartProducts = JSON.parse(cart);
    let totalPrice = +localStorage.getItem("totalPrice");
    // console.log(element)
    let index = cartProducts.findIndex((el) => el.id == element.id);
    if (index != -1) {
      cartProducts[index].inCart++;
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
      totalPrice += element.price;
      localStorage.setItem("totalPrice", totalPrice);
      //  console.log('element found in cart')
    } else {
      cartProducts.push({ ...element, inCart: 1 });
      totalPrice += element.price;
      localStorage.setItem("totalPrice", totalPrice);
      //  console.log('element not found in cart')
      localStorage.setItem("cartProducts", JSON.stringify(cartProducts));
    }
  }
}


})
    
    
