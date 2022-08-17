//array
let myList = []
let myPrice = []
let oldList = []
let budget = ""
let warningInBudget = [
    "Hooray! You're still within budget. 😍", 
    "Woo-hoo! Happy shopping! 🎉", 
    "Whoopee! You're still within budget. 🥳"
]
let warningOutBudget = [
    "Oh no! You've run out of budget. 😭", 
]

//My budget and sum
const budgetEl = document.getElementById("budget-el")
const myBudget = document.getElementById("my-budget")
const sumEl = document.getElementById("sum-el")
const prevBudgetEl = document.getElementById("prev-budget-el")
const prevSumEl = document.getElementById("prev-sum-el")

//Input list and price
const inputEl = document.getElementById("input-el")
const priceEl = document.getElementById("price-el")

//Submit and input button
const submitBtn = document.getElementById("submit-btn")
const inputBtn = document.getElementById("input-btn")
const inputNewBtn = document.getElementById("input-btn-new")
const inputContainer = document.getElementById("input-container")

// List & Price items to render 
const listItem = document.getElementById("list-item")
const priceItem = document.getElementById("price-item")

//Clear, capture, location button
const clearBtn = document.getElementById("clear-btn")
const captureBtn = document.getElementById("capture-btn")

//LocalStorage
let listFromLocalStorage = JSON.parse( localStorage.getItem("myList") )
let priceFromLocalStorage = JSON.parse(localStorage.getItem("myPrice"))
let budgetFromLocalStorage = JSON.parse(localStorage.getItem("Budget"))
let sumFromLocalStorage = localStorage.getItem("Sum")

//close-btn and remove child
const closeBtn = document.getElementsByClassName("close")

//warning
const warningEl = document.getElementById("warning-el")


//render budget and sum from Local Storage
if (budgetFromLocalStorage) {
  let budget = budgetFromLocalStorage
  budgetEl.textContent = ""
  budgetEl.textContent = "New budget: "
  prevBudgetEl.textContent = "Your budget last time:" + " $" + budget
  prevBudgetEl.style.display = "block"
}

if (sumFromLocalStorage) {
  let sum = sumFromLocalStorage
  sumEl.textContent = ""
  prevSumEl.textContent = "Last time you've spent:" + " $" + sum
  prevSumEl.style.display = "block"
}


//onclick captureBtn, take a screenshot
captureBtn.addEventListener("click", function() {
    myBudget.style.display = "none"
    submitBtn.style.display = "none"
    inputContainer.style.display = "none"
    prevBudgetEl.style.display = "none"
    warningEl.textContent = ""
    html2canvas(document.body).then((canvas) => {
    let a = document.createElement("a");
    a.download = "shopping-list.png";
    a.href = canvas.toDataURL("image/png");
    a.click()
  })
})


//onclick submitBtn, display Budget
submitBtn.addEventListener("click", function() {
    if(myBudget.value) {
        inputContainer.style.display = "block"
        inputBtn.style.display = "block" 
        
        myBudget.style.display = "none"
        submitBtn.style.display = "none"
        prevBudgetEl.style.display = "none"
        prevSumEl.style.display = "none"
        
        myList = []
        myPrice = []
        
        renderList(myList)
        renderPrice(myPrice)
        
        budgetEl.textContent = "My budget:" + " $" + myBudget.value
        
        
        let x = myBudget.value
        localStorage.setItem("Budget", JSON.stringify(x))
    } else {
        alert("Please enter your budget")
    }
    
  })


//renderList
function renderList(list) {
    let listItems = ""
    for (let i = 0; i < list.length; i++) {
      listItems += `
        <li>
          ${list[i]}
          <span class="close">
            <button>\u00D7</button>
          </span>
        </li>`
    }
    listItem.innerHTML = listItems
    
    //onclick clostBtn
    for (let i=0; i < closeBtn.length; i++) {
      closeBtn[i].onclick = function() {
        this.parentNode.remove()
        let index = myList.indexOf(closeBtn[i])
        myList.splice(index, 1)
        let index2 = myPrice.indexOf(closeBtn[i])
        myPrice.splice(index, 1)
        sumPrice(myPrice)
        console.log(myPrice)
      }
    } 
}


//renderPrice
function renderPrice(price) {
    let priceItems = ""
    for (let i = 0; i < price.length; i++) {
      priceItems += `
        <li id="price-list-item">
          $${price[i]}
        </li>`
    }
    priceItem.innerHTML = priceItems
  }


//onclick clearBtn
clearBtn.addEventListener("click", function() {
    localStorage.clear()
    
    budgetEl.textContent = "My budget:" 
    sumEl.textContent = "" 
    myBudget.value = ""
    warningEl.textContent = ""
    
    myBudget.style.display = "block"
    submitBtn.style.display = "block"
    inputContainer.style.display = "none"
    prevBudgetEl.style.display = "none"
    prevSumEl.style.display = "none"
    
    myList = []
    myPrice = []
    renderList(myList)
    renderPrice(myPrice)
})

//onclick inputBtn
inputBtn.addEventListener("click", function() {
    if (inputEl.value && priceEl.value) {
        myList.push(inputEl.value)
        inputEl.value = ""
        myPrice.push(priceEl.value)       
        priceEl.value = ""
        
        localStorage.setItem("myList", JSON.stringify(myList))
        localStorage.setItem("myPrice", JSON.stringify(myPrice))

        
        renderList(myList) 
        renderPrice(myPrice)
        sumPrice(myPrice)        
    } else {
        alert("Please enter item/price.")
    }
    
})

//sumPrice
function sumPrice(price) {
    let totalPrice = 0
    sumEl.textContent = "Sum:" + " $" + "0"
    warningEl.textContent = ""
    for (i = 0; i < price.length; i++) {
        totalPrice += Number(price[i])
        sumEl.textContent = "Sum:" + " $" + (totalPrice.toFixed(2))
        console.log(totalPrice)
              
        let y = totalPrice
        localStorage.setItem("Sum",y.toString())
        if (totalPrice <= Number(myBudget.value)) {
            let randomText = Math.floor(Math.random()*warningInBudget.length)
            warningEl.textContent = warningInBudget[randomText]
            sumEl.style.color = "#00A300"
        } else {
            let randomText2 = Math.floor(Math.random()*warningOutBudget.length)
            warningEl.textContent = warningOutBudget[randomText2]
            sumEl.style.color = "red"
        }
    }
} 


//onclick listItem, strikethrough & check
listItem.addEventListener("click", function(ev) {
  if(ev.target.tagName==="LI")
  ev.target.classList.toggle("checked")
})

myBudget.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        event.preventDefault()
        document.getElementById("submit-btn").click()
    }
})

priceEl.addEventListener("keypress", function(event) {
    if(event.key === "Enter") {
        event.preventDefault()
        document.getElementById("input-btn").click()
    }
})




/*

// render localStorage

if (priceFromLocalStorage) {
    let myPrice = priceFromLocalStorage
    renderPrice(myPrice)
  }
  
if (listFromLocalStorage) {
   let myList = listFromLocalStorage
   renderList(myList)
 }
 
 */

//function sumPrice

/* function sum(numbers){
  var x = numbers.reduce(function(prev,curr){
    return curr + prev;
  },0);
  return x;
}

alert(sum([1,2,3]));
alert(sum([])); */

/* var sum = array.reduce(function(a, b){
        return a + b;
    }, 0); */


 
