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


 


     })

});
