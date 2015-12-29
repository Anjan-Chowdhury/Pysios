// npm install corn
//npm install jsn2csv
//npm install nodemailer
//npm install fs
//npm install mongodb
var cron = require('cron');
var cronJob = cron.job("0 */1 * * * *", function(){
 var json2csv = require('json2csv');
 var fs = require('fs');
 var fs = require("fs");
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'onehealthsln@gmail.com',
        pass: '1healthsln'
    }
  });
 var mongodb = require('mongodb'),
     ObjectId = require('mongodb').ObjectId;
 var MongoClient = mongodb.MongoClient;
 var url = 'mongodb://localhost:27017/OneHp';
 MongoClient.connect(url, function (err, db) {
  if (err) {
     console.log('Unable to connect to the mongoDB server. Error:', err);
  } 
  else {
    //HURRAY!! We are connected. :)
    console.log('Connection established to', url);

    // Get the documents collection
    var collection = db.collection('physiocollections');
     
     
      collection.find().toArray(function(err, result) {
        if(err) {
          console.log("data is not fatched from Db")
        }
      
        //console.log(result);
        var fields = ['Timestamp','First Name','Last Name','Date of Birth','Gender','Email Address','Contact Number','Years of Experience','IAP Number','Education','Degree(s) Obtained','Specialisation','Consulting Location 1','Consulting Location 2 (If applicable)','Consulting Location 3 (If applicable)','Awards'];
        var mydata = result;
        //console.log(mydata);
        json2csv({ data: mydata, fields: fields }, function(err, csv) {
        if (err) console.log(err);
        else
        fs.writeFile('C:\\csvfile\\myphysioData.csv', csv, 'utf8', function(err) {
        if (err) throw err;
        //console.log(mydata);
        //console.log(csv);
       console.log('file saved');
       });
     });

     });
  }
});
console.info('cron job completed');
fs.readFile('C:\\csvfile\\myphysioData.csv', function (err, data) {
    if(err)
      console.log(err);
    else
    {

    transporter.sendMail({       
        sender: 'onehealthsln@gmail.com',
        to:    'self.anjan@gmail.com',
        subject: 'Attachment!',
        body: 'mail content...',
        attachments: [{'filename': 'myphysioData.csv', 'content': data}]

    }), function(err, success) {
        if (err) {
            // Handle error
        } 

    }
}
});

}); 
cronJob.start();