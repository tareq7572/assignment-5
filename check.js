const search_food = document.getElementById('food-btn');
const mealList = document.getElementById('food');
const foodDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
search_food.addEventListener('click',food_list);
mealList.addEventListener('click', get_detail);
recipeCloseBtn.addEventListener('click', () => {
    foodDetailsContent.parentElement.classList.remove('showRecipe');
});



function food_list(){
    let searchInputTxt = document.getElementById('food-search').value.trim();
    
    if(!searchInputTxt)
    {
        let html = "";
        html = "Sorry,no food with this name";
        mealList.classList.add('notFound');
        mealList.innerHTML = html;
    }
    else{

    


    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchInputTxt}`)
    
    .then(response => response.json())
    .then(data => {
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                    <div class = "food-item" data-id = "${meal.idMeal}">
                        <div class = "food-img">
                            <img src = "${meal.strMealThumb}" alt = "food">
                        </div>
                        <div>
                            <h2>${meal.strMeal}</h2>
                            <a href = "#" class = "detail-btn">Show Detail</a>
                        </div>
                    </div>
                `;
            });
            mealList.classList.remove('notFound');
        } else{
            html = "Sorry,no food with this name";
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
    
    } 
}



function get_detail(e){
    e.preventDefault();
    if(e.target.classList.contains('detail-btn')){
        let foodItem = e.target.parentElement.parentElement;
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${foodItem.dataset.id}`)
        .then(response => response.json())
        .then(data => food_detail(data.meals));
    }
}


function food_detail(meal){
    console.log(meal);
    meal = meal[0];
    let html = `
        <h2>${meal.strMeal}</h2>
        
        <div class = "detail-food-img">
            <img src = "${meal.strMealThumb}" alt = "">
        </div>

        <div>
            <h3>Recipe:</h3>
            <p>${meal.strInstructions}</p>
        </div>
        
      
    `;
    foodDetailsContent.innerHTML = html;
    foodDetailsContent.parentElement.classList.add('showRecipe');
}