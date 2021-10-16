import { useState , useEffect}  from 'react'
import { Link, Switch, Route , Redirect, useRouteMatch, useParams ,useHistory } from 'react-router-dom';
import history from "./routerHist"
import {connect} from 'react-redux'

import $gl from "./global"

var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();
// var url=protocall + "//" + host + ":" + port + "/users"; 

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


function Settings({ global , globalChange , theme ,themeChange}){

    var [themeval,changeThemeVal]=useState(theme)

    console.log( "themeval : " , themeval , theme)
    useEffect(()=>{
        console.log( "themeval UE : " , themeval , theme)
        changeThemeVal(theme)
    })
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
            
               


        </div>

    )

}


//export default Secondpage
export default connect(mapStateToProps, mapDispatchToProps)(Settings)