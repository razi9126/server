const express        = require('express');

const User= require('./create_mongo')

var ObjectID = require('mongodb').ObjectID;

const MongoClient    = require('mongodb').MongoClient;

const bodyParser     = require('body-parser');

const app            = express();

app.use(bodyParser.urlencoded({ extended: true }));

user= new User()

//Define request response in root URL (/)
app.get('/', function (req, res) {
  res.send('Hello World!')
})

app.post('/create', function (req, res) {
  console.log(req.body)
  //console.log(req.query)
  user.create(req.body, function(err,result){
  	if(err){
  		console.log('err',err);
  	}else
  		res.send(result)
  })
  // user.create(function() {
  // 	console.log(req.body)
  // })
})

app.put('/edit/:id', function (req, res) {
  const id= req.params.id
  var record={}
  
  user.getID(id, function(err, item){
		if (err){
			console.log('err', err);
		}else
		{
			console.log(item)
			if (item== null)
				{res.send("Record DNE")}
			else{
				// console.log("Found")
				record= item
				const updated= Object.assign(record, req.body)
				user.edit(id, updated, function(err, item){
					if (err){
							console.log('err',err)
					}else
					{
						res.send(item)
					}
				}) 
			}
		}
	})

})

app.put('/delete/:id', function (req, res) {
  const id= req.params.id
  var record={}
  
  user.getID(id, function(err, item){
	if (err){
		console.log('err', err);
	}
	else
	{
		if(item== null)
			{res.send("Record DNE")}
		else{
		user.delete(item, function(err, item){
			if (err){
				console.log('err',err)
			}else{
				res.send("Deleted Record")
				console.log("Deleted Record: ", id)
			}

		})	}	 
	
	}
   })
})

app.get('/get/:id', function (req, res) {
	const id= req.params.id

	user.getID(id, function(err, item){
		if (err){
			console.log('err', err);
		}else{
			if(item== null)
				res.send("Record Not Found")
			else
				res.send(item)
		}
	})
})

app.get('/all', function (req, res) {
  user.all((msg) => res.send(msg))
})



//Launch listening server on port 3000
app.listen(3000, function () {
  console.log('app listening on port 3000!')
})
