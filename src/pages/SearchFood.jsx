import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';
import { useGetAllMenuItemsQuery } from '../services/menuApi';
import MenuCard from '../components/MenuCard';
import PageTransition from '../components/PageTransition';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const override = css`
  margin: 35vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const SearchFood = () => {
  const [searchedFood, setSearchedFood] = useState([]);
  const { data, error, isLoading } = useGetAllMenuItemsQuery();

  useEffect(() => {
    axios
      .get('https://powerful-retreat-84363.herokuapp.com/menu')
      .then((response) => {
        setSearchedFood(response.data.menu);
      })
      .catch((error) => console.log(error));
  }, []);

  const handleSearch = (event) => {
    const searchText = event.target.value;
    const matchedFood = data?.menu.filter((item) =>
      item.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchedFood(matchedFood);
  };

  const handleFilter = (filterText) => {
    const searchText = filterText;
    const matchedFood = data?.menu.filter((item) =>
      item.category.toLowerCase().includes(searchText.toLowerCase())
    );
    setSearchedFood(matchedFood);
    console.log(searchText, matchedFood);
  };

  return (
    <PageTransition>
      <Header />
      <ToastContainer />
      {error ? (
        <>Oh no, there was an error</>
      ) : isLoading ? (
        <RingLoader
          css={override}
          size={150}
          color={'#f59e0b'}
          loading={isLoading}
        />
      ) : data.menu ? (
        <>
          <section id="menu" className="text-gray-700 body-font">
            <div className="container px-5 py-24 mx-auto">
              <div className="flex flex-col text-center w-full mb-20">
                <h1 className="sm:text-4xl text-3xl font-bold title-font mb-4 text-gray-600">
                  Our Food Items
                </h1>
                <div className="h-1 w-24 bg-orange-600 mx-auto rounded-full"></div>
              </div>
              <div className="lg:w-1/2 md:w-2/3 mx-auto mb-20">
                <div className="flex flex-wrap -m-2">
                  <div className="p-2 w-full">
                    <div className="relative">
                      <label
                        htmlFor="search"
                        className="leading-7 text-sm text-gray-600"
                      ></label>
                      <input
                        onChange={handleSearch}
                        type="text"
                        id="search"
                        name="search"
                        placeholder="Search Food . . ."
                        className="w-full bg-gray-100 bg-opacity-50 rounded-full border border-gray-300 focus:border-orange-600 focus:bg-white focus:ring-2 focus:ring-amber-200 text-base outline-none text-gray-700 py-1 px-6 leading-8 transition-colors duration-300 ease-in-out"
                      />
                    </div>
                  </div>
                  <div className="mt-10 flex mx-auto">
                    <button
                      onClick={() => handleFilter('pure-veg')}
                      className="px-6 py-2 bg-orange-600 rounded-tl-full rounded-bl-full text-white font-bold"
                    >
                      Pure-Veg
                    </button>
                    <button
                      onClick={() => handleFilter('')}
                      className="px-2 py-2 bg-orange-600 text-white font-bold"
                    >
                      All
                    </button>
                    <button
                      onClick={() => handleFilter('non-veg')}
                      className="px-6 py-2 bg-orange-600 rounded-tr-full rounded-br-full text-white font-bold"
                    >
                      Non-Veg
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex flex-wrap -m-4">
                {searchedFood.map((item) => (
                  <MenuCard item={item} key={item._id} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}
      <Footer />
    </PageTransition>
  );
};

export default SearchFood;
