import React, { Component ,useLayoutEffect, useState, useEffect } from 'react';
//import {useState , useEffect} from "react"
import {connect} from 'react-redux'
import _, { set } from "lodash"
import $gl from "./global"

import Rcm from "./rcm"

import { v4 as uuidv4 } from 'uuid';
import jsfns from "./codegenjsfns"

import CWindowPF from "./cwindowpf"



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



class Cwindow extends React.Component {

    constructor(props) {
        super(props); // always needed in contructer
        
  
        if (props.style!==undefined){
            var style=props.style;
        }
        var styles={}
        if (props.styles!==undefined){
            styles=props.styles;
        }
        var title="title"
        if (props.title!==undefined){
            title=props.title;
        }

        var minme=false
        if (props.minme!==undefined){
            minme=props.minme;
        }

        var remMin=false;
        if (props.remMin!==undefined){
            remMin=props.remMin;
        }

        var name="";
        if (props.name!==undefined){
            name=props.name;
        }
        

        this.state={    newvalue : props.value , style : style , children : props.children,
                        minme : minme , styles : styles , title : title, name : name , remMin : remMin
        } 

        if (_.isUndefined(window.rcm)){
            window.rcm={all : {}}
        }
        

        
    }

    remmeInitialised=false
    componentDidMount(){        
        var tt=this
        
        /* //ignorse this state for some reason , initially renders twice , first time works second time it just forces it to true
        if (tt.state.remMin){
            if (tt.state.name!==""){
                var minme=$gl.getCookie("remMin_" + tt.state.name)
                if (!_.isUndefined(minme)){
                    tt.setState( { minme : Boolean(minme) });
                }
            }
        }
        */
    }    

    componentDidUpdate(){
        
        
    }

    render() {
        var tt=this;

        var styles={
            
            background : "lightgrey", color : "white", border : "solid thin grey" , borderRadius : 3,width : undefined ,height : undefined,margin :0 ,padding : 0,
            backgroundTitle :"grey"  , colorTitle : "white",borderTitle : "solid thin grey" , borderRadiusTitle : 3,displayTitle : "block",marginTitle : 2,
            backgroundCloseButton :"red"  , colorCloseButton : "white",borderCloseButton : "" , borderRadiusCloseButton : 2,displayCloseButton : "none",
            backgroundMain : "black", colorMain : "white",borderMain : "solid thin grey" , borderRadiusMain : 3,overflowMain : undefined,marginMain : 2,widthMain : undefined ,heightMain : undefined
        }
        if (!_.isEmpty(tt.state.styles)){
            _.merge( styles, tt.state.styles)
        }

        var topbuttons1=function(){
            
            return ( 
                <div
                        style={{ position: "absolute" ,color : styles.colorCloseButton ,background : styles.backgroundCloseButton 
                                ,width : 15, height : 15 , right : 0 , padding : 0 , margin :3,
                                cursor : "pointer", borderRadius: styles.borderRadiusCloseButton ,border : styles.borderCloseButton,
                                display : styles.displayCloseButton
                        }}
                        onClick={
                            function(){
                                if (tt.state.remMin){
                                    if (tt.state.name!==""){
                                        $gl.createCookie("remMin_" + tt.state.name,  !tt.state.minme)
                                    }
                                }
                                tt.remmeInitialised=true;
                                tt.setState({ minme : !tt.state.minme } )
                            }
                        }
                    >                       
                        <div
                            style={{ position : "absolute" , left :3, top : -3 , padding : 0 , margin :0}}
                        >
                            -
                        </div>
                    </div>
            )
        }()

        var displayMainCSS="block"
        var minme=tt.state.minme
        
            if (tt.state.remMin){
                if (tt.state.name!==""){
                    if (!tt.remmeInitialised){
                        var temp_minme=$gl.getCookie("remMin_" + tt.state.name)
                        if (!_.isUndefined(temp_minme)){
                            minme=Boolean(temp_minme);
                            
                        }
                    }
                }
            }
        
        

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
                            if (tt.state.remMin){
                                if (tt.state.name!==""){
                                    $gl.createCookie("remMin_" + tt.state.name,  !tt.state.minme)
                                }
                            }
                            tt.remmeInitialised=true;
                            tt.setState({ minme : !tt.state.minme } )
                        }
                    }
                >
                    {topbuttons1}
                    {tt.state.title}
                </div>
                <div
                    style={{ display : displayMainCSS , background : styles.backgroundMain , margin : styles.marginMain,border : styles.borderMain, 
                        borderRadius: styles.borderRadiusMain ,overflow : styles.overflowMain
                    }}                    
                >
                    {tt.state.children}
                </div>
            </div>

        )
    }

}


var winsO=function(){
    var obj={
        name : ""
        ,minme : false
        ,style : {
            win : {background : "lightgrey", color : "white", border : "solid thin grey" , borderRadius : 3,width : undefined ,height : undefined,margin :0 ,padding : 0 }
            ,title: {background : "grey", color : "white", border : "solid thin grey" , borderRadius : 3,width : undefined ,height : undefined,margin :2 ,padding : 0 }
            ,main  :{display : "block",background : "black", color : "white", border : "solid thin grey" , borderRadius : 3,width : undefined ,height : undefined,margin :2 ,padding : 0 , overflow : undefined}
        }
        ,onClick : function(e,cmpt){
            var tt=this
            var rec={}
            if (_.isUndefined(rec[tt.name])){
                rec[tt.name]=false
            }
            rec[tt.name]=!rec[tt.name]
            tt.minme=rec[tt.name]
            var style=_.clone(tt.style)
            if (tt.minme){
                style.main.display="none"
            }else{
                style.main.display="block"
            }
            tt.style=style

            cmpt.setState( rec)
        }
        ,init : function(){
            var tt=this
            var args=arguments
            if (_.isPlainObject(args[0])){
                var a0=args[0]
                if (!_.isUndefined(a0.name)){
                    tt.name=a0.name
                }
            }

        }

    
    }

    obj.init.apply(obj,arguments )

    return obj;
}
var wins={};
var tempName="CDgenerate" 
wins[tempName]=new winsO( { name : tempName})
            


