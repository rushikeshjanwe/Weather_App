const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extend:true}));

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
});


app.post("/", function(req, res) {
    const city = req.body.cityName;
    const apiKey = "e65b51bf05c8c15422ffd16401130787"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=metric&appid="+apiKey
    https.get(url, function(response) {
      response.on("data", function(data) {
        const weatherData = JSON.parse(data);
        const temprature = weatherData.main.temp;
        const desc = weatherData.weather[0].description;
        const iconCode = weatherData.weather[0].icon;
        const icon ="<img src = " + "http://openweathermap.org/img/wn/" + iconCode + "@2x.png" + ">"
        res.write("<p> Weather description for "+city+" is: " + desc + "</p>");
        res.write("<h1>temperature: " + temprature + "</h1>");
        res.write(icon)
        res.send();
      });
    });
});



app.listen(process.env.PORT || 3000, function() {
  console.log("Server is up and running");
});
