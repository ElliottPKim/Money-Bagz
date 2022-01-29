$("#currentDay").text(moment().format('dddd MMMM Do YYYY'));

//news api string
//GET https://newsapi.org/v2/everything?q=keyword&apiKey=75aa420ce6ff42f5a637c8295a616561

//odds API
var settings = {
    "url": "https://v3.football.api-sports.io/{endpoint}",
    "method": "GET",
    "timeout": 0,
    "headers": {
      "x-rapidapi-key": "XxXxXxXxXxXxXxXxXxXxXxXx",
      "x-rapidapi-host": "v3.football.api-sports.io"
    },
  };
  
  $.ajax(settings).done(function (response) {
    console.log(response);
  });
