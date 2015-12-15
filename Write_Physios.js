var json2csv = require('json2csv');
var fs = require("fs");
var mongodb = require('mongodb'),
  ObjectId = require('mongodb').ObjectId;
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/my_database_name';
MongoClient.connect(url, function (err, db) {
  if (err) {
     console.log('Unable to connect to the mongoDB server. Error:', err);
  } 
  else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);
   
   var collection = db.collection('doctor');
   collection.find().toArray(function(err, result) {
        if(err) {
          console.log("data is not fatched from Db")
        }
 //});
//var fields = ['car', 'price', 'color'];
var fields = ['name', 'phone'];
var myData=result;

  console.log(myData);
  json2csv({ data: myData, fields: fields }, function(err, csv) {
    if (err) console.log(err);
    fs.writeFile('C:\\csvfile\\testdata2.csv', csv, function(err) {
     if (err) throw err;
       //console.log(myData);
    console.log('file saved');
  });
});
});
}
});