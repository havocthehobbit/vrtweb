/login
========
    purpose : 
    ------------
        to get JWT token to use with site api's
    
    curl (shell)
    ------------------

        curl -H "Origin: *"   -H "Access-Control-Request-Method: POST"   -H "Access-Control-Request-Headers: X-Requested-With" -H "Content-Type: application/json"   -X POST   --data '{ "userid" : "johndoe" , "password" : "abc123"  }'  http://hostIP:3001/login

    returns
    ========>>>>>>
        

        {"data":{"loggedin":true,"auth":true,"token":"???storeThisSafelyForLaterUse"},"status":0,"error":"","sent_resposne":true}

/users
    curl (shell)
    ------------------

        curl  -H "Access-Control-Request-Method: POST" -H "Content-Type: application/json" -H "x-auth-token: ?????RANDOM_VALID_JWT_TOKEN?????"  -X POST --data '{  "cmd" : "getUserDetail"  }'  http://hostIP:3001/users

/news  
========
    curl (shell)
    ------------------
        
        curl -H "Origin: *"   -H "Access-Control-Request-Method: POST"   -H "Access-Control-Request-Headers: X-Requested-With" -H "Content-Type: application/json"  -H "x-auth-token: ?????RANDOM_VALID_JWT_TOKEN?????" -X POST --data '{  : "get"  }'  http://hostIP:3001/news


    fetch (js) 
    -------------------

        var host=$gl.fn.getHost();
        var port=$gl.fn.getPort()
        var protocall=$gl.fn.getProtocall();


        var fparams=new $gl.fetchPostCors();

        fparams.body=JSON.stringify( { type : "get"} );
        var url=protocall + "//" + host + ":" + port + "/news";

        fetch(url, fparams  )
        .then(response => response.json())
        .then(data => {             
                cb(data);
        }).catch((err)=>{
            cb({},err)
        })