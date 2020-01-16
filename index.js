const inquirer = require("inquirer"); //u gotta use this
const fs = require("fs"); //u gotta use this (if you want to do things to files)
const path = require("path"); //idk if i need this, but it joins all given path segments together 
const axios = require("axios"); //promise https://www.npmjs.com/package/axios
var pdf = require('html-pdf'); //HTML to PDF converter https://www.npmjs.com/package/html-pdf
const HTML = require("./generatehtml");

//ask for github username and color
const user_input = () => {
  return inquirer.prompt([
    {  
      type: "input",
      name: "github",
      message: "Please enter your GitHub Username"  
    },

    {
      type: "list",
      name: "color",
      message: "Hello! Please pick a color for your page.",
      choices: ["red", "blue", "green", "pink"]
    } 
  ]);//inquirer 
}; //user_input


user_input()

.then(function(answers) {
  const username = answers.github;
  const color = answers.color;
  const queryUrl = `https://api.github.com/users/${username}`;

  axios.get(queryUrl).then(function(res) {

  //hey ange, so you used a variable RESPONSE that wasn't defined
  //so let's make one :)
  const data = {color, ...res.data} //object that holds all of the data
  pdf.create(HTML.generateHTML(data)).toFile('./index.pdf', function(err, res) {
    if (err) throw console.log(err);
     console.log(res); 
    });
  });
}).catch(function(err){
  if (err) throw err;
});


//Profile image
// User name
// Links to the following:

// User location via Google Maps
// User GitHub profile
// User blog


// User bio
// Number of public repositories
// Number of followers
// Number of GitHub stars
// Number of users following
