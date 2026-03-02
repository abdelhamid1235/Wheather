// today variables
var todayName = document.getElementById("today-date-day-name");
var todayNumber = document.getElementById("today-date-day-num");
var todayMonth = document.getElementById("today-date-month");
var todayLocation = document.getElementById("today-location"); 
var todayTemp = document.getElementById("today-temp");
var todayConditionImg = document.getElementById("today-condition-img");
var todayConditionText = document.getElementById("today-condition-text");
var humidity = document.getElementById("humidity");
var wind = document.getElementById("wind");
var windDirection = document.getElementById("wind-direction");


// next Data
var nextDay = document.getElementsByClassName("next-day-name"); 
var nextMaxTemp = document.getElementsByClassName("next-max-temp");
var nextMinTemp = document.getElementsByClassName("next-min-temp");
var nextConditionImg = document.getElementsByClassName("next-condition-img");
var nextConditionText = document.getElementsByClassName("next-condition-text");
// search input
var searchInput = document.getElementById("search");
var searchSubmit = document.getElementById("submit");

async function StartApp(city ="cairo"){
    var WheatherDate = await getWheater(city);
    if(! WheatherDate.error){
        displayTodayData(WheatherDate);
    }else{
        alert(`${city} `+WheatherDate.error.message)
    }
}
StartApp();
async function getWheater(city){
    var wheaterResponse =await fetch(`https://api.weatherapi.com/v1/forecast.json?key=b98d3b104bbd400586c72719260202&q=${city}&days=7`);
    var WheatherDate = await wheaterResponse.json();
    return WheatherDate;
}
function displayTodayData(city){
    var todayDate = new Date();
    todayNumber.innerHTML= todayDate.getDate();
    todayName.innerHTML = todayDate.toLocaleString("en-us",{weekday:"long"});
    todayMonth.innerHTML = todayDate.toLocaleString("en-us",{month:"long"});
    todayLocation.innerHTML = city.location.name;
    todayTemp.innerHTML = city.current.temp_c;
    todayConditionImg.setAttribute("src","http:"+city.current.condition.icon);
    todayConditionText.innerHTML = city.current.condition.text;
    humidity.innerHTML = city.current.humidity + "%";
    wind.innerHTML = city.current.wind_kph + "Kph";
    windDirection.innerHTML = city.current.wind_dir;


    // next 
    var wheatherNext = city.forecast.forecastday;
    for(var i=0;i<2;i++){
        var nextData= new Date(wheatherNext[i+1].date)
        nextDay[i].innerHTML = nextData.toLocaleString("en-US", {weekday: "long"});
        nextConditionImg[i].setAttribute("src","http:"+wheatherNext[i+1].day.condition.icon);
        nextMaxTemp[i].innerHTML= wheatherNext[i+1].day.maxtemp_c;
        nextMinTemp[i].innerHTML= wheatherNext[i+1].day.mintemp_c;
        nextConditionText[i].innerHTML = wheatherNext[i+1].day.condition.text
    }
}

searchSubmit.addEventListener("click", function(){
    StartApp(searchInput.value);
    searchInput.value=""
})

//change photo body
let arrImg = ["01.jpg","02.jpg","03.jpg"];
let hero = document.querySelector(".hero");

setInterval(() => {
    let random = Math.floor(Math.random() * arrImg.length);
    hero.style.backgroundImage = `url(../image/${arrImg[random]})`;
}, 2000);

