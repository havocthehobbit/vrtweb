console.log(new Date())

var  execSync = require('child_process').execSync;

process.argv.forEach(function (val, index, array) {
    if (index > 1){
        //console.log("prompt : ", index + ': ' + val);
    }
    
    
    if (val==="-h" || val==="-help" || val==="--help"){
        var help= `--------HELP------\n` 
            help+=`====================\n` 
            help+=`-dip : overide data/settings with default IP address\n` 
            help+=`port : overide data/settings port\n` 
            help+=`\n` 
            help+=`-npmnode : install react packages\n` 
            help+=`-npmreact : install react packages\n` 
            console.log( help )
        process.exit()
    }
    
    if (val==="-npmnode" || val==="--npmnode" ){
        var shellinst=execSync(`npm install --save --force`)
        console.log(shellinst)
    }
    if (val==="-npmreact" || val==="--npmreact" ){
        var shellinst=execSync(`cd ../my-app ; npm install --save --force`)
        console.log(shellinst)
    }

});

var $gl = require("./l_node_modules/global.js").gl;
var fs = $gl.mds.fs;
var path =$gl.mds.path;
var _ = $gl.mds.lodash;


//////// init dependancies ////

var depcy=new $gl.depcy()

if (true){
    depcy.add({ name : "nodejspackages", file : "../nodeapp/package.json" , type :  "f" , res : { action : "fetchtemplate" , src : "../install_update/templates/nodeapp/package.json" } })
    depcy.add({ name : "reactjspackages", file : "../my-app/package.json" , type :  "f" , res : { action : "fetchtemplate" , src : "../install_update/templates/my-app/package.json" } })

    depcy.add({ name : "addonsInstallNewDir", dir : "../addons/install" , type :  "md" , res : { action : "makedir"  } })
    depcy.add({ name : "addonsArchiveNewDir", dir : "../addons/archive" , type :  "md" , res : { action : "makedir"  } })
    depcy.add({ name : "addonsFaieldNewDir", dir : "../addons/failed" , type :  "md" , res : { action : "makedir"  } })
    depcy.add({ name : "addonsFaieldNewDir", dir : "../addons/temp" , type :  "md" , res : { action : "makedir"  } })
    depcy.add({ name : "addonsReg", file : "../addons/reg.json" , type :  "f" , res : { action : "fetchtemplate" , src : "../addons/templates/reg.json" } })


    depcy.add({ name : "datasettings", file : "../data/settings.json" , type :  "f" , res : { action : "fetchtemplate" , src : "../data/template/settings.json" } })

    depcy.add({ name : "datadb1", dir : "../data/db1" , type :  "d" , res : { action : "copydir" , src : "../data/template/db1" } })

    depcy.add({ name : "datadbs", dir : "../data/dbs" , type :  "md" , res : { action : "makedir"  } })

    depcy.add({ name : "custommenusNewDir", dir : "../my-app/src/components/custom" , type :  "md" , res : { action : "makedir"  } })
    depcy.add({ name : "custommenus", file : "../my-app/src/components/custom/custommenus.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/custommenus.js" } })
    depcy.add({ name : "cmmode", file : "../my-app/src/components/custom/cmmode.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/cmmode.js" } })
    depcy.add({ name : "frontpage", file : "../my-app/src/components/custom/frontpage.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/frontpage.js" } })
    depcy.add({ name : "frontpage", file : "../my-app/src/components/custom/globalStateReducer.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/globalStateReducer.js" } })
    depcy.add({ name : "customPageMainApp", file : "../my-app/src/components/custom/customPageMainApp.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/customPageMainApp.js" } })
    depcy.add({ name : "custommenus", file : "../my-app/src/components/custom/custommenus.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/custommenus.js" } })
    depcy.add({ name : "cmmode", file : "../my-app/src/components/custom/cmmode.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/cmmode.js" } })

    depcy.add({ name : "clientelectronEjs", file : "../clients/electron/app/public/electron.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../clients/electron/app/public/templates/electron.js" } })
    depcy.add({ name : "clientelectronPreLdjs", file : "../clients/electron/app/public/preload.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../clients/electron/app/public/templates/preload.js" } })
    depcy.add({ name : "clientelectronPackage", file : "../clients/electron/app/package.json" , type :  "f" , res : { action : "fetchtemplate" , src : "../clients/electron/app/templates/package.json" } })

    depcy.check()
    
    ////////

    var templatePckJsn= JSON.parse( $gl.mds.fs.readFileSync("../install_update/templates/nodeapp/package.json" , 'utf8') );
    var PckJsn= JSON.parse( $gl.mds.fs.readFileSync("./package.json", 'utf8') );
   
    var hasnewPckjsn=false
    _.each(templatePckJsn.dependencies ,(v , p)=>{
        if (_.isUndefined(  PckJsn.dependencies[p] )){
            hasnewPckjsn=true
            console.log("please install --> nodeapp : npm i -s " , p ,    "     # ( " ,v, " ) ")
        }        

    })
    if (hasnewPckjsn){
        console.log("\n\n\n=========!!!!!!!!!!==========\n\n")
    }
}

