$("#currentDay").text(moment().format('dddd MMMM Do YYYY'));

//news api string
function getNews() {
    fetch()
}
//GET https://newsapi.org/v2/everything?q="football"&apiKey=757848ada6434055b26bb2458d582979

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
                
                
                var basketballGamesLi = document.createElement('li');
                
                
                
               

                //for(i = 0; i < data.response.length; i++) {
                // $(basketballGamesLi[i]).text('Match-Ups- Home: ' + gamesHome + 'Away: ' + gamesAway)
                
                if (scoresHome === null) {
                    basketballGamesLi.textContent = `H: ${gamesHome}--Score: TBA A: ${gamesAway}--Score: TBA`;
                    basketballGamesLi.classList = 'list-group-item allGames';
                } else {
                    basketballGamesLi.textContent = `H: ${gamesHome}--Score: ${scoresHome} A: ${gamesAway}--Score: ${scoresAway}`;
                    basketballGamesLi.classList = 'list-group-item allGames';
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

var lakerGames = document.getElementById('145');

lakerGames.onclick = function() {
    grabGamesApiBasketball();
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