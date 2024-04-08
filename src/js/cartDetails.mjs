import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';

export default async function renderCartContents() {
  const fabricItems = getLocalStorage('fabric-cart');
  const typeItems = getLocalStorage('type-cart');
  const typeInputs = getLocalStorage('type-input');
  const fabricInputs = getLocalStorage('fabric-input');

  if(fabricItems != null){
    let count = 0;
    let total = 0;
    const htmlItems = fabricItems.map((item) => cartItemsTemplate(item, total = total + item.price, count++, typeItems, typeInputs, fabricInputs));
    document.querySelector('.product-list').innerHTML = htmlItems.join('');

    // Attach event listener to the parent container
    document.querySelector('.product-list').addEventListener('click', function(event) {
        if (event.target.classList.contains('removeItem')) {
            // Example function to remove an item from an array stored in localStorage by index
    function removeFromLocalStorageArray(key, index) {
      // Retrieve the stored item
      const storedItems = localStorage.getItem(key);

      // Parse it as an array
      let items = storedItems ? JSON.parse(storedItems) : null;

      // If items exist and the index is valid, remove the item
      if (items && index >= 0 && index < items.length) {
          items.splice(index, 1); // Remove the item at the specified index
          localStorage.setItem(key, JSON.stringify(items)); // Store the modified array back
      }
    }

    // Assuming `count` is the index of the item to remove
    const count = parseInt(event.target.getAttribute('data-count-id'), 10);

    if (!isNaN(count)) {
      // Remove an item based on the index from each cart type in localStorage
      removeFromLocalStorageArray('fabric-cart', count);
      removeFromLocalStorageArray('type-cart', count);
      removeFromLocalStorageArray('type-input', count);

      event.target.closest(`.cart-card-${count}`).remove();
    }
        }
    });

    // adding cart total
    let cartTotal = buildCartTotal(total, count);
    document.querySelector('#cartTotal').innerHTML = cartTotal;


  }else{
    document.querySelector('.product-list').innerHTML = 'Sorry your cart is empty';
  }
}

// setting up all the carts details
  function cartItemsTemplate(item, total, count, typeItems, typeInputs, fabricInputs) {
    console.log('this is an item', typeItems[count]);
    const newItem = `
    <li class="cart-card divider cart-card-${count}" data-item-id="${item.type}">
    <div class='fabric_items'>
        <img src='${item.image_url}' alt='${item.type}' />
        <h2 class='card__name'>${item.type}</h2>
        <h2 class='card__color'>Color: ${fabricInputs[count].color}</h2>
    </div>
    <div class='type_items'>
        <img src='${typeItems[count].img}' alt='${typeItems[count].typography}' />
        <h2 class='card__name'>${typeItems[count].typography}</h2>
        <h2 class='card_name'>Custom Name: ${typeInputs[count].name}</h2>
        <h2 class='card__color'>Color: ${typeInputs[count].color}</h2>
    </div>
    <p class='cart-card__quantity'>qty: 1</p>
    <p class='cart-card__price'>$${item.price}</p>
    <button class='removeItem' data-count-id="${count}" >Remove Item</button>
    </li>`;



    return newItem;
}

// setting up all the total details
function buildCartTotal(total, count) {
  // console.log('this is an item', item);
  const totalDiv = `
  <h2>Total</h2>
  <p>Total Items: ${count}</p>
  <p>Total Price: ${total}</p>`;

  return totalDiv;
}

