window.onload = () => {
  if (navigator.geolocation) {    
    navigator.geolocation.getCurrentPosition(position => {
    let lat = position.coords.latitude, lon = position.coords.longitude; 
    const link = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=b79f8f0b652e4bdc857e233284248d1e`;
    fetch(link)
    .then(response => response.json())
    .then(data => {     
        for (let v = 0; v < 7; v++) {
            document.getElementById(`pic${v}`).src = `http://openweathermap.org/img/wn/${data.daily[v].weather[0].icon}.png`;
            document.getElementById(`status${v}`).innerHTML = `${data.daily[v].temp.day}°C`;
            document.getElementById(`currentweather${v}`).innerHTML = data.daily[v].weather[0].description;
            document.getElementById(`high${v}`).innerHTML = `H: ${data.daily[v].temp.max}°C`;
            document.getElementById(`low${v}`).innerHTML = `L: ${data.daily[v].temp.min}°C`;
          };
    });  
    const googlemaps =  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
    fetch(googlemaps)
    .then(response => response.json())
    .then(data => {
      let cityName, countryName = data.countryName;
      if (data.city === ' ') {
        cityName = 'City not found';
     } else {
         cityName = data.city;
     };
        document.getElementById('location').innerHTML = `${cityName}, ${countryName}`;
         let day = new Date();
         let dateArr = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
         for (let j = 0; j < 7; j++) {
                 document.getElementById(`day${j}`).innerHTML = dateArr[day.getDay() + j];
        };    
      });
    });
  };
};



