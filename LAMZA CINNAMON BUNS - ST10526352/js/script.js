

const menuButton = document.querySelector(".menu-button");
const navMenu = document.querySelector(".nav-menu");

if (menuButton && navMenu) {
    menuButton.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}




const products = [
    {
        name: "Classic Cinnamon Bun",
        price: 25,
        category: "Cinnamon Buns",
        image: "images/classic cinnamon.jpg",
        description: "A soft, warm cinnamon bun topped with delicious creamy icing."
    },
    {
        name: "Oreo Cinnamon Bun",
        price: 35,
        category: "Cinnamon Buns",
        image: "images/oreo cinnamon buns.jpg",
        description: "A soft cinnamon bun topped with creamy icing and crushed Oreo biscuits."
    },
    {
        name: "Biscoff Cinnamon Bun",
        price: 35,
        category: "Cinnamon Buns",
        image: "images/Caramel Biscuit Cinnamon Bun.jpg",
        description: "A delicious cinnamon bun topped with creamy Biscoff spread and biscuit crumbs."
    },
    {
        name: "Chocolate Cinnamon Bun",
        price: 30,
        category: "Cinnamon Buns",
        image: "images/choc cinnamon buns.jpg",
        description: "A rich cinnamon bun finished with smooth chocolate drizzle."
    },
    {
        name: "Caramel Pecan Bun",
        price: 35,
        category: "Cinnamon Buns",
        image: "images/nut carmel cinnamon buns.jpg",
        description: "A delicious cinnamon bun covered with caramel sauce and crunchy pecans."
    },
    {
        name: "Blueberry Cinnamon Bun",
        price: 35,
        category: "Cinnamon Buns",
        image: "images/blue berry cinnamon buns.jpg",
        description: "A sweet cinnamon bun topped with blueberry sauce and creamy icing."
    }
];

function createProductCard(product) {
    const card = document.createElement("article");
    card.className = "product-card";

    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.name;
    image.loading = "lazy";
    card.appendChild(image);

    const info = document.createElement("div");
    info.className = "product-info";

    const name = document.createElement("h3");
    name.textContent = product.name;
    info.appendChild(name);

    const description = document.createElement("p");
    description.textContent = product.description;
    info.appendChild(description);

    const price = document.createElement("span");
    price.className = "price";
    price.textContent = "R" + product.price;
    info.appendChild(price);

    const addButton = document.createElement("button");
    addButton.type = "button";
    addButton.className = "product-button";
    addButton.textContent = "Add to Cart";
    addButton.addEventListener("click", () => addToCart(product));
    info.appendChild(addButton);

    card.appendChild(info);
    return card;
}

