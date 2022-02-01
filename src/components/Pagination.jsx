import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import { Link } from 'react-router-dom';

const Pagination = ({ page, size, pageCount, setPage }) => {
  return (
    <div className="bg-white px-4 pb-24 flex items-center justify-between sm:px-6">
      <div className="flex-1 flex justify-between sm:hidden">
        <a
          href="/"
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
        >
          Previous
        </a>
        <a
          href="/"
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-600 bg-white hover:bg-gray-50"
        >
          Next
        </a>
      </div>
      <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-600">
            Showing{' '}
            <span className="font-medium">{(page + 1) * size - size + 1}</span>{' '}
            to <span className="font-medium">{(page + 1) * size}</span> of{' '}
            <span className="font-medium">{pageCount * size}</span> results
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px"
            aria-label="Pagination"
          >
            <button className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
              <span className="sr-only">Previous</span>
              <ChevronLeftIcon className="h-5 w-5" aria-hidden="true" />
            </button>
            {/* Current: "z-10 bg-amber-50 border-orange-600 text-orange-700", Default: "bg-white border-gray-300 text-gray-500 hover:bg-gray-50" */}
            {[...Array(pageCount).keys()].map((number) => (
              <button
                key={number}
                onClick={() => setPage(number)}
                aria-current="page"
                className={
                  number === page
                    ? 'z-10 bg-amber-50 border-orange-600 text-orange-700 relative inline-flex items-center px-4 py-2 border text-sm font-medium transition duration-300'
                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-100 relative inline-flex items-center px-4 py-2 border text-sm font-medium transition duration-300'
                }
              >
                {number + 1}
              </button>
            ))}
            <Link
              to="/menu"
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <span className="sr-only">Next</span>
              <ChevronRightIcon className="h-5 w-5" aria-hidden="true" />
            </Link>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default Pagination;
