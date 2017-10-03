//DECLARED VARIABLES
var userInput;


//FUNCTIONS
//Animates hamburger menu icon.
function hamburger(x) {
    x.classList.toggle("change");
    location.href = "celeb.html";
}

//Captures user search query.
$('#search-btn').on("click", function(event) {
	event.preventDefault();
	userInput = $('#search').val();
	console.log("input: ", userInput);


//AJAX REQUESTS
//WIKIPEDIA - BIOs
var queryURL = 'https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=' + userInput;

$.ajax({
	url: queryURL,
	method: 'GET',
	dataType: 'jsonp'
}).done(function(response) {
	for(var num in response.query.pages){
		var resultName = response.query.pages[num].title;
		var resultBio = response.query.pages[num].extract;
	}
	console.log('Success!!!');
	$('#celeb-name').html(resultName);
	$('.bio').html(resultBio);

}).fail(function(err) {
	//code goes here.....
});




// Ticketmaster for concerts
//this automatically pulls the location and specifically the state code for user for use in ticketmaster api call
$.getJSON('https://freegeoip.net/json/').done(function(jsonObject){
   //console.log(jsonObject) ; 
    var stateCode = jsonObject.region_code;
 

// this api call is for the events of the celeb in the state
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + userInput + "&statecode=" + stateCode + "&size=1&apikey=5IR9SCBqOwcv7gTlm7Wy2sZVBeQuOKt7",
  async:true,
  dataType: "json",
  success: function(json) {
		console.log(json);
		var results = json._embedded.events[0];

		tmImg = results.images[0].url;
		tmName = results.name;
		tmDate = results.dates.start.localDate;

		var newImg = $('#image').html(`<img id="search-img" src=${tmImg} alt="Image from Ticketmaster">`);
		var newEvent = $('.events').html(tmDate);

  },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
  }
});

});

$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + userInput + "&size=1&apikey=5IR9SCBqOwcv7gTlm7Wy2sZVBeQuOKt7",
  async:true,
  dataType: "json",
  success: function(json) {
              console.log(json);
              // Parse the response.
              // Do other things.
           },
  error: function(xhr, status, err) {
              // This time, we do not end up here!
           }
});


});
