# Update Notes



## Reactjs


### experiences

#### upgrading to nodejs 19
    * found that one could get a one liner t??? memory error wihtout indicating what caused the error in a dump or stack trace. One location I narrowed this down to once has been when requiring ssh2 libs/modules. After some time of trying different things, I ended up delteing the entire ./node_modules directory and doing a "npm i" install again, which means some old files somewhere in the 3rd party modules folder had cached or old data that caused issues with the module.
    

#### upgrading to 18
    * backing up project App.js file,package.json and general my-apps folder is advised. As upi will need to overwrite most my-app base file with create-react-app based files, except for  in /srcApp.js and /src/components folder.
