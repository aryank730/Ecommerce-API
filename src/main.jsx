import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import ShopContextProvider from './context/ShopContext.jsx'
import { AuthProvider } from './adminModule/contexts/AuthContext.jsx'
import AppRouter from './routes/Router.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>

 <AppRouter />

  </BrowserRouter>,
)
