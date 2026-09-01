const recipeList = document.getElementById('recipe-list'); 

function getRecipes(recipes){ 
  // just to check data in console
  // if (!recipes) return; 
  // console.log(recipes);

  recipeList.innerHTML  = "";


  // for now just slicing the array we got from the response to upto 3 indexes only 
  recipes.slice(0,10).forEach((recipe) => {

    // li class for each recipe 
    const recipeItem = document.createElement('li');
    recipeItem.classList.add('recipe-item');

    // image for the recipe 
    const recipeImg = document.createElement('img');
    recipeImg.src = recipe.image;
    recipeImg.alt = "recipe-image";
    // h2 title for each recipe name we got from fetch
    const recipeTitle = document.createElement('h2');
    recipeTitle.innerHTML = recipe.name; // name we got from the response 

    // ingredients fetch from the response 
    const recipeIngredients = document.createElement('p');
    recipeIngredients.innerHTML = `<strong>Ingredients: </strong>${recipe.ingredients.join(', ')}`;

    // instructons added and also to mention the instruction in a cleann format ol is used
    const recipeInstructions = document.createElement('ol');
    recipeInstructions.classList.add('instruction-list');

    // loop to make the list clean
    recipe.instructions.forEach((cleanList) => {
      const items = document.createElement('li');
      items.textContent = cleanList;
      recipeInstructions.appendChild(items);
    });

    // append all  the elements to recipelist 
    recipeItem.appendChild(recipeTitle);
    recipeItem.appendChild(recipeImg);
    recipeItem.appendChild(recipeIngredients)
    recipeItem.appendChild(recipeInstructions)
    recipeList.appendChild(recipeItem);
  })
} 

async function fetchRecipes(){ 
  try { 
    const response = await fetch('https://dummyjson.com/recipe'); 
    if(!response.ok){ 
      throw new Error(`Request failed with status ${response.status}`); 
    } 
    const data = await response.json(); 
    console.log("Got the data:", data); 
    return data.recipes; 
  } catch (error) { 
    console.error("Something went wrong:", error); 
  } 
} 

async function call(){ 
  const recipes = await fetchRecipes(); 
  getRecipes(recipes); 
} 

call();

/* response we got for a partiular recipe in a array so wee need only specific things to display only 
 1. {name} we got this...DONE 
 2. {image} we got this...DONE 
 3. {cuisine} we need this 
 4. {ingredients} we need this 
 5. {instructions} we need this
 6. {prepTime} we need this 
*/


