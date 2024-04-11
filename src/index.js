// get item list from the db.json file
// Your code here
/* 
The .json file has objects with data needed to populate the html elements. 
We use this to make it easier access/modify html elements using JS code.
*/
// meal, meals sold, description, poster
// const filmTitle = document.querySelector('#title');
// //const runTime = document.querySelector('#runtime');
// const filmInfo = document.querySelector('#film-info');
// const showTime = document.querySelector('#showtime');
// const ticketNum = document.querySelector('#ticket-num');
// const button = document.querySelector('#buy-ticket');

const poster = document.querySelector('#poster');
const description = document.querySelector('#description');
const price = document.querySelector('#price');
const made = document.querySelector('#made');
const remaining = document.querySelector('#remaining');
const mealList = document.querySelector('#list');
const mealTitle = document.querySelector('#name');
const button = document.querySelector('#orderbtn')

/*
The replaceChildren() method removes all the children of an element. 
*/
mealList.replaceChildren();

/* A function getAllMeals is called when the page is loaded. 
The function gets elements using their ID from the json file. 
We use this to access/modify html elements using JS code. 
*/
function getAllMeals(id = 1){
    fetch("http://localhost:3000/menu" + id)
    // Use a then method to convert the response to json for easy access by the JS code. 
    .then(res => res.json())
    .then(data => {
        console.log(data.meal);
        setPosterDetails(data);
        // A test to prove that console.log("after") is run after 
        // console.log("before") even if the console.log("before") is run first.
        console.log("before.");
    })
}
// poster details
function setPosterDetails(data){
    // The lines below takes the values from the object in the database and 
    //passes the values to the function as arguments. 
    mealTitle.textContent = data.title;
    //runTime.textContent = `${data.runtime} minutes`;
    description.textContent = data.description;
    price.textContent = data.price;
    remaining.textContent = `${data.remaining} `;
    poster.src = data.poster;
    //The next 2 line set the logic for reducing the number of tickets available.
    // remainingPlates.textContent = (data.made - data.remaining)
    let remainingPlates = (data.made - data.remaining)
    console.log(remainingPlates)
    // Remaining is set as a paremeter for a function ticketNumber. 
    // The function ticketNumber is called to reduce the number of tickets available.
    plateNumber(remainingPlates);
}

function getMeals(){
    fetch('http://localhost:3000/menu')
    .then(res => res.json())
    .then(data => {
        data.forEach(menu => {
            let menuItem = document.createElement('li');
            menuItem.textContent = menu.meal.toUpperCase();
            mealList.append(menuItem);
            menuItem.addEventListener('click', (e) => {
                e.preventDefault();
                setPosterDetails(menu);
            })
        })
        
    })
    
}
function plateNumber(remainingPlates){
    // The event listener below is triggered when the button is clicked to reduce the number of tickets.
    button.addEventListener('click',(e) => {
        // e.preventDefault() prevents the form from submitting to the server and refreshing the page automatically.
        e.preventDefault();
        console.log(e)
            if (remainingPlates > 0){
                remainingPlates -= 1;
            remainingPlates.textContent = remainingPlates;
            }
            else if (remainingPlates <= 0){
                button.textContent = "Sold Out"
            }
        })
        
    }



function initialize(){
    getAllMeals();
    getMeals();
    
}
initialize();
console.log("after.")
