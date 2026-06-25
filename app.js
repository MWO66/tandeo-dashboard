function updateClock(){

    const now = new Date();

    document.getElementById("clock").innerHTML =
        now.toLocaleTimeString("de-DE");

    document.getElementById("date").innerHTML =
        now.toLocaleDateString("de-DE",{
            weekday:"long",
            day:"2-digit",
            month:"long",
            year:"numeric"
        });

}

setInterval(updateClock,1000);
updateClock();


function greeting(){

    const hour = new Date().getHours();

    let message = "👋 Guten Tag Marcus";

    if(hour < 12){
        message = "☀️ Guten Morgen Marcus";
    }
    else if(hour >= 18){
        message = "🌙 Guten Abend Marcus";
    }

    document.getElementById("welcome").innerHTML = message;
}

greeting();


async function loadWeather(lat,lon,target){

    try{

        const response = await fetch(
            `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,apparent_temperature,relative_humidity_2m,wind_speed_10m,wind_direction_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_probability_max,sunrise,sunset,uv_index_max&forecast_days=5`
        );

        const data = await response.json();

        let html = `
            <p>🌡 Aktuell: ${data.current.temperature_2m}°C</p>
            <p>😊 Gefühlt: ${data.current.apparent_temperature}°C</p>
            <p>💧 Luftfeuchtigkeit: ${data.current.relative_humidity_2m}%</p>
            <p>💨 Wind: ${data.current.wind_speed_10m} km/h</p>
            <p>🧭 Windrichtung: ${data.current.wind_direction_10m}°</p>

            <p>🌅 Sonnenaufgang:
            ${new Date(data.daily.sunrise[0]).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})}
            </p>

            <p>🌇 Sonnenuntergang:
            ${new Date(data.daily.sunset[0]).toLocaleTimeString('de-DE',{hour:'2-digit',minute:'2-digit'})}
            </p>

            <p>☀️ UV-Index: ${data.daily.uv_index_max[0]}</p>
        `;

        for(let i=0;i<5;i++){

            html += `
            <div class="weather-day">
                <strong>${data.daily.time[i]}</strong><br>
                ⬆ ${data.daily.temperature_2m_max[i]}°C<br>
                ⬇ ${data.daily.temperature_2m_min[i]}°C<br>
                🌧 ${data.daily.precipitation_probability_max[i]}%
            </div>
            `;
        }

        document.getElementById(target).innerHTML = html;

    }
    catch(error){

        document.getElementById(target).innerHTML =
            "Wetterdaten konnten nicht geladen werden.";

        console.error(error);
    }

}

loadWeather(51.26,6.55,"willich");
loadWeather(39.54,2.39,"andratx");
