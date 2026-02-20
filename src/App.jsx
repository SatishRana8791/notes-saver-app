import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from './components/Navbar';
import ViewPaste from './components/ViewPaste';
import Home from './components/Home';
import Paste from './components/Paste';
// import { Provider } from 'react-redux';


const router=createBrowserRouter(
  [
    {
        path:'/',
        element:
        <div className=''>
            <Navbar/>
            <Home/>
        </div>
    },
    {
        path:'/pastes',
        element:
        <div>
            <Navbar/>
            <Paste/>
        </div>
    },
    {
        path:'/pastes/:id',
        element:
        <div>
            <Navbar/>
            <ViewPaste/>
        </div>
    },
  ]
)

function App() {
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App;
