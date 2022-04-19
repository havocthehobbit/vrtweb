to create a custom API of GET/POST routes , you can create folders with  webvrt structure api ".js" files inside the /nodeapp file in the root of the webvrt proj.

you can either generate these with the -newaddon ,  parameter (use --help for more info) or you can manually create folders and files , as bellow.
    

The folder you create need to be named with the text , "l_node_modules_auto_" , with your custom name at the end . 
For example : l_node_modules_auto_myFirstCoolBeansMod  .
inside there you can create any js file with the bellow structure ( preferred name , main.js): 

---------------------------------------------------------------------------------------------------
api file structure : 

.../vrtweb/nodeapp/l_node_modules_auto_myFirstCoolBeansMod/main.js
---------------------------------------------------------------------------------------------------
    var module_name="myFirstCoolBeansMod"
    var main :{
         __app : [  {   
                        name  : "CoolBeans",route : "/CoolBeans",type : "post",                        
                        cb : function(req, res, corestuff){  res.jsonp({ data : "data123" }); 
                    }
                ]
    }

    module.exports[module_name]=main;

    
---------------------------------------------------------------------------------------------------


structure details : 
    main optional object properties : 
        auto_run : 
            type : function
            func params :
                param1 :  
        run_after_init : runs after the modules have been initialised and main app has been initialised  
            type : function
            func params : 
                param1 :  is an object that contains a number of properties of usuable objectes like 
                        io , which is the socket io initialised module functions or 
                        mds ,  access to mds custom modules .
        __app : 
            type : array
            array elements : 
                type  : obj
                obj props : 
                    name : name as a string and no space allowed
                    route : name as a string and no space allowed , which will be used as your api      
                            function call or endpoint for your get or post route                    
                    type : either a get or post string to tell system api method type 
                            vals : "post"  , "get"
                    cb : a function that will be called when your route is called 
                        function params  : (req, res, corestuff)
                                param1 - req :
                                param2 - res : mostly used to send data back to front end 
                                                req.jeonp() , req.send()
                                param3 - corestuff : contains a number of passthrough objections and functions from after the main nodeapp has initiliased 
                                    mds : corestuff.mds , can be used to call other custom modules or and there main properties 



-------------------------------------------------------------------------------

packaging modules as addons :

            
