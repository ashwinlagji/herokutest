var express = require('express');
var app = express();
var engines = require('consolidate');
var mongoClient = require('mongodb').MongoClient;
var bodyParser = require('body-parser')
var assert = require('assert');

app.engine('html', engines.nunjucks);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');


app.use(bodyParser.urlencoded({extended:false}));

function errorHandler(err, req, res, next) {



}

app.use(errorHandler);

app.get('/', function (req, res, next) {
    res.render('index', {});
})

app.post('/add_movie', function (req, res, next) {

    var title = req.body.title;
    var year = req.body.year;
    var imdb = req.body.imdb;

    mongoClient.connect('mongodb://localhost:27017/video', function (err, db) {
        assert.equal(null, err);
        console.log('sucessfully connected');
        db.collection('movies').insertOne({
            'title': title
            , 'year': year
            , 'imdb': imdb
        },function(err,result){
            
            assert.equal(null,err);
            console.log("sucessfully inserted");
            console.log("results="+result);
            res.render('message',{'message':'sucess'})
            
        });

    })
})

app.use(function(req,res,next){
    res.sendStatus(404);
})

var server = app.listen(3030,function(){
    console.log('server listeniong on port '+server.address().port);
})