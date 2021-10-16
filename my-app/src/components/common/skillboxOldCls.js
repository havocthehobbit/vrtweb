import React, { Component ,useLayoutEffect, useState } from 'react';

import { SharedContext } from '../sharecontextapi'

import _ from 'lodash';

import { Button as Btn , Drawer as Dr ,Popover, Menu,Position, MenuItem} from "@blueprintjs/core";
import "@blueprintjs/core/lib/css/blueprint.css";
 
import { globaljs }  from "./GlobalLib";


var $gl=globaljs;

class Skillsbox extends Component { 

    constructor(props) {
      super(props); // always needed in scontructer
      
      //console.log( props.value );

      if (props.style!==undefined){
          var style=props.style;
      }
      this.state={ newvalue : props.value , style : style , children : props.children} 

    }

    render(){
        var pagename='Skillsbox';
        
        var style={position:"relative" , background : "lightgrey" , width : 430 , height :300, borderRadius : 5 };
        var newstyle=_.merge( style , this.state.style);
        var children=this.state.children;
        return(
                
                <div style={newstyle}>
                    
                    <div style={{padding : 10 }}>
                    <Popover content={
                        <Menu>
                            <MenuItem text="Submenu">
                                <MenuItem text="Child one" />
                                <MenuItem text="Child two" />
                                <MenuItem text="Child three" />
                            </MenuItem>
                        </Menu>} position={Position.RIGHT_TOP}>
                        <Btn icon="share" text="Open in..." />
                    </Popover>
                        <Btn intent="success" text="button" />

                        <SharedContext.Consumer>
                            {
                                obj => {

                                    return (
                                            <Btn intent="success"  text="test"
                                                onClick={
                                                            function(){  
                                                                
                                                                var menus=obj.global_state.menus;
                                                                if ( menus.testing ){
                                                                    menus.testing=false;
                                                                }else{
                                                                    menus.testing=true;
                                                                }
                                                               
                                                                
                                                                obj.global_update(menus) ;                                                             
                                                            }  
                                            
                                                }
                                            />
                                    )
                                }
                            }
                        </SharedContext.Consumer>


                        <h4>{pagename}</h4>
                        <div>
                            add skill , edit skill 
                        </div>
                        <div>
                            skills list

                            { children}

                            <table>
                                <thead>
                                    <tr>
                                        <th>name</th>
                                        <th>age</th>

                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>bb</td>
                                        <td>22</td>

                                    </tr>
                                </tbody>
                            </table>

                        </div>
                    </div>
                </div>
            
          );
      }

}

   
export default Skillsbox ;