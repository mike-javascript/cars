var cars = [
  {
    make: "Honda",
    model: "Civic",
    category: "ECONOMY",
    price: "$20,000",
    image: "Honda_Civic.jpg"
  },
  {
    make: "BMW",
    model: "M5",
    category: "SPORT",
    price: "$100,000",
    image: "bmw-m5.jpg"
  },
  {
    make: "Mercedes",
    model: "E-class",
    category: "LUXURY",
    price: "$50,000",
    image: "mercedes-e-class.jpg"
  },
  {
    make: "Toyota",
    model: "Rav4",
    category: "SUV",
    price: "$30,000",
    image: "toyota-rav4.jpg"
  },
  {
    make: "Audi",
    model: "A7",
    category: "LUXURY",
    price: "$80,000",
    image: "audi_a7.jpg"
  },
  {
    make: "Cadillac",
    model: "CT-6",
    category: "LUXURY",
    price: "$60,000",
    image: "cadillac-ct6.jpg"
  }
]; 

var mainDiv = document.getElementById("main");
var form = document.getElementById("formDiv");
var change = document.getElementById("showHide");
var btns = document.getElementById("btns");
var toAppendbtns = "";
var toAppendcars = "";

cars.sort(tri);
function tri(a, b) {
  if(a.category < b.category) {
     return -1;
  }
  if (a.category > b.category) {
    return 1;
  }
  return 0;
}

var arrCategory = [{categoryName: cars[0].category, list: [cars[0]]}];  
let lth = cars.length; 
for (let i = 1; i < lth; i++) {
  const car = cars[i];
  const cat = arrCategory[arrCategory.length -1];
  if (cat.categoryName == car.category) { 
    cat.list.push(car);
  } else {
    arrCategory.push({categoryName: car.category, list: [car]});
  }   
}

createbtnsOne();
function createbtnsOne() {
  toAppendbtns = ""
  arrCategory.forEach(createbtnsTwo)
  btns.innerHTML = toAppendbtns;
}

function createbtnsTwo(arr, i) {
  toAppendbtns += `<button id="btn${i}" onclick= createcars(${i})>${arr.categoryName}</button>`;
}

function createcars(x) {
  toAppendcars = ""; 
  arrCategory[x].list.forEach(addCars);
  mainDiv.innerHTML = toAppendcars;
}

function addCars(car, i) {
  toAppendcars +=
  `<div id="car${i}" class="eachCar">
    <h3 class="category">${car.category}</h3>
    <button onclick="t('${car.model}',this)">X</button>
    <img src="images/${car.image}" alt="">
    <p class="make">${car.make}</p>
    <p class="model">${car.model}</p>
    <p class="price">${car.price}</p>
  </div>`;
}

function t (x, btn) {
  for (let i = 0; i < arrCategory.length; i++) {
    for (let j = 0; j < arrCategory[i].list.length; j++) {
      if (x == arrCategory[i].list[j].model) {
        arrCategory[i].list.splice(j, 1);
        btn.parentElement.remove()
      }
    }
  }
}

function addCar() {
  var make = document.querySelector("#make");
  var model = document.querySelector("#model");
  var category = document.querySelector("#category");
  var price = document.querySelector("#price");
  var newCar = new Car(make.value, model.value, category.value, price.value);
  for (let i = 0; i < arrCategory.length; i++) {
    const element = arrCategory[i].categoryName;
    if(element == newCar.category) {
      arrCategory[i].list.push(newCar)
    }
  }
  
  make.value = "";
  model.value = "";
  category.value = "";
  price.value = "";
  createbtnsOne()
}

function Car(_make, _model, _category, _price, _image) {
  this.make = _make
  this.model = _model
  this.category = _category
  this.price = _price
  this.image = _image
}


function showHide() {
  if (form.style.display == "block") {
    form.style.display = "none";
    change.innerText = "Show Form";
  } else {
    form.style.display = "block";
    change.innerText = "Hide Form";
  }
}