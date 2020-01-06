var express=require("express");
var cors=require("cors");
var bodyparser=require("body-parser");

var app=express();
app.use(cors());
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
var sharedObj = require('./connection');


app.get('/',function(req,res){
      res.sendFile(__dirname + "/index.html");
});
 
app.post('/reg-employ', function (req, res) {
   
	
	 var dataObj = req.body.data;
    sharedObj.fnGetMongoCon(res, function (db) {
        var collection = db.collection('employee');
        collection.insertOne(dataObj, function (e, r) {
            if (e) {
                res.send(e);
            } else {
                res.send(r);
            }
        })
    });

})

app.post('/find', function (req, res) {

    var userObj = { $text: { $search: "/" + req.body.data + "/" } };
    sharedObj.fnGetMongoCon(res, function (db) {
	
        var collectin = db.collection('employee');
		collectin.createIndex( { EmployeeID: "text", EmplyeeName: "text", Employeeemail: "text"  }, )
        collectin.find(userObj).toArray(function (e, r) {
            if (e) {
                res.send(e);
            } else {
                res.send(r);
            }
        })
    })
})
app.listen(8080);
console.log('server lsitening');