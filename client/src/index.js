import React, {createContext} from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import UserStore from "./store/UserStore";
import ServiceStore from "./store/ServiceStore";
import DateStore from "./store/DateStore";
import EmployeeStore from "./store/EmployeeStore";

export const Context = createContext(null)
const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // createRoot(container!) if you use TypeScript
root.render(
    <Context.Provider value={{
        user: new UserStore(),
        service: new ServiceStore(),
        current_date: new DateStore(),
        employee: new EmployeeStore()
    }}>
        <App />
    </Context.Provider>
);

