 
import {useState , useEffect} from "react"
import {connect} from 'react-redux'
import _, { set } from "lodash"
import $gl from "./global"



var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();

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
  }
}

function Notes({ global , globalChange}){    
    var [notes,setNotes]=useState([])
    var [mainNote,setMainNote]=useState("")
    

    useEffect(function(){

      fn1(function(data){
        setNotes(data.data)
      })

    },[])


    var fn1=function(){
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

      fparams.body=JSON.stringify( { cmd : "getUserNotes"} );
      var url=protocall + "//" + host + ":" + port + "/notes";

      fetch(url, fparams
      )
      .then(response => response.json())
      .then(data => { 
              cb(data);
      })

    }

    var saveMainNote=function(){  
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
  
        fparams.body=JSON.stringify( { cmd : "saveUserNote" , type : "usermain", data : detail } );
        var url=protocall + "//" + host + ":" + port + "/notes";
  
        fetch(url, fparams
        )
        .then(response => response.json())
        .then(data => {   
                cb(data);
        })
  
      }

    var notesList=[];
    _.each(notes,function(r,i){
        var rec={}
        rec.title=r.title ;
        rec.body=r.body ;
        rec.type=r.type ;        

        notesList.push(rec)
    })    
    
    var noteView=function(){
        var notesdiv=[]
        notesList.map(function(r,i){
            if (r.type==="usermain"){
                notesdiv.push(
                        <div key={i} 
                            style={{ width : 605 , height : 350 , position : "relative" , 
                            borderRadius : 3, border : "lightgrey thin solid",
                            background : "lightgrey", color : "black" }} >

                            <button style={{ fontSize : 12 , height : 15 , padding : 2 }}
                                onClick={function(){
                                    saveMainNote({ detail : mainNote})
                                }
                            }
                            >
                                update
                            </button>
                            Main Note
                            <br/>
                            <textarea defaultValue=  { r.body }
                                style={{ width : "98%", height : "87%", position : "relative", margin : 2 }}
                                onChange={
                                    function(e){
                                        setMainNote(e.target.value);
                                    }
                                }
                            >                              
                            </textarea>
                        </div>
                        
                    )
            }

            return true;
        })
        return (
            <div>
                    {notesdiv}
            </div>
        )
    }()

    return(
        <div style={{ width : 400}} >
            notes
            {noteView}
        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Notes)