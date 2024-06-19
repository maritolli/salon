import React, {useContext, useEffect, useState} from 'react';
import {BrowserRouter} from "react-router-dom";
import AppRouter from "./components/AppRouter";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/clientAPI";
import {jwtDecode} from "jwt-decode";
import {employeeCheck} from "./http/employeeAPI";

const App =  observer(() => {
    const {user} = useContext(Context)
    const[loading, setLoading] = useState(true);

   
   if(jwtDecode(localStorage.getItem('token')).role !==undefined){
       useEffect(()=>{
           employeeCheck().then(data=>{
               user.setUser(true)
               user.setIsAuth(true)
           }).finally(()=>setLoading(false))
       })
   }else{
       useEffect(()=>{
           check().then(data =>{
               user.setUser(true);
               user.setIsAuth(true);
           }).finally(()=>setLoading(false))
       })
   }

    if(loading){
        return <div>Loading...</div>
    }

    return (
        <BrowserRouter>
            <AppRouter />
        </BrowserRouter>
    );
});

export default App;
