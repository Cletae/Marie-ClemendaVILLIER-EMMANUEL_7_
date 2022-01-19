import { recipes } from "./data.js";

// -------------------------------------------------------------------------------//
//******************************* DOM Elements **********************************//
//------------------------------------------------------------------------------//

const recipesContainer = document.querySelector(".recipes");

const alertMessage = document.querySelector(".alert-message");
const displayTag = document.querySelector(".tags");

const activeTag = document.querySelector(".activeTag");

const dropdowns = document.querySelectorAll(".dropdown");
const filterCards = document.querySelectorAll(".filter-search");

const ingredientsList = document.querySelector(".ingredients_list");
const appareilsList = document.querySelector(".appareils_list");
const ustensilesList = document.querySelector(".ustensiles_list");

const searchbarInput = document.querySelector(".search");
const ingredientsInput = document.querySelector(".ingredients_input");
const appareilsInput = document.querySelector(".appareils_input");
const ustensilesInput = document.querySelector(".ustensiles_input");

const ingredientsContainer = document.querySelector(".filter__ingredients");
const appareilsContainer = document.querySelector(".filter__appareils");
const ustensilesContainer = document.querySelector(".filter__ustensiles");

const displayRecipes = [];

let ingredientsArray = [];
let appareilsArray = [];
let ustensilsArray = [];

let resultIngredient = [];
let resultAppareil = [];
let resultUstensil = [];

let filterSearch = [];

let inputValue = "";

// -------------------------------------------------------------------------------//
//************************** CALL FUNCTIONS ******************************//
//------------------------------------------------------------------------------//

// Display Recipes Cards //
displayCards(recipes);

// Display Dropdown Ingredient-Appareils-Ustensiles
fillInput();

// Event Arrow in Dropdown
openDropdown();

// Display Tags Ingredient-Appareils-Ustensiles
//displayTags();

// Filter Dropdown Ingredient-Appareils-Ustensiles  Dropdown
filterDropdown(displayRecipes);

searchbarInput.addEventListener("input", (e) => {
  inputValue = searchbarInput.value;
  if (inputValue.length >= 3) {
    filterSearchbar();
    newList(filterSearch);
  } else {
    clearHtml();
    fillInput();
    displayCards(recipes);
  }
});

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

function newList(filterSearch) {
  newIngredientList(filterSearch);
  newAppareilsList(filterSearch);
  newUstensilsList(filterSearch);
}

// ----------- FILL INGREDIENTS LIST ----------------- //

function fillIngredientsList(recipes) {
  const displayItem = (item) =>
    `<li class="list-item ingredient_item"><a href="#" class="item-text">${item}</a></li>`;

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
    `<li class="list-item appareil_item"><a href="#" class="item-text">${item}</a></li>`;

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
    `<li class="list-item ustensile_item"><a href="#" class="item-text">${item}</a></li>`;

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
//********************* NEW LIST DROPDOWN AFTER FILTER ************************//
//----------------------------------------------------------------------------//

// ----------- NEW INGREDIENT LIST (ARRAY) ----------------- //

function newIngredientList(filterSearch) {
  const displayItem = (item) =>
    `<li class="list-item ingredient_item"><a href="#" class="item-text">${item}</a></li>`;
  ingredientsList.innerHTML = "";

  filterSearch.forEach((recipe) => {
    if (displayRecipes.includes(recipe)) {
      recipe.ingredients.forEach((obj) => {
        let ingredient = obj.ingredient.toLowerCase();
        ingredient = ingredient.replace(
          ingredient[0],
          ingredient[0].toUpperCase()
        );
        if (!resultIngredient.includes(ingredient)) {
          resultIngredient.push(ingredient);
        }
      });
    }
  });

  resultIngredient
    .sort((a, b) => a.localeCompare(b))
    .forEach((ingredient) => {
      ingredientsList.innerHTML += displayItem(ingredient);
    });
}

// ----------- NEW APPAREIL LIST (ARRAY) ----------------- //

function newAppareilsList(filterSearch) {
  const displayItem = (item) =>
    `<li class="list-item appareil_item"><a href="#" class="item-text">${item}</a></li>`;

  appareilsList.innerHTML = "";

  filterSearch.forEach((recipe) => {
    if (displayRecipes.includes(recipe)) {
      let appareil = recipe.appliance;

      appareil = appareil.toLowerCase();
      appareil = appareil.replace(appareil[0], appareil[0].toUpperCase());

      if (!resultAppareil.includes(appareil)) {
        resultAppareil.push(appareil);
      }
    }
  });

  resultAppareil
    .sort((a, b) => a.localeCompare(b))
    .forEach((appareil) => {
      appareilsList.innerHTML += displayItem(appareil);
    });
}

// ----------- NEW USTENSILE LIST (ARRAY) ----------------- //

function newUstensilsList(filterSearch) {
  const displayItem = (item) =>
    `<li class="list-item ustensile_item"><a href="#" class="item-text">${item}</a></li>`;

  ustensilesList.innerHTML = "";

  filterSearch.forEach((recipe) => {
    if (displayRecipes.includes(recipe)) {
      recipe.ustensils.forEach((item) => {
        let ustensil = item.toLowerCase();
        ustensil = ustensil.replace(ustensil[0], ustensil[0].toUpperCase());

        if (!resultUstensil.includes(ustensil)) {
          resultUstensil.push(ustensil);
        }
      });
    }
  });
  resultUstensil
    .sort((a, b) => a.localeCompare(b))
    .forEach((ustensil) => {
      ustensilesList.innerHTML += displayItem(ustensil);
    });
}

// -----------------------------------------------------------------------------//
//******************************** SEARCHBAR **********************************//
//----------------------------------------------------------------------------//

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
  if (filterSearch.length == 0) {
    alertMessage.innerHTML = `
  <p class="no_recipes"> Aucune recette ne correspond à votre critère… vous pouvez chercher « tarte aux pommes », « poisson », etc </p>`;
  }
}

