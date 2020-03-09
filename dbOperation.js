const express = require('express')
const bodyParser= require('body-parser')



const app = express()
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
 var ObjectId = require('mongodb').ObjectId; 

var mongo = require("mongoose");


    var mongodb12 = 'mongodb://localhost:27017/db';
    mongo.connect(mongodb12,{useNewUrlParser:true});
    var db = mongo.connection;
    var Schema = mongo.Schema;

    
    
var UsersSchema = new Schema({
    _id :{
        type:String
    },
    id :{
        type :Number
    },
    uname :{
            type : String
        },
    cname :{
        type:String
    },
    content :{
        type : String
    }
    
})
var model= mongo.model('user',UsersSchema,'postmanDB');
app.post("/api/saveUser", function (req, res) {
    console.log("post");
    //console.log('collection name ' + mongo.connection.name + '...');
    // const data = 
    // { name: 'Salmon', bio: 'J.K. salmon the raising star' };
    const datadb = req.body;
    var mod = new model(datadb);
       //console.log(datadb);
          //var mod = new model(data);
          mod.save(function (err,data){
              if(err){
                  res.send(err);
              }else {
                  res.send(data +"Record has been inserted");
              }
          });
        
        
    })

    app.delete("/api/deleteUser", function (req, res) {
        console.log("remove");
        model.deleteOne({ id: req.body.id }, function (err) {
         //model.deleteOne({name:"Salmon"},function(err){
            if (err) {
                res.send(err);
            }
            else {
                res.send({ data: "Record has been Deleted..!!" });
            }
        });
    })
    app.put("/api/updateUser", function (req, res) {
    //     var id12 = req.body.id;       
    //     var o_id = new ObjectId(id12);
    //  console.log("id "+req.body.id);
    //     console.log("update"+o_id);
    //model.findByIdAndUpdate({ _id: o_id }, req.body,
        // model.updateOne({name:"Salmon"},{bio:"killing sprey"},
        model.updateOne({id:req.body.id}, { uname: req.body.uname, cname: req.body.cname, content: req.body.content },
        function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                console.log("update");
                res.send({ data: "Record has been Updated..!!" });
                }
            });
    
    })

    app.get("/api/getUser", function (req, res) {
        console.log("get");
        model.find({}, function (err, data) {
            if (err) {
                res.send(err);
            }
            else {
                res.send(data);
            }
        });
    })
    app.get("/api/getSingleUser/:id",function(req,res){
        console.log("single data for this id "+req.params.id);
        model.findOne({id:req.params.id}, function(err, data) {
            if(err){
                res.send(err);
            }
            else{
                res.send(data);
            }
          });
    })
    app.listen(3000, function() {
         console.log('listening on 3000')
       })

