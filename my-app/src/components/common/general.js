
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
    var style=""
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
        <iframe src={src} style={style} title={title} width={width} height={height} />
    )
}

export const Upload=function(props){
    var newfilename=""
    if (!_.isUndefined(props.newfilename)){
        newfilename=props.newfilename
    }
    var type=""
    if (!_.isUndefined(props.type)){
        type=props.type
    }
    var extradata=""
    if (!_.isUndefined(props.extradata)){
        extradata=props.extradata
    }

    var [uploadFile,setUploadFile]=useState({ csv : ""});
    var [csvJson,setCsvJson]=useState([]);

    var upload=function(){
        let formData = new FormData();
        formData.append('file', uploadFile.upload);

        let file = uploadFile.upload
        var fr=new FileReader();                                      
        fr.readAsText(file);
        fr.onload=function(){
            //console.log(fr.result);
            var newdata=fr.result; // can do something with this in the front end
            window.$newuploaddata=newdata; // Global Var : can do something with this in the front end
           

        }
    }

    // .../uploadfiles
    var filesInput  
    return (
        <div>
            <button
                onClick={function(){
                    upload()
                    
                    }
                }
            >Upload</button>
            <input
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