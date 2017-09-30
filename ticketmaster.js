
  //this automatically pulls the location and specifically the state code for user for use in
  // ticketmaster api call
$.getJSON('https://freegeoip.net/json/').done(function(jsonObject){
   //console.log(jsonObject) ; 
    var statecode = jsonObject.region_code;
   
   //will need ID used in html to pull the searched celeb
var celebSearch = $("#celebSearch").val();

// this api call is for the events of the celeb in the state
$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword="+celebSearch+"&statecode="+stateCode+"&size=1&apikey=5IR9SCBqOwcv7gTlm7Wy2sZVBeQuOKt7",
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

$.ajax({
  type:"GET",
  url:"https://app.ticketmaster.com/discovery/v2/events.json?keyword="+celebSearch+"&size=1&apikey=5IR9SCBqOwcv7gTlm7Wy2sZVBeQuOKt7",
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


