//recuperation panier
let productLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.log(productLocalStorage);

//recuperationj api par id
async function getProduct(id) {
  const response = await fetch("http://localhost:3000/api/products/" + id);
  if (response.ok) {
    return response.json();
  } else {
    console.error(response.error);
  }
}

//display panier
async function displayCart(productLocalStorage) {
  //si panier vide
  if (!productLocalStorage) {
    //alors affichage panier vide
    const titleCart = document.querySelector("h1");
    const sectionCart = document.querySelector(".cart");

    titleCart.innerHTML = "Votre panier est vide !";
    sectionCart.style.display = "none";
  } else {
    for (let i = 0; i < productLocalStorage.length; i++) {
      // recuperation API via ID pour chaque produit du panier
      id = productLocalStorage[i].productId;
      let product = await getProduct(id);
      console.log(product);

      //article
      let article = document.createElement("article");
      document.getElementById("cart__items").appendChild(article);
      article.className = "cart__item";
      article.setAttribute("data_id", productLocalStorage[i].productId);

      //div pour image
      let divImg = document.createElement("div");
      article.appendChild(divImg);
      divImg.className = "cart__item__img";

      // Insertion de l'image
      let productImg = document.createElement("img");
      divImg.appendChild(productImg);
      let img = document.createElement("img");
      divImg.appendChild(img);
      img.setAttribute("src", product.imageUrl);
      img.setAttribute("alt", product.altTxt);

      // Insertion de l'élément "div" pour la description produit
      let productItemContent = document.createElement("div");
      article.appendChild(productItemContent);
      productItemContent.className = "cart__item__content";

      // Insertion de l'élément "div"
      let description = document.createElement("div");
      productItemContent.appendChild(description);
      description.className = "cart__item__content__titlePrice";

      // Insertion du titre h2
      let productTitle = document.createElement("h2");
      description.appendChild(productTitle);
      productTitle.innerHTML = product.name;

      // Insertion de la couleur
      let productColor = document.createElement("p");
      description.appendChild(productColor);
      productColor.innerHTML = productLocalStorage[i].clrKanap;

      // Insertion du prix
      let productPrice = document.createElement("p");
      description.appendChild(productPrice);
      productPrice.innerHTML = product.price + " €";

      // Insertion de l'élément "div"
      let contentSettings = document.createElement("div");
      productItemContent.appendChild(contentSettings);
      contentSettings.className = "cart__item__content__settings";

      // Insertion de l'élément "div"
      let settingsQuantity = document.createElement("div");
      contentSettings.appendChild(settingsQuantity);
      settingsQuantity.className = "cart__item__content__settings__quantity";

      // Insertion de "Qté : "
      let productQty = document.createElement("p");
      settingsQuantity.appendChild(productQty);
      productQty.innerHTML = "Qté : ";

      // Insertion de la quantité
      let productQuantity = document.createElement("input");
      settingsQuantity.appendChild(productQuantity);
      productQuantity.className = "itemQuantity";
      productQuantity.setAttribute("name", "itemQuantity");
      productQuantity.setAttribute("type", "number");
      productQuantity.setAttribute("min", "1");
      productQuantity.setAttribute("max", "100");
      productQuantity.value = productLocalStorage[i].qtyKanap;
      //ajout d'un evenement pour réagir au clic pour modifier la quantité et aussi le prix total
      productQuantity.addEventListener("input", () =>
        updatePriceAndQuantity(
          productLocalStorage[i].productId,
          productQuantity.value,
          productLocalStorage
        )
      );

      // Insertion de l'élément "div"
      let settingsDelete = document.createElement("div");
      contentSettings.appendChild(settingsDelete);
      settingsDelete.className = "cart__item__content__settings__delete";

      // Insertion de "p" supprimer
      let productDelete = document.createElement("p");
      settingsDelete.appendChild(productDelete);
      productDelete.className = "deleteItem";
      productDelete.innerHTML = "Supprimer";
      productDelete.addEventListener("click", (e) => {
        e.preventDefault;

        // enregistrer l'id et la couleur séléctionnés par le bouton supprimer
        let deleteId = productLocalStorage[i].productId;
        let deleteColor = productLocalStorage[i].clrKanap;

        // filtrer l'élément cliqué par le bouton supprimer
        productLocalStorage = productLocalStorage.filter(
          (elt) => elt.productId !== deleteId || elt.clrKanap !== deleteColor
        );

        // envoyer les nouvelles données dans le localStorage
        localStorage.setItem("panier", JSON.stringify(productLocalStorage));

        // avertir de la suppression et recharger la page
        alert("Votre article a bien été supprimé.");

        //Si pas de produits dans le local storage on affiche que le panier est vide
        if (productLocalStorage.length === 0) {
          localStorage.clear();
        }
        //Refresh rapide de la page
        location.reload();
      });
    }
  }
  displayTotalQuantity();
}

