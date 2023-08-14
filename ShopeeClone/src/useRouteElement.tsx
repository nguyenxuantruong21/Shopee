import { Navigate, Outlet, useRoutes } from 'react-router-dom'
import ProductList from './pages/ProductList'
import Login from './pages/Login'
import Register from './pages/Register'
import RegisterLayout from './layouts/RegisterLayout'
import MainLayout from './layouts/MainLayout'
import { useContext } from 'react'
import { AppContext } from './contexts/app.context'
import { path } from './constants/path'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import CartLayout from './layouts/CartLayout'
import UserLayout from './pages/User/Layouts/UserLayout'
import ChangePassword from './pages/User/pages/ChangePassword'
import HistoryPurchase from './pages/User/pages/HistoryPurchase'
import Profile from './pages/User/pages/Profile'

export default function useRouteElement() {
  const ProtectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)
    return isAuthenticated ? <Outlet /> : <Navigate to={path.login} />
  }

  const RejectedRoute = () => {
    const { isAuthenticated } = useContext(AppContext)
    return !isAuthenticated ? <Outlet /> : <Navigate to={path.home} />
  }

  const routeElement = useRoutes([
    {
      index: true,
      path: path.home,
      element: (
        <MainLayout>
          <ProductList />
        </MainLayout>
      ),
    },
    {
      path: path.productDetail,
      element: (
        <MainLayout>
          <ProductDetail />
        </MainLayout>
      ),
    },
    {
      path: '',
      element: <RejectedRoute />,
      children: [
        {
          path: path.login,
          element: (
            <RegisterLayout>
              <Login />
            </RegisterLayout>
          ),
        },
        {
          path: path.register,
          element: (
            <RegisterLayout>
              <Register />
            </RegisterLayout>
          ),
        },
      ],
    },
    {
      path: '',
      element: <ProtectedRoute />,
      children: [
        {
          path: path.cart,
          element: (
            <CartLayout>
              <Cart />
            </CartLayout>
          ),
        },
        {
          path: path.user,
          children: [
            {
              path: path.profile,
              element: (
                <MainLayout>
                  <UserLayout>
                    <Profile />
                  </UserLayout>
                </MainLayout>
              ),
            },
            {
              path: path.changePassword,
              element: (
                <MainLayout>
                  <UserLayout>
                    <ChangePassword />
                  </UserLayout>
                </MainLayout>
              ),
            },
            {
              path: path.historyPurchase,
              element: (
                <MainLayout>
                  <UserLayout>
                    <HistoryPurchase />
                  </UserLayout>
                </MainLayout>
              ),
            },
          ],
        },
      ],
    },
  ])
  return routeElement
}
