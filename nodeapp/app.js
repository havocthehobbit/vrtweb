console.log(new Date())

var $gl = require("./l_node_modules/global.js").gl;

var express = $gl.mds.express
var app = express();
var http = $gl.mds.http.Server(app);

var fs = $gl.mds.fs;
var path =$gl.mds.path;

var _ = $gl.mds.lodash;

var cookieParser = $gl.mds.cookieParser;
//var cookie = require('cookie'); 

var csvparse = $gl.mds.csvparse

const multer = $gl.mds.multer;
var jwt = $gl.mds.jsonwebtoken;

var $test_data = require("./l_node_modules/test_data.js").test_data;
var lib_settings = require("./l_node_modules/global.js").settings;

var $vserv =new lib_settings()


app.use(cookieParser($vserv.data.cookieSecret));

app.use(express.json());		// no longer need body parser , its built into express now .
app.use(express.urlencoded({extended: true})); //Parse URL-encoded bodies

//var csv = require("csv");


var cors = $gl.mds.cors;
const { emitKeypressEvents } = $gl.mds.readline;
app.use( cors({origin: [
  /http/     // regular expression to allow any source server anything cause * is not allowed
], credentials: true} 
) );


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
mds=$gl.autoLoadModules(temp_DIR);
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
    mdsc=$gl.autoLoadModules(temp_DIR);
    mds=_.merge(mds, mdsc)
})


var reactbuildpath=__dirname + "/" + ".." + "/" +  "my-app" + "/" + "build"
var pub= path.resolve( reactbuildpath );

app.use(express.static('public'));

app.use(  express.static(pub ) );


////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////


var server = http.listen( $vserv.data.port , $vserv.data.host  , function () { 
    
    
      var host = server.address().address ;
      var port = server.address().port ;
    
      console.log("server is listening at http://%s:%s", host, port)
      console.log(reactbuildpath)
      console.log( `if react dev mode start with (my-app/startdev.sh): export REACT_APP_DEV_NODE_PORT=${port} ; npm start `)
      console.log(new Date())
});

////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////



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

// dynamic module routes 

//console.log ( "dynamic module : ",mds.kcs_mod.app )
var gl_bundle={ app : app,mds :mds , mdsfn : mdsfn , vserv : $vserv, pub : pub ,debug_0 }
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
})
// end of dynamic modules routes


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
                        mds.users.fetchUsersDetail(userid ,function(dta2){                            
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
                        mds.users.fetchUsersDetail(userid ,function(dta2){                            
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
                        mds.users.fetchUsersDetail(userid ,function(dta2){                            
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
                        mds.users.fetchUsersDetail(userid ,function(dta2){                            
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
                        
                        mds.users.fetchUsersDetail(userid ,function(dta2){                            
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
                                mds.users.fetchUsersDetailByUUIDSync(r.uuid ,function(dta2){
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
                                mds.users.fetchUsersDetailByUUIDSync(r.uuid ,function(dta2){
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

                                //mds.users.fetchUsersDetail(userid,function(usr){                                 
                                //});
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
                            
                            mds.users.fetchUsersDetails(userid,function(usr){ 
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





app.get("/login" ,function(req , res){
    //console.log( "cookies get::: " ,req.cookies )  
    //console.log( "cookiesSigned get ::: " ,req.signedCookies  ) 
        
    res.send("test")

})

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
    mds.users.fetchUsersDetails( {} , function(data){
        if (_.isUndefined(data)){
            data=data2;
        }
        //console.log(data)
        if (!_.isUndefined(bd.userid)){

            if (!_.isUndefined(bd.password)){
                data.data.map(function(r,i){
                   
                    if (r.userid===bd.userid){
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
                            jwt.sign({ userid : bd.userid } , $vserv.data.jwt_secret, { }  , function(err , newtoken){
                                //jwt.sign({ userid : bd.userid } , "secretwords", { expiresIn: 24 * 60 * 60}  , function(err , newtoken){
                            
                                if (err){
                                    console.log("error registoring user token " , err )
                                }else{
                                    var token=newtoken;
                                }
                                ret_data.data.auth=true
                                ret_data.data.token=token
                                //reqres.res.setHeader('Set-Cookie', cookie.serialize('foo', 'bar', { httpOnly: true }))
                                const oneDayToSeconds = 24 * 60 * 60;
                                
                                const expires=new Date(Number(new Date()) + 315360000000) //10 * 365 * 24 * 60 * 60 * 1000 === 315360000000, or 10 years in milliseconds
                                reqres.res.cookie('token', token, { 
                                            //maxAge : oneDayToSeconds ,  // was ignoring this for some reason and expiring withing 5 minuts 
                                            expires : expires,
                                            httpOnly: true , 
                                    //    "secure" : true // force ssl 
                                    })
                                //console.log( "cookies ::: " ,reqres.req.cookies )  
                                //console.log( "cookiesSigned ::: " ,reqres.req.signedCookies  )
                                //console.log("---1" , ret_data)
                                mds.users.sessionUserUpdate({ userid : bd.userid, token : token , uuid :  r.uuid},function(){
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
                                 //cb(ret_data)
                            }
                        }
                    }else{
                        if (!ret_data.sent_resposne){
                            ret_data.sent_resposne=true
                            //cb(ret_data) 
                        }
                    }
                })
            }else{
                if (!ret_data.sent_resposne){
                    ret_data.sent_resposne=true
                   //cb(ret_data)
                }
            }
        }else{
            if (!ret_data.sent_resposne){
                ret_data.sent_resposne=true
                //cb(ret_data)
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



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, '../data' );
    },
    filename: (req, file, cb) => {
        //console.log("saving : " ,file);
        //cb(null, Date.now() + path.extname(file.originalname));
        cb(null, file.originalname);
    }
});

//const upload = multer({ dest: '../data' });
const upload = multer({ storage: storage });

app.post('/csv', upload.single('file'), function (req, res) {
    const fileRows = [];
    //console.log("csv uploading")
    // open uploaded file

    ////req.file
    //console.log( "file " ,req.file)
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
    /*
    csv.fromPath(req.file.path)
      .on("data", function (data) {
        fileRows.push(data); // push each row
      })
      .on("error", function () {
          res.status(500).json({
              message: "Failed to upload file"
          });
      })
      .on("end", function () {
        console.log(fileRows)
        fs.unlinkSync(req.file.path);   // remove temp file
        

        //process "fileRows" and respond
        
         res.jsonp({
            message: "Upload Completed!"
         });
         
      })
      */
});

