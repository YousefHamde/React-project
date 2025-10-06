
import { createBrowserRouter, RouterProvider } from 'react-router';
import Home from './ui/Home';
import AppLayout from './ui/AppLayout';
import Menu , {Loader as LoaderMenu}  from './features/menu/Menu';
import CreateOrder , {action as actionCreateOrder } from './features/order/CreateOrder';
import {action as updateOrderFunction} from './features/order/UpdateOrder'
import Order , {loader as loaderOrder}  from './features/order/Order';
import Cart from './features/cart/Cart';
import Error from './ui/Error';

export default function App() {
  const router = createBrowserRouter([
    {
      element : <AppLayout/>,
      errorElement : <Error/>,
      children : [
        {
          path : '/',
          element : <Home/>
        },
        {
          path:'/menu',
          element : <Menu/>,
          loader:LoaderMenu,
          errorElement : <Error/>
        },
        {
          path:'/cart',
          element : <Cart/>,
        },
        {
          path : '/order/new',
          element : <CreateOrder/>,
          action:actionCreateOrder,
        },
        {
          path:'/order/:orderId',
          element : <Order/>,
          loader:loaderOrder,
          errorElement : <Error/>,
          action:updateOrderFunction,
        }
      ]
    }

  ])
  return <>
    <RouterProvider router={router} />
  </>;
}
