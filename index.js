let myList = []
const inputEl = document.getElementById("input-el")
const inputBtn = document.getElementById("input-btn")
const olEl = document.getElementById("ol-el")
const clearBtn = document.getElementById("clear-btn")
const captureBtn = document.getElementById("capture-btn")
const undoBtn = document.getElementById("undo-btn")
const listFromLocalStorage = JSON.parse(localStorage.getItem("myList"))

if (listFromLocalStorage) {
    myList = listFromLocalStorage
    render(myList)
}

undoBtn.addEventListener("click", function() {
    myList.pop()
    render(myList)
})

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
            listItems += `<li> ${list[i]} </li>`
        }   
    olEl.innerHTML = listItems
}

clearBtn.addEventListener("click", function() {
    localStorage.clear()
    myList = []
    render(myList)
    console.log(localStorage.getItem("myList"))
})

inputBtn.addEventListener("click", function() {
    myList.push(inputEl.value)
    inputEl.value =""
    
    localStorage.setItem("myList", JSON.stringify(myList))
    console.log(localStorage.getItem("myList"))
    
    render(myList)

})

