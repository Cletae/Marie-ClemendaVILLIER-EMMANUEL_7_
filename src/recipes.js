import { recipes } from "./data";

// ---------------- DOM Elements --------------- //

const seach = document.querySelector(".search");

const ingredientsList = document.querySelector(".ingredients_list");
const appareilsList = document.querySelector(".appareils_list");
const ustensilesList = document.querySelector(".ustensiles_list");
const ingredientsInput = document.querySelector(".ingredients");
const appareilsInput = document.querySelector(".appareils");
const ustensilesInput = document.querySelector(".ustensiles");

const recipesContent = document.querySelector(".recipes");

let displayRecipes = [];

export class Recipes {
  constructor(recipes) {
    this.recipes = recipes;
    this.id = recipes.id;
    this.name = recipes.name;
    this.servings = recipes.servings;
    this.ingredients = recipes.ingredients;
    this.time = recipes.time;
    this.description = recipes.description;
    this.appliance = recipes.appliance;
    this.utensils = recipes.ustensils;
  }
}

function createRecipesCard() {
  const recipesContent = document.querySelector(".recipes");
  recipesContent.innerHTML += `<article class="recipes__card">
        <div class="recipes__bg"></div>
        <div class="recipes__head">
            <h2>${this.name}</h2>
            <span>
              <i class="far fa-clock"></i>
              <p>${this.time} min</p>
            </span>
        </div>
        <div class="recipes__details">
        <ul class="recipes__ingredients">${ingredients}</ul>
        <p class="recipes__description">${recipes[i].description}</p>
        </div>
    </article>`;
  displayRecipes.push(recipes[i].id);
}

const displayItem = `<li class="list-item"></li>`;

fillInput();

function fillInput() {
  let ingredientsArray = [];
  let appliancesArray = [];
  let utensilsArray = [];

  ingredientsList.innerHTML = "";
  appliancesList.innerHTML = "";
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
      ingredientsList.innerHTML += displayItem;
    });

  // ----------- FILL APPLIANCE LIST ----------------- //

  recipes.forEach((recipe) => {
    if (displayRecipes.includes(recipe.id)) {
      let appliance = recipe.appliance;

      appliance = appliance.toLowerCase();
      appliance = appliance.replace(appliance[0], appliance[0].toUpperCase());

      if (!appliancesArray.includes(appliance)) {
        appliancesArray.push(appliance);
      }
    }
  });

  appliancesArray
    .sort((a, b) => a.localeCompare(b))
    .forEach((appliance) => {
      appliancesList.innerHTML += displayItem;
    });

  // ----------- FILL USTENSILES LIST ----------------- //

  recipes.forEach((recipe) => {
    if (displayRecipes.includes(recipe.id)) {
      recipe.ustensils.forEach((item) => {
        let utensil = item.toLowerCase();
        utensil = utensil.replace(utensil[0], utensil[0].toUpperCase());

        if (!utensilsArray.includes(utensil)) {
          utensilsArray.push(utensil);
        }
      });
    }
  });

  utensilsArray
    .sort((a, b) => a.localeCompare(b))
    .forEach((utensil) => {
      ustensilesList.innerHTML += displayItem(utensil);
    });
}
