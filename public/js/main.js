const cityName = document.getElementById('cityName');
const submitBtn = document.getElementById('submitBtn');

const curdate= document.getElementById('curdate');


const city_name = document.getElementById('city_name');
const temp_real_val = document.getElementById('temp_real_val');
const temp_status = document.getElementById('temp_status');
const datahide = document.querySelector('.middle_layer');


const getCurrentDay=()=>{
    const weekday = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let currentTime= new Date();
    let day=weekday[currentTime.getDay()];
    return day;

};


const getcurreenttime= ()=>{

    var months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    var now=new Date();
    var month= months[now.getMonth()];
    
    var date=now.getDate();

    let hours=now.getHours();
    let mins=now.getMinutes();

    let period="AM";
    if(hours>11){
        period="PM";
        if(hours>12){
            hours=hours-12;
        }
    }
    if(mins<10){
        mins="0"+mins;
    }

    return `${month}${date} | ${hours}:${mins} ${period}`;
};
curdate.innerHTML=getCurrentDay()+" | "+getcurreenttime();

const getInfo = async(event) => {
    event.preventDefault();

    let cityVal = cityName.value;

    if(cityVal === ""){
        city_name.innerText = `Plz write the name before search`;
        datahide.classList.add("data_hide");
    }else{

        try{
           
            
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${cityVal}&units=metric&appid=0317c8b9e661ea3ac88b3373dbac9397`
            const response = await fetch(url);

            const data = await response.json();
            const arrData = [data];

            city_name.innerText = `${arrData[0].name}, ${arrData[0].sys.country}`;
            temp_real_val.innerText = arrData[0].main.temp;
            const tempMood = arrData[0].weather[0].main;
            console.log(tempMood);

            //condition to check sunny or cloudy
            if (tempMood == "Clear") {
            temp_status.innerHTML =
                "<i class='fas  fa-sun' style='color: #eccc68;'></i>";
            } else if (tempMood == "Clouds") {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color: #f1f2f6;'></i>";
            } else if (tempMood == "Rain") {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud-rain' style='color: #a4b0be;'></i>";
            } else {
            temp_status.innerHTML =
                "<i class='fas  fa-cloud' style='color:#f1f2f6;'></i>";

            }
            datahide.classList.remove('data_hide');
            cityVal = "";
           
       
        }catch{
            cityVal = " ";
            datahide.classList.add("data_hide");
            city_name.innerText =  `please enter the proper city name`;
            console.log('please add the proper city name');
        }
        
    }
}

submitBtn.addEventListener('click', getInfo);