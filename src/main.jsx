import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Authprovider from './component/AuthProvider.jsx'
import createStore from "./create-store/store.js"
import { Provider } from "react-redux";
const store = createStore();
// console.log(store.getState())
store.subscribe(()=>{
    console.log('store updated', store.getState())
})



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Authprovider>
          <App />
        </Authprovider>
      </Provider>
    </BrowserRouter>
  </StrictMode>,
)
