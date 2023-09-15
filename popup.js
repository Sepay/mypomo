

var minute = 24
var second = 60

setInterval(function(){
    if(minute == 0 && second ==1){
        document.getElementById("counter").innerHTML = "00:00"
    }else{
        second--;
        if(second == 0){
            minute--;
            second=60;
        }if(minute==0){
            minute=minute;
        }
    }
    document.getElementById("counter").innerHTML = minute + ":" + second
},1000)
