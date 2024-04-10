import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';

export default async function renderConfirmContents() {
  const fabricItems = getLocalStorage('fabric-cart');
  const typeItems = getLocalStorage('type-cart');
  const typeInputs = getLocalStorage('type-input');
  const fabricInputs = getLocalStorage('fabric-input');

  if(fabricItems != null){
    let count = 0;
    let total = 0;
    const htmlItems = fabricItems.map((item) => cartItemsTemplate(item, total = total + item.price, count++, typeItems, typeInputs, fabricInputs));
    const userInfo = userInformation()
    document.querySelector('.product-list').innerHTML = htmlItems.join('');
    document.querySelector('#confirm-checkout-info').innerHTML = userInfo;

    // adding cart total
    let cartTotal = buildCartTotal(total, count);
    document.querySelector('#cartTotal').innerHTML = cartTotal;

    // Attach event listener to the parent container
    document.querySelector('.totals').addEventListener('click', function(event) {
      if (event.target.classList.contains('continue')) {
        localStorage.clear();
        window.location.replace("../index.html");
      }
    });

    setTimeout(function() {
      localStorage.clear();
    }, 5 * 60 * 1000);

    // localStorage.clear();
  }else{
    document.querySelector('.product-list').innerHTML = 'Sorry your cart is empty';
  }
}

// setting up all the carts details
function userInformation() {
    const userInfo = getLocalStorage('user-info');
    console.log(userInfo[0]);

    const buyinfo = `<div class='user_checkout_info'>
    <h2>Congrats! ${userInfo[0].firstName} ${userInfo[0].lastName}</h2>
    <h3>You should have your custom Love in 5-10 Business days!</h3>
    <h3>Email: ${userInfo[0].email} </h3>
    <br>
    <h2>Address: </h2>
    <h3>${userInfo[0].nameAddress} </h3>
    <h3> ${userInfo[0].address} ${userInfo[0].address2}</h3>
    <h3> ${userInfo[0].city}, ${userInfo[0].state} ${userInfo[0].zip}</h3>
    <br>
    <h2>Billing: </h2>
    <h3>Name on Card: ${userInfo[0].nameOnCard} </h3>
    <h3>Card Number: ${userInfo[0].cardNumber} </h3>
    <h3>Expiration Date: ${userInfo[0].cardExpiration} </h3>

    </div>
    `;



    return buyinfo;
}

// setting up all the carts details
  function cartItemsTemplate(item, total, count, typeItems, typeInputs, fabricInputs) {
    console.log('this is an item', typeItems[count]);
    const newItem = `
    <li class="cart-card divider " data-item-id="${item.type}">
    <div class='fabric_items'>
        <img src='${item.image_url}' alt='${item.type}' />
        <h2 class='card__name'>${item.type}</h2>
        <p class='card__color'>Color: ${fabricInputs[count].color}</p>
    </div>
    <div class='type_items'>
        <img src='${typeItems[count].img}' alt='${typeItems[count].typography}' />
        <h2 class='card__name'>${typeItems[count].typography}</h2>
        <p class='card_name'>Custom Name: ${typeInputs[count].name}</p>
        <p class='card__color'>Color: ${typeInputs[count].color}</p>
    </div>
    <p class='cart-card__quantity'>qty: 1</p>
    </li>`;



    return newItem;
}

// setting up all the total details
function buildCartTotal(total, count) {
  // console.log('this is an item', item);
  const totalDiv = `
  <div class="totals">
  <h2>Total</h2>
  <p>Total Items: ${count}</p>
  <p>Total Price: $${total}</p>
  <button class='continue' >Continue shopping?</button>
  </div>`;

  return totalDiv;
}

