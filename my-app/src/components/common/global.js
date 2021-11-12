import _, { functionsIn } from "lodash";
import csvparse from "csv-parse"



var $gl={

    fn : {}

}

var csv_parse=function( csv ,fn1){
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

var fetchPostCors=function(){
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

export default $gl;

