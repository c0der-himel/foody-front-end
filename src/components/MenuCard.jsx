import { useState } from 'react';
import Details from './Details';
import Modal from './Modal';
import { ArrowRightIcon, ShoppingBagIcon } from '@heroicons/react/outline';
import { useDispatch } from 'react-redux';
import { addToCart } from '../features/cartSlice';

const MenuCard = ({ item }) => {
  const [openDetails, setOpenDetails] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const { category, name, img, price } = item;
  const dispatch = useDispatch();

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
  };

  return (
    <>
      <div className="p-4 lg:w-1/2">
        <div className="h-full flex sm:flex-row flex-col items-center sm:justify-start justify-center text-center sm:text-left shadow shadow-orange-600/20 rounded-2xl p-5">
          <img
            alt="food"
            className="flex-shrink-0 rounded-2xl w-48 h-48 object-cover object-center sm:mb-0 mb-4 p-6"
            src={`data:image/png;base64,${img}`}
          />
          <div className="flex-grow sm:pl-8">
            <h2 className="title-font font-bold text-2xl text-gray-600">
              {name}
            </h2>
            <h3 className="text-gray-500 mb-3">{category}</h3>
            <p className="mb-4 title-font font-bold text-2xl text-gray-600">
              ${price}
            </p>
            <span className="flex items-center justify-between mt-5">
              <span
                className="flex items-center text-orange-600 cursor-pointer"
                onClick={() => setOpenDetails(true)}
              >
                Details
                <ArrowRightIcon className="ml-2 h-6 w-6" />
              </span>
              <span
                className="flex items-center text-orange-600 cursor-pointer"
                onClick={() => handleAddToCart(item)}
              >
                Add to Bag
                <ShoppingBagIcon className="ml-2 h-6 w-6" />
              </span>
            </span>
          </div>
        </div>
      </div>
      <Details
        openDetails={openDetails}
        setOpenDetails={setOpenDetails}
        item={item}
      />
      <Modal openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default MenuCard;
