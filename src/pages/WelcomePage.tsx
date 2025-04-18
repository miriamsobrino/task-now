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
    <div className='w-full relative z-2 justify-center items-center h-screen flex flex-col overflow-y-hidden gap-6 lg:gap-4 bg-blue-100  dark:bg-gray-900 '>
      <div className='flex flex-col justify-center items-center gap-2 px-6 z-10   lg:mt-[400px]'>
        <h2 className='text-3xl lg:text-5xl font-montserrat font-bold max-w-[600px]  text-center bg-gradient-to-b from-blue-500 via-blue-500 to-blue-200 bg-clip-text text-transparent'>
          Task Management for Productive Teams
        </h2>
        <h3 className='font-montserrat text-center lg:text-xl text-gray-600 dark:text-blue-50'>
          Organize your tasks, speed up your workflow — all in one powerful
          tool.
        </h3>
      </div>
      <Button variant='primary' size='big' onClick={NavigateToLogin}>
        Get Started
      </Button>
      <div
        className=' w-[90%] lg:w-[60%] h-60 absolute -bottom-10 lg:h-full  lg:relative rounded-md lg:border-t-4 lg:border-r-4 lg:border-l-4 border-4 border-blue-50  mt-8 lg:mt-4 lg:[mask-image:linear-gradient(to_bottom,black_60%,transparent_100%)] 
'
      >
        {darkMode ? (
          <img
            src='images/tasknow-screenshot-darkmode.webp'
            alt='Imagen'
            className='w-full h-full object-cover  object-left lg:object-top z-20 '
          />
        ) : (
          <img
            src='images/tasknow-screenshot.webp'
            alt='Imagen'
            className='w-full mx-auto h-full object-cover object-left lg:object-top z-20 '
          />
        )}
        <div
          className={`w-full lg:w-[60%] h-56 lg:h-96  ${
            darkMode
              ? 'bg-gradient-to-b from-gray-500 via-gray-800 to-gray-900'
              : 'bg-gradient-to-b from-blue-500/40 via-blue-200 to-blue-50'
          } blur-md absolute -z-1 inset-0  `}
        ></div>
      </div>
    </div>
  );
}

export default WelcomePage;
