var Redis = require('ioredis');

var db = new Redis({
  // This is the default value of `retryStrategy`
  retryStrategy: function (times) {
  	var delay = Math.min(times * 50, 2000);
  	return delay;
  }
});

var User = function(){
	db.on('connect', function () { 
		console.log("A client connected")
	});
	db.on('error', function () { 
		console.log("Error connecting to redis")
	});

}


User.prototype.create= function(databody, callback){
	  var c = ""
	  c = databody.comment
	  var id = Math.floor(Math.random() * 1000000000) ;
	  id=id.toString();

	  var currentDate = new Date();
	  var date = currentDate.getDate();
	  var month = currentDate.getMonth(); //Be careful! January is 0 not 1
	  var year = currentDate.getFullYear();
	  var dateString = date + "-" +(month + 1) + "-" + year;
	  
	  var data = {"comment": c, "date": dateString}
	  db.hmset(id, data, function(err,res){
	  	if(err){
	  		callback(err,"0");
	  	}else{
	  		callback(null,id);
	  	}
	  });
		
}
User.prototype.delete = function(id,callback) {
 db.del(id,function(err,result){
     if(err){
         callback('An Error has Occurred while deleting'+ err)
     } else {
         if (!result) {
             callback('Record Not Found')
         } else {
         callback('Deleted Successfully!')
     }
     }
 })
}
User.prototype.edit = function(id,comment,callback) {
	var id = id;
 	var currentDate = new Date();
	var date = currentDate.getDate();
	var month = currentDate.getMonth(); //Be careful! January is 0 not 1
	var year = currentDate.getFullYear();
	var dateString = date + "-" +(month + 1) + "-" + year;

 	var data = {"comment": c, "date": dateString}
	db.hmset(id, data, function(err,resp) {
     if (err) {
         callback('An Error has occurred while adding'+ err)
     } else {
         callback('Edited Successfully!' + resp)
     }
 })
}
User.prototype.get = function(id,callback) {
 db.hgetall(id,function(err,data){
     if(err){
         callback('An Error occurred during extraction'+ err)
     } else {
         callback(data)
     }
 })
}

module.exports = User