import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'

import { store } from './app/store.js'
import App from './App.jsx'

import "react-toastify/dist/ReactToastify.css"
import './index.css'
import { BrowserRouter } from 'react-router-dom'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
      <ToastContainer
        position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick />
        <App />        
        </BrowserRouter>
    </Provider>
  </React.StrictMode>,
);
