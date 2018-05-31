var id = localStorage.getItem('selectedId');
var oneStarP = document.getElementById("oneStar");
var twoStarP = document.getElementById("twoStar");
var threeStarP = document.getElementById("threeStar");
var fourStarP = document.getElementById("fourStar");
var fiveStarP = document.getElementById("fiveStar");
var totalRateP = document.getElementById("totalRate");
var totalScoreP = document.getElementById("totalScore");
var ratingList = [];

var xhr = new XMLHttpRequest();

xhr.onload = function () {
    if (xhr.status == 200) {
        responseObject = JSON.parse(xhr.responseText);
        displayStatistics();
    }
}

xhr.open('GET', 'http://localhost:3300/api/ratings', true);
xhr.send(null);

function displayStatistics() {
    for (var i = 0; i < responseObject.length; i++) {
        if (responseObject[i].bookId == id) {
            ratingList.push(responseObject[i].star);
        }
    }
    var oneTimes = 0;
    var twoTimes = 0;
    var threeTimes = 0;
    var fourTimes = 0;
    var fiveTimes = 0;

    for (var i = 0; i < ratingList.length; i++) {
        if (ratingList[i] == 1) {
            oneTimes++;
        } else if (ratingList[i] == 2) {
            twoTimes++;
        } else if (ratingList[i] == 3) {
            threeTimes++;
        } else if (ratingList[i] == 4) {
            fourTimes++;
        } else if (ratingList[i] == 5) {
            fiveTimes++;
        }
    }
    oneStarP.innerHTML = oneTimes;
    twoStarP.innerHTML = twoTimes;
    threeStarP.innerHTML = threeTimes;
    fourStarP.innerHTML = fourTimes;
    fiveStarP.innerHTML = fiveTimes;
    totalRateP.innerHTML = ratingList.length;
    totalScoreP.innerHTML = (((oneTimes) * 1) + ((twoTimes) * 2) + ((threeTimes) * 3) + ((fourTimes) * 4) + ((fiveTimes) * 5)) / ratingList.length;
}