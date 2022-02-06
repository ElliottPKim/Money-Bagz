$("#currentDay").text(moment().format('dddd MMMM Do YYYY'));

//news api string
function getNews() {
    fetch("https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=75aa420ce6ff42f5a637c8295a616561")
    .then(function(response) {
        response.json().then(function(data) {
            console.log(data)
                var newArticle = document.createElement('div');
                var newH = document.createElement('h3');
                var newP = document.createElement('p');

            if (data.status !== 'error') {
                //grab most recent news article
                var title = data.response[0].articles[0].title;
                var description = data.response[0].articles[0].description;

                newH.textContent = title;
                newP.textContent = description;

                newArticle.appendChild(newH);
                newArticle.appendChild(newP);

                $('#currentNews').append(newArticle);
            } else {
                //display chuck norris joke
                fetch("https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random", {
	                "method": "GET",
	                "headers": {
		                "accept": "application/json",
		                "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
		                "x-rapidapi-key": "c25b4f541bmsh7206fea8a898998p18d7f2jsna5f869165bfe"
	                }
                })
                .then(function(response) {
	                response.json().then(function(data) {
                        console.log(data.value);

                        newH.textContent = 'If the news has an error, you will see a joke below:)';
                        newP.textContent = data.value;

                        newArticle.appendChild(newH);
                        newArticle.appendChild(newP);

                        $('#currentNews').append(newArticle);
                    })
                })
                .catch(function(err) {
	                console.error(err);
                });
            }
        })
    })
    .catch(function(err) {
        console.log(err);
    })
}

getNews();


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
                    basketballGamesLi.classList = 'list-group-item futureGames';
                } else {
                    basketballGamesLi.textContent = `H: ${gamesHome}--Score: ${scoresHome} A: ${gamesAway}--Score: ${scoresAway}`;
                    basketballGamesLi.classList = 'list-group-item pastGames';
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

//must update before every game
function grabOdds() {
    fetch("https://v1.basketball.api-sports.io/odds?season=2021-2022&bookmaker=1&game=138026&league=12", {
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
    removeButton.classList = 'btn btn-warning';
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