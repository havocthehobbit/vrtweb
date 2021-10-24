//take name of last line module.exports.?????=main  // ????? is your custom name of your library , so change it after copying or using this template example to whatever your custom library should be named

var al3=function(){

    console.log("testing al3")
}

var al4=function(){

    console.log("testing al4")
}


 
module.exports.testmod2={ al3 : al3 , al4 : al4, auto_run : function(){ console.log("auto_running")} }
