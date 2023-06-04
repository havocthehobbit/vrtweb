import '../../App.css';
import '../../css_general/general.css';
import { useState,useEffect,useRef}  from 'react'
import { ContextStore } from './contextStore/contextStore';

//import { BrowserRouter as Router, NavLink } from 'react-router-dom';
//import {  } from 'react-router-dom';
import { BrowserRouter,Router, Link, Routes , Route , Navigate as Redirect } from 'react-router-dom'; // Redirect replaced with Navigate and Switch replaced with Routes...in V6
//import history from "./routerHist";

//import Login ,  {isAuth , logout as logoutuser } from './login'
import   {isAuth , logout as logoutuser } from './login'

import Mainwall from './mainwall'
import Settings from './settings'
import {NotFound} from './404notfound'
import {EmptyCpt} from './empty'




//import AllCalls from './impdata1'

import Codegenc from './codegenc'

import {customMenu} from  "../custom/custommenus"
import  {Frontpage} from  "../custom/frontpage"
import {CustomPageMainApp} from '../custom/customPageMainApp'

import $gl from "./global"

import _ from "lodash"

import { HomeOutlined , SettingOutlined } from '@ant-design/icons'

import {connect} from 'react-redux'
//import mainwall from './mainwall';


//var SummaryCalls=AllCalls.SummaryCalls;

var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();
//var url=protocall + "//" + host + ":" + port ;

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


