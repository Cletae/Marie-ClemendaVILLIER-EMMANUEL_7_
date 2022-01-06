import { recipes } from "./data.js";

// -------------------------------------------------------------------------------//
//******************************* DOM Elements **********************************//
//------------------------------------------------------------------------------//

const displayRecipes = [];
const recipesContainer = document.querySelector(".recipes");

const dropdowns = document.querySelectorAll(".dropdown");
const filterCards = document.querySelectorAll(".filter-search");

const ingredientsList = document.querySelector(".ingredients_list");
const appareilsList = document.querySelector(".appareils_list");
const ustensilesList = document.querySelector(".ustensiles_list");

const searchbarInput = document.querySelector(".search");
const ingredientsInput = document.querySelector(".ingredients_input");
const appareilsInput = document.querySelector(".appareils_input");
const ustensilesInput = document.querySelector(".ustensiles_list");

const ingredientsContainer = document.querySelector(".filter__ingredients");
const appareilsContainer = document.querySelector(".filter__appareils");
const ustensilesContainer = document.querySelector(".filter__ustensiles");

const arrows = document.querySelectorAll(".arrowDown");

let ingredientsArray = [];
let appareilsArray = [];
let ustensilsArray = [];
let filterSearch = [];

let inputValue = "";

// -------------------------------------------------------------------------------//
//************************** CALL FUNCTIONS ******************************//
//------------------------------------------------------------------------------//

// Display Recipes Cards //
displayCards(recipes);

// Display Ingredient-Appareils-Ustensiles in Dropdown
fillInput();

// Event Arrow in Dropdown
openDropdown();
//closeDropdown();
// displayFilterIngredient();
// displayFilterAppareil();

// -------------------------------------------------------------------------------//
//************************** DISPLAY RECIPES CARDS ******************************//
//------------------------------------------------------------------------------//

function displayCards(recipes) {
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

    function createHtml(recipe) {
      const html = `<article class="recipes__card" data-id="${recipe.id}">
            <div class="recipes__bg"></div>
            <div class="recipes__head">
                <h2>${recipe.name}</h2>
                <span>
                  <i class="far fa-clock"></i>
                  <p>${recipe.time} min</p>
                </span>
            </div>
            <div class="recipes__details">
            <ul class="recipes__ingredients">${ingredients}</ul>
            <p class="recipes__description">${recipe.description}</p>
            </div>
        </article>`;

      recipesContainer.innerHTML += html;

      recipe.html = html;
      displayRecipes.push(recipe);
    }
    createHtml(recipes[i]);
  }
}

// --------------------------------------------------------------------------------//
//**************************  FILL INPUT FILTER LIST *****************************//
//-------------------------------------------------------------------------------//

function fillInput() {
  fillIngredientsList(recipes);
  fillAppareilsList(recipes);
  fillUstensilsList(recipes);
}

// ----------- FILL INGREDIENTS LIST ----------------- //

