import { useEffect, useState,Component} from "react"
import _ from "lodash";
import $gl from "../common/global";
import Login ,{} from "../common/login";



var testmain_count=0
export const Frontpage=(props)=>{
  

    useEffect(()=>{
        testmain_count++
        if (testmain_count===1){ // once off initialise
            // window["someGlobalVar"]={ "some1" : 1 } // set/reate some global variable 
        }

        return ()=>{/*unmount*/ }
    })

  

    return (
        <div>
            <Login/>

            {/* example of manipulating login screen or front page
                <h2>Front Page</h2>
                <Login 
                    style={{ width : 50,
                        position: "relative", top : 100}} 
                        theme={props.theme} 
                        namestuff={{ name : "frontpage stuff"}
                    } 

                    style_account={{ margin : 0,position : "relative", color : "green", height : 15 ,background : 10}}
                    style_password={{ margin : 0,position : "relative", color : "green", height : 15 ,background : 10}}
                
                />
            
            
            */}
        </div>
    )
}