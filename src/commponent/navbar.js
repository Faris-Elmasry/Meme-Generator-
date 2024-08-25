 import logo from './image/logo.webp'
 import React from 'react'
   export default   function Navbar(props){
 
 
    
  
    let icon = props.mode ? "fa-solid fa-toggle-off" : "fa-solid fa-toggle-on"
    let backcolors =props.mode ?" linear-gradient(to right, #672280 1.18%, #A626D3 100%)":"linear-gradient(to right, #060407 , #5a276c ,#060407 100%)" 
   let  Style = {
      backgroundImage:backcolors
      
   }
               
return(
<div className="navbar"  style={Style}>
 <img src={logo} ></img>
 <h2 className="logo-title"> Meme generator</h2>
<ul className="nav-lists"> 

     
 <li>light <i class={icon} onClick={props.togglemode}></i>  Dark</li>
 
 {/*  <i class="fa-solid fa-toggle-off"></i> 
 
 
 <i class="fa-solid fa-toggle-on"></i>*/}

</ul>
</div>

/*  <i class="fa fa-car"  ></i>
<i class="fa fa-car" style="font-size:60px;color:red;"></i>*/ 
)

}