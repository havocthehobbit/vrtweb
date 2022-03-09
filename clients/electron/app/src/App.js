import logo from './logo.svg';
import './App.css';

import { useEffect , useState} from 'react'

//const electron = window.require('electron'); // because this is in contectBridge on preload , i can call it from window
///const electron = window.electron; // because this is in contectBridge on preload , i can call it from window
//const remote = electron.remote
//const {BrowserWindow} = remote

//const fs = window.require("fs")


window.electron.hello(["this is rob"] , "whoare you") // call backend prelod function whihc sends message to main process which listens and kicks off function
//window.electron.getStuff(  "hi its me").then((data)=>{   console.log( "gs1 : " , data ) } )


var getStuff_val=""
var getStuff=async function(){
  //getStuff_val= await Promise.resolve( window.electron.getStuff( "hi its me") )
  getStuff_val= await window.electron.getStuff(  "hi its me") 

  
  //console.log( "gs1 : " , Promise.resolve(getStuff_val ))
  console.log( "gs1 : " , getStuff_val )
}
//getStuff()

var getStuffProm=async function(){
  //stuff= await Promise.resolve("test") //works
  //stuff= await Promise.resolve(window.electron.getStuffProm( "hi its me")) //works
  //return  stuff
  //var stuff= await new Promise((resolve, reject) => { 
   //                               resolve(window.electron.getStuffProm( "hi its me") )
                                  //resolve()
    //                  })
  //stuff= await Promise.resolve("test") //works
  //return  stuff

  var stuff=await window.electron.getStuffProm( "hi its me") 
  console.log( "gs_0_2" ,stuff) 
  return stuff
}


var getstuffSS=function(){ //synchroness
  var retval="loading4..."
    retval=window.electron.getStuffSS( "getstuffSS" , "getsss 123")
    console.log( "getstuffSS : " ,retval)
}
//getstuffSS()


//getStuffProm().then( (data)=>{ console.log( "gs2" ,data) })

var count=0
function App() {
  var [get_stuff, set_stuff]=useState("!!!!")

  useEffect(function(){
    count++
    if (count===1){
      //window.addEventListener('pong', (event) => {
        // ...
      //  alert("1 ")
      //});

      //window.addEventListener('getstuffch', (event) => {
        // ...
      //  alert("2")
      //});

      const webview = document.querySelector('webview')
      
      webview.addEventListener('dom-ready', () => {
        //webview.openDevTools()
        //console.log("webview ready")

        //setTimeout( function(){  webview.loadURL("https://github.com")   } , 5000 ) // this works
      })

    }

  })

  return (
    <div className="App">
      <div
         style={{ width : 500 , height : 500}}
      >
        <webview src="https://google.com" 
                style={{ width : 500 , height : 500}}
               
        />
        {/*<webview src="http://google.com" 
                style={{ width : 500 , height : 500}}
               
  /> */}
        
      </div>
      <header className="App-header"> 
          {get_stuff}
          <button 
              onClick={
                ()=>{
                  var dta2="..."
                  var dta="^^^^"

                  //getStuff()
                  console.log("test  :" , window.electron.test() )
                  window.electron.test2().then( (data)=>{ console.log("test2  :" , data ) } )
                  
                  //window.electron.getStuff(  "hi its me").then((data)=>{   console.log( "gs1 : " , data ) } )
                  //window.electron.getStuffProm( "hi its me").then(
                  //    (data)=>{   
                  //        console.log( "gs1 : " , data ) 
                  //   } )
                 
                  //window.electron.getStuffSS( "getstuffSS" , "getsss 123").then((data)=>{   console.log( "gs1 : " , data ) } )
                  
                  window.electron.test3().then( (data)=>{ console.log("test3  :" , data ) } )
                  
                  
                  //getStuffProm().then(function(somedata){ console.log(somedata)})

                  //getStuff().then((data)=>{ 
                  //    dta2=data ; set_stuff(dta2) 
                  //})
                 //set_stuff(dta)
                }
              }
          >
              click me          
          </button>
      </header>
    </div>
  );
}

export default App;
