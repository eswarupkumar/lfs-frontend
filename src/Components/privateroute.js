import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute=({component:Component,...rest})=>{
    return <Route {...rest} exact component={(props)=>{
        const token=window.localStorage.getItem('token')
        if(token){
            return <Component {...props} />
        }else{
            return <Redirect to={'/log-in'}/>
        }
    }} />

}

export default PrivateRoute