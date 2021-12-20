import '../../App.css';
import '../../css_general/general.css';

import { useState , useEffect}  from 'react'

//import { BrowserRouter as Router, NavLink } from 'react-router-dom';
import { Router, NavLink } from 'react-router-dom';
import { Link, Switch, Route , Redirect, useRouteMatch, useParams } from 'react-router-dom';
import history from "./routerHist";

import Login ,  {isAuth , logout as logoutuser } from './login'
import Mainwall from './mainwall'
import Settings from './settings'
//import AllCalls from './impdata1'

import Codegenc from './codegenc'

import {customMenu} from  "../custom/custommenus"

import $gl from "./global"

import _ from "lodash"

import { HomeOutlined , SettingOutlined } from '@ant-design/icons'

import {connect} from 'react-redux'

//var SummaryCalls=AllCalls.SummaryCalls;

var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();
var url=protocall + "//" + host + ":" + port ;

const mapStateToProps = function(state , owsProps){
    return {
        count : state.count,
        loggedin : state.loggedin,
        theme : state.theme
    }
}
 const mapDispatchToProps = function(dispatch){
  return {
    login : function(){  dispatch({ type : 'login'})  },
    logout : function(){  dispatch({ type : 'logout'})  },
    addval : function(){  dispatch({ type : 'addval'})  }
    // some other reducer : function() { dispatch... }
  }
}