function filterTagIngredient() {
  filterSearch = recipes.filter((displayRecipes) =>
    displayRecipes.ingredients.find((ingredientArray) =>
      ingredientArray.ingredient
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    )
  );
  recipesContainer.innerHTML = "";
  displayCards(filterSearch);
}

function filterTagAppareil() {
  filterSearch = recipes.filter((displayRecipes) =>
    displayRecipes.appliance.toLowerCase().includes(inputValue.toLowerCase())
  );
  recipesContainer.innerHTML = "";
  displayCards(filterSearch);
}

function filterTagUstensile() {
  filterSearch = recipes.filter((displayRecipes) =>
    displayRecipes.ustensils.find((ustensil) =>
      ustensil.toLowerCase().includes(inputValue.toLowerCase())
    )
  );
  recipesContainer.innerHTML = "";
  displayCards(filterSearch);
}

// -----------------------------------------------------------------------------//
//****************************** DISPLAY TAGS *********************************//
//----------------------------------------------------------------------------//

// function displayTags() {
//   displayTagsIngredient();
//   displayTagsAppareils();
//   displayTagsUstensiles();
// }

displayTagsIngredient();
displayTagsAppareils();
displayTagsUstensiles();

// ----------- DISPLAY INGREDIENT -------------//

function displayTagsIngredient() {
  const ingredientItems = document.querySelectorAll(".ingredient_item");

  ingredientItems.forEach((ingredientItem) => {
    ingredientItem.addEventListener("click", (e) => {
      inputValue = e.target.textContent;

      if (!ingredientItem.classList.contains("activeTag")) {
        ingredientItem.classList.add("activeTag");
      }

      displayTag.innerHTML += `<div class="tags__item tags_ingredients">
      <p>${e.target.textContent}</p>
      <button class="btn_close">
        <i class="far fa-times-circle"></i>
      </button>
    </div>`;
      filterTagIngredient();
      newList(filterSearch);
    });
  });
}

//closeTagBtn();

function closeTagBtn() {
  const closeBtns = document.querySelectorAll(".btn_close");

  const ingredientItems = document.querySelectorAll(".ingredient_item");

  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", (e) => {
      ingredientItems.forEach((ingredientItem) => {
        if (ingredientItem.classList.contains("activeTag")) {
          ingredientItem.classList.remove("activeTag");
        }
      });
    });
  });
}

// ----------- DISPLAY APPAREILS -------------//

function displayTagsAppareils() {
  const appareilsItems = document.querySelectorAll(".appareil_item");

  appareilsItems.forEach((appareilsItem) => {
    appareilsItem.addEventListener("click", (e) => {
      inputValue = e.target.textContent;

      if (appareilsItem.classList.contains("activeTag")) {
        appareilsItem.classList.remove("activeTag");
      } else {
        appareilsItem.classList.add("activeTag");
      }

      displayTag.innerHTML += `<div class="tags__item tags_appareils">
      <p>${e.target.textContent}</p>
      <button class="btn_close">
        <i class="far fa-times-circle"></i>
      </button>
    </div>`;
    });
  });

  filterAppareils(recipes);
}

