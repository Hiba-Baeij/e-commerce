let clickSign = document.getElementById("sign");
let clickLog = document.getElementById("log");
let logOut = document.getElementById("logOut");
let logInNav = document.getElementById("logInNav");
let displayOverlay=document.getElementsByClassName('overlay');
let logedUser

//function register form

function signUp() {
  var users = [];
  var formDataSign = {
    firstName: document.getElementById("inputFirstName").value,
    lastName: document.getElementById("inputLastName").value,
    email: document.getElementById("inputEmail").value,
    password: document.getElementById("inputPassword").value,
    id: new Date().toISOString(),
  };
  users.push(formDataSign);
  localStorage.setItem("storageFormSign", JSON.stringify(users));
}
//function logIn form
function logIn() {
  var formDataLog = {
    email: document.getElementById("inputEmailLog").value,
    password: document.getElementById("inputPasswordLog").value,
    role: document.getElementById("inputSelect").value,
  };
  console.log(formDataLog.role);
  console.log(formDataLog);
  let showDataSign = JSON.parse(localStorage.getItem("storageFormSign"));
  console.log(showDataSign);
  let found = showDataSign.find(
    (element) => element.email == formDataLog.email
  );
  console.log(found);
  if (found.password == formDataLog.password) {
    logedUser = formDataLog;
    localStorage.setItem("storageFormLog", JSON.stringify(logedUser));
    if (formDataLog.role == "Manager") {
      let showAddButton = document.getElementById("showAdd");
      showAddButton.style.display = "block";
      logInNav.style.display = "none";
      logOut.style.display = "block";
    }
    logOut.onclick = function () {
      logedUser = null;
      localStorage.setItem("storageFormLog", JSON.stringify(logedUser));
      logOut.style.display = "none";
      logInNav.style.display = "block";
      let showAddButton = document.getElementById("showAdd");
      showAddButton.style.display = "none";
    };
  } else {
    alert("Email or Password is incorecct");
  }
}

// to log in all page
window.addEventListener('load',()=>{
 let getFormLog=JSON.parse(localStorage.getItem("storageFormLog"));
 console.log(getFormLog)
 if (getFormLog) {
  if (getFormLog.role == "Manager") {
    let showAddButton = document.getElementById("showAdd");
    showAddButton.style.display = "block";
    for (const item of displayOverlay) {
      item.style.display="block";
    }
    logInNav.style.display = "none";
    logOut.style.display = "block";
  }
  
  logOut.onclick = function () {
    logedUser = null;
    localStorage.setItem("storageFormLog", JSON.stringify(logedUser));
    logOut.style.display = "none";
    logInNav.style.display = "block";
    let showAddButton = document.getElementById("showAdd");
    showAddButton.style.display = "none";
  };
}
})
    //sign up
    if(clickSign)
    clickSign.addEventListener("click", () => {
         signUp();
        console.log("signup");
    });

    //log in
    
    if(clickLog)
    clickLog.addEventListener("click", () => {
     logIn();
    console.log("login");
  });



