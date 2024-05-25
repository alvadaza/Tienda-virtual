const menuEmail = document.querySelector(".navbar-email");
const desktopMenu = document.querySelector(".desktop-menu");
const menuHamIcon = document.querySelector(".menu");
const mobileMunu = document.querySelector(".mobile-menu");
const menuCarritoIcon = document.querySelector(".navbar-shopping-cart");
const productDetailcloseIcon = document.querySelector(".product-detail-close");
const aside = document.querySelector(".product-detail");
const addtoCartButtons = document.querySelectorAll(".add-to-cart-button");
const myOrderContent = document.querySelector(".my-order-content");

/* elementos productos detallados */

const cardsContainer = document.querySelector(".cards-container");
const productDetailContainer = document.querySelector(
  ".product-detail-secundary"
);
const productDetailImage = document.querySelector(".product-image");
const productDetailPrice = document.querySelector(
  ".product-info p:nth-child(1)"
);
const productDetailName = document.querySelector(
  ".product-info p:nth-child(2)"
);
const productDetailDescription = document.querySelector(
  ".product-info p:nth-child(3)"
);
const productDetailCloseIcon = document.querySelector(".product-detail-close");

const darkenScreen = document.querySelector(".darken");
menuEmail.addEventListener("click", toggleDestopMenu);
menuHamIcon.addEventListener("click", toggleMobileMenu);
menuCarritoIcon.addEventListener("click", toggleCarritoAside);
productDetailcloseIcon.addEventListener("click", closeProductDetailAside);

function darkenChange() {
  darkenScreen.classList.toggle("inactive");
}

function toggleDestopMenu() {
  const isAsideClosed = aside.classList.contains("inactive");

  if (!isAsideClosed) {
    aside.classList.add("inactive");
  }

  desktopMenu.classList.toggle("inactive");
}

function toggleMobileMenu() {
  const isAsideClosed = aside.classList.contains("inactive");

  if (!isAsideClosed) {
    aside.classList.add("inactive");
  }

  closeProductDetailAside();

  mobileMunu.classList.toggle("inactive");
}

function toggleCarritoAside() {
  const isMobileMenuClosed = mobileMunu.classList.contains("inactive");

  if (!isMobileMenuClosed) {
    mobileMunu.classList.add("inactive");
  }
  if (isMobileMenuClosed) {
    darkenScreen.classList.remove("inactive");
  }

  const isProductDetailClosed =
    productDetailContainer.classList.contains("inactive");

  if (!isProductDetailClosed) {
    productDetailContainer.classList.add("inactive");
  }
  aside.classList.toggle("inactive");
}

function openProductDetailAside() {
  aside.classList.add("inactive");
  productDetailContainer.classList.remove("inactive");
}

function closeProductDetailAside() {
  productDetailContainer.classList.add("inactive");
}

function openProductDetail(product) {
  productDetailImage.src = product.image;
  productDetailPrice.textContent = "$" + product.price;
  productDetailName.textContent = product.name;
  productDetailDescription.textContent = product.description;

  productDetailContainer.classList.remove("inactive");
  darkenChange("active");
}

// Función para cerrar el detalle del producto
function closeProductDetail() {
  productDetailContainer.classList.add("inactive");
  darkenChange("inactive");
}

function closeMyOrde() {
  const closeButton = document.querySelector(".close-pedidos");
  const productDetailContainer = document.querySelector(".product-detail");
  closeButton.addEventListener("click", function () {
    productDetailContainer.classList.add("inactive");
    darkenChange();
  });
}
closeMyOrde();

// Función para renderizar productos */
function renderProducts(products) {
  for (const product of products) {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");

    const productImg = document.createElement("img");
    /*  productImg.src = product.image; */
    productImg.setAttribute("src", product.image);
    productImg.classList.add("first-image");
    productImg.addEventListener("click", openProductDetailAside);

    const productInfo = document.createElement("div");
    productInfo.classList.add("product-info");

    const productInfoDiv = document.createElement("div");

    const productPrice = document.createElement("p");
    productPrice.innerText = "$" + product.price;
    const productName = document.createElement("p");
    productName.innerText = product.name;

    productInfoDiv.appendChild(productPrice);
    productInfoDiv.appendChild(productName);

    const productInfoFigure = document.createElement("figure");
    const productImgCart = document.createElement("img");
    productImgCart.setAttribute(
      "src",
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1691975536/Icons/bt_add_to_cart_ekjgg9.svg"
    );

    // Abre el detalle del producto al hacer clic en la imagen
    productImg.addEventListener("click", function () {
      openProductDetail(product);
    });

    productInfoFigure.appendChild(productImgCart);

    productInfo.appendChild(productInfoDiv);
    productInfo.appendChild(productInfoFigure);

    productCard.appendChild(productImg);
    productCard.appendChild(productInfo);

    cardsContainer.appendChild(productCard);
  }
}

