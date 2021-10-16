 
import {useState , useEffect} from "react"
import {connect} from 'react-redux'
import _, { set } from "lodash"
import $gl from "./global"

import { Table, Column, HeaderCell, Cell } from 'rsuite-table';
//import 'rsuite-table/lib/less/index.less'; // or 'rsuite-table/dist/css/rsuite-table.css'
import 'rsuite-table/dist/css/rsuite-table.css' 

/*
var $gl
async function loadMyModule() {
  $gl= await import("./global").then(function(a){
    $gl=a.default
    console.log("importing dynamic" , a)
    return $gl
  })
}
loadMyModule()
*/


var host=$gl.fn.getHost();
var port=$gl.fn.getPort()
var protocall=$gl.fn.getProtocall();

var dataList = [
  { id: 1, name: 'a', email: 'a@email.com' },
  { id: 2, name: 'b', email: 'b@email.com' },
  { id: 3, name: 'c', email: 'c@email.com' }
];

const ImageCell = ({ rowData, dataKey, ...rest }) => (
  <Cell {...rest}>
    <img src={rowData[dataKey]} width="50" />
  </Cell>
);

const mapStateToProps = function(state , owsProps){
    return {
        global : state.global,
        loggedin : state.loggedin
    }
}
const mapDispatchToProps = function(dispatch){
  return {
    login : function(){  dispatch({ type : 'login'})  },
    logout : function(){  dispatch({ type : 'logout'})  },
    globalChange : function(){  dispatch({ type : 'globalChange'})  }
  }
}


function Projects({ global , globalChange}){    
    var [caldates,setCaldates]=useState([])

    useEffect(function(){

      fn1(function(data){
        setCaldates(data.data.ooo)
      })

    },[])


    var fn1=function(){
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

      fparams.body=JSON.stringify( { cmd : "getProjectsTodayAll"} );
      var url=protocall + "//" + host + ":" + port + "/dates";

      fetch(url, fparams
      )
      .then(response => response.json())
      .then(data => { 
              cb(data);
      })

    }

    dataList=[];

    _.each(caldates,function(r,i){
        var rec={}
        rec.title=r.title + " " + r.desc;
        rec.name=r.name + " " + r.surname;
        rec.email=r.email;
        rec.date=r.date;

        dataList.push(rec)
    })
    
    var width=300,height=100,cellwidth=undefined , borderRadius=3

    return(
      <div style={{width :width, borderRadius : borderRadius, background : "white"}}>
            <h6 style={{ color : "black", "marginBottom" : 3}}> 
              Projects
            </h6>            
                
            <Table style={{color : "black", "fontSize" : 10, "marginBottom" : 3,paddingBottom : 3  ,borderRadius : 10 }} 
                  data={dataList} headerHeight={25} rowHeight={25} height={height }
              >
                <Column width={cellwidth} sortable fixed resizable>
                    <HeaderCell>Title</HeaderCell>
                    <Cell dataKey="title" />
                </Column>

                <Column width={cellwidth} sortable resizable>
                    <HeaderCell>Name</HeaderCell>
                    <Cell dataKey="name" />
                </Column>
                { /*
                <Column width={cellwidth} sortable resizable>
                    <HeaderCell>Email</HeaderCell>
                    <Cell>
                        {(rowData, rowIndex) => {
                        return <a href={`mailto:${rowData.email}`}>{rowData.email}</a>;
                        }}
                    </Cell>
                </Column>
                */ }
                <Column width={cellwidth} sortable resizable>
                    <HeaderCell>Date</HeaderCell>
                    <Cell dataKey="date" />
                </Column>

               
            </Table>

       </div>

    )

}

export default connect(mapStateToProps, mapDispatchToProps)(Projects)