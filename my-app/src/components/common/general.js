import { useEffect, useState,Component} from "react"
//import {connect} from 'react-redux'
import _, { set } from "lodash"
import $gl from "./global"


var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();


export const Iframe=function(props){
    var src=""
    if (!_.isUndefined(props.src)){
        src=props.src
    }
    var style={}
    if (!_.isUndefined(props.style)){
        style=props.style
    }
    var title=""
    if (!_.isUndefined(props.title)){
        title=props.title
    }
    var width=""
    if (!_.isUndefined(props.width)){
        width=props.width
    }
    var height=""
    if (!_.isUndefined(props.height)){
        height=props.height
    }


    


    return (
        <div>
            <iframe src={src} style={style} title={title} width={width} height={height} />
        </div>
    )
}

export const Upload=function(props){
    var newfilename=""
    if (!_.isUndefined(props.newfilename)){
        newfilename=props.newfilename
    }
    var type={}
    if (!_.isUndefined(props.type)){
        type=props.type
    }
    var blobOrText="text"
    if (!_.isUndefined(props.type)){
        blobOrText=props.blobOrText
    }
    var extradata=""
    if (!_.isUndefined(props.extradata)){
        extradata=props.extradata
    }
    
    if (!_.isUndefined(props.extra)){
        extradata=props.extra
    }
    var buttonUploadStyle={}
    if (!_.isUndefined(props.buttonUploadStyle)){
        buttonUploadStyle=props.buttonUploadStyle
    }
    var buttonFileStyle={}
    if (!_.isUndefined(props.buttonFileStyle)){
        buttonFileStyle=props.buttonFileStyle
    }
    var buttonInputStyle={}
    if (!_.isUndefined(props.buttonInputStyle)){
        buttonInputStyle=props.buttonInputStyle
    }
    

    var [uploadFile,setUploadFile]=useState({ csv : ""});
    var [csvJson,setCsvJson]=useState([]);

    var upload=function(cb ,extra){
        let formData = new FormData();
        formData.append('file', uploadFile.upload );

        var extra={}
        extra.type=type
        extra=_.merge(extra,extradata)
        formData.append('extra',JSON.stringify(extra));

        let file = uploadFile.upload
        var fr=new FileReader();                                      
        fr.readAsText(file);
        fr.onload=function(){
            //console.log(fr.result);
            var newdata=fr.result; // can do something with this in the front end
            window.$newuploaddata=newdata; // Global Var : can do something with this in the front end
           console.log(newdata)
          
          

            //var fparams=new $gl.fetchPostCors("upload");
            var fparams=new $gl.fetchPostCors("upload");

            fparams.body=formData
            var url=protocall + "//" + host + ":" + port + "/uploadfiles";
            
            fetch(url, fparams
            )
            .then(response => response.json())
            .then(data => {             
                    cb(data);
            })

        }
    }

    // .../uploadfiles
    var filesInput  
    return (
        <div>
            <button
                style={buttonUploadStyle}
                onClick={function(){
                    upload(function(){})
                    
                    }
                } 
            >Upload</button>
            <input  style={buttonInputStyle}
                        type="file"
                        ref={(input) => { filesInput = input }}
                        name="file"
                        icon='file text outline'               
                        label='Upload File'               
                        placeholder='UploadFile...'
                        onChange={
                                    function(e){


                                        let file = e.target.files[0]
                                        var fr=new FileReader();                                      
                                        fr.readAsText(file);
                                        fr.onload=function(){
                                            //console.log(fr.result);
                                        }

                                        setUploadFile({
                                            upload: e.target.files[0]
                                        })

                                    
                                    }
                        }
                />    
        </div>
    )
}


export const Download=function(props){

    
    var style={}
    if (!_.isUndefined(props.style)){
        style=props.style
    }

    var fileid=""
    if (!_.isUndefined(props.fileid)){
        fileid=props.fileid
    }
    var type=""
    if (!_.isUndefined(props.type)){
        type=props.type
    }
    var fetchfilename=""
    if (!_.isUndefined(props.fetchfilename)){
        fetchfilename=props.fetchfilename
    }
    var filename="download"
    if (!_.isUndefined(props.filename)){
        filename=props.filename
    }
        
    var label="download"
    if (!_.isUndefined(props.label)){
        label=props.label
    }
    
    
    var [someval,setSomeval]=useState("somevalue123")
    
    
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
                
            }

            if (args.length > 1){
                cb=args[1];
            }
            if (_.isFunction(args[0]) ){
                cb=args[0]
            }
        }

        
        var fparams=new $gl.fetchPostCors();

        fparams.body=JSON.stringify( { type : type , fileid : fileid , filename : filename , fetchfilename : fetchfilename} );
        var url=protocall + "//" + host + ":" + port + "/download";
        
        fetch(url, fparams
        )
        .then(response => response.blob())
        .then(data => {             
                cb(data);
        })


    }

    var clickme=function(){
        fetchSomething(function(data){
            const href = window.URL.createObjectURL(data);
            const a = document.createElement("a");
            a.download = filename;
            a.href = href;
            a.click();
            a.href = '';


            console.log(data)
        })
    }

    return (
                <div>
                    <button
                            style={{}}
                            onClick={clickme}
                    >download</button>
                </div>

    )
}