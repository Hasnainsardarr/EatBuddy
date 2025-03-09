import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";
import Main from "../layout/Main";
import Home from "../pages/home/Home";
import Menu from "../pages/shop/Menu";
import Signup from "../components/Signup";
import PrivateRouter from "../PrivateRouter.jsx/PrivateRouter";
import UpdateProfile from "../pages/Dashboard/UpdateProfile";
import CartPage from "../pages/shop/CartPage";


const router = createBrowserRouter([
    {
      path: "/",
      element: < Main />,
      children: [
        {
            path: "/",
            element: < Home />,

        },
        {
          path: "/menu",
          element: <PrivateRouter> <Menu/>  </PrivateRouter>,
        }
        ,
        {
          path: "/cart-page",
          element: <CartPage/>
        }
    ]
    },
    {
      path: "/signup",
      element: <Signup/>
    },
    {
      path: "/update-profile",
      element: <UpdateProfile/>
    } ,
    


  ]);

  export default router