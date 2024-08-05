let openShopping = document.querySelector('.shopping');
let closeShopping = document.querySelector('.closeShopping');
let list = document.querySelector('.list');
let listCard = document.querySelector('.listCard');
let total = document.querySelector('.total');
let quantity = document.querySelector('.quantity');

let products = JSON.parse(localStorage.getItem('products')) || [
    {
        id: 1,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'f1.jpg',
        price: 499
    },
    {
        id: 2,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'f2.jpg',
        price: 499
    },
    {
        id: 3,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'f3.jpg',
        price: 499
    },
    {
        id: 4,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'f4.jpg',
        price: 499
    },
    {
        id: 5,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'f5.jpg',
        price: 499
    },
    {
        id: 6,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'f6.jpg',
        price: 499
    },
    {
        id: 7,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'f7.jpg',
        price: 499
    },
    {
        id: 8,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'f8.jpg',
        price: 499
    },
    {
        id: 9,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'n1.jpg',
        price: 499
    },
    {
        id: 10,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'n2.jpg',
        price: 499
    },
    {
        id: 11,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'n3.jpg',
        price: 499
    },
    {
        id: 12,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'n4.jpg',
        price: 499
    },
    {
        id: 13,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'n5.jpg',
        price: 499
    },
    {
        id: 14,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'n6.jpg',
        price: 499
    },
    {
        id: 15,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'n7.jpg',
        price: 499
    },
    {
        id: 16,
        name: 'Cartoon Astronaut T-Shirts',
        image: 'n8.jpg',
        price: 499
    }
    // Rest of your products
];

// Load listCards from Local Storage or initialize empty if not available
let listCards = JSON.parse(localStorage.getItem('listCards')) || [];

function initApp() {
    products.forEach((value, key) => {
        let newDiv = document.createElement('div');
        newDiv.classList.add('prod');
        newDiv.innerHTML = `
        <div class="pro">
        <img src="img/products/${value.image}" alt="Shirt">
        <div class="des">
            <span>adidas</span>
            <h5>${value.name}</h5>
            <div class="star">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
            </div>
            <h4>₹${value.price.toLocaleString()}</h4>
        </div>
        <i class="bi bi-cart cart" onclick="addToCard(${key})"></i>
    </div>
    `;
        list.appendChild(newDiv);
    });
}

function addToCard(key) {
    if (listCards[key] == null) {
        // copy product from list to listCard
        listCards[key] = { ...products[key], quantity: 1 };
    } else {
        listCards[key].quantity++;
    }
    saveToLocalStorage();
    reloadCard();
}

function reloadCard() {
    listCard.innerHTML = '';
    let count = 0;
    let totalPrice = 0;
    listCards.forEach((value, key) => {
        if (value != null) {
            totalPrice += value.price * value.quantity;
            count += value.quantity;
            let newDiv = document.createElement('li');
            newDiv.innerHTML = `
                <div><img src="img/products/${value.image}"/></div>
                <div>${value.name}</div>
                <div>₹${(value.price * value.quantity).toLocaleString()}</div>
                <div>
                    <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
                    <div class="count">${value.quantity}</div>
                    <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
                </div>`;
            listCard.appendChild(newDiv);
        }
    });
    total.innerText = 'Total: ₹' + totalPrice.toLocaleString();
    quantity.innerText = count;
}

function changeQuantity(key, quantity) {
    if (quantity <= 0) {
        delete listCards[key];
    } else {
        listCards[key].quantity = quantity;
    }
    saveToLocalStorage();
    reloadCard();
}

function saveToLocalStorage() {
    localStorage.setItem('listCards', JSON.stringify(listCards));
}

// Initialize the app
initApp();

openShopping.addEventListener('click', () => {
    document.body.classList.add('active');
});

closeShopping.addEventListener('click', () => {
    document.body.classList.remove('active');
});