displayCart(productLocalStorage);

//calcul du nombre d'article total et du prix
function displayTotalQuantity() {
  const totalQuantity = document.getElementById("totalQuantity");
  const totalPrice = document.getElementById("totalPrice");
  var countPrice = 0;
  var countQte = 0;
  const allPrice = document.querySelectorAll(
    ".cart__item__content__titlePrice :nth-child(3)"
  );
  allPrice.forEach((p) => {
    var price = parseInt(p.textContent.slice(0, -2));
    var article = p.closest("article");
    var qte = parseInt(article.getElementsByClassName("itemQuantity")[0].value);
    countPrice += price * qte;
    countQte += qte;
  });
  totalQuantity.textContent = countQte;
  totalPrice.textContent = countPrice;
}

//modifier quantité via la page panier
function updatePriceAndQuantity(productId, newValue, productLocalStorage) {
  const itemToUpdate = productLocalStorage.find(
    (productLocalStorage) => productLocalStorage.productId === productId
  );
  itemToUpdate.qtyKanap = Number(newValue);

  displayTotalQuantity();
  // displayPrice();
  saveNewInfo(productLocalStorage);
}

//sauvegarder les nouvelles valeurs dans le local storage
function saveNewInfo(productLocalStorage) {
  const data2 = JSON.stringify(productLocalStorage);
  localStorage.setItem("panier", data2);
}

//Instauration formulaire avec regex
function getForm() {
  // Ajout des Regex
  let form = document.querySelector(".cart__order__form");

  //Création des regex
  let emailRegex = new RegExp(
    "^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$"
  );
  let nameCityRegex = new RegExp("^[a-zA-Z ,.'-]+$");
  let adresseRegex = new RegExp(
    "^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+"
  );

  // Ecoute de la modification du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Ecoute de la modification du prénom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute de la modification du prénom
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute de la modification du prénom
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute de la modification du prénom
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (nameCityRegex.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (nameCityRegex.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (adresseRegex.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (nameCityRegex.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (emailRegex.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner votre email.";
    }
  };
}
getForm();

function postForm() {
  const order = document.getElementById("order");
  order.addEventListener("click", (event) => {
    event.preventDefault();

    // je récupère les données du formulaire dans un objet
    const contact = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      address: document.getElementById("address").value,
      city: document.getElementById("city").value,
      email: document.getElementById("email").value,
    };

    //Construction d'un array d'id depuis le local storage
    let products = [];
    for (let i = 0; i < productLocalStorage.length; i++) {
      products.push(productLocalStorage[i].productId);
    }
    console.log(products);

    // je mets les valeurs du formulaire et les produits sélectionnés
    // dans un objet...
    const sendFormData = {
      contact,
      products,
    };

    // j'envoie le formulaire + localStorage (sendFormData)
    // ... que j'envoie au serveur

    const options = {
      method: "POST",
      body: JSON.stringify(sendFormData),
      headers: {
        "Content-Type": "application/json",
      },
    };

    fetch("http://localhost:3000/api/products/order", options)
      .then((response) => response.json())
      .then((data) => {
        localStorage.setItem("orderId", data.orderId);
        document.location.href = "confirmation.html?id=" + data.orderId;
      });
  }); // fin eventListener postForm
} // fin envoi du formulaire postForm
postForm();
