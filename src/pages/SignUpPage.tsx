import Form from '../components/Form';
import { useDarkMode } from '../context/ThemeContext';

function SignUpPage() {
  const { darkMode } = useDarkMode();
  return (
    <div
      className={`w-full relative z-10 justify-center items-center h-screen flex flex-col gap-4  ${
        darkMode ? 'bg-gray-900' : 'bg-gradient-to-b from-blue-100 to-blue-50'
      } font-montserrat`}
    >
      <Form title='Sign Up' />{' '}
      {/* <h1 className='font-montserrat text-2xl font-bold text-gray-800'>
        Sign Up
      </h1>
      <div className='h-auto w-[20%] px-4 py-6 bg-blue-50 rounded-md flex flex-col justify-center items-center gap-4 shadow-lg shadow-blue-300/80'>
        <form className='flex flex-col w-full  gap-3'>
          <input
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onFocus={() => setError('')}
            placeholder='Username'
            className='border-b-2 border-blue-200 rounded-md text-base px-2 py-1 bg-blue-100 text-gray-800 focus:bg-blue-50 focus:outline-blue-300 placeholder:text-blue-400'
          />

          <input
            required
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onFocus={() => setError('')}
            placeholder='Email'
            className='border-b-2 border-blue-200 rounded-md text-base px-2 py-1 bg-blue-100 text-gray-800 focus:bg-blue-50 focus:outline-blue-300 placeholder:text-blue-400'
          />
          <div className='gap-2 border-b-2 focus-within:bg-blue-50 focus-within:outline-blue-300 focus-within:outline-2 border-blue-200 rounded-md  text-base px-2 py-1 bg-blue-100 text-gray-800 flex justify-between items-center'>
            <input
              required
              type={`${passwordVisible ? 'text' : 'password'}`}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onFocus={() => setError('')}
              placeholder='Password'
              className='  placeholder:text-blue-400 w-full focus:outline-none'
            />
            {passwordVisible ? (
              <IoMdEyeOff
                size={20}
                className='text-blue-400 cursor-pointer'
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
          <div className='text-red-500 bg-red-100 border border-red-300 px-4 py-1 rounded w-full text-center text-sm shadow'>
            {error}
          </div>
        )}
        <Button
          variant='primary'
          size='small'
          className='group w-full border-2 border-blue-300  px-4 py-1 rounded-full justify-between flex items-center  font-medium '
          onClick={signUp}
        >
          <span className='ml-4 group-hover:ml-2 transition-all duration-300'>
            Sign Up
          </span>
          <FaArrowRightLong className='opacity-0 translate-x-[-8px] group-hover:translate-x-0 group-hover:opacity-80 transition-all duration-300' />
        </Button>
        <Button
          variant='secondary'
          size='small'
          className='w-full border-2 border-blue-300 px-4 py-1 rounded-full flex items-center gap-2 font-medium bg-transparent '
          onClick={signUpWithGoogle}
        >
          Continue with Google
          <GoogleIcon />
        </Button>
        <div className='flex flex-col gap-1 text-center'>
          <p className='text-sm text-gray-800'>
            If you already have an account,{' '}
            <button
              className='underline text-blue-400 cursor-pointer font-medium hover:text-blue-300 transition-all duration-300'
              onClick={navigateToSignInPage}
            >
              sign in
            </button>
          </p>
        </div>
      </div>*/}
    </div>
  );
}

export default SignUpPage;
