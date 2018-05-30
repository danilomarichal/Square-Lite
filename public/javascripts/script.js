
$('#upd').on('click',function(){
$('#update_form').show();
});

window.on
//*****************DATES*********************
function updateClock() {
  var now = new Date();
  var date = now.getDate();
  var currentDay = now.getDay();
  var days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

  var hours = now.getHours();
  var minutes = now.getMinutes();
  var seconds = now.getSeconds();

  var currentMonth = now.getMonth();
  var months =["January","February","March","April","May","June","July","August","September","October","November","December"];
  var year=now.getFullYear();

        if(seconds.toString().length===1){
         seconds="0"+seconds;
       }else{
         seconds;
       }

       if(minutes.toString().length===1){
         minutes="0"+minutes;
       }else{
         minutes;
       }

        for(i=0; i<months.length; i++){
          if(currentMonth === i){
           currentMonth=months[i];
          }
      }
        for(y=0; y<days.length; y++){
          if(currentDay === y){
            currentDay=days[y];
          }
        }
    $('#time').text("It's "+currentDay+", "+[currentMonth, date, year].join(" ")+" "+new Date().toLocaleString());
    $('#month').text(currentMonth+" "+year);
    $('#actual_date_time').text(new Date().getHours()+":"+new Date().getMinutes()+":"+new Date().getSeconds());

    setTimeout(updateClock, 1000);
}
updateClock();


//***********SIDE BAR******************

function openNav() {
  $("#sliding").css({"width":"30%"});
  $('#body').css({"width":"70%","margin-left":"30%","transition":"0.4s"});
};

function closeNav() {
    $("#sliding").css({"width":"0"});
    $('#body').css({"width":"100%","margin-left":"0","transition":"0.4s"});
};


$('#plus').on('click', function(){
  $('#add').css({"width":"55%","margin": "0 5% 0 5%","margin-top": "50px","overflow":"hidden"});
  $('#task').css({"display":"inline-block"});
});

$('#cancel_task').on('click', function(){
  $('#task').css({"display":"none"});
  $('#add').css({"width":"70%","margin": "0 15% 0 15%","margin-top": "50px","overflow":"hidden"});
});



/*function init() {
  var now = new Date();
        scheduler.init('scheduler_here', now,"month");
    }
init();*/

//--------------------------------------


 var callAjax = function(){
  var key="b9d49881525b7f99186fc52c7c224e30";
    $.ajax({
        url:"https://api.openweathermap.org/data/2.5/weather?zip=07030,us&APPID="+key,
        method:"GET",
        success: function(data){

$('#city').text("Area: "+data.name);

    }
  });
}
callAjax();


