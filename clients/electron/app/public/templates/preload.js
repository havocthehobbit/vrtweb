// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
const { contextBridge, ipcRenderer , webview} = require("electron");

// As an example, here we use the exposeInMainWorld API to expose the browsers
// and node versions to the main window.
// They'll be accessible at "window.versions".

process.once("loaded", () => {
    contextBridge.exposeInMainWorld("versions", process.versions);
    contextBridge.exposeInMainWorld("versions2", process.versions);
    
    console.log("...")

    contextBridge.exposeInMainWorld('electron', {
      test :  ()=>{        
        return  { "name " : "rob" }
      },
      test2 : async ()=>{
        var a
        a=await new Promise( (res)=>{  
                                        res({ "name " : "rob" } )
                                    } 
                              )
        return   a
      },
      test3 : async (message)=>{
        var ret
        ret=await new Promise( (res)=>{  

                                        ipcRenderer.invoke('getstuffPromch',message).then((data)=>{ 
                                                              
                                                                res(data)
                                                          })
                                        return
                                        
                                    } 
                              )
        return ret
      },
      Webview : webview,
      hello : (message)=> {
        ipcRenderer.send('helloch', message);
      },
      getStuff: (message)=> {
        ipcRenderer.invoke('getstuffch',message)//.then((result)=>{console.log( "preload res getstuff : " , result); return result});
      },
      getStuffProm: async (message)=> {
        ipcRenderer.invoke('getstuffPromch',message).then((data)=>{ console.log(data) ;return data})//.then((result)=>{console.log( "preload res getstuff2 : " , result) ; return new Promise( function(res){ res(result) }  )  });
      },
      getStuffSS: (message)=> { 
        ipcRenderer.sendSync('getstuffSS',message)
      },         
      
    });
})