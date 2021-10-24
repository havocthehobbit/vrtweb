
import CodeMirror from 'codemirror';

var cmm=[]
var snips={}

// example
/*
// optional : add a codemirror mode/language like this, function will mimic functions similar or same as the offical codemirror2 mode functions, search codemirror online for more details 
cmm.push(
    {
        name : "modename",
        defmime : "", // example -> defmime :  d"text/x-vbscript",    // leave blank if no mime type
        fn : function(conf, parserConf) { // add code mirror linter function code here 

        }
    }
)


// optional : add snippets to customer snippits module or codemirror component additional menu // please note these are not linked to codemirror itself but apart of custom snippets menu for example when added the menu prop = true to the Rcm component, you will get a snippets button that gives a popup window
snips["New_snippets "]={
 
    all : {
            createdb : {
                name : "create database", desc : "this creates a database ",
                param : { replacers : {} }, catogory : [] , tags : [],
                code : 
                        `const mcdb= require("magicCusotmerDb")
                            
                         var db=mcdb({ connect : "localhost" , user : "me" , "pass" : "pass123" })

                         db.run( "select * from abc where abc.name='John Doe' ",(records)=>{
                                 console.log(record[0] )
                         })
                        `
                }
            ,addTable :{
                name : "",desc : "",param : { replacers : {} },
                code : 
                `
                `
                }

    }
}

*/


snips["python"]={
 
    all : {
            createdb : {
                name : "create database", desc : "this creates a database ",
                param : { replacers : {} }, catogory : [] , tags : [],
                code : 
                        `const mcdb= require("magicCusotmerDb")
                            
                         var db=mcdb({ connect : "localhost" , user : "me" , "pass" : "pass123" })

                         db.run( "select * from abc where abc.name='John Doe' ",(records)=>{
                                 console.log(record[0] )
                         })
                        `
                }
            ,addTable :{
                name : "",desc : "",param : { replacers : {} },
                code : 
                `
                `
                }

    }
}




export const snippets=snips;
export default cmm;