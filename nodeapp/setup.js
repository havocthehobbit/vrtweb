
console.log("setup" ,"\n================")

var fs=require("fs")
var depcy={
    recs : [],
    check : function(){
        this.recs.forEach(function(r,i){
            var status=true
            var type="f"
            if (r.type==="file" || r.type==="f"){
                if (fs.existsSync(r.file)) {
                    status=true 
                    type="f"                  
                }else{
                    status=false
                    console.log(`\n\n\nerror : ${r.file} doenst exists\n\n\n`)
                }
            }

            if (!status){
                console.log(`updating from template file : ${r.file}` )

                if (type==="f"){
                    if (r.res.action==="fetchtemplate"){

                        if (!_.isUndefined(r.test)){
                            if (r.test){
                                return;
                            }
                        }

                        var cmdinit=`cp -Rp ${r.res.src } ${r.file}`
                        console.log(cmdinit)
                        $gl.shell(cmdinit , function(result){ console.log("shell resukt : " ,result)})
                        
                    }
                }

            }
            

        })
        
    },
    add : function(rec){
        this.recs.push(rec)
    },
    init : function(){
        this.check()
    }


}

depcy.add({ name : "custommenus", file : "../my-app/src/components/custom/custommenus.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/custommenus.js" } })
depcy.add({ name : "cmmode", file : "../my-app/src/components/custom/cmmode.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/cmmode.js" } })
depcy.add({ name : "frontpage", file : "../my-app/src/components/custom/frontpage.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/frontpage.js" } })
depcy.add({ name : "frontpage", file : "../my-app/src/components/custom/globalStateReducer.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/globalStateReducer.js" } })
depcy.add({ name : "customPageMainApp", file : "../my-app/src/components/custom/customPageMainApp.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/customPageMainApp.js" } })
depcy.add({ name : "custommenus", file : "../my-app/src/components/custom/custommenus.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/custommenus.js" } })
depcy.add({ name : "cmmode", file : "../my-app/src/components/custom/cmmode.js" , type :  "f" , res : { action : "fetchtemplate" , src : "../my-app/src/components/templates/cmmode.js" } })


depcy.init()

