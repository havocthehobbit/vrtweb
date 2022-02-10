import React, { Component ,useLayoutEffect, useState } from 'react';
//import {useState , useEffect} from "react"
import {connect} from 'react-redux'
import _, { functionsIn, set } from "lodash"
import $gl from "./global"

import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';

import { v4 as uuidv4 } from 'uuid';

import {UnControlled as CodeMirrorControl } from 'react-codemirror2'
import CodeMirror from 'codemirror';

import cmm from '../custom/cmmode' 
import jsfns from './codegenjsfns';

require('codemirror/mode/xml/xml');
require('codemirror/mode/htmlmixed/htmlmixed');
require('codemirror/mode/javascript/javascript');
require('codemirror/mode/jsx/jsx');


require ('codemirror/addon/hint/show-hint');
require ('codemirror/addon/hint/sql-hint');
require ('codemirror/addon/hint/javascript-hint')
require ('codemirror/addon/hint/html-hint');
require ('codemirror/addon/hint/show-hint.css'); // without this css hints won't show
require ('codemirror/addon/search/match-highlighter');
require ('codemirror/addon/search/matchesonscrollbar');
require ('codemirror/addon/search/searchcursor');
require ('codemirror/addon/fold/foldcode');
require ('codemirror/addon/fold/foldgutter');
require ('codemirror/addon/fold/brace-fold');
require ('codemirror/addon/fold/xml-fold');
require ('codemirror/addon/fold/indent-fold');
require ('codemirror/addon/fold/markdown-fold');
require ('codemirror/addon/fold/comment-fold');
require ('codemirror/addon/fold/foldgutter.css');
//require('codemirror/mode/     // load other types 







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



var cmModes=[]
cmModes=cmm;


_.each(cmModes, function(r , i){

    CodeMirror.defineMode(r.name, r.fn)
    if (!_.isUndefined(r.defmime)){
        if (r.defmime!== ""){
            CodeMirror.defineMIME(r.defmime, r.name);
        }
        
    }

})





var jstest=`var a=function(){
    var b=1
    var c=2
}

var d=4
`

var mounted=0
//function Rcm({ global , globalChange}){
class Rcm extends React.Component {    
    constructor(props) {
        super(props); // always needed in scontructer
        
        
  
        if (props.style!==undefined){
            var style=props.style;
        }
        var name="";
        if (!_.isUndefined(props.name)){
            name=props.name;
        }
        //var lang="javascript";
        var lang="jsx";
        if (!_.isUndefined(props.lang)){
            lang=props.lang;
        }

        var showmenu=false;
        if (!_.isUndefined(props.showmenu)){
            showmenu=props.showmenu;
        }
        


        
        this.state={ uuid : "" , name : name , type : "", lang : lang, showmenu : showmenu
                     , displaySnippets : false
                     , snippetCurrentLang : "js",snippetCurrentCodeName : "" ,  snippetCurrentCode : "" 
                    , snippetPos : "left" , style : style
                }
        
        this.ed = {};

        if (_.isUndefined( window.rcm)){
            window.rcm = { all : {} }
        }
        
    }
    
    

    al=function(){
        //alert( this.state.uuid + " ---" + this.name)
    }

    componentDidMount() {
        var id=uuidv4()
        this.name=this.state.name
        this.uuid=id
        // browser globally accessabe variables and function , so that we can set and get values inside this component, using a variable we createing global caled rcm
        window.rcm.all[this.name]={ uuid : id , component : this ,name : this.name, al : this.al.bind(this) , ed : this.ed};
        // rcm["bad3f779-8128-457a-ab3c-21da1bb7c00c"].ed.setValue("12321323213") or getValue

        //window.rcm.list=function(){ _.each(window.rcm.all,function(r,p){   })}

        //  mode: ["text/jsx" , tt.state.lang] ,  CodeMirror.defineMIME(r.defmime, r.name);
        if (this.state.lang==="jsx"){
            CodeMirror.defineMIME("text/jsx", "jsx");
        }

        this.setState({ uuid : id})
    }

    componentWillUnmount() {
        delete  window.rcm[this.state.uuid]
    }    
    
