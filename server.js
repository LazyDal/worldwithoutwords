var express = require('express');
var fs = require('fs');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(express.static(__dirname + '/static'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));


var eventImageSchema = new mongoose.Schema({
	 data: Buffer,
	 contentType: String
});
var EventImage = mongoose.model('EventImage', eventImageSchema);

var eventSchema = new mongoose.Schema({
	type: String,		// 'i' for image or 'v' for video
	estars: Number,
	cstars: [],
	date: Date,
	caption: String,
	data: {type: mongoose.Schema.Types.ObjectId, ref: 'EventImage'}
});
var EventEntry = mongoose.model('EventEntry', eventSchema);

function populate() {
	var image1 = new EventImage;
	image1.data=fs.readFileSync("static/images/butt.gif");
	image1.contentType="image/gif";
	image1.save(function (err) {
		if (err) throw err;
		console.log('Image saved');
	});
	var image2 = new EventImage;
	image2.data=fs.readFileSync("static/images/cinque terre, italy.jpg");
	image2.contentType="image/jpg";
	image2.save(function (err) {
		if (err) throw err;
		console.log('Image saved');
	});
	var image3 = new EventImage;
	image3.data=fs.readFileSync("static/images/Devojka.jpg");
	image3.contentType="image/jpg";
	image3.save(function (err) {
		if (err) throw err;
		console.log('Image saved');
	});
	var image4 = new EventImage;
	image4.data=fs.readFileSync("static/images/Dva laneta.jpg");
	image4.contentType="image/jpg";
	image4.save(function (err) {
		if (err) throw err;
		console.log('Image saved');
	});
	var image5 = new EventImage;
	image5.data=fs.readFileSync("static/images/Fire.jpg");
	image5.contentType="image/jpg";
	image5.save(function (err) {
		if (err) throw err;
		console.log('Image saved');
	}); 

	var event1 = new EventEntry;
	event1.type = 'i';
	event1.estars = 3;
	event1.cstars = [];
	event1.date = Date.now();
	event1.caption = 'butt',
	event1.data = image1;
	event1.save(function (err) {
		if (err) throw err;
		console.log('Event 1 saved');
	});

	var event2 = new EventEntry;
	event2.type = 'i';
	event2.estars = 5;
	event2.cstars = [];
	event2.date = Date.now();
	event2.caption = 'Cinque Terre, Italy',
	event2.data = image2;
	event2.save(function (err) {
		if (err) throw err;
		console.log('Event 2 saved');
	});

	var event3 = new EventEntry;
	event3.type = 'i';
	event3.estars = 4;
	event3.cstars = [];
	event3.date = Date.now();
	event3.caption = 'Devojka',
	event3.data = image3;
	event3.save(function (err) {
		if (err) throw err;
		console.log('Event 3 saved');
	});

	var event4 = new EventEntry;
	event4.type = 'i';
	event4.estars = 2;
	event4.cstars = [];
	event4.date = Date.now();
	event4.caption = 'Dva laneta',
	event4.data = image4;
	event4.save(function (err) {
		if (err) throw err;
		console.log('Event 4 saved');
	});

	var event5 = new EventEntry;
	event5.type = 'i';
	event5.estars = 2;
	event5.cstars = [];
	event5.date = Date.now();
	event5.caption = 'Fire',
	event5.data = image5;
	event5.save(function (err) {
		if (err) throw err;
		console.log('Event 5 saved');
	});
};

app.get('/api/eventImage/:id', function (req, res, next) {
  EventImage.findById(req.params.id, function (err, img) {
    if (err) return next(err);
    // console.log('img data: ' + img.data);
    res.contentType(img.contentType);
    res.send(img.data);
  });
});

app.get('/api/getEvents', function(req, res, next) {
	EventEntry.find(function(err, eventEntry) {
		if (err) throw err;
		console.log(eventEntry);
		res.send(eventEntry);
	});
});

app.listen(app.get('port'), function(){
	console.log( 'Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
	var dbURI = 'mongodb://localhost/wwwdb';
	mongoose.connect(dbURI);
	mongoose.connection.on('connected', function () {
		console.log('Mongoose connected to ' + dbURI);
		// populate();
	});
	mongoose.connection.on('error',function (err) {
		console.log('Mongoose connection error: ' + err);
	});
	mongoose.connection.on('disconnected', function () {
		console.log('Mongoose disconnected');
	});
	process.on('SIGINT', function() {
		mongoose.connection.close(function () {
			console.log('Mongoose disconnected through app termination');
			process.exit(0);
		});
	});

	
});
