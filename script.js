const form = document.getElementById('product-form');
const productsContainer = document.getElementById('products-container');
const previewContainer = document.getElementById('preview-container');

// Productos iniciales (guardados localmente)
const defaultProducts = [
    {
        name: "Póster de Blue Lock",
        price: 249,
        image: "./img/poster-bluelock.jpeg"
    },
    {
        name: "Figura de Rin",
        price: 699,
        image: "./img/figura-bluelock.jpeg"
    },
    {

        name: "Figura Nagi",
        price: 300,
        image: "./img/nagi-figure.jpeg"

    }
];

// Cargar productos desde localStorage o usar los predeterminados
let products = JSON.parse(localStorage.getItem('products'));
if (!products || products.length === 0) {
    products = defaultProducts;
    localStorage.setItem('products', JSON.stringify(products));
}

// Mostrar productos
function displayProducts() {
    productsContainer.innerHTML = '';
    products.forEach((product, index) => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="${product.image}" alt="${product.name}">
            <h3>${product.name}</h3>
            <p>Precio: $${product.price} MXN</p>
            <button class="delete-btn" onclick="deleteProduct(${index})">Eliminar</button>
        `;
        productsContainer.appendChild(card);
    });
    localStorage.setItem('products', JSON.stringify(products));
}

// Eliminar producto
function deleteProduct(index) {
    products.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(products));
    displayProducts();
}

// Previsualizar imagen
document.getElementById('image').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (!file) {
        previewContainer.innerHTML = '';
        return;
    }
    const reader = new FileReader();
    reader.onload = function(event) {
        previewContainer.innerHTML = `<img src="${event.target.result}" alt="Preview">`;
    };
    reader.readAsDataURL(file);
});

// Agregar producto
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const price = parseFloat(document.getElementById('price').value);
    const imageFile = document.getElementById('image').files[0];

    if (!imageFile) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        const imageData = event.target.result;
        products.push({ name, price, image: imageData });
        localStorage.setItem('products', JSON.stringify(products));
        displayProducts();
        form.reset();
        previewContainer.innerHTML = '';
    };
    reader.readAsDataURL(imageFile);
});

displayProducts();
