import Home from "../../Home/Home/Home";
import Main from "../../Layout/Main";
import Login from "../../Login/Login";
import CheckOut from "../../Order/CheckOut/CheckOut";
import MyOrder from "../../Order/MyOrder/MyOrder";
import OrderReview from "../../Order/OrderReview/OrderReview";
import Signup from "../../Signup/Signup";
import PrivateRoute from "../PrivateRoute";

const { createBrowserRouter } = require("react-router-dom");


const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/order',
                element: <OrderReview></OrderReview>

            },

            {
                path: '/myorder',
                element: <PrivateRoute><MyOrder></MyOrder></PrivateRoute>
            },
            {
                path: '/checkout',
                element: <PrivateRoute><CheckOut></CheckOut></PrivateRoute>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            },

        ]
    }
]);
export default router;