//$gl.mds.prompt.start();
//var prompt=$gl.mds.prompt

//prompt.get("name", function(err, result) {
//    console.log("Your name is ",result.name)
//});


//process.exit()


var onSIGEND=function(){
    console.log("!!!!! killed  process")
}

process.on('SIGTERM', () => {
    //server.close(() => {
      console.log('Process terminated')
      onSIGEND()
    //})
})





var lib_settings = require("./l_node_modules/global.js").settings;
var $vserv =new lib_settings()



process.argv.forEach(function (val, index, array) {
    if (index > 1){
        //console.log("prompt : ", index + ': ' + val);
    }
    

    
    if (val==="--setup" || val==="-setup"){
        console.log( "setting up")
        process.exit()
    }

    if (val==="--dip" || val==="-dip"){
        //console.log( "setting up")
        var newIP=execSync(`ip a l | grep "net " | grep eth | grep -v grep |tr '/' ' ' |awk '{ print $2 }'`)
        newIP=newIP.toString().replace("\n" , "" ).trim()
        console.log( "newIP : " , newIP )
        $vserv.data.host=newIP
    }

    if (val==="--port" || val==="-port"){
        $vserv.data.port=parseInt(array[index + 1 ] )
    }

    // ip a l | grep "net " | grep eth | grep -v grep |tr '/' ' ' |awk '{ print $2 }'
});





var express = $gl.mds.express
var app = express();
var protocolH=$vserv.data.httpProtoString
var http
if (protocolH==="http"){
    http = $gl.mds.http.Server(app);
}else {   
    var sslkey= $gl.mds.fs.readFileSync($vserv.data.sslkey);
    var sslcert= $gl.mds.fs.readFileSync($vserv.data.sslcert);
    http = $gl.mds.https.Server({ key : sslkey , cert : sslcert },app);
    

} 



var cookieParser = $gl.mds.cookieParser;
var cookieExpires = 315360000000 //10 * 365 * 24 * 60 * 60 * 1000 === 315360000000, or 10 years in milliseconds
if (!_.isUndefined($vserv.data.cookieExpires)){
    cookieExpires=$vserv.data.cookieExpires
}


const multer = $gl.mds.multer;

var jwt = $gl.mds.jsonwebtoken;
jwtoptions=$vserv.data.jwtoptions

var $test_data = require("./l_node_modules/test_data.js").test_data;

app.use(cookieParser($vserv.data.cookieSecret));

app.use(express.json());		// no longer need body parser , its built into express now .
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies

//var csv = require("csv");


var cors = $gl.mds.cors;
const { emitKeypressEvents } = $gl.mds.readline;

var cors_param={
                    origin: [
                                /http/     // regular expression to allow any source server anything cause * is not allowed
                            ]
                    , credentials: true
                    ,methods: ["GET", "POST"]
                }
var cors_paramsF1=cors( cors_param ) 
app.use( "*" , cors_paramsF1 );

const io = $gl.mds.socketio(http,  { cors : cors_param } );

var mdsfn={} ;
var mds={} ;
var mdsc={} ;
var auto_mod_folders=[]


var temp_DIR = path.join(__dirname, 'l_node_modules_fn');
mdsfn=$gl.autoLoadModules(temp_DIR , true);
if(false){
    //LoadModules(DIR );
    //console.log( "mds : " , mds)
    //mds.testmod2.al3()

    //mdsfn=$gl.autoLoadModules(temp_DIR , true);
    console.log( "mds : " , mdsfn)
    mdsfn.al3()
}
/*
var temp_DIR = path.join(__dirname, 'l_node_modules_auto');
mds=$gl.autoLoadModules(temp_DIR);
if (false){    
    console.log( "mds : " , mds)
    mds.testmod2.al3()
}
*/

var temp_DIR = path.join(__dirname, 'l_node_modules_auto');
mds=$gl.autoLoadModules(temp_DIR, {vserv : $vserv});
if (false){    
    console.log( "mds : " , mds)
    mds.testmod2.al3()
}
// load auto_custom_ libs
var stat=fs.lstatSync("./");
var files=fs.readdirSync("./");

_.each( files  , function(f,i){
//if (stat.isDirectory()) {
    var stat=fs.lstatSync(f) 
    if (stat.isDirectory()) {
        if (f.startsWith("l_node_modules_auto_") ){
            auto_mod_folders.push(f)
            console.log( "f " , f )
        }
    }
//}
})

_.each(auto_mod_folders , function(file,i){ // if starts with  l_node_modules_auto_ then auto load file in 
    
    var temp_DIR = path.join(__dirname, file);
    mdsc=$gl.autoLoadModules(temp_DIR,{ vserv : $vserv});
    mds=_.merge(mds, mdsc)
})


var reactbuildpath=__dirname + "/" + ".." + "/" +  "my-app" + "/" + "build"
var pub= path.resolve( reactbuildpath );

