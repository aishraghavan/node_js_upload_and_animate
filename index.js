/**
 * Module dependencies.
 */
var express = require('express'),
    multer = require('multer'),
    bodyParser = require('body-parser'),
    path = require('path');

/**
 * Create instance of express
 */
var app = new express();
app.use(bodyParser.json());

/**
 * View engine setup
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


/**
 * Route path to index
 */
app.get('/', function(req, res){
	res.render('index');
});

/**
 * Route path to cube for displaying the animation of the uploaded image.
 */
app.get('/cube', function(req, res){
  res.render('cube');
});


/**
 * Handling the file storage
 */
var storage = multer.diskStorage({
		 destination: function (req, file, cb) {
				 cb(null, './public/uploads/')
		 },
		 filename: function (req, file, cb) {
			 	 //retains the original filename
				 cb(null, file.originalname)
		 }
 })

 /**
  * File uploader
	*/
var multerUpload = multer({ storage: storage });
var uploadFile = multerUpload.single('upl');//Allows to upload one file at a time


/**
 * Route path to index post method
 */
app.post('/',uploadFile, function(req,res){
	//After the file upload, the page redirects to /cube with image as query parameter.
	res.redirect('/cube?image='+req.file.originalname);
	res.status(204).end();
});


//static file
app.use(express.static(__dirname + '/public'));


/*
 *App listens on port 3000
 */
var port = 3000;
app.listen( port, function(){ console.log('listening on port '+port); } );
