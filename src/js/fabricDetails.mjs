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

          // dropdown list
          const dropdown = document.createElement('select');

          // Define an array of color options
          const colors = ['Light Red', 'Baby Blue', 'Light Green', 'Mustered Yellow', 'Light Purple','Light Pink'];

          // Loop through the colors array and create an option for each color
          colors.forEach(color => {
            const option = document.createElement('option');
            option.value = color; // Set the value to lowercase color name
            option.textContent = color; // Set the display text of the option
            dropdown.appendChild(option); // Append the option to the dropdown
          });

          // Add click event listener to the button
          addToCart.addEventListener('click', function() {
            let cartContents = getLocalStorage('fabric-cart');
            //check to see if there was anything there
            if (!cartContents) {
              cartContents = [];
            }

            let fabricInputs = getLocalStorage('fabric-input');
            //check to see if there was anything there
            if (!fabricInputs) {
              fabricInputs = [];
            }

            // then add the current product to the list
            cartContents.push(item);
            setLocalStorage('fabric-cart', cartContents);
            fabricInputs.push({"color" : dropdown.value});
            setLocalStorage('fabric-input', fabricInputs);
            alertMessage(`${item} added to cart!`);
            window.location.href = '/inventory/typography.html';
          });

          newCard.appendChild(productName);
          newCard.appendChild(productImage);
          newCard.appendChild(productPrice);
          newCard.appendChild(productDescription);
          newCard.appendChild(dropdown);
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
