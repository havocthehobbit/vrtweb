  
import { useState , useEffect}  from 'react'
import {connect} from 'react-redux'

const mapStateToProps = function(state , owsProps){
  return {
    count : state.count
  }
}
 const mapDispatchToProps = function(dispatch){
  return {
    addval : function(){  dispatch({ type : 'addval'})  }
    // some other reducer : function() { dispatch... }
  }
}


function Main() {    
    var [count, setCount] = useState(0);
    var [inpval, setInpval] = useState("");

    useEffect(function(){ // same as didMount in a class , and return is same as did unmount     
      
      return function(){
          
      }
    })

    return (
      <div >           
          <h3>
            testing main { function(){ return count}()}
          </h3>
          {inpval}<br/>
          <input onChange={
                          function(e){
                            setInpval(e.target.value);
                          }
          } />
          <input  type='button' value='add'
                  onClick={
                          function(){
                            setCount(count + 1)                            
                          }
                  }
          />         
      </div> 
    );
  }

//export default Main;
export default connect(mapStateToProps, mapDispatchToProps)(Main);