const getSearchInput = document.getElementById('search-bar');
const getAllSearchedFood = document.getElementById('all-food-searched');
const getClickedFood = document.getElementById('food-show');



                    // input nothing will show nothing
setInterval(() => {
    if (getSearchInput.value == '') {
        getAllSearchedFood.innerHTML = '';
        getClickedFood.innerHTML = '';
    }
}, 0);


                    // searching food 
document.getElementById('search').addEventListener('submit', (e) => {
    getClickedFood.innerHTML = '';
    getAllSearchedFood.innerHTML = '';
    e.preventDefault();
    let foodQuery = document.getElementById('search-bar').value;
    if (foodQuery !== '') {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodQuery}`)
            .then(res => res.json())
            .then(data => showFood(data))
            .catch(err => console.log(err))
    }

});


                        // show food items under the search bar
function showFood(foodObject) {
    let foods = foodObject.meals;
    getAllSearchedFood.innerHTML = ``;

    if (foods === null) {
        // this will show error, for Input,that is not fetching from api
        getAllSearchedFood.innerHTML = 
        `<div class="error-messeage">
            <div class="error-img">
                <i class="fas fa-frown"></i>
            </div>
            <div class="error-title">
                <h3>Sorry! No Query Found</h3>
                <h5>Please input correct keyword for searching food.</h5>
                <h6>Thanks you very much</h6>
            </div>
        </div>`
    }
    foods.forEach(food => {

        getAllSearchedFood.innerHTML = getAllSearchedFood.innerHTML + 
        `<div class="col-sm-6 col-md-4 col-lg-3">
            <div class="foods" id="${food.idMeal}">
                <div class="food-img">
                    <img src="${food.strMealThumb}" alt="">
                    <h4 class="detail-previewer">See Food Details</h4>
                </div>
                <h6 class="food-name">${food.strMeal}</h6>
            </div>
        </div>`;
    });
    // console.log(foods);
    foods.forEach(food => {
        document.getElementById(`${food.idMeal}`).addEventListener('click', () => {
            getClickedFood.innerHTML = `
            <div class="food-show-img">
                <img src="${food.strMealThumb}" alt="">
            </div>
            <div class="food-show-name">
                <h3>${food.strMeal}</h3>
            </div>
            <h4>Ingredients</h4>
            <ul id="food-show-list">
            </ul>`;
            const getClickedFoodList = document.getElementById('food-show-list');

            let i = 1;
            while(food['strIngredient'+i] !== "" && food['strIngredient'+i] !== undefined){
                getClickedFoodList.innerHTML = getClickedFoodList.innerHTML + 
                `<li><i class="fa fa-check-square" aria-hidden="true"></i>
                ${food['strMeasure'+i]} ${food['strIngredient'+i]}
                </li>`;
                i++;
            }
            window.scrollTo({top : 200, behavior : "smooth"});
        })
    });
}