#
    common functions
    =================================
    get_json_db - (filepath,callback) - load json file
    get_json_db_sync - () - load json file synchronously
    save_json_db (filepath,JSONdata,callback)
    save_file (filepath,text,callback)
    
    sftp_get - (remoteHostPath,localPath, {ftp : {host : str, port : int [, username : str] [,password : str]}}, path)fetch file over sftp 
    sftp_getDir - get directory/folder files and contents
    sftp_put
    sftp_putDir
    sftp_list - list contents of a remote folder

    shell - ( strCommand ) - run shell command on local server 
    
    sdate
    stime

    uuid - generate uunique uid
    uuid_sort

    internal system
    =================
    autoLoadModules