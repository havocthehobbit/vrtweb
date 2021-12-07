import { useEffect, useState,Component} from "react"
import _ from "lodash";
import $gl from "../common/global";
import { cmpPos } from "codemirror";


// getdata - cb(data) ,dbstyle , tablestyle , viewstyle , relationshipstyle
/* data - 
            { name : "web1" , type : "mongodb" , dbtype : "big_data", 
            uuid : "123" , colcount : 0 , 
            tables : { all:[
            { name : "users" , uuid : "1" , colcount : 0 }   
            ]} ,
            views : {all:[]} , 
            relationships : {all:[]} },
        ]
}*/
class DatabaseObj extends Component {    
    constructor(props) {
        super(props); // always needed in scontructer
                        
        var style={}
        if (props.style!==undefined){
            style=props.style;
        }

        var dbstyle={}
        if (props.dbstyle!==undefined){
            dbstyle=props.dbstyle;
        }

        var tablestyle={}
        if (props.tablestyle!==undefined){
            tablestyle=props.tablestyle;
        }

        var viewstyle={}
        if (props.viewstyle!==undefined){
            viewstyle=props.viewstyle;
        }

        var relationshipstyle={}
        if (props.relationshipstyle!==undefined){
            relationshipstyle=props.relationshipstyle;
        }
        

        var width=900
        if (props.width!==undefined){
            width=props.width;
        }
        var height=undefined
        if (props.height!==undefined){
            height=props.height;
        }
        

        var data={}
        if (props.data!==undefined){
            data=props.data;
        }

        var opts={}
        if (props.opts!==undefined){
            opts=props.opts;
        }

        this.state={  style : style , children : props.children , mainName : "noname" ,someval : "someval1",
                      databases : { all : [] }, database : _.clone(this.defs.database )  , current : {}, dbname : "",
                      params : _.clone(this.defs.params),
                      width :  width , height : height ,
                      dbstyle : dbstyle , tablestyle :tablestyle , viewstyle : viewstyle , relationshipstyle : relationshipstyle,
                      data : data , opts : opts

        } 
  
    }

    componentDidMount(){
        //initialise
        var tt=this

        var updatestate=false;
        var state={}
        if (!_.isEmpty(this.state.opts)){
            updatestate=true
        }

        if (!_.isEmpty(this.state.data)){
            updatestate=true

            state.databases=this.state.data

            tt.validateInputData(state.databases)
        }

        if (updatestate){
            tt.setState(state)
        }


    }

    componentDidUpdate(prevProps, prevState){
        if (_.isFunction(this.props.fn)){
            //this.props.fn()

        }

        if (prevState.databases !== this.state.database){
            if (!_.isEmpty(this.state.data)){
                
               // this.setState({ data : this.state.database } )
            }
        }
    }

    validateInputData=function(data){
        
    }

    getData=function(cb){
        var tt=this
        var data=_.clone(tt.state.databases)
        cb(data) 
    }

    onSave=function(data){

    }

    save=function(data){

        this.onsave(data)
    }

    tt=this
   
    defs={
        database : { name : "" , type : "mongodb" , dbtype : "big_data", uuid : "" , colcount : 0 , tables : {all:[]} , views : {all:[]} , relationships : {all:[]} },
        current : {  name :  "" , uuid :  "", db :  {} ,
            database : {} , iter : -1 , tablename : "" , viewame : "" 
        } 
        ,params : { 
            type : "mongodb",dbtype : "big_data" , uuid : "", tableecount : 0 
        }
 
    }

    

