import { Link } from 'react-router-dom';
import errorImage from '../assets/img/404/404.svg';
import PageTransition from '../components/PageTransition';

const PageNotFound = () => {
  return (
    <PageTransition>
      <section className="text-gray-600 body-font">
        <div className="container mx-auto flex px-5 pb-24 pt-10 items-center justify-center flex-col">
          <img
            className="lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded"
            alt="hero"
            src={errorImage}
          />
          <div className="text-center lg:w-2/3 w-full">
            <h1 className="title-font sm:text-4xl text-3xl mb-4 font-bold text-gray-600">
              Page Not Found
            </h1>
            <p className="mb-8 leading-relaxed">
              The page you are looking for doesn't exist
            </p>
            <div className="flex justify-center">
              <Link
                to="/"
                className="inline-flex text-white bg-orange-600 border-0 py-2 px-8 focus:outline-none hover:bg-orange-700 rounded-full text-lg font-bold transition duration-300"
              >
                Go back to Home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </PageTransition>
  );
};

export default PageNotFound;
