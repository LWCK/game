import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Route, Routes, useParams } from 'react-router-dom';
import Step from './components/Step/Step';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <BrowserRouter>
    <Routes>
      {/* <Route path="/gameId" element={<App />} /> */}
      <Route path='/jeu/:step' element={<Step />} />
    </Routes>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
)

