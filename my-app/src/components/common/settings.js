import { useState , useEffect}  from 'react'
import { Link, Switch, Route , Redirect, useRouteMatch, useParams ,useHistory } from 'react-router-dom';
import history from "./routerHist"
import {connect} from 'react-redux'
import _ from "lodash";

import $gl from "./global"

var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();
var url=protocall + "//" + host + ":" + port ;

const mapStateToProps = function(state , owsProps){    
    return {
        global : state.global,
        loggedin : state.loggedin,
        theme : state.theme
    }
}

const mapDispatchToProps = function(dispatch){
  return {
    login : function(){  dispatch({ type : 'login'})  },
    logout : function(){  dispatch({ type : 'logout'})  },
    themeChange : function(indata){  dispatch({ type : 'themeChange' , payload : indata.payload })  },
    globalChange : function(indata){  dispatch({ type : 'globalChange' , payload : indata.payload })  }
    // some other reducer : function() { dispatch... }
  }
}

var testmain_count=0
function Settings({ global , globalChange , theme ,themeChange}){

    var [themeval,changeThemeVal]=useState(theme)
    var [fpImage,setFPImage]=useState("")

    //console.log( "themeval : " , themeval , theme)

    
    useEffect(()=>{
        //console.log( "themeval UE : " , themeval , theme)
        changeThemeVal(theme)

        testmain_count++
        if (testmain_count===1){

        }
    })

    var getData=(cb)=>{
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
          obj.body=JSON.stringify( { type : "get"} );
          //fetch("http://172.17.240.212:3001" + "/rn1",obj)
          fetch(url + "/settings",obj)
            .then(response => response.json())
            .then(data => {             
                    cb(data);
            }).catch(function(err){
                cb({},{err : err});
            })
    }

    var setData=(cb)=>{
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
          obj.body=JSON.stringify( { type : "update", data : settingsChanges} );
          //fetch("http://172.17.240.212:3001" + "/rn1",obj)
          fetch(url + "/settings",obj)
            .then(response => response.json())
            .then(data => {             
                    cb(data);
            }).catch(function(err){
                cb({},{err : err});
            })
    }

    var saveSettings=function(){
        setData(function(){

        })
    }

    var settingsChanges={}

    if (!_.isEmpty(fpImage)){
        settingsChanges.hasLoginPic=true
        settingsChanges.loginPic=fpImage

    }else{
        settingsChanges.hasLoginPic=false
        settingsChanges.loginPic=""
    }


    

    return(
        <div>
            <h3>Settings</h3>
            <input  type="button" defaultValue="theme change" 
                    onClick={function(){
                    if (theme==="light"){
                        themeChange({type : "themeChange" , payload: "dark" } )
                    }else{
                        themeChange({type : "themeChange" , payload: "light" } )
                    }
                    
            }} />
            <input type="input" value={theme}
                onChange={function(e){
                    //changeThemeVal(e.target.value )
                    //changeThemeVal(theme)                   
                }}
            />
            <br/>
            <br/>
            <div>
                <label>login page</label>
                <br/>
                <div>front page image</div>
                <div>
                    <input 
                        value={fpImage}
                        onChange={
                            function(e){
                                var nv=e.target.value
                                setFPImage(nv)
                            }
                        }
                    />

                </div>
            </div>
            

            <br/>
            <br/>
            
               

            <button
                onClick={
                    function(){
                        saveSettings()
                    }
                }
            >save
            </button>


        </div>

    )

}


//export default Secondpage
export default connect(mapStateToProps, mapDispatchToProps)(Settings)