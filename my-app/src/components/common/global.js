import _, { functionsIn } from "lodash";
import csvparse from "csv-parse"
import { v4 as uuidv4 } from 'uuid';


var $gl={

    fn : {}

}

$gl.ex=function(a){ // exists
   return !_.isUndefined(a)
}

$gl.buffStrtoString=function(a){
    return a.toString()
}

$gl.filterlines=function(text, searchstring,linesafter){
    var haslineAfter=false
    if (!_.isUndefined(linesafter)){
        haslineAfter=true
    }

    var textArray=text.split("\n")
    var newArr=[]
    var counfFound=0
    var foundfirst=-1

    _.each(textArray,function(v,i){
        var found=v.search(searchstring)

        if (counfFound>0){
           if (haslineAfter){
            found=1

           }                
        }
        if (found>0){
            if (counfFound===1){
                foundfirst=i
            }


           
            newArr.push(v)
            haslineAfter=true
            counfFound++
            if (counfFound>linesafter){haslineAfter=false}
            
        }

    })


   var newtext=""

    newtext=newArr.join( "\n")

    return newtext
}

$gl.filterlinesRange=function(text, searchstringFrom,searchstringTo){    

    var newArr=[]
    var counfFound=0
    var foundfirst=-1
 
    var rx=new RegExp( "(?<=" + searchstringFrom + "s*\).*?(?=\s*" + searchstringTo + ")" , "s")
    

   var newtext=""

   newtext=text.match(rx)

    console.log("test" ,newtext )

    return newtext
}

$gl.xmlparse=function(xmlString){
    var parser = new DOMParser();


    return parser.parseFromString(xmlString,"text/xml")
}


function xmlToJson(xml) {
   
    // Create the return object
    var obj = {};

    if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) == "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    var sanitiseRTrec=function(obj){
        var o=obj
        var parentnameiter="unknown"
        var parent={}
        if (arguments.length>1){
            parentnameiter=arguments[2]
            parent=arguments[1]
        }else{

        }
        _.each(o,function(r,p){
            if (_.isPlainObject(r)){


                sanitiseRTrec(r,o , p)

            }else if (_.isArray(r)){

                sanitiseRTrec(r,o,p)

            }else{
               
                if ( p==="#text"){
                    //console.log("#t")
                    var value=_.cloneDeep(r)                    
                    //delete parent["#text"]
                    parent["new"]=value
                }
            }

        })
        
    }

    // #todo #rt fix #text issue
    /*
    var sanitiseRT=function(obj){
        sanitiseRTrec(obj)
    }

    sanitiseRT(obj)
    */
   
    return obj;
}

$gl.xmlToJson=xmlToJson



function PasswordSimplGen(cb){
    var psw=""
     psw=Math.random().toString(36).slice(-8);
     
     setTimeout( function(){
 
             psw+=Math.random().toString(36).slice(-8);
              cb( psw )
     },2000 )
 
 
    
 
 }
 $gl.simpRandPass=PasswordSimplGen



 $gl.csv_parse=function( csv ,fn1){
    var cb=function(){}
    if (!_.isUndefined(fn1)){ 
        cb=fn1;
    }
    csvparse(csv.trim(), {
             columns: true
            }, function(err, records){               
                //console.log(records)
                cb(records)
            })
}




function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
$gl.getCookie=getCookie;


function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
        var expires = "; expires=" + date.toGMTString();
    } else {
        var expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
$gl.createCookie=createCookie;

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') {
            c = c.substring(1,c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length,c.length);
        }
    }
    return null;
}
$gl.readCookie=readCookie;

function eraseCookie(name) {
    createCookie(name,"",-1);
}
$gl.eraseCookie=eraseCookie;

var fetchPostCors=function(params){
        
        var obj={        
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify({}), //JSON.stringify({ "userid" : userid }),
                    headers: {
                        //'x-auth-token': getCookie("token"),
                        'Access-Control-Allow-Origin':'*',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }          
                    
        }
        

        if (!_.isUndefined( params)){
            if (_.isPlainObject(params)){

            }else{
                if (params==="upload"){
                    delete obj.headers.Accept
                    delete obj.headers["Content-Type"]
                }
            }

        }
    
    return obj    
}
$gl.fetchPostCors=fetchPostCors;


