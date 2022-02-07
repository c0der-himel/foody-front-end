import { Fragment, useState } from 'react';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import {
  ChevronDownIcon,
  MenuIcon,
  UserIcon,
  ShieldCheckIcon,
  ClipboardListIcon,
  ViewGridAddIcon,
} from '@heroicons/react/solid';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PageTransition from '../components/PageTransition';
import { Link, Outlet } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const { user, admin } = useAuth();

  return (
    <PageTransition>
      <ToastContainer />
      <div className="bg-white">
        <div>
          {/* Mobile filter dialog */}
          <Transition.Root show={mobileFiltersOpen} as={Fragment}>
            <Dialog
              as="div"
              className="fixed inset-0 flex z-40 lg:hidden"
              onClose={setMobileFiltersOpen}
            >
              <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-25" />
              </Transition.Child>

              <Transition.Child
                as={Fragment}
                enter="transition ease-in-out duration-300 transform"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transition ease-in-out duration-300 transform"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="ml-auto relative max-w-xs w-full h-full bg-white shadow-xl py-4 pb-12 flex flex-col overflow-y-auto">
                  <div className="px-4 flex items-center justify-between">
                    <h2 className="text-lg font-medium text-gray-600">Menu</h2>
                    <button
                      type="button"
                      className="-mr-2 w-10 h-10 bg-white p-2 rounded-md flex items-center justify-center text-gray-400"
                      onClick={() => setMobileFiltersOpen(false)}
                    >
                      <span className="sr-only">Close menu</span>
                      <XIcon className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                  {/* Filters */}
                  <div className="mt-4 border-t border-gray-200">
                    <h3 className="sr-only">Categories</h3>
                    <ul className="font-medium text-gray-600 px-2 py-3">
                      <li className="flex items-center mb-3 ml-3">
                        <ClipboardListIcon
                          className="h-6 w-6"
                          aria-hidden="true"
                        />
                        <Link className="ml-2" to="orders">
                          Orders
                        </Link>
                      </li>
                      {admin && (
                        <>
                          <li className="flex items-center mb-3 ml-3">
                            <UserIcon className="h-6 w-6" aria-hidden="true" />
                            <Link className="ml-2" to="users">
                              Users
                            </Link>
                          </li>
                          <li className="flex items-center mb-3 ml-3">
                            <ViewGridAddIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                            <Link className="ml-2" to="add-food-item">
                              Add Food Item
                            </Link>
                          </li>
                          <li className="flex items-center mb-3 ml-3">
                            <ShieldCheckIcon
                              className="h-6 w-6"
                              aria-hidden="true"
                            />
                            <Link className="ml-2" to="make-admin">
                              Make an Admin
                            </Link>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                </div>
              </Transition.Child>
            </Dialog>
          </Transition.Root>

          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative z-10 flex items-baseline justify-between pt-24 pb-6 border-b border-gray-200">
              <h1 className="text-4xl font-extrabold tracking-tight text-gray-600">
                Dashboard
              </h1>

              <div className="flex items-center">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-600">
                      Info
                      <ChevronDownIcon
                        className="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500"
                        aria-hidden="true"
                      />
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
                    <Menu.Items className="origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-2xl bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                      <div className="py-2 text-center">
                        <div>{user?.displayName}</div>
                        <hr className="mb-2 mt-1" />
                        <Menu.Item>
                          <Link to="/" className="text-gray-600 text-sm">
                            Home
                          </Link>
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>

                <button
                  type="button"
                  className="p-2 -m-2 ml-5 sm:ml-7 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View grid</span>
                  <img
                    src={user?.photoURL}
                    className="w-8 h-8 rounded-full border border-orange-600"
                    alt="img"
                  />
                </button>
                <button
                  type="button"
                  className="p-2 -m-2 ml-4 sm:ml-6 text-gray-400 hover:text-gray-500 lg:hidden"
                  onClick={() => setMobileFiltersOpen(true)}
                >
                  <span className="sr-only">Menu</span>
                  <MenuIcon className="w-5 h-5" aria-hidden="true" />
                </button>
              </div>
            </div>

            <section aria-labelledby="products-heading" className="pt-6 pb-24">
              <h2 id="products-heading" className="sr-only">
                Products
              </h2>

              <div className="grid grid-cols-1 lg:grid-cols-4 gap-x-8 gap-y-10">
                {/* Filters */}
                <div className="hidden lg:block">
                  <h3 className="sr-only">Categories</h3>
                  <ul className="text-medium font-bold text-gray-600 space-y-4 pb-6 border-b border-gray-200">
                    <li className="flex items-center">
                      <ClipboardListIcon
                        className="h-6 w-6"
                        aria-hidden="true"
                      />
                      <Link className="ml-2" to="orders">
                        Orders
                      </Link>
                    </li>
                    {admin && (
                      <>
                        <li className="flex items-center">
                          <UserIcon className="h-6 w-6" aria-hidden="true" />
                          <Link className="ml-2" to="users">
                            Users
                          </Link>
                        </li>
                        <li className="flex items-center">
                          <ViewGridAddIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          <Link className="ml-2" to="add-food-item">
                            Add Food Item
                          </Link>
                        </li>
                        <li className="flex items-center">
                          <ShieldCheckIcon
                            className="h-6 w-6"
                            aria-hidden="true"
                          />
                          <Link className="ml-2" to="make-admin">
                            Make an Admin
                          </Link>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
                {/* Product grid */}
                <div className="lg:col-span-3">
                  {/* Replace with your content */}
                  <Outlet />
                  {/* /End replace */}
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </PageTransition>
  );
};

export default Dashboard;
