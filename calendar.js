var eventsArray = [];
var s_date;

class dayEvent {
  constructor(s,title, description,location) {
    this.start=s;
    this.title = title;
    this.description = description;
    this.location=location;
  }
}



$(function() {

  if(JSON.parse(localStorage.getItem("events"))){
    eventsArray = JSON.parse(localStorage.getItem("events"));
  }
  $('#calendar').fullCalendar({

    header: { 
      left:'prev,next,today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay' 
    }, // buttons for switching between views
           

    events: eventsArray,
    selectable:true,
    selectHelper:true,
    editable:true,
    eventLimit:true,
    dayClick: function(date, jsEvent, view) {
      var mymodal = $('#myModal');
      mymodal.find('.modal-title').text("Event for " + date.format());
      mymodal.modal('show');
      s_date=date;
   
    },
    eventClick: function(calEvent, jsEvent, view) {
      var mymodal = $('#detailModal');
      //mymodal.find('.modal-title').text("Event for " + date.format());
      mymodal.modal('show');
      mymodal.find('.modal-title').text(calEvent.title);

      $("#details").empty();
      $('#details').append("<p > <b>Location: </b> "+calEvent.location+"</p>");
      $('#details').append("<p > <b>Detail: </b> "+calEvent.description+"</p>");
      console.log(calEvent);
    //alert('Event: ' + calEvent.title);
    //alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
    //alert('View: ' + view.name);


    // change the border color just for fun
    //$(this).css('border-color', 'red');

  }


  })

  var calendar = $('#calendar').fullCalendar('getCalendar');

});


addEvent = function(){


  var title = document.getElementById('e_title').value;
  var desc = document.getElementById('e_description').value;
  var loc = document.getElementById('e_location').value;
  console.log(title);
  console.log(desc);
  console.log(loc);
  eventsArray.push(new dayEvent(s_date.format(),title,desc,loc));
  console.log(eventsArray);
  $('#calendar').fullCalendar( 'renderEvent', new dayEvent(s_date.format(),title,desc,loc), true);
  document.getElementById('e_title').value='';
  document.getElementById('e_description').value='';
  document.getElementById('e_location').value='';
  localStorage.setItem("events", JSON.stringify(eventsArray));
}


let allEvents = function()
{
  $("#list").empty();
  let my_events = JSON.parse(localStorage.getItem("events"));
  $('#list').append("<ul id='newList'></ul>");
  for (event = 0; event < my_events.length; event++) {
    if (s_date.format()==my_events[event].start){

      $("#newList").append("<li>"+my_events[event].title + ":" + my_events[event].start+"</li>");

    }
}

}


let getWeather = function(){

   if(navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(fetchWeather, showError);
    } else { 
      alert("Geolocation is not supported by this browser.");
    }


}


function fetchWeather(position) {
    
  $.ajax({
    url:"https://www.metaweather.com/api/location/search/?lattlong="+position.coords.latitude+","+position.coords.longitude,
      dataType: 'json', // Notice! JSONP <-- P (lowercase)
      success:function(json){
         // do stuff with json (in this case an array)
        city=json[0].woeid;

        let m = s_date._d.getMonth()+1;
        let d = s_date._d.getFullYear()+"/"+m+"/"+s_date._d.getDate();
//another ajax
          $.ajax({


            url:"https://www.metaweather.com/api/location/"+city+"/"+d,
              dataType: 'json', // Notice! JSONP <-- P (lowercase)
              success:function(json){
         // do stuff with json (in this case an array)
                console.log(json);
                var mymodal = $('#weatherModal');
      //mymodal.find('.modal-title').text("Event for " + date.format());
                mymodal.modal('show');



              }, 
              error:function(){
                alert("Error");
              }      
          });
     },
     error:function(){
         alert("Error");
     }      
  });
    //data is the JSON string
  

}


function showError(error) {
    switch(error.code) {
        case error.PERMISSION_DENIED:
          alert("User denied the request for Geolocation.")
            break;
        case error.POSITION_UNAVAILABLE:
          alert("Location information is unavailable.")
            break;
        case error.TIMEOUT:
          alert("The request to get user location timed out.")
            break;
        case error.UNKNOWN_ERROR:
          alert("An unknown error occurred.")
            break;
    }
}

