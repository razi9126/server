var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://razi9126:lmeihtp3@ds221271.mlab.com:21271/razi";
var ObjectID = require('mongodb').ObjectID;
// }); 

var User = function(){
  //his.name= "hamza"
  MongoClient.connect(url).then(db=>{
    this.client=db;
    this.db=this.client.db('razi');
    this.collection=this.db.collection('notes')
  }).catch(err=>{
    console.log(err);
  })
  
}

User.prototype.getID= function(id, callback){
  const details = { '_id': ObjectID(id) };
  this.collection.findOne(details, (err, item)=>{
      if (err) { 
        callback({ 'error': 'An error has occurred in GET' }); 
      } else {
        callback(null,item)
      }
    });
    
}

User.prototype.create= function(note, callback){
  this.collection.insert(note, (err, result) => {
      if (err) { 
        callback({ 'error': 'An error has occurred while CREATING' }); 
      } else {
        callback(null,result);
      }
    });
}

User.prototype.edit= function(id, note,  callback){
    const details = { '_id': ObjectID(id) };
    this.collection.update(details, note, (err, item) =>{
      if(err){
        callback({ 'error': 'An error has occurred while UPDATING' }); 
      } else {
        callback(null,item);
      }
    });
}

User.prototype.delete= function(details, callback){
  //const details = { '_id': ObjectID(id) };
  this.collection.remove(details, (err,item)=>{
    if(err){
        callback({ 'error': 'An error has occurred while REMOVING' }); 
      } else {
        callback(null,item);
      }
  })
}

User.prototype.all =  function(callback){
  this.collection.find({}).toArray((err,item) => {
    if (err) {
      callback('Error')
    } else {
      callback(item)
    }
  })
}

module.exports = User