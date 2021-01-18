import React, {useState, useEffect,  } from 'react'
import {  useHistory } from "react-router-dom";



import { useGlobalContext } from './context';   // global state



const Login = () => {


        const {grantAuth,  setToken,token  } = useGlobalContext();
           

        //       const [username,setUsername] = useState('testuser')   //testing purpose
        // const [password,setPassword] =  useState('EbpucVzUP5cvsYha0E9i') //testing purpose
        const [username,setUsername] = useState('')
        const [password,setPassword] =  useState('')        
   
        const [userFound,setUserFound] = useState(false)  
        const [loading,setLoading] = useState(false)  // when set to true wll perform function to get access_token

               let history = useHistory(); //to use redirect
         
        
            useEffect(() => {

                    if(userFound){

                            if(token === "" || token==="undefined" ){
                                alert('Login - issue. please try again')
                            }else{
                                // id okay
                                
                             
                                     grantAuth(); // person authorised
                                // console.log("redirect");
                                    sessionStorage.setItem('user', token)
                                    // <Redirect from="/login" to="/dashboard" />
                                    history.push('/dashboard');
                            

                            }
                        

                    }

                 setUserFound(false)   //reset value 

          }, [userFound])
        

        const handleSubmit = async (e)=>{
             e.preventDefault();
             setLoading(true)
                      
          
          
        } 
        
        useEffect(() => {

            if(loading){
                     
                const getid = async() =>{

                   const id =  await fetch("/login", {
                       method: "POST",
                       body: JSON.stringify({ username: username, password: password}),
                        headers: {
                    'Content-Type': 'application/json'
                    },
                     
                    })
                    .then( res =>  res.json())
                    .then(data =>{

                          // console.log("data - 79 login",data);
                         setToken(data)  // update access token
                         setLoading(false) // reset value
                         setUserFound(true)  //trigger
                    })       
                
               } 

                getid()
              


            }

              
            
        }, [loading])

         
    
    return (
         <>
            
                <form  onSubmit={handleSubmit}>
                    <div class="form-group">
                        <label>Username:</label>
                        <input class="form-control" required type="text" name="username" value={username} onChange={(e)=>setUsername(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <label>Password:</label>
                        <input class="form-control" required type="password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)}/>
                    </div>
                    <div class="form-group">
                        <input class="btn btn-primary" type="submit" value="Log In"/>
                    </div>
                    
                </form>     
                          




        </>
    )
}

export default Login