// Cerrar el detalle del producto al hacer clic en el ícono de cierre
productDetailCloseIcon.addEventListener("click", closeProductDetail);

/* carrito de compras */
/* variable para almacenar los elementos del carrito*/
let cartItems = [];

/* funcion para actualizar el carrito de compras */

function updateCart() {
  const cartIcon = document.querySelector(".navbar-shopping-cart div");
  cartIcon.textContent = cartItems.length;
}

// Función para actualizar la lista de productos en "My Order"
function updateMyOrder() {
  myOrderContent.innerHTML = "";

  let total = 0;

  cartItems.forEach((item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    total += numericPrice;
    /* total += parseFloat(item.price);  */

    const productContainer = document.createElement("div");
    productContainer.classList.add("product-in-cart");
    productContainer.innerHTML = `
        <div class="shopping-cart">
            <figure>
                <img src="${item.image}" alt="${item.name}">
            </figure>
            <p>${item.name}</p>
            <p>${item.price}</p>
            <img src="https://res.cloudinary.com/dl7kjajkv/image/upload/v1691975536/Icons/icon_close_czi0m2.png" alt="close" class="remove-from-cart">
        `;

    myOrderContent.appendChild(productContainer);
  });

  const totalContainer = document.createElement("div");
  totalContainer.classList.add("order");
  totalContainer.innerHTML = `
        <p>
            <span>Total</span>
        </p>
        <p>$${total.toFixed(2)}</p>
    `;

  myOrderContent.appendChild(totalContainer);
}

