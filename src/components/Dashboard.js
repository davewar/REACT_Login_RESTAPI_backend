import React, {useState, useEffect } from 'react'



import { useGlobalContext } from './context';   // global state

import { useHistory } from "react-router-dom";


const Dashboard = () => {
    // console.log("DASHBOARD");

      const {  stopAuth,setToken} = useGlobalContext();  // used on log off btn to change state of auth + loggedin
        let history = useHistory(); //to use redirect

        const initial = {
            car:"",
            cover:"",
             address:"",
             policy_ref:""
        }

       

        const [clientData, setClientData] = useState(initial)
            

         useEffect(() => {

       
                     
                const getid = async() =>{

                   const id =  await fetch("/dashboard", {
                       method: "GET",
                       headers: {
                    'Content-Type': 'application/json'
                    },
                     
                    })
                    .then( res => res.json())
                    .then(data =>{
                        // console.log("data - 46 dashboard",data);
                         const {car,cover, address,policy_ref} = data

                        // console.log("DW",car,cover, address,policy_ref);

                    setClientData({...clientData, car,cover, address,policy_ref})
                   
                     

                    })
                        
                
               } 

                getid()
              
            

              
            
        }, [])


      
        const closeLogin = (e)=>{

           stopAuth() // turn off auth
           setToken(null) // reset 

                 //clear local
        //    localStorage.removeItem('user');
        sessionStorage.removeItem('user');

                //redirect
           fetch("/logout")  // remove all cookies
            
            history.push('/home');
        }
            

    return (
                 
          <>

                
                <div style={container}>

                    <button onClick={closeLogin}>Log out</button>

                <h1>My Policy</h1>
                <br/>
            
                <h4>Policy reference</h4>
                <p>{clientData.car}</p>
                <br/>
                
                <h4>Cover Type</h4>
                <p>{clientData.cover}</p>
                <br/>
                
                <h4>Car</h4>
                <p>{clientData.car}</p>
                <br/>
                
                <h4>Address</h4>
                <p>{clientData.address}</p>
                <br/>
        
               </div>
       
         </>
    )
}

const container ={
    background: "lightgrey"
   

}

export default Dashboard
