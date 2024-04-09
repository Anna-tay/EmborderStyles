
import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';

export default async function typographyDetails() {
  // getting from local storage
  const fabricItems = getLocalStorage('fabric-cart');
  const fabricInputs = getLocalStorage('fabric-input');
  // getting last item
  let count = 0;
  for (const fabricItem of fabricItems) {count++;}
  console.log(count)
  // adding it to html
  let my_fabric = `
  <div class='fabric_items fabric-card'>
    <h2 class='card__name'>${fabricItems[count-1].type}</h2>
    <h2 class='card__color'>Color: ${fabricInputs[count-1].color}</h2>
    <img src='${fabricItems[count-1].image_url}' alt='${fabricItems[count-1].type}' />
  </div>
  `
  document.querySelector('#chosen_fabric').innerHTML = my_fabric;

      // Fetching data from JSON file
      fetch('/bublic/typography.json')
      .then(response => response.json())
      .then(product => {
        // console.log(product)
        //   getting the div form the document
          let list = document.querySelector('.typography_list');

          // Create a card container
          const cardContainer = document.createElement('div');
          cardContainer.classList.add('card-container');

          product.typography_data.forEach(data => {

            // console.log(data)
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
              productInput.type = 'text'; // Assuming you want a text input

              const addToCart = document.createElement('button');
              addToCart.classList.add('addToCart');
              addToCart.dataset.id = data.typography;
              addToCart.innerText = 'Add to Cart';

              // dropdown list
              const dropdown = document.createElement('select');

              // Define an array of color options
              const colors = ['Black', 'White', 'Rose Red', 'Baby Blue', 'Forest Green', 'Bright Yellow', 'Orange', 'Prune Purple','Baby Pink'];

              // Loop through the colors array and create an option for each color
              colors.forEach(color => {
                const option = document.createElement('option');
                option.value = color; // Set the value to lowercase color name
                option.textContent = color; // Set the display text of the option
                dropdown.appendChild(option); // Append the option to the dropdown
              });

              // Add click event listener to the button
            addToCart.addEventListener('click', function() {
                let cartContents = getLocalStorage('type-cart');
                //check to see if there was anything there
                if (!cartContents) {
                cartContents = [];
                }

                let nameContents = getLocalStorage('type-input');
                if (!nameContents) {
                  nameContents = [];
                }

                // then add the current product to the list
                cartContents.push(data);
                setLocalStorage('type-cart', cartContents);
                nameContents.push({'name': productInput.value, 'color': dropdown.value });
                setLocalStorage('type-input', nameContents);

                alertMessage(`${data} added to cart!`);
                window.location.href = '/checkout/checkout.html';
            });


              newCard.appendChild(productName)
              newCard.appendChild(productImage)
              newCard.appendChild(productInput)
              newCard.appendChild(dropdown)
              newCard.appendChild(addToCart)

              cardContainer.appendChild(newCard);

            })
            list.appendChild(cardContainer)

      })
      .catch(error => console.error('Error fetching data:', error));

      // once the HTML is rendered we can add a listener to Add to Cart button
      // document.getElementById('addToCart').addEventListener('click', addToCart);
  }