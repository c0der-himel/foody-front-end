import { Fragment, useEffect } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { MinusIcon, PlusIcon, XIcon } from '@heroicons/react/outline';
import { useDispatch, useSelector } from 'react-redux';
import {
  addToCart,
  clearCart,
  decreaseCartItem,
  getTotals,
  removeFromCart,
} from '../features/cartSlice';
import { Link } from 'react-router-dom';

const Bag = ({ openCart, setOpenCart }) => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

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
    <Transition.Root show={openCart} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 overflow-hidden z-50"
        onClose={setOpenCart}
      >
        <div className="absolute inset-0 overflow-hidden">
          <Transition.Child
            as={Fragment}
            enter="ease-in-out duration-500"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in-out duration-500"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
            <Transition.Child
              as={Fragment}
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                  <div className="flex-1 py-6 overflow-y-auto px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <Dialog.Title className="text-lg font-bold text-gray-600">
                        Food Bag
                      </Dialog.Title>
                      <div className="ml-3 h-7 flex items-center">
                        <button
                          type="button"
                          className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                          onClick={() => setOpenCart(false)}
                        >
                          <span className="sr-only">Close panel</span>
                          <XIcon
                            className="h-6 w-6 transition duration-300 transform hover:rotate-180"
                            aria-hidden="true"
                          />
                        </button>
                      </div>
                    </div>
                    {cart.cartItems.length === 0 ? (
                      <div className="bag-empty flex items-center justify-center">
                        <h1 className="text-2xl text-gray-600 font-bold text-center mt-56">
                          Food Bag is Empty
                        </h1>
                      </div>
                    ) : (
                      <div className="mt-8">
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
                                    <div className="flex justify-between text-base font-bold text-gray-600">
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
                                        onClick={() =>
                                          handleRemoveFromCart(item)
                                        }
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
                    )}
                  </div>

                  <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                    {cart.cartItems.length === 0 ? (
                      ''
                    ) : (
                      <>
                        <div className="flex justify-between text-base font-medium text-gray-600">
                          <p>Subtotal</p>
                          <p className="font-bold">${cart.cartTotalAmount}</p>
                        </div>
                        <p className="mt-0.5 text-sm text-gray-500">
                          Shipping and taxes calculated at checkout.
                        </p>
                        <div className="mt-6">
                          <Link
                            to="/checkout"
                            className="flex justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base font-bold text-white bg-orange-600 hover:bg-orange-700 transition duration-300"
                          >
                            Checkout
                          </Link>
                        </div>
                      </>
                    )}
                    <div className="mt-3 flex justify-center text-sm text-center text-gray-500">
                      <p>
                        or{' '}
                        <button
                          type="button"
                          className="text-orange-600 font-medium hover:text-orange-700 transition duration-300"
                          onClick={() => setOpenCart(false)}
                        >
                          Continue Shopping
                          <span aria-hidden="true"> &rarr;</span>
                        </button>
                      </p>
                    </div>
                    {cart.cartItems.length === 0 ? (
                      ''
                    ) : (
                      <div className="mt-3">
                        <button
                          className="w-full flex justify-center items-center px-6 py-3 border border-transparent rounded-full shadow-sm text-base text-orange-600 border-orange-600 hover:bg-orange-600 hover:text-white transition duration-300"
                          onClick={() => clearCartItems()}
                        >
                          Empty Bag
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Bag;
