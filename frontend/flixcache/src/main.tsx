import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './state/store.ts'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './components/Home.tsx'
import FlixSearch from './features/search/FlixSearch.tsx'
import MediaSearchPage from './components/MediaSearchPage.tsx'
import SignUp from './components/SignUp.tsx'
import LogIn from './components/LogIn.tsx'
import Discover from './components/Discover.tsx'
import Cache from './components/Cache.tsx'



const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    children: [
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/search",
        element: <MediaSearchPage/>
      },
      {
        path: "/sign-up",
        element: <SignUp/>
      },
      {
        path: "/log-in",
        element: <LogIn/>
      },
      {
        path: "/discover",
        element: <Discover/>
      },
      {
        path: "/cache",
        element: <Cache/>
      },
    ]
    
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={router}/>
    </Provider>
  </React.StrictMode>,
)
