import React from 'react'
import { Link } from 'react-router-dom';

import { useGlobalContext } from './context';   // global state

const Navbar = () => {

    
 const { auth } = useGlobalContext();

                  

    return (
        

        <nav style={navStyle}>
            <h1>Welcome</h1>
                                             
                <ul style={ulStyle}>
                
                  <li><Link style={linkStyle} to='/Home'>Home</Link></li>
                   {!auth ? <li><Link style={linkStyle} to='/login'>Log in</Link></li> : ""}
                   {auth ? <li><Link style={linkStyle} to='/dashboard'>Dashboard</Link></li> : ""}
                  
                
            

               </ul>

        </nav>
                 
           
    )
}
const ulStyle ={
    listStyleType: "none",
 

}
const navStyle = {
    background: 'lightblue',
    color: '#fff',
    textAlign: 'center',
    padding: '10px'
}

const linkStyle = {
        color: 'black',
     

}

export default Navbar
