import { snippets }  from "../custom/cmmode"
import _ from "lodash"

var jsfns_o=function(){
    
    var obj={
                
        snippit : {
            thisRoot : this
            ,get : function(){
                var args=arguments;

            }    
        }
        ,snippets : {
            thisRoot : this
            ,mongo : mongosnippets
            ,bash : bashsnippets
            ,js : jssnippets
            ,react : reacjssnippets
            ,nodejs : nodejssnippets
            ,css : csssnippets
            ,golang : gosnippets 
            
        }    
        ,addmongo : function(){

        }
        ,init : function(){
            var tt=this
            _.each(snippets,function(r,p){
                var exists=false
                if ( !_.isUndefined(tt.snippets[p]) ){
                    exists=true;
                }

                if (!exists){
                    tt.snippets[p]=r
                }else{
                    var new_rec
                    new_rec=_.mergeDeep(tt.snippets[p] ,r )
                    tt.snippets[p]=new_rec;
                }


            })
        }

    }

    obj.init.apply(obj, this)
    return obj
}


var mongosnippets={

all : {
createdb : {
name : "",desc : "",param : { replacers : {} },
code : 
`
`
}
,addTable :{
name : "",desc : "",param : { replacers : {} },
code : 
`
`
} 

,delTable : {
name : "",desc : "",param : { replacers : {} },
code : 
`
`
}

} 

}


var bashsnippets={
all : {

find : {
name : "",desc : "",param : { replacers : {} },
code : `find .`
}

}


}

var jssnippets={
all : {

var : {
name : "",desc : "",param : { replacers : {} },
code : `var name`
}

}

}

var nodejssnippets={
all :{
    var : {
    name : "",desc : "",param : { replacers : {} },
    code : `var name`
}

}

}

var reacjssnippets={
all : {

getAttributePropVal : {
name : "",desc : "",param : { replacers : {} },
code : 
`
var newVal=e.target.getAttribute('attr')
`
},

checkbox : {
    name : "",desc : "",param : { replacers : {} },
    code : 
    `<input type="checkbox" checked={tt.state.GCedit} 
    onChange={
        function(e){
            tt.setState({ GCedit :  e.target.checked})
        }
    }
/>`
    },
"propsJsonObjAsDynamicProp" : {
    "name" : "",
    "code" : `
    var commonProps={ style : { background : "blue"} ,id : "abc"}

    <MyJsx {...commonProps} />`
},
"re-render_updateHTML" : {
    "name" : "",
    "code" : `this.forceUpdate();`
}



    

}

}




var csssnippets={
all : {
hoverPointer : {
name : "",desc : "",param : { replacers : {} },
code : `cursor : "pointer"`
},
textAreaNoWrap : {
    name : "",desc : "removes word wrap and respects tabs and spaces ",param : { replacers : {} },
    code : `overflow : "scroll",overflowWrap: "normal",whiteSpace: "pre"`
    }

,
textAreaNoWrap2 : {
        name : "",desc : "removes word wrap but doesnt care about spaces and tabs",param : { replacers : {} },
        code : `overflow : "scroll",overflowWrap: "nowrap"`
    }

}

}


var gosnippets={
all : {
a : {
name : "",desc : "",param : { replacers : {} },
code : 
`
`
}

}

}
        
    
export const jsfnsO=jsfns_o;


var jsfns=new jsfns_o()

export default jsfns;