    render (){
        var tt=this
        
        

        var dblist=function(){
            var dbE=[]
            tt.state.databases.all.forEach((r,i) => {
                dbE.push(
                            <div key={i} iter={i} style={{ position : "relative",width : undefined , padding : 3, margin : 3 ,background : "lightgrey", borderRadius : 6}}
                                onClick={
                                    function(e){
                                        var iter=e.target.getAttribute("iter")
                                        var record=tt.state.databases.all[iter]

                                        var current=_.clone(tt.defs.current)
                                        current.name=record.name 
                                        current.uuid=record.uuid
                                        current.db=record
                                        current.database=tt
                                        current.iter=iter

                                        tt.setState( { database : record },
                                                        ()=>{ 
                                                            
                                                                tt.setState( { current :current
                                                                            },
                                                                            ()=>{ }
                                                                )

                                                        })
                                    
                                    }
                                } 
                            >
                                {r.name} - tables : {r.colcount}
                            </div>
                )
            });

            return (
                <div style={{ color : "black", width : undefined , height : undefined , background : "white"}}>
                    <div>
                        <label>databases - {tt.state.current.name} </label>
                        <br/>
                        <input type="input" value={tt.state.dbname}
                            onChange={
                                function(e){
                                    tt.setState({ dbname: e.target.value })
                                }
                            }
                        />

                        <button
                            onClick={
                                function(e){
                                    var dbrec=_.clone(tt.defs.database)
                                    dbrec.uuid=$gl.uuid()
                                    dbrec.name=tt.state.dbname
                                    dbrec.tables={ all : [] }
                                    dbrec.views={ all : [] }
                                    dbrec.relationships={ all : [] }
                                    
                                    
                                    var temp=_.clone(tt.state.databases);
                                    var exists=false;
                                    tt.state.databases.all.forEach(function(r,i){
                                        if (r.name===dbrec.name){
                                            exists=true
                                        }
                                    })
                                    if (!exists){
                                        temp.all.push(dbrec)
                                        tt.setState({ databases : temp })
                                    }else{
                                        alert( dbrec.name + " - already exists")
                                    }
                                }
                            }
                        >
                            add
                        </button>

                        {dbE}
                    </div>
                </div>
            )
        }()

        var paramslist=function(){
            var propsContWidth=300
            var propsheight=20
            var labelsWidth=100
            var valWidth=150
            var valFontSize=20

            var paramsE=[]
            _.each(tt.state.params,function(r,p){
                paramsE.push(
                                <div key={p} style={{ background : "white"}}>
                                    
                                    <div style={{ width : propsContWidth}}>
                                        <label style={{width : labelsWidth , height : undefined }}>{p}</label>
                                        :
                                        <input style={{width : valWidth , height : undefined, float : "right" , fontSize : valFontSize}} 
                                            value={r}
                                            onChange={
                                                function(e){

                                                }
                                            }
                                        />
                                    </div>
                                </div>
                )
            });

            return (
                <div style={{ position : "relative",  color : "black", width : undefined , height : undefined , background : "white"}} >
                    <label>params</label>
                    <br/>
                    {paramsE}
                </div>
            )

        }()

        var style=_.merge( 
            {position : "relative", margin: 4,color : "black", width : tt.state.width , height : tt.state.height , background : ""}
            ,
            tt.style
        )

        var dbstyle=_.merge( 
            {width : undefined , height : undefined, 
                background : "white", position : "relative" , border : "solid thin black" , 
                borderRadius : 5, padding : 55, margin : 10 }
            ,
            tt.style
        )


        if (_.isFunction(tt.props.getdata)){
            tt.getData(tt.props.getdata)
        }

        return (

                <div style={style}>
                    
                    <div  
                        style={dbstyle}
                    >   
                        <div >
                            <div style={{ position : "relative" , width : 300 , float : "left"}}>
                                <div  >
                                    {dblist}
                                </div>
                                <div >
                                    {paramslist}
                                </div>                               
                            </div>                               
                            <div style={{ position : "relative" , width : 300 , float : "left"}} >
                                <DBEdtitorObj db={tt.state.current} width={200} height={100} />
                            </div>
                            <div style={{ "clear" : "left"}}/>
                         </div>
                    </div>
                    <div 
                        style={{ position : "relative"}}
                    >
                        <div 
                            style={{ position : "relative" , border : "solid thin black" , borderRadius : 5, padding : 5, margin : 5 }}
                        >
                            <TablesObj db={tt.state.current} height={300} tablestyle={tt.state.tablestyle}/>
                        </div>
                        <div 
                            style={{ position : "relative" , border : "solid thin black" , borderRadius : 5, padding : 5, margin : 5 }}
                        >
                            <RelationshipsObj db={tt.state.current}   height={300} relationshipstyle={tt.state.relationshipstyle}/>
                        </div>
                        <div 
                            style={{ position : "relative" , border : "solid thin black" , borderRadius : 5, padding : 5, margin : 5 }}
                        >
                            <ViewsObj db={tt.state.current} height={300}  viewstyle={tt.state.viewstyle} />
                        </div>
                        
                    
                        
                    </div>
                    

                    
                </div>
            )
    }
}