    render() {
        var tt=this;

        var CSSdisplaysnippets="none";
        if (tt.state.displaySnippets){
            CSSdisplaysnippets="block"
        
        
        var insertTextAtCursor=function(editor, text) {
            var doc = editor.getDoc();
            var cursor = doc.getCursor();
            doc.replaceRange(text, cursor);
        }}

        var snippetsPos={ left : 0 , right : undefined}
        if ( tt.state.snippetPos==="right"){
            snippetsPos={ left : undefined , right : 0}
        }

        var cmstyle=tt.state.style
        var codemirrorOptions={
            mode: tt.state.lang, 
            /* mode: "javascript", */ 
            theme: 'material',
            lineNumbers: true,
            foldGutter : true,
            //htmlMode : true,
            gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
            //extraKeys: {"Ctrl-Space": this.autoComplete, "Ctrl-Q": function(cm){console.log("HEREEE"); cm.foldCode(cm.getCursor()); }},
            extraKeys: {
                            "Ctrl-Space": function(){ 
                                //tt.ed.showHint({ completeSingle: false })
                                tt.ed.execCommand('autocomplete');
                            ; }
                            ,"Alt-H": function(){ 
                                tt.ed.showHint({ completeSingle: false })                                            
                            ; }
                            ,"Ctrl-Q": function(cm){                                            
                                alert( "alt+H: hint ;\n ctrl+space : autocomplete")
                            }
                    },
            highlightSelectionMatches: {showToken: /\w/, annotateScrollbar: true}
    
        }

        if (tt.state.lang==="html"){
            codemirrorOptions.mode="xml"
            codemirrorOptions.htmlMode=true

        }

        return(
            <div style={{ textAlign : "left"}}>
                { /* react code mirror */}
                {
                    function(){
                        if (tt.state.showmenu){

                            return (

                                <div
                                style={{ postion : "relative",padding : 5, margin : 5, marginBottom : 0  }}
                               >
                                    <button
                                        style={{ postion : "relative", background:"lightgrey",color : "black"
                                                ,fontSize : 15, height : 20 , widght : 100 , margin : 0, padding : 3
                                                ,zIndex :999
                                            }}  
                                        onClick={
                                            function(){
                                                
                                                //tt.ed.setValue( jsfns.snippets.js.var )
                                                tt.setState({ displaySnippets : !tt.state.displaySnippets } )

                                            }
                                        }
                                        
                                    >snippets</button>
                                </div>

                            )
                        }                        
                    }()

                }

                { /* main snippets box */}

                <div
                    style={{ position : "fixed" , display : CSSdisplaysnippets , zIndex : 9999
                        ,background : "white", color : "black"
                        ,width : 600, height : 400
                        ,left : snippetsPos.left, top : 0 , right : snippetsPos.right
                        ,border : "black thin solid"
                    }}
                >
                    <div
                        style={{ position : "absolute", top : 0 , left : 200, background : "grey", color : "black"}}
                    >
                        <div
                            style={{float : "left", cursor : "pointer", margin : 2, padding : 2,border : "solid thin black", background : "lightgrey", fontSize : 8}}
                            onClick={
                                function(){
                                    tt.setState( { snippetPos : "left"} )
                                }
                                
                            }
                        >
                            left
                        </div>
                        <div
                            style={{float : "left", cursor : "pointer", margin : 2, padding : 2,border : "solid thin black", background : "lightgrey", fontSize : 8}}
                            onClick={
                                function(){
                                    tt.setState( { snippetPos : "right"} )
                                }
                                
                            }
                        >
                            right
                        </div>
                        
                    </div>
                    { /* close  snippets box */}
                    <div
                        style={{ position: "absolute" ,color : "white" ,background : "red" 
                                ,width : 20 , right : 0 , padding : 3 , margin : 4,cursor : "pointer"
                        }}
                        onClick={
                            function(){
                                tt.setState({ displaySnippets : false } )
                            }
                        }
                    >X</div>

                    { /* languages menu */}
                    <div
                        style={{ position : "absolute"
                                ,left : 0, top : 30
                                ,width : 80 , height : 350
                                ,padding : 3 , margin : 4
                                ,border : "black thin solid"
                                
                    
                    }}
                    >
                        {
                            function(){
                                var arrE=[]
                                var i=0;
                                _.each( jsfns.snippets,function(r ,p){

                                    if (p==="thisRoot"){return}

                                    arrE.push( 
                                        <div key={i}
                                            langname={p}
                                            style={{ cursor : "pointer" ,fontSize:10 }}
                                            onClick={
                                                function(e){
                                                    tt.setState({ snippetCurrentLang: e.target.getAttribute('langname') })
                                                }
                                            }
                                        >
                                            {p}
                                        </div>

                                    )

                                    i++;
                                })

                                return(
                                    <div
                                    >
                                        {arrE}
                                    </div>
                                )
                            }()
                        }
                    </div>

                    { /* snippets from selected language */}
                    <div
                        style={{ position : "absolute"
                                ,left : 85, top : 30
                                ,width : 80 , height : 350
                                ,padding : 3 , margin : 4
                                ,border : "black thin solid"
                                
                    
                    }}
                    >
                        {
                            function(){
                                var arrE=[]
                                var i=0;
                                _.each( jsfns.snippets[tt.state.snippetCurrentLang].all,function(r ,p){

                                    arrE.push( 
                                        <div key={i}
                                          codesnippetname={p}
                                            style={{ cursor : "pointer" ,fontSize:10 }}
                                            onClick={
                                                function(e){
                                                    var codename= e.target.getAttribute('codesnippetname') 
                                                    tt.setState({  
                                                        snippetCurrentCodeName  : codename
                                                        ,snippetCurrentCode : jsfns.snippets[tt.state.snippetCurrentLang].all[codename].code
                                                    
                                                    })
                                                }
                                            }
                                        >
                                            {p}
                                        </div>

                                    )

                                    i++;
                                })

                                return(
                                    <div
                                    >
                                        {arrE}
                                    </div>
                                )
                            }()
                        }
                    </div>

                    { /* snippet code box */}
                    <div
                        style={{ position : "absolute"
                                ,left : 183, top : 30 
                                ,width : 350, height : 350
                                ,padding : 3 , margin : 4
                                ,border : "black thin solid"
                    
                        }}
                        
                    >   
                        <button
                            onClick={
                                function(){
                                    insertTextAtCursor(tt.ed, tt.state.snippetCurrentCode)
                                }
                            }
                        >insert</button>
                        <textarea                         
                                style={{ width : 340, height : 300 , overflow : "scroll",overflowWrap: "normal",whiteSpace: "pre" }}
                                value={ tt.state.snippetCurrentCode } 
                                onChange={
                                    function(){}
                                }
                                onClick={
                                    function(e){
                                        
                                    //clipboard
                                       // navigator.clipboard.writeText(e.target.value) // #todo , only works with https 
                                    }
                                }
                        />
                    </div>
                </div>


                <CodeMirrorControl
                    style={cmstyle}
                    editorDidMount={(editor) => { tt.ed = editor } }                    
                    value={jstest}
                    options={codemirrorOptions}                   
                    onChange={(editor, data, value) => {
                        this.setState({value});
                    }}
                    onUpdate={(editor) => {
                        //editor.showHint({ completeSingle: false });
                    }}
                />
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Rcm)