var css={};
css.inp={ postion : "relative" , margin : 2 , borderRadius : 3 }
css.inplab={ postion : "relative" , margin : 2}
css.txt={ postion : "relative" , margin : 2, borderRadius : 3}
var defeditor={ currTable : "" , currCol : "" , uuid : "", currTableuuid : "" ,currColuuid : "", 
                currcGroupsName :"",currcGroupsType : "I",currcGroupsI : "" ,currcGroupsIname : "", currcGroupsA : "",currcGroupsAname : "" , 
                currcGroupChildren : "", currcGroupChildrenName : "" }
var deftable={name : "" ,  description : "" ,notes : "", uuid : "" , cols : [] , index : {} }
var deftableCol={name : "" ,  description : "" , type : "" , length : "", uuid : ""}
var defproject={ name : "" , createdate : "",lastupdate : "" , description : "" , 
                editor : {} , todo : [], note : "", uuid : "",
                tables : {}, views : {}, files : {} , paths : {},

                showProjectList : false
                
            }
var deftodo={uuid : "" , "name" : "" , hasChildren : false ,type : "" , progress : { curr : 0 , total : 1} ,desc : "" ,uuidParent : ""  }
var defview={}
var defdbview={}
var defCodeItem={ name : "", parentType : "" ,groupType : "", parent : "", parentuuid : "" ,
type : "", codeType : "",subCodeType: "", uuid : "" ,params : { data : {}} , codeparams : {} , prevCode : { all : [] , alltext : "" } }
var codegenversion=0, codegenversionStr=""

class Codegenc extends React.Component {

    constructor(props) {
        super(props); // always needed in contructer
        
        
  
        if (props.style!==undefined){
            var style=props.style;
        }
        this.state={    newvalue : props.value , style : style , children : props.children,
                        notes : [], mainNote : "", editor : _.clone(defeditor), tables : [],
                        table : _.clone(deftable), tableCols : [], tableCol : _.clone(deftableCol), 
                        project : _.clone(defproject), projects : [],showProjectList: false,
                        jsNodes : [],jsNode : _.clone({}),jsReacts : [],jsReact : _.clone({}),jsMongos : [],jsMongo : {},
                        Mongos : [],Mongo : _.clone({}),todos : [],todo : _.clone(deftodo),
                        dbviews : [] ,dbview :_.clone(defdbview) ,

                        GCadd : true, GCedit : true, GCdel : true,
                        GChasAdd : true, GCehasEdit : true, GChasDel : true,

                        views :[] ,view : _.clone(defview),viewItems:[],cGroups : {} ,cGroupsI : [],cGroupsA : [],
                        cGroupsIaddtext : "",cGroupsAaddtext : "",cGroupChildren : [] ,codeItem : defCodeItem,

                        wins : {}


        } 

        if (_.isUndefined(window.rcm)){
            window.rcm={all : {}}
        }
  
    }

    updateProjectJSON= function(){
        var tt=this;                           
        if (!_.isUndefined(window.rcm.all["projectJSON"]) ){
            window.rcm.all["projectJSON"].ed.setValue( JSON.stringify(tt.state.project,null ,2) )
        }
    }

    componentDidMount() {
        var tt=this;

        var lastprojuuid=$gl.getCookie("lastprojuuid");
        
        if (!_.isUndefined(lastprojuuid)){
            if (!_.isEmpty(lastprojuuid)){

                tt.loadProjectMain(lastprojuuid)      

            }

        }

    

        tt.updateProjectJSON()
    
    }

    componentWillUnmount() {

    }

    updates=0

    componentDidUpdate(a , b , c){
        var tt=this;
        tt.updateProjectJSON()
    }

 

