var initialState = {
    count:0,
    loggedin: false,
    register: false,
    theme : "dark",
    global:{}
}


const myReducer=function(state =initialState , action ){
    const newState={...state} //works for short function type ()=>{}
    //var newState=state;

    if ( action.type=== 'addval' ){
      newState.count=newState.count  + 2
    }

    if ( action.type=== 'login' ){
      newState.loggedin=true
    }
    if ( action.type=== 'register' ){
      newState.register=false
    }
    
    if ( action.type=== 'logout' ){
      newState.loggedin=false
    }
    if ( action.type=== 'themeChange' ){
      newState.theme=action.payload
    }
    if ( action.type=== 'globalChange' ){
      newState.global=action.payload
      console.log(action.payload)
    }

   
    return  newState;
}





export default myReducer;