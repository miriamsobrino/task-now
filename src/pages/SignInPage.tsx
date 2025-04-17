import Form from '../components/Form';
import { useDarkMode } from '../context/ThemeContext';

function SignInPage() {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`w-full relative z-10 justify-center items-center overflow-y-hidden h-screen flex flex-col gap-4 ${
        darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-100 to-blue-50'
      } font-montserrat`}
    >
      <Form title='Sign In' />
    </div>
  );
}

export default SignInPage;
