const getSearchInput = document.getElementById('search-bar');
const getAllSearchedFood = document.getElementById('all-food-searched');
setInterval(() => {
    if (getSearchInput.value == '') {
        getAllSearchedFood.innerHTML = '';
    }
}, 0);



document.getElementById('search').addEventListener('submit', (e) => {
    e.preventDefault();
    let foodQuery = document.getElementById('search-bar').value;
    if (foodQuery !== '') {
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${foodQuery}`)
            .then(res => res.json())
            .then(data => showFood(data))
            .catch(err => console.log(err))
    }

});

function showFood(foodObject) {
    let foods = foodObject.meals;
    getAllSearchedFood.innerHTML = ``;

    if (foods === null) {
        getAllSearchedFood.innerHTML = `
        <div class="error-messeage">
            <div class="error-img">
                <i class="fas fa-frown"></i>
            </div>
            <div class="error-title">
                <h3>Sorry! No Query Found</h3>
                <h5>Please input correct keyword for searching food.</h5>
                <h6>Thanks you very much</h6>
            </div>
        </div>
        `
    }
    foods.forEach(food => {

        getAllSearchedFood.innerHTML = getAllSearchedFood.innerHTML + `
        <div class="col-sm-6 col-md-4 col-lg-3">
            <div class="foods" id="${food.idMeal}">
                <div class="food-img">
                    <img src="${food.strMealThumb}" alt="">
                    <h4 class="detail-previewer">See Food Details</h4>
                </div>
                <h6 class="food-name">${food.strMeal}</h6>
            </div>
        </div>
        `;
    });
    // console.log(foods);
    foods.forEach(food => {
        document.getElementById(`${food.idMeal}`).addEventListener('click', () => {
            document.getElementById('food-show').innerHTML = `
            <div class="food-show-img">
                <img src="${food.strMealThumb}" alt="">
            </div>
            <div class="food-show-name">
                <h3>${food.strMeal}</h3>
            </div>
            <h4>Ingredients</h4>
            <ul id="food-show-list"></ul>`

            console.log(foods);
            // foodIngredients = food.strInstructions;
            // console.log(foodIngredients);
            // foodIngredients.replace('\r','</li>');
            // foodIngredients.replace('\n','<li>');
            // console.log(foodIngredients);
            // foodIngredients = '<li>' + foodIngredients + '</li>';
            // document.getElementById('food-show-list').innerHTML = foodIngredients;

            foodIngredients = food.strInstructions.split('\r\n');
            let li ;
            foodIngredients.forEach(ingredient => {
                li = document.createElement('li');
                li.innerHTML = `<li><i class="fas fa-check-square"></i>${ingredient}</li>`;
                document.getElementById('food-show-list').appendChild(li);
            });



            // for(ingredient in foodIngredients){
            //     li = document.createElement('li')
            //     console.log(ingredient);
            //     li.innerHTML = `<li>${ingredient}</li>`;
            //     console.log(li);
            //     document.getElementById('food-show-list').appendChild(li);
            // }
        })
    });
}

