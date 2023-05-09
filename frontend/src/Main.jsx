import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Navigation from './Components/Navigation';
import ViewContracts from './ViewContracts';
import ViewEvent from './ViewEvents';
import DashBoard from './Dashboard';
import EventLogs from './EventLogs';
//import "bootswatch/dist/Lux/bootstrap.min.css";
import "bootswatch/dist/Lux/bootstrap.min.css";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Navigation/>
          <Routes>
            <Route exact path='/' element={<App/>}/>
            <Route exact path='/view_contracts' element={<ViewContracts/>}/>
            <Route exact path='/view' element = {<ViewEvent/>}/>
            <Route exact path='/dashboard/:address' element = {<DashBoard/>}/>
            <Route exact path='/dashboard/:address/:eventSignature/:eventName' element = {<EventLogs/>}/>
          </Routes>   
    </Router>
  </React.StrictMode>,
)
