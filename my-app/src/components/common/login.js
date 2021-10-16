  
import { useState , useEffect}  from 'react'
import {connect} from 'react-redux'

import $gl from "./global" 
import _ from "lodash"


var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();

const mapStateToProps = function(state , owsProps){
    return {
        count : state.count,
        loggedin : state.loggedin
    }
}
 const mapDispatchToProps = function(dispatch){
  return {
    login : function(){  dispatch({ type : 'login'})  },
    logout : function(){  dispatch({ type : 'logout'})  },
    addval : function(){  dispatch({ type : 'addval'})  }
    // some other reducer : function() { dispatch... }
  }
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}

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

function eraseCookie(name) {
    createCookie(name,"",-1);
}

export const isAuth=function(){

    var args=arguments;

    var cb=function(){}
    
    var userid="";
    var password=""
    var loginFnType="login"

    if ( args.length > 0){
        if (_.isPlainObject(args[0])){
            if (!_.isUndefined(args[0].cb)){
                cb=args[0].cb
            }
            if (!_.isUndefined(args[0].userid)){
                userid=args[0].userid
            }
            if (!_.isUndefined(args[0].password)){
                password=args[0].password
            }
            if (!_.isUndefined(args[0].loginFnType)){
                loginFnType=args[0].loginFnType
            }
        }

        if (args.length > 1){
            cb=args[1];
        }
    }
    
    var url=protocall + "//" + host + ":" + port + "/isAuth"; 
    fetch(url, {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(
           { "userid" : userid }
        ),
        headers: {            
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => { 
            cb(data);
        } )

}

export const logout=function(){

    var args=arguments;

    var cb=function(){}
    
    var userid="";
    var password=""
    var loginFnType="login"

    if ( args.length > 0){
        if (_.isPlainObject(args[0])){
            if (!_.isUndefined(args[0].cb)){
                cb=args[0].cb
            }
            if (!_.isUndefined(args[0].userid)){
                userid=args[0].userid
            }
            
            if (!_.isUndefined(args[0].loginFnType)){
                loginFnType=args[0].loginFnType
            }
        }

        if (args.length > 1){
            cb=args[1];
        }
    }
    
    var url=protocall + "//" + host + ":" + port + "/logout"; 
    fetch(url , {
        method: 'POST',
        mode: 'cors',
        credentials: 'include',
        body: JSON.stringify(
            { "userid" : userid }
        ),
        headers: {            
            'Access-Control-Allow-Origin':'*',
            'Accept': 'application/json',
            'Content-Type': 'application/json'            
        }
      })
        .then(response => response.json())
        .then(data => { 
            cb(data);
        })
    



}

function Login({loggedin , login , logout , addval}){
    var [userinp,setUserinp]=useState(getCookie("userid"))
    var [passinp,setPassinp]=useState("")
    
    useEffect(function(){       

    },[])

    var loginUser=function(){

            var args=arguments;

            var cb=function(){}
            
            var userid="";
            var password=""
            var loginFnType="login"

            if ( args.length > 0){
                if (_.isPlainObject(args[0])){
                    if (!_.isUndefined(args[0].cb)){
                        cb=args[0].cb
                    }
                    if (!_.isUndefined(args[0].userid)){
                        userid=args[0].userid
                    }
                    if (!_.isUndefined(args[0].password)){
                        password=args[0].password
                    }
                    if (!_.isUndefined(args[0].loginFnType)){
                        loginFnType=args[0].loginFnType
                    }
                }

                if (args.length > 1){
                    cb=args[1];
                }
            }
            
            var url=protocall + "//" + host + ":" + port + "/login"; 
            fetch(url , {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(
                    { "userid" : userid, password : password , "loginFnType" : loginFnType }
                ),
                headers: {
                    'x-auth-token': getCookie("token"),
                    'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'                
                }
              })
                .then(response => response.json())
                .then(data => {                     
                    cb(data);
                })            
       
    }

    var setpassfocus=true;
    if (userinp==="" || _.isUndefined(userinp) ){
        setpassfocus=false
    }

   

    return (
        <div>
            <label>userid/email</label>
            <input  type='input' value={userinp}
                    onChange={
                        function(e){
                            setUserinp(e.target.value )
                        }
                    }
            />
            <label>password</label>
            <input  type='password' 
                    autoFocus
                    onChange={
                        function(e){
                            setPassinp(e.target.value )
                        }
                    }
                    onKeyUp={
                        function(e){
                            if(e.key==="Enter"){
                                loginUser( { userid : userinp, password : passinp} , function(dt){                              
                                    if (dt.data.loggedin===true){
                                        var token=dt.data.token;                                        
                                        createCookie("userid" , userinp)                                        
                                        login({"type" : "login"})                                                
                                    }
                                   
                                })
                            }
                        }
                    }
            />
            <input value='login' type='button'  onClick={
                                    function(){
                                        loginUser( { userid : userinp, password : passinp} , function(dt){
                                            console.log(dt)
                                            if (dt.data.loggedin===true){
                                                var token=dt.data.token;                                                
                                                createCookie("userid" , userinp)                                                
                                                login({"type" : "login"})                                                
                                            }
                                           
                                        })
                                    }
                                } 
            
            />           

        </div>

    )

}

//export default Login // standard without redux
export default connect(mapStateToProps, mapDispatchToProps)(Login)