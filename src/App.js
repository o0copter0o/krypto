import './App.css';
import logo from './logo.svg';
import LoginRegister from './Components/LoginRegister/LoginRegister';
import ListCryptoOwner from './Components/ListCryptoOwner/ListCryptoOwner';
import { RouterProvider,createBrowserRouter } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginRegister/>
  },
  {
    path: "/login",
    element: <LoginRegister/>
  },
  {
    path: "/listOwner",
    element: <ListCryptoOwner/>
  }
]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
