var mongoDb=require('mongodb');
var sharedObj={};

sharedObj.fnGetMongoCon=function(res,cb){
    var mongoClient=mongoDb.MongoClient;
    var url="mongodb://localhost:27017"
    mongoClient.connect(url,function(err,dbb){
          if(err){
              res.send('db conn error');
          }
          var db=dbb.db('tutorialtous');
          cb(db); 
    })
}




module.exports=sharedObj;