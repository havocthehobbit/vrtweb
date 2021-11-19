import { useEffect, useState,Component} from "react"
import _ from "lodash";
import $gl from "../common/global";



class DatabaseObj extends Component {
    constructor(props) {
        super(props); // always needed in scontructer
                        
        var style={}
        if (props.style!==undefined){
            style=props.style;
        }

        this.state={  style : style , children : props.children , mainName : "noname" ,someval : "someval1",
                      databases : { all : [] }, database : {}  , current : {}, dbname : ""
        } 
  
    }

    componentDidMount(){
        //initialise
    }

    tt=this
   

    render (){
        var tt=this
     

        var dblist=function(){
            var dbE=[]
            tt.state.databases.all.forEach((r,i) => {
                dbE.push(
                            <div key={i} iter={i} style={{ width : undefined , padding : 3, margin : 3 ,background : "lightgrey", borderRadius : 6}}
                                onClick={
                                    function(e){
                                        var iter=e.target.getAttribute("iter")
                                        var record=tt.state.databases.all[iter]

                                        

                                        tt.setState( { database : record },
                                                        ()=>{ 
                                                            
                                                                tt.setState( { current : {  name : record.name , uuid : record.uuid, db : record ,
                                                                                            database : tt , iter : iter
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
                <div style={{ color : "black", width : 400 , height : 300 , background : "white"}}>
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
                                    var dbrec={ name : "" , uuid : $gl.uuid() , colcount : 0 }
                                    dbrec.name=tt.state.dbname
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

        

        return (

                <div style={{ margin: 4,color : "black", width : 400 , height : 300 , background : "white"}}>
                    {dblist}
                    <TablesObj db={tt.state.current} />
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

        var db={}
        if (props.db!==undefined){
            db=props.db;
            this.db=db
        }
        console.log( "db in prop ", db)

        this.state={  style : style , children : props.children , mainName : "noname" ,someval : "someval1",
                        tables : {all:[]} , table : {} , current : {} , tbname : "",
                        db : db
    
        } 
  
    }

    componentDidMount(){
        //initialise
    }

    updateAndNotify(){

    }

    componentDidUpdate(prevProps) {
        var db={}
        
        db=this.props.db 
        this.state.db=db
        this.db=db
        

        if (prevProps.db !== this.props.db) {
          this.updateAndNotify();
        }
    }

    db ={}

    render (){
        var tt=this
        var listtables=function(){
            var tbE=[]

            tt.state.tables.all.forEach((r,i) => {
                tbE.push(
                            <div key={i} iter={i} style={{ width : undefined , padding : 3, margin : 3 ,background : "lightgrey", borderRadius : 6}}
                                onClick={
                                    function(e){
                                        var iter=e.target.getAttribute("iter")
                                        var record=tt.state.tables.all[iter]

                                        

                                        tt.setState( { table : record },
                                                        ()=>{ 
                                                            
                                                                tt.setState( { current : {  name : record.name , uuid : record.uuid, tb : record ,
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
                <div style={{ color : "black", width : 400 , height : 300 , background : "white"}}>
                    <label>tables</label>
                    <br/>
                    <input type="input" value={tt.state.tbname}
                            onChange={
                                function(e){
                                    tt.setState({ tbname: e.target.value })
                                }
                            }
                    />

                    <button
                        onClick={
                            function(e){
                                var dbrec={ name : "" , uuid : $gl.uuid() , colcount : 0 }
                                    dbrec.name=tt.state.tbname
                                    var temp=_.clone(tt.state.tables);
                                    var exists=false;
                                    tt.state.tables.all.forEach(function(r,i){
                                        if (r.name===dbrec.name){
                                            exists=true
                                        }
                                    })
                                    if (!exists){
                                        temp.all.push(dbrec)
                                        tt.setState({ tables : temp },function(){
                                            //console.log("tb db : ", tt.db )
                                        })


                                        var tempdbs=tt.db.database.state.databases
                                        var dbiter=tt.db.iter
                                        var tempdb=tempdbs.all[dbiter]
                                        console.log("tempdb : ", tempdb )
                                        tempdb.colcount++
                                       
                                        tt.db.database.setState(tempdbs)
                                        


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

        return (

            <div style={{ margin: 4,color : "black", width : 400 , height : 300 , background : "white"}}>
                {listtables}
            </div>
        )
    }
}

export const Database=DatabaseObj


export const Tables=TablesObj


var Columns_count=0
export const Columns=(props)=>{
    var [someval,setSomeval]=useState("somevalue123")

    useEffect(()=>{
        Columns_count++
        if (Columns_count===1){ // once off initialise
            // window["someGlobalVar"]={ "some1" : 1 } // set/reate some global variable 
        }

        return ()=>{/*unmount*/ }
    })

    var someFn=function(){
        var args=arguments
        alert("I've joined a click")
    }

    return (
        <div>
            {someval}
            <button
                onClick={someFn /*run a function */ }
            >
                Click Me
            </button>   
            


        </div>
    )
}

var Views_count=0
export const Views=(props)=>{
    var [someval,setSomeval]=useState("somevalue123")

    useEffect(()=>{
        Views_count++
        if (Views_count===1){ // once off initialise
            // window["someGlobalVar"]={ "some1" : 1 } // set/reate some global variable 
        }

        return ()=>{/*unmount*/ }
    })

    var someFn=function(){
        var args=arguments
        alert("I've joined a click")
    }

    return (
        <div>
            {someval}
            <button
                onClick={someFn /*run a function */ }
            >
                Click Me
            </button>   
            


        </div>
    )
}


