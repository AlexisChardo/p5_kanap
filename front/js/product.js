//Nouveau URL

let params = new URLSearchParams(window.location.search);
const productId = params.get("id");
const urlProduct = `http://localhost:3000/api/products/${productId}`;
console.log(urlProduct);

//Afficher les élements sur la page
async function getKanap() {
  await fetch("http://localhost:3000/api/products/" + productId)
    .then((response) => response.json())
    .then((product) => {
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
    });
}
getKanap();

// let addToCartBtn = document.getElementById("addToCart");
// addToCartBtn.addEventListener("click", addToCart);

// function addToCart() {
//   let quantityKanap = document.getElementById("quantity").value;
//   let colorChoice = document.getElementById("colors").value;
//   let _id = productId;

//   const kanapLocalStorage = {
//     productId: _id,
//     qtyKanap: quantityKanap,
//     clrKanap: colorChoice,
//   };
//   window.localStorage.setItem("kanap", JSON.stringify(kanapLocalStorage));
// }

const button = document.getElementById("addToCart");

if (button != null) {
  button.addEventListener("click", (e) => {
    const colorChoice = document.getElementById("colors").value;
    const quantityKanap = document.getElementById("quantity").value;
    const _id = productId;
    let price = document.getElementById("price").textContent;
    if (
      colorChoice == null ||
      colorChoice === "" ||
      quantityKanap == null ||
      quantityKanap == 0
    ) {
      alert("Choisissez une couleur et une quantité");
      return;
    }

    const key = `${_id}-${colorChoice}`;
    const data = {
      productId: _id,
      qtyKanap: Number(quantityKanap),
      clrKanap: colorChoice,
      price: Number(price),
    };
    localStorage.setItem(key, JSON.stringify(data));
  });
}

// si on rajoute un item de la même couleur, alors il s'ajoute et n'ecrase pas l'ancienne valeur
// limiter a 100
