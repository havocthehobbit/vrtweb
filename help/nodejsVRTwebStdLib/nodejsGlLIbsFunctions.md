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
    sftp_list - list contents of a remote folder
        ...

    shell - run shell command on local server
        ( strCommand ) -  
    
    sdate-
        ...
    stime-
        ...

    uuid - generate uunique uid
        ...
    
    uuid_sort -
        ...
    
    csv_to_json_simple - 
        parse csv as json/jsObject
        (csv,delim,cb) ; delim=","
    
    json_to_csv -


    searchJS -
        ...
        searchJS( [{ name :"joane"} , { name : "rob" }] ,"j" , "name" )
        or
        searchJS( { data : [{ name:"rob"},{ name:"abe"}] , key : "name" , search:"ro" } )
    
    

    internal system
    =================
    autoLoadModules -
        ...