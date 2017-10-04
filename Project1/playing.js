var stateCode;
var userInput;
var tmImg;
var tmDate;
var userInput;
var venue;
var address;
var city;
var stcd;
var audio;
var audioplay = false;
var favshowing = false;
var tktlink;
var i = 0;
var j= 0;
var modal = document.getElementById("modal1");

console.log(JSON.parse(localStorage.getItem("fav0")));
//adding favorites on initial load
while (localStorage.getItem(("fav" +j)) != null) {
    var dataset = JSON.parse(localStorage.getItem("fav" + j));
    var favloc = $("#favorites");

    var newfav = $("<tr class='favrow'>");
    newfav.append("<td><a href=" + dataset.tktmtr + " target='_blank'><img id='search-img' src=" + dataset.imgsrc + " alt='Image from Ticketmaster' style='width: 280px;'></a></td>");
    newfav.append("<td>" + dataset.date + "</td>");
    newfav .append("<td>" + dataset.venue + "</td>");
    newfav.append("<td>" + dataset.addy + "</td>");
    newfav.append("<td>" + dataset.citystate +" </td>");

    favloc.append(newfav);

j++;
}


//When click on Profile Pic Audio Plays

$(document).on("click", ".profimg", function () {
    if (audioplay === false) {
        audio.play();
        audioplay = true;
    }else {
        audio.pause();
        audioplay = false;
    }

})


// adding functionality to hide and show favorites

$(document).on("click", "#favheader", function () {
    if (favshowing === false) {
        $(".favSection").show();
        favshowing = true;
    }else {$(".favSection").hide(); favshowing = false;}

})


//DECLARED VARIABLES
$('.modal-trigger').on("click", function() {
    event.preventDefault();

    console.log($(this).val());
    if ($("#search").val().trim() === "") {
        modalshow(1);
    }
    else {
        $(".addedrow").remove();
        // displays the results
        $(".search-result").css("display", "block");
        modalshow(0);
        userInput = $('#search').val();
        //console.log("input: ", userInput);

//   AJAX REQUESTS
//   //WIKIPEDIA - BIOs
// appending to the page
        var queryURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + userInput;

        $.ajax({
            url: queryURL,
            method: 'GET',
            dataType: 'jsonp'
        }).done(function(response) {
            console.log(response);
            for(var num in response.query.pages){
                var resultName = response.query.pages[num].title;
                var resultBio = response.query.pages[num].extract;
            }
            $('#celeb-name').html(resultName);
            $('.bio').html(resultBio);

        }).fail(function(err) {
//   	//code goes here.....
        });

        $.getJSON('https://freegeoip.net/json/').done(function(jsonObject){
            //console.log(jsonObject) ;
            stateCode = jsonObject.region_code;

// this api call is for the events of the celeb in the state
            $.ajax({
                type:"GET",
                url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword="+userInput+"&statecode="+stateCode+"&size=1&apikey=5IR9SCBqOwcv7gTlm7Wy2sZVBeQuOKt7",
                async:true,
                dataType: "json"
            })
                .done(function (response){
                    console.log(stateCode);
                    console.log(userInput);
                    console.log('response: ', response);
                    console.log('image: ', image);
                    console.log(response);

                    var results = response._embedded.events;
                    console.log(response);
                    console.log(results.length)
                    tmImg = results[0].images[0].url;
                    //tmName = results.name;
                    tmDate = results[0].dates.start.localDate;
                    venue = results[0]._embedded.venues[0].name;
                    address = results[0]._embedded.venues[0].address.line1;
                    city = results[0]._embedded.venues[0].city.name || "N/A";
                    stcd = results[0]._embedded.venues[0].state.stateCode || "N/A";
                    tktlink = results[0].url;


                    console.log(results[0].url);
                    console.log(tmDate);
                    console.log(venue);
                    console.log(address);
                    console.log(city);


                    var newImg = $("<tr class='addedrow'>");
                    newImg.append("<td><a href=" + tktlink + " target='_blank'><img id='search-img' src=" +tmImg + " alt='Image from Ticketmaster' style='width: 280px;'></a></td>");
                    var newEvent = $('#events');
                    newImg.append("<td>" + tmDate + "</td>");
                    newImg .append("<td>" + venue + "</td>");
                    newImg.append("<td>" + address + "</td>");
                    newImg.append("<td>" + city + ", " + stcd +" </td>");

                    newEvent.append(newImg);
                    newEvent.append("<tr class='addedrow'><td><button id='fav'>Add Event to Favorites</button></td></tr>");





                })
                .fail(function (){
                    // : function(xhr, status, err) {
                    // This time, we do not end up here!
                    console.log('error');
                });
        });

        var queryURL1 = "http://itunes.apple.com/search?term=" + userInput + "&media=music&country=US&version=2&limit=20&explicit=Y";

//        "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=40e9cece";

        // Creates AJAX call for the specific movie button being clicked
        $.ajax({
            url: queryURL1,
            method: 'GET'
        }).done(function(response) {
            var a = JSON.parse(response);
            console.log(a);
            console.log(a.results);
            console.log(a.results.length);
            console.log(a.results[0].previewUrl);
            audio = new Audio(a.results[0].previewUrl);

            var img = $("<img>");
            img.attr("class", "profimg");
            img.attr("src", a.results[0].artworkUrl100);
            $("#image").append(img);
            // YOUR CODE GOES HERE!!!
            // for (var i = 0; i < a.results.length; i++) {
            //     console.log(a.results[i].artistViewUrl);
            //     console.log(a.results[i].trackCensoredName);
            // }
        })
        $("#search").val("");
    }
});

$('.modal-close').on('click', function() {
    modalshow(0);
});

//function to add favs

$(document).on("click", "#fav", function () {
    //looping to get fav place for localstorage
    //can use a while loop until value is not null, but only limiting users to 10 favorites
    for (var i = 0; i < 10; i++) {
        if (localStorage.getItem("fav" + i) === null) {
            break;
        }
        else {
            continue;
        }
    }
    console.log(i);
    addToFav(i);

})



//FUNCTIONS
//function to popup modal
function modalshow(x) {
    if (x === 1) {
        modal.style.display = "block";
    } else if (x === 0) {
        modal.style.display = "none";

    }
}



//Animates hamburger menu icon.
function hamburger(x) {
    x.classList.toggle("change");
    location.href = "celeb.html";
}
//   Captures user search query.
$('#search-btn').on("click", function(event) {

});

// Ticketmaster for concerts
//this automatically pulls the location and specifically the state code for user for use in ticketmaster api call

function addToFav(i) {
    var info = {"venue": venue, "date": tmDate, "addy" : address, "citystate": city + ", " + stcd, "imgsrc": tmImg, "tktmtr": tktlink};
    localStorage.setItem("fav" + i, JSON.stringify(info));

    var favloc = $("#favorites");

    var newfav = $("<tr class='favrow'>");
    newfav.append("<td><a href=" + tktlink + " target='_blank'><img id='search-img' src=" + tmImg+ " alt='Image from Ticketmaster' style='width: 280px;'></a></td>");
    newfav.append("<td>" + tmDate + "</td>");
    newfav .append("<td>" + venue + "</td>");
    newfav.append("<td>" + address + "</td>");
    newfav.append("<td>" + city + ", " + stcd +" </td>");

    favloc.append(newfav);


}

function addFavtoScreen () {



}