require("dotenv").config();
const express = require("express");
const axios = require("axios");  // ✅ Fix: Correct Axios import
const cors = require("cors");
const { checkWeatherAlerts } = require("./alerts");

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.OPENWEATHER_API_KEY;
if (!API_KEY) {
    console.error("❌ Missing OPENWEATHER_API_KEY in .env file");
    process.exit(1); // Stop server if API key is missing
}

// 🌎 Fetch Weather Data from OpenWeatherMap
app.get("/weather", async (req, res) => {
    try {
        const { city } = req.query;
        if (!city) return res.status(400).json({ error: "City is required" });

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await axios.get(url);
        const weatherData = response.data;

        // 🛑 Check for Extreme Weather
        const alertMessage = checkWeatherAlerts(weatherData);
        res.json({ weather: weatherData, alert: alertMessage });

    } catch (error) {
        console.error("❌ Error fetching weather data:", error.message);
        res.status(500).json({ error: "Error fetching weather data" });
    }
});

// 🚀 Start Server
const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));





// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");
// const { checkWeatherAlerts, checkEarthquakeAlerts } = require("./alerts");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.OPENWEATHER_API_KEY;

// // 🌎 Fetch Weather & Disaster Alerts
// app.get("/weather", async (req, res) => {
//     try {
//         const { city } = req.query;
//         if (!city) return res.status(400).json({ error: "City is required" });

//         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
//         const response = await axios.get(url);
//         const weatherData = response.data;

//         // 🛑 Check Weather Alerts
//         const weatherAlerts = checkWeatherAlerts(weatherData);

//         // 🌍 Fetch Earthquake Alerts
//         const earthquakeAlerts = await checkEarthquakeAlerts();

//         res.json({
//             weather: weatherData,
//             weatherAlerts,
//             earthquakeAlerts,
//         });

//     } catch (error) {
//         console.error("❌ Error fetching weather data:", error.message);
//         res.status(500).json({ error: "Error fetching weather data" });
//     }
// });

// // 🚀 Start Server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));









// require("dotenv").config();
// const express = require("express");
// const axios = require("axios");
// const cors = require("cors");

// const app = express();
// app.use(cors());
// app.use(express.json());

// const API_KEY = process.env.OPENWEATHER_API_KEY;

// // Function to check extreme weather conditions
// function checkWeatherAlerts(weatherData) {
//     let alertMessage = "No severe weather detected.";

//     if (weatherData.weather[0].main === "Thunderstorm") {
//         alertMessage = "⚠️ Severe Thunderstorm Warning! Stay indoors.";
//     } else if (weatherData.weather[0].main === "Rain" && weatherData.rain && weatherData.rain["1h"] > 20) {
//         alertMessage = "🌧️ Heavy Rainfall Alert! Possible flood conditions.";
//     } else if (weatherData.main.temp < 0) {
//         alertMessage = "❄️ Extreme Cold Alert! Stay warm.";
//     } else if (weatherData.wind.speed > 20) {
//         alertMessage = "🌬️ High Wind Warning! Avoid outdoor activities.";
//     }

//     return alertMessage;
// }

// // 🌎 Fetch Weather Data from OpenWeatherMap
// app.get("/weather", async (req, res) => {
//     try {
//         const { city } = req.query;
//         if (!city) return res.status(400).json({ error: "City is required" });

//         const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
//         const response = await axios.get(url);
//         const weatherData = response.data;

//         // 🛑 Check for Extreme Weather
//         const alertMessage = checkWeatherAlerts(weatherData);

//         res.json({ weather: weatherData, alert: alertMessage });
//     } catch (error) {
//         console.error("Error fetching weather data:", error.message);
//         res.status(500).json({ error: "Error fetching weather data" });
//     }
// });

// // 🌍 Fetch Recent Earthquake Data from USGS
// app.get("/earthquakes", async (req, res) => {
//     try {
//         const earthquakeUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/significant_week.geojson";
//         const response = await axios.get(earthquakeUrl);
//         const earthquakeData = response.data.features;

//         // Extract relevant data
//         const earthquakes = earthquakeData.map(eq => ({
//             place: eq.properties.place,
//             magnitude: eq.properties.mag,
//             depth: eq.geometry.coordinates[2],
//             time: new Date(eq.properties.time).toLocaleString(),
//         }));

//         res.json({ earthquakes });
//     } catch (error) {
//         console.error("Error fetching earthquake data:", error.message);
//         res.status(500).json({ error: "Error fetching earthquake data" });
//     }
// });

// // 🚀 Start Server
// const PORT = process.env.PORT || 5001;
// app.listen(PORT, () => console.log(`🌍 Server running on port ${PORT}`));