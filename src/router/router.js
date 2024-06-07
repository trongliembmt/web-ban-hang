import {createBrowserRouter} from "react-router-dom";
import App from "../App";
import TopCodes from "../components/ListProductsPage/TopCodes";
import ProductDetails from "../components/ProductDetailPage/ProductDetails";
import LoginPage from "../components/AuthenticationPage/Login";
import RegisterPage from "../components/AuthenticationPage/Register";
import ForgotPassPage from "../components/AuthenticationPage/ForgotPass";
import ProfilePage from "../components/ProfilePage/Profile";
import ChangePassPage from "../components/AuthenticationPage/ChangePass";
import CartDetailPage from "../components/CartDetailPage/CartDetailPage";
import {LikedCodes} from "../components/Commons/LikedCodes";
import {ErrorPage404} from "../components/ErrorPage/ErrorPage404";
import VerifyPassPage from "../components/AuthenticationPage/VerifyPass";
import FreeCodes from "../components/ListProductsPage/FreeCodes";
import HighQualityCodes from "../components/ListProductsPage/HighQualityCodes";
import Products, {ProductsContent} from "../components/ListProductsPage/Products";

const profile = {path: '/profile', element: <ProfilePage/>}
const listAuthentication = [
    {
        path: '/login',
        element: <LoginPage/>
    },
    {
        path: '/register',
        element: <RegisterPage/>
    },
    {
        path: '/forgot-password',
        element: <ForgotPassPage/>
    },
    {
        path: '/change-password',
        element: <ChangePassPage/>
    },
    {
        path: "/verify-password",
        element: <VerifyPassPage/>
    }
]

const listProducts = [
    {
        path: '/products',
        element: <Products/>,
        children: [
            {
                index: true,
                element: <ProductsContent/>
            },
            {
                path: "product/:id",
                element: <ProductDetails/>
            }
        ]
    },
    {
        path: '/top-codes',
        element: <TopCodes/>
    },
    {
        path: '/quality-codes',
        element: <HighQualityCodes/>
    },
    {
        path: '/free-codes',
        element: <FreeCodes/>
    }
]

const likedCodes = [{
    path: '/liked-codes',
    element: <LikedCodes/>
}]

const cart = [{
    path: '/cart-details',
    element: <CartDetailPage/>
}]

export const router = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        errorElement: <ErrorPage404/>
    },
    profile,
    ...listProducts,
    ...listAuthentication,
    ...cart,
    ...likedCodes
])