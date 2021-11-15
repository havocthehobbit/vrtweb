#this is for generating local certificates for testing in dev mode and is not for production 
    in react dev mode for react my-app: ( quick add method, not best method)
        #Change your package.json file to include https, remember you will also need to read and change the nodejs setup to have https not only this    
        add HTTPS=true to your package js file

        Before
            "scripts": {
                "start": "CHOKIDAR_USEPOLLING=true react-scripts start",
        After
            "scripts": {
                "start": "HTTPS=true CHOKIDAR_USEPOLLING=true react-scripts start",


    another method is to install actual certs
        #optional install brew and mkcert
            make  your server a cert
    un this then follow instrucitons on screen after
                cd /tmp
                #install brew ...its a nice package installer with extras 
                /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

                #https://www.freecodecamp.org/news/how-to-set-up-https-locally-with-create-react-app/ and https://github.com/FiloSottile/mkcert
                brew install mkcert
                # Install nss (only needed if you use Firefox)
                brew install nss

                # Setup mkcert on your machine (creates a CA)
                mkcert -install



                # Create .cert directory if it doesn't exist in the root of #your webvrt project  ( it should be already commented out on your git ignore but if not add it to gitignore)
                mkdir -p .cert

                # Generate the certificate (ran from the root of this project)
                mkcert -key-file ./.cert/key.pem -cert-file ./.cert/cert.pem "localhost"
                mkcert -key-file ./.cert/key_cert_vrtw.pem -cert-file ./.cert/cert_vrtw.pem "vrtwebdev" #may need to create host file entry for this to point it to your IP

                #now add the HTTPS=true paramer as a prefect to your start scriprs in package.json file for your react
                "scripts": {
                        "start": "HTTPS=true SSL_CRT_FILE=./.cert/cert.pem SSL_KEY_FILE=./.cert/key.pem react-scripts start",


                # and in nodejs you can point your certs to these new cert files too
                # edit database/settings.json
                 "httpProtoString" : "https",
                "sslkey" : "../.cert/key.pem",
                "sslcert" : "../.cert/cert.pem"