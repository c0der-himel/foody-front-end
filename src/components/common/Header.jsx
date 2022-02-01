import { Fragment, useState } from 'react';
import { Disclosure, Menu, Transition } from '@headlessui/react';
import {
  ShoppingBagIcon,
  MenuIcon,
  XIcon,
  UserIcon,
  SearchIcon,
} from '@heroicons/react/outline';
import logo from '../../assets/img/logo/logo.png';
import { HashLink } from 'react-router-hash-link';
import Bag from '../Bag';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import { useDispatch } from 'react-redux';
import { clearCart } from '../../features/cartSlice';

const navigation = [
  { name: 'Home', href: '/#home', current: false },
  { name: 'About', href: '/#about', current: false },
  { name: 'Menu', href: '/#menu', current: false },
  { name: 'Testimonials', href: '/#testimonials', current: false },
  { name: 'Contact', href: '/#contact', current: false },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const Header = () => {
  const dispatch = useDispatch();
  const { user, logOutWithGoogle } = useAuth();
  const [openCart, setOpenCart] = useState(false);
  const { cartTotalQuantity } = useSelector((state) => state.cart);

  const logoutAndClearBag = () => {
    dispatch(clearCart());
    logOutWithGoogle();
  };

  return (
    <>
      <Disclosure as="nav" className="bg-white sticky top-0 z-50">
        {({ open }) => (
          <>
            <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
              <div className="relative flex items-center justify-between h-16 shadow rounded-full px-10 shadow-orange-600/20">
                <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                  {/* Mobile menu button*/}
                  <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-between">
                  <div className="flex-shrink-0 flex items-center">
                    <img
                      className="block lg:hidden h-8 w-auto"
                      src={logo}
                      alt="logo"
                    />
                    <img
                      className="hidden lg:block h-8 w-auto"
                      src={logo}
                      alt="logo"
                    />
                    <h1 className="text-2xl text-orange-600 font-bold ml-3">
                      fOOdy
                    </h1>
                  </div>
                  <div className="hidden sm:block sm:ml-6">
                    <div className="flex space-x-4">
                      {navigation.map((item) => (
                        <HashLink
                          key={item.name}
                          to={item.href}
                          className={classNames(
                            item.current
                              ? 'bg-orange-600 text-white'
                              : 'text-gray-600 hover:bg-orange-600 hover:text-white',
                            'px-6 py-2 rounded-full text-sm font-medium transition duration-300'
                          )}
                          aria-current={item.current ? 'page' : undefined}
                        >
                          {item.name}
                        </HashLink>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                  <Link
                    to="/search"
                    className="p-1 mr-3 text-orange-600 hover:text-orange-700 transition duration-300"
                  >
                    <span className="sr-only">Search Food</span>
                    <SearchIcon
                      className="h-7 w-7 relative"
                      aria-hidden="true"
                    />
                  </Link>
                  <button
                    type="button"
                    className="p-1 text-orange-600 hover:text-orange-700 transition duration-300"
                  >
                    <span className="sr-only">Food Bag</span>
                    <ShoppingBagIcon
                      className="h-7 w-7 relative"
                      aria-hidden="true"
                      onClick={() => setOpenCart(true)}
                    />
                    <span className="absolute text-center top-0.5 right-24 font-bold">
                      {cartTotalQuantity}
                    </span>
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="ml-3 relative">
                    <div>
                      <Menu.Button className="flex items-center text-sm p-1 text-orange-600 hover:text-orange-700 transition duration-300">
                        <span className="sr-only">Open user menu</span>
                        {user?.email ? (
                          <img
                            className="h-8 w-8 rounded-full border border-orange-600"
                            src={user?.photoURL}
                            alt="user"
                          />
                        ) : (
                          <UserIcon className="h-7 w-7" aria-hidden="true" />
                        )}
                      </Menu.Button>
                    </div>
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-100"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                      <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-2xl shadow shadow-orange-600/20 text-center p-4 bg-white">
                        {user?.email ? (
                          <>
                            <div className="font-bold text-xl text-gray-600 mb-1">
                              {user?.displayName}
                            </div>
                            <hr className="mb-2" />
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/dashboard"
                                  className={classNames(
                                    active
                                      ? 'bg-amber-100 rounded-3xl duration-300 transition'
                                      : '',
                                    'font-medium block px-4 py-2 text-sm text-gray-600'
                                  )}
                                >
                                  Dashboard
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/"
                                  className={classNames(
                                    active
                                      ? 'bg-amber-100 rounded-3xl duration-300 transition'
                                      : '',
                                    'font-medium block px-4 py-2 text-sm text-gray-600'
                                  )}
                                  onClick={logoutAndClearBag}
                                >
                                  Sign out
                                </Link>
                              )}
                            </Menu.Item>
                          </>
                        ) : (
                          <>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/login"
                                  className={classNames(
                                    active
                                      ? 'bg-amber-100 rounded-3xl duration-300 transition'
                                      : '',
                                    'font-medium block px-4 py-2 text-sm text-gray-600'
                                  )}
                                >
                                  Login
                                </Link>
                              )}
                            </Menu.Item>
                            <Menu.Item>
                              {({ active }) => (
                                <Link
                                  to="/register"
                                  className={classNames(
                                    active
                                      ? 'bg-amber-100 rounded-3xl duration-300 transition'
                                      : '',
                                    'font-medium block px-4 py-2 text-sm text-gray-600'
                                  )}
                                >
                                  Register
                                </Link>
                              )}
                            </Menu.Item>
                          </>
                        )}
                      </Menu.Items>
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>

            <Disclosure.Panel className="sm:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 text-center my-3 shadow shadow-orange-600/20 rounded-3xl">
                {navigation.map((item) => (
                  <Disclosure.Button
                    key={item.name}
                    as="a"
                    href={item.href}
                    className={classNames(
                      item.current
                        ? 'bg-orange-600 text-white'
                        : 'text-gray-600 hover:bg-orange-600 hover:text-white',
                      'block px-3 py-2 rounded-2xl text-xl font-medium'
                    )}
                    aria-current={item.current ? 'page' : undefined}
                  >
                    {item.name}
                  </Disclosure.Button>
                ))}
              </div>
            </Disclosure.Panel>
          </>
        )}
      </Disclosure>
      <Bag openCart={openCart} setOpenCart={setOpenCart} />
    </>
  );
};

export default Header;
