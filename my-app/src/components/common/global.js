import _, { functionsIn } from "lodash";
import csvparse from "csv-parse"
import { v4 as uuidv4 } from 'uuid';




var cool_native={
    name : "cool_native",   
    fn : {},

    each : function(inst,cb){
        if (this.isObject){
            Object.keys(inst).forEach((v , p)=>{
                cb(inst[v] , v) 
            })
        }else{
            inst.forEach(function(v,i){ cb(v,i) })
        }


    },
    isObject : function(inp){
        var ret=false
        if (typeof(inp)==="object"){
            if (Array.isArray(inp)){
                ret=false
            }else{
                ret =true
            }

        }

        return ret
        
    },
    isUndefined : function(inp){
        var ret=false
        if (typeof  inp=== "undefined"){
            ret=true
        }
        return ret
    },
    isUn : function(inp){
       return this.isUndefined(inp)
    },
    typeof : function(inp){
        var t=typeof(inp)

        if (t==="object"){
            if (this.isObject()){
                t="object"

            }else{
                t="array"
            }
        }

        return t

    },

    init : function(){
        var args=arguments;
        var args_l=args.length;
        var param={ name : "" }

        this.l_this=this ;

        
      
    }
}
var $gl=cool_native


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
$gl.fetchCookie=getCookie;



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
$gl.setCookie=createCookie;
$gl.updateCookie=createCookie;

function eraseCookie(name) {
    createCookie(name,"",-1);
}
$gl.eraseCookie=eraseCookie;
$gl.deleteCookie=eraseCookie;

function cookie(){
    var args=arguments	
    var argsl=args.length

    if (argsl===1){
        return getCookie(args[0])
    }
    if (argsl===2){
        return createCookie(args[0],args[1])
    }
}
$gl.cookie=cookie;


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




var batchRunTimed=function(params, runitems_arr ,cb , cb_end){ // waterfall timed kick off
    /*
        // example of use : kicks off 3 at a time evert 3 seconds 
        batchRun( 
            {  count : 3,interval : 3000} , 
                custtest , 
                function(ret){
                    console.log( "running : ", new Date(), " - " ,ret)
                    return
                
                }, 
                function(){
                    console.log( "...done" )
                }
        )
    */


    var interval=5000
    var count=2
    var usetimout=true
    var arr_copy = JSON.parse(JSON.stringify(runitems_arr)) //workaround for non native deep copy arry options {...runitems_arr}
    var endcb_hasrun=false
    var waitfornext=false

    if (params.interval){
        interval=params.interval
    }
    if (params.count){
        count=params.count
    }
    if (params.usetimout){
        usetimout=params.usetimout
    }
    if (params.waitfornext){
        waitfornext=params.waitfornext
    }

    var total=runitems_arr.length
    var wI=0
    var run=true
    
    var cnt=0
    var recur= function(arr,count,cb){
        if (arr.length ===0){
            //cb_end()
            return
        }
        cnt++
        
        var next_hasrun=false
        var next=function(){
            arr.splice(0 , 1 )
            recur(arr, count, cb) 
            next_hasrun=true

            if (arr.length===0){   
                if (!endcb_hasrun){         
                    cb_end()
                    endcb_hasrun=true
                }    
            }

            return
        }

        var iter=0
        var totalcount=count
        var count_batch_subtotal=1
        var nxt={}
        while (iter < totalcount){
            if (arr.length===0){   
                if (!endcb_hasrun){         
                    cb_end()
                    endcb_hasrun=true
                }
                return
                break
                
            }
            count_batch_subtotal++
            nxt={ next : next , count_batch_subtotal : count_batch_subtotal ,arr_len : arr.length }

            cb(arr[0] , nxt)
            if ( waitfornext){
                return
            }
            arr.splice(0 , 1 )
            iter++
        }
        
        if ( !waitfornext){
            if (usetimout){
                setTimeout(
                    function(){
                        if (!next_hasrun){
                            recur(arr, count, cb) 
                        }
                    } 
                    , interval 
                )
            }else{
                if (!next_hasrun){
                    recur(arr, count, cb)
                }
                
            }
        }
            
        
        
    }
    var initRecfunction=function(arr , count,cb){
        
        recur(arr , count , cb)
    }
    /////////////////////////////////////
    initRecfunction(arr_copy , count , cb )
}
$gl.batchRunTimed=batchRunTimed


export default $gl;

