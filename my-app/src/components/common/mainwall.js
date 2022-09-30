import '../../App.css';
import '../../css_general/general.css';

import {useState , useEffect} from "react"
import {connect} from 'react-redux'
import _ from "lodash"
import $gl from "./global"

import OutOfOffice from "./outofoffice";
import Projects from "./projects";
import Notes from "./notes";

//import ComponentsAss from './assistant'

import socketIOClient from "socket.io-client";

//const Assistant=ComponentsAss.Assistant

var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();

const socketioENDPOINT = protocall + "//" + host + ":" + port;


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
    globalChange : function(){  dispatch({ type : 'globalChange'})  }
    // some other reducer : function() { dispatch... }
  }
}

function fetchNews(){
    var args=arguments;

    var cb=function(){}
    
    //var userid="";
    //var password=""
    //var loginFnType="login"

    if ( args.length > 0){
        if (_.isPlainObject(args[0])){
            if (!_.isUndefined(args[0].cb)){
                cb=args[0].cb
            }
            if (!_.isUndefined(args[0].userid)){
                //userid=args[0].userid
            }
            
            if (!_.isUndefined(args[0].loginFnType)){
                //loginFnType=args[0].loginFnType
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
    var url=protocall + "//" + host + ":" + port + "/news";
    
    fetch(url, fparams
    )
    .then(response => response.json())
    .then(data => {             
            cb(data);
    })


}

function fetchAddNews(){
    var args=arguments;

    var cb=function(){}
    
    var title="";
    var detail=""
    
    if ( args.length > 0){
        if (_.isPlainObject(args[0])){
            if (!_.isUndefined(args[0].cb)){
                cb=args[0].cb
            }
            if (!_.isUndefined(args[0].title)){
                title=args[0].title
            }
            
            if (!_.isUndefined(args[0].detail)){
                detail=args[0].detail
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

    fparams.body=JSON.stringify( { type : "add" , data : { title : title ,  type : "news" , detail : detail  , groups : [""]  } } );
    var url=protocall + "//" + host + ":" + port + "/news";

    fetch(url, fparams
    )
    .then(response => response.json())
    .then(data => { 
            cb(data);
    })


}

var newsarr=[]

export const AddNews=function(){
    var [ title , setTitle]=useState()
    var [ detail , setDetail]=useState()

    return (
        <div style={{ background: "lightgrey", border : "thin solid grey"}}>
            <h3>New Article</h3>
            <input  type="button" 
                    value="create"
                    onClick={function(){
                            fetchAddNews( { title : title , detail : detail },function(){

                            })
                        }
                    }
            />
            <br/>
            <label>title</label>
            <input  value={title}
                    onChange={function(e){
                                setTitle(e.target.value)
                            }
                    }  
            />            
            <br/>
            <label>detail</label>
            <br/>
            <textarea   value={detail}
                        style={{ width : 400 , height : 200 }}
                        onChange={function(e){
                                setDetail(e.target.value)
                            }
                        }   

            ></textarea>
        </div>
    )
}

var initCountMainWall=0;
function Mainwall({ global , globalChange}){

    var [newsout ,newsoutSet]=useState([])    
    var [showAddNews ,setShowAddNews]=useState(false)
    var [canAddNews ,setCanAddNews]=useState(false)

    var [socketIOresponse ,setSocketIOresponse]=useState("")
    
    if (newsout){};if (socketIOresponse){};
    useEffect(() => {
        initCountMainWall++
       
        if (initCountMainWall===1){
            fetchNews(function(ret){
                newsarr=ret.data
                
                newsoutSet(newsarr); 
                
                $gl.fetchPerms(function(perms){                
                    _.each(perms.data,(val, prop)=>{
                        if (prop==="newsedit"){
                            setCanAddNews(true);
                        }
                        return true
                    })
                })
            })

       
            const socket = socketIOClient(socketioENDPOINT,{
                withCredentials: true,
                //extraHeaders: {
                //    'Access-Control-Allow-Origin':'*',
                //    'Accept': 'application/json',
                //    'Content-Type': 'application/json'
                //}
            });
            socket.on("FromAPI", data => {
                //console.log("socket from Backend : " , data)
                
                setSocketIOresponse(data);
                
            });
        }

        return () => {
            //cleanup
        };
    },[]);

    var news1fn=function(){
        var eArr=[]
        
        if  (newsarr.length > 0){
            newsarr.slice(0).reverse().map(function( val , i){ //copy and iterate in reverse 
                eArr.push( 
                            <div key={i} datauid={val.uuid}
                                style={{ background : "lightgrey" , color : "black"
                                         ,borderRadius : 3, padding : 3 , margin : 1
                                    }}

                            >
                                <div style={{ width : 510}} 
                                        datauid={val.uuid}
                                        onClick={function(e){
                                            var uuid=e.target.getAttribute('datauid')
                                            console.log("clicked " , uuid)
                                        }}
                                >{val.title}</div>
                                                                
                            </div>
                        )
                        return 0
            })
        }else{
            eArr.push(<div key="9999" >loading...news data</div>)
        }

        return(
            <div>
                {eArr}
                
            </div>
        )
    }

    var news1=news1fn();
  
    var addNewsButton=function(){
        if (!canAddNews){
            return 
        }

        return (
            <div>
                <button  type="button" 
                        style={{ height : 20,width : 35, fontSize : 14 ,margin : 2,padding : 3}}
                        onClick={
                            function(){
                                setShowAddNews(!showAddNews)
                            }
                        } 
                >add</button>
            </div>
        )
    }
    
    var addNew=function(){
        var addn=(<span />)
        if (showAddNews){
            addn=(<AddNews/>)
        }
        return addn 
    }
    

    return(
        <div>
                
                { 
                        /*
                        <h3>MainWall</h3>            
                        */
                    }

                <div style={{float : "left", width :600 ,position : "relative", background :undefined }}>
                    <h3>News</h3>
                    {addNewsButton()}  
                   
                    {addNew()}              
                   
                    {news1}
                </div>   
               
                <div> 
                    <div style={{}}> 
                        <div style={{ position : "relative" , textAlign : "center"}}>Team</div>
                        <div style={{float : "left", top : 11, left : 30, padding: 3, position : "relative" , width :undefined , background :undefined }}>
                            <OutOfOffice/>
                        </div>
                        <div style={{float : "left", top : 11, left : 30, padding: 3 ,position : "relative" , width :undefined , background :undefined }}>
                            <Projects/>
                        </div>    
                       
                        <div style={{float : "left"}}> 
                            <div style={{float : "left", top : 11, left : 30, padding: 3 ,position : "relative" , width :undefined , background :undefined }}>
                                    <Notes/>
                            </div>    
                        </div>                             
                    </div>  
                    
                            
                </div>                
                <div style={{ clear : "left"}}></div>

                <div>                   
                    { 
                        /*
                        <Assistant/> 
                        */
                    }
                </div>
       </div>

    )

}


//export default Secondpage
export default connect(mapStateToProps, mapDispatchToProps)(Mainwall)