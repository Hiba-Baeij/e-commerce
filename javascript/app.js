let AddedProducts = JSON.parse(localStorage.getItem("productsList"));
let rowComponent = document.getElementById("cardsRow");
let cardComponent;
let products = [
  {
    id: 1,
    name: "Jacket",
    image: "https://unsplash.com/photos/_3Q3tsJ01nc/download?force=true",
    category: "clothes",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis eligendi nihil autem molestias",
    date: "2021-09-18",
    price: 15,
    inCart: 0,
  },
  {
    id: 2,
    name: "T-shirt",
    image: "https://unsplash.com/photos/TT-ROxWj9nA/download?force=true",
    category: "clothes",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis eligendi nihil autem molestias",
    date: "2021-09-18",
    price: 12,
    inCart: 0,
  },

  {
    id: 3,
    name: "Shirt",
    image: "https://unsplash.com/photos/Bcnk40f0VtM/download?force=true",
    category: "clothes",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis eligendi nihil autem molestias",
    date: "2021-09-18",
    price: 17,
    inCart: 0,
  },
  {
    id: 4,
    name: "White Blouse",
    image:
      "https://images.unsplash.com/flagged/photo-1559502867-c406bd78ff24?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1532&q=80",
    category: "clothes",
    description:
      "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Omnis eligendi nihil autem molestias",
    date: "2021-09-18",
    price: 35,
    inCart: 0,
  },
];
 localStorage.setItem('products',JSON.stringify( products))
 
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
// card products
window.addEventListener("load", () => {
  products.forEach((element) => {
    let mainCard = `
                   <div class="col-lg-3 mb-4">
                          <div class="card" >
                                <div class="main position-relative">
                                      <img  src=${element.image} alt="">
                                      <div class="overlay position-absolute" style="display:none;"><button class="remove-button" id="${element.id}"><i class="fas fa-trash-alt"></i></button></div>
                                </div>    
                                <div class="details ">
                                      <div class="details-text">
                                            <h4 >${element.name}</h4>
                                            <p>${element.description} </p>
                                            <div class="d-flex justify-content-between ">
                                                  <span>${element.category}</span>
                                                  <strong>${element.price}$</strong>
                                            </div>
                                            <p>${element.date}</p>
                                      </div>
                                      <div class=" d-flex justify-content-center">
                                            <button type="button"  class="add-to-cart" id="${element.id}">Add To Cart</button>
                                            <a href="detail.html"  class="details-btns" id="${element.id}">Details</a>
                                      </div>
                                </div>
                          </div>
                    </div>`;
    rowComponent.insertAdjacentHTML("beforeend", mainCard);
  });
  //card products add
  if (AddedProducts) {
      AddedProducts.forEach((element) => {
        products.push(element);
        cardComponent = ` 
              <div class="col-lg-3 mb-4">
                    <div class="card" >
                          <div class="main position-relative">
                                <img  src=${element.image} alt="">
                                <div class="overlay position-absolute" style="display:none;"><button class="remove-button" id="${element.id}"><i class="fas fa-trash-alt"></i></button></div>
                          </div>    
                          <div class="details ">
                                <div class="details-text">
                                      <h4 >${element.name}</h4>
                                      <p>${element.description} </p>
                                      <div class="d-flex justify-content-between ">
                                            <span>${element.category}</span>
                                            <strong>${element.price}$</strong>
                                      </div>
                                      <p>${element.date}</p>
                                </div>
                                <div class=" d-flex justify-content-center">
                                      <button type="button"  class="add-to-cart" id="${element.id}">Add To Cart</button>
                                      <a href="detail.html" class="details-btns" id="${element.id}">Details</a>
                                </div>
                          </div>
                    </div>
              </div>
          `
        rowComponent.insertAdjacentHTML("beforeend", cardComponent);
      });
    }
  let removeBtns=rowComponent.getElementsByClassName('remove-button');
  let addBtns = rowComponent.getElementsByClassName("add-to-cart");
  let detailsBtns = rowComponent.getElementsByClassName("details-btns");
  let filterBtns=document.getElementsByClassName('btn');
    //remove products card 
  for (const item of removeBtns) {
    console.log(item)
    item.addEventListener("click", () => {
      AddedProducts=AddedProducts.filter(el => el.id != item.id);
      localStorage.setItem("productsList", JSON.stringify(AddedProducts));
      location.reload();
  
    })
  }
  
  // Add events for  Add to cart Btns
  for (const item of addBtns) {
    item.addEventListener("click", () => {
      let element = products.find((el) => el.id == item.id);
      addToCart(element);
    });
  }
  // Add events for  Details btns
  for (const item of detailsBtns) {
    item.addEventListener("click", () => {
      let element = products.find((el) => el.id == item.id);
      localStorage.setItem("detailsElement" ,JSON.stringify(element))
 
    });
  }
  //function filter for card product
  function filterProducts(keyWord) {
      let filterdData = products.filter((el) => el.category == keyWord);
      rowComponent.innerHTML = "";
      if (keyWord == "All")
      filterdData=products;
      filterdData.forEach((element) => {
        let cardComponent = ` 
                <div class="col-lg-3 ">
                      <div class="card" >
                            <div class="main position-relative">
                                  <img  src=${element.image} alt="">
                                  <div class="overlay position-absolute"><button class="removeButton" id="${element.id}"><i class="fas fa-trash-alt"></i></button></div>
                            </div>    
                            <div class="details ">
                                  <div class="details-text">
                                        <h4 >${element.name}</h4>
                                        <p>${element.description} </p>
                                        <div class="d-flex justify-content-between ">
                                              <span>${element.category}</span>
                                              <strong>${element.price}$</strong>
                                        </div>
                                        <p>${element.date}</p>
                                  </div>
                                  <div class=" d-flex justify-content-center">
                                        <button type="button"  class="add-to-cart" id="${element.id}">Add To Cart</button>
                                        <a href="#" class="detailsBtns" id="${element.id}">Details</a>
                                  </div>
                            </div>
                      </div>
                </div>
            `;
        rowComponent.insertAdjacentHTML("beforeend", cardComponent);
      });
    }

    //filter butttons
  for (const item of filterBtns) {
      item.addEventListener('click',(event)=>{
            let keyWord=event.target.textContent;
            filterProducts(keyWord);
      })
  }

});





