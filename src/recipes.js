import { recipes } from "./data.js";

// -------------------------------------------------------------------------------//
//******************************* DOM Elements **********************************//
//------------------------------------------------------------------------------//

const recipesContainer = document.querySelector(".recipes");

const alertMessage = document.querySelector(".alert-message");
const displayTag = document.querySelector(".tags");

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
let selectedTags = [];

let inputValue = "";

// -------------------------------------------------------------------------------//
//********************* CREATE LIST DROPDOWN & ADD TAG **************************//
//------------------------------------------------------------------------------//

//--------------- CREATE LIST & TAGS INGREDIENTS  ----------------//

const displayIngredientItem = (item) => {
  const li = document.createElement("li");
  li.classList.add("list-item");
  li.classList.add("ingredient_item");

  li.innerHTML = `<a href="#" class="item-text">${item}</a>`;

  li.addEventListener("click", (e) => {
    inputValue = e.target.textContent;
    // selectedTags.push(item);

    const tagItem = document.createElement("div");
    tagItem.classList.add("tags__item");
    tagItem.classList.add("tags_ingredients");

    const tagName = document.createElement("p");
    tagName.classList.add("tagName");
    tagName.textContent = inputValue;

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("btn_close");
    closeBtn.innerHTML = `<i class="far fa-times-circle"></i>`;

    // ajouter les enfants a la div
    tagItem.appendChild(tagName);
    tagItem.appendChild(closeBtn);

    // ajouter la div a displayTag
    displayTag.appendChild(tagItem);

    const tags = document.querySelectorAll(".tagName");

    tags.forEach((tag) => {
      // vérifie que le tag est bien dans la liste
      // vérifier que le tag n'est pas déja sélectionné
      if (tag.innerText == inputValue) {
        closeTagBtn(tagItem);
        filterTagIngredient(recipes, selectedTags);

        console.log(inputValue + " retiré");
      }
    });
  });
  return li;
};

//--------------- CREATE LIST & TAGS APPAREILS  ----------------//

const displayAppareilItem = (item) => {
  const li = document.createElement("li");
  li.classList.add("list-item");
  li.classList.add("appareil_item");

  li.innerHTML = `<a href="#" class="item-text">${item}</a>`;

  li.addEventListener("click", (e) => {
    inputValue = e.target.textContent;

    const tagItem = document.createElement("div");
    tagItem.classList.add("tags__item");
    tagItem.classList.add("tags_appareils");

    const tagName = document.createElement("p");
    tagName.classList.add("tagName");
    tagName.textContent = inputValue;

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("btn_close");
    closeBtn.innerHTML = `<i class="far fa-times-circle"></i>`;

    // ajouter les enfants a la div
    tagItem.appendChild(tagName);
    tagItem.appendChild(closeBtn);

    // ajouter la div a displayTag
    displayTag.appendChild(tagItem);

    const tags = document.querySelectorAll(".tagName");
    tags.forEach((tag) => {
      // vérifie que le tag est bien dans la liste
      // vérifier que le tag n'est pas déja sélectionné
      if (tag.innerText == inputValue) {
        closeTagBtn(tagItem);
        filterTagAppareil(recipes, selectedTags);
      }
    });
  });

  return li;
};

//--------------- CREATE LIST & TAGS USTENSILES  ----------------//

const displayUstensilItem = (item) => {
  const li = document.createElement("li");
  li.classList.add("list-item");
  li.classList.add("ustensile_item");

  li.innerHTML = `<a href="#" class="item-text">${item}</a>`;

  li.addEventListener("click", (e) => {
    inputValue = e.target.textContent;

    const tagItem = document.createElement("div");
    tagItem.classList.add("tags__item");
    tagItem.classList.add("tags_ustensiles");

    const tagName = document.createElement("p");
    tagName.classList.add("tagName");
    tagName.textContent = inputValue;

    const closeBtn = document.createElement("button");
    closeBtn.classList.add("btn_close");
    closeBtn.innerHTML = `<i class="far fa-times-circle"></i>`;

    // ajouter les enfants a la div
    tagItem.appendChild(tagName);
    tagItem.appendChild(closeBtn);

    // ajouter la div a displayTag
    displayTag.appendChild(tagItem);

    const tags = document.querySelectorAll(".tagName");
    tags.forEach((tag) => {
      // vérifie que le tag est bien dans la liste
      // vérifier que le tag n'est pas déja sélectionné
      if (tag.innerText == inputValue) {
        closeTagBtn(tagItem);
        filterTagUstensile(recipes, selectedTags);
      }
    });
  });

  return li;
};

