var date1 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31];

var date2 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30];

var date3 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28];

var date4 = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29];

var months = [1,2,3,4,5,6,7,8,9,10,11,12];

console.log(date1[20])


function getDates(monthNumber){
  var complete ="";
  var back = "";
  var forth="";

for(i=2; i<months.length; i++){

  if(monthNumber===3||monthNumber===5||monthNumber===7||monthNumber===8||monthNumber===10||monthNumber===12 || monthNumber===1){
  complete=date1;
  prev=months[i-1];

  if(months[i]===1){
    prev=12;
  }if(prev===3||prev===5||prev===7||prev===8||prev===10||prev===12||prev===1){
  back=date1;
  }else if(prev===4||prev===6||prev===9||prev||11){
  back=date2;
  }else if(prev===2){
    back=date3;
  }else{
    back="not a number";
  }


  next = months[i+1];
  if(months[i]===12){
next=1;
  }if(next===3||next===5||next===7||next===8||next===10||next===12||next===1){
  forth=date1;
  }else if(next===4||next===6||next===9||next||11){
  forth=date2;
  }else if(next===2){
    forth=date3;
  }else{
    forth="not a number";
  }

}else if( monthNumber===2){
complete=date3;
prev=months[i-1];
next = months[i+1];

  if(months[i]===1){
    prev=12;
  }if(prev===3||prev===5||prev===7||prev===8||prev===10||prev===12||prev===1){
  back=date1;
  }else if(prev===4||prev===6||prev===9||prev||11){
  back=date2;
  }else if(prev===2){
    back=date3;
  }else{
    back="not a number";
  }


  next = months[i+1];
  if(months[i]===12){
next=1;
  }if(next===3||next===5||next===7||next===8||next===10||next===12||next===1){
  forth=date1;
  }else if(next===4||next===6||next===9||next||11){
  forth=date2;
  }else if(next===2){
    forth=date3;
  }else{
    forth="not a number";
  }

}else if( monthNumber===4||monthNumber===6||monthNumber===9||monthNumber===11){
complete=date2;
prev=months[i-1];
next = months[i+1];

  if(months[i]===1){
    prev=12;
  }if(prev===3||prev===5||prev===7||prev===8||prev===10||prev===12||prev===1){
  back=date1;
  }else if(prev===4||prev===6||prev===9||prev||11){
  back=date2;
  }else if(prev===2){
    back=date3;
  }else{
    back="not a number";
  }


  next = months[i+1];
  if(months[i]===12){
next=1;
  }if(next===3||next===5||next===7||next===8||next===10||next===12||next===1){
  forth=date1;
  }else if(next===4||next===6||next===9||next||11){
  forth=date2;
  }else if(next===2){
    forth=date3;
  }else{
    forth="not a number";
  }

}else{
  complete="not a month";
}

}
return [back,complete,forth].join("              ");
}
getDates(4);

