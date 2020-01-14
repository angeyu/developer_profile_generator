const inquirer = require("inquirer"); //u gotta use this
const fs = require("fs"); //u gotta use this
const path = require("path"); //idk if i need this, but it joins all given path segments together 
const util = require("util"); //idk if i need this either
const axios = require("axios"); //promise https://www.npmjs.com/package/axios
var pdf = require('html-pdf'); //HTML to PDF converter https://www.npmjs.com/package/html-pdf
const generateHTML = require("./generateHTML");

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


user_input

.then(function({github,color}) {
  console.log(username, color);
  const queryUrl = `https://api.github.com/users/${username}`;

  axios.get(queryUrl).then(function(answer) {
  console.log(answer.data);
  pdf.create(generateHTML(response, color)).toFile('./index.pdf', function(err, res) {
    if (err) return console.log(err);
     console.log(res); 
    });
  });
});