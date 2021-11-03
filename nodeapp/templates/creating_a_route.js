// with custom route 
//take name of last line module.exports.?????=main  // ????? is your custom name of your library , so change it after copying or using this template example to whatever your custom library should be named

var _ = require("lodash");
var $gl = require("../l_node_modules/global.js").gl; // this contanes some extra modules and standard library function that can be made to make life easier , please see help under nodejsVRTwebStdLib

var main={
            auto_run : function(){ 
                console.log("auto_running test3")
            },
            run_after_init : function(params){ // params : { http: http , io : io} // io = socket.io 
                //console.log("after init params : " , params)

                // create a public path for images and pub files etc
                ///*
                var pubpath=__dirname + "/" + ".." + "/" +  "my-app" + "/"  + "pub_files" +"/" + "testmodule"
                var pub= $gl.mds.path.resolve( pubpath );                
                params.app.use( "/testmodule" , params.express.static(pub ) ); // http://testmodule/WhatEverIsInThisPathOfSecondParameter
                //*/
                
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
            __app : [ // must be named __app to create a route
                {   
                    name  : "test3",
                    route : "/test3", // if route not included it will defualt to to name
                    type : "get", // get or post
                    cb : function(req, res, corestuff){ // or fn or callback that will run once route is claled , // corestuff ,gives you some extra modules , parameters and values to use 
                        res.send("testing test3")
                    } 


                }, // add as many routes as you want in this array, and change name and route string values to your liking
                {   
                    name  : "test3",
                    route : "/test3", // if route not included it will defualt to to name
                    type : "post", // get or post
                    cb : function(req, res, corestuff){ // or fn or callback 
                        res.send("testing test3 POST")
                    } 


                }
            ]
        
}


 
module.exports.test33_mod=main;
 
