import React, {createContext} from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import UserStore from "./store/UserStore";

export const Context = createContext(null)
const rootElement = document.getElementById('root');
const root = createRoot(rootElement); // createRoot(container!) if you use TypeScript
root.render(
    <Context.Provider value={{
        user: new UserStore(),

    }}>
        <App />
    </Context.Provider>
);