var displayMenu_def={
    Home : undefined,
    all : {
        mainwall : { active : false  , e : Mainwall},
        codegen : { active : false , e :  Codegenc},
        settings : { active : false , e : Settings},
        empty : { active : false , e : EmptyCpt},
        notfound : { active : false , e : NotFound},
        customPageMainApp : { active : false , e : CustomPageMainApp}

        
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


    var [homePage,set_homePage]=useState('customPageMainApp');

    var [displayMenu,set_displayMenu]=useState(displayMenu_def);

    var [hoverMenuCurr,set_hoverMenuCurr]=useState({ name : ""});
    var [selectMenuCurr,set_selectMenuCurr]=useState({ name : ""});
    var [main_menu_expanded , set_main_menu_expanded]=useState(true )

    var [windowDimensions,setWindowDimensions]=useState({} )

    var initlogin=(useRef(0))
    
    var userid=$gl.getCookie("userid")
        
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
                if (passFocus){}
            }            
        })
    }
    
    var getLoginSettings=function(){       
        var args=arguments;

        var cb=function(){}
        
        //var title="";
        //var detail=""
        
        if ( args.length > 0){
            if (_.isPlainObject(args[0])){
                if (!_.isUndefined(args[0].cb)){
                    cb=args[0].cb
                }
                if (!_.isUndefined(args[0].title)){
                    //title=args[0].title
                }
                
                if (!_.isUndefined(args[0].detail)){
                    //detail=args[0].detail
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
        }).catch(function(err){
            cb({},{err : err});
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

            temps.defPage=dt.data.defPage
            temps.displayMenu=dt.data.displayMenu
            
            
            



            setSettings(temps)
            if ( temps.defPage!==""){
                set_homePage(temps.defPage)
            }
            var  l_displayMenu={...displayMenu}

            _.each(l_displayMenu.all,function(r,pname){
                l_displayMenu.all[pname].active =temps.displayMenu.all[pname].active
            })

            if (!_.isUndefined(dt.data.displayMenu.menuStyle)){
                l_displayMenu.menuStyle=dt.data.displayMenu.menuStyle
            }

            set_displayMenu(l_displayMenu)


            
        })
        return;

        temp="hasLoginPic"
        if (!_.isUndefined(lsettings[temp])){

        }
        temp="loginPic"
        if (!_.isUndefined(lsettings["temp"])){

        }


    }

    useEffect(function(){      
             
        initlogin.current++
        if (initlogin.current===1){                
            //var menuCookie=$gl.cookie("currMainMenu")
            /*
            if (!_.isUndefined(menuCookie)){
                return ( <Redirect to={"/" + menuCookie } /> )
            }else{
                return ( <Redirect to="/" /> )
            }
            */
            handleResize()
        } 
        window.addEventListener('resize', handleResize);
        let destructHandleResize=()=>{
            return (()=>{
                window.removeEventListener('resize', handleResize);
            })
        }

        getUserDetail(function(){}); 
        
        loginSettings(function(){})

        return function(){
            destructHandleResize()
        }        
    },[])

    useEffect(()=>{
        
    } ,[windowDimensions])

    let handleResize=()=>{        
        setWindowDimensions({windowDimensions : getWindowDimensions() })
    }

    let getWindowDimensions=()=>{
        let width=window.innerWidth
        let height=window.innerHeight
        return { width : width,height : height };
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

    
    if (!_.isUndefined(displayMenu.all[homePage])){
        displayMenu.Home=displayMenu.all[homePage].e
    }else{
        //displayMenu.all[homePage]={ active : true , e : NotFound }
        displayMenu.Home=displayMenu.all["notfound"].e
    }
    
    
    let fncs={

    }

    return (
        <div style={{ position : "relative"}} >
             {                
                function(){ 
                    var logoutStyle={ zIndex:999, right : "5%",position : "absolute"}
                    var logoutStyleLabel={}
                    var logoutStyleButton={}
                    if (loggedin){ 
                        if (!_.isUndefined(displayMenu.menuStyle)){
                            if (!_.isUndefined(displayMenu.menuStyle.lougoutStyle)){
                                logoutStyle=_.merge(logoutStyle,displayMenu.menuStyle.lougoutStyle)
                            }
                            if (!_.isUndefined(displayMenu.menuStyle.logoutStyleLabel)){
                                logoutStyleLabel=_.merge(logoutStyleLabel,displayMenu.menuStyle.logoutStyleLabel)
                            }
                            if (!_.isUndefined(displayMenu.menuStyle.lougoutStyleButton)){
                                logoutStyleButton=_.merge(logoutStyleButton,displayMenu.menuStyle.lougoutStyleButton)
                            }
                        }
                        return ( 
                            <div style={logoutStyle}>
                                <label style={logoutStyleLabel} >loggedin : {loginstr } </label>
                                                            
                                <input style={logoutStyleButton} type='button' defaultValue='logout'  onClick={
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
            <BrowserRouter>
                {   
                    function(){
                        if (loggedin){
                            var menu_width=500;
                            var menu_height=55;  
                            var textcolor= "white" ; 
                            var menutextcolor= "black" ;
                            var Linkstyle={color : textcolor};
                            var ctdivs_style={ color : menutextcolor , float : "left"  , width : 90, height : 30 , textAlign : "center" , padding : 5 , background : "lightgrey" , border : "solid thin grey" };
                            
                            var menuHoverStyle={ background : "orange" }
                            var menuSelectStyle={ background : "lightblue"}

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


                            var mmenuStyle={};
                            mmenuStyle.main={ width:"80%",zIndex :999999,displa : "inline-block"}

                            
                            mmenuStyle.main0={ position : "relative" , margin : 4,  width : or_menu_width , height : menu_height }
                            mmenuStyle.main1={ position : "absolute" ,top : 0,  margin : 4,  width : menu_width  } 

                            mmenuStyle.main_inst= ctdivs_style_small  

                            
                            if (!_.isUndefined(displayMenu.menuStyle)){
                                mmenuStyle.main=displayMenu.menuStyle.main
                                mmenuStyle.main0=_.merge({ position : "relative" , margin : 4,  width : or_menu_width , height : menu_height }, displayMenu.menuStyle.main0 )
                                mmenuStyle.main1=_.merge({ position : "absolute" ,top : 0,  margin : 4,  width : menu_width  } , displayMenu.menuStyle.main1)

                                mmenuStyle.main_inst=_.merge( ctdivs_style_small  ,displayMenu.menuStyle.main_inst )  

                                if (!_.isUndefined(displayMenu.menuStyle.hover)){
                                    menuHoverStyle=_.merge(menuHoverStyle,displayMenu.menuStyle.hover)
                                }

                                if (!_.isUndefined(displayMenu.menuStyle.select)){                                   
                                    menuSelectStyle=_.merge(menuSelectStyle,displayMenu.menuStyle.select)
                                }
                                
                            }                       

                            var key_menu=15
                            
                            var main_menu_expanded_cssDisplay="block"
                            var expanded_menu_icon="-"
                            if (!main_menu_expanded){
                                main_menu_expanded_cssDisplay="none"
                                expanded_menu_icon="+"
                            }

                            if (true){
                                var mymenuname="expand"
                                
                                //if (displayMenu.all[mymenuname].active){
                                if (true){

                                    var newStyleIns=_.clone(mmenuStyle.main_inst)
                                    
                                    if ( hoverMenuCurr.name===mymenuname){
                                        newStyleIns=_.merge(newStyleIns,menuHoverStyle )
                                    }
                                    if ( selectMenuCurr.name===mymenuname){
                                        newStyleIns=_.merge(newStyleIns,menuSelectStyle )
                                    }

                                    newStyleIns.background="grey"
                                    newStyleIns.cursor="pointer"
                                    
                                    var pstyle_tmp={ pointerEvents : "none",position : "relative", fontSize : 40, fontWeight : "bold",top : -20,display : "inline-block", margin : 0 , padding : 0}

                                    if (!main_menu_expanded){ 
                                        newStyleIns.width=15
                                        pstyle_tmp.fontSize=30
                                        pstyle_tmp.top=-12
                                        pstyle_tmp.left=-3
                                    }

                                    all_menus_arr.push(
                                        <div key={++key_menu}
                                            onClick={getUserDetail}
                                            style={{position : "relative" }}
                                        >
                                            
                                            <div to={'/' + mymenuname} myname={mymenuname} 
                                                    onClick={
                                                        (e)=>{
                                                            set_selectMenuCurr({ name : e.target.getAttribute("myname")}) 
                                                            set_main_menu_expanded(!main_menu_expanded)
                                                        }  
                                                    } 

                                            > 
                                                <div style={ newStyleIns} 
                                                    myname={mymenuname}
                                                    onMouseEnter={(e)=>{set_hoverMenuCurr({ name : e.target.getAttribute("myname")}) }  } 
                                                    onMouseLeave={(e)=>{ set_hoverMenuCurr({ name : "" }) }}
                                                    onClick={(e)=>{set_selectMenuCurr({ name : e.target.getAttribute("myname")}) ; $gl.cookie( "currMainMenu" , e.target.getAttribute("myname"))  }  } 
                                                >
                                                        
                                                        <p style={pstyle_tmp}>{expanded_menu_icon}</p>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            }

                            if (true){
                                var mymenuname="mainwall"
                                if (displayMenu.all[mymenuname].active){

                                    var newStyleIns=_.clone(mmenuStyle.main_inst)
                                    
                                    if ( hoverMenuCurr.name===mymenuname){
                                        newStyleIns=_.merge(newStyleIns,menuHoverStyle )
                                    }
                                    if ( selectMenuCurr.name===mymenuname){
                                        newStyleIns=_.merge(newStyleIns,menuSelectStyle )
                                    }

                                    all_menus_arr.push(
                                        <div key={++key_menu}
                                            onClick={getUserDetail}
                                            style={{position : "relative" ,display : main_menu_expanded_cssDisplay }}
                                        >
                                            { /* <Link to={`${url}/3-1`}>Sub-page-1</Link> */ }
                                            <Link to={'/' + mymenuname} myname={mymenuname} onClick={(e)=>{set_selectMenuCurr({ name : e.target.getAttribute("myname")}) }  } >
                                                <div style={ newStyleIns} 
                                                    myname={mymenuname}
                                                    onMouseEnter={(e)=>{set_hoverMenuCurr({ name : e.target.getAttribute("myname")}) }  } 
                                                    onMouseLeave={(e)=>{ set_hoverMenuCurr({ name : "" }) }}
                                                    onClick={(e)=>{set_selectMenuCurr({ name : e.target.getAttribute("myname")}) ; $gl.cookie( "currMainMenu" , e.target.getAttribute("myname"))  }  } 
                                                >
                                                        <HomeOutlined style={{color : "mediumseagreen" }}/>
                                                        home
                                                </div>
                                            </Link> 
                                        </div>
                                    )
                                }
                            } 

                          
                            var internal_dev=false;                            

                            _.each( userDetail.details.groups,function(val,i){
                                
                                if(val==="internalmodder"){
                                    internal_dev=true;    
                                }
                            })
                            if (internal_dev){
                                var mymenuname="codegen"
                                if (displayMenu.all[mymenuname].active){

                                    var newStyleIns=_.clone(mmenuStyle.main_inst)
                                    
                                    if ( hoverMenuCurr.name===mymenuname){
                                        newStyleIns=_.merge(newStyleIns,menuHoverStyle )
                                    }
                                    if ( selectMenuCurr.name===mymenuname){
                                        newStyleIns=_.merge(newStyleIns,menuSelectStyle )
                                    }
                                        
                                    all_menus_arr.push(
                                        <div key={++key_menu} style={{position : "relative",display : main_menu_expanded_cssDisplay  }} >
                                            <Link to={'/' + mymenuname} myname={mymenuname} onClick={(e)=>{set_selectMenuCurr({ name : e.target.getAttribute("myname")}) }  } >
                                                <div style={ newStyleIns} 
                                                    myname={mymenuname}
                                                    onMouseEnter={(e)=>{set_hoverMenuCurr({ name : e.target.getAttribute("myname")}) }  } 
                                                    onMouseLeave={(e)=>{ set_hoverMenuCurr({ name : "" }) }}
                                                    onClick={(e)=>{set_selectMenuCurr({ name : e.target.getAttribute("myname")}) ; $gl.cookie( "currMainMenu" , e.target.getAttribute("myname"))  }  } 

                                                
                                                >
                                                    Code Gen
                                                </div>
                                            </Link> 
                                        </div>
                                    )
                                }
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
                                    var newStyleIns=_.clone(mmenuStyle.main_inst)
                                    var mymenuname=r.name
                                    var active=true;
                                    if ( !_.isUndefined(r.style)){
                                        newStyleIns=_.merge(_.clone(mmenuStyle.main_inst),r.style)
                                       
                                    }
                                    if ( hoverMenuCurr.name===mymenuname){
                                        newStyleIns=_.merge(newStyleIns,menuHoverStyle )
                                    }
                                    if ( selectMenuCurr.name===mymenuname){
                                        newStyleIns=_.merge(newStyleIns,menuSelectStyle )
                                    }
                                    if ( !_.isUndefined(r.active)){
                                        active=r.active
                                       
                                    }

                                    if (active){
                                   
                                        all_menus_arr.push(
                                            <div key={++key_menu} style={{position : "relative",display : main_menu_expanded_cssDisplay  }} >                                            
                                                <div key={++key_menu}   >
                                                    <Link to={"/"+ r.name} myname={r.name} onClick={(e)=>{set_selectMenuCurr({ name : e.target.getAttribute("myname")}) }  } >
                                                        <div style={newStyleIns}  
                                                            myname={r.name}
                                                            onMouseEnter={(e)=>{set_hoverMenuCurr({ name : e.target.getAttribute("myname")}) }  } 
                                                            onMouseLeave={(e)=>{ set_hoverMenuCurr({ name : "" }) }}
                                                            onClick={(e)=>{set_selectMenuCurr({ name : e.target.getAttribute("myname")}) ; $gl.cookie( "currMainMenu" , e.target.getAttribute("myname"))  }  } 

                                                        >{r.label}</div>
                                                    </Link> 
                                                </div>
                                            </div>
                                                        
                                        )
                                    }
                                }
                            })
                            
                            if (true){
                                var mymenuname="settings"
                                if (displayMenu.all[mymenuname].active){

                                    var newStyleIns=_.clone(mmenuStyle.main_inst)
                                    
                                    if ( hoverMenuCurr.name===mymenuname){
                                        newStyleIns=_.merge(newStyleIns,menuHoverStyle )
                                    }
                                    if ( selectMenuCurr.name===mymenuname){
                                        newStyleIns=_.merge(newStyleIns,menuSelectStyle )
                                    }

                                    all_menus_arr.push(
                                        <div key={++key_menu} style={{position : "relative",display : main_menu_expanded_cssDisplay  }} >
                                            { /* <Link to={`${url}/3-1`}>Sub-page-1</Link> */ }
                                            <Link to={'/' + mymenuname}  myname={mymenuname} onClick={(e)=>{set_selectMenuCurr({ name : e.target.getAttribute("myname")}) }  } >
                                                <div style={ newStyleIns} 
                                                    myname={mymenuname}
                                                    onMouseEnter={(e)=>{set_hoverMenuCurr({ name : e.target.getAttribute("myname")}) }  } 
                                                    onMouseLeave={(e)=>{ set_hoverMenuCurr({ name : "" }) }}
                                                    onClick={(e)=>{set_selectMenuCurr({ name : e.target.getAttribute("myname")}) ; $gl.cookie( "currMainMenu" , e.target.getAttribute("myname"))  }  } 

                                                >
                                                    <SettingOutlined style={{color : "mediumseagreen" }}/>
                                                    settings
                                                </div>
                                            </Link> 
                                        </div>
                                                    
                                    )
                                }
                            }                            
                            
                            var mmenuStyle_tmp=_.clone(mmenuStyle.main)
                            var mmenuStyle0_tmp=_.clone(mmenuStyle.main0)
                            var mmenuStyle1_tmp=_.clone(mmenuStyle.main1)
                            //mmenuStyle_tmp.zIndex=999999999
                            //mmenuStyle0_tmp.zIndex=999999999
                            mmenuStyle1_tmp.zIndex=999999999
                            if (!main_menu_expanded){
                                //mmenuStyle_tmp.height=30
                                mmenuStyle_tmp.height=0
                                mmenuStyle0_tmp.height=0
                                mmenuStyle1_tmp.height=0                                
                            }


                            return ( 
                                <div className={"menu_main"} style={mmenuStyle_tmp} >
                                    
                                        <div className={"menu_main0"} style={mmenuStyle0_tmp}></div>
                                        <div className={"menu_main1"} style={mmenuStyle1_tmp}>
                                            {/*<nav>  */}
                                                {all_menus_arr}
                                            {/*</nav>  */}
                                        </div>                                   
                                </div>


                            )
                        }
                    }()   
                }
            


                {

                    function(){
                        var newRoutesE=[]

                        return(
                            <ContextStore.Provider 
                                value={{
                                    loggedin , login , logout,theme,
                                    userDetail,setUserDetail,
                                    userDetail,setUserDetail,
                                    //homePage,set_homePage,
                                    displayMenu,set_displayMenu,selectMenuCurr,set_selectMenuCurr,
                                    main_menu_expanded , set_main_menu_expanded,

                                    getUserDetail, getLoginSettings,loginSettings,
                                    loginstr,
                                    windowDimensions,setWindowDimensions ,

                                    //isLoggedIn,
                                    //isLoggedInSet,
                                    //testStuff
                                    
                                }}
                            >                 
                                    <div>                          
                                    {
                                        function(){
                                            
                                            _.each( customMenu,function(r,i){                                               
                                                //displayMenu.all[r.name]={ active : r.active, e : r.cmpt  } // cant use with react to set custom ,throws bad component error ,page from custommenu.js
                                
                                                newRoutesE.push(
                                                    <Route key={i+500} path={"/" + r.name} exact={true}
                                                            element={
                                                                (
                                                                    ()=>{                               
                                                                        if (loggedin){
                                                                            return ( <div>{r.cmpt}</div> )
                                                                        }else{                                                                    
                                                                            return ( <Redirect to="/" /> )
                                                                        }
                                                                    }
                                                                )()
                                                            }
                                                    
                                                    />
                                                                               
                                                    
                                                )

                                            })

                                            var i2=10000

                                            return(
                                                <Routes> 
                                                    {
                                                        function(){
                                                            newRoutesE.push(
                                                                <Route key={i2} path="/" exact={true}
                                                                    element={     
                                                                                
                                                                                
                                                                                (
                                                                                    ()=>{                                                                                
                                                                                    if (!loggedin){
                                                                                        return ( 
                                                                                                    <div style={{padding : 15 , margin : 30}}  >
                                                                                                        <div style={{position : "absolute"}}>
                                                                                                        
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
                                                                                                        <Frontpage theme={{ theme : theme }}/>
                                                                                                    </div> 
                                                                                        )
                                                                                    }else{                                                                               
                                                                                        return ( <displayMenu.Home/> )
                                                                                    }
                                                                                })()                                                                        
                                                                                
                                                                    }
                                                                />
                                                            )
                                                        }()
                                                    }
                                                    {
                                                        function(){
                                                            if (displayMenu.all["mainwall"].active){
                                                                newRoutesE.push(
                                                                    <Route key={i2} path="/mainwall" exact={true}
                                                                            element={
                                                                                (()=>{
                                                                                    if (loggedin){                                                                                        
                                                                                        return ( <displayMenu.Home/> )
                                                                                    }else{                                                                                        
                                                                                        return ( <Redirect to="/" /> )
                                                                                    }
                                                                                })()
                                                                            }
                                                                    />
                                                                )
                                                            }
                                                        }()
                                                    }
                                                    {
                                                        function(){
                                                            if (displayMenu.all["codegen"].active){
                                                                newRoutesE.push(
                                                                    <Route key={i2} path="/codegen" exact={true}
                                                                        element={
                                                                            (()=>{
                                                                                if (loggedin){
                                                                                    return ( 
                                                                                        <div>                                           
                                                                                            <Codegenc/> 
                                                                                        </div>
                                                                                        )
                                                                                }else{
                                                                                    return ( <Redirect to="/" /> )
                                                                                }
                                                                            })()
                                                                        }
                                                                    /> 
                                                                )
                                                            }
                                                        }()
                                                    }                                                    
                                                   
                                                    {
                                                        function(){
                                                            if (displayMenu.all["codegen"].active){
                                                                newRoutesE.push(
                                                                    <Route key={i2} path="/Settings" exact={true}
                                                                        element={
                                                                            (()=>{                               
                                                                                if (loggedin){
                                                                                    return ( <Settings/> )
                                                                                }else{
                                                                                    return ( <Redirect to="/" /> )
                                                                                }
                                                                            })()
                                                                        }                       
                                                                    />
                                                                )
                                                            }
                                                        }()
                                                    }

                                                    {newRoutesE}
                                                </Routes>
                                            )
                                        }()

                                    }


                                </div>    
                              
                            </ContextStore.Provider>  
                        )  
                    }() 
                }
            </BrowserRouter>
        </div>


    )
}


export default connect(mapStateToProps, mapDispatchToProps)(MainApp)