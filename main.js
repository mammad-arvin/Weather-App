const apiKey='649996363d0bc028e5e946f2bcb8138b';
const lists=document.querySelector('.lists')
const showInvalidCity=document.querySelector('.showInvalidCity')

const input=document.querySelector('form input')
document.querySelector('form').addEventListener('submit',search)

function search(event){
    event.preventDefault()
    if(input.value){
        let inputCity=input.value;
        let apiUrl=`https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${apiKey}&units=metric`;
        console.log(apiUrl);
        fetchData(apiUrl);
        input.value="";
    }
}
function fetchData(apiUrl){
    fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const {weather,main:{temp,temp_min,temp_max},wind:{speed,deg},sys:{country},name}=data;
                    const {main,description,icon}=weather[0];
                    console.log(temp);
                    const cityDiv=document.createElement('div')
                    cityDiv.classList='city';
                    let pointColor;
                    if(temp<21){
                        pointColor='#74b9ff';
                    }else if(temp>21 && temp<34){
                        pointColor='#f09607';
                    }else if(temp > 34){
                        pointColor='#f02800';
                    };
                    let cityContent=`
                        <div class="cityInfo">
                            <h2 class="cityName">${name}</h2>
                            <span class="countryName">${country}</span>
                        </div>
                        <svg style="--pointColor:${pointColor};">
                            <circle cx="140" cy="110" r="120"></circle>
                        </svg>
                        <div class="pointColor" style="--pointColor:${pointColor}; --tempval:${Math.round(temp)+5};">
                        </div>
                        <div class="degs">
                            <p>-10</p>
                            <p>50</p>
                        </div>
                        <div class="circleOfInfo">
                            <div class="temp">
                                <h2>${Math.round(temp)}</h2>
                                <span>c</span>
                            </div>
                            <div class="min-max-temp">
                                <span class="minTemp">Min :${Math.floor(temp_min)}</span>
                                <span class="maxTemp">Max : ${Math.ceil(temp_max)}</span>
                            </div>
                            <p class="mainStatus">${main}</p>
                        </div>
                        

                        <div class="weather-winnd">
                            <div class="wheather">
                                <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/162656/${icon}.svg" alt="weather status img">
                                <p class="description">${description}</p>
                            </div>
                            <div class="wind">
                                <img src="./images/windy-svgrepo-com.svg" alt="wind speed icon">
                                <span class="windSpeed">speed: ${Math.round(speed)} <span>km/h</span></span>
                                <span class="windDeg">deg: ${deg}</span>
                            </div>
                        </div>
                        <div class="deleteCity">
                            <i class="fa-solid fa-trash-can"></i>
                        </div>
                        <div class="topBottomColor topColor"></div>
                        <div class="topBottomColor bottomColor"></div>
                    `;
                    cityDiv.innerHTML=cityContent;
                    lists.appendChild(cityDiv)
                    showInvalidCity.style.display="none"

                })
                .catch(()=>{ showInvalidCity.style.display="block"})
}
lists.addEventListener('click',deleteCity);
function deleteCity (event){
    const clicked=event.target
    console.log(clicked);
    if(clicked.classList.contains('fa-trash-can')){
        clicked.parentElement.parentElement.remove();
    }
}
const body=document.querySelector("body");
const date=new Date();
const month=date.getMonth();
const time=date.getHours();
console.log(time);

if(month ===12 || month ===1 || month ===2 || month ===9 || month ===10 || month ===11){
    if(time <18 && time > 7){
        body.style.background='url(/images/after_noon.webp) center/cover no-repeat fixed';
    }else{
        body.style.background='url(/images/night.webp) center/cover no-repeat fixed';
    }
}else if(month >= 3 && month <=8){
    if(time <20 && time > 6){
        body.style.background='url(/images/after_noon.webp) center/cover no-repeat fixed';
        input.style.color="black";
        input.style.borderColor='black';
    }else{
        body.style.background='url(/images/night.webp) center/cover no-repeat fixed';
    } 
}