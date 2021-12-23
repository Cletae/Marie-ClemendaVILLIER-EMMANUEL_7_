import { recipes } from "./data.js";

// ---------------- DOM Elements --------------- //

const search = document.querySelector(".search");
const recipesCards = document.querySelectorAll(".recipes__card");

const ingredientsList = document.querySelector(".ingredients_list");
const appareilsList = document.querySelector(".appareils_list");
const ustensilesList = document.querySelector(".ustensiles_list");
const ingredientsInput = document.querySelector(".ingredients");
const appareilsInput = document.querySelector(".appareils");
const ustensilesInput = document.querySelector(".ustensiles");

const recipesContent = document.querySelector(".recipes");

let displayRecipes = [];
let validSearch = [];

let ingredientsArray = [];
let appareilsArray = [];
let ustensilsArray = [];

// Display Recipes card //

for (let i = 0; i < recipes.length; i++) {
  const ingredientsList = recipes[i].ingredients;

  let ingredients = "";

  for (let j = 0; j < ingredientsList.length; j++) {
    const quantity = ingredientsList[j].quantity;
    let unit = ingredientsList[j].unit;

    if (unit == "grammes") {
      unit = "g";
    } else if (unit == "litres") {
      unit = "l";
    }

    const ingredientName = `<strong>${ingredientsList[j].ingredient}</strong>`;

    if (quantity && unit && unit.length > 2) {
      ingredients += `<li>${ingredientName}: ${quantity} ${unit}</li>`;
    } else if (quantity && unit && unit.length <= 2) {
      ingredients += `<li>${ingredientName}: ${quantity}${unit}</li>`;
    } else if (quantity) {
      ingredients += `<li>${ingredientName}: ${quantity}</li>`;
    } else {
      ingredients += `<li>${ingredientName}</li>`;
    }
  }

  const recipesContent = document.querySelector(".recipes");
  recipesContent.innerHTML += `<article class="recipes__card" data-id="${recipes[i].id}">
        <div class="recipes__bg"></div>
        <div class="recipes__head">
            <h2>${recipes[i].name}</h2>
            <span>
              <i class="far fa-clock"></i>
              <p>${recipes[i].time} min</p>
            </span>
        </div>
        <div class="recipes__details">
        <ul class="recipes__ingredients">${ingredients}</ul>
        <p class="recipes__description">${recipes[i].description}</p>
        </div>
    </article>`;
  displayRecipes.push(recipes[i].id);
}

const displayItem = (item) =>
  `<li class="list-item"><a href="#" class="item-text">${item}</a></li>`;

fillInput();

function fillInput() {
  let ingredientsArray = [];
  let appareilsArray = [];
  let ustensilsArray = [];

  ingredientsList.innerHTML = "";
  appareilsList.innerHTML = "";
  ustensilesList.innerHTML = "";

  // ----------- FILL INGREDIENTS LIST ----------------- //

  recipes.forEach((recipe) => {
    if (displayRecipes.includes(recipe.id)) {
      recipe.ingredients.forEach((obj) => {
        let ingredient = obj.ingredient.toLowerCase();
        ingredient = ingredient.replace(
          ingredient[0],
          ingredient[0].toUpperCase()
        );

        if (!ingredientsArray.includes(ingredient)) {
          ingredientsArray.push(ingredient);
        }
      });
    }
  });

  ingredientsArray
    .sort((a, b) => a.localeCompare(b))
    .forEach((ingredient) => {
      ingredientsList.innerHTML += displayItem(ingredient);
    });

  // ----------- FILL appareil LIST ----------------- //

  recipes.forEach((recipe) => {
    if (displayRecipes.includes(recipe.id)) {
      let appareil = recipe.appliance;

      appareil = appareil.toLowerCase();
      appareil = appareil.replace(appareil[0], appareil[0].toUpperCase());

      if (!appareilsArray.includes(appareil)) {
        appareilsArray.push(appareil);
      }
    }
  });

  appareilsArray
    .sort((a, b) => a.localeCompare(b))
    .forEach((appareil) => {
      appareilsList.innerHTML += displayItem(appareil);
    });

  // ----------- FILL USTENSILES LIST ----------------- //

  recipes.forEach((recipe) => {
    if (displayRecipes.includes(recipe.id)) {
      recipe.ustensils.forEach((item) => {
        let ustensil = item.toLowerCase();
        ustensil = ustensil.replace(ustensil[0], ustensil[0].toUpperCase());

        if (!ustensilsArray.includes(ustensil)) {
          ustensilsArray.push(ustensil);
        }
      });
    }
  });

  ustensilsArray
    .sort((a, b) => a.localeCompare(b))
    .forEach((ustensil) => {
      ustensilesList.innerHTML += displayItem(ustensil);
    });
}

