import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { IoMdEye, IoMdEyeOff } from 'react-icons/io';
import Button from './Button';
import { FaArrowRightLong } from 'react-icons/fa6';
import GoogleIcon from '../assets/icons/GoogleIcon';
import { useLocation } from 'react-router-dom';
import Input from './Input';

interface Props {
  title: string;
}
function Form({ title }: Props) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState('');

  const { signIn, signInWithEmail, signUpWithEmail } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const isSignUpPage = location.pathname === '/sign-up';

  const handleAuth = async () => {
    if (
      !email.trim() ||
      !password.trim() ||
      (isSignUpPage && !username.trim())
    ) {
      setError('All fields are required');
      return;
    }
    try {
      if (isSignUpPage) {
        await signUpWithEmail(username, email, password);
      } else {
        await signInWithEmail(email, password);
      }
      navigate('/');
    } catch (error: any) {
      const errorCode = error.code;

      if (errorCode === 'auth/invalid-email') {
        setError('Email address is not valid.');
      } else if (errorCode === 'auth/user-not-found') {
        setError('No account found with this email.');
      } else if (errorCode === 'auth/email-already-in-use') {
        setError('An account with this email already exists.');
      } else if (errorCode === 'auth/weak-password') {
        setError('Password should be at least 6 characters.');
      } else if (errorCode === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    }
  };

  const signUpWithGoogle = async () => {
    await signIn();
    navigate('/');
  };
  const navigateToSignPage = () => {
    if (isSignUpPage) {
      navigate('/sign-in');
    } else {
      navigate('/sign-up');
    }
  };
  return (
    <>
      <h1 className='font-montserrat text-2xl font-bold text-gray-800 dark:text-blue-50'>
        {title}
      </h1>
      <div className='h-auto w-[80%] lg:w-[20%] px-4 py-6 bg-blue-50 dark:bg-gray-800 dark:shadow-blue-300/20 rounded-md flex flex-col justify-center items-center gap-4 shadow-lg shadow-blue-300/80'>
        <form
          className='flex flex-col w-full  gap-3'
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault();
              handleAuth();
            }
          }}
        >
          {isSignUpPage && (
            <Input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onFocus={() => setError('')}
              placeholder='Username'
            />
          )}
          <Input
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setError('')}
            placeholder='Email'
          />

          <div
            tabIndex={0}
            className=' border-b-2  pr-2 dark:focus-within:bg-gray-700 focus-within:bg-blue-50 focus-within:outline-blue-300 focus-within:outline-2 border-blue-200 dark:border-gray-700 rounded-md  text-base   bg-blue-100 text-gray-800 dark:bg-gray-900 flex justify-between items-center'
          >
            <Input
              type={`${passwordVisible ? 'text' : 'password'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => {
                setIsFocused(true);
                setError('');
              }}
              placeholder='Password'
              className='  placeholder:text-blue-400 w-full focus:outline-none border-none '
            />

            {passwordVisible ? (
              <IoMdEyeOff
                size={20}
                className='text-blue-400 cursor-pointe'
                onClick={() => setPasswordVisible(false)}
              />
            ) : (
              <IoMdEye
                size={20}
                className='text-blue-400 cursor-pointer'
                onClick={() => setPasswordVisible(true)}
              />
            )}
          </div>
        </form>
        {error && (
          <div className='text-red-500 bg-red-100 border border-red-300 px-4 py-1 rounded w-full text-center  shadow'>
            {error}
          </div>
        )}
        <Button
          variant='primary'
          size='small'
          className='group w-full border-2 border-blue-300 px-4 py-1 rounded-full justify-between flex items-center  font-medium '
          onClick={handleAuth}
        >
          <span className='ml-4 group-hover:ml-2 transition-all duration-300'>
            {isSignUpPage ? 'Sign Up' : 'Sign In'}
          </span>
          <FaArrowRightLong className='opacity-0 translate-x-[-8px] group-hover:translate-x-0 group-hover:opacity-80 transition-all duration-300' />
        </Button>
        <Button
          variant='primary'
          size='small'
          className='w-full border-2 border-blue-300  px-4 py-1 rounded-full flex items-center gap-2 font-medium bg-transparent '
          onClick={signUpWithGoogle}
        >
          Continue with Google
          <GoogleIcon />
        </Button>
        <div className='flex flex-col gap-1 text-center'>
          <p className='text-sm text-gray-800 dark:text-blue-50'>
            If you don't have an account,{' '}
            <button
              className='underline text-blue-400 cursor-pointer font-medium hover:text-blue-300 transition-all duration-300'
              onClick={navigateToSignPage}
            >
              {isSignUpPage ? 'sign in' : 'sign up'}
            </button>
          </p>
        </div>
      </div>
    </>
  );
}

export default Form;
