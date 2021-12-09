


var $gl = require("../l_node_modules/global.js").gl; 
var _=$gl.mds.lodash

var main={
    auto_run : function(){ 
        console.log("auto_running mongodb")
        
        //$gl.initMongoDBadmin({ connection : { dbhost : "" , dbport : "", dbname : ""dbuser : "" ,dbpass : ""  } } , function( mdb ){
        $gl.initMongoDB({ connection : { dbuser : "admin" , dbname : "admin"} } , function( mdb ){

            //console.log( "mongoddb test " , a , "err : " ,b )
            this.db=mdb.db
            this.dbclient=mdb.client
            this.dbstatus=mdb.status
        })

        $gl.initMongoDBadmin({ connection : {} } , function( mdb ){

            //console.log( "mongoddb test " , a , "err : " ,b )
            this.dbAdmin=mdb.db
            this.dbclientAdmin=mdb.client
            this.dbstatusAdmin=mdb.status
        })
    
    
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

                
            
            } 
        },
        {   
            name  : "mongodb",
            route : "/mongodb", // if route not included it will defualt to to name
            type : "post",
            cb : function(req, res,corestuff){ // or fn or callback 
                
                    res.send("testing mongodb" )
                
                
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

