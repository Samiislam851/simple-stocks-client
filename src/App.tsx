

import './App.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Layout from './Layout/Layout'
import Homepage from './pages/Homepage/Homepage.tsx'
import NotFoundPage from './pages/NotFoundPage/NotFoundPage.tsx'
import Login from './pages/Login/Login.tsx'
import RegisterPage from './pages/Register/Register.tsx'
import RestrictedPublicRoute from './util/RestrictedPublicRoute/RestrictedPublicRoute.tsx'
import PrivateRoute from './util/PrivateRoute/PrivateRoute.tsx'

function App() {


  const router = createBrowserRouter([
    {
      path: '/',
      element: <PrivateRoute>  <Layout /> </PrivateRoute>,
      errorElement: <NotFoundPage />,
      children: [
        {
          path: '/',
          element: <Homepage />
        },
      ]
    },
    {
      path: '/login',
      element: <RestrictedPublicRoute> <Login />   </RestrictedPublicRoute>
    },
    {
      path: '/register',
      element: <RestrictedPublicRoute>  <RegisterPage /> </RestrictedPublicRoute>
    }

  ])
  return (
    <RouterProvider router={router} />
  )
}

export default App
