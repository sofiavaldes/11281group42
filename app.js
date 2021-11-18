/* globals feather:false */

const express = require('express');
const mongoose = require("mongoose");
const fs = require('fs');
const app = express();
const { County } = require("./schemas/county");
const http = require('http');
//initializing port
//if no environment variable, the default port is set to 3000
const port = process.env.PORT || 3000;

const server = http.createServer(app);


app.use(express.static('webfiles'));


//mongodb url used in development
const mongo_URL = "mongodb+srv://mdbAdmin:swE_isCool@cluster0.2m7it.mongodb.net/Cluster0?retryWrites=true&w=majority";

//connect to db
//mongodb url needs to be passed through the DB_URI environment variable
mongoose.connect(mongo_URL, {
	useNewUrlParser: true
});
const connection = mongoose.connection;
connection.once("open", () => {
	console.log("MongoDB database connected");
});
connection.on("error", (error) => console.log("Error: " + error));

app.get('/', function (req, res) {
	fs.readFile('webfiles/index.html', function (err, html) {
		if (err) {
			res.write('Error, file was not found');
		}
		res.writeHeader(200, { "Content-Type": "text/html" });
		res.write(html);
		res.end();
	});
});

app.get('/resources', function (req, res) {
	fs.readFile('webfiles/resources.html', function (err, html) {
		if (err) {
			res.write('Error, file was not found');
		}
		res.writeHeader(200, { "Content-Type": "text/html" });
		res.write(html);
		res.end();
	});
});

app.get('/educational', function (req, res) {
	fs.readFile('webfiles/educational.html', function (err, html) {
		if (err) {
			res.write('Error, file was not found');
		}
		res.writeHeader(200, { "Content-Type": "text/html" });
		res.write(html);
		res.end();
	});
});

app.get('/editData', function (req, res) {
	fs.readFile('webfiles/editData.html', function (err, html) {
		if (err) {
			res.write('Error, file was not found');
		}
		res.writeHeader(200, { "Content-Type": "text/html" });
		res.write(html);
		res.end();
	});
});

app.post("/addcounty", function (req, res) {
	try {
		County.create({
      name: req.body.name,
      temperature: req.body.temp,
      pH: req.body.pH,
      dissolved_oxygen: req.body.oxygen,
      suspended_sediment: req.body.sediment,
      specific_conductance: req.body.conductance
		});
		res.redirect("/editData");
	} catch (error) {
		return res.json({ message: "Failed to create new county." });
	}
});


app.post("/editcounty", function (req, res) {
  County.findByIdAndUpdate({ _id: req.body.id }, {
    name: req.body.name,
    temperature: req.body.temp,
    pH: req.body.pH,
    dissolved_oxygen: req.body.oxygen,
    suspended_sediment: req.body.sediment,
    specific_conductance: req.body.conductance
  }, {
    new: true
  }, function (err, model) {
    if (err) {
      console.log("Failed to update county id: " + req.body.id);
      return res.json({ message: "Error: Failed to update county: " + err });
    } else {
      res.redirect("/editData");
    }
  });
});
// app.use((req, res, next) => {
//   res.status(200).json({
//     message: 'It works'
//   });
// })


// (function () {
//   'use strict'
//   feather.replace({ 'aria-hidden': 'true' })
// })()

// function myFunction(county) {

//   document.getElementById('myPopup').innerText = ppFunction(county);
//   var popup = document.getElementById('myPopup');
//   popup.classList.toggle("show", true);
// }

// function ppFunction(county){
//   return county;
// }


server.listen(port, function () {
	console.log('Express started on http://localhost:' + port + '; press Ctrl-C to terminate.');
});