app.use(express.static('public'));

app.use(  express.static(pub ) );


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////



// install plugin
var installaddon=function(){

}
//check if empty
var addoninstallpath="../addons/install"
fs.readdir(addoninstallpath, function(err, files) {
    if (err) {
       // some sort of error
       console.log( "addons/install - error : " , err)
    } else {
       if (!files.length) {
           // directory appears to be empty
       }else{
            // process each one
            console.log("found plugins")
            console.log("files : " , files)
            files.forEach(function(f,i){
                var fpath=addoninstallpath + "/" + f
                var isFile=true
                var stat=fs.lstatSync( fpath);
                if (stat.isDirectory()) {                    
                    isFile=false
                }

                if (isFile){
                    if (f.endsWith(".vrt")){ // compressed addon

                    }
                }else{

                }




            })

       }
    }
});



/////////////////////

var uploadsApps={ types : {} , general : {} }



var server = http.listen( $vserv.data.port , $vserv.data.host  , function () { 
    
    
      var host = server.address().address ;
      var port = server.address().port ;
    
      console.log("server is listening at " + protocolH + "://%s:%s", host, port)
      console.log(reactbuildpath)
      console.log( `if react dev mode start with (my-app/startdev.sh): export REACT_APP_DEV_NODE_PORT=${port} ; npm start `)
      console.log(new Date())



            
        // dynamic module routes 

        //console.log ( "dynamic module : ",mds.kcs_mod.app )
        var gl_bundle={ app : app,express : express,mds :mds , mdsfn : mdsfn , vserv : $vserv, pub : pub ,debug_0 ,http : http , io : io}
        var dyn_routes={}
        var dyn_routes_names={}

        _.each(mds, function(r1 , l_modulename){    
            if ( !_.isUndefined(r1["__app"] ) ){
                _.each(r1["__app"], function(r , prop){
                    var mapp=r
                    var lapp={ name : "" , route : "" , type : "" , cb : function(){} }
                                
                    if (!_.isUndefined( mapp.route) ){
                        lapp.route= mapp.route;
                    }
                    if (!_.isUndefined( mapp.name) ){
                        lapp.name= mapp.name;
                        if (lapp.route===""){
                            lapp.route="/" + lapp.name;
                        }
                    }
                    if ( lapp.route==="" || lapp.route==="/"  ){
                        lapp.route="/prop"
                        //console.log( "Warning!!! : one of your api/libs for module" + prop + " does not have a route or a name so would not be accessable as an api !!!")
                        //return
                    }
                    if ( lapp.name===""){
                        lapp.name=l_modulename
                    }

                    if ( !_.isUndefined( mapp.type) ){
                        if ( mapp.type==="get" || mapp.type==="GET"){                  
                            lapp.type="get";
                        }
                        if ( mapp.type==="post" || mapp.type==="POST"){
                            lapp.type="post";
                        }
                        
                    }else{
                        lapp.type="get"
                    }
                    if (!_.isUndefined( mapp.cb) ){
                        lapp.cb= mapp.cb;
                    }
                    if (!_.isUndefined( mapp.fn) ){
                        lapp.cb= mapp.fn;
                    }
                    if (!_.isUndefined( mapp.callback) ){
                        lapp.cb= mapp.callback;
                    }

                    dyn_routes_names[lapp.name]={}
                    dyn_routes[lapp.name]={}

                    app[lapp.type]( lapp.route ,function(req, res , next) { 
                        var other = gl_bundle;
                        other.next=next
                        lapp.cb(req, res ,  other ) 
                    })

                })
            
            }
            if ( !_.isUndefined(r1["run_after_init"] ) ){
                r1["run_after_init"](gl_bundle)
            }
            if ( !_.isUndefined(r1["uploads"] ) ){
                if ( !_.isUndefined(r1["uploads"]["types"] ) ){
                    _.each(r1["uploads"]["types"], function(r , prop){
                    
                        var mapp=r;
                        var lapp={}

                        if (!_.isUndefined( mapp.name) ){
                            lapp.name= mapp.name;
                        }else{
                            console.log("name is not included in one of the update types of custom plugins")
                        }

                        if (!_.isUndefined( mapp.cb) ){
                            lapp.cb= mapp.cb;
                        }
                        if (!_.isUndefined( mapp.fn) ){
                            lapp.cb= mapp.fn;
                        }
                        if (!_.isUndefined( mapp.callback) ){
                            lapp.cb= mapp.callback;
                        }

                        
                        _.each(r1["uploads"]["types"], function(r , prop){
                                uploadsApps.types[r.name]=lapp   
                            
                        })
                    
                    })
                }
            }
        })
        // end of dynamic modules routes

        app.get("/*" ,function(req , res){ // defualt 404 route
            //res.sendFile(path.join(__dirname, pub ), function(err) {
            res.sendFile( pub + "/" + "index.html" , function(err) {
                //if (err) {
                //  res.status(500).send(err)
                //}
              })
        })

});


