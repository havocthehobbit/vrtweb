


var $gl = require("../l_node_modules/global.js").gl;
var _=$gl.mds.lodash

var main={
    auto_run : function(){ 
        console.log("auto_running kcs")}
    ,table : "../data/dbs/kcs/calltypes.json"
    ,__app : [ // must be named __app to create a route
        {   
            name  : "mongodb",
            route : "/mongodb", // if route not included it will defualt to to name
            type : "get",
            cb : function(req, res,corestuff){ // or fn or callback 

                $gl.initMongoDBadmin({ connection : {} } , function( a  , b){

                    console.log( "mongoddb test " , a , "err : " ,b )
                })
            
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

