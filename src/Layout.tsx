import Header from './components/Header';
import { Outlet } from 'react-router-dom';

const Layout = () => {
  return (
    <div className='relative'>
      <Header className='fixed top-0 left-0 right-0 z-20' />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
