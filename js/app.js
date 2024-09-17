(function($, document, window) {

    $(document).ready(function() {

        // Cloning main navigation for mobile menu
        $(".mobile-navigation").append($(".main-navigation .menu").clone());

        // Mobile menu toggle 
        $(".menu-toggle").click(function() {
            $(".mobile-navigation").slideToggle();
        });
    });

    $(window).load(function() {

    });    

})(jQuery, document, window);

const DEFAULT_CITY = "mumbai";

document.getElementById('cityForm').addEventListener('submit' ,handleSubmit);

function handleSubmit(evt){
    evt.preventDefault();
    let cityName = document.getElementById("city").value;

    if(cityName == ''){
        cityName = DEFAULT_CITY;
    }
    console.log(cityName)
    getWeatherData(cityName)
        .then(data => processWeatherData(data))
        .catch(err => console.log(err));
}
const days = ["sunday" , "monday" ,"tuesday" , "wednesday" , "thursday" , "friday" , "saturday"];

const months = ["jan" , "feb" , "mar" , "apr" , "may" , "jun" , "jul" , "aug" , "sep" , "oct" , "nov" , "dec"]

function manageDateElements(){
    const todaysDate = new Date();

    const dayElements = document.querySelectorAll('.day');
    dayElements.forEach((dayElement , index) => {
        dayElement.innerHTML = days[(todaysDate.getDay() + index)%days.length];
    });

    document.querySelector('.date').innerHTML = `${todaysDate.getDate()} ${months[todaysDate.getMonth()]}`

}

function processWeatherData(data){
    document.querySelector(".location").innerHTML = data.city.name;

    manageDateElements();

    const tempElements = document.querySelectorAll(".temp")
    const weatherIconElements = document.querySelectorAll(".weather-icon");

    const temps = data.list.filter((tempData,index) => index % 8 == 0)

   const humidity =  document.getElementById('humidity').innerHTML = `${Math.round(temps[0].main.humidity)}%`
   console.log(humidity)

    document.getElementById('wind-speed').innerHTML = `${Math.round(temps[0].wind.speed * 3.6)}kmph`

    document.getElementById('wind-degree').innerHTML =  `${Math.round(temps[0].wind.deg)}<sup>o</sup>`;

    tempElements.forEach((tempElement , index) => {
        tempElement.innerHTML = `${Math.round(temps[index].main.temp)}<sup></sup>`

        const imagePath = `./images/icons/${temps[index].weather[0].icon}.svg`;
        weatherIconElements[index].setAttribute('src', imagePath)
    });
}