function fillIngredientsList(recipes) {
  const displayItem = (item) =>
    `<li class="list-item"><a href="#" class="item-text">${item}</a></li>`;

  ingredientsList.innerHTML = "";

  recipes.forEach((recipe) => {
    if (displayRecipes.includes(recipe)) {
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
}

// ----------- FILL APPAREILS LIST ----------------- //

function fillAppareilsList(recipes) {
  const displayItem = (item) =>
    `<li class="list-item"><a href="#" class="item-text">${item}</a></li>`;

  appareilsList.innerHTML = "";

  recipes.forEach((recipe) => {
    if (displayRecipes.includes(recipe)) {
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
}

// ----------- FILL USTENSILES LIST ----------------- //

function fillUstensilsList(recipes) {
  const displayItem = (item) =>
    `<li class="list-item"><a href="#" class="item-text">${item}</a></li>`;

  ustensilesList.innerHTML = "";

  recipes.forEach((recipe) => {
    if (displayRecipes.includes(recipe)) {
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

// -----------------------------------------------------------------------------//
//******************************** SEARCHBAR **********************************//
//----------------------------------------------------------------------------//
searchbarInput.addEventListener("input", (e) => {
  inputValue = searchbarInput.value;
  if (inputValue.length >= 3) {
    filterSearchbar();
  } else {
    clearHtml();
    displayCards(recipes);
  }
});

// ----------- FILTER SEARCHBAR ------------ //
function filterSearchbar() {
  filterSearch = recipes.filter(
    (displayRecipes) =>
      displayRecipes.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      displayRecipes.appliance
        .toLowerCase()
        .includes(inputValue.toLowerCase()) ||
      displayRecipes.description
        .toLowerCase()
        .includes(inputValue.toLowerCase()) ||
      displayRecipes.ustensils.find((ustensil) =>
        ustensil.toLowerCase().includes(inputValue.toLowerCase())
      ) ||
      displayRecipes.ingredients.find((ingredientArray) =>
        ingredientArray.ingredient
          .toLowerCase()
          .includes(inputValue.toLowerCase())
      )
  );

  clearHtml();
  displayCards(filterSearch);
  console.log(filterSearch);

  if (filterSearch.length == 0) {
    recipesContainer.innerHTML += `
  <p class="no_recipes"> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </p>`;
  }
}

// ----------- FILTER INGREDIENTS -------------//
function filterIngredients(recipes) {
  if (inputValue.length >= 3) {
    // if (!ingredientsContainer.classList.contains(".active")) {
    //   ingredientsContainer.classList.contains(".active");
    // }
    filterSearch = recipes.filter(
      (recipe) =>
        recipe.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        recipe.ingredients.find((ingredientArray) =>
          ingredientArray.ingredient
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
    );
    clearHtml();
    displayCards(filterSearch);
    console.log(filterSearch);
  } else {
    fillIngredientsList(recipes);
  }
}

// ----------- FILTER APPAREILS -------------//
function filterAppareils() {
  if (inputValue.length >= 3) {
    if (!appareilsContainer.classList.contains(".active")) {
      appareilsContainer.classList.contains(".active");
    }
  } else {
    fillAppareilsList(recipes);
  }
}

// ----------- FILTER USTENSILS -------------//
function filterUstensils() {
  if (inputValue.length >= 3) {
    if (!ustensilesContainer.classList.contains(".active")) {
      ustensilesContainer.classList.contains(".active");
    }
  } else {
    fillUstensilsList(recipes);
  }
}

// ----------- ARROWS EVENTS FILTER -------------//

function openDropdown() {
  filterCards.forEach((filterCard) => {
    const selectedFilter = filterCard.dataset.type;

    arrows.forEach((arrow) => {
      arrow.addEventListener("click", () => {
        if (selectedFilter == "ingredients") {
          ingredientsContainer.classList.add("open");
          ingredientsList.style.display = "block";
          ingredientsInput.placeholder = "Rechercher un ingredient";
        } else if (selectedFilter == "appareils") {
          appareilsContainer.classList.add("open");
          appareilsList.style.display = "block";
          appareilsInput.placeholder = "Rechercher un appareil";
        } else if (selectedFilter == "ustensiles") {
          ustensilesContainer.classList.add("open");
          ustensilesList.style.display = "block";
          ustensilesInput.placeholder = "Rechercher un ustensile";
        } else {
          closeDropdown();
        }
      });
    });
  });
}

function closeDropdown() {
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      if (ingredientsContainer.classList.contains("open")) {
        ingredientsContainer.classList.remove("open");
        ingredientsList.style.display = "none";
        ingredientsInput.placeholder = "Ingrédients";
      } else if (appareilsContainer.classList.contains("open")) {
        appareilsContainer.classList.remove("open");
        appareilsList.style.display = "none";
        appareilsInput.placeholder = "Appareils";
      } else if (ustensilesContainer.classList.contains("open")) {
        ustensilesContainer.classList.remove("open");
        ustensilesList.style.display = "none";
        ustensilesInput.placeholder = "Ustensiles";
      } else {
        closeDropdown();
      }
    });
  });

  //   if (filterCards.classList.contains("open")) {
  //     filterCards.classList.remove("open");
  //     filterCards.style.display = "none"
  //   }
}

function displayFilterIngredient() {
  arrows.forEach((arrow) => {
    arrow.addEventListener("click", () => {
      if (!ingredientsContainer.classList.contains("open")) {
        openDropdownIngredient();
      } else {
        closeDropdownIngredient();
      }
    });
  });
}

function openDropdownIngredient() {
  ingredientsContainer.classList.toggle("open");
  ingredientsList.style.display = "block";
  ingredientsInput.placeholder = "Rechercher un ingredient";
}

function closeDropdownIngredient() {
  ingredientsContainer.classList.remove("open");
  ingredientsList.style.display = "none";
  ingredientsInput.placeholder = "Ingrédients";
}

// function displayFilterAppareil() {
//   arrows.forEach((arrow) => {
//     arrow.addEventListener("click", () => {
//       if (!appareilsContainer.classList.contains("open")) {
//         openDropdownAppareil();
//       } else {
//         closeDropdownAppareil();
//       }
//     });
//   });
// }

// function openDropdownAppareil() {
//   appareilsContainer.classList.toggle("open");
//   appareilsList.style.display = "block";
//   appareilsInput.placeholder = "Rechercher un appareil";
// }

// function closeDropdownAppareil() {
//   appareilsContainer.classList.toggle("open");
//   appareilsList.style.display = "none";
//   appareilsInput.placeholder = "Appareils";
// }

function clearHtml() {
  recipesContainer.innerHTML = "";
}
