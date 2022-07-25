//Nouveau URL
async function getProduct(productId) {
  const response = await fetch(
    "http://localhost:3000/api/products/" + productId
  );
  if (response.ok) {
    return response.json();
  } else {
    console.error(response.error);
  }
}

//Afficher les élements sur la page
async function getKanap() {
  let params = new URLSearchParams(window.location.search);
  const productId = params.get("id");
  let product = await getProduct(productId);
  //Description
  let descriptionKanap = document.getElementById("description");
  descriptionKanap.textContent = product.description;
  //Prix
  let priceKanap = document.getElementById("price");
  priceKanap.textContent = product.price;
  //Titre
  let titleKanap = document.getElementById("title");
  titleKanap.textContent = product.name;
  //Nom de page
  document.title = product.name;
  //Image
  let imgKanap = document.querySelector(".item__img");
  let img = document.createElement("img");
  imgKanap.appendChild(img);
  img.setAttribute("src", product.imageUrl);
  img.setAttribute("alt", product.altTxt);

  //Choix des couleurs
  let colorKanap = document.getElementById("colors");
  for (let i = 0; i < product.colors.length; i++) {
    let color = document.createElement("option");
    color.setAttribute("value", product.colors[i]);
    color.textContent = product.colors[i];
    colorKanap.appendChild(color);
  }
}
getKanap();

const button = document.getElementById("addToCart");

if (button != null) {
  button.addEventListener("click", () => {
    const colorChoice = document.getElementById("colors").value;
    const quantityKanap = document.getElementById("quantity").value;
    let params = new URLSearchParams(window.location.search);
    const productId = params.get("id");
    const _id = productId;
    if (
      colorChoice == null ||
      colorChoice === "" ||
      quantityKanap == null ||
      quantityKanap < 1 ||
      quantityKanap > 100
    ) {
      alert("Choisissez une couleur et une quantité");
      return;
    }

    const product = {
      productId: _id,
      qtyKanap: Number(quantityKanap),
      clrKanap: colorChoice,
    };

    var add = addPanier(product);

    //localStorage.setItem("panier", JSON.stringify(data));
    ////////////////////////////////////////////
  });
}
function addPanier(product) {
  var panier = JSON.parse(localStorage.getItem("panier"));
  let maxItem = 100;
  if (panier == null) {
    var panier = [];
    alert(
      "article ajouté au panier, vous pouvez encore rajouter : " +
        (maxItem - product.qtyKanap) +
        " canapé de la même couleur"
    );
    panier.push(product);
  } else {
    var find = false;
    panier.forEach((productPanier) => {
      if (
        productPanier.productId == product.productId &&
        productPanier.clrKanap == product.clrKanap
      ) {
        find = true;
        // test si la qte ne dépasse aps 100, sinon aucune modif + message d'alerte

        if (productPanier.qtyKanap + product.qtyKanap >= 100) {
          alert(
            "la quantité maximum ne peut pas dépasser 100, il vous reste :" +
              (maxItem - productPanier.qtyKanap) +
              "quantité possible a rajouetr"
          );
          return;
        } else {
          productPanier.qtyKanap += product.qtyKanap;
          alert(
            "article ajouté au panier, vous pouvez encore rajouter : " +
              (maxItem - productPanier.qtyKanap) +
              " canapé de la même couleur"
          );
        }
      }
    });

    if (!find) {
      alert(
        "article ajouté au panier, vous pouvez encore rajouter : " +
          (maxItem - product.qtyKanap) +
          " canapé de la même couleur"
      );
      panier.push(product);
    }
  }

  localStorage.setItem("panier", JSON.stringify(panier));
}
