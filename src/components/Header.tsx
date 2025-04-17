import { useLocation, useNavigate } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import Button from './Button';
import { useAuth } from '../context/AuthContext';
import { FiMoon, FiSun } from 'react-icons/fi';
import { useDarkMode } from '../context/ThemeContext';
interface Props {
  className: string;
}

function Header({ className }: Props) {
  const navigate = useNavigate();
  const location = useLocation();
  const { logOut } = useAuth();
  const { darkMode, setDarkMode } = useDarkMode();

  const isWelcome = location.pathname === '/welcome';
  const isHome = location.pathname === '/';

  const signOut = async () => {
    try {
      await logOut();
      navigate('/welcome');
    } catch (error) {
      console.error('Error during log out:', error);
    }
  };
  return (
    <div
      className={`w-[90%] mx-auto justify-between items-center py-4  dark:bg-gray-900 bg-blue-100 flex ${className}`}
    >
      <h1
        className='font-special-gothic text-2xl select-none cursor-pointer hover:scale-[1.05] transition-all duration-300'
        onClick={() => navigate('/')}
      >
        <span className='text-gray-900 dark:text-blue-50'>Task</span>
        <span className=' text-blue-500'>Now</span>
      </h1>
      <div className='flex gap-2  '>
        {isWelcome && (
          <Button
            size='small'
            variant='secondary'
            onClick={() => navigate('/sign-in')}
          >
            Sign In
          </Button>
        )}

        {isHome && (
          <div className='flex gap-2'>
            <Button size='small' variant='secondary' onClick={signOut}>
              Log Out <FiLogOut />
            </Button>
          </div>
        )}

        <Button
          size='small'
          variant='secondary'
          onlyIcon
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? <FiSun /> : <FiMoon />}
        </Button>
      </div>
    </div>
  );
}

export default Header;
