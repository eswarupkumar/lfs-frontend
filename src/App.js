import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import ReactDOM from 'react-dom';
// import Navbar from './Components/Navbar'
import Signup from './Components/Signup'
import Login from './Components/Login'
import Feed from './Components/Feed'
import Response from './Components/Response'
import 'bootstrap/dist/css/bootstrap.min.css';
// import NotFound from './Components/NotFound'
import PrivateRoute from './Components/privateroute';
import Home from './Components/Home';
import ItemPage from './Components/ItemPage';
// import Feed from './Components/Feed'
import MyListings from './Components/MyListings'
import { ToastProvider } from 'react-toast-notifications';
window.OneSignal = window.OneSignal || [];
const OneSignal = window.OneSignal;
function App()
{
  useEffect(()=>{
    OneSignal.push(()=> {
      OneSignal.init(
        {
          appId: "fe13c665-7830-497e-9a3f-27a523840baf", //STEP 9
      
        welcomeNotification: {
          "title": "One Signal",
          "message": "Thanks for subscribing!",
        } 
      },
        //Automatically subscribe to the new_app_version tag
        // OneSignal.sendTag("new_app_version", "new_app_version", tagsSent => {
        //   // Callback called when tag has finished sending
        //   console.log('new_app_version TAG SENT', tagsSent);
        // })
      );
    });
  },[])
  // const name='Swarup K'
  return (
    <>
    <Router>
      <Switch>
        <Route path='/' component={Home} exact/>
        <Route path='/sign-up' component={Signup} exact/>
        <Route path='/log-in' component={Login} />
        <PrivateRoute path='/feed' component={Feed}  />
        <Route path='/mylistings'  component={MyListings} exact />
        <Route path='/responses' component={Response} exact />
        <ToastProvider autoDismiss={true} placement={"bottom-right"}>

          <Route path='/:item'  component={ItemPage} exact />
        </ToastProvider>
        {/* <Route path='*' component={NotFound}/> */}
      </Switch>
    </Router>
    {/* <Signup/> */}
    </>

  )
}

export default App