import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from '../components/common/Footer';
import Header from '../components/common/Header';
import PageTransition from '../components/PageTransition';
import { useEffect } from 'react';
import { MinusIcon, PlusIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  clearCart,
  decreaseCartItem,
  getTotals,
  removeFromCart,
} from '../features/cartSlice';
import { Link } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { loadStripe } from '@stripe/stripe-js';
import CheckOutForm from '../components/CheckOutForm';
import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe(
  'pk_test_51KFZbxDWCUswlDlRneUnV9GUNgPfd7rvsdNSQtVW1qXQQK4a0Fr5I5eqJGCyA7GrcZJQ67OG9DhvZ1N4NEFNXo4s00cBZiTWZF'
);

const CheckOut = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]);

  const handleRemoveFromCart = (item) => {
    dispatch(removeFromCart(item));
  };

  const handleDecreaseCartItem = (item) => {
    dispatch(decreaseCartItem(item));
  };

  const handleIncreaseCartItem = (item) => {
    dispatch(addToCart(item));
  };

  const clearCartItems = () => {
    dispatch(clearCart());
  };

  return (
    <PageTransition>
      <ToastContainer />
      <Header />
      <section className="text-gray-600 body-font">
        <div className="container flex flex-wrap px-5 py-24 mx-auto items-center">
          <div className="md:w-1/2 md:pr-12 md:py-8 md:border-r md:border-b-0 mb-10 md:mb-0 pb-10 border-b border-gray-200">
            {cart.cartItems.length === 0 ? (
              <div className="bag-empty flex items-center justify-center">
                <h1 className="text-3xl text-gray-600 font-bold text-center">
                  Food Bag is Empty
                </h1>
              </div>
            ) : (
              <>
                <h1 className="sm:text-3xl text-2xl font-bold title-font mb-10 text-gray-600">
                  Food Bag Items
                </h1>
                <div className="mt-8 h-96 pr-5 flex flex-col overflow-y-scroll">
                  <div className="flow-root">
                    <ul className="-my-6 divide-y divide-gray-200">
                      {cart.cartItems?.map((item) => (
                        <li key={item._id} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 shadow shadow-orange-600/20 rounded-2xl overflow-hidden">
                            <img
                              src={`data:image/png;base64,${item.img}`}
                              alt="img"
                              className="w-full h-full object-center object-cover p-4"
                            />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-lg font-bold text-gray-600">
                                <h3>{item.name}</h3>
                                <p className="ml-4">${item.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.category}
                              </p>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <p className="text-gray-500 flex items-center justify-center">
                                Quantity{' '}
                                <span className="ml-3 flex items-center justify-center border border-gray-400 py-1 px-3 rounded-full">
                                  <button>
                                    <MinusIcon
                                      className="mr-4 w-3 h-3 cursor-pointer"
                                      onClick={() =>
                                        handleDecreaseCartItem(item)
                                      }
                                    />
                                  </button>
                                  {item.cartQuantity}
                                  <button>
                                    <PlusIcon
                                      className="ml-4 w-3 h-3 cursor-pointer"
                                      onClick={() =>
                                        handleIncreaseCartItem(item)
                                      }
                                    />
                                  </button>
                                </span>
                              </p>

                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-orange-600 hover:text-orange-700"
                                  onClick={() => handleRemoveFromCart(item)}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="border-t border-gray-200 mt-10"></div>
                <div className="flex justify-between text-base font-medium text-gray-600 mt-7">
                  <p>Total</p>
                  <p className="font-bold">${cart.cartTotalAmount}</p>
                </div>
                <div className="mt-6 text-center">
                  <Link
                    to="/"
                    className="text-orange-600 font-medium hover:text-orange-700 transition duration-300"
                  >
                    Continue Shopping
                    <span aria-hidden="true"> &rarr;</span>
                  </Link>
                </div>
                <div className="mt-3">
                  <button
                    className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white transition duration-300"
                    onClick={() => clearCartItems()}
                  >
                    Empty Bag
                  </button>
                </div>
              </>
            )}
          </div>
          <div className="flex flex-col md:w-1/2 md:pl-12 text-center">
            {cart.cartItems.length === 0 ? (
              <Link
                to="/"
                className="flex justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-bold text-white bg-orange-600 hover:bg-orange-700 transition duration-300"
              >
                Back to Home
              </Link>
            ) : (
              <>
                {cart?.cartTotalAmount && (
                  <Elements stripe={stripePromise}>
                    <CheckOutForm
                      cart={cart}
                      user={user}
                      dispatch={dispatch}
                      clearCart={clearCart}
                    />
                  </Elements>
                )}
              </>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </PageTransition>
  );
};

export default CheckOut;
