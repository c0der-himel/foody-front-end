import { LockClosedIcon } from '@heroicons/react/solid';
import PageTransition from '../components/PageTransition';
import logo from '../assets/img/logo/logo.png';
import google from '../assets/img/logo/google.png';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import useAuth from '../hooks/useAuth';
import { useForm } from 'react-hook-form';
import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';

const override = css`
  margin: 35vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Login = () => {
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user, isLoading, authErrors, signInWithGoogle, signInWithEmail } =
    useAuth();
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';

  const onSubmit = (data) => {
    signInWithEmail(data.email, data.password);
    reset();
    navigate(from, { replace: true });
  };

  const googleSignIn = () => {
    signInWithGoogle();
    navigate(from, { replace: true });
  };

  return (
    <PageTransition>
      <Header />
      <div className="min-h-full flex items-center justify-center py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8 shadow shadow-orange-600/20 p-10 rounded-2xl">
          <div>
            <img className="mx-auto h-16 w-auto" src={logo} alt="logo" />
            <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-600">
              Sign in to your account
            </h2>
            <p className="mt-2 text-center text-sm text-gray-500">
              Or{' '}
              <Link
                to="/register"
                className="font-medium text-orange-600 hover:text-orange-600"
              >
                Create account
              </Link>
            </p>
          </div>
          {!isLoading && (
            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <input type="hidden" name="remember" defaultValue="true" />
              <div className="rounded-md -space-y-px">
                <div>
                  <label htmlFor="email" className="sr-only">
                    Email address
                  </label>
                  <input
                    {...register('email', {
                      pattern:
                        /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
                      required: true,
                    })}
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className="appearance-none rounded-full relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-600 focus:outline-none focus:ring-orange-600 focus:border-orange-600 focus:z-10 sm:text-sm mb-5"
                    placeholder="Email address"
                  />
                  {(errors.email?.type === 'required' && (
                    <div className="p-1.5 mb-5 bg-rose-500 text-white text-center rounded-full font-bold">
                      Email is required
                    </div>
                  )) ||
                    (errors.email?.type === 'pattern' && (
                      <div className="p-1.5 mb-5 bg-rose-500 text-white text-center rounded-full font-bold">
                        Invalid email address
                      </div>
                    ))}
                </div>
                <div>
                  <label htmlFor="password" className="sr-only">
                    Password
                  </label>
                  <input
                    {...register('password', {
                      required: true,
                      minLength: 3,
                    })}
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    className="appearance-none rounded-full relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-600 focus:outline-none focus:ring-orange-600 focus:border-orange-600 focus:z-10 sm:text-sm mt-5"
                    placeholder="Password"
                  />
                  {(errors.password?.type === 'required' && (
                    <div className="p-1.5 my-5 bg-rose-500 text-white text-center rounded-full font-bold">
                      Password is required
                    </div>
                  )) ||
                    (errors.password?.type === 'minLength' && (
                      <div className="p-1.5 my-5 bg-rose-500 text-white text-center rounded-full font-bold">
                        Password must be 3 characters long
                      </div>
                    ))}
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-6 border border-transparent text-sm font-bold rounded-full text-white bg-orange-600 hover:bg-orange-700 transition duration-300"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <LockClosedIcon
                      className="h-5 w-5 text-white ml-2"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in
                </button>
                <p className="my-3 text-center text-sm text-gray-500">Or</p>
                <button
                  onClick={googleSignIn}
                  type="submit"
                  className="group relative w-full flex justify-center py-3 px-6 border-2 border-orange-600 text-sm font-bold rounded-full text-orange-600 bg-white hover:bg-orange-600 transition duration-300 hover:text-white"
                >
                  <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                    <img
                      src={google}
                      alt="google"
                      className="h-5 w-5 ml-2"
                      aria-hidden="true"
                    />
                  </span>
                  Sign in with Google
                </button>
              </div>
            </form>
          )}
          {isLoading && (
            <RingLoader
              css={override}
              size={150}
              color={'#f59e0b'}
              loading={isLoading}
            />
          )}
          {user?.email && (
            <div className="p-1.5 mb-5 bg-emerald-500 text-white text-center rounded-full font-bold">
              Successful SignIn
            </div>
          )}
          {authErrors && (
            <div className="p-1.5 mb-5 bg-rose-500 text-white text-center rounded-full font-bold">
              {authErrors}
            </div>
          )}
        </div>
      </div>
      <Footer />
    </PageTransition>
  );
};

export default Login;
