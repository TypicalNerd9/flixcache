import './App.css'
import Header from './components/Header'
import { Outlet, useLocation } from "react-router-dom";


function App() {
  let location = useLocation();
  
  return (
    <>
      {location.pathname !== '/' ? <Header/> : null}
      <Outlet/>
    </>
  )
}

export default App