class TablesObj extends Component {
    constructor(props) {
        super(props); // always needed in scontructer
                        
        var style={}
        if (props.style!==undefined){
            style=props.style;
        }

        var db={ name : "" , db : { name : ""}}
        if (props.db!==undefined){
            db=props.db;
            this.db=db

            
        }
        //console.log( "db in prop ", db)

        this.state={  style : style , children : props.children , mainName : "noname" ,someval : "someval1",
                        tables : {all:[]} , table : {} , current : {} , tbname : "",
                        db : db , dbname : db.name , colname : "" , col : _.clone(this.defs.col)
    
        } 
  
    }

    componentDidMount(){
        //initialise
    }

    updateAndNotify(){

    }

    componentDidUpdate(prevProps) {
        var tt=this
        var db={}
        tt.state.db=this.props.db 
        tt.state.dbname=db.name
        db=this.props.db 
        this.db=db
        
        //console.log("update " , tt.db)
        

        if (prevProps.db !== this.props.db) {
            tt.setState({ dbname : db.name , db : db})
            //console.log("set")
        }
    }

    defs={
        table : { name : "" , uuid : "" , colcount : 0 , cols : { all : [] } },
        col : { name : "" , length : 0 , type : "string" , keys : {} , index : {} } 
    }

    updatedb=function(){
        var tt=this
        console.log(tt.db)
        var tempdbs=tt.db.database.state.databases
        var dbiter=tt.db.iter
        var tempdb=tempdbs.all[dbiter]
        //console.log("tempdb : ", tempdb )
        tempdb.colcount++
        
        tt.db.database.setState( { databases : tempdbs } )
        
    }

   

