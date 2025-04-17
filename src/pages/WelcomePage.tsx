import { useNavigate } from 'react-router-dom';
import Button from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { useEffect } from 'react';
import { useDarkMode } from '../context/ThemeContext';

function WelcomePage() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { darkMode } = useDarkMode();
  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);
  const NavigateToLogin = () => {
    navigate('/sign-up');
  };
  return (
    <div className='w-full relative z-2 justify-center items-center h-screen flex flex-col overflow-y-hidden gap-4 bg-blue-100  dark:bg-gray-900 '>
      <div className='flex flex-col justify-center items-center gap-2 z-10 mt-[400px]'>
        <h2 className='text-5xl font-montserrat font-bold max-w-[600px] text-center bg-gradient-to-b from-blue-500 via-blue-500 to-blue-200 bg-clip-text text-transparent'>
          Task Management for Productive Teams
        </h2>
        <h3 className='font-montserrat text-xl text-gray-600'>
          Organize your tasks, speed up your workflow — all in one powerful
          tool.
        </h3>
      </div>
      <Button variant='primary' size='big' onClick={NavigateToLogin}>
        Get Started
      </Button>
      <div
        className='w-[1200px] h-full overflow-hidden relative  rounded-md shadow-2xl shadow-blue-300/80 border-t-4 border-r-4 border-l-4 border-blue-50  mt-8 [mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] 
'
      >
        {darkMode ? (
          <img
            src='images/tasknow-screenshot-darkmode.webp'
            alt='Imagen'
            className='w-full h-full object-cover object-top relative z-20 '
          />
        ) : (
          <img
            src='images/tasknow-screenshot.webp'
            alt='Imagen'
            className='w-full h-full object-cover object-top relative z-20 '
          />
        )}
      </div>
      <div
        className={`w-[1200px] h-96  ${
          darkMode
            ? 'bg-gradient-to-b from-gray-500 via-gray-800 to-gray-900'
            : 'bg-gradient-to-b from-blue-500/40 via-blue-200 to-blue-50'
        } blur-md absolute -bottom-6 -z-1  `}
      ></div>
    </div>
  );
}

export default WelcomePage;