var interval
io.on("connection", (socket) => {
    console.log("New socket.IO client connected");
    if (interval) {
      clearInterval(interval);
    }
    interval = setInterval(() => getApiAndEmit(socket), 60000);
    socket.on("disconnect", () => {
      console.log("socket.IO Client disconnected");
      clearInterval(interval);
    });
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////

const getApiAndEmit = socket => {
    const response = new Date();
    // Emitting a new message. Will be consumed by the client
    socket.emit("FromAPI", response);
};

var debug_0={};


var api_list = {    
    all : {},
    allarr : [],
    schema : {
        name : "",
        help : "",
        desc : "",
        schema : {},

    } ,
    add : function(inst){
        if (_.isString){

        }
        if (_.isPlainObject){

        }
    }


}

// prog mem cached or temp data
var all_data=$test_data.all_data;



var template_o={
    name : "temp",
    schema : {},
    views : {} ,
    all : [

    ],
    get : function(){

                return
    },
    add : function(){

        return
    },
    getDemo : function(){
        var args=arguments;

        var cb=function(){}

        var ret_data={}


        if ( args.length > 0){
            if (_.isPlainObject(args[0])){
                if (!_.isUndefined(args[0].cb)){
                    cb=args[0].cb
                }
                
            }

            if (args.length > 1){
                cb=args[1];
            }
        }

        cb(ret_data)
        return ret_data;
    }

}




app.post("/news" ,function(req , res){
        
    var data={
        data : all_data.users,
        status : 0,
        error : ""
    }

    var ret_data={
        data : { },
        status : 0,
        error : ""
    }
   
    if (req.body.type===""){

    }

    var bd=req.body

    //var token=req.headers["x-auth-token"];
    //if (!token || _.isUndefined(token)){
    //    token=req.cookies.token;
    //}

    //mds.users.verifyLoginAPI(token,function(tkdata){
    mds.users.verifyLoginAPI({ req : req},function(vd){
        if (vd.allowed){ 
                //console.log(JSON.stringify(vd.details,null,2))
                if (req.body.type==="get"){
                    mds.news_o.get({}, function(new_data){
                        ret_data.data=new_data.all
                
                        res.jsonp(ret_data)
                    })
                }
                if (req.body.type==="add"){
                    mds.news_o.add(req.body.data, function(new_data){
                        ret_data.data=new_data
                
                        res.jsonp(ret_data)
                    })
                }
                // console.log( "getGroupsFromUser : " , mds.users.getGroupsFromUser("bob") )
                // console.log( "getRolesFromGroups : " ,  mds.users.getRolesFromGroups( mds.users.getGroupsFromUser("bob") ) )
                // console.log( "getProgramsFromRoles : " , mds.users.getProgramsFromRoles( mds.users.getRolesFromGroups( mds.users.getGroupsFromUser("bob") ) ) )

                // console.log( "checkUserAccessToProgram : " , mds.users.checkUserAccessToProgram("bob" , ["news" , "admingeneralpage"]))
                
                // mds.news_o.getDemo({}, function(new_data){
       
        }else{
            res.jsonp(ret_data)
        }
    })
})



app.post("/notes" ,function(req , res){ 
    var data={
        data : all_data.users,
        status : 0,
        error : ""
    }

    var ret_data={
        data : { },
        status : 0,
        error : ""
    }

    var inp_data=req.body;
    var cmd=inp_data.cmd

    
    var token=req.headers["x-auth-token"];
    if (!token || _.isUndefined(token)){
        token=req.cookies.token;
    }

    var locals={};
    mds.users.verifyJWT(token ,function(tkdata){
        if (tkdata.status==="success"){
            if ( tkdata.data.rt_jwt_isAuth ){
                var userid=tkdata.data.userid ; 

                switch(cmd){                    
                    case "getUserNotes":                        
                        mds.users.fetchUserDetail(userid ,function(dta2){                            
                            mds.notes.getUserNotes(dta2.uuid,function(dta){                               
                                
                                ret_data.data=dta;
                                res.jsonp(ret_data)                          

                            })
                        })
                        return; 
                        break;
                   
                    case "saveUserNote":                        
                        var notetype=""
                        var notetitle=""
                        if (inp_data.type==="usermain"){
                            notetype="usermain"
                        }
                        mds.users.fetchUserDetail(userid ,function(dta2){                            
                            mds.notes.saveUserNote(
                                {   useruuid : dta2.uuid,
                                    body : inp_data.data,
                                    type : notetype,
                                    title : "main notes"
                                }
                                ,function(dta){                               
                                
                                    ret_data.data=dta;
                                    res.jsonp(ret_data)                          

                            })
                        })
                        return; 
                        break;
                   
                    default:
                    
                }
            }
        }

    })

})


app.post("/codegen" ,function(req , res){ 
    var data={
        data : all_data.users,
        status : 0,
        error : ""
    }

    var ret_data={
        data : { },
        status : 0,
        error : ""
    }

    var inp_data=req.body;
    var cmd=inp_data.cmd

    
    var token=req.headers["x-auth-token"];
    if (!token || _.isUndefined(token)){
        token=req.cookies.token;
    }
    
    var locals={};
    mds.users.verifyJWT(token ,function(tkdata){
        if (tkdata.status==="success"){
            if ( tkdata.data.rt_jwt_isAuth ){
                var userid=tkdata.data.userid ; 
                
                switch(cmd){                    
                    case "getProject":                        
                        var pr;
                        if (!_.isUndefined(inp_data.data)){
                            pr=inp_data.data;
                        }else{
                            return
                        }
                        //console.log("pr.uuid "  , pr.uuid)
                        mds.users.fetchUserDetail(userid ,function(dta2){                            
                            mds.codegen.getProject(pr,function(dta){                               
                                
                                ret_data.data=dta.rec;
                                res.jsonp(ret_data)                          

                            })
                        })
                        return; 
                        break;
                   
                    case "listProjects":                        
                        
                        var pr={};
                        /*
                        if (!_.isUndefined(inp_data.data)){
                            pr=inp_data.data;
                        }else{
                            return
                        }
                        */
                        mds.users.fetchUserDetail(userid ,function(dta2){                            
                            //pr.useruuid=dta2.uuid; // add user id
                            
                            mds.codegen.listProjects(  pr
                                ,function(dta){ 
                                    
                                    ret_data.data=dta;
                                    res.jsonp(ret_data)                          

                            })
                        })
                        return; 
                        break;
                    case "saveProject":                        
                
                        var pr;
                        if (!_.isUndefined(inp_data.data)){
                            pr=inp_data.data;
                        }else{
                            return
                        }
                        
                        mds.users.fetchUserDetail(userid ,function(dta2){                            
                            pr.useruuid=dta2.uuid; // add user id
                            
                            mds.codegen.saveProject(  pr
                                ,function(dta){ 
                                    var retdta=dta;

                                    

                                    ret_data.data=retdta;
                                    res.jsonp(ret_data)                          

                            })
                        })
                        return; 
                        break;
                
                    default:
                    
                }
            }
        }

    })

})


app.post("/dates" ,function(req , res){ 
    var data={
        data : all_data.users,
        status : 0,
        error : ""
    }

    var ret_data={
        data : { },
        status : 0,
        error : ""
    }

    var inp_data=req.body;
    var cmd=inp_data.cmd

    
    var token=req.headers["x-auth-token"];
    if (!token || _.isUndefined(token)){
        token=req.cookies.token;
    }

    var locals={};
    mds.users.verifyJWT(token ,function(tkdata){
        if (tkdata.status==="success"){
            if ( tkdata.data.rt_jwt_isAuth ){
                var userid=tkdata.data.userid ; 

                switch(cmd){
                    case "getTodayUser":                     
                        
                        return; 
                        break;
                    case "getTodayWeek":                     
                        
                        return; 
                        break;                        
                    case "getTodayMonth":                     
                        
                        return; 
                        break;
                    case "getTodayYear":                     
                        
                        return; 
                        break;
                    case "getTeamsToday":                     
                        
                        return; 
                        break;
                    case "getDepartmentToday":                     
                        
                        return; 
                        break;
                    case "getOutofOfficeTodayAll":                     
                        mds.dates.getOutofOfficeTodayAll({},function(dta){
                            //ret_data.data.ooo=dta;
                            var arr=[]
                            _.each(dta,function(r,i){
                                mds.users.fetchUserDetailByUUIDSync(r.uuid ,function(dta2){
                                    var rec={}
                                    rec.name=dta2.name
                                    rec.surname=dta2.surname
                                    rec.title=r.title
                                    rec.desc=r.desc
                                    rec.email=dta2.email
                                    rec.date=r.date
                                    //rec.name=dta2.userid
                                    arr.push(rec)
                                })
                            })
                            
                            ret_data.data.ooo=arr;
                            res.jsonp(ret_data)                          

                        })
                        return; 
                        break;
                    case "getOutofOfficePlus7Days":                     
                        
                        return; 
                        break;
                    case "getOutofOfficeTodayDepartment":                     
                        
                        return; 
                        break;
                    case "getProjectsTodayAll":                     
                        mds.dates.getProjectsTodayAll(function(dta){
                            //ret_data.data.ooo=dta;
                            var arr=[]
                            _.each(dta,function(r,i){
                                mds.users.fetchUserDetailByUUIDSync(r.uuid ,function(dta2){
                                    var rec={}
                                    rec.name=dta2.name
                                    rec.surname=dta2.surname
                                    rec.title=r.title
                                    rec.desc=r.desc
                                    rec.email=dta2.email
                                    rec.date=r.date
                                    //rec.name=dta2.userid
                                    arr.push(rec)
                                })
                            })
                            
                            ret_data.data.ooo=arr;
                            res.jsonp(ret_data)                          

                        })
                        return; 
                        break;
                    
                    default:
                    
                }
            }
        }

    })

})

app.post("/users" ,function(req , res){
        
    var data={
        data : all_data.users,
        status : 0,
        error : ""
    }

    var ret_data={
        data : { },
        status : 0,
        error : ""
    }

    var inp_data=req.body;
    var cmd=inp_data.cmd

    
    var token=req.headers["x-auth-token"];
    if (!token || _.isUndefined(token)){
        token=req.cookies.token;
    }

    var locals={};
    mds.users.verifyJWT(token ,function(tkdata){
        
        //console.log( "cookies get::: " ,req.cookies ) ; //console.log( "cookiesSigned get ::: " ,req.signedCookies  ) ;      //console.log( "jwt info ::: " ,  tkdata )

        if (tkdata.status==="success"){
            if ( tkdata.data.rt_jwt_isAuth ){
                var userid=tkdata.data.userid ; 

                switch(cmd){
                    case "getUserDetail":
                        
                        mds.users.getGroupsFromUser(userid,function(grps){
                            ret_data.data.groups= grps;
                            
                            mds.users.getRolesFromGroups( grps , function(rles){ ///console.log("2 - ",u2)
                                ret_data.data.roles=rles;
                                res.jsonp(ret_data)

                            });

                        })       ;

                       

                        return;
                        break;
                    
                    case "getUserDetails":
                        //console.log( "checkUserAccessToProgram : " , mds.users.checkUserAccessToProgram("bob" , ["news" , "admingeneralpage"]))
                        /*
                        var isAllowed= mds.users.checkUserAccessToProgram(userid , ["news" , "admingeneralpage"])
                        
                        ret_data.data={ isAllowed : isAllowed };

                        res.jsonp(ret_data)
                        */
                        
                        mds.users.getGroupsFromUser(userid,function(grps){
                            ret_data.data.groups= grps;
                            
                            mds.users.fetchUserDetail(userid,function(usr){ 
                                //console.log(usr)
                                res.jsonp(ret_data)

                            });

                        })       ;

  
                        

                        return;
                        break;
                    case "getProgs":
                    case "getPrograms":
                        //var programs= mds.users.getProgramsFromRoles( mds.users.getRolesFromGroups( mds.users.getGroupsFromUser(userid) ) ) 

                        mds.users.getGroupsFromUser(userid,function(u1){ //console.log("1 - ",u1)
                            mds.users.getRolesFromGroups( u1 , function(u2){ ///console.log("2 - ",u2)
                                mds.users.getProgramsFromRoles( u2 , function(programs){ // console.log("3 - ",programs)
                                    ret_data.data=programs;

                                    res.jsonp(ret_data)
                                }) 

                            })

                        })
                        
                       
                        
                        return; 
                        break;
                    default:
                    

                }

            }
        }

        res.jsonp(ret_data)

    })    


})

/*
app.get("/login" ,function(req , res){
    //console.log( "cookies get::: " ,req.cookies )  
    //console.log( "cookiesSigned get ::: " ,req.signedCookies  ) 
        
    res.send("test")

})
*/

app.post("/logout",function(req,res){
    var ret_data={
        data : { loggedin : false  , auth : false },
        status : 0,
        error : ""
    }

    //cookies.set('token', {expires: Date.now()});
    // cookies.set('testtoken', {maxAge: 0});

    res.cookie('token',"",{ 
        maxAge : 0 , 
        httpOnly: true , 
    //    "secure" : true // force ssl 
    })

    res.jsonp(ret_data)
})

app.post("/login" ,function(req , res){
    //console.log( "cookies 1 ::: " ,req.cookies )  
    //console.log( "cookiesSigned 1 ::: " ,req.signedCookies  ) 
   
    loginUser( req.body , {req : req , res : res} , function(ret_data){
        //console.log( "---" ,ret_data)
        
        res.jsonp(ret_data)

    } )

})


debug_0["login"]={};
debug_0["login"]["token"]={}
debug_0["login"]["token"]["on"]=false;
debug_0["login"]["token"]["level"]=1;



var loginUser=function( params ){
    var cb=function(){}

    var fn1 = function(){}
    var reqres={}

    if (arguments.length >2 ){
        fn1=arguments[2]
    }
    if (arguments.length >1 ){
        reqres=arguments[1]
    }

    if (!_.isUndefined(fn1)){
        cb=fn1
    }

    var data={
        data : all_data.users,
        status : 0,
        error : ""
    }

    var data2=data;

    var ret_data={
        data : { loggedin : false  , auth : false },
        status : 0,
        error : "",
        sent_resposne : false
    }

    var bd=params; 

    
    //console.log("all users " , data.data)
     
    var login_confirmed=false;
    var found_userid=false
    mds.users.fetchUsersDetails( {} , function(data){
        if (_.isUndefined(data)){
            data=data2;
        }
        //console.log(data)
        if (!_.isUndefined(bd.userid)){

            if (!_.isUndefined(bd.password)){
                data.data.map(function(r,i){
                   
                    if (r.userid===bd.userid){
                        found_userid=true
                        if (debug_0["login"]["token"]["on"] ){
                            //console.log( "user auth1 : "," " , r.userid , " pass_db : " , r.password , " pass_inp body " , bd.password)
                        }
                        var trypass=r.password;
                        if (r.insecure_password!==""){
                            trypass=r.insecure_password;
                        }
                        if (trypass===bd.password){
                            login_confirmed=true;
                            ret_data.data.loggedin=true;
                            //console.log("logging in : " , r.userid )

                            
                            //process.env.ACCESS_TOKEN_SECRET , create an enviroment variable rather then store secret in this source file
                            jwt.sign({ userid : bd.userid } , $vserv.data.jwt_secret, jwtoptions  , function(err , newtoken){
                                //jwt.sign({ userid : bd.userid } , "secretwords", { expiresIn: 24 * 60 * 60}  , function(err , newtoken){
                                var curr_date=new Date()
                                if (err){
                                    console.log("error registoring user token " , err )
                                }else{
                                    var token=newtoken;
                                }
                                ret_data.data.auth=true
                                ret_data.data.token=token
                                //reqres.res.setHeader('Set-Cookie', cookie.serialize('foo', 'bar', { httpOnly: true }))
                                const oneDayToSeconds = 24 * 60 * 60;
                                
                                const expires=new Date(Number(new Date()) + cookieExpires) //10 * 365 * 24 * 60 * 60 * 1000 === 315360000000, or 10 years in milliseconds
                                reqres.res.cookie('token', token, { 
                                            //maxAge : oneDayToSeconds ,  // was ignoring this for some reason and expiring withing 5 minuts 
                                            expires : expires,
                                            httpOnly: true , 
                                    //    "secure" : true // force ssl 
                                    })
                                //console.log( "cookies ::: " ,reqres.req.cookies )  
                                //console.log( "cookiesSigned ::: " ,reqres.req.signedCookies  )
                                //console.log("---1" , ret_data)
                                mds.users.sessionUserUpdate({ userid : bd.userid, token : token , uuid :  r.uuid, curr_date : curr_date , cookie_exp_date : expires , jwtoptions },function(){
                                    //console.log("---3" )    
                                });
                                //console.log("---2" )
                                //if (!ret_data.sent_resposne){
                                    ret_data.sent_resposne=true
                                   cb(ret_data)
                                //}
                                return; 
                            })
                            
                            //return;
                        }else{
                            if (!ret_data.sent_resposne){
                                ret_data.sent_resposne=true
                                ret_data.error="bad userid or password"
                                cb(ret_data)
                            }
                        }
                    }
                })

                if (!login_confirmed){
                    if (!ret_data.sent_resposne){
                        ret_data.sent_resposne=true
                        cb(ret_data) 
                    }
                    return
                }
                if (!found_userid){
                    if (!ret_data.sent_resposne){
                        ret_data.sent_resposne=true
                        ret_data.error="bad userid or password"
                        cb(ret_data) 
                    }
                    return
                }
            }else{
                if (!ret_data.sent_resposne){
                    ret_data.sent_resposne=true
                    ret_data.error="password not entered"
                   cb(ret_data)
                }
            }
        }else{
            if (!ret_data.sent_resposne){
                ret_data.sent_resposne=true
                ret_data.error="userid not entered"
                cb(ret_data)
            }
        }
   
    })
    //console.log( req.body )
    //cb(ret_data)
    //return ret_data

}

app.post("/isAuth", mds.users.verifyJWTroute ,function(req,res){
    var ret_data={
        data : { loggedin : false  , auth : false },
        status : 0,
        error : ""
    }

    var auth=false;

    //console.log( "decID: " , res.locals.decodedID , " decodedtoken : " , res.locals.decoded ,  " , token : " ,res.locals.token  ," , is Auth : " ,res.locals.rt_jwt_isAuth )
                
    if ( res.locals.rt_jwt_isAuth ){
        if (res.locals.decoded.userid===req.body.userid){
            
            auth=true;
        }
        
    }

    if (auth){
        ret_data.data.loggedin = true ;
        ret_data.data.auth = true ;
    }

    res.jsonp( ret_data )

})


var uploads_db_temp={ 
    all : {}
}

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        //console.log("uploading gilename desitnation", req.vrtweb)
        var uploads_path=$vserv.data.uploads
        if (!_.isUndefined(req.vrtweb)){
            var vrtweb=req.vrtweb
            if (vrtweb.subfolder){
                if (vrtweb.subfolder!==""){
                    uploads_path=uploads_path + "/" + vrtweb.subfolder
                } 
            }
        }
        console.log(uploads_path)
        cb(null, uploads_path );
    },
    filename: (req, file, cb) => {
        //console.log("saving : " ,file);
        //cb(null, Date.now() + path.extname(file.originalname));
        //console.log("uploading gilename filename", req.body.extra , file)

        var newname=""
        newname=file.originalname

        var use_random=true;
        if (!_.isUndefined(req.vrtweb)){
            var vrtweb=req.vrtweb
            if (!_.isUndefined(vrtweb.newname_random)){
                
                use_random=vrtweb.newname_random
            
            }
        }
        if (use_random){
            newname=Date.now() + path.extname(file.originalname) 
        }
        
        //console.log("newname : ", newname)

        cb(null, newname);
    }
    // filters : // lookup in documentation , use to filter files out
});

