const inquirer = require("inquirer"); //u gotta use this
const fs = require("fs"); //u gotta use this
const path = require("path"); //idk if i need this, but it joins all given path segments together 
const util = require("util"); //idk if i need this either
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

.then(function(res) {
  // console.log(res);
  // console.log(res.github, res.color);
  const username = res.github;
  const color = res.color;


  const queryUrl = `https://api.github.com/users/${username}`;

  axios.get(queryUrl).then(function(answer) {

  //hey ange, so you used a variable RESPONSE that wasn't defined
  //so let's make one :)
  const response = answer.data;
  console.log(answer.data);
  HTML.generateHTML(color);
  // pdf.create(HTML.generateHTML(color)).toFile('./index.pdf', function(err, res) {
  //   if (err) throw console.log(err);
  //    console.log(res); 
  //   });
  });
}).catch(function(err){
  if (err) throw err;
});

