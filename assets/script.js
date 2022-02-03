$("#currentDay").text(moment().format('dddd MMMM Do YYYY'));

//news api string
//GET https://newsapi.org/v2/everything?q=keyword&apiKey=75aa420ce6ff42f5a637c8295a616561

//odds API

//grab API
// function grabOddsApiBasketball() {
//     fetch("https://v1.basketball.api-sports.io/games?id=145", {
// 	    "method": "GET",
// 	    "headers": {
// 		    "x-rapidapi-host": "v1.basketball.api-sports.io",
// 		    "x-rapidapi-key": "46e87bccbba421563a6d9139daeba0cf"
// 	    }
//     })
//     .then(function(response) {
// 	    response.json().then(function (data) {
//             console.log(data);

//             var basketball = document.createElement('div');
//             basketball.textContent = `this sport is in: ${data.response[3]}`;

//             $('#matchUps').append(basketball);

//             // grabOdds(data);
//         });
//     })
//     .catch(function (err) {
//         console.log(err);
//     });
        
//}

// function grabOdds(response) {

//     var basketball = document.createElement('div');
//     basketball.textContent = response.games.all;

//     $('#matchUps').append(basketball);
// }

//grabOddsApiBasketball();

//on click basketball button

$('#basketballBtn').on('click', function() {
    
    $('#basketballTeams').css('visibility', 'visible');
    
})

//modals
var openModal = document.getElementById('openModal');
var closeSpan = document.getElementById('closeFirst');
var closeSpan2 = document.getElementById('closeSecond');
var responseModal = document.getElementById('responseModal');
var accessResponseModal =document.getElementsByClassName('notYet');

for(var i = 0; i < accessResponseModal.length; i++) {
    accessResponseModal[i].onclick = function() {
        responseModal.style.display = 'block';
    }
}

closeSpan.onclick = function() {
    openModal.style.display = 'none';
}

closeSpan2.onclick = function() {
    responseModal.style.display = 'none';
}

window.onclick = function(event) {
    if (event.target == openModal) {
        openModal.style.display = 'none';
    } else if (event.target == responseModal) {
        responseModal.style.display = 'none';
    }
}