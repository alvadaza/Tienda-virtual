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

  let orderMessage = `Hola, mi nombre es ${customerName}\n y mi dirección es ${customerAddress}\n\nme gustaría hacer el siguiente pedido:\n\n`;

  cartItems.forEach((item) => {
    orderMessage += `- ${item.name} - ${item.price}\n`;
  });

  let total = 0;
  cartItems.forEach((item) => {
    const numericPrice = parseFloat(item.price.replace(/[^0-9.-]+/g, ""));
    total += numericPrice;
  });

  orderMessage += `\nTotal: $${total.toFixed(2)}`;

  const whatsappUrl = `https://api.whatsapp.com/send?phone=3133574711&text=${encodeURIComponent(
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
    name: "Disco Ssd Adata 512gb M2 2280",
    price: 170000,
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1716749839/Photos-001%20%281%29/IMG_20240526_121329_n8l4qh.jpg",
    description: "Disco Ssd Adata 512 gb Legend 700 Pcie Gen3 X4 M.2 2280.",
  },
  {
    name: "Adata M.2 Ssd",
    price: 110000,
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1716749839/Photos-001%20%281%29/IMG_20240526_121242_zuka3u.jpg",
    description: "Adata Legfend 700 Pcle Gen3 X4 M.2 2280 SSD",
  },
  {
    name: "Disco Estado Solido 120gb",
    price: 95000,
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1716749838/Photos-001%20%281%29/IMG_20240526_121208_c1o2ea.jpg",
    description: "Disco Estado Solido 120GB SU650 ADATA.",
  },
  {
    name: "Disco Estado Solido 240gb",
    price: 120000,
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1716749837/Photos-001%20%281%29/IMG_20240526_120933_gxdrhw.jpg",
    description: "Disco duro solido interno ADATA 240 GB SAT ASU650SS-240GT-R.",
  },
  {
    name: "Disco Estado Solido 960gb",
    price: 360000,
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1716749837/Photos-001%20%281%29/IMG_20240526_121119_hosqtj.jpg",
    description: "dISCO SOLIDO ADFATA 960GB SATA ASU 650SS-960GT-R.",
  },
  {
    name: "Computadores",
    price: 800000,
    image:
      "https://images.pexels.com/photos/4499765/pexels-photo-4499765.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "VENTA DE TODO CLASE DE EQUIPOS NOS ACOMODAMOS A SU PROSUPUESTO PREGUNTE EL SUYO.",
  },

  {
    name: "Mause",
    price: 30000,
    image:
      "https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "minnie mouse. mouse inalambrico. teclado inalambrico. teclado. Computación. Periféricos de PC. Mouses y Teclados. Mouses.",
  },
  {
    name: "Disco Estado Solido 512GB",
    price: 160000,
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1716749837/Photos-001%20%281%29/IMG_20240526_121032_hf1xlp.jpg",
    description: "DISCO ESTADO SOLIDO SSD SATA 512GB ADATA SU650 2.5.",
  },
  {
    name: "Teclado Gamer",
    price: 130000,
    image:
      "https://images.pexels.com/photos/3829226/pexels-photo-3829226.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    description:
      "TECLADO GAMER. Un teclado gamer como todo componente a la hora de armar tu PC gamer es un punto focal si quieres tener la experiencia gamer al 100%.",
  },
  {
    name: "Teclado Genius",
    price: 35000,
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1716749840/Photos-001%20%281%29/teclado_ginius_aecuce.jpg",
    description: "Teclado Genius Alambrico Español.",
  },
  {
    name: "Teclado y Mause",
    price: 80000,
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1716749839/Photos-001%20%281%29/IMG_20240526_122320_xpjpk9.jpg",
    description: "Combo Logitech Inalambrico .",
  },
  {
    name: "Tecldo y Mause Genius",
    price: 80000,
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1716749837/Photos-001%20%281%29/como_teclado_clgodf.jpg",
    description: "Combo Teclado Mouse Genius Inalambrico Color Negro.",
  },
  {
    name: "Memoria Portatil 4gm",
    price: 70000,
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1716749837/Photos-001%20%281%29/IMG_20240526_120357_qpvern.jpg",
    description: "Memoria RAM DDR4 4GB Crucial 2660 portatil.",
  },
  {
    name: "Memoria Portatil 8gm",
    price: 90000,
    image:
      "https://res.cloudinary.com/dl7kjajkv/image/upload/v1716749840/Photos-001%20%281%29/memotia_crucial_8g_ninzhv.jpg",
    description: "Memoria RAM DDR4 8GB Crucial 2660 portatil.",
  },
];

renderProducts(produclist);
