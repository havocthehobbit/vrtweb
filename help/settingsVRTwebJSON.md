
"host" : "localhost",
"port" : 3001,

"use_dot_env_secrets" : false, 
"dot_env_secrets_path" : "./",
"jwt_secret" : "jwtSecret_randomtest1244",
"cookieSecret" : "some_secret_1234",

"use_db_localfile" : true,
"db_localfile" : "db1",

"app_setup_notes" : "",

"httpProtoString" : "http", - https or http ; securing with ssl certs 
"sslkey" : "../.cert/key.pem",
"sslcert" : "../.cert/cert.pem",

"uploads" :"../data/usershome"

cookieExpires :  -  milli seconds //10 * 365 * 24 * 60 * 60 * 1000 === 315360000000, or 10 years in milliseconds