var getHost=()=>{
    var url= window.document.createElement('a');
    url.setAttribute('href', window.location.href)
    var host=url.hostname;
    var port=url.port;
    return host;
}

$gl.fn.getHost=getHost;


var getPort=()=>{
    var url= window.document.createElement('a');
    url.setAttribute('href', window.location.href)
    var host=url.hostname;
    var port=url.port;
    if (process.env.NODE_ENV !== 'production') {
      port=window["node_port"];
    }
    
    if (_.isUndefined(port)){
        //port=3001
    }

    return port;
}

$gl.fn.getPort=getPort;


var getProtocall=()=>{
    return window.location.protocol;
}
$gl.fn.getProtocall=getProtocall;

// node port during development // create a global variable
if (process.env.NODE_ENV !== 'production') { 
    window["node_port"]=process.env["REACT_APP_DEV_NODE_PORT"]; // #BE # export REACT_APP_DEV_NODE_PORT=3018 npm start    
}

$gl.host=getHost();
$gl.port=getPort()
$gl.protocall=getProtocall();
$gl.url=$gl.protocall + "//" + $gl.host + ":" + $gl.port ;

var fetchPerms=function(){
    var cb=()=>{};        

    var args=arguments;
    if ( args.length > 0){
        if (_.isPlainObject(args[0])){
            if (!_.isUndefined(args[0].cb)){
                cb=args[0].cb
            }
            
        }else{
            if (_.isFunction(args[0])){
                cb=args[0];
            }                
            if (_.isString(args[0])){
       
            }        
            if (_.isArray(args[0])){
       
            }
    
        }           

        if (args.length > 1){
            cb=args[1];
        }
    }

    var fparams=new $gl.fetchPostCors();

    fparams.body=JSON.stringify( { "cmd" : "getProgs" } );
    var url=$gl.protocall + "//" + $gl.host + ":" + $gl.port + "/users";

    fetch(url, fparams
    )
    .then(response => response.json())
    .then(data => {             
            cb(data);
    }).catch(function(err){
        cb({},{err : err});
    })


  
}

$gl.fetchPerms=fetchPerms;


var getUserDetail=function(){
    var cb=()=>{};        

    var args=arguments;
    if ( args.length > 0){
        if (_.isPlainObject(args[0])){
            if (!_.isUndefined(args[0].cb)){
                cb=args[0].cb
            }
            
        }else{
            if (_.isFunction(args[0])){
                cb=args[0];
            }                
            if (_.isString(args[0])){
       
            }        
            if (_.isArray(args[0])){
       
            }
    
        }           

        if (args.length > 1){
            cb=args[1];
        }
    }

    var fparams=new $gl.fetchPostCors();

    fparams.body=JSON.stringify( { "cmd" : "getUserDetail" } );
    var url=$gl.protocall + "//" + $gl.host + ":" + $gl.port + "/users";

    fetch(url, fparams
    )
    .then(response => response.json())
    .then(data => { 
            cb(data);
    })


  
}

$gl.getUserDetail=getUserDetail;

$gl.uuid=uuidv4



