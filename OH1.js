var cron = require('cron');
var cronJob = cron.job("0 */2 * * * *", function(){
 var mongoose = require('mongoose');
 var csv = require("fast-csv");
 var fs = require("fs");
 var mongodb = require('mongodb');
 var uniqueValidator = require('mongoose-unique-validator');
 var validate = require('mongoose-validator');
 var phnoValidator = [
                      validate({
                       validator: 'isLength', //For ph_no validation (ph number must be 10 digits)
                       arguments: [10, 10],
                       message: 'phno should be  {ARGS[0]} digits'})
                    ];
 var PhysioCollectionSchema = new mongoose.Schema({
                                                    "Timestamp":{ type : String,required: true},
                                                     "First Name":{ type : String,required: true},
                                                     "Last Name":{type : String,required: true},
                                                     "Date of Birth":{type : Date,required: true},
                                                     "Gender":{type : String,required: true},
                                                     "Email Address":{ type :String, required: true,index: {unique:true}},
                                                     "Contact Number":{ type : Number,required: true,validate : phnoValidator,index: {unique: true}},
                                                     "Years of Experience":{type :String,required: false},
                                                     "IAP Number":{ type : String,required: true,index: {unique: true}},
                                                     "Education":{type : String,required: true},
                                                     "Degree(s) Obtained":{type :String,required: true},
                                                     "Specialisation":{type : String,required: false},
                                                     "Consulting Location 1":{type : String,required: true},
                                                     "Consulting Location 2 (If applicable)":{type : String,required: false},
                                                     "Consulting Location 3 (If applicable)":{type : String,required: false},
                                                     "Awards":{ type : String,required: false}
 
                                                    });
 
mongoose.model( 'PhysioCollection', PhysioCollectionSchema );
 
var PhysioCollection = mongoose.model('PhysioCollection');
 
 
 
//connect to our mongo database
 
var db = mongoose.connection;
 
mongoose.connect('mongodb://localhost:27017/OneHp');
 
 
 
//if we have any errors, show them in console
 
db.on('error', function (err) {
 
    console.log('connected ' + err.stack);
 
});
 
 
 
//when we disconnect from mongo, show this in console
 
db.on('disconnected', function(){
 
    console.log('disconnected');
 
});
 
 
 
//when we connect to mongo, show this in console
 
db.on('connected',function(){
 
    console.log('connected');
 
 
 
    //load some data to the database
 
csv.fromPath("C:\\nodejsfile\\drphy.csv", {headers : true})
 
.on("data", function(data){
 
 var record = new PhysioCollection(data);
 
 record.save( function( err, user ){
                                     if(!err){
 
                                                console.log('Saved Each Document');
 
                                             }
 
                                                else{
 
                                                    console.log(err);
 
                                                    }
 
                                    });
 
    })
 
   .on("end", function(){
 
                        console.log("done");
 
                     });
 
});
 
 
 
//make sure that we are closing the connection to mongo if something happens to node (like Ctrl + C)
 
process.on('SIGINT', function() {
 
                                 mongoose.connection.close(function () {
 
                                  process.exit(0);
 
                                });
 
 });
 console.info('cron job completed');
}); 
cronJob.start();