# Shopping List

Write & Download your Shopping List in a minute!

- [Link](https://baonguyenpham.github.io/shopping-list/)
- [Vietnamese Version](https://baonguyenpham.github.io/di-cho/)

## How it works

1. ENTER your shopping items
2. ADD them to note
4. CLEAR to remove  
5. SAVE a screenshot.

*Your list is saved to browser unless your hit **CLEAR** so you can go back to them anytime of the day.*

## Project is built with 

### Languages

- HTML/CSS
- JavaScript
  - AddEventListener()
  - Push new value to array
  - Log out values with for loop
  - Create ordered list with innerHTML & template strings
  - Render ordered list
  - Local storage

### Sample code

#### When click **inputBtn** button, **push** new value to **myList** array, and **render** myList

```JavaScript

inputBtn.addEventListener("click", function() {
    myList.push(inputEl.value)
    inputEl.value =""
    render(myList)
})

```

#### Save, render out, and clear localStorage values

##### Save and test

```JavaScript

localStorage.setItem("myList", JSON.stringify(myList)) // (key, value)
console.log(localStorage.getItem("myList"))

```

##### Render out

```JavaScript

let listFromLocalStorage = JSON.parse(localStorage.getItem("myList"))

if (listFromLocalStorage) {
  myList = listFromLocalStorage
  render(myList)
}

```

##### Clear 

```JavaScript

localStorage.clear()

```

## See more
- [To-do List](https://github.com/baonguyenpham/todo-list)

