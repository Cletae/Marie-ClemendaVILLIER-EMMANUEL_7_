import { recipes } from "./data.js";

// -------------------------------------------------------------------------------//
//******************************* DOM Elements **********************************//
//------------------------------------------------------------------------------//

const recipesContainer = document.querySelector(".recipes");

const alertMessage = document.querySelector(".alert-message");
const displayTag = document.querySelector(".tags");

const filterCards = document.querySelectorAll(".filter-search");

const tagsItems = document.querySelectorAll(".tags__item");
const listItems = document.querySelectorAll(".list-item");

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
let selectedTags = [];
let filterRecipes = [];

let inputValue = "";

const displayIngredientItem = (item) =>
  `<li class="list-item ingredient_item"><a href="#" class="item-text">${item}</a></li>`;

const displayAppareilItem = (item) =>
  `<li class="list-item appareil_item"><a href="#" class="item-text">${item}</a></li>`;

const displayUstensilItem = (item) =>
  `<li class="list-item ustensile_item"><a href="#" class="item-text">${item}</a></li>`;

// -------------------------------------------------------------------------------//
//************************** CALL FUNCTIONS ******************************//
//------------------------------------------------------------------------------//

// Display Recipes Cards //
displayCards(recipes);

// Display Dropdown Ingredient-Appareils-Ustensiles
fillInput();

// Event Arrow in Dropdown
openDropdown();

// Filter Dropdown Ingredient-Appareils-Ustensiles  Dropdown
// removeDuplicateItem(recipes);
filterDropdown(displayRecipes);

// Display Tags Ingredient-Appareils-Ustensiles
//displayTags();
displayTagsIngredient();
displayTagsAppareils();
displayTagsUstensiles();

// listItems.forEach((listItem) => {
//   listItem.addEventListener("click", () => {
//     console.log("hello");

//     displayTagsIngredient();
//     displayTagsAppareils();
//     displayTagsUstensiles();
//   });
// });

searchbarInput.addEventListener("input", (e) => {
  inputValue = searchbarInput.value;
  if (inputValue.length >= 3) {
    filterSearchbar();
    newList(filterSearch);
  } else if (selectedTags.length != 0) {
    clearHtml();
    displayTagsIngredient();
    displayTagsAppareils();
    displayTagsUstensiles();
    displayCards(filterSearch);
  } else {
    clearHtml();
    fillInput();
    displayCards(recipes);
  }
});

ingredientsInput.addEventListener("input", () => {
  filterIngredients(displayRecipes);
});

appareilsInput.addEventListener("input", () => {
  filterAppareils(displayRecipes);
});

ustensilesInput.addEventListener("input", () => {
  filterUstensils(displayRecipes);
});

// -------------------------------------------------------------------------------//
//************************** DISPLAY RECIPES CARDS ******************************//
//------------------------------------------------------------------------------//

function displayCards(recipes) {
  recipes.forEach((recipe) => {
    if (!recipe) return;

    const ingredientsList = recipe.ingredients;
    let ingredients = "";

    ingredientsList.forEach((ingredient) => {
      const quantity = ingredient.quantity;
      let unit = ingredient.unit;

      if (unit == "grammes") {
        unit = "g";
      } else if (unit == "litres") {
        unit = "l";
      }

      const ingredientName = `<strong>${ingredient.ingredient}</strong>`;

      if (quantity && unit && unit.length > 2) {
        ingredients += `<li>${ingredientName}: ${quantity} ${unit}</li>`;
      } else if (quantity && unit && unit.length <= 2) {
        ingredients += `<li>${ingredientName}: ${quantity}${unit}</li>`;
      } else if (quantity) {
        ingredients += `<li>${ingredientName}: ${quantity}</li>`;
      } else {
        ingredients += `<li>${ingredientName}</li>`;
      }
    });

    createHtml(recipe, ingredients);
  });
}

// ----------- CREATE CARDS HTML ----------------- //

