// Lista inicial de artículos
let articles = [
  { name: "Perro", price: 10000 },
  { name: "Papas a la francesa", price: 5000 },
  { name: "Hamburguesa", price: 15000 },
  { name: "Brocheta pollo", price: 14000 },
  { name: "Brocheta mixta", price: 18000 },
  { name: "Pizza", price: 28000 },
  { name: "Patacon", price: 11000 },
  { name: "Picada", price: 19000 },
];

// Historial de compras y carrito temporal
let purchaseHistory = [];
let cart = [];

// Función para agregar un nuevo artículo a la lista de productos
function addArticle() {
  const articleName = document.getElementById("newArticle").value;
  const articlePrice = parseFloat(document.getElementById("newPrice").value);

  if (articleName && !isNaN(articlePrice) && articlePrice > 0) {
    // Agregar el nuevo artículo a la lista
    articles.push({ name: articleName, price: articlePrice });

    // Actualizar el select con el nuevo artículo
    updateArticleSelect();
    document.getElementById("newArticle").value = "";
    document.getElementById("newPrice").value = "";
    alert("Artículo agregado correctamente.");
  } else {
    alert("Por favor, ingrese un nombre y un precio válido.");
  }
}

// Función para actualizar la lista de productos en el select
function updateArticleSelect() {
  const articleSelect = document.getElementById("articleSelect");
  articleSelect.innerHTML = '<option value="">Seleccione un artículo</option>';
  articles.forEach((article, index) => {
    const option = document.createElement("option");
    option.value = index;
    option.textContent = `${article.name} - $${article.price.toFixed(2)}`;
    articleSelect.appendChild(option);
  });
}

// Inicializar la lista de artículos cuando la página cargue
window.onload = function () {
  updateArticleSelect();
};

function showSelectedArticle() {
  const selectedIndex = document.getElementById("articleSelect").value;
  const selectedArticle = selectedIndex ? articles[selectedIndex] : null;
  const display = document.getElementById("selectedArticle");
  display.innerHTML = selectedArticle
    ? `Artículo: ${
        selectedArticle.name
      } - Precio: $${selectedArticle.price.toFixed(2)}`
    : "";
}

// Función para agregar un producto al carrito
function addToCart() {
  const selectedIndex = document.getElementById("articleSelect").value;
  const quantity = parseInt(document.getElementById("articleQuantity").value);

  if (selectedIndex && quantity > 0) {
    const selectedArticle = articles[selectedIndex];
    const existingItem = cart.find(
      (item) => item.name === selectedArticle.name
    );

    if (existingItem) {
      existingItem.quantity += quantity; // Sumar la cantidad si ya existe en el carrito
    } else {
      cart.push({ ...selectedArticle, quantity });
    }

    updateCartDisplay();
    alert(`Has agregado ${quantity} ${selectedArticle.name}(s) al carrito.`);
  } else {
    alert("Por favor, seleccione un artículo y una cantidad válida.");
  }
}

// Función para mostrar el contenido del carrito
function updateCartDisplay() {
  const cartList = document.getElementById("cartList");
  cartList.innerHTML = "";
  cart.forEach((item, index) => {
    cartList.innerHTML += `
            <div>
                ${item.quantity} x ${item.name} - $${(
      item.price * item.quantity
    ).toFixed(2)} 
                <button onclick="removeFromCart(${index})">Eliminar</button>
            </div>`;
  });
}

// Función para eliminar un artículo del carrito
function removeFromCart(index) {
  cart.splice(index, 1); // Eliminar el artículo del carrito
  updateCartDisplay();
}

// Función para pagar y mover los artículos del carrito al historial
function payCart() {
  if (cart.length > 0) {
    cart.forEach((item) => {
      const existingItem = purchaseHistory.find(
        (purchase) => purchase.name === item.name
      );
      if (existingItem) {
        existingItem.quantity += item.quantity; // Sumar si ya existe en el historial
      } else {
        purchaseHistory.push({ ...item });
      }
    });

    cart = []; // Vaciar el carrito
    updateCartDisplay(); // Limpiar la vista del carrito
    updatePurchaseHistory(); // Actualizar el historial de compras
    updateTotalAmount(); // Limpiar el total
    alert("Compra realizada con éxito.");
  } else {
    alert("El carrito está vacío.");
  }
}

// Función para mostrar el historial de compras
function updatePurchaseHistory() {
  const cartHistory = document.getElementById("cartHistory");
  cartHistory.innerHTML = "";
  purchaseHistory.forEach((item) => {
    cartHistory.innerHTML += `<div>${item.quantity} x ${item.name} - $${(
      item.price * item.quantity
    ).toFixed(2)}</div>`;
  });
}

function clearSelection() {
  document.getElementById("articleSelect").value = "";
  document.getElementById("articleQuantity").value = 1;
  document.getElementById("totalAmount").textContent = "Total: $0.00";
}

function updateTotalAmount() {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  document.getElementById("totalAmount").textContent = `Total: $${total.toFixed(
    2
  )}`;
}