var logginCheckCount=0;
function MainApp({loggedin , login , logout , addval , theme}){

    var setting_def={ 
        defPage : "",
        
        loginPic : "" , hasLoginPic : false , loginPicStyle : {padding : 30 , margin : 30}

    }

    //var userdata_temp={ details : {groups : []} , perms : {}, runlast : new Date()}
    var userdata_temp={ details : {groups : []} , perms : {}}
    var [passFocus,setPassFocus]=useState(false);
    var [userDetail,setUserDetail]=useState({ details : {groups : []} , perms : {}});
    
    var [settings,setSettings]=useState(_.clone(setting_def));


    var userid=$gl.getCookie("userid")


    
    useEffect(function(){        
            getUserDetail(function(){
                
            }); 
            
            loginSettings(function(){})

        return function(){

        }
    },[])

    
    var getUserDetail=function(){
        var cb=function(){};
        if (arguments.length>0){
            cb=arguments[0]
        }

        var userdata =  _.clone( userDetail);

        isAuth( { userid : userid} , function(dt){
            if (dt.data.loggedin){
                login({"type" : "login"})

                $gl.getUserDetail(function(usr){                                
                    $gl.fetchPerms(function(perms){
                        _.each(perms.data,(val, prop)=>{
                            if (prop==="newsedit"){
                                //setCanAddNews(true);
                            }
                            return true                    
                        })
                        userdata.details=usr.data; 
                        userdata.perms=perms.data; 
                        //userdata.runlast = new Date()
                        if (_.isFunction(cb)){
                            cb()                           
                        }

                        logginCheckCount++;
                        setUserDetail(userdata); // userDetail
                        
                    })
                })

            }else{
                setPassFocus(true)
            }            
        })
    }
    
    var getLoginSettings=function(){       
        var args=arguments;

        var cb=function(){}
        
        var title="";
        var detail=""
        
        if ( args.length > 0){
            if (_.isPlainObject(args[0])){
                if (!_.isUndefined(args[0].cb)){
                    cb=args[0].cb
                }
                if (!_.isUndefined(args[0].title)){
                    title=args[0].title
                }
                
                if (!_.isUndefined(args[0].detail)){
                    detail=args[0].detail
                }
            }


            if (args.length > 1){
                cb=args[1];
            }
            if (_.isFunction(args[0]) ){
                cb=args[0]
            }
        }
        
        var fparams=new $gl.fetchPostCors();

        fparams.body=JSON.stringify( { type : "getLoginPage"  } );
        var url=protocall + "//" + host + ":" + port + "/settings";

        fetch(url, fparams
        )
        .then(response => response.json())
        .then(data => { 
                cb(data);
        })
    }
    var loginSettings=function(cb){
        var lsettings={

        }

        var temp=""


        getLoginSettings(function(dt){
    
            var temps=_.cloneDeep(settings)
            if (dt.data.loginPage.hasLoginPic){

                

                
                temps.hasLoginPic=dt.data.loginPage.hasLoginPic 
                temps.loginPic=dt.data.loginPage.loginPic
                temps.loginPicStyle=dt.data.loginPage.loginPicStyle

               
            }
               

            setSettings(temps)
            
        })
        return;

        temp="hasLoginPic"
        if (!_.isUndefined(lsettings[temp])){

        }
        temp="loginPic"
        if (!_.isUndefined(lsettings["temp"])){

        }


    }


    var loginstr=function(){
                                if (loggedin){
                                        logginCheckCount++;

                                        if (logginCheckCount===1){
                                            getUserDetail();
                                        }

                                        return $gl.getCookie("userid")
                                }else{ 

                                    return "logged out"
                                } 
    }();

    return (
        <div style={{ position : "relative"}} >
             {                
                function(){ 
                    
                    if (loggedin){ 

                        return ( 
                            <div style={{ left : "40%",position : "relative"}}>
                                <label>loggedin : {loginstr } </label>
                                                            
                                <input type='button' defaultValue='logout'  onClick={
                                                        function(){

                                                            logoutuser({} , function(){
                                                                logginCheckCount=0;
                                                                logout({"type" : "logout"}) ;
                                                                setUserDetail(_.clone(userdata_temp))
                                                            })
                                                            
                                                        }
                                                    }                                 
                                /> 
                            </div>
                        )
                    }
                }()
            }
            <Router history={history}>
                {   
                    function(){
                        if (loggedin){
                            var menu_width=500;
                            var menu_height=55;  
                            var textcolor= "white" ; 
                            var menutextcolor= "black" ;
                            var Linkstyle={color : textcolor};
                            var ctdivs_style={ color : menutextcolor , float : "left"  , width : 90, height : 30 , textAlign : "center" , padding : 5 , background : "lightgrey" , border : "solid thin grey" };
                            
                            //theme
                            if ( theme==="dark"){
                                ctdivs_style.color="white"
                                ctdivs_style.background="blue"
                                ctdivs_style.border="solid thin transparent"

                                Linkstyle.color="black"

                                document.body.style.backgroundColor = 'black';
                                document.body.style.color = 'white';                                
                            }
                            if ( theme==="light"){
                                document.body.style.backgroundColor = 'white';
                                document.body.style.color = 'black';
                                
                            }
                            
                            var ctdivs_style_small=_.merge(_.clone(ctdivs_style),{ width : 80 });
                            var ctdivs_style_mid=_.merge(_.clone(ctdivs_style),{ width : 100 });
                            var ctdivs_style_large=_.merge(_.clone(ctdivs_style),{ width : 150 });

                            //var menu_width=1250;
                            var or_menu_width=menu_width;
                              
                            var all_menus_arr=[]
                            var key_menu=0
                            if (true){
                                all_menus_arr.push(
                                    <div key={++key_menu}
                                        onClick={getUserDetail}
                                    >
                                        { /* <Link to={`${url}/3-1`}>Sub-page-1</Link> */ }
                                        <Link to='/mainwall'><div style={ctdivs_style_small} 
                                                
                                        >
                                                    <HomeOutlined style={{color : "mediumseagreen" }}/>
                                                     home
                                                </div>
                                        </Link> 
                                    </div>
                                )
                            } 

                          
                            var internal_dev=false;                            

                            _.each( userDetail.details.groups,function(val,i){
                                
                                if(val==="internalmodder"){
                                    internal_dev=true;    
                                }
                            })
                            if (internal_dev){
                                all_menus_arr.push(
                                    <div key={++key_menu}>
                                        <Link to='/codegen'><div style={ctdivs_style_small} >Code Gen</div></Link> 
                                    </div>
                                )
                            }

                         
                            _.each( customMenu,function(r,i){
                                var isAllowed=false;

                                if (_.isUndefined(r.group)){ r.group="" ; isAllowed=true; }
                                if (r.group!==""){
                                    _.each( userDetail.details.groups,function(val,i){
                                    
                                        if(val===r.group){
                                            isAllowed=true;    
                                        }
                                    })
                                }else{
                                    isAllowed=true
                                }

                                if (isAllowed){
                                    all_menus_arr.push(
                                        <div key={++key_menu}>                                            
                                            <div key={++key_menu}>
                                                <Link to={"/"+ r.name}><div style={ctdivs_style_small} >{r.label}</div></Link> 
                                            </div>
                                        </div>
                                                    
                                    )
                                }
                            })
                            
                            if (true){
                                all_menus_arr.push(
                                    <div key={++key_menu}>
                                        { /* <Link to={`${url}/3-1`}>Sub-page-1</Link> */ }
                                        <Link to='/settings'><div style={ctdivs_style_small} >
                                            <SettingOutlined style={{color : "mediumseagreen" }}/>
                                            settings</div>
                                        </Link> 
                                    </div>
                                                
                                )
                            }                            
                            
                            return ( 
                                <div style={{ width:"80%",zIndex :999}} >
                                    <nav>
                                        <div style={{ position : "relative" , margin : 4,  width : or_menu_width , height : menu_height }}></div>
                                        <div style={{ position : "absolute" ,top : 0,  margin : 4,  width : menu_width  }}>
                                            
                                            {all_menus_arr}
                                            
                                        </div>

                                    </nav>
                                </div>


                            )
                        }
                    }()   
                }
            


                {

                    function(){
                        var newRoutesE=[]

                        return(
                             
                                <div>                          
                                    {
                                        function(){
                                            
                                            _.each( customMenu,function(r,i){
                                                newRoutesE.push(
                                                    <Route key={i} path={"/" + r.name} exact={true}>
                                                        {
                                                            function(){                               
                                                                if (loggedin){
                                                                    return ( <div>{r.cmpt}</div> )
                                                                }else{
                                                                    return ( <Redirect to="/" /> )
                                                                }
                                                            }
                                                        }                       
                                                    </Route>
                                                )

                                            })

                                            var i2=10000

                                            return(
                                                <Switch>
                                                    {
                                                        function(){
                                                            newRoutesE.push(
                                                                <Route key={i2} path="/" exact={true}>
                                                                    {
                                                                       function(){
                                                                            if (!loggedin){
                                                                                return ( 
                                                                                            <div style={{padding : 15 , margin : 30}}  >
                                                                                                <Login/>

                                                                                                { 
                                                                                                    function(){
                                                                                                        if (settings.hasLoginPic){
                                                                                                            return (
                                                                                                                    <div style={settings.loginPicStyle}  >
                                                                                                                        <img src={settings.loginPic} />
                                                                                                                    </div>
                                                                                                                    )
                                                                                                        }
                                                                                                    
                                                                                                    }()
                                                                                                }
                                                                                            </div> 
                                                                                )
                                                                            }else{
                                                                                return ( <Mainwall/> )
                                                                            }
                                                                        }
                                                                    }
                                                                </Route>
                                                            )
                                                        }()
                                                    }
                                                    {
                                                        function(){
                                                            newRoutesE.push(
                                                                <Route key={i2} path="/mainwall" exact={true}>
                                                                    {
                                                                        function(){
                                                                            if (loggedin){
                                                                                return ( <Mainwall/> )
                                                                            }else{
                                                                                return ( <Redirect to="/" /> )
                                                                            }
                                                                        }
                                                                    }
                                                                </Route>
                                                            )
                                                        }()
                                                    }
                                                    {
                                                        function(){
                                                            newRoutesE.push(
                                                                <Route key={i2} path="/codegen" exact={true}>
                                                                    {
                                                                        function(){
                                                                            if (loggedin){
                                                                                return ( 
                                                                                    <div>                                           
                                                                                        <Codegenc/> 
                                                                                    </div>
                                                                                    )
                                                                            }else{
                                                                                return ( <Redirect to="/" /> )
                                                                            }
                                                                        }
                                                                    }
                                                                </Route> 
                                                            )
                                                        }()
                                                    }                                                    
                                                   
                                                    {
                                                        function(){
                    
                                                            newRoutesE.push(
                                                                <Route key={i2} path="/Settings" exact={true}>
                                                                    {
                                                                        function(){                               
                                                                            if (loggedin){
                                                                                return ( <Settings/> )
                                                                            }else{
                                                                                return ( <Redirect to="/" /> )
                                                                            }
                                                                        }
                                                                    }                       
                                                                </Route>
                                                            )
                                                        }()
                                                    }

                                                    {newRoutesE}
                                                </Switch>
                                            )
                                        }()

                                    }


                        </div>      
                            
                        )  
                    }() 
                }
            </Router>
        </div>


    )
}


export default connect(mapStateToProps, mapDispatchToProps)(MainApp)