    render (){
        var tt=this
        var db=tt.db

        var listtables=function(){
            var tbE=[]
            var db=tt.db

            if ( !_.isEmpty(tt.props.db)){
                db=tt.props.db
            }else{
                db=tt.db
            }

            if ( _.isEmpty(db)){
                db={ dbname : "" , name : "", 
                     db : { name : "" , 
                            tables : {all : [] } 
                            
                     }
                     ,database : { all : [] } 
                    
                    }
            }

            //console.log("tasbles " , db.db)
            //console.log("databases  : " , db.database.state)
            var tables=db.db.tables
            tables.all.forEach((r,i) => {
                tbE.push(
                            <div key={i} iter={i} style={{ width : undefined , padding : 3, margin : 3 ,background : "lightgrey", borderRadius : 6}}
                                onClick={
                                    function(e){
                                        var iter=e.target.getAttribute("iter")
                                        //var record=tt.state.tables.all[iter]
                                        var record=tables.all[iter]

                                        var current={  name : record.name , uuid : record.uuid, tb : record ,
                                                        table : tt , iter : iter
                                                    } 

                                        tt.setState( { table : record },
                                                        ()=>{ 
                                                            
                                                                tt.setState( { current : current
                                                                            },
                                                                            ()=>{ }
                                                                )

                                                        })
                                    
                                    }
                                } 
                            >
                                {r.name} - cols : {r.colcount}
                            </div>
                )
            });
           
            return (
                <div style={{ color : "black", width : undefined , height : undefined , background : "white"}}>
                    <label>tables - tb : {tt.state.table.name} - db : {db.db.name}</label>
                    <br/>
                    <input type="input" value={tt.state.tbname}
                            onChange={
                                function(e){
                                    tt.setState({ tbname: e.target.value })
                                }
                            }
                    />

                    <button
                        onClick={ // #add table
                            function(e){

                                if (!_.isUndefined(tt.props.db)){
                                    if (_.isUndefined(tt.props.db.name)|| _.isEmpty(tt.props.db.name)){
                                        alert("select a database")
                                         return;
                                    }
                                }
                                
                                var dbrec=_.clone(tt.defs.table)
                                    dbrec.name=tt.state.tbname
                                    dbrec.uuid=$gl.uuid()
                                    dbrec.cols=_.clone(tt.defs.cols)
                                    //var temp=_.clone(tt.state.tables);
                                    var temp=_.clone(tables);
                                    var exists=false;
                                    //tt.state.tables.all.forEach(function(r,i){
                                    tables.all.forEach(function(r,i){
                                        if (r.name===dbrec.name){
                                            exists=true
                                        }
                                    })
                                    if (!exists){ // #add record
                                        temp.all.push(dbrec)
                                        tables=temp;
                                        tt.setState({ tables : temp , dbname : tt.props.db.name },function(){
                                            //console.log("tb db : ", tt.db )
                                        })

                                        tt.updatedb()
                                       


                                    }else{
                                        alert( dbrec.name + " - already exists")
                                    }                                
                            }
                        }
                    >
                        add
                    </button>

                    {tbE}
                </div>
            )
        }()

        var listcols=function(){
            var colsE=[]

            var table
            var cols
            //console.log( "table  " ,tt.state.table)
            if (_.isUndefined(tt.state.table)){
                table=_.clone(tt.defs.table)
            }else{
                table=tt.state.table
            }

            if (_.isUndefined(table.cols)){
                cols={all :[]}
                table.cols=cols;
            }else{
                cols=table.cols
            }
            
            
            cols.all.forEach(function(r,i){
                colsE.push(
                    <div key={i} iter={i}
                        onClick={
                            function(e){
                                // set current col
                                var iter=e.target.getAttribute("iter")
                                var rec=cols.all[iter]
                                //console.log("rec : " ,rec)

                                tt.setState( { col : rec  } )
                            }
                        }
                    >
                        {r.name}
                    </div>

                )

            })


            

            return (
                <div>
                    <label>columns</label>
                    <br/>
                    <input 
                            value={tt.state.colname}
                            onChange={
                                function(e){
                                    tt.setState({ colname : e.target.value})
                                }
                            }
                    />
                    <button
                        onClick={
                            function(){
                                var dbrec=_.clone(tt.defs.col)
                                dbrec.name=tt.state.colname
                                dbrec.uuid=$gl.uuid()
                                dbrec.col=_.clone(tt.defs.col)
                                //var temp=_.clone(tt.state.tables);
                                var temp=_.clone(cols);

                                //var cols=_.clone(tt.current.tb.cols)

                                var exists=false;
                                //tt.state.tables.all.forEach(function(r,i){
                                cols.all.forEach(function(r,i){
                                    if (r.name===dbrec.name){
                                        exists=true
                                    }
                                })
                                if (!exists){ // #add record
                                    temp.all.push(dbrec)
                                    cols=temp;
                                    tt.setState({ cols : temp  },function(){
                                        //console.log("tb db : ", tt.db )
                                    })

                                    //tt.updatedb()
                                   


                                }else{
                                    alert( dbrec.name + " - already exists")
                                }           
                            }
                        }
                    >
                        add
                    </button>
                    <br/>
                    {colsE}
                </div>
            )
        }()
        
        var colform=function(){
            var propsContWidth=300
            var propsheight=20
            var labelsWidth=100
            var valWidth=150
            var valFontSize=20

            var formE=[]
            
            var fcol={ name : "" , type : "string"}
            
            if (!_.isEmpty(tt.state.col)){
                fcol.name=tt.state.col.name
                fcol.type=tt.state.col.type
            }

           // console.log("fcol : " ,fcol)

            _.each(fcol,function(r,p){
                formE.push(
                                <div key={p} style={{ color : "black" ,background : "white"}}>
                                    
                                    <div style={{ width : propsContWidth}}>
                                        <label style={{width : labelsWidth , height : undefined }}>{p}</label>
                                        :
                                        <input style={{width : valWidth , height : undefined, float : "right" , fontSize : valFontSize}} 
                                            value={r}
                                            onChange={
                                                function(e){

                                                }
                                            }
                                        />
                                    </div>
                                </div>
                )
            })

            return (
                <div
                    style={{position : "relative" , color : "black"}}
                >
                    <label>col details </label>
                    <br/>
                    {formE}
                    
                </div>
            )
        }()

       
        var style=_.merge( { margin: 4,color : "black", width : tt.props.width  , height : tt.props.height  , background : "white"},
                            tt.style)

        return (

            <div style={style}>
                <div  
                    style={{width : 500 , position : "relative" , float : "left"}}
                >
                    {listtables}
                </div>
                <div 
                    style={{width : 250 , top : 50, position : "relative" , float : "left"}}
                >
                    {listcols}
                </div>
                <div 
                    style={{width : 250 , position : "relative" }}
                >
                    {colform}
                </div>
               
               
            </div>
        )
    }
}


