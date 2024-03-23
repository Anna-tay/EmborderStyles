import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';

export default async function fabricDetails() {
    // Fetching data from JSON file
    fetch('/bublic/fabric.json')
    .then(response => response.json())
    .then(data => {
      let list = document.querySelector('.fabric_list');

      // Create a card container
      const cardContainer = document.createElement('div');
      cardContainer.classList.add('card-container');

      // Loop through your data array and create cards
      data.fabric_data.forEach(item => {
          const newCard = document.createElement('div');
          newCard.classList.add('card');
          newCard.id = 'fabric-card';

          // setting the card attributes
          const productName = document.createElement('h3');
          productName.id = 'productName';
          productName.innerText = item.type;

          const productImage = document.createElement('img');
          productImage.id = 'productImage';
          productImage.src = item.image_url;
          productImage.alt = item.type;

          const productPrice = document.createElement('p');
          productPrice.id = 'productPrice';
          productPrice.innerText = `price: $${item.price}`;

          const productDescription = document.createElement('p');
          productDescription.id = 'productDescription';
          productDescription.innerHTML = item.description;


          const instructions = document.createElement('p');
          instructions.innerText = '*Please proceed to choose a fabric then choose a font';

          const addToCart = document.createElement('button');
          addToCart.classList.add('addToCart');
          addToCart.dataset.id = item.type;
          addToCart.innerText = 'Choose this Fabric';

          // Add click event listener to the button
          addToCart.addEventListener('click', function() {
            let cartContents = getLocalStorage('so-cart');
            //check to see if there was anything there
            if (!cartContents) {
              cartContents = [];
            }
            // then add the current product to the list
            cartContents.push(item.type);
            setLocalStorage('so-cart', cartContents);
            alertMessage(`${item.type} added to cart!`);
            window.location.href = '/inventory/typography.html';
          });

          newCard.appendChild(productName);
          newCard.appendChild(productImage);
          newCard.appendChild(productPrice);
          newCard.appendChild(productDescription);
          newCard.appendChild(addToCart);
          newCard.appendChild(instructions);

          cardContainer.appendChild(newCard);
      });

      // Append the card container to the list
      list.appendChild(cardContainer);

      
    })
    .catch(error => console.error('Error fetching data:', error));

    // once the HTML is rendered we can add a listener to Add to Cart button
    // document.getElementById('addToCart').addEventListener('click', addToCart);
}
