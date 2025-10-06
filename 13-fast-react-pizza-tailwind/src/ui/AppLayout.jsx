import { Outlet, useNavigation } from 'react-router';
import CartOverView from '../features/cart/CartOverView';
import Header from './Header';
import Loader from './Loader';


export default function AppLayout() {
  const navigation = useNavigation();
  // console.log(navigation);
  let isLoading = navigation.state === 'loading';

  if(isLoading) return <Loader/>
  return (
    <div className='grid h-screen grid-rows-[auto_1fr_auto]'>
        <Header/>
        <div className='overflow-scroll'>
            <main className='max-w-3xl mx-auto'>
            <Outlet />
            </main>
        </div>
        <CartOverView/>
    </div>
  )
}
