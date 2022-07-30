let myList = []
const inputEl = document.getElementById("input-el")
const budgetEl = document.getElementById("budget-el")
const myBudget = document.getElementById("my-budget")
const inputBtn = document.getElementById("input-btn")
const olEl = document.getElementById("ol-el")
const clearBtn = document.getElementById("clear-btn")
const captureBtn = document.getElementById("capture-btn")
const saveBtn = document.getElementById("save-btn")
const listFromLocalStorage = JSON.parse(localStorage.getItem("myList"))
let closeBtn = document.getElementsByClassName("close")
const announce = document.getElementById("announce-box") 
const announceCloseBtn = document.querySelectorAll("announce-close-btn")


// https://code-boxx.com/take-screenshots-javascript/

captureBtn.addEventListener("click", function() {
    html2canvas(document.body).then((canvas) => {
    let a = document.createElement("a");
    a.download = "shopping-list.png";
    a.href = canvas.toDataURL("image/png");
    a.click()
  })
})

function render(list) { // list is a parameter
    let listItems = ""
    
    for (let i = 0; i < list.length; i++) {
            listItems += `
            <li> 
                ${list[i]} 
                <span class="close">
                    <button>
                        \u00D7
                    </button>
                </span>
             </li>`
        }   
    olEl.innerHTML = listItems
    
    for (let i = 0; i < closeBtn.length; i++) {
    closeBtn[i].onclick = function() {
        this.parentNode.remove()

    }
}
    
}

olEl.addEventListener("click", function(ev){ //ev is self click // can use any parameter here
    if(ev.target.tagName==="LI") {
        ev.target.classList.toggle("checked") //toggle() method toggles between hide() & show()
    }
})


clearBtn.addEventListener("click", function() {
    localStorage.clear()
    myBudget.textContent = "Your budget today:" + ""
    budgetEl.style.display = "block"
    myList = []
    render(myList)
    

})

inputBtn.addEventListener("click", function() {
    myList.push(inputEl.value)
    inputEl.value ="" 
    myBudget.textContent = "Your budget today: " + "$" + budgetEl.value
    budgetEl.style.display = "none"
    
    localStorage.setItem("myList", JSON.stringify(myList))
    console.log(localStorage.getItem("myList"))
    render(myList)
})

if (listFromLocalStorage) {
    myList = listFromLocalStorage
    render(myList)
}

saveBtn.addEventListener("click", function() {
    announce.innerHTML = `
    <p class="announce-text hidden">
        Your list is saved!
        <span >
            <button class="announce-close" id="announce-close-btn">
                \u00D7
            </button>
        </span>
    </p>`

    render(myList)
    
})
