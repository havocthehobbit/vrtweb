import { CommentOutlined } from "@ant-design/icons"

//to start use can run webapp for development mode ,run the startme.sh from .../my-app folder and run node app.js from the .../nodeapp folder or nodemon app.js or nodemon  -L app.js
cd // to where ever you have this project copied
cd my-app
./startme.sh
# // with a seperate session 
cd // to where ever you have this project copied
cd nodeapp
nodemon -L app.js



//do build the  the front end react project, run this command and after its completed it will create a build directory , that has all the html and javascript code a production server needs to run the front end app , just remember the front ,which your production enviroment can then have a copy of this project if you want and just needs the data folder , nodeapp folder and my-app folder ,except it will not need all the other folder in my-app exceot for build and public. which will make it alot smaller in folder size
//cd to my-app
npm run build


// customising code
// custom code that can be edited for different systems, companies , sites can be found in these locations 
.../my-app/src/custom
    // defaults that can be amended to add functionality 
    .../my-app/src/custom/CommentOutlined.js // this is for the codemirror editor , you can add custom programming languages or custom modes ,see codemirror2 to understand more , however the basics are that you create a name for the custom language and function that has all the code linting rules and then you can use the <Rcm/> (import it from ../common/rcm) component/element, in a of components 


//Solving common problems
/////////////////////////////////

//EONT port already in use 
 // this means the port is already in use , you can find out which process is using the port if you know the port number by greping it with a netstat
 // netstat -nltp | grep -E thePortNUmbers , then the last column should show the port number if it exists which you can run a kill command on 
 netstat -nltp | grep -E "3000|3001" 





// WSL2 fix for auto refresh/hot reload not working 
// packagjson ... if hot reload doesnt work on a vm or wsl , then react needs a proxy parameter , added to the script
// sextion in package json , https://github.com/facebook/create-react-app/issues/10253
// before : "start": "react-scripts start",
"start": "CHOKIDAR_USEPOLLING=true react-scripts start",