function createHtml(recipe, ingredients) {
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

// --------------------------------------------------------------------------------//
//**************************  CALL 3 FUNSTIONS IN 1 *****************************//
//-------------------------------------------------------------------------------//

// ----------- FILL DROPDOWN LIST ----------------- //
function fillInput() {
  fillIngredientsList(recipes);
  fillAppareilsList(recipes);
  fillUstensilsList(recipes);
}

// ----------- FILL DROPDOWN NEW LIST AFETR FILTERING ----------- //
function newList(filterSearch) {
  newIngredientList(filterSearch);
  newAppareilsList(filterSearch);
  newUstensilsList(filterSearch);
}

// ----------- FILTER INPUT  ----------------- //

function filterDropdown(displayRecipes) {
  filterIngredients(displayRecipes);
  filterAppareils(displayRecipes);
  filterUstensils(displayRecipes);
}

// function displayTags() {
//   displayTagsIngredient();
//   displayTagsAppareils();
//   displayTagsUstensiles();
// }

// --------------------------------------------------------------------------------//
//**************************  FILL INPUT FILTER LIST *****************************//
//-------------------------------------------------------------------------------//

// ----------- FILL INGREDIENTS LIST ----------------- //

function fillIngredientsList(recipes) {
  ingredientsList.innerHTML = "";

  recipes.forEach((recipe) => {
    const dataIngredients = recipe.ingredients;
    if (displayRecipes.includes(recipe)) {
      dataIngredients.forEach((objet) => {
        let ingredient = objet.ingredient.toLowerCase();
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
      ingredientsList.innerHTML += displayIngredientItem(ingredient);
    });

  return ingredientsArray;
}

// ----------- FILL APPAREILS LIST ----------------- //

function fillAppareilsList(recipes) {
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
      appareilsList.innerHTML += displayAppareilItem(appareil);
    });
}

// ----------- FILL USTENSILES LIST ----------------- //

function fillUstensilsList(recipes) {
  ustensilesList.innerHTML = "";

  recipes.forEach((recipe) => {
    if (displayRecipes.includes(recipe)) {
      recipe.ustensils.forEach((objet) => {
        let ustensil = objet.toLowerCase();
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
      ustensilesList.innerHTML += displayUstensilItem(ustensil);
    });
}

// function removeDuplicateItem(recipes) {
//   recipes.forEach((recipe) => {
//     const dataIngredients = recipe.ingredients;
//     dataIngredients.forEach((dataIngredient) => {
//       ingredientsArray = [...new Set(dataIngredient)].sort();
//     });

// 	appareilsArray = [...new Set(recipe.appliance)].sort();

// 	ustensilsArray = [...new Set(recipe.ustensils)].sort();
//   });
// }

// -----------------------------------------------------------------------------//
//******************************** SEARCHBAR **********************************//
//----------------------------------------------------------------------------//

// ----------- FILTER SEARCHBAR ------------ //
function filterSearchbar() {
  filterSearch = recipes.filter(
    (displayRecipes) =>
      displayRecipes.name.toLowerCase().includes(inputValue.toLowerCase()) ||
      displayRecipes.description
        .toLowerCase()
        .includes(inputValue.toLowerCase()) ||
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

// -----------------------------------------------------------------------------//
//****************************** DISPLAY TAGS *********************************//
//----------------------------------------------------------------------------//

// ----------- DISPLAY INGREDIENT -------------//

function displayTagsIngredient() {
  const ingredientItems = document.querySelectorAll(".ingredient_item");

  ingredientItems.forEach((ingredientItem) => {
    ingredientItem.addEventListener("click", (e) => {
      inputValue = e.target.textContent;

    //   if (!ingredientItem.classList.contains("activeTag")) {
	// 	ingredientItem.classList.add("activeTag");          
    //   }

	  displayTag.innerHTML += `<div class="tags__item tags_ingredients active">
		<p class="tagName">${e.target.textContent}</p>
		<button class="btn_close">
			<i class="far fa-times-circle"></i>
		</button>
		</div>`;

        filterTagIngredient(selectedTags);
        closeTagBtn();
        console.log(selectedTags);
    });
  });
}

// ----------- DISPLAY APPAREILS -------------//

function displayTagsAppareils() {
  const appareilsItems = document.querySelectorAll(".appareil_item");

  appareilsItems.forEach((appareilsItem) => {
    appareilsItem.addEventListener("click", (e) => {
      inputValue = e.target.textContent;

      displayTag.innerHTML += `<div class="tags__item tags_appareils active">
      <p class="tagName">${e.target.textContent}</p>
      <button class="btn_close">
        <i class="far fa-times-circle"></i>
      </button>
    </div>`;
      filterTagAppareil(selectedTags);
      closeTagBtn();
    });
  });
}

// ----------- DISPLAY USTENSILES -------------//

function displayTagsUstensiles() {
  const ustensileItems = document.querySelectorAll(".ustensile_item");

  ustensileItems.forEach((ustensileItem) => {
    ustensileItem.addEventListener("click", (e) => {
      inputValue = e.target.textContent;

      displayTag.innerHTML += `<div class="tags__item tags_ustensiles active">
      <p class="tagName">${e.target.textContent}</p>
      <button class="btn_close">
        <i class="far fa-times-circle"></i>
      </button>
    </div>`;
      filterTagUstensile(selectedTags);
      closeTagBtn();
    });
  });
}

// -----------------------------------------------------------------------------//
//****************************** FILTER TAGS **********************************//
//----------------------------------------------------------------------------//

// ----------- FILTER TAGS INGREDIENTS -------------//

function filterTagIngredient() {
  filterSearch = recipes.filter((displayRecipes) =>
    displayRecipes.ingredients.find((ingredientArray) =>
      ingredientArray.ingredient
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    )
  );

  // if (condition) {

  // }

  selectedTags.push(filterSearch);
  clearHtml();
  newList(filterSearch);
  displayCards(filterSearch);
}

// ----------- FILTER TAGS APPAREILS -------------//

function filterTagAppareil() {
  filterSearch = recipes.filter((displayRecipes) =>
    displayRecipes.appliance.toLowerCase().includes(inputValue.toLowerCase())
  );
  selectedTags.push(filterSearch);

  clearHtml();
  newList(filterSearch);
  displayCards(filterSearch);
}

// ----------- FILTER TAGS USTENSILES -------------//

function filterTagUstensile() {
  filterSearch = recipes.filter((displayRecipes) =>
    displayRecipes.ustensils.find((ustensil) =>
      ustensil.toLowerCase().includes(inputValue.toLowerCase())
    )
  );
  selectedTags.push(filterSearch);
  clearHtml();
  newList(filterSearch);
  displayCards(filterSearch);
}

// -----------------------------------------------------------------------------//
//***************************** FILTER INPUT **********************************//
//----------------------------------------------------------------------------//

// ----------- FILTER INPUT INGREDIENTS -------------//

function filterIngredients(displayRecipes) {
  ingredientsList.innerHTML = "";

  inputValue = ingredientsInput.value;

  if (inputValue.length >= 3) {
    if (!ingredientsContainer.classList.contains("open")) {
      ingredientsContainer.classList.add("open");
    }

    let inputSearch = inputValue.toLocaleLowerCase();
    ingredientsArray = ingredientsArray.filter((ingredient) =>
      ingredient.toLowerCase().includes(inputSearch)
    );

    ingredientsList.innerHTML = displayIngredientItem(ingredientsArray);

    clearHtml();
    displayTagsIngredient();
    displayCards(filterSearch);
  } else {
    displayCards(displayRecipes);
    fillIngredientsList(recipes);
  }
}

// ----------- FILTER INPUT APPAREILS -------------//

function filterAppareils(displayRecipes) {
  appareilsList.innerHTML = "";

  inputValue = appareilsInput.value;

  if (inputValue.length >= 3) {
    if (!appareilsContainer.classList.contains("open")) {
      appareilsContainer.classList.add("open");
    }

    let inputSearch = inputValue.toLocaleLowerCase();
    appareilsArray = appareilsArray.filter((appliance) =>
      appliance.toLowerCase().includes(inputSearch)
    );

    appareilsList.innerHTML = displayAppareilItem(appareilsArray);

    clearHtml();
    displayTagsAppareils();
    displayCards(filterSearch);
  } else {
    displayCards(displayRecipes);
    fillAppareilsList(recipes);
  }
}

// ----------- FILTER INPUT USTENSILES -------------//

function filterUstensils(displayRecipes) {
  ustensilesList.innerHTML = "";

  inputValue = ustensilesInput.value;
  if (inputValue.length >= 3) {
    if (!ustensilesContainer.classList.contains("open")) {
      ustensilesContainer.classList.add("open");
    }

    let inputSearch = inputValue.toLocaleLowerCase();
    ustensilsArray = ustensilsArray.filter((ustensil) =>
      ustensil.toLowerCase().includes(inputSearch)
    );

    ustensilesList.innerHTML = displayUstensilItem(ustensilsArray);

    clearHtml();
    displayTagsUstensiles();
    displayCards(filterSearch);
  } else {
    displayCards(displayRecipes);
    fillUstensilsList(recipes);
  }
}

// -----------------------------------------------------------------------------//
//********************* NEW LIST DROPDOWN AFTER FILTER ************************//
//----------------------------------------------------------------------------//

// ----------- NEW INGREDIENT LIST (ARRAY) ----------------- //

function newIngredientList(filterSearch) {
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
      ingredientsList.innerHTML += displayIngredientItem(ingredient);
    });
}

// ----------- NEW APPAREIL LIST (ARRAY) ----------------- //

function newAppareilsList(filterSearch) {
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
      appareilsList.innerHTML += displayAppareilItem(appareil);
    });
}

// ----------- NEW USTENSILE LIST (ARRAY) ----------------- //

function newUstensilsList(filterSearch) {
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
      ustensilesList.innerHTML += displayUstensilItem(ustensil);
    });
}

// ----------- OPEN ARROWS DROPDOWN FILTER -------------//

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

// ------------ CLOSE BUTTONS TAGS -------------//
function closeTagBtn() {
  const closeBtns = document.querySelectorAll(".btn_close");
  const tagsItems = document.querySelectorAll(".tags__item");

  closeBtns.forEach((closeBtn) => {
    closeBtn.addEventListener("click", () => {
      tagsItems.forEach((tagsItem) => {
        tagsItem.remove();
        fillInput();
        displayCards(recipes);
      });
    });
  });
}

function clearHtml() {
  recipesContainer.innerHTML = "";
}
