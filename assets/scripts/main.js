// main.js

// Run the init() function when the page has loaded
window.addEventListener('DOMContentLoaded', init);

// Starts the program, all function calls trace back here
function init() {
  // Get the recipes from localStorage
  let recipes = getRecipesFromStorage();
  // Add each recipe to the <main> element
  addRecipesToDocument(recipes);
  // Add the event listeners to the form elements
  initFormHandler();
}

/**
 * Reads 'recipes' from localStorage and returns an array of
 * all of the recipes found (parsed, not in string form). If
 * nothing is found in localStorage for 'recipes', an empty array
 * is returned.
 * @returns {Array<Object>} An array of recipes found in localStorage
 */
function getRecipesFromStorage() {
  // A9. Complete the functionality as described in this function
  //     header. It is possible in only a single line, but should
  //     be no more than a few lines.
  if (localStorage.length == 0) {
    return [];
  } 
  let data = localStorage.getItem("recipes");
  JSON.parse(data);
  return data;
}

/**
 * Takes in an array of recipes and for each recipe creates a
 * new <recipe-card> element, adds the recipe data to that card
 * using element.data = {...}, and then appends that new recipe
 * to <main>
 * @param {Array<Object>} recipes An array of recipes
 */
function addRecipesToDocument(recipes) {
  // A10. Get a reference to the <main> element
  let main = document.querySelector("main");
  // A11. Loop through each of the recipes in the passed in array,
  //            create a <recipe-card> element for each one, and populate
  //            each <recipe-card> with that recipe data using element.data = ...
  //            Append each element to <main>
  if(recipes != "") {
    recipes = JSON.parse(recipes);
  } 
  for(let i = 0; i < recipes.length; i++) {
    let props = recipes[i];
    let element = document.createElement("recipe-card");
    element.data = {
      imgSrc: props.imgSrc,
      imgAlt: props.imgAlt,
      titleLnk: props.titleLnk,
      titleTxt: props.titleTxt,
      organization: props.organization,
      rating: props.rating,
      numRatings: props.numRatings,
      lengthTime: props.lengthTime,
      ingredients: props.ingredients
    }
    main.append(element);
  }
}

/**
 * Takes in an array of recipes, converts it to a string, and then
 * saves that string to 'recipes' in localStorage
 * @param {Array<Object>} recipes An array of recipes
 */
function saveRecipesToStorage(recipes) {
  // EXPLORE - START (All explore numbers start with B)
  // B1. Complete the functionality as described in this function
  //            header. It is possible in only a single line, but should
  //            be no more than a few lines.
  localStorage.setItem("recipes", JSON.stringify(recipes));
}

/**
 * Adds the necesarry event handlers to <form> and the clear storage
 * <button>.
 */
function initFormHandler() {

  // B2. Get a reference to the <form> element
  const form = document.querySelector("form");
  const button = document.querySelector("button");
  const main = document.querySelector("main");
  // B3. Add an event listener for the 'submit' event, which fires when the
  //            submit button is clicked
  // Steps B4-B9 will occur inside the event listener from step B3
  button.addEventListener('click', (event) => {
      // B4. Create a new FormData object from the <form> element reference above
      const formInfo = new FormData(form);
      // B5. Create an empty object (I'll refer to this object as recipeObject to
      //            make this easier to read), and then extract the keys and corresponding
      //            values from the FormData object and insert them into recipeObject
      let recipeObject = {};
      for(const entry of formInfo.entries()) {
        if(entry[0] == 'rating' || entry[0] == 'numRatings') {
          entry[1] = parseInt(entry[1]);
        }
        recipeObject[entry[0]] = entry[1];
      }
      // B6. Create a new <recipe-card> element
      let element = document.createElement("recipe-card");
      // B7. Add the recipeObject data to <recipe-card> using element.data
      element.data = {
        imgSrc: recipeObject.imgSrc,
        imgAlt: recipeObject.imgAlt,
        titleLnk: recipeObject.titleLnk,
        titleTxt: recipeObject.titleTxt,
        organization: recipeObject.organization,
        rating: recipeObject.rating,
        numRatings: recipeObject.numRatings,
        lengthTime: recipeObject.lengthTime,
        ingredients: recipeObject.ingredients
      }
      // B8. Append this new <recipe-card> to <main>
      main.append(element);
      // B9. Get the recipes array from localStorage, add this new recipe to it, and
      //            then save the recipes array back to localStorage
      let data = [];
      if(localStorage.length == 0) {
        data = [];
      }
      else {
        data = JSON.parse(localStorage.getItem("recipes"));
      }
      data.push(recipeObject);
      localStorage.setItem("recipes", JSON.stringify(data));
  });
  // B10. Get a reference to the "Clear Local Storage" button
  const clear = (document.getElementsByClassName("danger"))[0];
  // B11. Add a click event listener to clear local storage button
  clear.addEventListener('click', (event) => {
    // B12. Clear the local storage
    localStorage.clear();
    // B13. Delete the contents of <main>
    main.innerHTML = ``;
});

}
