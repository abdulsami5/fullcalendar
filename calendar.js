$(function() {
       $('#calendar').fullCalendar({

            header: { 
              left:'prev,next,today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay' 
              }, // buttons for switching between views
           
            selectable:true,
            selectHelper:true,
            editable:true,
            eventLimit:true,
             dayClick: function(date, jsEvent, view) {
    alert('a day has been clicked!' + date.format());
    console.log(date._d.getDate());
    console.log(date);
  }



     })

});
