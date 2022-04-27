const { type } = require('os');
const readline = require('readline');

var $bfns=require("./l_node_modules/basic_fns.js").main;
var $cn=require("./l_node_modules/basic_fns.js").$cn;

var q_i=0
var q = function(questions ,allanswers , cb ){

    
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });


    var response;

    var q0=""

    var QisString=false
    var AisString=false
    var AisArray=false
    var AisObject=false


    if (arguments.length===2){
        cb=arguments[1]
       // allanswers=undefined
    }

    //console.log( "\n\n" , q_i ," --- > " ,questions[q_i]  , "===  " , questions , "\n\n" )

    if (typeof(questions)==="object" || typeof(questions)==="Object"){
        if (Array.isArray(questions)){
            q0=questions[q_i] 
        }
        
    }
    if (typeof(questions)==="string" || typeof(questions)==="String"){
        q0=questions
        QisString=true
    }

    // default to objext as answer , 
    if (typeof(allanswers)=="Object"){
        if (Array.isArray(allanswers)){
            allanswers=[]
        }else{
            allanswers={}
        }

    }else{

        if (typeof(allanswers)==="string" || typeof(allanswers)==="String"){
            AisString=true
        }else{
            
            if (typeof(allanswers)==="undefined" || typeof(allanswers)==="Undefined"){
                allanswers={}
                AisObject=true
            }else{
                if (QisString){
                    allanswers=""
                }else{
                    allanswers={}
                    AisObject=true
                }
            }
        }
    }

    rl.setPrompt(q0);
    rl.prompt(); // shows the prompt

    rl.on('line', (userInput) => {
        response = userInput;
                      
        rl.close();
    });

    rl.on('close', () => {
        
        

        if (AisObject){
            allanswers[q_i]=response
        }  
        if (AisString){
            allanswers=response
        }
        if (AisArray){
            allanswers.push(response)
        }

        cb(response, allanswers, q_i , q0)

        if (!QisString){
            if (q_i>=questions.length-1){

                return
            }
    
        }

        if (!QisString){

            q_i++

            //q(questions,allanswers,cb)
            q.apply(this,arguments)
        }
        
        
        
        return ;
    });
};
///////////////////////

var cl=function(){
    console.log.apply(this ,arguments)
}

// OS clrar screen
//'use strict';
//process.stdout.write('\x1Bc'); 

var MenuShow=function(){
   

    var menutext=""
    menutext+="MENU" + "\n"
    menutext+="====" + "\n"
    menutext+="====" + "\n"


    menutext+="#0 - first install run ." + "\n"
    menutext+="#1 - run program  ( nodeapp/cstartdev.sh ) ." + "\n"
    menutext+="#2 - " + "\n"
    menutext+="#3 - " + "\n"
    menutext+="#q - exit ( or 'e' or 'exit' " + "\n"



    menutext+="====" + "\n"
    cl( menutext)

}


//var ques=["name? : " , "car? : "]
var ques="please enter an menu item (code/number/char or type q and enter to quit ? "
var answers

console.clear()
MenuShow()

var qargs=[ques ,answers ,function(resp , resps, next , question ){
        //console.log(resp , " --- " , q0);
        //console.log(resp)


        if (resp===""){
            console.clear()

        }

        if (resp==="0" ){
            console.clear()
            var tmp
            tmp=$bfns.shellsync("node app.js --install")
            cl( tmp.toString())
            //process.exitCode=111
            process.exit(0)
        }


        if (resp==="1" ){
            //console.clear()
            var tmp
            //tmp=$bfns.shellsync("./cstartdev.sh")
            //cl( tmp.toString())
            //process.exitCode=555//set exit code 
            process.exit(88) // code must be less then certwain value 555 didnt work for me , looks like less then 250
            return
        }


        if (resp==="q" || resp==="e"  || resp==="exit"  || resp==="exit"  ){
            console.clear()
            process.exit(0)
        }



        MenuShow()
        q.apply(this, qargs)
        
    }
]

q.apply( this , qargs );


