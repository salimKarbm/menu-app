menuItems()
selectMenuItems()
calculateItemPrice()
processOrder()

//array to store orders
const orderItem = []

//function to display drinks in their respective categories
function menuItems() {
  const items = [
    { category: 'vodka', name: '42 below', price: 17 },
    { category: 'vodka', name: 'absolut', price: 12 },
    { category: 'vodka', name: 'ciroc', price: 10 },
    { category: 'vodka', name: 'belvedere', price: 15 },
    { category: 'rum', name: 'don q gold', price: 17 },
    { category: 'rum', name: 'bacardi', price: 20 },
    { category: 'rum', name: 'el dorado 5yrs', price: 17 },
    { category: 'whiskey', name: 'crown royal', price: 15 },
    { category: 'whiskey', name: 'jack daniels', price: 17 },
    { category: 'whiskey', name: 'jameson 18yrs', price: 22 },
    { category: 'whiskey', name: 'bushmills', price: 8 },
    { category: 'gin', name: 'new Amsterdam', price: 17 },
    { category: 'gin', name: 'voyeger WA', price: 22 },
    { category: 'gin', name: "hendrick's", price: 11 },
  ]
  const vodka = document.querySelector('.vodka')
  const rum = document.querySelector('.rum')
  const whiskey = document.querySelector('.whiskey')
  const gin = document.querySelector('.gin')
  let vodkaItem = ''
  let rumItem = ''
  let whiskeyItem = ''
  let ginItem = ''
  items.forEach((items, index) => {
    if (items.category === 'vodka') {
      vodkaItem += `
        <div class="volka">
          <div  class="item-wrapper">
          <input type="checkbox" class="select">
          <p class="items">
            <span class="">${items.name}</span>
            <span class="price">$${items.price}</span>
            <input type="number" placeholder="How many?" class="numOfItems">
            </p>
         </div>
       </div>`
      vodka.innerHTML = vodkaItem
    } else if (items.category === 'rum') {
      rumItem += `
      <div class="rum">
        <div  class="item-wrapper">
        <input type="checkbox" class="select">
        <p class="items">
          <span class="">${items.name}</span>
          <span class="price">$${items.price}</span>
          <input type="number" placeholder="How many?" class="numOfItems">
          </p>
       </div>
     </div>`
      rum.innerHTML = rumItem
    } else if (items.category === 'whiskey') {
      whiskeyItem += `
      <div class="whiskey">
        <div  class="item-wrapper">
        <input type="checkbox" class="select">
        <p class="items">
          <span class="">${items.name}</span>
          <span class="price">$${items.price}</span>
          <input type="number" placeholder="How many?" class="numOfItems">
          </p>
       </div>
     </div>`
      whiskey.innerHTML = whiskeyItem
    } else if (items.category === 'gin') {
      ginItem += `
      <div class="gin">
        <div  class="item-wrapper">
        <input type="checkbox" class="select">
        <p class="items">
          <span class="">${items.name}</span>
          <span class="price">$${items.price}</span>
          <input type="number" placeholder="How many?" class="numOfItems">
          </p>
       </div>
     </div>`
      gin.innerHTML = ginItem
    }
  })
  const numOfItems = document.querySelectorAll('.numOfItems')
  numOfItems.forEach(function (item) {
    item.style.display = 'none'
  })
}

function selectMenuItems() {
  //get menu container div
  const category = document.querySelector('.menu')
  //add event listener
  category.addEventListener('click', displayInput)
}
//listen for event on menu item click
function displayInput(e) {
  if (e.target.checked) {
    //get the p element
    const items = e.target.nextElementSibling.children
    //hide the item name
    items[0].style.display = 'none'
    //hide the item price
    items[1].style.display = 'none'
    //display input to enter number of items
    items[2].style.display = 'block'
    calculateItemPrice()
  } else {
  }
}

//calculate price of items
function calculateItemPrice() {
  //get input
  const quantity = document.querySelectorAll('.numOfItems')
  quantity.forEach(function (item) {
    //listen for an event
    item.addEventListener('input', getItemPrice)
  })
}
function getItemPrice(e) {
  //get price of single item
  const singleItemPrice = e.target.previousElementSibling.innerText
  const itemName =
    e.target.previousElementSibling.previousElementSibling.textContent
  //remove the dollar sign
  const price = parseInt(singleItemPrice.slice(1))
  //get number of items
  const qty = parseInt(e.target.value)
  //hide input
  e.target.style.display = 'none'
  //show item name
  e.target.previousElementSibling.style.display = 'block'
  //show item price
  e.target.previousElementSibling.previousElementSibling.style.display = 'block'
  //get the price of  items
  const newPrice = qty * price
  //push ordered item
  orderItem.push({ name: itemName, quantity: qty, price: newPrice })
}

//process ordered items
function processOrder() {
  const processBtn = document.querySelector('.process-btn')
  processBtn.addEventListener('click', orderprocessing)
}

function orderprocessing(e) {
  const menu = document.querySelector('.menu')
  const container = document.querySelector('.container')
  const fragment = document.createDocumentFragment()
  const table = document.createElement('table')
  table.innerHTML = `<tr><th class="item-name">Name</th><th>Quantity</th><th>price</th></tr>`
  let totalPrice = 0
  orderItem.forEach(function (item) {
    totalPrice += item.price
    table.innerHTML += `<tr><td class="item-name">${item.name}</td><td>${
      item.quantity
    }</td>
    <td>${'$' + item.price}</td></tr>`
  })
  table.innerHTML += `<tr><td>Total: ${'$' + totalPrice}</td></tr>`

  fragment.appendChild(table)
  menu.remove()
  container.appendChild(fragment)
}
