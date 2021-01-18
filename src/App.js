import React,{useEffect} from 'react'
import Login from './components/Login'
import Home from './components/Home'
import Navbar from './components/Navbar'
import Error from './components/Home'
import {BrowserRouter as Router, Route, Switch,} from 'react-router-dom';
import Dashboard from './components/Dashboard'


import { useGlobalContext } from './components/context';   // global state



const App = () => {

     const { auth,setToken,grantAuth } = useGlobalContext();  // used on log off btn to change state of auth + loggedin  

  // user manually refesher browser after login
   useEffect(() => {

          //could use bcrypt encryption for session storage.
          const logUser =  sessionStorage.getItem('user')
          // const logUser = localStorage.getItem("user");
          console.log(logUser);
          if (logUser ) {
          
            setToken(logUser);
            grantAuth()
          }
   }, []);
 
  


  return (

    <div className="App">

       
       
          <Router> 
          
              <Navbar /> 
             <Switch>
               
      
            
                  <Route path="/Home">
                        <Home/>
                  </Route>
                  
                   <Route path="/login">
                  
                     {auth ? <Dashboard/> : <Login/>}
                  
                     
                  </Route>
                   <Route path="/dashboard">
                  
                     {auth ? <Dashboard/> : <Login/>}
                  
                     
                  </Route>
                  
                   
                                  
                  <Route path='*'>
                         <Error />
                </Route>

          
              </Switch>

      </Router>







    </div>
  );
}

export default App;
