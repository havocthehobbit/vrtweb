  
import { useState , useEffect}  from 'react'
//SSimport  store  from './redux1/redux1'
import {connect} from 'react-redux'

import $gl from "./global" 
import _ from "lodash"


var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();

////////////////////
/*
considerations :
  data secuirity
  user privacy
  permitted access by getters to fetch certain info , 
    backend should curtail this from being a problem , constant reminders for devs to , 
    take this into mind with every change .
    
    
    queries to be logged for getters to analyse later , of what queries could and couldnt be answered as well as weight of answer acuracy user and guessed by context.


*/

/////////////////////////

const mapStateToProps = function(state , owsProps){
    return {
        global : state.global,
        loggedin : state.loggedin
    }
}
const mapDispatchToProps = function(dispatch){
  return {
    login : function(){  dispatch({ type : 'login'})  },
    logout : function(){  dispatch({ type : 'logout'})  },
    globalChange : function(indata){  dispatch({ type : 'globalChange' , payload : indata.payload })  }
    // some other reducer : function() { dispatch... }
  }
}





function SuggestBox({ global , globalChange}){
    //var routerHist=useHistory()
        var [goHome,setGoHome]=useState(false);



        useEffect(function(){
           
        },[])

        return(
            <div>
                <div>queries</div>
                <div>suggestions</div>
                <div>contexted</div>
  
                <div>
                </div>
  
            </div>
    )

}

    
function Assistant({ global , globalChange}){
    //var routerHist=useHistory()
        var [goHome,setGoHome]=useState(false);



        useEffect(function(){
           
        },[])

        return(
            <div style={{background:"black"}}>
                queries : <input type="input" />                
                context : <input type="selection" />
                <select type="selection"><option value="1">1</option><option value="2">2</option></select>
                <div>suggestions <div></div><div>123</div><div>2-123</div></div>
  
                <div>
                </div>
  
            </div>
    )

}

//export const connect(mapStateToProps, mapDispatchToProps)(SuggestBox) // cant do more then one component export default connect 
//export default Firstpage
//export default connect(mapStateToProps, mapDispatchToProps)(Assistant)

// workaround until I get to know other possibilities 
// thanks stack people : https://stackoverflow.com/questions/54272542/can-i-pass-multiple-components-within-connect-redux/54272626
export default {
                    SuggestBox : connect(mapStateToProps, mapDispatchToProps)(SuggestBox),
                    Assistant :  connect(mapStateToProps, mapDispatchToProps)(Assistant)
}
//usage
//import ComponentsAss from './assistant'
//const Assistant=ComponentsAss.Assistant
// <Assistant/>
