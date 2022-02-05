$("#currentDay").text(moment().format('dddd MMMM Do YYYY'));

//news api string
//function getNews() {
//     fetch("https://newsapi.org/v2/everything?q=football&apiKey=757848ada6434055b26bb2458d582979")
//     .then(function(response) {
//         response.json().then(function(data) {
//             console.log(data)
//         })
//     })
// }

//getNews();

//odds API

//grab API
function grabGamesApiBasketball() {
    fetch("https://v1.basketball.api-sports.io/games?season=2021-2022&league=12&team=145", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "v1.basketball.api-sports.io",
		    "x-rapidapi-key": "46e87bccbba421563a6d9139daeba0cf"
	    }
    })
    .then(function(response) {
	    response.json().then(function (data) {
            console.log(data);

            for(i = 0; i < data.response.length; i++) {
                var gamesAway = data.response[i].teams.away.name;
                var gamesHome = data.response[i].teams.home.name;
                var scoresAway = data.response[i].scores.away.total;
                var scoresHome = data.response[i].scores.home.total;
                var basketballGamesDiv = document.createElement('div');
                var basketballGamesLi = document.createElement('li');

                // console.log(gamesAway);
                // console.log(gamesHome);
                // console.log(scoresAway);
                // console.log(scoresHome);
                
                if (scoresHome === null) {
                    basketballGamesLi.textContent = `H: ${gamesHome}--Score: TBA A: ${gamesAway}--Score: TBA`;
                    basketballGamesLi.classList = 'list-group-item pastGames';
                } else {
                    basketballGamesLi.textContent = `H: ${gamesHome}--Score: ${scoresHome} A: ${gamesAway}--Score: ${scoresAway}`;
                    basketballGamesLi.classList = 'list-group-item futureGames';
                }
                
                basketballGamesDiv.appendChild(basketballGamesLi);
                
                $('#matchUps').append(basketballGamesDiv);

            }
        });
    })
    .catch(function (err) {
        console.log(err);
    });
        
}

function grabNextGame() {
    fetch("https://v1.basketball.api-sports.io/games?season=2021-2022&league=12&team=145", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "v1.basketball.api-sports.io",
		    "x-rapidapi-key": "46e87bccbba421563a6d9139daeba0cf"
	    }
    })
    .then(function(response) {
	    response.json().then(function (data) {
            console.log(data);

            var nextGameDiv = document.createElement('div');
            var nextGameDate = document.createElement('span');
            nextGameDate.classList = 'list-group-item';
            nextGameDate.textContent = `(${moment(data.response[59].date).format('LLLL')})`;

            nextGameDiv.appendChild(nextGameDate);

            $('#matchUps').append(nextGameDiv);
        });
    })
    .catch(function (err) {
        console.log(err);
    });
}

//151-145
//odds?season=2021-2022&bookmaker=4&game=138026&league=12
//games?h2h=145-151
function grabOdds() {
    fetch("https://v1.basketball.api-sports.io/odds?season=2021-2022&bookmaker=1&game=138013&league=12", {
	    "method": "GET",
	    "headers": {
		    "x-rapidapi-host": "v1.basketball.api-sports.io",
		    "x-rapidapi-key": "46e87bccbba421563a6d9139daeba0cf"
	    }
    })
    .then(function(response) {
	    response.json().then(function (data) {
            console.log(data);
            console.log(data.response[0].bookmakers[0]);
            
            for(i = 0; i < data.response[0].bookmakers[0].bets[0].values.length; i++) {
                var odds = data.response[0].bookmakers[0].bets[0].values[i].odd;
                var value = data.response[0].bookmakers[0].bets[0].values[i].value;
                var createOddDiv = document.createElement('div');
                var createOddLi = document.createElement('li');

                createOddLi.textContent = `Odds are ${odds}| for ${value}`;
                createOddLi.classList = 'list-group-item';
                createOddDiv.appendChild(createOddLi);

                $('#odds').append(createOddDiv);
            }
        })
    })
    .catch(function (err) {
        console.log(err);
    })
        
}


var lakerGames = document.getElementById('145');

lakerGames.onclick = function() {
    //remove paragraph
    $('#myFavoriteTeam').remove();

    //create new button
    var createSave = document.createElement('button');
    createSave.textContent = 'Save As Favorite';
    createSave.classList = 'btn btn-warning';
    createSave.setAttribute('id', 'favoriteTeamBtn');

    $('#matchUps').append(createSave);

    createSave.onclick = function() {
        //local storage save
        var favoriteTeam = $('#145').text();
        localStorage.setItem('favoriteTeam', JSON.stringify(favoriteTeam));

        console.log(favoriteTeam);
    }

    grabGamesApiBasketball();
    grabOdds();
}


//on click basketball button
function toggleTeams() {
    var basketballTeamsLi = document.getElementById('basketballTeams');
    var displayBTeamsLi = basketballTeamsLi.style.display;

    if (displayBTeamsLi !== 'block') {
        basketballTeamsLi.style.display = 'block';
    } else {
        basketballTeamsLi.style.display = 'none';
    }
}
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

//local storage set
var retrieveFav = localStorage.getItem('favoriteTeam');
console.log(retrieveFav);

if (retrieveFav !== null) {
    var removeButton = document.createElement('button');
    removeButton.textContent = 'Remove From Favorite';
    removeButton.classList = 'btn btn-warning removeBtn' ;
    removeButton.onclick = function() {
        localStorage.removeItem('favoriteTeam');
        location.reload();
    }

    $('#matchUps').prepend(removeButton);
    $('#myFavoriteTeam').text(`${retrieveFav} has been selected as your favorite team! Their next game is: `, grabNextGame());
}

//return to home page
var homeBtn = document.getElementById('home');

homeBtn.onclick = function() {
    location.reload();
}