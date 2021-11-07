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
    
    sftp_get - fetch file over sftp.        
        (remoteHostPath,localPath, {ftp : {host : str, port : int [, username : str] [,password : str]}}, path)
    sftp_getDir - get directory/folder files and contents
        ...
    sftp_put - 
        (localPath,remoteHostPath, {ftp : {host : str, port : int [, username : str] [,password : str]}}, path)
        ...
    sftp_putDir -
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
    stime-
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

    searchJS -
        ...
        searchJS( [{ name :"joane"} , { name : "rob" }] ,"j" , "name" )
        or
        searchJS( { data : [{ name:"rob"},{ name:"abe"}] , key : "name" , search:"ro" } )
    
    

    internal system
    =================
    autoLoadModules -
        ...