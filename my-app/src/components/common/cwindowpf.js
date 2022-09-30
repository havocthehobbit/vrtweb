//import {useState , useEffect} from "react"
import _ from "lodash"

var CWindowPF=function(title,child1, param0){
    
    var params={ styles : {} ,minme :false,remMin :false,name : " ", parent : undefined}
    if (_.isUndefined(param0)){
        param0={}
    }
    var temp_param=_.merge(params, param0)
    params=temp_param;
    var pm=params;
 
    var styles={
            
        background : "lightgrey", color : "white", border : "solid thin grey" , borderRadius : 3,width : undefined ,height : undefined,margin :0 ,padding : 0,
        backgroundTitle :"grey"  , colorTitle : "white",borderTitle : "solid thin grey" , borderRadiusTitle : 3,displayTitle : "block",marginTitle : 2,
        backgroundCloseButton :"red"  , colorCloseButton : "white",borderCloseButton : "" , borderRadiusCloseButton : 2,displayCloseButton : "none",
        backgroundMain : "black", colorMain : "white",borderMain : "solid thin grey" , borderRadiusMain : 3,overflowMain : undefined,marginMain : 2,widthMain : undefined ,heightMain : undefined
    }
    if (!_.isEmpty(styles)){
        _.merge( styles, params.styles)
    }

    var updatemyState=function(){
        var CW=_.clone(pm.parent.state.CWindowPF);
        var exists=false;
        if ( !_.isUndefined(CW[pm.name])){            
            exists=true;
        }
        if (exists){

        }else{
            CW[pm.name]=false;        
        }

        CW[pm.name]=!pm.name
        pm.parent.setState({ CWindowPF : CW })
    }
    

    var displayMainCSS="block"
    var minme=params.minme

    if (minme){ 
        displayMainCSS="none"
    }



    return (
        
            <div
                style={{ position : "relative",background : styles.background,border : styles.border , borderRadius: styles.borderRadius ,width :styles.width, margin : styles.margin, height : styles.height,
                padding : styles.padding 
            } }
            >
              
                <div
                    style={{ position : "relative",background : styles.backgroundTitle,margin : styles.marginTitle, borderRadius: styles.borderRadiusTitle ,
                            cursor : "pointer"
                            }}
                    onClick={
                        function(){
                            /*
                            if (tt.state.remMin){
                                if (tt.state.name!==""){
                                    $gl.createCookie("remMin_" + tt.state.name,  !tt.state.minme)
                                }
                            }
                            */
                            //tt.remmeInitialised=true;
                            //tt.setState({ minme : !tt.state.minme } )
                            var newval=!minme
                            minme=newval;
                            updatemyState()
                            //setMinme( !minme  )
                        }
                    }
                >
                    {/* topbuttons1 */}
                    {title}
                </div>
                <div
                    style={{ display : displayMainCSS , background : styles.backgroundMain , margin : styles.marginMain,border : styles.borderMain, 
                        borderRadius: styles.borderRadiusMain ,overflow : styles.overflowMain
                    }}                    
                >
                    {child1}
                </div>
            </div>

        
    )

}

export default CWindowPF