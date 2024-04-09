// Fetching data from JSON file
fetch('/bublic/made.json')
    .then(response => response.json())
    .then(data => {
        // Selecting the container to append cards
        const container = document.querySelector('.made_before');

        // Extracting data from JSON and creating cards
        for (let i = 0; i < 3; i++) {
            const item = data.made[i];

            if (!item) break; // Break loop if no more items

            const card = document.createElement('div');
            card.classList.add('made-card');

            const name = document.createElement('h3');
            name.textContent = item.name;

            const typography = document.createElement('p');
            typography.textContent = 'Typography: ' + item.typography;

            const color = document.createElement('p');
            color.textContent = 'Color: ' + item.color;

            const image = document.createElement('img');
            image.src = item.image_link;
            image.alt = item.name + ' Image';
            image.style.width = 'auto';
            image.style.width = '150px';

            card.appendChild(name);
            card.appendChild(typography);
            card.appendChild(color);
            card.appendChild(image);

            container.appendChild(card);
        }
    })
    .catch(error => console.error('Error fetching data:', error));
