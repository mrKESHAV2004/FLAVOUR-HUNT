const searchbox = document.querySelector(".searchBox");
const searchbtn = document.querySelector(".searchbtn");
const recipecontainer = document.querySelector(".recipe-container");
const recipecontent = document.querySelector(".recipe-details-content");
const recipeclosebtn = document.querySelector(".recipe-close");

const fetchRecipes = async (q)=>{
    recipecontainer.innerHTML = "<h2>Fetching Recipes...</h2>"
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${q}`);
    const response =await data.json();
    recipecontainer.innerHTML = ""
    response.meals.forEach(meal => {
        const recipediv = document.createElement('div');
        recipediv.classList.add('recipe');
        recipediv.innerHTML = `
        <img src = "${meal.strMealThumb}">
        <div style="padding:10px">
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish</p>
            <p>Category:<span>${meal.strCategory}</span></p>
        </div>
        `
        const button = document.createElement('button');
        button.textContent = "View Recipe";
        recipediv.appendChild(button);
        button.addEventListener('click',()=>{
            openRecipePopup(meal);
        });

        recipecontainer.appendChild(recipediv);
    });
}

const fetchingredients = (meal)=>{
    let items = "";
    for(let i=1;i<=20;i++){
        const Ingredient = meal[`strIngredient${i}`];
        if(Ingredient){
            const measure = meal[`strMeasure${i}`];
            items += `<li>${measure} ${Ingredient}</li>`
        }
        else{
            break;
        }
    }
    return items;
}

const openRecipePopup = (meal)=>{
    recipecontent.innerHTML = `
    <h2 class="recipename">${meal.strMeal}</h2>
    <h3>Ingredients</h3>
    <ul class="items">${fetchingredients(meal)}</ul>
    <div class="recipeInstruction">
        <h3>Instructions</h3>
        <p>${meal.strInstructions}</p>
    </div>
    `
    recipecontent.parentElement.style.display = "block"
};

recipeclosebtn.addEventListener('click',()=>{
    recipecontent.parentElement.style.display = "none";
})
searchbtn.addEventListener('click',(e)=>{
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    fetchRecipes(searchInput);
})