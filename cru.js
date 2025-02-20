let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");
let search = document.getElementById("search");
let searchtitle = document.getElementById("searchtitlebtn");
let creatmood = "create";

let temp;

//get total

function gettotal() {
  if (price.value != "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "red";
  } else {
    total.innerHTML = "";
    total.style.background = "#337e11";
  }
}

let myArray;
if (localStorage.data != null) {
  myArray = JSON.parse(localStorage.getItem("data"));
} else {
  myArray = [];
}

submit.onclick = function () {
  let product = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };

  if (title.value != "" && price.value != "" && count.value <= 100) {
    if (creatmood === "create") {
      if (product.count > 1) {
        for (let i = 0; i < product.count; i++) {
          myArray.push(product);
        }
      } else {
        myArray.push(product);
      }
    } else {
      myArray[temp] = product;
      creatmood = "create";
      submit.innerText = "Creat";
      count.style.display = "block";
    }
    clearData();
  }

  localStorage.setItem("data", JSON.stringify(myArray));
  showData();
};

// clear data

function clearData() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  total.innerHTML = "";
  count.value = "";
  category.value = "";
}

// Read Data

function showData() {
  let table = "";
  for (let i = 0; i < myArray.length; i++) {
    table += `
        <tr>
        <td>${i + 1}</td>
        <td>${myArray[i].title}</td>
        <td>${myArray[i].price}</td>
        <td>${myArray[i].taxes}</td>
        <td>${myArray[i].ads}</td>
        <td>${myArray[i].discount}</td>
        <td>${myArray[i].total}</td>
        <td>${myArray[i].category}</td>
        <td><button onclick="updataData(${i})" id="update">update</button></td>
        <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
       `;
  }
  document.getElementById("tbody").innerHTML = table;
  let DeletAlleBtn = document.getElementById("deletallebtn");
  if (myArray.length > 0) {
    DeletAlleBtn.innerHTML = `
       <button onclick="deleteAll()">Delete All (${myArray.length})</button>
         `;
  } else {
    DeletAlleBtn.innerHTML = "";
  }
}
showData();
//delte
function deleteData(i) {
  myArray.splice(i, 1);
  localStorage.data = JSON.stringify(myArray);
  showData();
}
function deleteAll() {
  localStorage.clear();
  myArray.splice(0);
  showData();
}

// update Data

function updataData(i) {
  title.value = myArray[i].title;
  price.value = myArray[i].price;
  taxes.value = myArray[i].taxes;
  ads.value = myArray[i].ads;
  discount.value = myArray[i].discount;
  gettotal();
  count.style.display = "none";
  category.value = myArray[i].category;
  submit.innerHTML = "update";
  creatmood = "update";
  temp = i;
  scroll({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}

// search

let searchMood = "title";
function getsearchmood(id) {
  if (id == "searchtitlebtn") {
    searchMood = "title";
  } else {
    searchMood = "Category";
  }
  search.placeholder = "search by " + searchMood;
  search.focus();
  search.value = "";
  showData();
}
function searchData(value) {
  let row = "";
  for (let i = 0; i < myArray.length; i++) {
    if (searchMood == "title") {
      if (myArray[i].title.includes(value.toLowerCase())) {
        row += `
                <tr>
                <td>${i}</td>
                <td>${myArray[i].title}</td>
                <td>${myArray[i].price}</td>
                <td>${myArray[i].taxes}</td>
                <td>${myArray[i].ads}</td>
                <td>${myArray[i].discount}</td>
                <td>${myArray[i].total}</td>
                <td>${myArray[i].category}</td>
                <td><button onclick="updataData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
               `;
      }
    } else {
      if (myArray[i].category.includes(value.toLowerCase())) {
        row += `
                <tr>
                <td>${i}</td>
                <td>${myArray[i].title}</td>
                <td>${myArray[i].price}</td>
                <td>${myArray[i].taxes}</td>
                <td>${myArray[i].ads}</td>
                <td>${myArray[i].discount}</td>
                <td>${myArray[i].total}</td>
                <td>${myArray[i].category}</td>
                <td><button onclick="updataData(${i})" id="update">update</button></td>
                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                </tr>
               `;
      }
    }
  }
  document.getElementById("tbody").innerHTML = row;
}

// linked kh
