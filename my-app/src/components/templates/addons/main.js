import { useEffect, useState,Component} from "react"
import _ from "lodash";
import $gl from "../common/global";




var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();


function fetchSomething(){
    var args=arguments;

    var cb=function(){}
    
    var userid="";
    var password=""
    var loginFnType="login"

    if ( args.length > 0){
        if (_.isPlainObject(args[0])){
            if (!_.isUndefined(args[0].cb)){
                cb=args[0].cb
            }
            if (!_.isUndefined(args[0].userid)){
                userid=args[0].userid
            }
            
            if (!_.isUndefined(args[0].loginFnType)){
                loginFnType=args[0].loginFnType
            }
        }

        if (args.length > 1){
            cb=args[1];
        }
        if (_.isFunction(args[0]) ){
            cb=args[0]
        }
    }

    
    var fparams=new $gl.fetchPostCors();

    fparams.body=JSON.stringify( { type : "get"} );
    var url=protocall + "//" + host + ":" + port + "/something";
    
    fetch(url, fparams
    )
    .then(response => response.json())
    .then(data => {             
            cb(data);
    })


}

var testmain_count=0
export const tAestNewmodue=(props)=>{
    var style={}
    if (!_.isUndefined(props.style)){
        style=props.style
    }

    var [someval,setSomeval]=useState("somevalue123")

    useEffect(()=>{
        testmain_count++
        if (testmain_count===1){ // once off initialise
            // window["someGlobalVar"]={ "some1" : 1 } // set/reate some global variable 
        }

        return ()=>{/*unmount*/ }
    })

    var someFn=function(){
        var args=arguments
        alert("I've joined a click")
    }

    var label1=function(){
        return <label>testNewmodue</label>
    }()

    return (
        <div>
            {someval}
            <button
                onClick={someFn /*run a function */ }
            >
                {label1}
            </button>
        </div>
    )
}



class tAestNewmodue2obj extends Component {
    constructor(props) {
        super(props); // always needed in scontructer
        
        //console.log( props.value );
        
        var style={}
        if (props.style!==undefined){
            style=props.style;
        }

        this.state={  style : style , children : props.children , mainName : "noname" ,someval : "someval1"} 
  
    }

    componentDidMount(){
        //initialise
    }

    tt=this
    name="someName"
    someFn2=function(){
        var tt=this
        var args=arguments
        alert("I've joined a click")
        tt.name="123"
        tt.setState({maineName : tt.name})
    }

    render (){
        var tt=this
        var someFn=function(){
            var args=arguments
            alert("I've joined a click")
        }

        return (

            <div style={tt.state.style}>
                {tt.state.someval}
                <button
                    onClick={someFn /*run a function */ }
                >
                    Click Me
                </button>
                <button
                    onClick={ tt.someFn2 /*run a function */ }
                >
                    Click Me too
                </button>
                <button
                    onClick={ function(){tt.someFn2()} /*run a function */ }
                >
                    Click Me too
                </button>
                <br/>
                <div style={{background : "orange" ,width : 50, height : 50}}>
                
                </div>
                <br/>
                {tt.state.children}
            </div>
        )
    }
}

export const tAestNewmodue2=tAestNewmodue2obj