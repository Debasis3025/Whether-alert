async function getWeather() {
    const city = document.getElementById("cityInput").value;
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const url = `http://localhost:5001/weather?city=${city}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data)

        if (data.error) {
            alert("City not found!");
            return;
        }

        document.getElementById("cityName").innerText = `📍 ${data.weather.name}`;
        document.getElementById("weatherCondition").innerText = `🌦 ${data.weather.weather[0].description}`;
        document.getElementById("temperature").innerText = `🌡 ${data.weather.main.temp}°C`;

        // Show alert message
        if (data.alert !== "No severe weather detected.") {
            alert(`🚨 Alert: ${data.alert}`);
        }

    } catch (error) {
        console.error("Error fetching weather data:", error);
        alert("Failed to fetch weather data. Try again later.");
    }
}