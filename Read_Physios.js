var fs = require("fs");
var csv = require("fast-csv");
var mongodb = require('mongodb');
//We need to work with "MongoClient" interface in order to connect to a mongodb server.
var MongoClient = mongodb.MongoClient;

// Connection URL. This is where your mongodb server is running.
var url = 'mongodb://localhost:27017/physio';

// Use connect method to connect to the Server
MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('physiodr');
     var count =-1;
     var records = new Array(); 
     var stream = fs.createReadStream("C:\\nodejsfile\\physios.csv");
     
csv
 .fromStream(stream)
 .on("data", function(data){
  if(count>-1){
   var row = new Object();
    row.FirstName = data[0];
    row.LastName = data[1];
    row.DateofBirth=data[2];
    row.Gender=data[3];
    row.EmailAddress=data[4];
    row.Mobile=data[5];
    row.MedicalLicenseno=data[6];
    row.Experience=data[7];
    row.Qualification=data[8];
    row.Services=data[9];
    row.Homecare=data[10];
    row.Address=data[11];
    row.Speciality=data[12];
    row.ConsultingLocation=data[13];
    row.Area=data[14];
    row.ConsultingCharges=data[15];
    row.ManagedBy=data[16];
    row.PhysiosInCanSendPatientsToThisLocations=data[17];
    row.consultingTime=data[18]
    row.Enlist=data[19];
    row.Subscribe=data[20];
   //var jsndata=JSON.stringify(data);
   console.log(row);
   records[count]=row;
  }
   count++;
 
     //console.log(data,data.length);
 })
 .on("end", function(){
    collection.insert(records, function (err,records) {
       if (err) {
          console.log(err);
        } else {
         console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', records.length);
        }
      //Close connection
      db.close();
    }); 
     console.log("done");
 })
    // Insert some users
   /* collection.insert(data, function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log('Inserted %d documents into the "users" collection. The documents inserted with "_id" are:', result.length, result);
      }
      //Close connection
      db.close();
    });
*/
  }
});