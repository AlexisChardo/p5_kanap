async function getAllProducts() {
  const response = await fetch("http://localhost:3000/api/products");
  if (response.ok) {
    return response.json();
  } else {
    console.log(response.error);
  }
}

async function displayProduct() {
  const products = await getAllProducts();
  const section = document.getElementById("items");
  // création d'un fragment, une fausse balise permettant de tout regrouper avant de l'intégré dans le navigateur
  const fragment = document.createDocumentFragment();

  products.forEach((product) => {
    //lien de l'article
    let myLink = document.createElement("a");
    myLink.href = "./product.html?id=" + product._id;

    // création l'article
    let bArticle = document.createElement("article");
    myLink.appendChild(bArticle);

    // création de l'image
    let bImg = document.createElement("img");
    bImg.src = product.imageUrl;
    bImg.alt = product.altTxt;
    bArticle.appendChild(bImg);

    // création h3 productName
    let bTitre = document.createElement("h3");
    bTitre.className = "productName";
    bTitre.textContent = product.name;
    bArticle.appendChild(bTitre);

    // création p description
    let bDescription = document.createElement("p");
    bDescription.className = "productDescription";
    bDescription.textContent = product.description;
    bArticle.appendChild(bDescription);

    // ajout du link dans le fragment
    fragment.appendChild(myLink);
  });
  // ajout du fragment dans la section
  section.appendChild(fragment);
}

displayProduct();

/*
//variables
const url = "http://localhost:3000/api/products/";
const displayProducts = document.getElementById("items");

//Initialisation
loadProducts();

//fonction
//mise en page
function loadProducts() {
  fetch(url)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((data) => {
      data.forEach((product) => {
        //lien de l'article
        let myLink = document.createElement("a");
        myLink.setAttribute("href", `./product.html?id=${product._id}`);
        myLink.innerHTML = `<article><img src="${product.imageUrl}" alt="${product.altTxt}"><h3 class="productName">${product.name}</h3><p class="productDescription">${product.description}</p></article>`;
        //displayProducts = items, il a un enfant (my link) qui est l'article
        displayProducts.appendChild(myLink);
      });
    })
    .catch((err) => {
      console.error(err);
    });
}*/