class ViewsObj extends Component {
    constructor(props) {
        super(props); // always needed in scontructer
                        
        var style={}
        if (props.style!==undefined){
            style=props.style;
        }

        var db={ name : "" , db : { name : ""}}
        if (props.db!==undefined){
            db=props.db;
            this.db=db

            
        }
        //console.log( "db in prop ", db)

        this.state={  style : style , children : props.children , mainName : "noname" ,someval : "someval1",
                        views : {all:[]} , view : {} , current : {} , vwname : "",
                        db : db , dbname : db.name
    
        } 
  
    }

    componentDidMount(){
        //initialise
    }

    updateAndNotify(){

    }

    componentDidUpdate(prevProps) {
        var tt=this
        var db={}
        tt.state.db=this.props.db 
        tt.state.dbname=db.name
        db=this.props.db 
        this.db=db
        
        //console.log("update " , tt.db)
        

        if (prevProps.db !== this.props.db) {
            tt.setState({ dbname : db.name , db : db})
            //console.log("set")
        }
    }

    defs={
        col : { name : "" , length : 0 , type : "string" , keys : {} , index : {} } 
    }

    updatedb=function(){
        var tt=this
        console.log(tt.db)
        var tempdbs=tt.db.database.state.databases
        var dbiter=tt.db.iter
        var tempdb=tempdbs.all[dbiter]
        //console.log("tempdb : ", tempdb )
        //tempdb.colcount++
        
        tt.db.database.setState( { databases : tempdbs } )
        
    }

   

    render (){
        var tt=this
        var db=tt.db

        var listviews=function(){
            var tbE=[]
            var db=tt.db

            if ( !_.isEmpty(tt.props.db)){
                db=tt.props.db
            }else{
                db=tt.db
            }

            if ( _.isEmpty(db)){
                db={ dbname : "" , name : "", 
                     db : { name : "" , 
                            tables : {all : [] } ,
                            views : {all : [] } ,
                            relationships : {all : [] } 
                            
                            
                            
                     }
                     ,database : { all : [] } 
                    
                    }
            }

            //console.log("tasbles " , db.db)
            //console.log("databases  : " , db.database.state)
            var views=db.db.views
            views.all.forEach((r,i) => {
                tbE.push(
                            <div key={i} iter={i} style={{ width : undefined , padding : 3, margin : 3 ,background : "lightgrey", borderRadius : 6}}
                                onClick={
                                    function(e){
                                        var iter=e.target.getAttribute("iter")
                                        //var record=tt.state.tables.all[iter]
                                        var record=views.all[iter]

                                        

                                        tt.setState( { view : record },
                                                        ()=>{ 
                                                            
                                                                tt.setState( { current : {  name : record.name , uuid : record.uuid, vw : record ,
                                                                                view : tt 
                                                                                        } 
                                                                            },
                                                                            ()=>{ }
                                                                )

                                                        })
                                    
                                    }
                                } 
                            >
                                {r.name} - cols : {r.colcount}
                            </div>
                )
            });
           
            return (
                <div style={{ color : "black", width : undefined , height : undefined , background : "white"}}>
                    <label>Views - db : {db.db.name}</label>
                    <br/>
                    <input type="input" value={tt.state.vwname}
                            onChange={
                                function(e){
                                    tt.setState({ vwname: e.target.value })
                                }
                            }
                    />

                    <button
                        onClick={ // #add table
                            function(e){

                                if (!_.isUndefined(tt.props.db)){
                                    if (_.isUndefined(tt.props.db.name)|| _.isEmpty(tt.props.db.name)){
                                        alert("select a database")
                                         return;
                                    }
                                }
                                
                                var dbrec={ name : "" , uuid : $gl.uuid() , colcount : 0 }
                                    dbrec.name=tt.state.vwname
                                    //var temp=_.clone(tt.state.tables);
                                    var temp=_.clone(views);
                                    var exists=false;
                                    //tt.state.tables.all.forEach(function(r,i){
                                    views.all.forEach(function(r,i){
                                        if (r.name===dbrec.name){
                                            exists=true
                                        }
                                    })
                                    if (!exists){ // #add record
                                        temp.all.push(dbrec)
                                        views=temp;
                                        tt.setState({ views : temp , dbname : tt.props.db.name },function(){
                                            //console.log("tb db : ", tt.db )
                                        })

                                        tt.updatedb()
                                       


                                    }else{
                                        alert( dbrec.name + " - already exists")
                                    }                                
                            }
                        }
                    >
                        add
                    </button>

                    {tbE}
                </div>
            )
        }()

        var style=_.merge( 
                            { margin: 4,color : "black", width : tt.props.width  , height : tt.props.height  , background : "white"}
                            ,
                            tt.style
                        )


        return (

            <div style={style}>
                {listviews}
            </div>
        )
    }
}

