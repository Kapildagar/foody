const searchbtn = document.getElementById("search-btn");
const meallist = document.getElementById("meal");

console.log(searchbtn);

meallist.addEventListener('click', moreinfo)
function getmeallist() {
    console.log("clicked");
    let searchmeal = document.getElementById("inputtext").value.trim();
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchmeal}`)
        .then((response) => response.json())
        .then((data) => {
            console.log(data)
            
            let html = ""

            if (data.meals) {
                data.meals.forEach(meal => {
                    html += `
                         <div class="img" data-id=${meal.idMeal}>
                          <img src=${meal.strMealThumb} alt="">
                           <h1>${meal.strMeal}</h1>
                            <button  ><a href="" class="recipe-btn">watch recipce
                                      </a></button>
                         </div>
                `;

                });
            }
            meallist.innerHTML = html
        })


}
const moreinf=document.getElementById("moreinfo")
console.log(document.getElementById("clicked"))

function moreinfo(e) {
    e.preventDefault()
    console.log(e.target)
    if (e.target.classList.contains('recipe-btn')) {
        const mealitem = e.target.parentElement.parentElement;
        console.log(mealitem)
        const id = mealitem.dataset.id
        console.log(mealitem.dataset.id);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((response) => response.json())
            .then((data) => recipeifo(data.meals));
            
    }
}

function recipeifo(meal) {
    console.log(meal);
    
    meal = meal[0];
   let html = `
    <div class="heading">
    <h1>Food Recipe</h1>
</div>
<div class="close">
    <button class="close-btn">
    <img src="close.png" alt="">
</button>
</div>
<div class="recpie-name">
    <h1>${meal.strMeal}</h1>
</div>
<div class="des">
    <p>${meal.strInstructions}</p>
</div>
<div class="desimg">
    <img src=${meal.strMealThumb} alt="">
</div>
<button class="watchnow">watch now</button>
    
    `;
    moreinf.innerHTML = html;
    moreinf.style.visibility="visible"
}