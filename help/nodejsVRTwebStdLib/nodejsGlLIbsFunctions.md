#
    common functions
    =================================
    get_json_db - load json file Async
        (filepath,callback) - 
    get_json_db_sync - 
        [var str=](filepath,filepath[,callback]) - 
    save_json_db - load json file synchronously
        (filepath,JSONdata,callback)   
    save_file -
        (filepath,text,callback)
    load_file - load file text
        (filepath,callback(text,err))   
    
    sftp_get - fetch file over sftp.        
        (remoteHostPath,localPath, {ftp : {host : str, port : int [, username : str] [,password : str]}}, path)
    sftp_getDir - get directory/folder files and contents  // all conents of directoru , does not create directry itself
        ...
    sftp_put - 
        (localPath,remoteHostPath, {ftp : {host : str, port : int [, username : str] [,password : str]}}, path)
        ...
    sftp_putDir - // all conents of directoru , does not create directry itself
        ...
    sftp_list - 
        list contents of a remote folder
        ...

    shell - 
        run shell command on local server
        ( strCommand ) -  
    
    ssh - 
        (cmd , {conn : {host : str, port : int [, username : str] [,password : str]}} , cb)
        ...
    ssh_shell
        run multiple ssh commands        
        (cmd , {conn : {host : str, port : int [, username : str] [,password : str]}} , cb)
        ...cmd : eg : "uptime\nls -la\nexit\n" 
    ssh_prompt :
        run multiple command and respond to prompts 
         ( [{ cmd:str,prompt:str, response:str ,write:str ,noENTER:str,cb :()},{}], {conn : {host:str,username:str,pass:str,port : int}}, cb : (sshOuput) )
         .... eg : # example uses 3 parameter, it also prints out the answer to read input(q) that waited for an answer in variable q.
         (
             [
                 { cmd : "echo name" },{ cmd : "read q" , prompt : "read q", write:"bob123" ,cb :()=>{console.log("log123")} },{ cmd : "ls -la" },{ cmd : ("echo hello $q" }
             ]
            ,{conn:{host : "localhost", port : 22 , username : "user123" ,password : "123" }  }
            ,function(data){console.log("result : " ,data)}  
         )

    sdate-
        ...
    stime
        ...
    dateDiff -
        ( date1, date2 [, params][,cb]) --> { diff : 0s ,}
        ...
    uuid - generate uunique uid uuid V1
        () --> returns str
        ...
    
    uuid_sort -
        [] --> returns array
        ...
    
    csv_to_json_simple - 
        parse csv as json/jsObject
        (csv,delim,cb) ; delim=","
    
    json_to_csv -
        (jsObj , cb)

    csv_parse - 
        parse/convert csv to js object or json
        (strCSV , cb)
        ...

    tsv_parse - 
        parse/convert csv to js object or json
        (strTSV , cb)
        ...

    tsv_to_csv - 
        (jsObj , cb)

    batchRunTimed - 
        waterfall timed kick off a number of functions  evey few seconds
        (params, runitems_arr ,cb , cb_end){ // waterfall timed kick off 
             cb - function that will be kicked off every time , // you can add a secand parameter and run .next() member funciton to force it to run next function instead of waiting for interval
             cb_end , function that will be kicked off at the end 
            params -  {  count : 3,interval : 3000} // count , how many at a time to kick off  // interval - time to wait before kicking off the next batch

                example 1 : 
                            batchRun( 
                                        {  
                                            count : 3,interval : 3000 , 
                                            
                                        } , 
                                        custtest , 
                                        function(ret , next){ // ret - current array item ,   next.arr_len - remainder arr items left 
                                            // console.log( "running : ", new Date(), " - " ,ret)
                                            //or
                                            setTimeout(function(){ // essentionl is the FTP replacement funciton
                                                console.log( "running : ", new Date(), " - " ,ret)
                                                
                                            },2000)
                                            
                                        }, 
                                        function(){
                                            console.log( "...done" )
                                        }
                                )

                example 2 : 
                            batchRun( 
                                        {  
                                            count : 3,interval : 3000 , 
                                            waitfornext : true
                                        } , 
                                        custtest , 
                                        function(ret , next){                                       
                                            setTimeout(function(){ // for example ,you could replace this with a FTP replacement funciton
                                                console.log( "running : ", new Date(), " - " ,ret)
                                                next.next() // this will kick off the next one once the last one is finished
                                            },2000)
                                            
                                        }, 
                                        function(){
                                            console.log( "...done" )
                                        }
                                )

                example 3 : run one after eachother 

                            batchRun( 
                                        {  
                                            count : 3,interval : 3000 ,                                
                                        } , 
                                        custtest , 
                                        function(ret , next){
                                            console.log( "running : ", new Date(), " - " ,ret)

                                            next.next()

                                            return
                                        
                                        }, 
                                        function(){
                                            console.log( "...done" )
                                        }
                                )

    searchJS -
        ...
        searchJS( [{ name :"joane"} , { name : "rob" }] ,"j" , "name" )
        or
        searchJS( { data : [{ name:"rob"},{ name:"abe"}] , key : "name" , search:"ro" } )
    
    ,initMongoDB -
        ...
        (params,cb) { // paramse : { connection : { host : "localhost" , dbname : "some_db", dbpass : "" , dbuser : "" , dbport : "" }  }

    internal system
    =================
    autoLoadModules -
        ...