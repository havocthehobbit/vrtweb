  
import { useState , useEffect}  from 'react'
import {connect} from 'react-redux'

import $gl from "./global" 
import _ from "lodash"


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
    
    var url=$gl.url + "/isAuth"; 
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
        } ).catch(error => {
            cb({}, { err : error});
            //console.log(error);
        })

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
    
    var url=$gl.url + "/logout"; 
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
        }).catch(error => {
            alert(error);
        })
    



}

function Login({loggedin , login , logout , addval}){
    var [userinp,setUserinp]=useState($gl.getCookie("userid"))
    var [passinp,setPassinp]=useState("")
    
    var props=arguments[0]

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
            
            var url=$gl.url + "/login"; 
            fetch(url , {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                body: JSON.stringify(
                    { "userid" : userid, password : password , "loginFnType" : loginFnType }
                ),
                headers: {
                    //'x-auth-token': getCookie("token"),
                    'Access-Control-Allow-Origin':'*',
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'                
                }
              })
                .then(response => response.json())
                .then(data => {                     
                    cb(data);
                }).catch(error => {
                    console.log(error,error.message);
                })            
       
    }

    var setpassfocus=true;
    if (userinp==="" || _.isUndefined(userinp) ){
        setpassfocus=false
    }

    var style={}
    if (props.style){
        style=props.style
    }

    var style_account={}
    if (props.style_account){
        style_account=props.style_account
    }

    var style_account_label={}
    if (props.style_account_label){
        style_account_label=props.style_account_label
    }

    var account_label="userid/email"
    if (props.account_label){
        account_label=props.account_label
    }

    var style_password={}
    if (props.style_password){
        style_password=props.style_password
    }

    var style_password_label={}
    if (props.style_password_label){
        style_password_label=props.style_password_label
    }

    var password_label="password"
    if (props.password_label){
        password_label=props.password_label
    }


    var style_button={}
    if (props.button){
        style_button=props.button
    }

    var button_label="login"
    if (props.button_label){
        button_label=props.button_label
    }

    return (
        <div style={style} >
            <label style={style_account_label}>{account_label}</label>
            <input  style={style_account} 
                    type='input' value={userinp}
                    onChange={
                        function(e){
                            setUserinp(e.target.value )
                        }
                    }
            />
            <label style={style_password_label}>{password_label}</label>
            <input  style={style_password} 
                    type='password' 
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
                                        $gl.createCookie("userid" , userinp)                                        
                                        login({"type" : "login"})                                                
                                    }
                                   
                                })
                            }
                        }
                    }
            />
            <input style={style_button} 
                    value={button_label}
                    type='button'  onClick={
                        function(){
                            loginUser( { userid : userinp, password : passinp} , function(dt){
                                
                                if (dt.data.loggedin===true){
                                    var token=dt.data.token;                                                
                                    $gl.createCookie("userid" , userinp)                                                
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