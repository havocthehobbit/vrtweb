
var $gl = require("../l_node_modules/global.js").gl; 
var _=$gl.mds.lodash
var $bfns=require("../l_node_modules/basic_fns.js").main;

var main={
    auto_run : function(){ 
        console.log("auto_running mongodb")
        
        $bfns.params(function (val, index, array) {
            if (index > 1){
                //console.log("prompt : ", index + ': ' + val);
            }
            
        
            
            if (val==="-mongostatus" || val==="--mongostatus"){
                console.log("\n\n\nmongo status : " , "")
                var shout=$bfns.shellsync( `sudo service mongodb status` +" || true ").toString()
                console.log(shout)

                console.log("\n\n\n")

                process.exit()
            }

            if (val==="-mongostart" || val==="--mongostart"){
                console.log("\n\n\nsudo mongo status : " , "")
                var shout=$bfns.shellsync( `sudo service mongodb start` +" || true ").toString()
                console.log(shout)

                console.log("\n\n\n")

                process.exit()
            }
        })

        //$gl.initMongoDBadmin({ connection : { dbhost : "" , dbport : "", dbname : ""dbuser : "" ,dbpass : ""  } } , function( mdb ){
        $gl.initMongoDB({ connection : { dbuser : "admin" , dbname : "db1"} } , function( mdb ){

            //console.log( "mongoddb test " , a , "err : " ,b )
            main.db=mdb.db
            main.dbclient=mdb.client
            main.dbstatus=mdb.status 


            
            console.log( "dbstatus - " , main.dbstatus , main.dbstatus )

            
            //everything from this point could be put in a get or post route
            /////////////////////////////////////////////////////////////////////////
            if (!main.dbstatus){
                console.log( "!!!! failed admin mongoDB connection : " ,  "\n\n"   , mdb.err, "\n\n")
                return
            }


            //updateOne() // replaceOne() // updateMany()
            //https://docs.mongodb.com/drivers/node/v3.6/fundamentals/crud/write-operations/upsert/

            var users = db.collection('users');
            //findOne({ title: "The Room" }, {  sort: { "imdb.rating": -1 }, projection: { _id: 0, title: 1, imdb: 1 },}).toArray(function(err, docs) { 
                    // projection - only returns selected fields (like views) // 
            //find({ title: "The Room" }, {  sort: { "imdb.rating": -1 }, projection: { _id: 0, title: 1, imdb: 1 },}).toArray(function(err, docs) { 
                    // projection - only returns selected fields (like views) //
            //users.insertOne( { "userid" : "testuser"} , function(){
            //users.insertMany( [ { "userid" : "testuser" }, { "userid" : "testuser2"}], { ordered: true }, function(){ // ordered:true  prevents adding other docs if one fails
            //users.updateOne( { "userid" : "testuser"} ,{ "$set" : { "email" : "...@....com"}}, {upsert : true }, function(){   // upsert is to insert or update if it alreay exists          
            //users.updateMany( { rated: "G" },{ $inc: { num_mflix_comments: 2} }  , function(){}) // { $match: { runtime: { $lt: 15 } } } 
            //users.deleteOne({ "userid" : "testuser"} , function(){
            //.deleteMany("userid" : "testuser"} , function(){
            // users.countDocuments({ countries: "Canada" })
            // users.watch([ { $match: { runtime: { $lt: 15 } } } ]) // watch for changes  
                // or changeStream = collection.watch();  changeStream.on("change", next => { // process any change event console.log("received a change to the collection: \t", next); });
            //users.bulkWrite([  // do all of the above at onces in an array of commands
                users.updateOne( { "userid" : "testuser"} ,{ "$set" : { "email" : "...@....com"}}, {upsert : true }, function(){

                console.log("new user")

                users.find({}).toArray(function(err, docs) { 
                    console.log("find users : " , err , docs)
                })
            })

            //other 
                //aggregreate example - link multiple collections or chain multiple tasks/functions(link,find ,sort then group etc... )
                    /* //syntax
                        db.collection(collectionName).aggregate(pipelineArray, {
                        cursor: {}
                        }, function(error, result) {
                        ...
                        });
                    */
                    /*
                        var defCursor = {};
                        var cursor = db.collection(collectionName).aggregate([
                            {
                                $lookup: {
                                            from: "someSecondCollectionName",
                                            localField: "localId",
                                            foreignField: "_id",
                                            as: "someData"
                                        }
                            },
                            {
                                $match: {
                                            "localId": someId
                                        }
                            }
                        ],defCursor,null);
                        cursor.toArray(function(err, docs) {
                            console.log("Some data: ", docs);
                            callback(err, docs);
                            //db.close();
                        }
                    */
                //or
                //aggregate(pipeline, options, callback)
                    // this.aggregate( [{ $unwind : "$tags" },{$group: {_id: '$tags', count: { $sum: 1} }},{$sort: { count: 1 }}] ).cursor({}).exec();
                
                //users.createIndex()

        })

        if (false){ // admin functionts 
            $gl.initMongoDBadmin({ connection : {} } , function( mdb ){

                //console.log( "mongoddb test " , a , "err : " ,b )
                main.dbAdmin=mdb.db
                main.dbclientAdmin=mdb.client
                main.dbstatusAdmin=mdb.status

                console.log( "dbstatusAdmin - " , main.dbstatusAdmin)

                //https://mongodb.github.io/node-mongodb-native/3.6/api/Collection.html
                //addUser(username, password, options, callback)  // removeUser(username, options, callback)

                if (!main.dbstatusAdmin){
                    console.log( "failed admin mongoDB connection" )
                    return
                }

                var db=main.dbAdmin
                db.listDatabases(function(err, dbs) {

                var autocreateDB=[
                    { name : "db1"}
                ]
                    
                    if (dbs.databases.length > 0){
                        var ds=dbs.databases
                        //console.log( "dbs : " ,  ds)
                        console.log( "databases : \n==============" )
                        ds.forEach((r,i) => {
                            console.log( "db name : " , r.name)
                        });
                    };
                    
                    
                    
                });

            })   
        }
    
    }
    ,dbstatus : false
    ,dbstatusAdmin : false
    ,db : {}
    ,dbAdmin : {}
    ,dbclient : ()=>{}
    ,dbclientAdmin : ()=>{}
    ,table : "../data/dbs/kcs/calltypes.json"
    ,__app : [ // must be named __app to create a route
        {   
            name  : "mongodb",
            route : "/mongodb", // if route not included it will defualt to to name
            type : "get",
            cb : function(req, res,corestuff){ // or fn or callback 
                console.log("main.dbstatus" , main.dbstatus)
                if ( main.dbstatus){
                    var db=main.db


                    var users = db.collection('users');

                    users.find({}).toArray(function(err, docs) { 
                        console.log("find users : " , err , docs)
                        var ret=""

                        //ret =`${ JSON.stringify(docs)  }`
                        ret =docs[0].userid

                        res.send( ret )
                    })

                }else{
                    res.send("mongodb functions not working" )
                }
                
            
            } 
        },
        {   
            name  : "mongodb",
            route : "/mongodb", // if route not included it will defualt to to name
            type : "post",
            cb : function(req, res,corestuff){ // or fn or callback 
                
                    res.jsonp({ data : "testing mongodb" })
                
                
            } 
        }
    ]
    ,get_filetable : function(cb){
    
        var jsonfilepath= this.table ;               

        $gl.get_json_db(   jsonfilepath  , function(new_data){
            
           cb(new_data)
        })

    }
     
        
}
var tt=main;
 
module.exports.mongodb=main;

