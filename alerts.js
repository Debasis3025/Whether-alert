// const nodemailer = require("nodemailer");

// // Email Alert System
// const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//         user: process.env.EMAIL_USER,
//         pass: process.env.EMAIL_PASS,
//     },
// });

// // // 🚨 Check Weather for Alerts
// // function checkWeatherAlerts(data) {
// //     let message = "No severe weather detected.";

// //     if (data.main.temp > 40) {
// //         message = "⚠️ Extreme Heat Alert!";
// //     } else if (data.wind.speed > 25) {
// //         message = "🌪 High Wind Warning!";
// //     } else if (data.weather[0].main.toLowerCase().includes("storm")) {
// //         message = "⛈ Storm Alert!";
// //     }

//     // If alert is triggered, send email
//     if (message !== "No severe weather detected.") {
//         sendEmailAlert(data.name, message);
//     }

//     return message;
// // }

// // 📧 Send Email Alert
// function sendEmailAlert(city, alertMessage) {
//     const mailOptions = {
//         from: process.env.EMAIL_USER,
//         to: "recipient_email@gmail.com",  // Change to the recipient's email
//         subject: `⚠️ Weather Alert for ${city}`,
//         text: `Alert: ${alertMessage} in ${city}. Stay safe!`,
//     };

//     transporter.sendMail(mailOptions, (err, info) => {
//         if (err) console.log("Error sending email:", err);
//         else console.log("Email sent:", info.response);
//     });
// }

// // module.exports = { checkWeatherAlerts };







// function checkWeatherAlerts(weatherData) {
//     let alerts = [];

//     if (!weatherData || !weatherData.main || !weatherData.weather) {
//         return "⚠️ No weather data available.";
//     }

//     const { temp, humidity, pressure } = weatherData.main;
//     const windSpeed = weatherData.wind.speed;
//     const conditions = weatherData.weather.map(w => w.main.toLowerCase());

//     // 🌡️ **Heatwave Alert**
//     if (temp >= 40) {
//         alerts.push("🔥 Heatwave Alert! Stay hydrated and avoid going outside.");
//     }

//     // ❄️ **Cold Wave Alert**
//     if (temp <= 5) {
//         alerts.push("❄️ Cold Wave Alert! Stay warm and avoid prolonged exposure outside.");
//     }

//     // 🌪️ **Storm/Wind Alert**
//     if (windSpeed > 25) {
//         alerts.push("🌪️ High Wind Warning! Secure loose objects and stay indoors.");
//     }

//     // ☔ **Heavy Rain Alert**
//     if (conditions.includes("rain") && weatherData.rain && weatherData.rain["1h"] > 10) {
//         alerts.push("🌧️ Heavy Rainfall Alert! Risk of flooding, stay safe.");
//     }

//     // ⛈️ **Thunderstorm Alert**
//     if (conditions.includes("thunderstorm")) {
//         alerts.push("⛈️ Thunderstorm Warning! Stay indoors and avoid open areas.");
//     }

//     // 🌊 **Flood Alert**
//     if (humidity > 90 && conditions.includes("rain")) {
//         alerts.push("🌊 Flood Alert! Move to higher ground if necessary.");
//     }

//     // 🌀 **Hurricane/Cyclone Alert** (if extreme wind)
//     if (windSpeed > 70) {
//         alerts.push("🌀 Cyclone/Hurricane Warning! Evacuate if advised by authorities.");
//     }

//     return alerts.length > 0 ? alerts.join("\n") : "✅ No extreme weather alerts.";
// }

//  module.exports = { checkWeatherAlerts };






//  const axios = require("axios");

// // 🌍 Fetch earthquake data from USGS API
// async function checkEarthquakeAlerts() {
//     try {
//         const response = await axios.get("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson");
//         const earthquakes = response.data.features;

//         let alerts = [];

//         earthquakes.forEach(eq => {
//             const magnitude = eq.properties.mag;
//             const place = eq.properties.place;
//             const time = new Date(eq.properties.time).toLocaleString();

//             if (magnitude >= 6) {
//                 alerts.push(`🌍 **Earthquake Alert!** Magnitude ${magnitude} detected near ${place} at ${time}. Stay safe!`);
//             }
//         });

//         return alerts.length > 0 ? alerts.join("\n") : "✅ No major earthquake alerts.";
//     } catch (error) {
//         console.error("Error fetching earthquake data:", error.message);
//         return "⚠️ Unable to fetch earthquake alerts.";
//     }
// }

