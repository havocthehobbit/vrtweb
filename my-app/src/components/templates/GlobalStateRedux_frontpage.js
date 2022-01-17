import { useEffect, useState,Component} from "react"
import _, { isArguments } from "lodash";
import $gl from "../common/global";
import Login ,{} from "../common/login";


import {connect} from 'react-redux'

const mapStateToProps = function(state , owsProps){
    return {       
        projectName : state.projectName,
        loggedin : state.loggedin,
        theme : state.theme
    }
}
 const mapDispatchToProps = function(dispatch){
  return {
    changeProjectName : function(indata){  dispatch({ type : 'changeProjectName',payload : indata.payload})  },
    login : function(){  dispatch({ type : 'login'})  },
    logout : function(){  dispatch({ type : 'logout'})  },
    // some other reducer : function() { dispatch... }
  }
}
// newProjName  dispatch ... projectName



var testmain_count=0
//export const Frontpage=(props)=>{
const FrontpageMain=function(props){ 
    
    useEffect(()=>{
        testmain_count++
        if (testmain_count===1){ // once off initialise
            // window["someGlobalVar"]={ "some1" : 1 } // set/reate some global variable 
        }

        return ()=>{/*unmount*/ }
    })

  
    var mainTextColor="white"
    if (props.theme){
        if (props.theme.theme==="dark"){
            mainTextColor="white"
        }else{
            mainTextColor="black"
        }
    }

    // to change the project name in any of the project web components
    // props.changeProjectName({ type : "changeProjectName" , payload : "abc" })

    return (
        <div style={{color : mainTextColor }}>
            
            <h2>Front Page - {props.projectName}</h2>
            <Login 
                style={{ width : 50,
                    position: "relative", top : 100}} 
                    theme={props.theme} 
                    namestuff={{ name : "frontpage stuff"}
                } 

                style_account={{ margin : 0,position : "relative", color : "green", height : 15 ,background : 10}}
                style_password={{ margin : 0,position : "relative", color : "green", height : 15 ,background : 10}}
            
            />
        </div>
    )
}

//export default connect(mapStateToProps, mapDispatchToProps)(Frontpage) // redux global state connector 
export const Frontpage =connect(mapStateToProps, mapDispatchToProps)(FrontpageMain) // redux global state connector 