//const upload = multer({ dest: '../data' });

const upload = multer({ storage: storage });

//app.post('/uploadfiles', upload.single('file'), function (req, res) {
app.post('/uploadfiles',  function (req, res) {
    const fileRows = [];
 
    var token=req.headers["x-auth-token"];
    if (!token || _.isUndefined(token)){
        token=req.cookies.token;
    }

    var locals={};
    mds.users.verifyJWT(token ,function(tkdata){
        
        //console.log( "cookies get::: " ,req.cookies ) ; //console.log( "cookiesSigned get ::: " ,req.signedCookies  ) ;      //console.log( "jwt info ::: " ,  tkdata )

        if (tkdata.status==="success"){
            if ( tkdata.data.rt_jwt_isAuth ){
                var userid=tkdata.data.userid ; 

                var vrtweb={  extra : req.body , userid : userid , newname : "", subfolder : "uploads_temp" , newpath : "" , cb_before : function(){} , memfile : {} } 
                
                
                _.each(uploadsApps.general,function(r2,propname){
                    
                })

                req.vrtweb=vrtweb // accessable by other multier funcitons but exlude req.body variables passed through as those can only be accessed after an upload is complete by the upload callback
                var runupload=upload.single('file')
                runupload(req,res,function(err){ // this callback will run on completion , unfortunately multier in most circumstances processes file upload before other posted vatiabls in body so need to do any changes after , so rather handle your upload as a temp file and make name changes after 
                    //console.log("csv uploading")
                    // open uploaded file
                    if (err){
                        console.log("upload error : ", err)
                        return
                    }

                    var extra={}
                    if (!_.isUndefined(req.body.extra)){
                        extra=JSON.parse(req.body.extra)
                    }                
                    var file={}
                    if (!_.isUndefined(req.file)){
                        file=req.file
                    }                    
                    var inobj={}
                    try {

                            //console.log("uploaded", req.body.extra)

                            res.status(201).json({
                                message: 'File uploded successfully'
                            })

                            uploads_db_temp.all[req.file.filename]={ file : file , extra : extra , name : file.filename, userid : userid , date : new Date() }

                            
                            var freg_path=$vserv.data.uploads + "/" + "filereg.json"

                            var fr_exists=false
                            fr_exists=$gl.file_exists_sync(freg_path)
                            
                            var newfreg=uploads_db_temp.all
                            
                            var run_custom_upload_cb=function(freg1){ 
                                if (!_.isUndefined(extra.type)){                                    
                                    _.each(uploadsApps.types,function(r2,propname){
                                        if (propname===extra.type){
                                            if (!_.isUndefined(r2.cb)){
                                                inobj={ fileid : req.file.filename, freg : freg,extra : extra , type : extra.type, file : file ,req : req ,res : res , vrtweb : vrtweb }
                                                r2.cb(inobj, function(cust_ret_data){

                                                })

                                            }
                                        }
                                    })
                                }
                            }
                            
                            if (fr_exists){ 
                                $gl.get_json_db( freg_path ,function(freg){
                                    var temp=_.merge(freg.all , newfreg )
                                    freg.all=temp;
                                    $gl.save_json_db( freg_path,freg,function(){
                                        run_custom_upload_cb(freg)
                                    })
                                })
                            }else{
                                var freg={ all : newfreg }

                                $gl.save_json_db( freg_path,freg,function(){
                                    run_custom_upload_cb(freg)
                                })
                            }

                            return ;
                    } catch (error) {
                        console.error(error);
                    }
                })
            }
        }
    })


    
});


app.post("/download",function(req,res){
    var bd=req.body;
    //console.log(bd)

    var token=req.headers["x-auth-token"];
    if (!token || _.isUndefined(token)){
        token=req.cookies.token;
    }

    var locals={};
    mds.users.verifyJWT(token ,function(tkdata){
        
        //console.log( "cookies get::: " ,req.cookies ) ; //console.log( "cookiesSigned get ::: " ,req.signedCookies  ) ;      //console.log( "jwt info ::: " ,  tkdata )
        //console.log(" --- " , uploads_db_temp)
        if (tkdata.status==="success"){
            if ( tkdata.data.rt_jwt_isAuth ){
                var userid=tkdata.data.userid ; 
                
                var freg_path=$vserv.data.uploads + "/" + "filereg.json"
                $gl.get_json_db( freg_path , function(fdata){
                    uploads_db_temp=fdata
                    if (!_.isUndefined(uploads_db_temp.all[bd.fileid])){
                        
                        var file=uploads_db_temp.all[bd.fileid]
                        console.log(file)

                        //to download
                        const fileout = file.file.path  
                        res.download(fileout);
                    }else{

                    }
                })
            }
        }
    })
})