class RelationshipsObj extends Component {
    constructor(props) {
        super(props); // always needed in scontructer
                        
        var style={}
        if (props.style!==undefined){
            style=props.style;
        }

        var db={ name : "" , db : { name : ""}}
        if (props.db!==undefined){
            db=props.db;
            this.db=db

            
        }
        //console.log( "db in prop ", db)

        this.state={  style : style , children : props.children , mainName : "noname" ,someval : "someval1",
                        relationships : {all:[]} , relationship : {} , current : {} , rlname : "",
                        db : db , dbname : db.name
    
        } 
  
    }

    componentDidMount(){
        //initialise
    }

    updateAndNotify(){

    }

    componentDidUpdate(prevProps) {
        var tt=this
        var db={}
        tt.state.db=this.props.db 
        tt.state.dbname=db.name
        db=this.props.db 
        this.db=db
        
        //console.log("update " , tt.db)
        

        if (prevProps.db !== this.props.db) {
            tt.setState({ dbname : db.name , db : db})
            //console.log("set")
        }
    }

    defs={
        col : { name : "" , length : 0 , type : "string" , keys : {} , index : {} } 
    }

    updatedb=function(){
        var tt=this
        console.log(tt.db)
        var tempdbs=tt.db.database.state.databases
        var dbiter=tt.db.iter
        var tempdb=tempdbs.all[dbiter]
        //console.log("tempdb : ", tempdb )
        //tempdb.colcount++
        
        tt.db.database.setState( { databases : tempdbs } )
        
    }

   

