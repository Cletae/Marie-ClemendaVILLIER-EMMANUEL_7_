import { recipes } from "./data";
import { Recipes } from "./recipes";

class HomePage {
  static initHomePage() {
    recipes.forEach((recipe) => {
      console.log(recipe);
      new Recipes(recipe);
    });
  }
}

window.onload = HomePage.initHomePage();