function initializeProductListing() {
    const productGrid = document.querySelector(".product-grid");
    if (!productGrid) return;

    const controls = document.createElement("div");
    controls.className = "product-controls";

    const searchLabel = document.createElement("label");
    searchLabel.htmlFor = "search";
    searchLabel.textContent = "Search products";

    const searchInput = document.createElement("input");
    searchInput.id = "search";
    searchInput.type = "search";
    searchInput.placeholder = "Search by name or flavour";
    searchInput.autocomplete = "off";
    searchLabel.appendChild(searchInput);
    controls.appendChild(searchLabel);

    const categoryLabel = document.createElement("label");
    categoryLabel.htmlFor = "product-category";
    categoryLabel.textContent = "Category";

    const categorySelect = document.createElement("select");
    categorySelect.id = "product-category";
    categorySelect.setAttribute("aria-label", "Filter by category");
    const allCategories = document.createElement("option");
    allCategories.value = "all";
    allCategories.textContent = "All categories";
    categorySelect.appendChild(allCategories);
    [...new Set(products.map(product => product.category))].sort().forEach(category => {
        const option = document.createElement("option");
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });
    categoryLabel.appendChild(categorySelect);
    controls.appendChild(categoryLabel);

    const sortLabel = document.createElement("label");
    sortLabel.htmlFor = "product-sort";
    sortLabel.textContent = "Sort by";

    const sortSelect = document.createElement("select");
    sortSelect.id = "product-sort";
    sortSelect.setAttribute("aria-label", "Sort products");
    [
        ["featured", "Featured"],
        ["name-asc", "Name: A to Z"],
        ["price-asc", "Price: low to high"],
        ["price-desc", "Price: high to low"]
    ].forEach(([value, label]) => {
        const option = document.createElement("option");
        option.value = value;
        option.textContent = label;
        sortSelect.appendChild(option);
    });
    sortLabel.appendChild(sortSelect);
    controls.appendChild(sortLabel);

    const resultStatus = document.createElement("p");
    resultStatus.className = "product-results";
    resultStatus.setAttribute("role", "status");
    resultStatus.setAttribute("aria-live", "polite");

    const cartPanel = document.createElement("aside");
    cartPanel.className = "cart-panel";
    cartPanel.setAttribute("aria-labelledby", "cart-heading");

    const cartHeader = document.createElement("div");
    cartHeader.className = "cart-header";
    const cartHeading = document.createElement("h2");
    cartHeading.id = "cart-heading";
    cartHeading.textContent = "Your Cart";
    const cartCount = document.createElement("span");
    cartCount.id = "cart-count";
    cartCount.setAttribute("aria-label", "Items in cart");
    cartHeader.append(cartHeading, cartCount);

    const cartItems = document.createElement("div");
    cartItems.id = "cart-items";

    const cartFooter = document.createElement("div");
    cartFooter.className = "cart-footer";
    const cartTotalLabel = document.createElement("span");
    cartTotalLabel.textContent = "Subtotal";
    const cartTotal = document.createElement("strong");
    cartTotal.id = "cart-total";
    cartFooter.append(cartTotalLabel, cartTotal);

    const cartFeedback = document.createElement("p");
    cartFeedback.id = "cart-feedback";
    cartFeedback.className = "cart-feedback";
    cartFeedback.setAttribute("role", "status");
    cartFeedback.setAttribute("aria-live", "polite");

    const checkoutButton = document.createElement("button");
    checkoutButton.id = "checkout-button";
    checkoutButton.type = "button";
    checkoutButton.className = "product-button cart-checkout";
    checkoutButton.textContent = "Order via WhatsApp";
    checkoutButton.addEventListener("click", placeOrder);

    cartPanel.append(cartHeader, cartItems, cartFooter, cartFeedback, checkoutButton);

    productGrid.parentNode.insertBefore(cartPanel, productGrid);
    productGrid.parentNode.insertBefore(controls, productGrid);
    productGrid.parentNode.insertBefore(resultStatus, productGrid);

    function updateProducts() {
        const query = searchInput.value.trim().toLocaleLowerCase();
        const category = categorySelect.value;
        const sort = sortSelect.value;

        const visibleProducts = products.filter(product => {
            const matchesQuery = (product.name + " " + product.description)
                .toLocaleLowerCase()
                .includes(query);
            const matchesCategory = category === "all" || product.category === category;
            return matchesQuery && matchesCategory;
        });

        if (sort === "name-asc") {
            visibleProducts.sort((first, second) => first.name.localeCompare(second.name));
        } else if (sort === "price-asc") {
            visibleProducts.sort((first, second) => first.price - second.price);
        } else if (sort === "price-desc") {
            visibleProducts.sort((first, second) => second.price - first.price);
        }

        productGrid.replaceChildren(...visibleProducts.map(createProductCard));
        resultStatus.textContent = visibleProducts.length === 1
            ? "1 product found"
            : visibleProducts.length + " products found";

        if (visibleProducts.length === 0) {
            const emptyMessage = document.createElement("p");
            emptyMessage.className = "product-empty";
            emptyMessage.textContent = "No products match your search.";
            productGrid.appendChild(emptyMessage);
        }
    }

    searchInput.addEventListener("input", updateProducts);
    categorySelect.addEventListener("change", updateProducts);
    sortSelect.addEventListener("change", updateProducts);
    updateProducts();
}




function loadCart() {
    try {
        const savedCart = JSON.parse(localStorage.getItem("lamza-cart") || "[]");
        if (!Array.isArray(savedCart)) return [];

        return savedCart.reduce((items, savedItem) => {
            const product = products.find(item => item.name === savedItem.name);
            const quantity = Number.parseInt(savedItem.quantity, 10);
            if (product && Number.isInteger(quantity) && quantity > 0) {
                items.push({ ...product, quantity });
            }
            return items;
        }, []);
    } catch {
        return [];
    }
}

let cart = loadCart();

function addToCart(product) {

    const existingProduct = cart.find(
        item => item.name === product.name
    );

    if (existingProduct) {
        existingProduct.quantity++;
    } else {
        cart.push({
            name: product.name,
            price: product.price,
            quantity: 1
        });
    }

    updateCart();
    const cartFeedback = document.getElementById("cart-feedback");
    if (cartFeedback) cartFeedback.textContent = product.name + " added to cart.";
}


function removeFromCart(productName) {

    cart = cart.filter(
        product => product.name !== productName
    );

    updateCart();
}


