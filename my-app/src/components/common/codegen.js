 
import {useState , useEffect} from "react"
import {connect} from 'react-redux'
import _ from "lodash"
import $gl from "./global"

import Rcm from "./rcm"

import { v4 as uuidv4 } from 'uuid';

var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();

//const mapStateToProps = function(state , owsProps){
const mapStateToProps = function(state ){
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

var css={};
css.inp={ postion : "relative" , margin : 2 , borderRadius : 3 }
css.inplab={ postion : "relative" , margin : 2}
css.txt={ postion : "relative" , margin : 2, borderRadius : 3}

var mounted=0
function Codegen(){
//function Codegen({ global , globalChange}){
    //var [,set]=useState()
    var defeditor={ currTable : "" , currCol : "" , uuid : "" }
    var deftable={name : "" ,  description : "" ,notes : "", uuid : "" , cols : [] , index : {} }
    var deftableCol={name : "" ,  description : "" , type : "" , length : "", uuid : ""}
    var defproject={ name : "" , createdate : "",lastupdate : "" , description : "" , 
                    editor : {} , todo : [], note : "", uuid : "",
                    tables : {}, views : {}, files : {} , paths : {}
                    
                }
    //var deftodo={uuid : "" , "name" : "" , hasChildren : false ,type : "" , progress : { curr : 0 , total : 1} ,desc : "" ,uuidParent : ""  }
    //var defview={}
    //var defdbview={}

    
    //var [notes,setNotes]=useState([])
    var [notes]=useState([])
    var [mainNote,setMainNote]=useState("")
    var [editor,setEditor]=useState(_.clone(defeditor))
    var [tables,setTables]=useState([])
    var [table,setTable]=useState(_.clone(deftable))
    var [tableCols,setTableCols]=useState([])
    var [tableCol,setTableCol]=useState(_.clone(deftableCol))
    var [project,setProject]=useState(_.clone(defproject))
    var [projects,setProjects]=useState([])
    //var [jsNodes,setJsNodes]=useState([])
    var [jsNodes]=useState([])
    //var [jsNode,setJsNode]=useState({})
    //var [jsReacts,setJsReacts]=useState([])
    var [jsReacts]=useState([])
    //var [jsReact,setJsReact]=useState({})
    //var [jsMongos,setJsMongos]=useState([])
    //var [jsMongo,setJsMongo]=useState({})
    //var [Mongos,setMongos]=useState([])
    //var [Mongo,setMongo]=useState({})
    //var [todos,setTodos]=useState([])
    var [todos]=useState([])
    //var [todo,setTodo]=useState(deftodo)
    //var [views,setViews]=useState([])
    //var [view,setView]=useState(defview)
    //var [views,setViews]=useState([])
    //var [dbview,setDBview]=useState(defdbview)


    var [showProjectList,setShowProjectList]=useState(false)

    var codegenversion=0, codegenversionStr=""
    

    useEffect(function(){
        mounted++;
        //console.log("is mounted " , mounted )
    },[])

    useEffect(function(a,b){
        //console.log("is table update "  )
         console.log("a: " ,table)

    },[table])

    useEffect(function(){
        //console.log("col updated"  )


    },[tableCol])


    var fn1=function(){
      // getOutofOfficeTodayAll

      var args=arguments;

      var cb=function(){}
      
      //var title="";
      //var detail=""
      
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

      ///*
      var fparams=new $gl.fetchPostCors();

      fparams.body=JSON.stringify( { cmd : "getUserNotes"} );
      var url=protocall + "//" + host + ":" + port + "/notes";

      fetch(url, fparams
      )
      .then(response => response.json())
      .then(data => { 
              //console.log(data)
              cb(data);
      })

    }

    var saveMainNote=function(){
        
  
      }

      var saveProject=function(){
        // getOutofOfficeTodayAll
  
        var args=arguments;
  
        var cb=function(){}
        
        var title="";
        var proj={}
        
        if ( args.length > 0){
            if (_.isPlainObject(args[0])){
                if (!_.isUndefined(args[0].cb)){
                    cb=args[0].cb
                }
                if (!_.isUndefined(args[0].title)){
                    title=args[0].title
                }
                
                if (!_.isUndefined(args[0].proj)){
                    proj=args[0].proj
                }
            }
  
  
            if (args.length > 1){
                cb=args[1];
            }
            if (_.isFunction(args[0]) ){
                cb=args[0]
            }
        }
  
        ///*
        var fparams=new $gl.fetchPostCors();
  
        fparams.body=JSON.stringify( { cmd : "saveProject" , data : proj } );
        var url=protocall + "//" + host + ":" + port + "/codegen";
  
        fetch(url, fparams
        )
        .then(response => response.json())
        .then(data => { 
                //console.log(data)
                cb(data);
        })
  
      }
      var loadProject=function(){
        // getOutofOfficeTodayAll
  
        var args=arguments;
  
        var cb=function(){}
        
        var title="";
        var detail=""
        var uuid=""
        
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
                if (!_.isUndefined(args[0].uuid)){
                    uuid=args[0].uuid
                }
            }
  
  
            if (args.length > 1){
                cb=args[1];
            }
            if (_.isFunction(args[0]) ){
                cb=args[0]
            }
        }
  
        ///*
        var fparams=new $gl.fetchPostCors();
  
        fparams.body=JSON.stringify( { cmd : "getProject" , data : args[0] } );
        var url=protocall + "//" + host + ":" + port + "/codegen";
  
        fetch(url, fparams
        )
        .then(response => response.json())
        .then(data => { 
                //console.log(data)
                cb(data);
        })
  
      }
      var listProjects=function(){
        // getOutofOfficeTodayAll
  
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
  
        ///*
        var fparams=new $gl.fetchPostCors();
  
        fparams.body=JSON.stringify( { cmd : "listProjects"  } );
        var url=protocall + "//" + host + ":" + port + "/codegen";
  
        fetch(url, fparams
        )
        .then(response => response.json())
        .then(data => { 
                //console.log(data)
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
    //console.log( "notes asnc : " , notes )
    //console.log( "notesList : " , notesList )
    
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
                            Codegen
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

    var projView=function(){

        return (            
            <div
                style={{ position : "relative" ,border : "lightgrey solid thin" }}
            >
                
                    proj
                <div>
                    <br/>
                    { /* load */}
                    <button
                        style={{ height : 20,width : 35, fontSize : 14 ,margin : 2,padding : 3}}
                        onClick={ 
                            function(e){
                                //var pr=_.clone({})
                                //pr.
                                var proj=_.clone(project);
                                proj.tables={ all : tables };
                                proj.editor=editor;
                                proj.note=mainNote;
                                proj.reactJS={ all : jsReacts}
                                proj.nodeJS={ all : jsNodes}
                                proj.todo={ all : todos}
                                proj.codegenversion={ "current" : codegenversion, "currString" : codegenversionStr, "all" : []}
                                console.log(proj)
                                saveProject({ proj : proj}, function(rdta){                                    
                                    var pr=_.clone(project) // if bugs occur try deep clone , cause clone has a limit of digging 
                                    pr.uuid=rdta.data.uuid;                                    
                                    setProject(pr)
                                })

                            }
                        }
                    >save</button>
                    { /* save */}
                    <button
                        style={{ height : 20,width : 35, fontSize : 14 ,margin : 2,padding : 3}}
                        onClick={ 
                            function(e){
                                
                                listProjects(function(dta){                                                      
                                    setProjects(dta.data)
                                    setShowProjectList(true)
                                    
                                })
                                

                            }
                        }
                    >load</button>
                    { /* new */}
                    <button
                        style={{ height : 20,width : 35, fontSize : 14 ,margin : 2,padding : 3}}
                        onClick={ 
                            function(e){                              
                              // setEditor(_.clone(defeditor));
                               setProject(_.clone(defproject));
                              /*
                               setTable(_.clone(deftable));
                               setTableCol(_.clone(deftableCol));
                               setTables([]);
                               setTableCols([]);
                               
                                */
                            }
                        }
                    >new</button>
                    <br/>
                    {
                        function(){ // list projects
                            if (showProjectList){
                                // loadProject(project)
                                var allproj=[]
                                var allprojE=[]                                
                                _.each(projects,function(r,i){
                                    allprojE.push(
                                    <div
                                        key={i} datauid={r.uuid}
                                        style={{  padding : 4, cursor : "pointer" }}
                                        onClick={ 
                                            function(e){
                                                var e_uuid=e.target.getAttribute('datauid')
                                                //console.log(e_uuid)
                                                loadProject({ uuid : e_uuid},function(dta){
                                                    //console.log(dta)
                                                    setProject(dta.data)
                                                    setTables(dta.data.tables.all)
                                                    setShowProjectList(false)
                                                })
                                                
                                            }
                                        }
                                    >

                                        name : {r.name} - created : {r.dateCreated} 
                                    </div>
                                    )
                                })

                                return (
                                    <div>
                                         <button
                                            style={{ height : 20,width : 35, fontSize : 14 ,margin : 2,padding : 3}}
                                            onClick={ 
                                                function(e){
                                                    //var pr=_.clone({})
                                                    //pr.
                                                    setShowProjectList(false)

                                                }
                                            }
                                        >cancel</button>
                                        {allprojE}
                                    </div>
                                )

                            }else{
                                return
                            }
                        }()
                    }
                    <div>
                        name : 
                        <input defaultValue={project.name}
                            style={css.txt}
                            onChange={ 
                                function(e){
                                    var pr=_.clone(project);
                                    pr.name=e.target.value
                                    setProject(pr)
                                }
                            }
                        />
                        <br/>
                        desc : 
                        <input defaultValue={project.description}
                            style={css.txt}
                            onChange={ 
                                function(e){
                                    var pr=_.clone(project);
                                    pr.description=e.target.value
                                    setProject(pr)                               
                                }
                            }
                        />
                        <br/>
                        notes : 
                        <textarea defaultValue={project.note}
                            style={css.txt}
                            onChange={ 
                                function(e){
                                    var pr=_.clone(project);
                                    pr.note=e.target.value
                                    setProject(pr)                               
                                }
                            }
                        />
                        <br/><br/>
                    </div>
                </div>
            </div>
        )
    }()

    var jsonFileUpdateView=function(){

        return (            
            <div
                style={{ position : "relative" ,border : "lightgrey solid thin" }}
            >
                <br/>
                    jsonfile
                <br/>
            </div>
                
        )
    }()

    var dbTasks=function(){
        var tablesE=[]
        var colsE=[]

        // editor

        _.each(tables,function(r,i){

            tablesE.push( 
                <div key={i}  
                    datauid={r.uuid}
                    style={{ padding : 4, cursor : "pointer" }}
                     onClick={ function(e){
                        // e.target.value
                        var e_uuid=e.target.getAttribute('datauid')
                        var found=false;
                        var founditer=0
                        _.each(tables,function(r,i){ // validate table name doesnt already exist 
                            if (r.uuid===e_uuid){
                                found=true;
                                founditer=i;
                            }
                            
                        })

                        setTable(tables[founditer])

                     } }
                >
                    {r.name}
                </div>
            )
        })

        _.each(tableCols,function(r,i){

            colsE.push( 
                <div key={i}  style={{ padding : 4, cursor : "pointer" }}
                        onClick={ function(e){
                        // e.target.value
                        }}
                >
                    {r.name}
                </div>
            )
        })

        return (            
                <div
                    style={{ position : "relative" ,border : "lightgrey solid thin" }}
                >
                    DB
                    <div>

                        <div>table</div>
                        
                        <div style={{position: "relative" , float : "left" ,border : "lightgrey solid thin"
                                        ,width : 300    
                                    }} 
                        >
                        <br/>
                                add/update
                                <button  
                                    style={{ height : 20,width : 35, fontSize : 14 ,margin : 2,padding : 3}}
                                    onClick={
                                        function(){
                                            var pr=_.clone(tables);

                                            var found=false;
                                            var founditer=0
                                            _.each(tables,function(r,i){ // validate table name doesnt already exist 
                                                if (r.name===table.name){
                                                    found=true;
                                                    founditer=i;
                                                }
                                                
                                            })
                                            if (!found){
                                                table.uuid=uuidv4()
                                                pr.push( _.clone(table) );                                                    
                                                //setEditor()                                                
                                                setTables(pr)
                                                var ed=_.clone(editor)
                                                ed.currTable=pr.name
                                                setEditor(ed)                                                
                                                //table= _.clone(deftable)
                                            }else{
                                                pr[founditer]=_.clone(table)
                                                setTables(pr)
                                                
                                                editor.currTable=pr.name
                                                setEditor(editor)  
                                                //alert("table already exist, check new table name")
                                            }
                                            
                                            
                                        }
                                    }
                                >add</button>
                                <br/>
                                  <br/>
                                        
                                name : 
                                    <input defaultValue={table.name}
                                        onChange={ 
                                            function(e){
                                                var pr=_.clone(table);
                                                pr.name=e.target.value
                                                setTable(pr)
                                            }
                                        }
                                    />
                                    <br/>
                                desc :
                                    <input defaultValue={table.description}
                                        onChange={ 
                                            function(e){
                                                //var pr=_.clone(table);
                                                //pr.description=e.target.value
                                                table.description=e.target.value
                                                setTable(table)
                                            }
                                        }
                                    />
                                    <br/>
                                notes :
                                    <input defaultValue={table.notes}
                                        onChange={ 
                                            function(e){
                                                //var pr=_.clone(table);
                                                //pr.notes=e.target.value
                                                table.notes=e.target.value
                                                setTable(table)
                                            }
                                        }
                                    />
                                    <br/>
                                    <br/>
                            </div>
                            
                            <div style={{position: "relative" , float : "left" ,border : "lightgrey solid thin"
                                            ,width  : 250
                                        }} 
                            >
                                <br/>
                                tables
                                <br/>
                                <br/>
                                {tablesE}
                                <br/>
                            </div>

                            <div style={{ clear : "left"}}></div>
                            <br/><br/>
                            
                            <div>column</div>
                            <div style={{position: "relative" , float : "left" ,border : "lightgrey solid thin"
                                            ,width : 300
                                        }} 
                            >
                                
                                <br/>
                                                                
                                <button
                                    style={{ height : 20,width : 35, fontSize : 14 ,margin : 2,padding : 3}}
                                >new</button>
                                                                
                                <button
                                    style={{ height : 20,width : 80, fontSize : 14 ,margin : 2,padding : 3}}
                                    onClick={
                                        function(){
                                          

                                            var pr=_.clone(tableCols);

                                            var found=false;
                                            var founditer=0
                                            _.each(tableCols,function(r,i){ // validate table name doesnt already exist 
                                                if (r.name===tableCol.name){
                                                    found=true;
                                                    founditer=i;
                                                }
                                                
                                            })
                                            if (!found){
                                                pr.push( _.clone(tableCol) );    
                                                setTableCols(pr)
                                                
                                                var ed=_.clone(editor)
                                                ed.currCol=pr.name;
                                                setEditor(editor)

                                                var foundt=false;
                                                var foundtiter=0
                                                _.each(tables,function(r,i){
                                                    if (ed.currCol===r.name){                                                        
                                                        foundt=true;
                                                        foundtiter=i
                                                    }

                                                })
                                                var tbs=_.clone(tables)
                                                //tbs[foundtiter]=
                                                //setTables()
                                                
                                                //setTableCol(_.clone(deftableCol) )
                                            }else{
                                                pr[founditer]=_.clone(tableCol)
                                                setTableCols(pr)
                                                //alert("table already exist, check new table name")
                                            }
                                        }
                                    }
                                >add/update col</button>
                                <br/><br/>
                                name : 
                                    <input defaultValue={tableCol.name}
                                        onChange={ 
                                            function(e){
                                                var pr=_.clone(tableCol);
                                                pr.name=e.target.value
                                                setTableCol(pr)
                                            }
                                        }
                                    />
                                <br/>
                                desc :
                                    <input defaultValue={tableCol.name}
                                        onChange={ 
                                            function(e){
                                                var pr=_.clone(tableCol);
                                                pr.name=e.target.value
                                                setTableCol(pr)
                                            }
                                        }
                                    />
                               <br/>
                               type :
                                    <input defaultValue={tableCol.type}
                                        onChange={ 
                                            function(e){
                                                var pr=_.clone(tableCol);
                                                pr.type=e.target.value
                                                setTableCol(pr)
                                            }
                                        }
                                    />
                                <br/>
                                length :
                                    <input defaultValue={tableCol.length}
                                        onChange={ 
                                            function(e){
                                                var pr=_.clone(tableCol);
                                                pr.length=e.target.value
                                                setTableCol(pr)
                                            }
                                        }
                                    />
                            <br/>
                            <br/>
                            </div>
                            <div style={{position: "relative" , float : "left" ,border : "lightgrey solid thin"
                                            ,width : 250
                                        }} 
                            >
                            <br/>
                                cols 
                                <br/>
                                <br/>
                                {colsE}               
                                <br/>
                            </div>
                            <div style={{ clear : "left"}}></div>

                            <br/>
                        <br/>
                        
                    </div>
                </div>
        )
    }()

    var mongoView=function(){

        return (            
                <div
                    style={{}}
                >
                    mongo
                </div>
        )
    }()

    var Naturallangeditor=function(){

        return (            
                <div
                    style={{}}
                >
                    Nat Lang Editor ...
                    <br/>
                    example : create component  blue background white input . with label called name , bind it to database user table name , give it add button , validate against table called users ....
                </div>
        )
    }()


    return(
        <div style={{ width : 900}} >
            {projView}
            {/* jsonFileUpdateView */}
            {dbTasks}
            {/* mongoView */}
            <div style={{position: "relative" }}>
                <Rcm/>                
                
            </div>            
            {/*noteView*/}
        </div>
    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Codegen)