// --------------- SEARCHBAR -----------------//
search.addEventListener("input", () => {
  const regexSearh = new RegExp(/^[a-zA-Z-àâçéèêëîïôûùüÿñæœ']{3,}$/, "g");

  let displayItem = [];

  for (let i = 0; i < recipesCards.length; i++) {
    if (search.value.length >= 3) {
      const children = recipesCards[i].childNodes;

      let match = 0;

      for (let j = 0; j < children.length; j++) {
        if (regexSearh.test(children[j].innerText)) {
          match++;
          let checkId = 0;
          for (let d = 0; d < displayItem.length; d++) {
            if (recipesCards[i].dataset.id == displayItem[d]) {
              checkId++;
            }
          }
          if (checkId == 0) {
            displayItem.push(parseInt(recipesCards[i].dataset.id));
          }
        }
      }

      if (match == 0) {
        validSearch = validSearch.filter(
          (recipes) => recipes.dataset.id !== recipesCards[i].dataset.id
        );
      } else {
        let searchMatch = 0;
        for (let j = 0; j < validSearch.length; j++) {
          if (recipesCards[i].dataset.id == validSearch[j].dataset.id) {
            searchMatch++;
          }
        }
        if (searchMatch == 0) {
          validSearch.push(recipesCards[i]);
        }
      }
    } else if (search.value == "") {
      let searchMatch = 0;
      for (let j = 0; j < validSearch.length; j++) {
        if (recipesCards[i].dataset.id === validSearch[j].dataset.id) {
          searchMatch++;
        }
      }
      if (searchMatch == 0) {
        validSearch.push(recipesCards[i]);
      }
      displayItem.push(parseInt(recipesCards[i].dataset.id));
    }
  }
});

// //------------------DROPDOWN SEARCH ----------------//
// const updateTags = (item) => {
//   const filtering = () => {
//     const tags = document.querySelectorAll(".tag__name");
//     const cards = document.querySelectorAll(".recipe-card");
//     let recipeList = [];

//     search.value == "" ? (recipeList = cards) : (recipeList = validMatches);

//     recipeList.forEach((card) => {
//       let globalMatch = 0;

//       tags.forEach((tag) => {
//         const matchingRecipe = recipes.filter(
//           (el) => el.id == parseInt(card.dataset.id)
//         );

//         let match = 0;

//         if (tag.parentElement.classList.contains("tag__ingredients")) {
//           Object.values(matchingRecipe[0].ingredients).forEach((ingredient) => {
//             if (Object.values(ingredient).includes(tag.innerText)) {
//               match++;
//             }
//           });
//         } else if (
//           Object.values(matchingRecipe[0]).includes(tag.innerText) ||
//           Object.values(matchingRecipe[0].ustensils).includes(
//             tag.innerText.toLowerCase()
//           )
//         ) {
//           match++;
//         }

//         if (match > 0) {
//           globalMatch++;
//         }

//         if (tag.innerText == item.innerText) {
//           item.classList.add("activeTag");
//         }
//       });
//       if (globalMatch < tags.length) {
//         displayedRecipesIds = displayedRecipesIds.filter(
//           (el) => el !== parseInt(card.dataset.id)
//         );
//       }
//     });
//   };
// };
// // Update item lists and relevant recipes
// filtering();
// fillBtnList();