function updateCart() {

    const cartItems = document.getElementById("cart-items");
    const cartTotal = document.getElementById("cart-total");
    const cartCount = document.getElementById("cart-count");

    if (!cartItems) return;

    cartItems.replaceChildren();

    let total = 0;
    let itemCount = 0;

    cart.forEach(product => {

        const itemTotal = product.price * product.quantity;

        total += itemTotal;
        itemCount += product.quantity;

        const item = document.createElement("div");
        item.className = "cart-item";

        const details = document.createElement("div");
        details.className = "cart-item-details";
        const name = document.createElement("strong");
        name.textContent = product.name;
        const lineTotal = document.createElement("span");
        lineTotal.textContent = "R" + itemTotal;
        details.append(name, lineTotal);

        const actions = document.createElement("div");
        actions.className = "cart-item-actions";

        const decreaseButton = document.createElement("button");
        decreaseButton.type = "button";
        decreaseButton.className = "quantity-button";
        decreaseButton.textContent = "-";
        decreaseButton.setAttribute("aria-label", "Decrease quantity of " + product.name);
        decreaseButton.addEventListener("click", () => {
            if (product.quantity === 1) {
                removeFromCart(product.name);
                return;
            }
            product.quantity--;
            updateCart();
        });

        const quantity = document.createElement("span");
        quantity.textContent = "Qty " + product.quantity;

        const increaseButton = document.createElement("button");
        increaseButton.type = "button";
        increaseButton.className = "quantity-button";
        increaseButton.textContent = "+";
        increaseButton.setAttribute("aria-label", "Increase quantity of " + product.name);
        increaseButton.addEventListener("click", () => {
            product.quantity++;
            updateCart();
        });

        const removeButton = document.createElement("button");
        removeButton.type = "button";
        removeButton.className = "cart-remove";
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", () => removeFromCart(product.name));

        actions.append(decreaseButton, quantity, increaseButton, removeButton);
        item.append(details, actions);

        cartItems.appendChild(item);
    });

    if (cart.length === 0) {
        const emptyMessage = document.createElement("p");
        emptyMessage.className = "cart-empty";
        emptyMessage.textContent = "Your cart is empty.";
        cartItems.appendChild(emptyMessage);
    }

    try {
        localStorage.setItem("lamza-cart", JSON.stringify(cart));
    } catch {
        // The cart still works for this page when browser storage is unavailable.
    }

    if (cartTotal) {
        cartTotal.textContent = "R" + total;
    }

    if (cartCount) {
        cartCount.textContent = itemCount;
    }

    const checkoutButton = document.getElementById("checkout-button");
    if (checkoutButton) checkoutButton.disabled = itemCount === 0;
}

initializeProductListing();
updateCart();




const contactForm =
    document.getElementById("contact-form");

if (contactForm) {

    contactForm.addEventListener("submit", function(event) {

        event.preventDefault();

        const name =
            document.getElementById("name").value;

        const email =
            document.getElementById("email").value;

        const message =
            document.getElementById("message").value;

        if (
            name.trim() === "" ||
            email.trim() === "" ||
            message.trim() === ""
        ) {
            alert("Please complete all fields.");
            return;
        }

        alert(
            "Thank you, " +
            name +
            "! Your message has been sent to Lamza's Cinnamon Buns & Desserts."
        );

        contactForm.reset();
    });
}


function placeOrder() {

    if (cart.length === 0) {

        alert(
            "Your cart is empty. Please add some delicious treats first!"
        );

        return;
    }

    let orderMessage =
        "Hello Lamza's Cinnamon Buns & Desserts!\n\n";

    orderMessage += "I would like to order:\n";

    let total = 0;

    cart.forEach(product => {

        const itemTotal =
            product.price * product.quantity;

        total += itemTotal;

        orderMessage +=
            "- " +
            product.name +
            " x" +
            product.quantity +
            " = R" +
            itemTotal +
            "\n";
    });

    orderMessage +=
        "\nTotal: R" +
        total;

    // Replace this number with the business WhatsApp number
    const whatsappNumber = "27617243548";

    const whatsappURL =
        "https://wa.me/" +
        whatsappNumber +
        "?text=" +
        encodeURIComponent(orderMessage);

    window.open(whatsappURL, "_blank");
}


const topButton =
    document.getElementById("top-button");

if (topButton) {

    topButton.addEventListener("click", () => {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });
}




window.addEventListener("load", () => {

    console.log(
        "Welcome to Lamza's Cinnamon Buns & Desserts!"
    );

});