window.onload = () => {
    if (navigator.geolocation) {    
        navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude, lon = position.coords.longitude; 
        const link = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&units=metric&appid=b79f8f0b652e4bdc857e233284248d1e`;
        fetch(link)
        .then(response => response.json())
        .then(data => {
            document.getElementById('pic').src = `http://openweathermap.org/img/wn/${data.current.weather[0].icon}.png`;
            document.getElementById('status').innerHTML = `${data.current.temp}°C`;
            document.getElementById('currentweather').innerHTML = data.current.weather[0].description;
            document.getElementById('high').innerHTML = `H: ${data.daily[0].temp.max}°C`;
            document.getElementById('low').innerHTML = `L: ${data.daily[0].temp.min}°C`;  
        });
        const maps =  `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lon}&localityLanguage=en`;
        fetch(maps)
        .then(response => response.json())
        .then(data => {
            let cityName, countryName = data.countryName;
            if (data.city === ' ') {
               cityName = 'City not found';
            } else {
                cityName = data.city;
            };
            document.getElementById('location').innerHTML = `${cityName}, ${countryName}`;
        });
      });
    };
};



