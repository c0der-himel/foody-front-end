import { css } from '@emotion/react';
import { Link } from 'react-router-dom';
import RingLoader from 'react-spinners/RingLoader';
import { useGetAllMenuItemsQuery } from '../services/menuApi';
import MenuCard from './MenuCard';

const override = css`
  margin: 35vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Menu = () => {
  const { data, error, isLoading } = useGetAllMenuItemsQuery();

  return (
    <>
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
              <div className="flex flex-wrap -m-4">
                {data.menu.slice(0, 6)?.map((item) => (
                  <MenuCard item={item} key={item._id} />
                ))}
                <Link
                  to="/menu"
                  className="mt-10 mx-auto inline-block text-center bg-orange-600 border border-transparent rounded-full py-3 px-9 font-bold text-white hover:bg-orange-700 transition duration-300"
                >
                  See More
                </Link>
              </div>
            </div>
          </section>
        </>
      ) : null}
    </>
  );
};

export default Menu;