    saveProject=function(){
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
            
            cb(data);
    })

    }
    loadProject=function(){
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
            
            cb(data);
    })

    }
    listProjects=function(){
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
            
            cb(data);
    })

    }
    //  this.setState({ width: window.innerWidth, height: window.innerHeight });

    loadProjectMain=function(e_uuid){
        var tt=this

        tt.loadProject({ uuid : e_uuid},function(dta){
                                                        
            var temp=""
            
            //tt.setProject(dta.data)
            //tt.setTables(dta.data.tables.all)
            //tt.setShowProjectList(false)
            var pr={ project : dta.data , tables : dta.data.tables.all, showProjectList : false } 

            
            temp="editor"
            if (!_.isUndefined(dta.data[temp])){
                pr[temp]=dta.data[temp]
            }

            temp="cGroupsI"
            if (!_.isUndefined(dta.data[temp])){
                pr[temp]=dta.data[temp]
            }

            temp="cGroupsA"
            if (!_.isUndefined(dta.data[temp])){
                pr[temp]=dta.data[temp]
            }

            tt.setState(pr)     
            
        })
    }
    saveProjectMain=function(){
        var tt=this
        var proj=_.clone(tt.state.project);
        proj.tables={ all : tt.state.tables };
        proj.editor=tt.state.editor;
        proj.note=tt.state.mainNote;
        proj.reactJS={ all : tt.state.jsReacts}
        proj.nodeJS={ all : tt.state.jsNodes}
        proj.todo={ all : tt.state.todos}
        proj.codegenversion={ "current" : codegenversion, "currString" : codegenversionStr, "all" : []}
        
        proj.cGroupsA=tt.state.cGroupsA
        proj.cGroupsI=tt.state.cGroupsI

        tt.saveProject({ proj : proj}, function(rdta){                                    
            var pr=_.clone(tt.state.project) // if bugs occur try deep clone , cause clone has a limit of digging 
            pr.uuid=rdta.data.uuid;                                    
            //tt.setProject(pr)

            $gl.createCookie("lastprojname" ,proj.name )
            $gl.createCookie("lastprojuuid" , pr.uuid)

            tt.setState({ project : pr })    
        })
    }

    render() {
        var tt=this;
        
        
        

        var projView=function(){

            return (            
               
                <div
                    style={{ position : "relative" ,border : "lightgrey solid thin" }}
                >
                    
                        proj
                        <br/>
                    <div  style={{ position : "relative" ,float : "left" , margin : 15}} >
                        <br/>
                        { /* load */}
                        <button
                            style={{ height : 20,width : 35, fontSize : 14 ,margin : 2,padding : 3}}
                            onClick={ 
                                function(e){
                                    tt.saveProjectMain()

                                    
    
                                }
                            }
                        >save</button>
                        { /* save */}
                        <button
                            style={{ height : 20,width : 35, fontSize : 14 ,margin : 2,padding : 3}}
                            onClick={ 
                                function(e){
                                    
                                    tt.listProjects(function(dta){                                                      
                                        //tt.setProjects(dta.data)
                                        tt.setState({ projects : dta.data ,  showProjectList : true })    
                                        //tt.setShowProjectList(true)
                                        //tt.setState({ showProjectList : true })    

                                        
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
                                  //tt.setProject(_.clone(defproject));
                                  tt.setState({ project : _.clone(defproject) })  

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
                                if (tt.state.showProjectList){
                                    // loadProject(project)
                                    var allproj=[]
                                    var allprojE=[]                                
                                    _.each(tt.state.projects,function(r,i){
                                        allprojE.push(
                                        <div
                                            key={i} datauid={r.uuid}
                                            style={{  padding : 4, cursor : "pointer" }}
                                            onClick={ 
                                                function(e){
                                                    var e_uuid=e.target.getAttribute('datauid')
                                                    
                                                    tt.loadProjectMain(e_uuid)
                                                   
                                                    
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
                                                        //tt.setShowProjectList(false)
                                                        tt.setState({showProjectList : false})
    
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
                            <input defaultValue={tt.state.project.name}
                                style={css.txt}
                                onChange={ 
                                    function(e){
                                        var pr=_.clone(tt.state.project);
                                        pr.name=e.target.value
                                        //setProject(pr)
                                        tt.setState({ project : pr })     
                                    }
                                }
                            />
                            <br/>
                            desc : 
                            <input defaultValue={tt.state.project.description}
                                style={css.txt}
                                onChange={ 
                                    function(e){
                                        var pr=_.clone(tt.state.project);
                                        pr.description=e.target.value
                                        //setProject(pr) 
                                        tt.setState({ projects : pr })                                 
                                    }
                                }
                            />
                            <br/>
                            notes : 
                            <textarea defaultValue={tt.state.project.note}
                                style={css.txt}
                                onChange={ 
                                    function(e){
                                        var pr=_.clone(tt.state.project);
                                        pr.note=e.target.value
                                        //setProject(pr)  
                                        tt.setState({ project : pr })                             
                                    }
                                }
                            />
                            <br/><br/>
                        </div>
                    </div>
                    <div style={{ postion :  "relative" , float : "left" }} >
                        <div style={{ width : 400 , height : 200 , overflow :   "scroll", margin : 15}}>
                            <Rcm name="projectJSON" />
                         
                        </div>
                    </div>

                    <div style={{  clear  : "left" }} ></div>

                </div>
            
                
            )
        }()

      
        var tablesE=[]
        var colsE=[]
        
        var dbTasks=function(){
            tablesE=[]
            colsE=[]
    
            // editor
    
            _.each(tt.state.tables,function(r,i){
    
                tablesE.push( 
                    <div key={i}  
                        datauid={r.uuid}
                        style={{ padding : 4, cursor : "pointer" }}
                         onClick={ function(e){
                            // e.target.value
                            var e_uuid=e.target.getAttribute('datauid')
                            var found=false;
                            var founditer=0
                            _.each(tt.state.tables,function(r,i){ // validate table name doesnt already exist 
                                if (r.uuid===e_uuid){
                                    found=true;
                                    founditer=i;
                                }
                                
                            })
                            var sel_table=_.clone(tt.state.tables[founditer])
                            var ed=_.clone(tt.state.editor)
                            ed.currTable=tt.state.tables[founditer].name
                            if ( _.isUndefined(sel_table.cols)){ sel_table.cols=[]  }
                            tt.setState({ table : sel_table
                                        ,currTable : ed.currTable
                                        ,editor : ed
                                        ,tableCols : sel_table.cols 
                                        ,tableCol : _.clone(deftableCol)
                            } )    
    
                         } }
                    >
                        {r.name}
                    </div>
                )
            })
            
            { /* tableCol --> colesE */ }
            _.each(tt.state.tableCols,function(r,i){
    
                colsE.push( 
                    <div    key={i}  style={{ padding : 4, cursor : "pointer" }}
                            datauid={r.uuid}
                            onClick={ function(e){
                                var e_uuid=e.target.getAttribute('datauid')
                                var found=false;
                                var founditer=0
                                _.each(tt.state.tableCols,function(r,i){ // validate table name doesnt already exist 
                                    if (r.uuid===e_uuid){
                                        found=true;
                                        founditer=i;
                                    }
                                    
                                })  
                                var sel_tableCol=_.clone(tt.state.tableCols[founditer])
                                var edt=_.clone(tt.state.editor)
                                edt.currCol=sel_tableCol.name;
                                tt.setState({                                      
                                    tableCol : _.clone(sel_tableCol) , editor : edt
                                 } )    

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
                                                var pr=_.clone(tt.state.tables);
    
                                                var found=false;
                                                var founditer=0
                                                _.each(tt.state.tables,function(r,i){ // validate table name doesnt already exist 
                                                    if (r.name===tt.state.table.name){
                                                        found=true;
                                                        founditer=i;
                                                    }
                                                    
                                                })
                                                if (!found){
                                                    tt.state.table.uuid=uuidv4()
                                                    pr.push( _.clone(tt.state.table) );                                                    
                                                    //setEditor()                                                
                                                    var ed=_.clone(tt.state.editor)
                                                    ed.currTable=pr[founditer].name
                                                    ed.currTableuuid=pr[founditer].uuid
                                                    tt.setState({ tables :pr , editor :ed})                                                  
                                                    
                                                    //tt.setState({ editor :ed})                                               
                                                    //table= _.clone(deftable)
                                                }else{
                                                    pr[founditer]=_.clone(tt.state.table)
                                                    tt.state.editor.currTable=pr[founditer].name

                                                    tt.setState({ tables :pr,  editor : tt.state.editor})
                                                    
                                                    
                                                    //tt.setState({ editor : tt.state.editor }) 
                                                    //alert("table already exist, check new table name")
                                                }
                                                
                                                
                                            }
                                        }
                                    >add</button>
                                    <br/>
                                      <br/>
                                            
                                    name : 
                                        <input value={tt.state.table.name}
                                            onChange={ 
                                                function(e){
                                                    var pr=_.clone(tt.state.table);
                                                    pr.name=e.target.value
                                                    tt.setState({ table : pr }) 
                                                }
                                            }
                                        />
                                        <br/>
                                    desc :
                                        <input value={tt.state.table.description}
                                            onChange={ 
                                                function(e){
                                                    //var pr=_.clone(table);
                                                    //pr.description=e.target.value
                                                    tt.state.table.description=e.target.value
                                                    tt.setState({ table : tt.state.table })
                                                }
                                            }
                                        />
                                        <br/>
                                    notes :
                                        <input value={tt.state.table.notes}
                                            onChange={ 
                                                function(e){
                                                    //var pr=_.clone(table);
                                                    //pr.notes=e.target.value
                                                    tt.state.table.notes=e.target.value
                                                    tt.setState({ table : tt.state.table })
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
                                    
                                    current table : {tt.state.currTable}
                                    <br/>
                                                                    
                                    <button
                                        style={{ height : 20,width : 35, fontSize : 14 ,margin : 2,padding : 3}}
                                        onClick={
                                            function(){
                                                var pr=_.clone(deftableCol);                                                
                                                tt.setState({ tableCol : pr }) 
                                             }
                                        }
                                    >new</button>
                                                                    
                                    <button
                                        style={{ height : 20,width : 80, fontSize : 14 ,margin : 2,padding : 3}}
                                        onClick={
                                            function(){    
                                                
                                                if (tt.state.currTable==="" ){
                                                    alert( "table not selected to add columns to, pleasae select or create table and select first before adding column ")
                                                    return
                                                }
    
                                                //var pr=_.clone(tt.state.tableCols);
                                                
                                                var ltableCols=_.clone(tt.state.tableCols);
                                                
                                                var ltables=_.clone(tt.state.tables)

                                                //get current table to check if this col name already exists , if not push it
                                                var colExists=false;
                                                var existsIter=0
                                                _.each(ltableCols,function(r,i){
                                                    if (r.name==tt.state.tableCol.name ){
                                                        colExists=true
                                                        existsIter=i
                                                    }
                                                })

                                                if (colExists){
                                                    ltableCols[existsIter]=_.clone(tt.state.tableCol)
                                                }else{
                                                     tt.state.tableCol.uuid=uuidv4()
                                                    ltableCols.push(_.clone(tt.state.tableCol))
                                                }

                                                
                                                var tableExists=false;
                                                var existsIter=0
                                                _.each(ltables,function(r,i){
                                                    if (r.name==tt.state.currTable ){
                                                        tableExists=true
                                                        existsIter=i
                                                    }
                                                })

                                                ltables[existsIter].cols=ltableCols


                                                tt.setState( {   
                                                                tableCols : ltableCols,
                                                                tables : ltables
                                                })


                                                //#region 
                                                /* 
                                                var found=false;
                                                var founditer=0
                                                _.each(tt.state.tableCols,function(r,i){ // validate table name doesnt already exist 
                                                    if (r.name===tt.state.tableCol.name){
                                                        found=true;
                                                        founditer=i;
                                                    }
                                                    
                                                })
                                                if (!found){
                                                    pr.push( _.clone(tt.state.tableCol) );    
                                                    var ed=_.clone(tt.state.editor)
                                                    ed.currCol=pr.name;
                                                    ed.currColuuid=pr.uuid;
                                                    tt.setState({ tableCols : pr ,editor : ed }) 
                                                    
                                                    
                                                    //tt.setState({ editor : ed }) 
    
                                                    var foundt=false;
                                                    var foundtiter=0
                                                    _.each(tt.state.tables,function(r,i){
                                                        if (ed.currTable===r.name){                                                        
                                                            foundt=true;
                                                            foundtiter=i
                                                        }
    
                                                    })
                                                    var tbs=_.clone(tt.state.tables)
                                                    //tbs[foundtiter]=
                                                    //setTables()
                                                    
                                                    //setTableCol(_.clone(deftableCol) )
                                                }else{
                                                    pr[founditer]=_.clone(tt.state.tableCol)
                                                    tt.setState({ tableCols : pr }) 
                                                    //alert("table already exist, check new table name")
                                                }
                                                */
                                               //#endregion
                                            }
                                        }
                                    >add/update col</button>
                                    <br/><br/>
                                    name : 
                                        <input value={tt.state.tableCol.name}
                                            onChange={ 
                                                function(e){
                                                    var pr=_.clone(tt.state.tableCol);
                                                    pr.name=e.target.value
                                                    tt.setState({ tableCol : pr }) 
                                                }
                                            }
                                        />
                                    <br/>
                                    desc :
                                        <input value={tt.state.tableCol.description}
                                            onChange={ 
                                                function(e){
                                                    var pr=_.clone(tt.state.tableCol);
                                                    pr.description=e.target.value
                                                    tt.setState({ tableCol : pr }) 
                                                }
                                            }
                                        />
                                   <br/>
                                   type :
                                        <input value={tt.state.tableCol.type}
                                            onChange={ 
                                                function(e){
                                                    var pr=_.clone(tt.state.tableCol);
                                                    pr.type=e.target.value
                                                    tt.setState({ tableCol : pr }) 
                                                }
                                            }
                                        />
                                    <br/>
                                    length :
                                        <input value={tt.state.tableCol.length}
                                            onChange={ 
                                                function(e){
                                                    var pr=_.clone(tt.state.tableCol);
                                                    pr.length=e.target.value
                                                    tt.setState({ tableCol : pr }) 
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

        var cGroupsIE=[], cGroupsAE=[];
        var cGroupChildrenE=[] , codeItemE=[]
        var currcGroupChildrenName=<div>{ tt.state.editor.currcGroupChildrenName}</div> 

        var pageViews=function(){ 
            
            _.each(tt.state.cGroupsI,function(r,i){
                cGroupsIE.push(
                        <div key={i}
                            style={{ cursor : "pointer"}}
                            nameR={r.name} uuid={r.uuid}
                            onClick={
                                function(e){
                                    var newVal2=e.target.getAttribute('nameR')
                                    var newVal=e.target.getAttribute('uuid')                                    
                                    var ns={...tt.state.editor}                                   
                                    ns.currcGroupsI=newVal
                                    ns.currcGroupsIname=newVal2
                                    ns.currcGroupsName=newVal2
                                    ns.currcGroupsType="I"
                                    tt.setState({editor : ns})
                                }
                            }
                        > {r.name}
                        </div> 
                    )
            })

            _.each(tt.state.cGroupsA,function(r,i){
                cGroupsAE.push(
                    <div key={i}
                    style={{ cursor : "pointer"}}
                    nameR={r.name} uuid={r.uuid}
                    onClick={
                        function(e){                            
                            var newVal=e.target.getAttribute('uuid')
                            var newVal2=e.target.getAttribute('nameR')
                            var ns={...tt.state.editor}
                            ns.currcGroupsA=newVal
                            ns.currcGroupsAname=newVal2
                            ns.currcGroupsName=newVal2
                            ns.currcGroupsType="A"
                            tt.setState({editor : ns}) 
                        }
                    }
                > {r.name}
                </div> 
                )

            })
            
            _.each(tt.state.cGroupChildren,function(r,i){
                cGroupChildrenE.push( 
                    <div key={i}
                        style={{ cursor : "pointer"}}
                        nameR={r.name} uuid={r.uuid}
                        onClick={
                            function(e){                                
                                var newVal=e.target.getAttribute('uuid')
                                var newVal2=e.target.getAttribute('nameR')
                                var ns={...tt.state.editor}
                                ns.currcGroupChildren=newVal
                                ns.currcGroupChildrenName=newVal2                                
                                tt.setState({editor : ns}) 
                            }
                        }
                    >
                        # - {i} : {r.name } - {r.type } 
                    </div>
                 )
            })

            

            codeItemE=function(){
                var ed=tt.state.editor // current record editor 
                
                var gci= tt.state.cGroupsI
                var gca= tt.state.cGroupsA
                
                var showrec=_.clone(defCodeItem)

                var sr=showrec;
                var  found=false , foundrec={}
                if (!_.isUndefined( ed.currcGroupChildrenName  ) ){
                    if (ed.currcGroupChildrenName !== ""  ){
                        var gc;

                        if (ed.currcGroupsType==="I"){
                            gc=gci
                        }
                        if (ed.currcGroupsType==="A"){
                            gc=gca
                        }                   

                        // groupI A name 
                        
                        _.each(tt.state.cGroupChildren, function(r,i){
                            if (r.name === ed.currcGroupChildrenName){
                                foundrec=r;
                                found=true;
                            }
                        })
                    }
                }

                
                if (found){
                    sr=_.merge( showrec, foundrec)
                }

                tt.state.codeItem=_.clone(sr)

                return (
                    <div style={{ position : "relative",width : undefined , textAlign : "left"}}>
                        <div style={{ position : "relative",width : 400 , float : "left"}} >
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>name</label>
                                <input style={{margin : 4,position : "absolute",right : 5 }} 
                                    value={ sr.name}
                                    onChange={ e=>{ return } }
                                />
                                <br/>
                            </div>
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>type</label>
                                <input style={{margin : 4,position : "absolute",right : 5 }} 
                                    value={sr.type}
                                    onChange={ e=>{ return } }
                                />
                                <br/>
                            </div>
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>code type</label>
                                <input style={{margin : 4,position : "absolute",right : 5 }} 
                                    value={sr.codeType}
                                    onChange={ e=>{ return } }
                                />
                                <br/>
                            </div>
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>sub code type</label>
                                <input style={{margin : 4,position : "absolute",right : 5 }} 
                                    value={sr.subCodeType}
                                    onChange={ e=>{ return } }
                                />
                                <br/>
                            </div>
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>desc</label>
                                <input style={{margin : 4,position : "absolute",right : 5 }} 
                                    value={""}
                                    onChange={ e=>{ return } }
                                />
                                <br/>
                            </div>
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>defualt value</label>
                                <input style={{margin : 4,position : "absolute",right : 5 }} 
                                    value={sr.defaultValue}
                                    onChange={ e=>{ return } }
                                />
                                <br/>
                            </div>
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>readwrite</label>
                                <input style={{margin : 4,position : "absolute",right : 5 }}
                                    value={sr.readwrite}
                                    onChange={ e=>{ return } }
                                />
                                <br/>
                            </div>
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>uuid</label>
                                <input style={{margin : 4,position : "absolute",right : 5 }} 
                                    value={sr.uuid}
                                    onChange={ e=>{ return } }
                                />
                                <br/>
                            </div>
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>parent group</label>
                                <input style={{margin : 4,position : "absolute",right : 5 }} 
                                    value={sr.parent}
                                    onChange={ e=>{ return } }
                                />
                                <br/>
                            </div>
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>parent group type</label>
                                <input style={{margin : 4,position : "absolute",right : 5 }} 
                                    value={sr.parentType}
                                    onChange={ e=>{ return } }
                                />
                                <br/>
                            </div>
                        </div>
                        <div style={{ position : "relative",width : 300 , float : "left"}} >                   
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>codeparams</label>
                                <br/>
                                <div style={{margin : 4,position : "absolute" }}                                     
                                >
                                    <label>front end</label><input type="checkbox"  />  
                                    <br/>
                                    <label>create</label><input type="checkbox" /> <label>add</label><input type="checkbox"  /> <label>update</label><input type="checkbox"  />  <label>delete</label><input type="checkbox"  />
                                    <br/>
                                    <label>backend end</label><input type="checkbox"  />  
                                    <br/>
                                    <label>create</label><input type="checkbox" /> <label>add</label><input type="checkbox"  /> <label>update</label><input type="checkbox"  />  <label>delete</label><input type="checkbox"  />
                                    <br/>
                                    <label>nodejs api</label><input type="checkbox" /> <label>post</label><input type="checkbox"  /> <label>get</label><input type="checkbox"  />
                                    <br/>
                                    <label>JSON file DB</label><input type="checkbox" /> <label>Mogno DB</label><input type="checkbox"  /> 
                                    <br/>
                                </div>
                                <br/><br/><br/><br/><br/><br/><br/><br/> <br/><br/> <br/><br/> <br/><br/>  
                            </div>
                            <div style={{ position : "relative", margin : 5}}>
                                <label style={{margin : 0, padding : 0,left : 0, position : "absolute" }}>item preview</label>
                                <div style={{margin : 4,position : "absolute",right : 5 }} >
                                    <textarea 
                                        value={tt.state.codeItem.prevCode.alltext}
                                        onchange={function(){

                                        }}
                                    />
                                </div>
                                <br/>
                            </div>
                        </div>
                        <div style={{  clear : "left"}}></div>
                        
                    </div>
                )
            }()

            var additem=function(){                
                    var args=arguments;
                    var params={}
                    var state={}

                    params.type="var"
                    params.name="noName"
                    params.uuid=""
                    params.CodeType="any"
                    params.subCodeType="any"
                    params.readwrite="any"
                    params.parent=""
                    params.parentuuid=""
                    params.groupType="I"
                    params.params={}

                    
                    if (_.isPlainObject( args[0])){
                        var a0=args[0];
                        var tmp

                        tmp="type"
                        if (!_.isUndefined(a0[tmp])){
                            params[tmp]=a0[tmp]
                        }

                        tmp="name"
                        if (!_.isUndefined(a0[tmp])){
                            params[tmp]=a0[tmp]
                        }
                        tmp="uuid"
                        if (!_.isUndefined(a0[tmp])){
                            params[tmp]=a0[tmp]
                        }
                        tmp="CodeType"
                        if (!_.isUndefined(a0[tmp])){
                            params[tmp]=a0[tmp]
                        }                   
                        tmp="subCodeType"
                        if (!_.isUndefined(a0[tmp])){
                            params[tmp]=a0[tmp]
                        }
                        tmp="readwrite"
                        if (!_.isUndefined(a0[tmp])){
                            params[tmp]=a0[tmp]
                        }
                        tmp="parent"
                        if (!_.isUndefined(a0[tmp])){
                            params[tmp]=a0[tmp]
                        }
                        tmp="groupType"
                        if (!_.isUndefined(a0[tmp])){
                            params[tmp]=a0[tmp]
                        }
                        tmp="params"
                        if (!_.isUndefined(a0[tmp])){
                            params[tmp]=a0[tmp]
                        }
                        
                    

                        
                    } 

                    //var nr={...tt.state.cGroupChildren}
                    var nr=_.clone(tt.state.cGroupChildren)

                    nr.push(params)

                    state={ cGroupChildren : nr}
                    
                    tt.setState(state)
            }

            var additmeTable=function(){
                var allow=true;
                var error=""
                var nr={    name : tt.state.editor.currTable + "__"+ tt.state.editor.currCol , parentType : "" ,groupType : "", parent : "" ,
                            type : "tablecol", uuid : uuidv4() ,params : { data : {}} }

                

                if (nr.name==="__"){
                    allow=false
                    error+="no table or column selected ; "
                }

                if (_.isUndefined( tt.state.editor.currTable )){
                    allow=false
                    error+="no table selected ; "
                }
                if (_.isUndefined( tt.state.editor.currCol ) || tt.state.editor.currCol==="" ){
                    allow=false
                    error+="no column selected ; "
                }

                nr.groupType=tt.state.editor.currcGroupsType

                if (nr.groupType==="A"){
                    // 
                    nr.parent=tt.state.editor.currcGroupsAname
                    nr.parentuuid=tt.state.editor.currcGroupsA
                }
                if (nr.groupType==="I"){
                    nr.parent=tt.state.editor.currcGroupsIname
                    nr.parentuuid=tt.state.editor.currcGroupsI
                    
                }

                



                nr.params.data["table"]=tt.state.editor.currTable
                nr.params.data["col"]=tt.state.editor.currCol

                if ( allow){
                    additem(nr , {} )
                }else{
                    alert(error)
                }

            }

            var generateItemCode=function(){
                var ci={...tt.state.codeItem}

                //if (_.isUndefined()){                    
                //}
                var code=""

                if (ci.type==="tablecol"  ){
                    if (!_.isUndefined(ci.codeparams.mongoInsert)){                   
                        if (ci.codeparams.mongoInsert){

                        }
                    }
                    if (!_.isUndefined(ci.codeparams.mongoUpdate)){                   
                        if (ci.codeparams.mongoUpdate){

                        }
                    }
                    if (!_.isUndefined(ci.codeparams.mongoDelete)){                   
                        if (ci.codeparams.mongoDelete){

                        }
                    }
                    
                    if (!_.isUndefined(ci.codeparams.jsonFileInsert)){   
                        code+=""
                        if (ci.codeparams.jsonFileInsert){

                        }
                    }
                    if (!_.isUndefined(ci.codeparams.jsonFileUpdate)){                   
                        if (ci.codeparams.jsonFileUpdate){

                        }
                    }

                    if (!_.isUndefined(ci.codeparams.jsonFileDelete)){                   
                        if (ci.codeparams.jsonFileDelete){

                        }
                    }



                }

                code+="var abc=123"
                
                code+="var !!{{name}}!!=function(){}"

                ci.prevCode.alltext=code;


                tt.setState( { codeItem : ci })

                return code
            }
            
            return (                
                <div>
                    pageviews

                    <div style={{ position:"relative" , padding : 5 , background : "" , border : "solid thin lightgrey", borderRadius : 4 }} >
                        <div style={{ position:"relative"}}  >
                            <p>item and tools</p>
                            <div>
                                Table : { tt.state.editor.currTable} , Col : { tt.state.editor.currCol}
                            </div>
                            
                            <div>
                                <p>link cols</p>
                                <button
                                    onClick={
                                        function(){
                                            additmeTable()
                                        }                                        
                                    }
                                >add</button>
                                <div style={{ position:"relative",float:"left", width:150,height:150, border : "solid thin lightgrey", borderRadius : 4,  margin : 2 }}>
                                    {tablesE}
                                </div>
                                <div style={{ position:"relative",float:"left", width:150,height:150, border : "solid thin lightgrey", borderRadius : 4, margin : 2}}>
                                    {colsE}
                                </div>
                                <div style={{ clear:"left" }}></div>
                            </div>
                        </div>
                        <p>create functions</p>
                        <div style={{ position: "relative" , width : undefined , padding : 10}} >
                            <div style={{ position : "relative" , "float" : "left" , padding : 10  }}>
                                <div style={{ position : "relative" }}>
                                    <p>cGroups - inactive ( curr selected :  {tt.state.editor.currcGroupsIname + " - " /* tt.state.editor.currcGroupsI*/} )</p>
                                    <div style={{ position : "relative"  }} >
                                        <input value={tt.state.cGroupsIaddtext }
                                            onChange={
                                                function(e){
                                                    tt.setState({ cGroupsIaddtext : e.target.value})
                                                }
                                            }
                                        />
                                        <button
                                            style={{fontSize : 12}}
                                            onClick={
                                                function(){
                                                    var nv=tt.state.cGroupsI
                                                    nv.push({ name : tt.state.cGroupsIaddtext , uuid : uuidv4()})
                                                    tt.setState({  cGroupsI : nv})
                                                }
                                            }
                                        >create group</button>
                                        {cGroupsIE}
                                    </div>
                                    
                                </div>
                                <p>cGroups - active ( curr selected :  {tt.state.editor.currcGroupsAname + " - " /* tt.state.editor.currcGroupsA */ } )</p>
                                <div>
                                    <input value={tt.state.cGroupsAaddtext }
                                        onChange={
                                            function(e){
                                                tt.setState({ cGroupsAaddtext : e.target.value })
                                            }
                                        }
                                    />
                                    <button
                                        style={{fontSize : 12}}
                                        onClick={
                                            function(){
                                                var nv=tt.state.cGroupsA
                                                nv.push({ name : tt.state.cGroupsAaddtext, uuid : uuidv4() })
                                                tt.setState({  cGroupsA : nv})
                                            }
                                        }
                                    >create group</button>
                                    {cGroupsAE}
                                </div>
                            </div>
                            <div style={{ position : "relative" , "float" : "left" , padding : 10 }}>                                
                                <div style={{ position : "relative" , "float" : "left" , padding : 10 }}>
                                    <p>code items</p>
                                    curr : {currcGroupChildrenName} ({tt.state.editor.currcGroupsType + " - " + tt.state.editor.currcGroupsName })
                                    {cGroupChildrenE}
                                </div>                                
                                <div style={{ position : "relative" , "float" : "left" , padding : 10 }}>
                                    <p>Item</p>
                                    <button
                                        onClick={
                                            function(){
                                                generateItemCode()
                                            }
                                        }
                                    >
                                        generate
                                    </button>

                                    {codeItemE}

                                </div>
                                <div style={{ clear : "left" }}></div>
                            </div>
                            <div style={{ clear : "left" }}></div>
                        </div>

                        <div style={{ position:"relative",float:"left", width:500,height:500, border : "solid thin lightgrey", borderRadius : 4,
                                        margin : 2

                                    }}
                        >
                            preview
                            <div

                            >
                            </div>
                        </div>

                        <div style={{ clear:"left" }}></div>
                    </div>
                </div>
            )
        }()

        if ( wins["CDgenerate"].minme){

        }
        

        var codeGen1=function(){
            var rcmName1="rtest"
            var rcm=window.rcm;

            //jsfns.snippet("")

            var ltables=tt.state.tables;

            var listTables=function(){
                var ret=[]

                _.each(ltables,(r,i)=>{
                    ret.push(                             
                                r.name 
                            )
                })

                return ret
            }


            var listTableAndCols=function(){
                var ret={ tables : {}}
                _.each(tt.state.tables,function(r,i){
                    ret.tables[r.name]={}

                    _.each(r.cols,function(r2,i2){
                        ret.tables[r.name][r2.name]=r2
                    })

                })

                return ret;

            }

           
             // win style    
            
       

            return (
                <div style={{position: "relative" }}>
                    <div style={wins["CDgenerate"].style.win}
                        onClick={ 
                            function(e){wins["CDgenerate"].onClick(e,tt) } 
                            //function(e){}
                        }
                    >   
                        generate
                    </div>
                    <div style={wins["CDgenerate"].style.main}>
                        <button
                            onClick={
                                function(){
                                    //var code=rcm.all["rtest"].ed.getValue()
                                    //rcm.all["rtest"].ed.setValue("var a=function(){\n    var b=1\n    var c=2\n}\n\nvar d=4\n"  )
                                    
                                    
                                    var code=""

                                    //code=JSON.stringify(listTables())
                                    
                                    var tac=JSON.stringify( listTableAndCols()  ,null ,2 )

                                    if (tt.state.GCadd){
                                        code+=`var abc\n`
                                        code+=`\n`
                                        code+=`<button 
                                            onClick={
                                                function(){
                                                    addStuff(function(data){

                                                    })
                                                }
                                            }
                                        >add</button>\n`
                                        code+=`\n`
                                        code+=`\n`
                                        code+=`var addStuff=function(){`
                                        code+=` `
                                        code+=` `
                                        code+=` `
                                        code+=`fetch().then()`
                                        code+=` `
                                        code+=`}`
                                        code+=`\n`
                                        code+=`\n`
                                        code+=`//node code`
                                        code+=``
                                        code+=`...`
                                        code+=``
                                    }

                                    if (tt.state.GCedit){
                                        
                                    }

                                    if (tt.state.GCdel){
                                        
                                    }

                                    rcm.all[rcmName1].ed.setValue(code)

                                }
                            }
                        >generate</button>
                        <br/>
                            {
                                function(){
                                    var retEarr=[];
                                    var i=0;                                                             

                                    if (tt.state.GChasAdd){
                                        retEarr.push( 
                                            <div key={i++} style={{ float : "left" }} >
                                                <label style={{fontSize : 15}}>add</label>
                                                <input type="checkbox" checked={tt.state.GCadd} 
                                                    onChange={
                                                        function(e){
                                                            tt.setState( { GCadd :  e.target.checked })
                                                        }
                                                    }
                                                />
                                            </div> 
                                        )
                                    }

                                    if (tt.state.GChasDel){
                                        retEarr.push( 
                                            <div key={i++} style={{ float : "left" }} >
                                                <label style={{fontSize : 15}}>delete</label>
                                                <input type="checkbox" checked={tt.state.GCdel}
                                                    onChange={
                                                        function(e){
                                                            tt.setState( { GCdel :  e.target.checked })
                                                        }
                                                    }
                                                />
                                            </div> 
                                        )
                                    }

                                    
                                    if (tt.state.GCehasEdit){
                                        retEarr.push( 
                                            <div key={i++} style={{ float : "left" }} >
                                                <label style={{fontSize : 15}}>edit</label>
                                                <input type="checkbox" checked={tt.state.GCedit} 
                                                    onChange={
                                                        function(e){
                                                            tt.setState({ GCedit :  e.target.checked})
                                                        }
                                                    }
                                                />
                                            </div> 
                                        )
                                    }

                                    return  ( 
                                                <div 
                                                    style={{ }} 
                                                >
                                                    { retEarr } 
                                                    
                                                    <div style={{ clear : "left"}}></div>
                                                </div> 
                                            )

                                }()

                            }
                            

                        <br/>
                        <br/>
                        
                        <div style={{postion:"relative"}}>
                            <div
                                style={{ float:"left", width: 500, height : 250 , overflow : "scroll"  }}
                            >
                                reactjs
                                <br/>
                                
                                <Rcm name={rcmName1} showmenu={true} />                
                        
                            </div>  
                            <div
                                style={{ float:"left", width: 500, height : 250 , overflow : "scroll"  }}
                            >
                                html temp
                                <br/>
                                <Rcm name="htmltemp0" lang="htmlmixed"  />                
                        
                            </div>  
                            <div style={{clear:"float"}}></div>  
                        </div>  
                        <br/>
                        <br/>
                        
                        <div
                            style={{ width: 500, height : 250 , overflow : "scroll"  }}
                        >
                            nodejs
                            <br/>
                            <Rcm name="javascript"  />                
                    
                        </div>  
                    </div>  
                     
                </div>  
            )
        }()


        return (
            <div>
                { /* {CWindowPF("proj", projView, {parent : this})}  */ }
                
                {projView}
                

               
                {dbTasks}
            
            
                {codeGen1}
            
            
            
            
                {pageViews}

                
                
               
            </div>
        )
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Codegenc)