$("#currentDay").text(moment().format('dddd MMMM Do YYYY'));

//news api string
//GET https://newsapi.org/v2/everything?q=keyword&apiKey=75aa420ce6ff42f5a637c8295a616561

//odds API

//grab API
function grabOddsApiBasketball() {
    fetch("https://v1.basketball.api-sports.io/statistics?season=2021-2022&team=145&league=12", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "v1.basketball.api-sports.io",
		    "x-rapidapi-key": "d7e04f9168ce8cf62486f917e33571fc"
	    }
    })
    .then(function(response) {
	    response.json();
        console.log(response);
    })
    .then(function(data) {
        grabOdds(data, team);       
    })
}

function grabOdds(team) {

    var basketball = document.createElement('div');
    //basketball.textContent = 

    $('#matchUps').append(basketball);
}

grabOddsApiBasketball();