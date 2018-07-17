// server.js

const express        = require('express');

const User= require('./redis')

// var ObjectID = require('mongodb').ObjectID;

// const MongoClient    = require('mongodb').MongoClient;

const bodyParser     = require('body-parser');

const app            = express();

app.use(bodyParser.urlencoded({ extended: true }));

user = new User()

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/create', function (req, res) {
	// console.log(req.body)

	user.create(req.body, function(msg,id){
		if(id=="0"){
			console.log('err',msg);
		}else
			res.status(200).send(id);
	})

})

app.put('/edit/:id', function(req, res) {
    const id = req.params.id
    //const id = { '_id': ObjectID(id_raw) }
    //var details = {}
    user.get(id,(msg) => {
        if (msg == null) {
            res.send('No Record Found of this id')
        } else {
            user.edit(id,req.body.comment,(msg) => {res.send(msg)})
        }
    })
})

app.put('/delete/:id', function(req, res) {
    const id = req.params.id
    //const id = { '_id': ObjectID(id_raw) }
    user.get(id,(msg) => {
        if (msg==null) {
            res.send('Record Not Found')
        } else {
            user.delete(id,(msg) => {res.send(msg)})
        }
    }) })
app.get('/get/:id', function(req, res) {
    const id = req.params.id
    //const details = { '_id': ObjectID(id) };
    user.get(id,(msg) => {
        if (msg==null) {
            res.send('User Not Found')
        } else {
            res.send(msg)
        }
        
    })
})


//Launch listening server on port 3000
app.listen(3000, function () {
  console.log('app listening on port 3000!')
})
