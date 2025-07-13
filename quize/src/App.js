import logo from './logo.svg';
import './App.css';
import Navbar from './component/Navbar';
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Entry from './component/Entry';
import HomePage from './pages/HomePage';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import LogginSuccesfull from './pages/LogginSuccesfull';
import Ooops from './pages/Ooops';
import Quiz from './pages/Quiz';
import 'react-toastify/dist/ReactToastify.css';

const router = createBrowserRouter([
  {path:"/",element:<Entry/>,children:[
    {path:"/",element:<HomePage/>},
    {path:"/signup",element:<SignUp/>},
    {path:"/login",element:<Login/>},
    {path:"/athunticationComplet",element:<LogginSuccesfull/>},
    {path:"/errorPage",element:<Ooops/>}

  ]},
  {path:"/quiz",element:<Quiz/>}
])
function App() {

  return (
    <RouterProvider router={router}>
    
    </RouterProvider>
  );
}

export default App;
