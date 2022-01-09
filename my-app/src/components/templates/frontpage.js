import { useEffect, useState,Component} from "react"
import _ from "lodash";
import $gl from "../common/global";




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
        </div>
    )
}