// async function getAllProducts() {
//   const response = await fetch("http://localhost:3000/api/products");
//   if (response.ok) {
//     return response.json();
//   } else {
//     console.log(response.error);
//   }
// }
// async function displayProduct() {
//   const products = await getAllProducts();
//   console.log(products);
// }

// displayProduct();

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
}
