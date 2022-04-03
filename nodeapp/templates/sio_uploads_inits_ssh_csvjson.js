// with custom route 
//take name of last line module.exports.?????=main  // ????? is your custom name of your library , so change it after copying or using this template example to whatever your custom library should be named

var _ = require("lodash");
var $gl = require("../l_node_modules/global.js").gl; // this contanes some extra modules and standard library function that can be made to make life easier , please see help under nodejsVRTwebStdLib
//
var module_name="test4"

var main={ 
            auto_run : function(params){  // runs as the modules starts being initialised 
                console.log("auto_running testmodule")
                //console.log("params : " , params)

                /*
                var csv=""
                csv+="name,age\n"
                csv+="rob,36\n"
                csv+="bob,37\n"
                
                $gl.csv_parse(
                    csv
                    
                    ,(data)=>{
                        console.log(data)
                })

                var jsoncsv=[
                    { name : "bob" , age : 25},
                    { name : "gwen" , age : 28}
                ]
                $gl.json_to_csv(
                    jsoncsv
                    
                    ,(data)=>{
                        console.log(data)
                })
                */

                //$gl.ssh_shell( "uptime\nls -la;\date\nexit"  ,
                
                /* //works
                    $gl.ssh_prompt( 
                            [   
                                //"ls -la", 
                                { cmd : "echo name" },
                                { cmd : "read q" , prompt : "read q", write:"bob123" ,cb :()=>{console.log("log123")}}, 
                                { cmd : "ls -la" },
                                { cmd : "echo hello $q" },
                                //"my name is rob",
                                //"echo hello $q" 
                            ]  ,
                    
                    
                        {
                            conn : {host : "localhost", 
                            port : 22 , 
                            username : "myUser" ,
                            password : "somepass123" } 
                        } 
                        , function(data){
                            console.log( "ssh result : " , data)
                        })
                */
                
            },
            run_after_init : function(params){ // params : { http: http , io : io} // io = socket.io 

                //console.log("after init params : " , params)

                // create a public path for images and pub files etc
                ///*
                var pubpath=__dirname + "/" + ".." + "/" +  "my-app" + "/"  + "pub_files" +"/" + "testmodule"
                var pub= $gl.mds.path.resolve( pubpath );                
                params.app.use( "/testmodule" , params.express.static(pub ) ); // http://testmodule/WhatEverIsInThisPathOfSecondParameter
                //*/
                
                params.app.use( "/testmodule/pub1" , params.express.static( $gl.mds.path.resolve("../data/pub1" ) ) ); // http://testmodule/WhatEverIsInThisPathOfSecondParameter



                // socket io example
                var interval
                params.io.on("connection", (socket) => {
                    console.log("New socket.IO 2client connected");
                    if (interval) {
                    clearInterval(interval);
                    }
                    interval = setInterval(() => getApiAndEmit(socket), 60000);
                    socket.on("disconnect", () => {
                    console.log("socket.IO 2cClient disconnected");
                     clearInterval(interval);
                    });
                });


                const getApiAndEmit = socket => {
                    const response = {date : new Date(), "res2" : "res2" };
                    // Emitting a new message. Will be consumed by the client
                    socket.emit("FromAPI", response);
                };

            },
            uploads : {
                general : {
                    
                },
                types :[
                        { 
                            name : "csv",
                            cb : function(params){
                                console.log( "test upload " , params.type )
                            }                     

                        },
                        { 
                            name : "mycustomJPG",
                            cb : function(params){
                                console.log( "test upload " , params.type )
                            }
                        }
                ]
            },
            __app : [ // must be named __app to create a route
                {   
                    name  : "test4",
                    route : "/test4", // if route not included it will defualt to to name
                    type : "get", // get or post
                    cb : function(req, res, corestuff){ // or fn or callback that will run once route is called , // corestuff ,gives you some extra modules , parameters and values to use 
                        res.send("testing test4")
                    }


                } // add as many routes as you want in this array, and change name and route string values to your liking
                ,{   
                    name  : "apitest4",
                    route : "/apitest4", // if route not included it will defualt to to name
                    type : "post", // get or post
                    cb : function(req, res, corestuff){ // or fn or callback that will run once route is called , // corestuff ,gives you some extra modules , parameters and values to use 
                        var bd=req.body

                        corestuff.mds.users.verifyLoginAPI({ req : req},function(vd){ // api validation
                             if (vd.allowed){ // do something if token valid
                                     //console.log(JSON.stringify(vd.details,null,2))
                                     if (req.body.type==="get"){
                                         res.jsonp({ loggedin : true })
                                         return
                                     }
                                     if (req.body.type==="add"){
                                         res.jsonp({})
                                         return
                                     }
                                     
 
 
                                     
                                     res.jsonp({ "defualt" : "did nothing"})
                                     return
                                     
                             }else{ // no token included do something else
                                 if (req.body.type==="get"){
                                     res.jsonp({ loggedin : false})
                                     return
                                 }
                                 
 
                                 res.jsonp({ "defualt" : "did nothing"})
                                 return
                             }
                        })
                    } 
 
 
                } // add as many routes as you want in this array, and change name and route string values to your liking
                   
            ]
        
}


 
module.exports[module_name]=main;
 