    render (){
        var tt=this
        var db=tt.db

        var listrelationships=function(){
            var tbE=[]
            var db=tt.db

            if ( !_.isEmpty(tt.props.db)){
                db=tt.props.db
            }else{
                db=tt.db
            }

            if ( _.isEmpty(db)){
                db={ dbname : "" , name : "", 
                     db : { name : "" , 
                            tables : {all : [] } ,
                            views : {all : [] } ,
                            relationships : {all : [] } 
                            
                            
                     }
                     ,database : { all : [] } 
                    
                    }
            }

            //console.log("tasbles " , db.db)
            //console.log("databases  : " , db.database.state)
            var relationships=db.db.relationships
            relationships.all.forEach((r,i) => {
                tbE.push(
                            <div key={i} iter={i} style={{ width : undefined , padding : 3, margin : 3 ,background : "lightgrey", borderRadius : 6}}
                                onClick={
                                    function(e){
                                        var iter=e.target.getAttribute("iter")
                                        //var record=tt.state.tables.all[iter]
                                        var record=relationships.all[iter]

                                        

                                        tt.setState( { table : record },
                                                        ()=>{ 
                                                            
                                                                tt.setState( { current : {  name : record.name , uuid : record.uuid, rl : record ,
                                                                                table : tt 
                                                                                        } 
                                                                            },
                                                                            ()=>{ }
                                                                )

                                                        })
                                    
                                    }
                                } 
                            >
                                {r.name} - cols : {r.colcount}
                            </div>
                )
            });
           
            return (
                <div style={{ color : "black", width : undefined , height : undefined , background : "white"}}>
                    <label>Relationship - db : {db.db.name}</label>
                    <br/>
                    <input type="input" value={tt.state.rlname}
                            onChange={
                                function(e){
                                    tt.setState({ rlname: e.target.value })
                                }
                            }
                    />

                    <button
                        onClick={ // #add table
                            function(e){

                                if (!_.isUndefined(tt.props.db)){
                                    if (_.isUndefined(tt.props.db.name)|| _.isEmpty(tt.props.db.name)){
                                        alert("select a database")
                                         return;
                                    }
                                }
                                
                                var dbrec={ name : "" , uuid : $gl.uuid() , colcount : 0 }
                                    dbrec.name=tt.state.rlname
                                    //var temp=_.clone(tt.state.tables);
                                    var temp=_.clone(relationships);
                                    var exists=false;
                                    //tt.state.tables.all.forEach(function(r,i){
                                    relationships.all.forEach(function(r,i){
                                        if (r.name===dbrec.name){
                                            exists=true
                                        }
                                    })
                                    if (!exists){ // #add record
                                        temp.all.push(dbrec)
                                        relationships=temp;
                                        tt.setState({ relationships : temp , dbname : tt.props.db.name },function(){
                                            //console.log("tb db : ", tt.db )
                                        })

                                        tt.updatedb()
                                       


                                    }else{
                                        alert( dbrec.name + " - already exists")
                                    }                                
                            }
                        }
                    >
                        add
                    </button>

                    {tbE}
                </div>
            )
        }()

        var style=_.merge( 
            { margin: 4,color : "black", width : tt.props.width  , height : tt.props.height  , background : "white"}
            ,
            tt.style
        )
        return (

            <div style={style}>
                {listrelationships}
            </div>
        )
    }
}



class DBEdtitorObj extends Component {
    constructor(props) {
        super(props); // always needed in scontructer
                        
        var style={}
        if (props.style!==undefined){
            style=props.style;
        }

        var db={ name : "" , db : { name : ""}}
        if (props.db!==undefined){
            db=props.db;
            this.db=db

            
        }

        var width=undefined
        if (props.width!==undefined){
            width=props.width;
        }

        var height=undefined
        if (props.height!==undefined){
            height=props.height;
        }


        //console.log( "db in prop ", db)

        this.state={  style : style , children : props.children , mainName : "noname" ,someval : "someval1",                       
                        db : db , dbname : db.name,
                        height : width , width : width
    
        } 
  
    }

    componentDidMount(){
        //initialise
    }

    updateAndNotify(){

    }

    componentDidUpdate(prevProps) {
        var tt=this
        var db={}
        tt.state.db=this.props.db 
        tt.state.dbname=db.name
        db=this.props.db 
        this.db=db
        
        //console.log("update " , tt.db)
        

        if (prevProps.db !== this.props.db) {
            tt.setState({ dbname : db.name , db : db})
            //console.log("set")
        }
    }

    render(){
        
        var tt=this
        var style={position : "relative", margin: 4,color : "black", width : tt.state.width , height : tt.state.height , 
                    background : "white"}
        return(
        <div style={{style}}
          
        >
            <label>Data Editor</label>
            <br/>
            <input /><button>create DB instance</button>
            <br/>

        </div>)
    }

    }

export const Database=DatabaseObj


export const Tables=TablesObj
export const Views=ViewsObj
export const Relationships=RelationshipsObj
export const DBEdtitor=DBEdtitorObj