// Función para enviar el pedido a WhatsApp y vaciar el carrito
function sendOrderToWhatsApp() {
  const customerName = document.getElementById("customerName").value.trim();
  const customerAddress = document
    .getElementById("customerAddress")
    .value.trim();

  if (!customerName || !customerAddress) {
    alert("Por favor, ingrese su nombre y dirección.");
    return;
  }

  let orderMessage = `Hola, me gustaría hacer el siguiente pedido:\n\nMi nombre es: ${customerName}\n y Mi Dirección es: ${customerAddress}\n\n`;

  cartItems.forEach((item) => {
    orderMessage += `- ${item.name} - ${item.price}\n`;
  });

  let total = 0;
  cartItems.forEach((item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    total += numericPrice;
  });

  orderMessage += `\nTotal: $${total.toFixed(2)}`;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=yourphonenumber&text=${encodeURIComponent(
    orderMessage
  )}`;
  window.open(whatsappUrl, "_blank");

  // Vaciar el carrito después de enviar el pedido
  cartItems = [];
  updateCart();
  updateMyOrder();

  // Limpiar los campos de entrada
  document.getElementById("customerName").value = "";
  document.getElementById("customerAddress").value = "";
}

document
  .getElementById("sendOrderBtn")
  .addEventListener("click", sendOrderToWhatsApp);

// Agrega un event listener a los elementos con la clase "remove-from-cart"
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart")) {
    const productContainer = event.target.closest(".product-in-cart");
    if (productContainer) {
      const productName = productContainer.querySelector("p").textContent;

      // Elimina el producto del array cartItems
      cartItems = cartItems.filter((item) => item.name !== productName);

      // Actualiza la visualización del carrito de compras
      updateMyOrder();
    }
  }
});

/* agregar eventos de clic a los botones add to cart */
addtoCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const productName = productDetailName.textContent;
    const productPrice = productDetailPrice.textContent;
    const productImage = productDetailImage.src;

    /* agregar el producto al carrito  */
    cartItems.push({
      name: productName,
      price: productPrice,
      image: productImage,
    });

    /* actualizar el icono del carrito y el detalle del producto */
    darkenChange();
    updateCart();
    updateMyOrder();
    productDetailContainer.classList.add("inactive");
  });
});

// Agrega un event listener a los elementos con la clase "remove-from-cart"
document.addEventListener("click", function (event) {
  if (event.target.classList.contains("remove-from-cart")) {
    const productContainer = event.target.closest(".product-in-cart");
    if (productContainer) {
      const productName = productContainer.querySelector("p").textContent;

      // Elimina el producto del array cartItems
      cartItems = cartItems.filter((item) => item.name !== productName);

      // Actualiza la visualización del carrito de compras
      updateCart();
      updateMyOrder();
    }
  }
});

function openProductDetailAside() {
  const isOpenProduct = aside.classList.contains("inactive");
  if (!isOpenProduct) {
    darkenScreen.classList.add("active");
  }
}

const produclist = [
  {
    name: "Bicicleta",
    price: 150,
    image:
      "https://images.pexels.com/photos/276517/pexels-photo-276517.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    description:
      "Es un vehículo ecológico que no tiene motor y funciona con pedales.",
  },
  {
    name: "Pantalla",
    price: 320,
    image:
      "https://images.pexels.com/photos/326512/pexels-photo-326512.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "monitor portatil. pantalla 4k. monitor 120hz. Computación. Monitores y Accesorios. Monitores. te ahorra envíos Con tu carrito de compras.",
  },
  {
    name: "Portatil",
    price: 620,
    image:
      "https://images.pexels.com/photos/6446709/pexels-photo-6446709.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Encuentra portátiles de las marcas HP, Lenovo, ASUS, Apple y más. Envío gratis a todo Colombia. ¡Compra y participa para Ganar la mitad de tu compra!.",
  },
  {
    name: "Muebles",
    price: 130,
    image:
      "https://images.pexels.com/photos/3356416/pexels-photo-3356416.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Aparadores y Muebles Auxiliares; Estudio. Juegos de Estudio; Escritorios; Sillas Auxiliares; Bibliotecas; Dormitorio.",
  },
  {
    name: "Escritorio pequeño",
    price: 120,
    image:
      "https://images.pexels.com/photos/5683082/pexels-photo-5683082.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Escritorios para niños y niñas. Los más pequeños de casa necesitan hacer tareas.",
  },
  {
    name: "Computadores",
    price: 180,
    image:
      "https://images.pexels.com/photos/4499765/pexels-photo-4499765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Compra computadores all in one estudia, trabaja y diviértete con las mejores marcas.",
  },

  {
    name: "Mause",
    price: 30,
    image:
      "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "minnie mouse. mouse inalambrico. teclado inalambrico. teclado. Computación. Periféricos de PC. Mouses y Teclados. Mouses.",
  },
  {
    name: "Muenles Medianos",
    price: 220,
    image:
      "https://images.pexels.com/photos/5998739/pexels-photo-5998739.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Muebles contemporáneos y muebles modernos - Lujo asequible y servicio de decoración de interiores.",
  },
  {
    name: "Teclado Gamer",
    price: 130,
    image:
      "https://images.pexels.com/photos/3829226/pexels-photo-3829226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "TECLADO GAMER. Un teclado gamer como todo componente a la hora de armar tu PC gamer es un punto focal si quieres tener la experiencia gamer al 100%.",
  },
  {
    name: "Sillon Pequeño",
    price: 80,
    image:
      "https://images.pexels.com/photos/4846437/pexels-photo-4846437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Sillon pequeno Miles de productos del mundo a tu casa Ordenar por Más relevantes Silla.",
  },
  {
    name: "Camara de Grabación",
    price: 430,
    image:
      "https://images.pexels.com/photos/2873486/pexels-photo-2873486.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Camaras para grabar videos Ordenar por Más relevantes Soporte De Tiro Fijo.",
  },
  {
    name: "Bicicleta Electrica",
    price: 350,
    image:
      "https://images.pexels.com/photos/14474990/pexels-photo-14474990.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Encuentra las bicicletas electricas de Colombia que tanto estas buscando. Llévate a casa las marcas número uno en Colombia.",
  },
  {
    name: "Gafas 3D",
    price: 130,
    image:
      "https://images.pexels.com/photos/6498301/pexels-photo-6498301.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "Envíos Gratis en el día Compre Gafas 3d Realidad Virtual en cuotas sin interés! Conozca nuestras increíbles ofertas y promociones .",
  },
  {
    name: "Controles Play 4",
    price: 60,
    image:
      "https://images.pexels.com/photos/3945657/pexels-photo-3945657.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "controles ps4. mando xbox. steam controller. mando ps4. volante ps4. control ps4 original. ps4 controller. te ahorra envíos Con tu carrito de compras.",
  },
];

renderProducts(produclist);
