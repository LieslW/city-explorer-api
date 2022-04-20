'use strict';

console.log('First server :D');

//REQUIRE
//In our servers, we have to use 'require' instead of import. Here we will list the requirements for our server

const express = require('express');
const cors = require('cors');
require('dotenv').config();
let weatherList = require('./data/weather.json');

//we must include cors if we want to share resources over the web

//USE
//Once we have required something, we have to use it. This is where we assign the required field a variable. React does this in one step with "import". Node takes two steps: "require" and "use".

const app = express();
app.use(cors());

//define port and validate that my .env file is working
const PORT = process.env.PORT || 3002;
//if my server is running on 3002, I know something is wrong with my .env file or how I'm importing the values from it.


//ROUTES
//We will write our endpoints here.
//app.get() correlates to axios.get
app.get('/weather', (req, res) => {
  try {
    let city = req.query.city;
    console.log(city);
    let cityWeather = weatherList.find(location => location.city_name === city);
    console.log(cityWeather);
    let weatherArr = [];
    cityWeather.data.forEach(date => {
      let forecast = new Forecast(date);
      weatherArr.push(forecast);
      console.log(weatherArr);
    });
    res.send(weatherArr);
  } catch(error) {
    res.status(500).send(error.message);
  }
});

app.get('*', (req, res) => {
  res.send('What are you looking for doesn\'t exist.');
});

//ERRORS
//handle errors

app.use((error, req, res) => {
  res.status(500).send(error.message);
});

class Forecast {
  constructor(element) {
    this.date = element.datetime;
    this.description = element.weather.description;
  }
}


//LISTEN
//start the server
//listening is an Express method that takes in a port value and a callback

app.listen(PORT, () => console.log(`listening on port ${PORT}`));


//TODO
//get it displaying via localhost path (line 36, error says it's reading "data")
//check if "date" is correct variable to use


// app.get('/', (req, res) => {
//   res.send('hello, from our server!');
// });

// app.get('/Harvey', (req, res) => {
//   res.send('meow meow feed me');
// });

// app.get('/sayHello', (req, res) => {
//   console.log(req.query);
//   let name = req.query.name;
//   let lastName = req.query.lastName;
//   res.send(`Hello ${name} ${lastName}`);
// });