$gl,jsfile={ 
    auto_run : function(params){  
              
    },
    run_after_init : function(params){ // params : { http: http , io : io} // io = socket.io 
      
    },
    schema : {
        links :{},
        dbs : {
            db1 : {
                name : "db1" ,
                path : "",
                type : "jsonfile",
                schema : {
                    users : {
                        tbname : "users",
                        idxmain : "userid",
                        index : {
                            userid : [
                                { name : "userid" }
                            ],
                            uuid : [
                                { name : "uuid" }
                            ],
                        },
                        tblinks :{

                        },
                        cols : [

                        ]
                    },
                    calendar_events : {
                        tbname : "calendar_events",
                        dxmain : "uuid_type",
                        index : {
                            uuid_type : [
                                { name : "type" },
                                { name : "uuid" }
                            ]
                        },
                        tblinks :{

                        },
                        cols : [

                        ]
                    },
                    news : {
                        tbname : "news",
                        idxmain : "uuid",
                        index : {
                            uuid : [                                       
                                { name : "uuid" }
                            ]
                        },
                        tblinks :{

                        },
                        cols : [

                        ]
                    },
                }
            }
        }
    },
    get : function(jsonfilepath ,cb){
        var tt=this;
      
           
        $gl.get_json_db(   jsonfilepath  , function(alldata){
            
            cb(alldata)
        })
    },
    getQuery : function(query,data ,cb){
        var q=query
        var hasPath=false
        var path=[]
        var andMain=false
        var orMain=false
        if (_.isPlainObject(query)){

            if (_.isUndefined(q.path)){
                hasPath=true
                path=q.path
            }

            if (_.isUndefined(q.and)){
                andMainB=true
                andMain=q.and
                
            }
            if (_.isUndefined(q.or)){
                orMainB=true
                orMain=q.or
            }

        }

        if (andMainB){
            
        }


        cb()
    },
    getBySchema : function(params , cb){ // { searchvalas/f/s : { "prop" : "val"} , db : "" , tb : "" , idx : ""}
        var tt=this

        var searchval
        if ( !_.isUndefined(params.searchval)){
            searchval=params.searchval
        }                
        if ( !_.isUndefined(params.s)){
            searchval=params.s
        }
        if ( !_.isUndefined(params.f)){
            searchval=params.f
        }

        var db="db1"
        if ( !_.isUndefined(params.db)){
            db=params.db
        }

        var dbschema={}
        if (!_.isUndefined(tt.schema.dbs[db])){
            dbschema=tt.schema.dbs[db]
        }
        if (!_.isUndefined(params.dbschema)){
            dbschema=params.dbschema
        }

        var idx=""
        if ( !_.isUndefined(params.idx)){
            idx=params.idx
        }

        var tb=""
        if ( !_.isUndefined(params.tb)){
            tb=params.tb
        }
        if ( !_.isUndefined(params.table)){
            tb=params.table
        }

        var data=""
        if ( !_.isUndefined(params.data)){
            data=params.data
        }


        if (idx===""){
            //check if main
            if ( !_.isUndefined(dbschema[tb].idxmain)){
                idx=dbschema[tb].idxmain
            }
        }


        var foundtotal=0;
        getSimple( tt.schema.path + "/" + tb + ".json", data,

            function(tabledata ,cb_g){ 
                var results=[]
                tabledata.all.forEach(function(r1,r2){ 
                    
                    var foundcount=0;
                    var foundlen=dbschema[tb]["index"][idx].length;
                    _.each( dbschema[tb]["index"][idx], function(r,i){
                        if (r1[r.name]===searchval[r.name]){
                            foundcount++

                            if (foundcount===foundlen){
                                foundtotal++
                                results.push(r1)
                                
                            }
                        }
                    })
                })

                cb_g({ foundtotal : foundtotal, rows : results })
            },
            function(){ cb() }

        ) 


    },
    getSimple : function(jsonfilepath, new_data ,change_cb,cb){
        var tt=this;

        tt.getSimpleAll(function(alldata){
            change_cb( alldata, function(changedData){
               
                    if (_.isFunction(cb)){
                        cb({}) // done
                    }                        
            })

        })                
    },
    getSimpleAll : function(jsonfilepath,cb){
        var tt=this;
       
           
        $gl.get_json_db(   jsonfilepath  , function(alldata){
            
            cb(alldata)
        })
    },
    update : function(jsonfilepath  , new_data,cb){


        
    },
    updateSimple : function(jsonfilepath, new_data ,change_cb,cb){
        var tt=this;

        tt.getSimpleAll(function(alldata){

            change_cb( alldata, function(changedData){
                $gl.save_json_db(t.jsonfilepath  , changedData , function(){
                    if (_.isFunction(cb)){
                        cb({}) // done
                    }
                    

                })
            })

        })                
    }
    ,
    upsert : function(){

    },
    insert : function(){

    },
    delete : function(){

    },
    delete : function(){
        //splice( iter , numberOfDels1) // delete if parent is a object
    },
    tableExist : function(){

    }

}



export default $gl;

