import { css } from '@emotion/react';
import RingLoader from 'react-spinners/RingLoader';
import { useGetAllMenuItemsQuery } from '../services/menuApi';
import MenuCard from '../components/MenuCard';
import PageTransition from '../components/PageTransition';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Pagination from '../components/Pagination';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const override = css`
  margin: 35vh auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FullMenu = () => {
  const size = 6;
  const [fullMenu, setFullMenu] = useState([]);
  const [page, setPage] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const { data, error, isLoading } = useGetAllMenuItemsQuery();

  useEffect(() => {
    axios
      .get(
        `https://powerful-retreat-84363.herokuapp.com/menu?page=${page}&&size=${size}`
      )
      .then((response) => {
        setFullMenu(response.data);
        const count = response.data.count;
        const pageNumber = Math.ceil(count / size);
        setPageCount(pageNumber);
      })
      .catch((error) => console.log(error));
  }, [page]);

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
              <div className="flex flex-wrap -m-4">
                {fullMenu.menu?.map((item) => (
                  <MenuCard item={item} key={item._id} />
                ))}
              </div>
            </div>
          </section>
        </>
      ) : null}
      <Pagination
        page={page}
        size={size}
        pageCount={pageCount}
        setPage={setPage}
      />
      <Footer />
    </PageTransition>
  );
};

export default FullMenu;
