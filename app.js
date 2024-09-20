// Array to store properties
let properties = JSON.parse(localStorage.getItem('properties')) || [];

// Function to add a property
document.getElementById('property-form').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const price = document.getElementById('price').value;
    const location = document.getElementById('location').value;
    const image = document.getElementById('image').files[0];
    const type = document.getElementById('type').value;

    // Create a new property object
    const newProperty = {
        title,
        description,
        price,
        location,
        image: URL.createObjectURL(image), // Converting image to a URL
        type
    };

    properties.push(newProperty);
    localStorage.setItem('properties', JSON.stringify(properties)); // Save to localStorage

    // Redirect to the main page
    window.location.href = 'index.html';
});

// Function to display properties
function displayProperties() {
    const propertyListings = document.getElementById('property-listings');
    propertyListings.innerHTML = ''; // Clear previous listings

    properties.forEach(property => {
        const propertyCard = `
            <div class="property-card">
                <img src="${property.image}" alt="Property Image">
                <h3>${property.title}</h3>
                <p>${property.description}</p>
                <p><strong>Price:</strong> $${property.price}</p>
                <p><strong>Location:</strong> ${property.location}</p>
                <p><strong>Type:</strong> ${property.type}</p>
            </div>
        `;
        propertyListings.innerHTML += propertyCard;
    });
}

// Function to search properties
function searchProperties() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const propertyListings = document.getElementById('property-listings');
    propertyListings.innerHTML = ''; // Clear current listings

    const filteredProperties = properties.filter(property => 
        property.location.toLowerCase().includes(searchInput) ||
        property.title.toLowerCase().includes(searchInput) // Also search by title
    );

    filteredProperties.forEach(property => {
        const propertyCard = `
            <div class="property-card">
                <img src="${property.image}" alt="Property Image">
                <h3>${property.title}</h3>
                <p>${property.description}</p>
                <p><strong>Price:</strong> $${property.price}</p>
                <p><strong>Location:</strong> ${property.location}</p>
                <p><strong>Type:</strong> ${property.type}</p>
            </div>
        `;
        propertyListings.innerHTML += propertyCard;
    });
}

// Load properties on page load
if (document.getElementById('property-listings')) {
    displayProperties();
}
