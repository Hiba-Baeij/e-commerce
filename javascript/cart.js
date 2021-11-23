let total = document.getElementById("total");
let table = document.getElementById("cartTable");
// products cart
window.addEventListener("load", () => {
  let products = JSON.parse(localStorage.getItem("cartProducts"));
  let totalPrice = localStorage.getItem("totalPrice");
  if (products) {
    products.forEach((item) => {
      let tr = document.createElement("tr");
      tr.innerHTML = 
      `
      <td><img height='100px' width='100px' src="${item.image} " alt=""></td>
      <td><p>${item.name}</p></td>
      <td><input class="input" min="1" type="number" value="${item.inCart}" id="${item.id}"></td>
      <td><span>${item.price}$</span></td>
      <td><span class="total">${item.inCart * item.price}$</span></td>
      <td><button type="button" class="remove" id="${item.id}"><i class="fas fa-trash-alt"></i></button></td>
      `;
      table.append(tr);
      
    });
    total.innerHTML = totalPrice;
  }
 
});

let del = table.getElementsByClassName("remove");
let changeInputValue=table.getElementsByClassName('input')
let totalPrice = +localStorage.getItem("totalPrice");
// remobve buttons cart
table.addEventListener("click", (ev) => {
  let cartList = JSON.parse(localStorage.getItem("cartProducts"));
  let mybtn;
  if (ev.target.nodeName === "BUTTON") {
    mybtn = ev.target;
  } else {
    mybtn = ev.target.parentElement;
  }
  if (mybtn.nodeName === "BUTTON") {
    let deleted = cartList.find(el => el.id == mybtn.id);
    cartList = cartList.filter(el=>el.id != mybtn.id);
    console.log(deleted)
    totalPrice = totalPrice -= +deleted.price * +deleted.inCart;
    localStorage.setItem("cartProducts", JSON.stringify(cartList));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    location.reload();
  }
});
// chnge quantity cart
table.addEventListener("input", (ev) => {
  let cartList = JSON.parse(localStorage.getItem("cartProducts"));
  let totalPrice = +localStorage.getItem("totalPrice");
  let myInput,inputValue;
  if (ev.target.nodeName === "INPUT") {
    myInput = ev.target;
    inputValue=myInput.value;
    console.log(inputValue)
  } else {
    myInput = ev.target.parentElement;
  }
  if (myInput.nodeName === "INPUT") {
    let changed = cartList.find(el => el.id == myInput.id);
    totalPrice = totalPrice -= +changed.price * +changed.inCart;
    localStorage.setItem("cartProducts", JSON.stringify(cartList));
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    changed.inCart=inputValue;
    localStorage.setItem("cartProducts", JSON.stringify(cartList));
    totalPrice += +changed.price * +changed.inCart;
    console.log(totalPrice);
    localStorage.setItem("totalPrice", JSON.stringify(totalPrice));
    location.reload();
    
  }
})





    