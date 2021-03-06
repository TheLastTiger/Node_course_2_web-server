const express = require('express');
const fs = require('fs');


const app = express();
const port = 3000;
const hbs = require('hbs');

hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine' , 'hbs');

app.use((req, res, next) => {
  res.render('maintenance.hbs');
  next();
});

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n' , (err) => {
    if(err) {
      console.log('Unable to connect to the server!');
    }
  });
  next();
});

hbs.registerHelper('getCurrentYear', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt' , (text) => {
  return text.toUpperCase();
});

app.get('/' ,(req, res) => {
  // res.send('<h1>Hello World!</h1>');
  // res.send({
  //   name:'Ahmad',
  //   surname:'Bitar',
  //   likes:['Biking' , 'SkyDiving']
  // });
  res.render('home.hbs', {
    welcomeMessage:'Welcome to my website!',
    pageTitle:'Home Page'
  });
});

app.get('/about', (req, res) => {
  // res.send('About Page');
  res.render('about.hbs', {
    pageTitle:'About Page',
  });
});

app.get('/bad', (req, res) => {
  res.send({
    errMessage:'Unable to connect to the server!'
  });
});


app.listen(port, () => {
  console.log('Server ready to run on port:', port);
});
