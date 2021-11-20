/* globals feather:false */

//imports and requirements
const express = require('express');
const mongoose = require("mongoose");
const fs = require('fs');
const app = express();
const { County } = require("./schemas/county");
const http = require('http');
const bodyParser = require('body-parser');

//initializing port
//if no environment variable, the default port is set to 3000
const port = process.env.PORT || 3000;

const server = http.createServer(app);

//letting express know to look in webfiles folder
app.use(express.static('webfiles'));


//mongodb url used in development
//In the future can input the url to your mongodb cluster
const mongo_URL = "mongodb+srv://mdbAdmin:swE_isCool@cluster0.2m7it.mongodb.net/Cluster0?retryWrites=true&w=majority";

//connect to db
//mongodb url needs to be passed through the DB_URI environment variable
mongoose.connect(mongo_URL, {
	useNewUrlParser: true
});
const connection = mongoose.connection;
//checking to make sure the connection works
connection.once("open", () => {
	// console.log("MongoDB database connected");
});
connection.on("error", (error) => console.log("Error: " + error));

//Tells app what middleware to accept
app.use(bodyParser.urlencoded({extended : true}));

//fetches the html files and the entry point
app.get('/', function (req, res) {
	fs.readFile('./webfiles/index.html', function (err, html) {
		//if the file isn't found it handles the error
		if (err) {
			res.writeHead(404);
			res.write('File not found!');
		}
		res.writeHeader(200, { "Content-Type": "text/html" });
		res.write(html);
		res.end();
	});
});

//fetching the entry point file and assigning it to /home
app.get('/home', function (req, res) {
	fs.readFile('webfiles/index.html', function (err, html) {
		if (err) {
			res.write('Error, file was not found');
		}
		res.writeHeader(200, { "Content-Type": "text/html" });
		res.write(html);
		res.end();
	});
});

//fetching the resources file and assigning it to /resources
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

//fetching the wildlife file and assigning it to /wildlife
app.get('/wildlife', function (req, res) {
	fs.readFile('webfiles/wildlife.html', function (err, html) {
		if (err) {
			res.write('Error, file was not found');
		}
		res.writeHeader(200, { "Content-Type": "text/html" });
		res.write(html);
		res.end();
	});
});

//fetching the editData file and assigning it to /editData
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

//API Request to add a county to the database
app.post("/api/addcounty", function (req, res) {
	//Sends error if no request body
	if(!req.body){
		res.status(400).send({message : "need body for the request"});
		return;
	}

	//new county
	const county = new County({
		name : req.body.name,
		temperature: req.body.temp,
		pH: req.body.pH,
		dissolved_oxygen: req.body.oxygen,
		suspended_sediment: req.body.sediment,
		specific_conductance: req.body.conductance
	})

	//save the county in mongodb
	county
		.save(county)
		.then(data => {
			res.redirect('/editData')
		})
		.catch(err=>{
			res.status(500).send({
				message: err.message || "Some error occurred"
			});
		});

});

//API Request to edit a county in the database
app.post("/api/editcounty", function (req, res) {
	if(!req.body){
		res.status(400).send({message : "need body for the request"});
		return;
	}
	//updating county
	County.findOneAndUpdate({name : req.body.name}, {
		temperature: req.body.temp,
		pH: req.body.pH,
		dissolved_oxygen: req.body.oxygen,
		suspended_sediment: req.body.sediment,
		specific_conductance: req.body.conductance
		})
	//handles if the county doesn't exist to edit
	.then(data => {
		if(!data){
			res.status(404).send({ message: `Cannot find county with that name`})
		}
		else{
			res.redirect('/editData')
		}
	})
	.catch(err=>{
		res.status(500).send({
			message: err.message || "Error updating county info"
		});
	});

});

//API Request to delete a county in the database
app.post("/api/deletecounty", function (req, res) {
	if(!req.body){
		res.status(400).send({message : "need body for the request"});
		return;
	}

	//deleting county
	County.findOneAndDelete({name : req.body.name})
	.then(data => {
		//handles if the county doesn't exist
		if(!data){
			res.status(404).send({ message: `Cannot find county with that name`})
		}
		else{
			res.redirect('/editData')
		}
	})
	//handles other errors like a crash
	.catch(err=>{
		res.status(500).send({
			message: err.message || "Error deleting county info"
		});
	});

});

//API Request that returns all all the counties in the database in the response
app.get("/api/allcounties", function(req, res){
	County.find()
	.then(county =>{
		res.send(county)
	})
	.catch(err=>{
		res.status(500).send({message: err.message || "Error occured"})
	})
});

//API Request that returns a specific county that was passed in the req body
//Deprecated as you cannot send a get request with a body
app.get("/api/getcounty", function(req, res){
	County.find({ name: req.body.name })
	.then(county =>{
		if(!county){
			res.status(404).send({message : "no county with that name"})
		}
		else{
		res.send(county)
		}
	})
	.catch(err=>{
		res.status(500).send({message: err.message + "Error occured"})
	})
});

//Used to start the server
server.listen(port, function () {
	console.log('Express started on http://localhost:' + port + '; press Ctrl-C to terminate.');
});