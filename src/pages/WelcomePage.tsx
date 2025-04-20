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
        className={` w-[90%] lg:w-[60%] h-60 absolute -bottom-10 lg:h-full shadow-lg ${
          darkMode ? 'shadow-blue-200' : 'shadow-blue-500/40'
        } lg:relative rounded-md lg:border-t-4 lg:border-r-4 lg:border-l-4 border-4 border-blue-50  mt-8 lg:mt-4  `}
      >
        {darkMode ? (
          <img
            src='images/tasknow-screenshot-darkmode.webp'
            alt='Captura de la aplicación en modo light'
            className='w-full mx-auto h-96 object-cover object-left lg:object-top z-20 '
          />
        ) : (
          <img
            src='images/tasknow-screenshot.webp'
            alt='Captura de la aplicación en modo dark'
            className='w-full mx-auto h-96 object-cover object-left lg:object-top z-20 '
          />
        )}
      </div>
    </div>
  );
}

export default WelcomePage;
