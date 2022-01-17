


var gState={
    initialState : {
        projectName : "VRTWEB"

    },
    myReducer : function(newState,action){}
}

gState.myReducer=function(newState ,action){
    if ( action.type=== 'newProjName' ){
        newState.projectName=action.payload
    }
}

export const globalState=gState