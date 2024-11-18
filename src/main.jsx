import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {NextUIProvider} from '@nextui-org/react'
import UserContextProvider from "./Context/UserContext.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <NextUIProvider>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </NextUIProvider>
  </React.StrictMode>,
)
