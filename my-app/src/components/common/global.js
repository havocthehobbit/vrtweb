import _ from "lodash";
import csvparse from "csv-parse"
import { v4 as uuidv4 } from 'uuid';




var cool_native={
    name : "cool_native",   
    fn : {},

    each : function(inst,cb){
        if (this.isObject){
            Object.keys(inst).forEach((v , p)=>{
                cb(inst[v] , v) 
            })
        }else{
            inst.forEach(function(v,i){ cb(v,i) })
        }


    },
    isObject : function(inp){
        var ret=false
        if (typeof(inp)==="object"){
            if (Array.isArray(inp)){
                ret=false
            }else{
                ret =true
            }

        }

        return ret
        
    },
    isUndefined : function(inp){
        var ret=false
        if (typeof  inp=== "undefined"){
            ret=true
        }
        return ret
    },
    isUn : function(inp){
       return this.isUndefined(inp)
    },
    typeof : function(inp){
        var t=typeof(inp)

        if (t==="object"){
            if (this.isObject()){
                t="object"

            }else{
                t="array"
            }
        }

        return t

    },

    init : function(){
        //var args=arguments;
        //var args_l=args.length;
        //var param={ name : "" }

        this.l_this=this ;

        
      
    }
}
var $gl=cool_native


var main_loop_tree=function( l_obj,l_extra_data, l_cb){ // rt's generic recursion fn
    
    var l_E=[] // used to generate react element objects that can be rendered
    var txt="" // for building text trees , can be used to convert json to xml or to html or to some other text format
    var ntd=[] // for biuilding new tree formats ,helps with converting tree data or transposing from one format to another                
    if (_.isUndefined(l_extra_data)){
        l_extra_data={}
    }
    l_extra_data.cancel_all=false

    if (_.isUndefined(l_extra_data.lvl)){
        l_extra_data.lvl=0
    }else{
        l_extra_data.lvl++
    }

    
    l_extra_data.cancel=false
    l_obj.children.forEach(function(r,i){                                
        if (l_extra_data.cancel){ // cancel last iteration
            return;
        }
        if(l_extra_data.cancel_all){
            return;
        }

        var par=l_obj // set parent, that can be used by children call backs

        var ret_temp_lE=main_loop_tree( r ,l_extra_data, l_cb  ) // children
        var new_L_Eobj=l_cb( r ,i, ret_temp_lE.E ,ret_temp_lE.txt, ret_temp_lE.ntd,l_extra_data, par)
        
        if (l_extra_data.cancel){ // cancel last iteration
            return;
        }
        if(l_extra_data.cancel_all){
            return;
        }

        if ( new_L_Eobj.success ){
            l_E.push(new_L_Eobj.E)
            txt+=new_L_Eobj.txt                        
            ntd.push(new_L_Eobj.treedata)
        }
    })

    l_extra_data.children_orig=l_obj.children
    

    l_extra_data.lvl--
    return { E :l_E , txt : txt, new_tree : ntd   }
}
$gl.main_loop_tree=main_loop_tree


