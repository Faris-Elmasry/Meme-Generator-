 
import './App.css';
import Navbar from  './commponent/navbar';
import Contetnt  from './commponent/content';
import React from 'react';

 
 
 
 


 
 




function App() {
  let [mode,setmode] =React.useState(true)

  function togglemode(){
    setmode((oldvalue)=> !oldvalue)
    console.log(mode)
  }

  return (
    <div className="App" >
     <Navbar  mode={mode} togglemode={togglemode}/>
     <Contetnt  mode={mode} />
 
  

    
    </div>
  );
}

export default App;
