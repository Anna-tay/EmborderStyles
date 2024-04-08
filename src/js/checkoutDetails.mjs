import { setLocalStorage, getLocalStorage, alertMessage } from './utils.mjs';


export default async function formDetails() {
    // localStorage.clear();

    try{
        let checkoutSection = document.querySelector('#checkoutForm')

        const form = document.createElement('form');
        form.id = 'checkoutForm';

        // Create form fields
        const fields = [
            { label: 'First Name:', type: 'text', id: 'firstName', name: 'firstName', required: true },
            { label: 'Last Name:', type: 'text', id: 'lastName', name: 'lastName', required: true },
            { label: 'Email:', type: 'email', id: 'email', name: 'email', required: true },
            { label: 'Phone:', type: 'tel', id: 'phone', name: 'phone', required: true },
            { label: 'Name on Card:', type: 'text', id: 'nameOnCard', name: 'nameOnCard', required: true },
            { label: 'Card Number:', type: 'text', id: 'cardNumber', name: 'cardNumber', required: true },
            { label: 'Card Expiration Date:', type: 'date', id: 'cardExpiration', name: 'cardExpiration', required: true },
            { label: 'Card Security Code:', type: 'text', id: 'cardSecurityCode', name: 'cardSecurityCode', required: true }
        ];

        // Create and append form fields
        fields.forEach(field => {
            const label = document.createElement('label');
            label.textContent = field.label;

            const lineBreak = document.createElement('br')

            const input = document.createElement('input');
            input.type = field.type;
            input.id = field.id;
            input.name = field.name;
            if (field.required) input.required = true;

            form.appendChild(label);
            form.appendChild(input);
            form.appendChild(lineBreak);
        });

        // Create submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Order Custom Love';

        const deleteButton = document.createElement('button');
        deleteButton.type = 'button';
        deleteButton.textContent = 'Remove all Items';

        // creating a cart total tag
        const cartTotal = document.createElement('section');
        cartTotal.id = 'cartTotal';

        // Append submit button to form
        form.appendChild(cartTotal);
        form.appendChild(submitButton);
        form.appendChild(deleteButton);

        // Append form to the document body
        checkoutSection.appendChild(form);

        // Event listener for form submission
        form.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            const formData = new FormData(this);
            const jsonData = {};

            formData.forEach((value, key) => {
                jsonData[key] = value;
            });

            console.log('this is the data' + jsonData);
            // Replace the console.log with your actual form submission logic
        });

        // removing all items
        deleteButton.addEventListener('click', function() {
            localStorage.clear();
            // Reloads the current page
            location.reload();

        });

    }catch{
        error => console.error('Error fetching data:', error)
    }

}

