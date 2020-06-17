const search = document.getElementById('search');
const submit = document.getElementById('submit');
const getAll = document.getElementById('getAll');
const random = document.getElementById('random');
const recipeHeading = document.getElementById('recipeHeading');
const recipeOutput = document.getElementById('recipeOutput');
const singleRecipe = document.getElementById('singleRecipe');

submit.addEventListener('submit', searchRecipe);
getAll.addEventListener('click', getAllRecipes);
random.addEventListener('click', getRandomRecipe);
recipeOutput.addEventListener('click', e => {
  const recipe = e.path.find(item => {
    if (item.classList) {
      return item.classList.contains('recipe');
    } else {
      return false;
    }
  });

  if (recipe) {
    const recipeID = recipe.getAttribute('data-recipeid');
    getRecipeById(recipeID);
  }
});

function test() {}

function searchRecipe(e) {
  e.preventDefault();
  singleRecipe.innerHTML = '';

  const value = search.value;

  fetch(`https://legassick-recipes.herokuapp.com/api/v1/recipes?name=${value}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const recipe = data.data;

      if (recipe.length === 0) {
        recipeHeading.innerHTML = `<p>No results found for "${value}"</p>`;
      } else {
        recipeHeading.innerHTML = `<p>${recipe.length} results found for "${value}"</p>`;

        recipeOutput.innerHTML = recipe
          .map(
            recipe => `
          <div class="recipe" data-recipeID="${recipe._id}">
            <p>${recipe.name}</p>
          </div>
        `
          )
          .join('');
      }
      search.value = '';
    });
}

function getAllRecipes() {
  recipeHeading.innerHTML = '';
  singleRecipe.innerHTML = '';
  fetch('https://legassick-recipes.herokuapp.com/api/v1/recipes')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const recipe = data.data;

      recipeOutput.innerHTML = recipe
        .map(
          recipe => `
          <div class="recipe" data-recipeID="${recipe._id}">
            <p>${recipe.name}</p>
          </div>
        `
        )
        .join('');
    });
}

function getRandomRecipe() {
  recipeHeading.innerHTML = '';
  recipeOutput.innerHTML = '';
  fetch('https://legassick-recipes.herokuapp.com/api/v1/recipes/random')
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const recipe = data.data[0];
      singleRecipe.innerHTML = `
        <div class="single-recipe">
          <p>${recipe.name}</p>
          <p>Ingredients:</p>
          <ul>
            ${recipe.ingredients
              .map(ingredient => `<li>${ingredient}</li>`)
              .join('')}
          </ul>
          <p>Instructions:</p>
          <ul>
            ${recipe.instructions
              .map(instruction => `<li>${instruction}</li>`)
              .join('')}
          </ul>
        </div>
      `;
    });
}

function getRecipeById(recipeID) {
  fetch(`https://legassick-recipes.herokuapp.com/api/v1/recipes/${recipeID}`)
    .then(res => res.json())
    .then(data => {
      console.log(data);
      const recipe = data.data;
      singleRecipe.innerHTML = `
        <div class="single-recipe">
          <p>${recipe.name}</p>
          <p>Ingredients:</p>
          <ul>
            ${recipe.ingredients
              .map(ingredient => `<li>${ingredient}</li>`)
              .join('')}
          </ul>
          <p>Instructions:</p>
          <ul>
            ${recipe.instructions
              .map(instruction => `<li>${instruction}</li>`)
              .join('')}
          </ul>
        </div>
      `;
    });
}