// // 🚨 Check for Extreme Weather Alerts
// function checkWeatherAlerts(weatherData) {
//     let alerts = [];

//     if (!weatherData || !weatherData.main || !weatherData.weather) {
//         return "⚠️ No weather data available.";
//     }

//     const { temp, humidity } = weatherData.main;
//     const windSpeed = weatherData.wind.speed;
//     const conditions = weatherData.weather.map(w => w.main.toLowerCase());

//     // 🔥 **Heatwave Alert**
//     if (temp >= 40) {
//         alerts.push("🔥 Heatwave Alert! Stay hydrated and avoid going outside.");
//     }

//     // ❄️ **Cold Wave Alert**
//     if (temp <= 5) {
//         alerts.push("❄️ Cold Wave Alert! Stay warm and avoid prolonged exposure outside.");
//     }

//     // 🌪️ **Storm/Wind Alert**
//     if (windSpeed > 25) {
//         alerts.push("🌪️ High Wind Warning! Secure loose objects and stay indoors.");
//     }

//     // 🌊 **Flood Alert**
//     if (humidity > 90 && conditions.includes("rain")) {
//         alerts.push("🌊 Flood Alert! Move to higher ground if necessary.");
//     }

//     // ☔ **Heavy Rain Alert**
//     if (conditions.includes("rain") && weatherData.rain && weatherData.rain["1h"] > 10) {
//         alerts.push("🌧️ Heavy Rainfall Alert! Risk of flooding, stay safe.");
//     }

//     // ⛈️ **Thunderstorm Alert**
//     if (conditions.includes("thunderstorm")) {
//         alerts.push("⛈️ Thunderstorm Warning! Stay indoors and avoid open areas.");
//     }

//     return alerts.length > 0 ? alerts.join("\n") : "✅ No extreme weather alerts.";
// }

// module.exports = { checkWeatherAlerts, checkEarthquakeAlerts };

const nodemailer = require("nodemailer");

// 📧 Email Transporter Setup
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// 📧 Send Email Alert Function
function sendEmailAlert(city, alertMessage) {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to: "recipient_email@gmail.com",  // Change to actual recipient
        subject: `⚠️ Weather Alert for ${city}`,
        text: `Alert: ${alertMessage} in ${city}. Stay safe!`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            console.error("Error sending email:", err);
        } else {
            console.log("✅ Email sent:", info.response);
        }
    });
}

// 🌪️ Check Weather Alerts & Trigger Email
function checkWeatherAlerts(weatherData) {
    let alerts = [];

    if (!weatherData || !weatherData.main || !weatherData.weather) {
        return "⚠️ No weather data available.";
    }

    const { temp, humidity, pressure } = weatherData.main;
    const windSpeed = weatherData.wind.speed;
    const conditions = weatherData.weather.map(w => w.main.toLowerCase());

    // 🌡️ **Heatwave Alert**
    if (temp >= 40) {
        alerts.push("🔥 Heatwave Alert! Stay hydrated and avoid going outside.");
    }

    // ❄️ **Cold Wave Alert**
    if (temp <= 5) {
        alerts.push("❄️ Cold Wave Alert! Stay warm and avoid prolonged exposure outside.");
    }

    // 🌪️ **Storm/Wind Alert**
    if (windSpeed > 25) {
        alerts.push("🌪️ High Wind Warning! Secure loose objects and stay indoors.");
    }

    // ☔ **Heavy Rain Alert**
    if (conditions.includes("rain") && weatherData.rain && weatherData.rain["1h"] > 10) {
        alerts.push("🌧️ Heavy Rainfall Alert! Risk of flooding, stay safe.");
    }

    // ⛈️ **Thunderstorm Alert**
    if (conditions.includes("thunderstorm")) {
        alerts.push("⛈️ Thunderstorm Warning! Stay indoors and avoid open areas.");
    }

    // 🌊 **Flood Alert**
    if (humidity > 90 && conditions.includes("rain")) {
        alerts.push("🌊 Flood Alert! Move to higher ground if necessary.");
    }

    // 🌀 **Hurricane/Cyclone Alert** (if extreme wind)
    if (windSpeed > 70) {
        alerts.push("🌀 Cyclone/Hurricane Warning! Evacuate if advised by authorities.");
    }

    const alertMessage = alerts.length > 0 ? alerts.join("\n") : "✅ No extreme weather alerts.";

    // ✅ Send Email if Alert is Triggered
    if (alerts.length > 0) {
        sendEmailAlert(weatherData.name, alertMessage);
    }

    return alertMessage;
}

module.exports = { checkWeatherAlerts };