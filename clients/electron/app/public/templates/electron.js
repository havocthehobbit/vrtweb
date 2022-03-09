// Module to control the application lifecycle and the native browser window.
const { app, BrowserWindow, protocol , Menu, Tray , Notification  , remote ,  ipcMain  } = require("electron");
const electron = require("electron");
const { resolve } = require("path");
const path = require("path");
const url = require("url");
const Store = require('electron-store');


const store = new Store();


let tray = null  ///// #tray ////////////////////
// Create the native browser window.
var globalWindow=undefined
console.log("\n\n\n", "starting electron.js app", "\n\n\n")

function createWindow() {
  console.log("\n\n\n", "createWindow", "\n\n\n") 
  const mainWindow = new BrowserWindow({  // https://www.electronjs.org/docs/latest/api/browser-window
    title:"My First App",
    //frame:false, // remove top drop down menu . including minimise and close etc // run this funciton after to just remove menu bar  mainWindow.removeMenu()
    width: 800,
    height: 600,
    //maxHeight:600,
    //maxWidth:600,
    //minHeight:400, 
    //minWidth:400,
    //backgroundColor:'#7B435B',
    //icon: getAssetPath('icon.png'),

    // Set the path of an additional "preload" script that can be used to
    // communicate between node-land and browser-land.
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      // //nodeIntegration: true,
      //enableRemoteModule:true,
      webviewTag:true,  // https://stackoverflow.com/questions/39022538/cant-use-electrons-webview-attributes-in-react-component  // https://supersami.medium.com/injecting-javascript-inside-electron-webview-a64c8dc0cb38
      // //backgroundThrottling: false


      //webSecurity: true,
      //nodeIntegration: false,
      //contextIsolation: true,
      //enableRemoteModule: false,
    },
    
  }); 

  // In production, set the initial browser path to the local bundle generated
  // by the Create React App build process.
  // In development, set it to localhost to allow live/hot-reloading.
  const appURL = app.isPackaged
    ? url.format({
        pathname: path.join(__dirname, "index.html"),
        protocol: "file:",
        slashes: true, 
      })
    :  "http://localhost:3000";//"http://192.168.1.3:3000" // "http://localhost:3000";
  mainWindow.loadURL(appURL); 

  // Automatically open Chrome's DevTools in development mode.
  if (!app.isPackaged) {
    mainWindow.webContents.openDevTools();
  }
 

  //////////////////////////////
  /////////////////////////////
  //mainWindow.setAlwaysOnTop(true, 'screen');  //// non standard #newstuff always on top

  return mainWindow
} 

// Setup a local proxy to adjust the paths of requested files when loading
// them from the local production bundle (e.g.: local fonts, etc...).

function setupLocalFilesNormalizerProxy() {
  protocol.registerHttpProtocol(
    "file",
    (request, callback) => {
      const url = request.url.substr(8);
      callback({ path: path.normalize(`${__dirname}/${url}`) });
    },
    (error) => { 
      if (error) console.error("Failed to register protocol");
    }
  );
}



// Quit when all windows are closed, except on macOS.
// There, it's common for applications and their menu bar to stay active until
// the user quits  explicitly with Cmd + Q.
app.on("window-all-closed", function () {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// If your app has no need to navigate or only needs to navigate to known pages,
// it is a good idea to limit navigation outright to that known scope,
// disallowing any other kinds of navigation.
const allowedNavigationDestinations = "https://my-electron-app.com";
app.on("web-contents-created", (event, contents) => {
  contents.on("will-navigate", (event, navigationUrl) => {
    const parsedUrl = new URL(navigationUrl);

    if (!allowedNavigationDestinations.includes(parsedUrl.origin)) {
     // event.preventDefault();
    }
  });
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.

///////////////////////////////////////


const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Main process'

///*
function showNotification () {
  new Notification({ title: NOTIFICATION_TITLE, body: NOTIFICATION_BODY }).show()
}
//*/


// This method will be called when Electron has finished its initialization and
// is ready to create the browser windows.
// Some APIs can only be used after this event occurs.
//app.removeAllListeners('ready') 
app.whenReady().then(() => { // mainForm
    console.log("\n\n\ncreating stuff\n\n\n")
  var mainWindow=createWindow();
  //setupLocalFilesNormalizerProxy();

  //mainWindow.hide()
  globalWindow=mainWindow

  // mainWindow.minimize(); // minimise

  setTimeout(function(){
        //globalWindow.hide()
        //globalWindow.show()
        //electron.BrowserWindow.getFocusedWindow().show();
       // globalWindow.setVisibleOnAllWorkspaces(true);
     }
     ,4000 )// bring to front 3 seconds later


  app.on("activate", function () { 
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) {
      //createWindow();
    }
  });
});
 

app.whenReady().then(() => {
   // createWindow(); // craeat a second window
  //setupLocalFilesNormalizerProxy();
    console.log("\n\n\ncreating stuff 2\n\n\n")
    /////////// start tray #tray ////////////////////
  tray = new Tray(   path.join(__dirname, "VRTWtemp1"))
  const contextMenu = Menu.buildFromTemplate([
    { label: 'Item1', type: 'radio' ,
              click: async () => { 
                globalWindow.removeMenu()
              }
    
    },
    { label: 'Item2', type: 'radio' },
    { label: 'Item3', type: 'radio', checked: true  },
    { label: 'notify me', type: 'radio' , 
            click: async () => {
                globalWindow.show()
                showNotification()
                //const { shell } = require('electron')
                //await shell.openExternal('https://electronjs.org')
            }
    }
  ])
  tray.setToolTip('This is my application.')
  tray.setContextMenu(contextMenu)
  /////////// end tray #tray ////////////////////
})

//app.whenReady().then(showNotification)


ipcMain.on("helloch",function(event ,args){
  console.log("hello --> send -->helloch  --> on : " ,args)
  globalWindow.webContents.send("pong", "Hello!");
  
})

 

ipcMain.handle("getstuffch", async function(event ,args){

  console.log("getStuff --> invoke --> handle --> getstuffch : " ,args)

  return "invoked stuff returned"

})

ipcMain.handle("getstuffPromch", async function(event ,args){

  console.log("getStuffProm --> invoke --> handle --> getstuffPromch : " ,args)

    var retval=await sleep(2000)
    console.log( "\n\n\n","wait 4 done : " , retval, " " , typeof retval,  "\n\n\n")
    
    return  retval
})

var sleep=function(ms){
  return new Promise(function(resolve){
      setTimeout(function(){ resolve( "I waited 4 seconds and my value is 123") }, ms)
  })

}


ipcMain.on("getstuffSS" , function(event, args){
  console.log("\n\n\n", "getstuffSS : ", args ,  "\n\n\n")
  var retval=123456
   event.returnValue=retval
} )