var tree_template_O=function(){
    var tt=this
    var obj={            
        tt : tt,
        extended : {},
        myTree_E : undefined,
        props_E : undefined,
        components_E : undefined,
        layout_E : undefined,
        name : "",
        name_code : "_ht_tree_",
        desc : "",
        temp : {},
        sstate : { forceUpdate : function(){ var cb=()=>{}; if (!_.isUndefined(arguments[0])){cb=arguments[0]} ; cb() },setState: function(){ var cb=()=>{}; if (!_.isUndefined(arguments[1])){cb=arguments[1]} ; cb() }},
        states : {
            prop_curr_id : "0",
            prop_curr_parent : "0",
            tree_expanded_paths : [["root"]],
            tree_current_select_type : "cmpt",
            prop_curr_id_child : "",
        },
        set_states_init : function(){
            var tt=this.tt
            var t=this
            var st={} //_.cloneDeep(tt.state)
            _.each(t.states,(v,p)=>{
                st[ p + t.name_code]=v  
                tt.state[ p + t.name_code]=v                    
            })
            //tt.state=_.cloneDeep( tt.state,st)
            
        },

        text : "",
        
        mytree : {
            "children" : [], 
            "name" : "root",          
            "id" : "0" ,
            "style" : {}  
        },
        myTree_index : {},      
        
        component_mode : "addtotree",
        modes : ["addtotree","select_tool"],
        component_mode_selected_tool : "",
        component_selected_catagory : "code",
        component_catagories : ["code"],

        save_data : {},
        loaded_data : {},

        add_cmpt_to_tree : function(){
            var tt=this.tt
            var t=this
            if (_.isUndefined(tt.state)){
                tt={ state : t.sstate}
            }

            var args=arguments;
            var argsl=args.length;
    
            var params={}
            var p=params;
    
            var cb=()=>{}
    
            if (argsl > 0){
                if (_.isPlainObject(args[0]) ){
                    params=_.merge(_.cloneDeep(params), args[0])
    
                }           
                
                
                if (_.isString(args[0])){
                    params.type=args[0]                
                }
                if (argsl>1){
    
                    if (_.isString(args[1])){
                        params.parent=args[1]
                    }
                    if (_.isFunction(args[1])){
                        cb=args[1]
                    }
    
                }            
        
            }

            var c=new t.components_O({ type : p.type })

            var path=[ "root" ] ;
            var parent="0" ;
    
            var selected_parent="0"
            var parent_obj={}

            if (_.isUndefined(p.parent) ){
                selected_parent=tt.state["prop_curr_parent" + t.name_code]
                parent=selected_parent
                
                
                if (tt.state["tree_current_select_type" + t.name_code]==="cmpt"){
                    parent_obj=t.myTree_index.id[parent]
                }
                if (tt.state["tree_current_select_type" + t.name_code]==="child"){
                    parent_obj=t.myTree_index.id[tt.state["prop_curr_id" + t.name_code]]
                    selected_parent=tt.state["prop_curr_id" + t.name_code]
                    parent=selected_parent
    
                }
            }


            c.parent=parent;
            
            var name=c.name;
            if (!_.isUndefined(t.myTree_index.name[c.name])){ // check if name exists and assign it a increment
                t.myTree_index["__schema__name"].cnt++ // keeps the counter to use for unique naming
                name=c.name + "_" + t.myTree_index["__schema__name"].cnt
                t.myTree_index.name[name]={ name : c.name , id : c.id }            
            }else{
                t.myTree_index["__schema__name"].cnt++
                t.myTree_index.name[c.name]={ name : c.name , id : c.id }
                
            }

            c.name=name

            t.myTree_index.id[c.id]=c ;
    
            if (selected_parent=="0"){
                t.myTree.children.push(c)
                path.push( c.name)
                c.path=path;
            }else{
                parent_obj.children.push(c)
    
                path.push( c.name)
                path=_.clone(parent_obj.path)
                path.push( c.name)
                c.path=path;
            }

            tt.forceUpdate(()=>{
                cb()
            });


        },
        component_click : function(){
            var tt=this.tt
            var t=this

            var args=arguments
            var argsl=args.length
            
            if (t.component_mode==="addtotree"){
                t.add_cmpt_to_tree(args[0])
            }
            
        },
        component_set_catagory : function(){
            var tt=this.tt
            var _this=this

            if (_.isUndefined(tt.state)){
                tt={ state : _this.sstate}
            }

            var args=arguments;
            var argsl=args.length;

            _this.selected_catagory=args[0]
            tt.forceUpdate()

        },

        delfromtree : function(){
            var tt=this.tt
            var t=this

            if (_.isUndefined(tt.state)){
                tt={ state : t.sstate}
            }

            var args=arguments
            var argsl=args.length

            var cb=()=>{}
            if (argsl > 1){
                if ( args[1] ){ if (_.isFunction(args[1] )){ cb=args[1]}  }
            }

            var id="0"

            if (_.isString(args[0])){
                id=args[0];
            }

            //t.curr=id

            var tree_arr_2E=[]
            var some_extra_data_to_play_with={tmp_code_child_ret : ""}
            tree_arr_2E=t.mytreeloop( t.myTree ,some_extra_data_to_play_with , function(r,i , l_E ,l_txt, l_ntd,extra , par){
                var ret_E
                var ret_treeData // can be used the same ret_E , to create new tree data for conversion tree structures
                var ret_status=true
                var tmp_code=""
                
                //////////////////////////////////////////////////////////

                if (_.isUndefined(extra.tmp_code_child_ret)){
                    extra.tmp_code_child_ret=""
                }                

                //////////
                
                if (id==="0"){
                    t.myTree=_.cloneDeep(t._template_myTree)
                    t.myTree_index=_.cloneDeep(t.schemas.myTree_index.template)
                    t.myTree_index.tt=t
                    t.myTree_index.init()
                }else{
                
                    if (r.id===id){
                        par.children.splice( i ,1)
                        delete t.myTree_index.id[id]
                        delete t.myTree_index.name[r.name]                            
                    }
                }
                
                ////////////////
                
                return { E : ret_E , success : ret_status , txt : tmp_code , tree_data : ret_treeData }
            })

            tt.forceUpdate(()=>{
                cb();
            });

        },

        onClick_item : undefined,
        
        props : {
            name : "properties",
            type : "panel",
            path : "",
            parent : "",
            tt : undefined,
            t_myTreeO : undefined,
            curr : "",
            value : "",
            style :{},
            attributes :{},
            propvars :{},
            

            set_curr : function(){
                var t_main_reactcomponent=this.tt // 
                var t=this.t_myTreeO // 
                var tt=this
                
                if (_.isUndefined(t_main_reactcomponent.state)){
                    t_main_reactcomponent={ state : t.sstate}
                }
    
                var args=arguments
                var argsl=args.length
                
                var cb=()=>{}
                if (argsl > 1){
                    if ( args[1] ){ if (_.isFunction(args[1] )){ cb=args[1]}  }
                }
    
                var id="0"
    
                if (_.isString(args[0])){
                    id=args[0];
                }
    
                var nst={}
               
                tt.curr=id
               
                tt.name=t.myTree_index.id[id].name
                tt.type=t.myTree_index.id[id].type
                tt.parent=t.myTree_index.id[id].parent
                tt.path=t.myTree_index.id[id].path
                tt.value=t.myTree_index.id[id].value
                
                //tt.style.background=t.myTree_index.id[id].style.background
                tt.style=_.clone(t.myTree_index.id[id].style)
                tt.attributes=_.clone(t.myTree_index.id[id].attributes)
                tt.propvars=_.clone(t.myTree_index.id[id].propvars)
    
               
                //if (!).isUndefined){
                    
                   // tt.style_background=prop_style_background
                //}
                
                nst["prop_curr_name" + t.name_code]=tt.name
                nst["prop_curr_id" + t.name_code]=tt.curr
                nst["prop_curr_type" + t.name_code]=tt.type
                nst["prop_curr_parent" + t.name_code]=tt.parent
                nst["prop_curr_path" + t.name_code]=tt.path
                nst["prop_prop_value" + t.name_code]=tt.value                                 
    
                
                _.each(t.myTree_index.id[id].style,(v,p)=>{
                    var us={} ;us[p]=v
                    var ns=_.merge(_.clone( tt.style) , us )
                    tt.style=ns              
                    nst["prop_style_" + p + t.name_code]=tt.style[p]
                })
    
    
                _.each(t.myTree_index.id[id].attributes,(v,p)=>{
                    var us={} ;us[p]=v
                    var ns=_.merge(_.clone( tt.attributes) , us )
                    tt.attributes=ns
                  
                    nst["prop_attributes_" + p + t.name_code]=tt.attributes[p]
                })

                _.each(t.myTree_index.id[id].propvars,(v,p)=>{
                    var us={} ;us[p]=v
                    var ns=_.merge(_.clone( tt.propvars) , us )
                    tt.propvars=ns
                  
                    nst["prop_propvars_" + p]=tt.propvars[p]
                })
               
                
                t_main_reactcomponent.setState( 
                     nst,
                    function(){
                        cb()
                    }
                )
            },

            init : function(){

            }
        },
        
        schemas : {
            myTree : {
                schema : {
                },
                template : {
                    "children" : [], 
                    "name" : "root",
                    "id" : "0" ,
                    "style" : {}  
                }
            },
            myTree_index : {
                template : {
                    tt : undefined,
                    id : { "0" : undefined  },
                    path : {},
                    name : {},

                    "__schema__id" : {
                        name : "id",
                        format : "uuid",
                        desc : "used to retrieve instance by id",
                        schema  : {
                        }
                    },

                    "__schema__path" : {
                        name : "path",
                        format : "uuid",
                        desc : "used to retrieve instance by path",
                        schema  : {
                        }
                    },


                    "__schema__name" : {
                        name : "name",
                        format : "uuid",
                        desc : "used to find duplicate or rename with a counter",
                        cnt : 0,
                        schema  : {
                            name : "",
                            id : "",               
                        }
                    },

                    init : function(){
                        var t=this.tt // main react object element
                        var tt=this
                        
                        tt.id["0"]=t.myTree
                    }
                }
            }
        },

        styles : { 
                components : { p : { background : "white" ,color : "black", padding : undefined ,margin : 3 , cursor : "pointer" }  },
                components_groups : { 
                    p : { background : "white" ,color : "black", padding : undefined ,margin : 3 , cursor : "pointer",borderRadius :6 }
                },
                props : {
                        main : { position : "relative",background : "lightgrey" ,color : "black" , overflow : "auto",width : "100%", 
                        height : 400, textAlign : "left", paddingLeft :10 , fontSize : 13
                    }

                },
                myTree : {
                    main : { position : "relative",background : "lightgrey" ,color : "black" , overflow : "auto",width : 400, height : 350,padding : 10}
                },
                layout : {
                    main : {position : "relative", width : 800,padding : 15, background : "black",border : "thin solid grey", color : "black", fontSize : 13, height : 300 ,overflow : "auto"},

                }
            },

        
            components : { 
            all : [                                        
                { name : "newline" , cat : "code" ,tc_code : "newline"},
                { name : "function" , cat : "code" ,tc_code : "function"},
               
            ],
        },
        
        components_O : function(){
            var tt=this.tt
            var t=this

            var inst={
                name : "new_cmpt", // should be unique per a parent
                type : "button",
                desc : "desc",
                value : "",
                value_type : "string" ,
                id : "0",
                style : {},
                propvars : {},
                attributes : {},
                class : [],
                parent : "",
                path : ["root"],
                children : [],
                inputs : [],
                outputs : [],
                tags : [],
                init : function(){
                    var args=arguments
                    var argsl=arguments.length
                    var t=inst
    
                    var params={}
    
                    if (argsl>0){
                        if (_.isPlainObject(args[0])){
                            var a=args[0];
                            if (!_.isUndefined(a.type)){
                                t.type=a.type
                            }
    
                            var temp="parent"
                            if (!_.isUndefined(a[temp])){
                                t[temp]=a[temp]
                            }
    
                            var temp="name"
                            if (!_.isUndefined(a[temp])){
                                t[temp]=a[temp]
                            }
    
                            
    
                        }else{
                            t.type=args[0]
                            if (argsl >0){
                                t.parent=args[1]
                                
                            }
                            if (argsl >1){
                                t.name=args[2]
                            }
                        }
                    }
    
                    t.id=$gl.uuid()
    
                    return t;
                }
            }
    
            inst=inst.init.apply(this, arguments)
            return  inst
        },

        components_fn : function(){
            var tt=this.tt
            var t=this

            if (_.isUndefined(tt.state)){
                tt={ state : t.sstate}
            }

            var main_tool_E=[]
            var tools_cat_E=[]

            t.components.all.forEach((r,i)=>{

                if (r.cat===t.component_selected_catagory){
                    main_tool_E.push(
                        <p  
                            key={i}
                            style={t.styles.components_groups.p} 
                            tc_code={r.tc_code}
                            onClick={(e)=>{
                                    t.component_click(e.target.getAttribute("tc_code"))
                                }
                            }
                        >
                            {r.name}
                        </p>
                
                    )
                        }
            })

            t.component_catagories.forEach((r,i)=>{
                tools_cat_E.push(
                    
                    <p 
                        key={i}
                        style={t.styles.components_groups.p} 
                        cat={r.code}
                        onClick={(e)=>{
                                    t.component_set_catagory(e.target.getAttribute("cat"))
                            }
                        }
                    >
                        {r.name}
                    </p>
                
                )
            })

            t.components_E= (
                <>
                    <div                            
                        onClick={(e)=>{
                            tt.setState({})
                        }}
                    >                            
                        <h3 style={{paddingTop : 2, marginTop : 2}}>components</h3>
                    </div>
                    
                    <div style={{ display : "block" }}>   
                        <div
                            style={{ position : "relative", float : "left", width : 45,fontSize : 12}} 
                        >                      
                            {tools_cat_E}
                        </div>                                             
                        
                        <div
                            style={{ position : "relative", float : "left", width : 70,fontSize : 14 }}
                        >
                            {main_tool_E}
                        </div>
                            
                        <div
                            style={{ position : "relative", float : "left", width : 105,fontSize : 12, border : "solid thin lightgrey"}} 
                        >
                            fghfgfg
                        </div>                                             
                        <div style={{ clear : "left" }} />                                             
                    </div>
            </>
            )

        },
        props_fn_2 : function(d1 , d2){
            var tt=d1.tt
            var t=d1.t
            
            if (_.isUndefined(tt.state)){
                tt={ state : t.sstate}
            }

            var prop_attributes_varname=d1.prop_attributes_varname
            var ret_E=d2.ret_E
            
            //////////////////////////////////////////////////////////
            /////////////////// your code here ///////////////////////

            ret_E=(

                <div style={{ position : "relative", float : undefined , fontSize : 11 }}>

                            
                    <div style={{ position : "relative", float :undefined, marginLeft : 5 , height : undefined }}>
                        name : {tt.state["prop_curr_name" + t.name_code]}
                        <br/>
                        type : {tt.state["prop_curr_type" + t.name_code]}
                        <br/>
                        id : {tt.state["prop_curr_id" + t.name_code]} 
                        <br/>
                        parent : {tt.state["prop_curr_parent" + t.name_code]}
                        <br/>
                        path : {JSON.stringify(tt.state["prop_curr_path" + t.name_code])}


                        <div stlye={{clear : "left",}}/>
                    </div>   
                
                    <div style={{ position : "relative", float : undefined,marginLeft : 5 , height : undefined}}>
                        <h4 style={{margin : 0,padding : 0}} >Attributes</h4>
                        <p style={{margin : 0,padding : 0,float : "left", }} >{"var name : "}</p>    
                        <input
                            style={{ width : 50 }}                                     
                            value={prop_attributes_varname} 
                            
                            onChange={(e)=>{
                                    var sr={}
                                    sr["prop_attributes_varname" + t.name_code]= e.target.value
                                    tt.setState(sr)                                             
                                }                                        
                            }

                            onBlur={(e)=>{
                                var id=tt.state["prop_curr_id" + t.name_code]
                                var obj=t.myTree_index.id[id]
                                if (!_.isUndefined(obj)){                                            
                                    var cssv="varname"                                    
                                    var cssv_ob="attributes"                                    
                                    var us={} ;us[cssv]= e.target.value
                                    var ns=_.merge(_.clone( t.myTree_index.id[id][cssv_ob]) , us )
                                    t.myTree_index.id[id][cssv_ob]=ns
                                    
                                    var sr={}
                                    sr["prop_state_updated" + t.name_code]= new Date()
                                    tt.setState(sr)               
                                    
                                }
                            }}
                        
                        /> 

                        <div stlye={{clear : "left",}}/>

                                                

                    </div> 
                                            
                    <div style={{ position : "relative", float : undefined ,marginLeft : 5 , height : 300}}>
                        <p style={{margin : 0,padding : 0}}>value</p>                       
                        <textarea 
                            style={{ width : undefined }}
                            value={tt.state["prop_prop_value" + t.name_code]} 
                            onChange={(e)=>{   
                                    var sr={}
                                    sr["prop_prop_value" + t.name_code]= e.target.value
                                    tt.setState(sr)
                                }
                                
                            }

                            onBlur={(e)=>{
                                var id=tt.state["prop_curr_id" + t.name_code]
                                var obj=t.myTree_index.id[id]
                                if (!_.isUndefined(obj)){
                    
                                    var cssv="value"                                    
                    
                                    t.myTree_index.id[id][cssv]=e.target.value     
                                    
                                    var sr={}
                                    sr["prop_state_updated" + t.name_code]= new Date()
                                    tt.setState(sr)
                                }
                            }}
                        
                        /> 
                        <br/>
                        
                        notes : <br/><textarea value={tt.state["prop_note_txt" + t.name_code]} onChange={(e)=>{ 
                            var sr={}
                            sr["prop_note_txt" + t.name_code]= e.target.value
                            tt.setState(sr)

                            
                        }}/>
                    </div>
                    
                    

                </div>
            )
            
            //////////////////////////////////////////////////////////
            //////////////////////////////////////////////////////////
            d2.ret_E=ret_E

            return ret_E

        },
        props_fn : function(){
            var tt=this.tt
            var t=this
            
            if (_.isUndefined(tt.state)){
                tt={ state : t.sstate}
            }

            var e_E=[]
            var prop_attributes_varname=tt.state["prop_attributes_varname" + t.name_code]
            if (_.isUndefined(prop_attributes_varname)){
                prop_attributes_varname=""
            } 

            var d1={ 
                    tt : tt, 
                    t : t ,
                    prop_attributes_varname : prop_attributes_varname
            }

            var ret_E=undefined

            var d2={ ret_E : ret_E }

            t.props_fn_2(d1 , d2)

            t.props_E=( 
                <div style={t.styles.props.main}>
                    {d2.ret_E}
                  
                </div>
            )
                          
        },

        layout_fn_2 :  function(){},
        layout_fn : function(){
            var tt=this.tt
            var t=this

            if (_.isUndefined(tt.state)){
                tt={ state : t.sstate}
            }

            var some_extra_data_to_play_with={tmp_code_child_ret : ""}

            var temp=t.main_loop(t.myTree ,some_extra_data_to_play_with,function(r,i , l_E ,l_txt, l_ntd,extra , par){
                var ret_E
                var ret_treeData // can be used the same ret_E , to create new tree data for conversion tree structures
                var ret_status=true
                var tmp_code=""
                
                //////////////////////////////////////////////////////////

                if (_.isUndefined(extra.tmp_code_child_ret)){
                    extra.tmp_code_child_ret=""
                }

                var indent=function(){
                    var ret="\t" // starting off with a root tab space, make it blank if you dont want and initial tab
                    for (let index = 0; index < extra.lvl ; index++) {
                        ret+="\t"                        
                    }

                    return ret
                }()

                

                //////////////////////////////////////////////////////////
                    // main loop actions
                    var tempfn_data1={
                        r : r,
                        i :  i,
                        l_E :  l_E,
                        l_txt : l_txt,
                        l_ntd : l_ntd,
                        extra :  extra,
                        par : par,
                        indent : indent,
                        lvl : extra.lvl
                    }

                    var tempfn_data2={                            
                        ret_E : ret_E,
                        ret_status : ret_status,
                        tmp_code : tmp_code,
                        ret_treeData : ret_treeData,
                    }

                    t.layout_fn_2(tempfn_data1 , tempfn_data2 , tt , t)

                    ret_E=tempfn_data2.ret_E
                    ret_status=tempfn_data2.ret_status  
                    tmp_code=tempfn_data2.tmp_code 
                    ret_treeData=tempfn_data2.ret_treeData

           
                ////////////////
                            
                return { E : ret_E , success : ret_status , txt : tmp_code , tree_data : ret_treeData }
            })

            //t.tt.textE=temp.txt
            
            t.layout_E=(
                <div
                    style={t.styles.layout.main}
                >   
                    <div
                        style={t.myTree.style}
                    >
                        {temp.E}
                    </div>
                    
                </div>
            )

            
        },

        main_loop : function( l_obj,extra_data, cb){ // rt's generic recursion fn
            var tt=this.tt
            var t=this

            if (_.isUndefined(tt.state)){
                tt={ state : t.sstate}
            }

            var l_E=[] // used to generate react element objects that can be rendered
            var txt="" // for building text trees , can be used to convert json to xml or to html or to some other text format
            var ntd=[] // for biuilding new tree formats ,helps with converting tree data or transposing from one format to another                
            if (_.isUndefined(extra_data)){
                extra_data={}
            }
            extra_data.cancel_all=false
    
            if (_.isUndefined(extra_data.lvl)){
                extra_data.lvl=0
            }else{
                extra_data.lvl++
            }
    
            
            extra_data.cancel=false
            l_obj.children.forEach(function(r,i){                                
                if (extra_data.cancel){ // cancel last iteration
                    return;
                }
                if(extra_data.cancel_all){
                    return;
                }
    
                var par=l_obj // set parent, that can be used by children call backs
    
                var ret_temp_lE=t.main_loop( r ,extra_data, cb  ) // children
                var new_L_Eobj=cb( r ,i, ret_temp_lE.E ,ret_temp_lE.txt, ret_temp_lE.ntd,extra_data, par)
                
                if (extra_data.cancel){ // cancel last iteration
                    return;
                }
                if(extra_data.cancel_all){
                    return;
                }
    
                if ( new_L_Eobj.success ){
                    l_E.push(new_L_Eobj.E)
                    txt+=new_L_Eobj.txt                        
                    ntd.push(new_L_Eobj.treedata)
                }
            })
    
            extra_data.children_orig=l_obj.children
            
    
            extra_data.lvl--
            return { E :l_E , txt : txt, new_tree : ntd   }
        },
        tree_fn : function(){ // tree
            var tt=this.tt
            var t=this

            if (_.isUndefined(tt.state)){
                tt={ state : t.sstate}
            }


            /////////////////////////////////////////////

            var def_bg_col="transparent"
            var def_col="black"
            var sel_bg_col="yellow"
            var sel_col="black"

            var cs_col=def_col;
            var cs_bgcol=def_bg_col;

            var def_bg_col_child="transparent"
            var def_col_child="black"
            var sel_bg_col_child="orange"
            
            var cs_col_child=def_col_child;
            var cs_bgcol_child=def_bg_col_child;
            var is_child_expanded=false;

            var some_extra_data_to_play_with={tmp_code_child_ret : ""}

            var temp=t.main_loop(t.myTree ,some_extra_data_to_play_with,function(r,i , l_E ,l_txt, l_ntd,extra , par){
                var ret_E
                var ret_treeData // can be used the same ret_E , to create new tree data for conversion tree structures
                var ret_status=true
                var tmp_code=""
                
                //////////////////////////////////////////////////////////

                if (_.isUndefined(extra.tmp_code_child_ret)){
                    extra.tmp_code_child_ret=""
                }
                //////////////////////////////////////////////////////////

                

                var xpp=_.cloneDeep(tt.state[ "tree_expanded_paths" + t.name_code ] )

                 // is expanded
                 var temp_obj_path_s_is_ex=JSON.stringify(r.path).toString()
                 xpp.forEach(function(rx1,ix1){ // need to build up , get this  object ID's path and compare tit to the tree path , not iterate through each as this is a bug that prevents closure
                        var temp_path_s_is_ex=JSON.stringify(rx1).toString()                            
                        if (temp_path_s_is_ex===temp_obj_path_s_is_ex){
                            is_child_expanded=true
                        }                           
                })

                var is_child_expanded_css="none"
                if (is_child_expanded){
                    is_child_expanded_css="block"
                }

                cs_bgcol=def_bg_col;
                if (tt.state["prop_curr_id" + t.name_code]===r.id){
                    cs_bgcol=sel_bg_col
                }

                cs_bgcol_child=def_bg_col_child;
                if (tt.state["tree_current_select_type" + t.name_code] === "child"){
                    if (tt.state["prop_curr_id_child" + t.name_code]===r.id){
                        cs_bgcol_child=sel_bg_col_child
                    }
                }

                if (_.isUndefined( extra.indent )){
                    extra.indent=0
                }

                ////////////////
                    // main loop actions

                    ret_E=(
                        <div key={i}
                            style={{ position : "relative", background : cs_bgcol ,color : cs_col , textAlign : "left",overflow : "auto", fontSize : 13, width : "100%"}}
                            cid={r.id}  
                        >
                            <div
                                style={{ position : "relative", float : "left" , cursor : "se-resize"}}                                    
                                key={i}
                                cid={r.id}
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    var id=e.target.getAttribute("cid")
                                    var l_obj=t.myTree_index.id[id]

                                    var xpp=_.cloneDeep(tt.state["tree_expanded_paths" + t.name_code])

                                    var found=false;
                                    var found_path
                                    var found_path_i
                                    xpp.forEach(function(rx1,ix1){ 
                                        var temp_path_s=JSON.stringify(rx1).toString()
                                        var temp_obj_path_s=JSON.stringify(l_obj.path).toString()
                                        if (temp_path_s===temp_obj_path_s){
                                            found=true
                                            found_path=rx1
                                            found_path_i=ix1
                                        }
                                        
                                        rx1.forEach(function(rx2,ix2){  })
                                    })

                                    if (found){                                            
                                        xpp.splice(found_path_i ,1 )
                                    }else{
                                        xpp.push( _.cloneDeep(l_obj.path) )
                                    }         
                                    
                                    var lr={}
                                    lr["tree_expanded_paths" + t.name_code]=xpp

                                    tt.setState(lr)
                                    
                                }}
                            >
                                [+]
                            </div>

                            
                            <div   
                                style={{ position : "relative", float : "left",overflow : "auto" , cursor : "pointer"} }
                                cid={r.id}   
                                onClick={(e)=>{
                                    e.stopPropagation();
                                    var id=e.target.getAttribute("cid")         
                                    t.props.set_curr(id,function(){                                            
                                        var lr={}
                                        lr["tree_current_select_type" + t.name_code ]="cmpt"
                                        lr["prop_curr_id_child" + t.name_code ]=0
                                        tt.setState(lr,function(){  })                                        
                                    })
                                }}
                            >
                                &nbsp; {r.type} {r.name} 
                            </div>
                            <div style={{ clear : "both" }}/>
                            <div 
                                 style={{ background : cs_bgcol_child, display : is_child_expanded_css , position : "relative", left : 10 , cursor : "pointer" , width : "100%"}}
                                 cid={r.id}
                                 onClick={(e)=>{
                                    e.stopPropagation();
                                    var id=e.target.getAttribute("cid")         
                                    t.props.set_curr(id,function(){
                                        //tt.setState({tree_current_select_type : "cmpt" },function(){
                                            var lr={}
                                            lr["tree_current_select_type" + t.name_code ]="child"
                                            lr["prop_curr_id_child" + t.name_code ]=id
                                            tt.setState(lr,function(){
                                         
                                            })
                                        //})
                                    })
                                }}
                            >
                                children :  {"["} 
                                    <div 
                                        style={{ position : "relative" ,left : 10 }}
                                        cid={r.id}   
                                    >
                                        &nbsp; {l_E} 
                                    </div>
                                    {"]"}
                            </div>

                        </div>
                    )

                ////////////////
        
                return { E : ret_E , success : ret_status , txt : tmp_code , tree_data : ret_treeData }
            })

            var tree_root_E=function(){
                cs_bgcol=def_bg_col;
                if (tt.state["prop_curr_id"+ t.name_code ]==="0"){
                    cs_bgcol=sel_bg_col
                }
                return (
                    <div style={{position:"relative", fontSize : 13 ,textAlign : "left"}}>                        
                        <div 
                            style={{ background : cs_bgcol,position:"relative", fontSize : 13 ,textAlign : "left" ,cursor : "pointer"}}
                            cid="0"
                            onClick={(e)=>{
                                e.stopPropagation();
                                var id=e.target.getAttribute("cid")         

                                    t.props.set_curr(id,function(){
                                        var lr={}
                                        lr["tree_current_select_type" + t.name_code ]="child"
                                        
                                        tt.setState(lr,function(){
                                        
                                        })                                        
                                        
                                    })

                            }}
                        
                        >
                            {"[/] root"}
                            <div
                                style={{ position : "relative", float : "right" , cursor : "se-resize"}}
                                cid="0"  
                            >
                                <button  cid="0"
                                        style={{fontSize : 10, padding : 4 ,paddingLeft : 8,paddingRight : 8, marginLeft : 3, marginRight : 3 }}
                                        onClick={(e)=>{
                                            e.stopPropagation();
                                            var id=e.target.getAttribute("cid") 
                                            t.delfromtree(id , function(){ })
                                        }}
                                    >del</button>
                                </div>
                     
                        </div>
                        
                        <div style={{ position : "relative",left:7}}
                            onClick={(e)=>{}}
                        >
                            {temp.E}
                        </div>
                    </div> 
                )
            }()
           


            t.tt.textE=temp.txt
            
            t.myTree_E=(
                <div
                    style={t.styles.myTree.main}
                >   
                    {tree_root_E}                    
                </div>
            )

        },

        render : function(){ // this needs to go into react render function
            var tt=this.tt
            var t=this

            if (_.isUndefined(tt.state)){
                tt={ state : t.sstate}
            }
            
            t.components_fn()
            t.tree_fn()
            t.props_fn()
            t.layout_fn()
        },

        save_data_fn: function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            var argsl=args.length;


            var cb=function(){}

            var data={}
            var options={}

            if ( args.length > 0){
                if (_.isPlainObject(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (_.isPlainObject(args[1])){
                            options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (_.isFunction(args[args.length -1]) ){
                        cb=args[args.length -1];
                    }
                }
                if (_.isFunction(args[0]) ){
                    cb=args[0]
                }
            }
    

            //tt.proj_data.myTree=tt.myTree
            //index
            //tt.proj_data.index=tt.myTree_index // linked object cause cyclic error, which cant be  linked anyway in serialisation in the same way that js needs to lookup
            var idx={}
            // excuiding tt.myTree_index.id index as it is full object links and causes recursion error while stringing
            
            idx.id={}
            idx.path=t.myTree_index.path
            idx.name=t.myTree_index.name
            idx["__schema__id"]=t.myTree_index["__schema__id"]
            idx["__schema__path"]=t.myTree_index["__schema__path"]
            idx["__schema__name"]=t.myTree_index["__schema__name"]    
            
            t.save_data.myTree_index=_.cloneDeep(idx)
            t.save_data.myTree=_.cloneDeep(t.myTree)
            
            cb()
            
        },
        load_data_fn : function(){ // take data.mytree , data,
            var tt=this.tt
            var t=this
            var args=arguments;
            var argsl=args.length;

            var data={}
            var options={}

            var cb=function(){}

            if ( args.length > 0){
                if (_.isPlainObject(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (_.isPlainObject(args[1])){
                            options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (_.isFunction(args[args.length -1]) ){
                        cb=args[args.length -1];
                    }
                }
                if (_.isFunction(args[0]) ){
                    cb=args[0]
                }
            }
            
            t.myTree=data.myTree

            t.myTree_index=data.myTree_index
            t.rebuild_myTree_index_id_object_links()

            t.loaded_data=data

            cb(data)
        },

        rebuild_myTree_index_id_object_links : function(){ // rebio;d id
            var tt=this.tt
            var t=this

            if (_.isUndefined(tt.state)){
                tt={ state : t.sstate}
            }

            var args=arguments;
            var argsl=args.length;

            var data={}
            var options={}

            var cb=function(){}

            if ( args.length > 0){
                if (_.isPlainObject(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (_.isPlainObject(args[1])){
                            options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (_.isFunction(args[args.length -1]) ){
                        cb=args[args.length -1];
                    }
                }
                if (_.isFunction(args[0]) ){
                    cb=args[0]
                }
            }
            
            var myTree_temp
            if (_.isPlainObject(args[0])){
                if (!_.isUndefined(args[0].myTree)){    
                    myTree_temp=data
                }
            }else{                    
                myTree_temp=t.myTree
            }

            var e_E=[]
            var code_txt=""
        
            var tree_arr_2E=[]
                    
            var some_extra_data_to_play_with={tmp_code_child_ret : ""}
            tree_arr_2E=t.main_loop( myTree_temp ,some_extra_data_to_play_with , function(r,i , l_E ,l_txt, l_ntd,extra){
                var ret_E
                var ret_treeData // can be used the same ret_E , to create new tree data for conversion tree structures
                var ret_status=true
                var tmp_code=""
                
                //////////////////////////////////////////////////////////
    
                if (_.isUndefined(extra.tmp_code_child_ret)){
                    extra.tmp_code_child_ret=""
                }
    
                //////////                        
                    t.myTree_index.id[r.id]=r // updating index                    
                ////////////////                                    
                
                return { E : ret_E , success : ret_status , txt : tmp_code , tree_data : ret_treeData }
            }
            )

            if (argsl===0){
                t.myTree=myTree_temp
                t.myTree_index.id["0"]=t.myTree        
            }else{
                if (_.isPlainObject(args[0])){                        
                        t.myTree=myTree_temp
                        t.myTree_index.id["0"]=t.myTree                                
                }else{                    
                    t.myTree=myTree_temp
                    t.myTree_index.id["0"]=t.myTree      
                }
            }
            
        },

        getTree_realpathSTR_from_ID :function(id, arg_obj){ // #todo
            var tt=this.tt
            var t=this
            var realpath_s=""

            var obj=arg_obj
            if (_.isUndefined(arg_obj)){
                obj=t.myTree
            }

            var rp=[]

            return realpath_s
        },
        
        delete_from_treeobj_ID :function(id,arg_obj){
            var tt=this.tt
            var t=this
            var args=arguments;
            var argsl=args.length;

            var obj=arg_obj
            var tree
            if (_.isUndefined(arg_obj)){
                obj=t.myTree_index.id[id]
            }
            
            var obj_par=t.myTree_index.id[obj.parent]

            obj_par.children.forEach((r,i)=>{
                if (r.id===id){
                    obj_par.children.splice( i ,1) 
                }
            })                
            
        },

        cut_paste_get :function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            var argsl=args.length;

            t.temp.current_cp={}

            t.temp.current_cp.type="cut"
            t.temp.current_cp.time=new Date()
            t.temp.current_cp.srcID=args[0]                
            
        },

        cut_paste_put :function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            var argsl=args.length;

            
            t.temp.current_cp={}

            t.temp.current_cp.type="cut" // cut_batch
            t.temp.current_cp.time2=new Date()
            t.temp.current_cp.destID=args[0]

            t.cut(_.clone( t.temp.current_cp ) )
        },

        //pasteType : "", // should be in temp
        cut :function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            var argsl=args.length;

            var data={}
            var options={}

            var cb=function(){}
            
            if ( args.length > 0){
                if (_.isPlainObject(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (_.isPlainObject(args[1])){
                            options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (_.isFunction(args[args.length -1]) ){
                        cb=args[args.length -1];
                    }
                }
                if (_.isFunction(args[0]) ){
                    cb=args[0]
                }
            }


            var obj=t.myTree_index.id[data.srcID]
            var obj_par=t.myTree_index.id[obj.parent]

            var status="success"
            var br={ id : "" , name : "" , srcID : "" , status : "success" , err : "" , data : {} }
            
            br.name="cut_" + new Date()
            br.srcID=data.srcID

            // 1. copy to temp
            t.copy_branch_to_temp(br)

            // 2. delete branch from src tree

            obj_par.children.forEach((r,i)=>{
                if (r.id===data.srcID){
                    obj_par.children.splice( i ,1) 
                }
            })
            
            // 3. copy to new destination from temp



            // 4. rebuild id , only if its a copy , cuts/move can retain same ID


            // 5. rebuild paths

            // 10. clean up
            if (status==="success"){
                t.del_branch_from_temp(br)
            }else{
                t.restore_branch_from_temp(br)
            }
        },            
        copy :function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            var argsl=args.length;

            var data={}
            var options={}

            var cb=function(){}

            if ( args.length > 0){
                if (_.isPlainObject(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (_.isPlainObject(args[1])){
                            options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (_.isFunction(args[args.length -1]) ){
                        cb=args[args.length -1];
                    }
                }
                if (_.isFunction(args[0]) ){
                    cb=args[0]
                }
            }
        },
        paste :function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            var argsl=args.length;

            var data={}
            var options={}

            var cb=function(){}

            if ( args.length > 0){
                if (_.isPlainObject(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (_.isPlainObject(args[1])){
                            options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (_.isFunction(args[args.length -1]) ){
                        cb=args[args.length -1];
                    }
                }
                if (_.isFunction(args[0]) ){
                    cb=args[0]
                }
            }
        },
        copy_branch_to_temp :function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            var argsl=args.length;

            var data={}
            var options={}

            var cb=function(){}

            if ( args.length > 0){
                if (_.isPlainObject(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (_.isPlainObject(args[1])){
                            options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (_.isFunction(args[args.length -1]) ){
                        cb=args[args.length -1];
                    }
                }
                if (_.isFunction(args[0]) ){
                    cb=args[0]
                }
            }
        },
        del_branch_from_temp :function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            var argsl=args.length;

            var data={}
            var options={}

            var cb=function(){}

            if ( args.length > 0){
                if (_.isPlainObject(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (_.isPlainObject(args[1])){
                            options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (_.isFunction(args[args.length -1]) ){
                        cb=args[args.length -1];
                    }
                }
                if (_.isFunction(args[0]) ){
                    cb=args[0]
                }
            }
        },
        restore_branch_from_temp :function(){
            var tt=this.tt
            var t=this
            var args=arguments;
            var argsl=args.length;

            var data={}
            var options={}

            var cb=function(){}

            if ( args.length > 0){
                if (_.isPlainObject(args[0])){
                    data=args[0]

                    if (args.length > 1){
                        if (_.isPlainObject(args[1])){
                            options=args[1]

                        }
                    }
                }


                if (args.length > 1){
                    if (_.isFunction(args[args.length -1]) ){
                        cb=args[args.length -1];
                    }
                }
                if (_.isFunction(args[0]) ){
                    cb=args[0]
                }
            }
        },
        init2 : function(){},
        init_first : function(){},
        init : function(){   // remember this is not this obj its the parent functions this scope                                             
            var t=obj
            var args=arguments
            var argsl=args.length                

            if (!_.isUndefined(args[0].inst)){
                var inst=args[0].inst

                
                var tmp="name_code"
                if (!_.isUndefined(inst[tmp])){
                    t[tmp]=inst[tmp]
                }

                var tmp="init"
                if (!_.isUndefined(inst[tmp])){
                    t["init2"]=inst[tmp]
                }

                var tmp="init_first"
                if (!_.isUndefined(inst[tmp])){
                    t[tmp]=inst[tmp]
                }

                var tmp="styles"
                if (!_.isUndefined(inst[tmp])){
                    t[tmp]=_.merge(t[tmp] , inst[tmp] )
                }
                
                var tmp="components"
                if (!_.isUndefined(inst[tmp])){
                    t[tmp].all=inst[tmp]
                }                    
                
                var tmp="component_selected_catagory"
                if (!_.isUndefined(inst[tmp])){
                    t[tmp]=inst[tmp]
                }

                var tmp="layout_fn"
                if (!_.isUndefined(inst[tmp])){
                    t["layout_fn_2"]=inst[tmp]
                }

                var tmp="props_fn"
                if (!_.isUndefined(inst[tmp])){
                    t["props_fn_2"]=inst[tmp]
                }


                

                


            }

            t.init_first({ args : args, t : t , argsl : argsl })


            if (!_.isUndefined(args[0].this)){
                t.tt=args[0].this                
            }
            
            t.props.tt=obj.tt
            t.props.t_myTreeO=obj
            
            //t.mytree.tt=obj.tt

            t.myTree_index=_.cloneDeep(t.schemas.myTree_index.template)
            t.myTree_index.tt=obj.tt

            t.myTree=_.cloneDeep(t.schemas.myTree.template)                
            t.myTree_index.id["0"]=t.myTree          
            t.myTree_index.name["root"]={name : "root" , id : "0"}

            t.set_states_init()   
            
            t.init2({ args : args, t : t , argsl : argsl })

            return t
        }
    }        
   
    obj=obj.init.apply(this ,arguments)
    return obj
}

$gl.tree_template_O=tree_template_O


$gl.ex=function(a){ // exists
   return !_.isUndefined(a)
}

$gl.buffStrtoString=function(a){
    return a.toString()
}

$gl.filterlines=function(text, searchstring,linesafter){
    var haslineAfter=false
    if (!_.isUndefined(linesafter)){
        haslineAfter=true
    }

    var textArray=text.split("\n")
    var newArr=[]
    var counfFound=0
    //var foundfirst=-1

    _.each(textArray,function(v,i){
        var found=v.search(searchstring)

        if (counfFound>0){
           if (haslineAfter){
            found=1

           }                
        }
        if (found>0){
            if (counfFound===1){
                //foundfirst=i
            }


           
            newArr.push(v)
            haslineAfter=true
            counfFound++
            if (counfFound>linesafter){haslineAfter=false}
            
        }

    })


   var newtext=""

    newtext=newArr.join( "\n")

    return newtext
}

$gl.filterlinesRange=function(text, searchstringFrom,searchstringTo){    

    //var newArr=[]
    //var counfFound=0
    //var foundfirst=-1
 
    var rx=new RegExp( "(?<=" + searchstringFrom + "s*\).*?(?=\s*" + searchstringTo + ")" , "s")
    

   var newtext=""

   newtext=text.match(rx)

    console.log("test" ,newtext )

    return newtext
}

$gl.xmlparse=function(xmlString){
    var parser = new DOMParser();


    return parser.parseFromString(xmlString,"text/xml")
}


function xmlToJson(xml) {
   
    // Create the return object
    var obj = {};

    if (xml.nodeType === 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
            for (var j = 0; j < xml.attributes.length; j++) {
                var attribute = xml.attributes.item(j);
                obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
            }
        }
    } else if (xml.nodeType === 3) { // text
        obj = xml.nodeValue;
    }

    // do children
    if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
            var item = xml.childNodes.item(i);
            var nodeName = item.nodeName;
            if (typeof(obj[nodeName]) == "undefined") {
                obj[nodeName] = xmlToJson(item);
            } else {
                if (typeof(obj[nodeName].push) === "undefined") {
                    var old = obj[nodeName];
                    obj[nodeName] = [];
                    obj[nodeName].push(old);
                }
                obj[nodeName].push(xmlToJson(item));
            }
        }
    }
    /*
    var sanitiseRTrec=function(obj){
        var o=obj
        var parentnameiter="unknown"
        var parent={}
        if (arguments.length>1){
            parentnameiter=arguments[2]
            parent=arguments[1]
        }else{

        }
        _.each(o,function(r,p){
            if (_.isPlainObject(r)){


                sanitiseRTrec(r,o , p)

            }else if (_.isArray(r)){

                sanitiseRTrec(r,o,p)

            }else{
               
                if ( p==="#text"){
                    //console.log("#t")
                    var value=_.cloneDeep(r)                    
                    //delete parent["#text"]
                    parent["new"]=value
                }
            }

        })
        
    }
    */

    // #todo #rt fix #text issue
    /*
    var sanitiseRT=function(obj){
        sanitiseRTrec(obj)
    }

    sanitiseRT(obj)
    */
   
    return obj;
}

$gl.xmlToJson=xmlToJson



function PasswordSimplGen(cb){
    var psw=""
     psw=Math.random().toString(36).slice(-8);
     
     setTimeout( function(){
 
             psw+=Math.random().toString(36).slice(-8);
              cb( psw )
     },2000 )
 
 
    
 
 }
 $gl.simpRandPass=PasswordSimplGen



 $gl.csv_parse=function( csv ,fn1){
    var cb=function(){}
    if (!_.isUndefined(fn1)){ 
        cb=fn1;
    }
    csvparse(csv.trim(), {
             columns: true
            }, function(err, records){               
                //console.log(records)
                cb(records,err)
            })
}




function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
$gl.getCookie=getCookie;
$gl.fetchCookie=getCookie;



function createCookie(name,value,days) {
    var expires
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 *1000));
        expires = "; expires=" + date.toGMTString();
    } else {
        expires = "";
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}
$gl.createCookie=createCookie;
$gl.setCookie=createCookie;
$gl.updateCookie=createCookie;

function eraseCookie(name) {
    createCookie(name,"",-1);
}
$gl.eraseCookie=eraseCookie;
$gl.deleteCookie=eraseCookie;

function cookie(){
    var args=arguments	
    var argsl=args.length

    if (argsl===1){
        return getCookie(args[0])
    }
    if (argsl===2){
        return createCookie(args[0],args[1])
    }
}
$gl.cookie=cookie;


var fetchPostCors=function(params){
        
        var obj={        
                    method: 'POST',
                    mode: 'cors',
                    credentials: 'include',
                    body: JSON.stringify({}), //JSON.stringify({ "userid" : userid }),
                    headers: {
                        //'x-auth-token': getCookie("token"),
                        'Access-Control-Allow-Origin':'*',
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }          
                    
        }
        

        if (!_.isUndefined( params)){
            if (_.isPlainObject(params)){

            }else{
                if (params==="upload"){
                    delete obj.headers.Accept
                    delete obj.headers["Content-Type"]
                }
            }

        }
    
    return obj    
}
$gl.fetchPostCors=fetchPostCors;


var getHost=()=>{
    var url= window.document.createElement('a');
    url.setAttribute('href', window.location.href)
    var host=url.hostname;
    //var port=url.port;
    return host;
}

$gl.fn.getHost=getHost;


var getPort=()=>{
    var url= window.document.createElement('a');
    url.setAttribute('href', window.location.href)
    //var host=url.hostname;
    var port=url.port;
    if (process.env.NODE_ENV !== 'production') {
      port=window["node_port"];
    }
    
    if (_.isUndefined(port)){
        //port=3001
    }

    return port;
}

$gl.fn.getPort=getPort;


var getProtocall=()=>{
    return window.location.protocol;
}
$gl.fn.getProtocall=getProtocall;

// node port during development // create a global variable
if (process.env.NODE_ENV !== 'production') { 
    window["node_port"]=process.env["REACT_APP_DEV_NODE_PORT"]; // #BE # export REACT_APP_DEV_NODE_PORT=3018 npm start    
}

$gl.host=getHost();
$gl.port=getPort()
$gl.protocall=getProtocall();
$gl.url=$gl.protocall + "//" + $gl.host + ":" + $gl.port ;

var fetchPerms=function(){
    var cb=()=>{};        

    var args=arguments;
    if ( args.length > 0){
        if (_.isPlainObject(args[0])){
            if (!_.isUndefined(args[0].cb)){
                cb=args[0].cb
            }
            
        }else{
            if (_.isFunction(args[0])){
                cb=args[0];
            }                
            if (_.isString(args[0])){
       
            }        
            if (_.isArray(args[0])){
       
            }
    
        }           

        if (args.length > 1){
            cb=args[1];
        }
    }

    var fparams=new $gl.fetchPostCors();

    fparams.body=JSON.stringify( { "cmd" : "getProgs" } );
    var url=$gl.protocall + "//" + $gl.host + ":" + $gl.port + "/users";

    fetch(url, fparams
    )
    .then(response => response.json())
    .then(data => {             
            cb(data);
    }).catch(function(err){
        cb({},{err : err});
    })


  
}

$gl.fetchPerms=fetchPerms;


var getUserDetail=function(){
    var cb=()=>{};        

    var args=arguments;
    if ( args.length > 0){
        if (_.isPlainObject(args[0])){
            if (!_.isUndefined(args[0].cb)){
                cb=args[0].cb
            }
            
        }else{
            if (_.isFunction(args[0])){
                cb=args[0];
            }                
            if (_.isString(args[0])){
       
            }        
            if (_.isArray(args[0])){
       
            }
    
        }           

        if (args.length > 1){
            cb=args[1];
        }
    }

    var fparams=new $gl.fetchPostCors();

    fparams.body=JSON.stringify( { "cmd" : "getUserDetail" } );
    var url=$gl.protocall + "//" + $gl.host + ":" + $gl.port + "/users";

    fetch(url, fparams
    )
    .then(response => response.json())
    .then(data => { 
            cb(data);
    })


  
}

$gl.getUserDetail=getUserDetail;

$gl.uuid=uuidv4




var batchRunTimed=function(params, runitems_arr ,cb , cb_end){ // waterfall timed kick off
    /*
        // example of use : kicks off 3 at a time evert 3 seconds 
        batchRun( 
            {  count : 3,interval : 3000} , 
                custtest , 
                function(ret){
                    console.log( "running : ", new Date(), " - " ,ret)
                    return
                
                }, 
                function(){
                    console.log( "...done" )
                }
        )
    */


    var interval=5000
    var count=2
    var usetimout=true
    var arr_copy = JSON.parse(JSON.stringify(runitems_arr)) //workaround for non native deep copy arry options {...runitems_arr}
    var endcb_hasrun=false
    var waitfornext=false

    if (params.interval){
        interval=params.interval
    }
    if (params.count){
        count=params.count
    }
    if (params.usetimout){
        usetimout=params.usetimout
    }
    if (params.waitfornext){
        waitfornext=params.waitfornext
    }

    //var total=runitems_arr.length
    //var wI=0
    //var run=true
    
    var cnt=0  
    if (cnt){}
    var recur= function(arr,count,cb){
        if (arr.length ===0){
            //cb_end()
            return
        }
        cnt++;
        
        var next_hasrun=false
        var next=function(){
            arr.splice(0 , 1 )
            recur(arr, count, cb) 
            next_hasrun=true

            if (arr.length===0){   
                if (!endcb_hasrun){         
                    cb_end()
                    endcb_hasrun=true
                }    
            }

            return
        }

        var iter=0
        var totalcount=count
        var count_batch_subtotal=1
        var nxt={}
        while (iter < totalcount){
            if (arr.length===0){   
                if (!endcb_hasrun){         
                    cb_end()
                    endcb_hasrun=true
                }
                return
                break
                
            }
            count_batch_subtotal++
            nxt={ next : next , count_batch_subtotal : count_batch_subtotal ,arr_len : arr.length }

            cb(arr[0] , nxt)
            if ( waitfornext){
                return
            }
            arr.splice(0 , 1 )
            iter++
        }
        
        if ( !waitfornext){
            if (usetimout){
                setTimeout(
                    function(){
                        if (!next_hasrun){
                            recur(arr, count, cb) 
                        }
                    } 
                    , interval 
                )
            }else{
                if (!next_hasrun){
                    recur(arr, count, cb)
                }
                
            }
        }
            
        
        
    }
    var initRecfunction=function(arr , count,cb){
        
        recur(arr , count , cb)
    }
    /////////////////////////////////////
    initRecfunction(arr_copy , count , cb )
}
$gl.batchRunTimed=batchRunTimed

export default $gl;