// ----------- DISPLAY USTENSILES -------------//

function displayTagsUstensiles() {
  const ustensileItems = document.querySelectorAll(".ustensile_item");

  ustensileItems.forEach((ustensileItem) => {
    ustensileItem.addEventListener("click", (e) => {
      inputValue = e.target.textContent;

      displayTag.innerHTML += `<div class="tags__item tags_ustensiles">
      <p>${e.target.textContent}</p>
      <button class="btn_close">
        <i class="far fa-times-circle"></i>
      </button>
    </div>`;
    });
  });

  filterUstensils(recipes);
}

// ----------- FILTER INGREDIENTS -------------//
function filterDropdown(displayRecipes) {
  filterIngredients(displayRecipes);
  filterAppareils(displayRecipes);
  filterUstensils(displayRecipes);
}

ingredientsInput.addEventListener("input", () => {
  filterIngredients(displayRecipes);
});

function filterIngredients(displayRecipes) {
  inputValue = ingredientsInput.value;
  if (inputValue.length >= 3) {
    if (!ingredientsContainer.classList.toggle(".active")) {
      openDropdown();
    }

    filterSearch = displayRecipes.filter(
      (displayRecipe) =>
        displayRecipe.name.toLowerCase().includes(inputValue.toLowerCase()) ||
        displayRecipe.ingredients.find((ingredientArray) =>
          ingredientArray.ingredient
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
    );
    clearHtml();
    newList();
    displayCards(filterSearch);
  } else {
    displayCards(displayRecipes);
    fillIngredientsList(recipes);
  }
}

// ----------- FILTER APPAREILS -------------//
function filterAppareils(displayRecipes) {
  appareilsInput.addEventListener("input", () => {
    inputValue = appareilsInput.value;
    if (inputValue.length >= 3) {
      if (!appareilsContainer.classList.toggle(".active")) {
        openDropdown();
      }

      filterSearch = displayRecipes.filter((displayRecipe) =>
        displayRecipe.appliance.toLowerCase().includes(inputValue.toLowerCase())
      );
      // newIngredientList(resultIngredient);
      clearHtml();
      displayCards(filterSearch);
    } else {
      displayCards(filterSearch);
      fillAppareilsList(recipes);
    }
  });
}

// ----------- FILTER USTENSILS -------------//
function filterUstensils(displayRecipes) {
  ustensilesInput.addEventListener("input", () => {
    inputValue = ustensilesInput.value;
    if (inputValue.length >= 3) {
      if (!ustensilesContainer.classList.toggle(".active")) {
        openDropdown();
      }

      filterSearch = displayRecipes.filter((displayRecipe) =>
        displayRecipe.ustensils.find((ustensilsArray) =>
          ustensilsArray.ustensils
            .toLowerCase()
            .includes(inputValue.toLowerCase())
        )
      );
      console.log(filterSearch);

      // newIngredientList(resultIngredient);
      clearHtml();
      displayCards(filterSearch);
    } else {
      displayCards(filterSearch);
      fillUstensilsList(recipes);
    }
  });
}

// ----------- ARROWS EVENTS FILTER -------------//

function openDropdown() {
  filterCards.forEach((filterCard) => {
    const arrow = filterCard.querySelector(".arrowDown");

    arrow.addEventListener("click", () => {
      const selectedFilter = filterCard.dataset.type;

      let input;

      if (selectedFilter == "ingredient") {
        ingredientsContainer.classList.toggle("open");
        input = ingredientsInput;
      } else if (selectedFilter == "appareil") {
        appareilsContainer.classList.toggle("open");
        input = appareilsInput;
      } else if (selectedFilter == "ustensile") {
        ustensilesContainer.classList.toggle("open");
        input = ustensilesInput;
      }
      togglePlaceholder(filterCard, input, selectedFilter);
    });
  });
}

function togglePlaceholder(filterCard, input, type) {
  if (filterCard.classList.contains("open")) {
    input.placeholder = "Rechercher un " + type;
  } else {
    input.placeholder = type[0].toUpperCase() + type.substring(1) + "s";
  }
}

function clearHtml() {
  recipesContainer.innerHTML = "";
}
