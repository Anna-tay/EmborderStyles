
import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';

export default async function typographyDetails() {
      // Fetching data from JSON file
      fetch('/bublic/typography.json')
      .then(response => response.json())
      .then(product => {
        console.log(product)
        //   getting the div form the document
          let list = document.querySelector('.typography_list');

          // Create a card container
          const cardContainer = document.createElement('div');
          cardContainer.classList.add('card-container');

          product.typography_data.forEach(data => {
            console.log(data)
              const newCard = document.createElement('card');
              newCard.classList.add('card');
              newCard.id = 'typography-card'

              // setting the card attributes
              const productName = document.createElement('h3');
              productName.id = 'productName';
              productName.innerText = data.typography;

              const productImage = document.createElement('img');
              productImage.id = 'productImage';
              productImage.src = data.img;
              productImage.alt = 'the type of fabric is' + data.typography;

              const productInput = document.createElement('input');
              productInput.id = 'productInput';
              productInput.name = 'productInput'

              const addToCart = document.createElement('button');
              addToCart.classList.add('addToCart');
              addToCart.dataset.id = data.typography;
              addToCart.innerText = 'Add to Cart';

              // Add click event listener to the button
            addToCart.addEventListener('click', function() {
                let cartContents = getLocalStorage('so-cart');
                //check to see if there was anything there
                if (!cartContents) {
                cartContents = [];
                }
                // then add the current product to the list
                cartContents.push(data.typography);
                setLocalStorage('so-cart', cartContents);
                alertMessage(`${data.typography} added to cart!`);
                window.location.href = '/inventory/fabric.html';
            });

              newCard.appendChild(productName)
              newCard.appendChild(productImage)
              newCard.appendChild(productInput)
              newCard.appendChild(addToCart)

              cardContainer.appendChild(newCard);

            })
            list.appendChild(cardContainer)

      })
      .catch(error => console.error('Error fetching data:', error));

      // once the HTML is rendered we can add a listener to Add to Cart button
      // document.getElementById('addToCart').addEventListener('click', addToCart);
  }