// -------------------------------------------------------------------------------//
//************************** CALLS FUNCTIONS ******************************//
//------------------------------------------------------------------------------//

// Display Recipes Cards //
displayCards(recipes);

// Display Dropdown Ingredient-Appareils-Ustensiles
fillInput(displayRecipes);

// Event Arrow in Dropdown
openDropdown();

// Filter Dropdown Ingredient-Appareils-Ustensiles  Dropdown
filterDropdown(displayRecipes);

searchbarInput.addEventListener("input", (e) => {
  inputValue = searchbarInput.value;
  if (inputValue.length >= 3) {
    filterSearchbar();
    newList(filterSearch);
  } else if (selectedTags.length != 0) {
    clearHtml();
    // filterTagItems(selectedTags);
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
  let displayRecipes = [];

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
// removeDuplicateItem(recipes);

// ----------- FILL DROPDOWN LIST ----------------- //
function fillInput() {
  fillIngredientsList(displayRecipes);
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

function filterTag(recipes, selectedTags) {
  filterTagIngredient(recipes, selectedTags);
  filterTagAppareil(recipes, selectedTags);
  filterTagUstensile(recipes, selectedTags);
  // filterTagItems(recipes);
}

// --------------------------------------------------------------------------------//
//**************************  FILL INPUT FILTER LIST *****************************//
//-------------------------------------------------------------------------------//

// ----------- FILL INGREDIENTS LIST ----------------- //

function fillIngredientsList(displayRecipes) {
  ingredientsList.innerHTML = "";

  ingredientsArray = [];

  displayRecipes.forEach((displayRecipe) => {
    const dataIngredients = displayRecipe.ingredients;

    if (displayRecipes.includes(displayRecipe)) {
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
      ingredientsList.appendChild(displayIngredientItem(ingredient));
    });
}

// ----------- FILL APPAREILS LIST ----------------- //

function fillAppareilsList(displayRecipes) {
  appareilsList.innerHTML = "";

  appareilsArray = [];

  displayRecipes.forEach((displayRecipe) => {
    if (displayRecipes.includes(displayRecipe)) {
      let appareil = displayRecipe.appliance;

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
      appareilsList.appendChild(displayAppareilItem(appareil));
    });
}

// ----------- FILL USTENSILES LIST ----------------- //

function fillUstensilsList(displayRecipes) {
  ustensilesList.innerHTML = "";

  ustensilsArray = [];

  displayRecipes.forEach((displayRecipe) => {
    if (displayRecipes.includes(displayRecipe)) {
      displayRecipe.ustensils.forEach((objet) => {
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
      ustensilesList.appendChild(displayUstensilItem(ustensil));
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
  } else {
    alertMessage.innerHTML = "";
  }
}

// -----------------------------------------------------------------------------//
//****************************** FILTER TAGS **********************************//
//----------------------------------------------------------------------------//

// ----------- FILTER TAGS INGREDIENTS -------------//

function filterTagIngredient(recipes, selectedTags) {
  filterSearch = recipes.filter((displayRecipes) =>
    displayRecipes.ingredients.find((ingredientArray) =>
      ingredientArray.ingredient
        .toLowerCase()
        .includes(inputValue.toLowerCase())
    )
  );

  selectedTags.push(filterSearch);
  clearHtml();
  newList(filterSearch);
  displayCards(filterSearch);
}

// ----------- FILTER TAGS APPAREILS -------------//

function filterTagAppareil(recipes, selectedTags) {
  filterSearch = recipes.filter((displayRecipes) =>
    displayRecipes.appliance.toLowerCase().includes(inputValue.toLowerCase())
  );
  selectedTags.push(filterSearch);
  clearHtml();
  newList(filterSearch);
  displayCards(filterSearch);
}

// ----------- FILTER TAGS USTENSILES -------------//

function filterTagUstensile(recipes, selectedTags) {
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

function filterIngredients() {
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

    ingredientsArray
      .sort((a, b) => a.localeCompare(b))

      .forEach((ingredientsArray) => {
        ingredientsList.appendChild(displayIngredientItem(ingredientsArray));
      });
  } else {
    fillIngredientsList(recipes);
  }
}

// ----------- FILTER INPUT APPAREILS -------------//

function filterAppareils() {
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

    appareilsArray
      .sort((a, b) => a.localeCompare(b))
      .forEach((appareilsArray) => {
        appareilsList.appendChild(displayAppareilItem(appareilsArray));
      });
  } else {
    fillAppareilsList(recipes);
  }
}

// ----------- FILTER INPUT USTENSILES -------------//

function filterUstensils() {
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

    ustensilsArray
      .sort((a, b) => a.localeCompare(b))
      .forEach((ustensilsArray) => {
        ustensilesList.appendChild(displayUstensilItem(ustensilsArray));
      });
  } else {
    fillUstensilsList(recipes);
  }
}

// -----------------------------------------------------------------------------//
//********************* NEW LIST DROPDOWN AFTER FILTER ************************//
//----------------------------------------------------------------------------//

// ----------- NEW INGREDIENT LIST (ARRAY) ----------------- //

function newIngredientList(filterSearch) {
  ingredientsList.innerHTML = "";

  resultIngredient = [];

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
        if (resultIngredient.includes(inputValue)) {
          resultIngredient = resultIngredient.filter(
            (ingredient) => ingredient != inputValue
          );
        }
      });
    }
  });

  resultIngredient
    .sort((a, b) => a.localeCompare(b))
    .forEach((ingredient) => {
      ingredientsList.appendChild(displayIngredientItem(ingredient));
    });
}

// ----------- NEW APPAREIL LIST (ARRAY) ----------------- //

function newAppareilsList(filterSearch) {
  appareilsList.innerHTML = "";

  resultAppareil = [];

  filterSearch.forEach((recipe) => {
    if (displayRecipes.includes(recipe)) {
      let appareil = recipe.appliance;

      appareil = appareil.toLowerCase();
      appareil = appareil.replace(appareil[0], appareil[0].toUpperCase());

      if (!resultAppareil.includes(appareil)) {
        resultAppareil.push(appareil);
      }
      if (resultAppareil.includes(inputValue)) {
        resultAppareil = resultAppareil.filter(
          (appareil) => appareil != inputValue
        );
      }
    }
  });

  resultAppareil
    .sort((a, b) => a.localeCompare(b))
    .forEach((appareil) => {
      appareilsList.appendChild(displayAppareilItem(appareil));
    });
}

// ----------- NEW USTENSILE LIST (ARRAY) ----------------- //

function newUstensilsList(filterSearch) {
  ustensilesList.innerHTML = "";

  resultUstensil = [];

  filterSearch.forEach((recipe) => {
    if (displayRecipes.includes(recipe)) {
      recipe.ustensils.forEach((item) => {
        let ustensil = item.toLowerCase();
        ustensil = ustensil.replace(ustensil[0], ustensil[0].toUpperCase());

        if (!resultUstensil.includes(ustensil)) {
          resultUstensil.push(ustensil);
        }
        if (resultUstensil.includes(inputValue)) {
          resultUstensil = resultUstensil.filter(
            (ustensil) => ustensil != inputValue
          );
        }
      });
    }
  });

  resultUstensil
    .sort((a, b) => a.localeCompare(b))
    .forEach((ustensil) => {
      ustensilesList.appendChild(displayUstensilItem(ustensil));
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

function closeTagBtn(tagItem) {
  const closeBtn = tagItem.querySelector(".btn_close");

  closeBtn.addEventListener("click", () => {
    if (searchbarInput.value == "" || tagItem == "") {
      tagItem.remove();
      fillInput(displayRecipes);
      displayCards(recipes);
    } else {
      tagItem.remove();
      newList(filterSearch, inputValue);
      displayCards(filterSearch);
    }
  });
}

function clearHtml() {
  recipesContainer.innerHTML = "";
}
