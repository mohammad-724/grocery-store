// ==========================================
// Fresh Grocery Store - Frontend JavaScript
// ==========================================

document.addEventListener("DOMContentLoaded", () => {
    setupDeliveryLocation();
    setupCart();
    setupRecipes();
    setupNavigation();
});


// ==========================================
// 1. Delivery Location
// ==========================================

function setupDeliveryLocation() {
    const locationSelect = document.querySelector("select");

    if (!locationSelect) return;

    const message = document.createElement("p");
    message.id = "delivery-message";
    message.style.marginTop = "10px";
    message.style.fontWeight = "600";

    locationSelect.parentElement.appendChild(message);

    locationSelect.addEventListener("change", () => {
        const selectedLocation = locationSelect.value;

        if (!selectedLocation) {
            message.textContent = "";
            return;
        }

        // Demo delivery availability
        const deliveryStatus = {
            "Location 1": true,
            "Location 2": true,
            "Location 3": false
        };

        if (deliveryStatus[selectedLocation]) {
            message.textContent =
                `Delivery is available to ${selectedLocation}.`;
            message.style.color = "green";
        } else {
            message.textContent =
                `Delivery is not available to ${selectedLocation}. You can still browse our products.`;
            message.style.color = "red";
        }
    });
}


// ==========================================
// 2. Shopping Cart
// ==========================================

function setupCart() {
    const cartButtons = document.querySelectorAll(
        "button"
    );

    let cartCount = parseInt(localStorage.getItem("cartCount")) || 0;

    updateCartCount(cartCount);

    cartButtons.forEach((button) => {
        const buttonText = button.textContent.trim().toLowerCase();

        if (buttonText.includes("add to cart")) {
            button.addEventListener("click", () => {

                cartCount++;
                localStorage.setItem("cartCount", cartCount);

                updateCartCount(cartCount);

                const originalText = button.textContent;

                button.textContent = "Added ✓";
                button.disabled = true;

                setTimeout(() => {
                    button.textContent = originalText;
                    button.disabled = false;
                }, 1200);

                alert("Product added to cart.");
            });
        }
    });
}


// ==========================================
// Cart Count Display
// ==========================================

function updateCartCount(count) {
    let cartElement = document.querySelector("#cart-count");

    if (!cartElement) {
        cartElement = document.createElement("span");
        cartElement.id = "cart-count";

        cartElement.style.marginLeft = "5px";
        cartElement.style.fontWeight = "bold";

        const navLinks = document.querySelectorAll("nav a");

        navLinks.forEach((link) => {
            if (link.textContent.trim().toLowerCase().includes("cart")) {
                link.appendChild(cartElement);
            }
        });
    }

    if (cartElement) {
        cartElement.textContent = `(${count})`;
    }
}


// ==========================================
// 3. Recipe Buttons
// ==========================================

function setupRecipes() {
    const recipeButtons = document.querySelectorAll("button");

    recipeButtons.forEach((button) => {
        const buttonText = button.textContent.trim().toLowerCase();

        if (buttonText.includes("view recipe")) {
            button.addEventListener("click", () => {

                const recipeCard = button.closest(
                    ".recipe-card, .card, .recipe"
                );

                let recipeName = "Selected Recipe";

                if (recipeCard) {
                    const heading = recipeCard.querySelector("h2, h3, h4");

                    if (heading) {
                        recipeName = heading.textContent.trim();
                    }
                }

                showRecipe(recipeName);
            });
        }
    });
}


// ==========================================
// Recipe Popup
// ==========================================

function showRecipe(recipeName) {
    const recipes = {
        "Biryani": [
            "Basmati Rice",
            "Onion",
            "Tomato",
            "Vegetables / Meat",
            "Cooking Oil",
            "Biryani Masala"
        ],

        "Upma": [
            "Rava",
            "Onion",
            "Green Chilli",
            "Cooking Oil",
            "Mustard Seeds",
            "Salt"
        ],

        "Dal": [
            "Toor Dal",
            "Onion",
            "Tomato",
            "Turmeric",
            "Salt",
            "Cooking Oil"
        ]
    };

    const ingredients = recipes[recipeName] || [
        "Recipe ingredients will be added soon."
    ];

    const existingPopup = document.querySelector(".recipe-popup");

    if (existingPopup) {
        existingPopup.remove();
    }

    const popup = document.createElement("div");
    popup.className = "recipe-popup";

    popup.innerHTML = `
        <div class="recipe-popup-content">
            <button class="close-recipe">&times;</button>
            <h2>${recipeName}</h2>

            <h3>Ingredients</h3>

            <ul>
                ${ingredients
                    .map(item => `<li>${item}</li>`)
                    .join("")}
            </ul>

            <p>
                Select the required grocery items and add them
                to your shopping cart.
            </p>
        </div>
    `;

    document.body.appendChild(popup);

    const closeButton =
        popup.querySelector(".close-recipe");

    closeButton.addEventListener("click", () => {
        popup.remove();
    });

    popup.addEventListener("click", (event) => {
        if (event.target === popup) {
            popup.remove();
        }
    });
}


// ==========================================
// 4. Navigation
// ==========================================

function setupNavigation() {
    const links = document.querySelectorAll("a[href^='#']");

    links.forEach((link) => {
        link.addEventListener("click", (event) => {

            const targetId =
                link.getAttribute("href");

            const target =
                document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    // Start Shopping button
    const shoppingButtons = document.querySelectorAll("button, a");

    shoppingButtons.forEach((element) => {
        const text = element.textContent
            .trim()
            .toLowerCase();

        if (text.includes("start shopping")) {
            element.addEventListener("click", (event) => {
                const productsSection =
                    document.querySelector("#products");

                if (productsSection) {
                    event.preventDefault();

                    productsSection.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            });
        }
    });
}


// ==========================================
// 5. Login Button
// ==========================================

document.addEventListener("click", (event) => {

    const element = event.target.closest("a, button");

    if (!element) return;

    const text = element.textContent
        .trim()
        .toLowerCase();

    if (text === "login") {
        event.preventDefault();

        alert(
            "Login functionality will be implemented in the next stage."
        );
    }
});